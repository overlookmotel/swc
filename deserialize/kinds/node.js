'use strict';

// Imports
const Kind = require('./kind.js'),
    { getAligned } = require('./utils.js'),
    { initType } = require('../types/index.js');

// Exports

/**
 * AST node class.
 * 
 * Nodes are serialized by RYKV as follows:
 *   - Property values are added to buffer one after another.
 *   - Each property takes up the number of bytes that type requires.
 *   - Empty padding is added between properties to ensure each is aligned as it's type requires.
 *   - Empty padding added on end if needed to bring end alignment up to alignment
 *     of highest alignment property type.
 *   - Alignment of Node is highest alignment of its property types.
 *     i.e. if alignment of properties is 1, 1, 8, 1, 4 -> Node's alignment is 8
 * 
 * Order properties is serialized is sometimes different from order they appear
 * in Rust struct definition. Presumably this is to create a more compact representation.
 * In such cases, the order of properties in Node definition should be order the properties
 * appear in JSON.
 * The order of properties as they appear in RKYV serialized buffer should be specified
 * with `options.keys`.
 * 
 * Most (but not all) Node types contain a `span` property with type `Span` as first property.
 * By default, a `span` property will be added unless there is already `span` property
 * defined in a different position, or `options.noSpan === true`.
 * 
 * Almost all Node objects in JS also contain a `type` property as first property,
 * containing name of the type. This is added automatically unless `options.noType === true`.
 * The value of `node.type` can be overridden with `options.nodeName`.
 */
class Node extends Kind {
    props = null;
    nodeName = null;
    keys = null;
    noSpan = false;
    noType = false;
    propsWithPos = null;

    constructor(props, options = {}) {
        super();
        Object.assign(this, options);

        // Add `span` as first property unless already included in properties
        if (!props.span && !options.noSpan) props = { span: 'Span', ...props };
        this.props = props;

        if (!this.keys) this.keys = Object.keys(props);
    }

    init() {
        const propsWithPosMap = {};
        let pos = 0,
            align = 0;
        for (let [key, prop] of Object.entries(this.props)) {
            prop = initType(prop);
            pos = getAligned(pos, prop.align);
            if (prop.align > align) align = prop.align;
            propsWithPosMap[key] = { key, prop, pos };
            pos += prop.length;
        }

        this.propsWithPos = this.keys.map(key => propsWithPosMap[key]);

        this.setLength(getAligned(pos, align));
        this.setAlign(align);
        if (!this.nodeName) this.nodeName = this.name;
    }

    generateDeserializer() {
        const propsCodes = this.propsWithPos.map(({ key, prop, pos }) => {
            return `${key}: deserialize${prop.name}(pos${pos === 0 ? '' : ` + ${pos}`})`;
        });

        if (!this.noType) propsCodes.unshift(`type: '${this.nodeName}'`);

        return `function deserialize${this.name}(pos) {
            return {
                ${propsCodes.join(`,\n${' '.repeat(16)}`)}
            };
        }`;
    }

    /**
     * Generate serializer + finalizer functions code for type.
     * Serializer calls the serializer for each property in turn.
     * It stores the finalization data for properties in scratch (4 bytes for each property).
     * It returns position of this data in scratch.
     *
     * Finalizer retrieves finalization data from scratch and calls finalizer
     * for each property in turn with the finalization data for that property.
     *
     * @returns {string} - Code for `serialize` + `finalize` functions
     */
    generateSerializer() {
        const propsOrdered = [...this.propsWithPos].sort(
            (prop1, prop2) => prop1.pos < prop2.pos ? -1 : 1
        );

        const serializeCodes = [],
            finalizeCodes = [];
        let endPos = 0;
        propsOrdered.forEach(({ key, prop, pos }, index) => {
            const storePosStr = `storePos32${index > 0 ? ` + ${index}` : ''}`;
            // Need to use `writeScratchUint32()` - reason explained in that function's definition
            serializeCodes.push(
                `writeScratchUint32(${storePosStr}, ${prop.serializerName}(node.${key}));`
            );

            if (pos > endPos) {
                finalizeCodes.push(`pos += ${pos - endPos};`);
            } else if (pos < endPos) {
                finalizeCodes.push(`pos -= ${endPos - pos};`);
            }
            finalizeCodes.push(`${prop.finalizerName}(scratchUint32[${storePosStr}]);`);

            endPos = pos + prop.length;
        });

        if (endPos !== this.length) finalizeCodes.push(`pos += ${this.length - endPos};`);

        // NB Scratch must be allocated in 8-byte blocks
        return `function serialize${this.name}(node) {
            const storePos32 = allocScratch(${getAligned(propsOrdered.length * 4, 8)}) >> 2;
            ${serializeCodes.join(`\n${' '.repeat(12)}`)}
            return storePos32;
        }
        
        function finalize${this.name}(storePos32) {
            ${finalizeCodes.join(`\n${' '.repeat(12)}`)}
        }`;
    }
}

module.exports = Node;

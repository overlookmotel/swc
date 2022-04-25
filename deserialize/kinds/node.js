'use strict';

// Imports
const Kind = require('./kind.js'),
    { getAligned } = require('./utils.js'),
    { initType } = require('../types/index.js');

// Exports

/**
 * AST node class
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

        // Add `span` as first property if not already included in properties.
        // `FunctionDeclaration`s and a few other nodes don't have `.span` as first property.
        // In those cases a `span` is included explicitly in `props`.
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

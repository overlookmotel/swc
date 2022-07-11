"use strict";

// Imports
const Kind = require("./kind.js"),
    { getAligned } = require("./utils.js"),
    { getType } = require("../types/index.js");

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
    noSpan = false;
    noType = false;
    inheritFrom = null;
    propsWithPos = null;
    tsExtends = null;
    tsNoExport = false;

    constructor(props, options = {}) {
        super();
        this.setOptions(options);

        // Add `span` as first property unless already included in properties
        if (!props.span && !options.noSpan) props = { span: "Span", ...props };
        this.props = props;
    }

    link() {
        if (!this.nodeName) this.nodeName = this.name;

        if (this.inheritFrom) {
            if (!Array.isArray(this.inheritFrom))
                this.inheritFrom = [this.inheritFrom];

            this.inheritFrom = this.inheritFrom.map(getType);

            for (const inheritFromType of this.inheritFrom) {
                Object.assign(this.props, inheritFromType.props);
            }
        }

        for (let [key, prop] of Object.entries(this.props)) {
            this.props[key] = getType(prop);
        }
    }

    getTsName() {
        return this.nodeName;
    }

    getLengthAndAlign() {
        let pos = 0,
            align = 1;
        this.propsWithPos = Object.entries(this.props).map(([key, prop]) => {
            prop.initLengthAndAlign();
            pos = getAligned(pos, prop.align);
            if (prop.align > align) align = prop.align;
            const propWithPos = { key, prop, pos };
            pos += prop.length;
            return propWithPos;
        });

        return { length: getAligned(pos, align), align };
    }

    generateDeserializer() {
        const propsCodes = this.propsWithPos.map(
            ({ key, prop, pos }) =>
                `${key}: ${prop.deserializerName}(pos${
                    pos === 0 ? "" : ` + ${pos}`
                })`
        );

        if (!this.noType) propsCodes.unshift(`type: "${this.nodeName}"`);

        return `function ${this.deserializerName}(pos) {
            return {
                ${propsCodes.join(",\n")}
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
        const serializeCodes = [],
            finalizeCodes = [];
        let endPos = 0;
        this.propsWithPos.forEach(({ key, prop, pos }, index) => {
            const storePos32Str = `storePos32${index > 0 ? ` + ${index}` : ""}`;
            // Need to use `writeScratchUint32()` - reason explained in that function's definition
            serializeCodes.push(
                `writeScratchUint32(${storePos32Str}, ${prop.serializerName}(node.${key}));`
            );

            if (pos > endPos) finalizeCodes.push(`pos += ${pos - endPos};`);
            finalizeCodes.push(
                `${prop.finalizerName}(scratchUint32[${storePos32Str}]);`
            );

            endPos = pos + prop.length;
        });

        if (endPos !== this.length)
            finalizeCodes.push(`pos += ${this.length - endPos};`);

        // NB Scratch must be allocated in 8-byte blocks
        return `function ${this.serializerName}(node) {
            const storePos32 = allocScratch(${
                getAligned(this.propsWithPos.length * 4, 8) >> 2
            });
            ${serializeCodes.join("\n")}
            return storePos32;
        }
        
        function ${this.finalizerName}(storePos32) {
            ${finalizeCodes.join("\n")}
        }`;
    }

    generateTypeDef() {
        const propsCodes = Object.entries(this.props).flatMap(([key, prop]) => {
            if (
                ["span", "decorators", "interpreter"].includes(key) ||
                this.inheritFrom?.some(
                    (inheritFromType) => inheritFromType.props[key]
                )
            ) {
                return [];
            }

            return `${key}${prop.tsIsOptional ? "?" : ""}: ${prop.tsName}`;
        });

        if (!this.noType) propsCodes.unshift(`type: "${this.nodeName}"`);

        let { tsExtends } = this;
        if (!tsExtends) {
            if (this.inheritFrom) {
                tsExtends = this.inheritFrom.map(
                    (inheritFromType) => inheritFromType.tsName
                );
            } else {
                tsExtends = [];
                if (!this.noType) tsExtends.push("Node");
                if (this.props.span) tsExtends.push("HasSpan");
                if (this.props.decorators) tsExtends.push("HasDecorator");
                if (this.props.interpreter) tsExtends.push("HasInterpreter");
            }
        }
        const extendsStr =
            tsExtends.length > 0 ? `extends ${tsExtends.join(", ")} ` : "";

        return `${this.tsNoExport ? "" : "export "}interface ${
            this.tsName
        } ${extendsStr}{
            ${propsCodes.join(";\n\n")}
        }`;
    }
}

module.exports = Node;

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
    propsWithPos = null;

    constructor(props, options = {}) {
        super();
        this.setOptions(options);

        // Add `span` as first property unless already included in properties
        if (!props.span && !options.noSpan) props = { span: "Span", ...props };
        this.props = props;
    }

    link() {
        if (!this.nodeName) this.nodeName = this.name;

        for (let [key, prop] of Object.entries(this.props)) {
            this.props[key] = getType(prop);
        }
    }

    getLengthAndAlign() {
        let pos = 0,
            align = 0,
            mayAlloc = false;
        this.propsWithPos = Object.entries(this.props).map(([key, prop]) => {
            prop.initLengthAndAlign();
            pos = getAligned(pos, prop.align);
            if (prop.align > align) align = prop.align;
            if (prop.mayAlloc) mayAlloc = true;
            const propWithPos = { key, prop, pos };
            pos += prop.length;
            return propWithPos;
        });

        return { length: getAligned(pos, align), align, mayAlloc };
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
     * Generate serializer function code for type.
     * Serializer calls the serializer for each property in turn.
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        let previousPos = 0,
            bufferGrownCount = 0;
        const lastIndex = this.propsWithPos.length - 1,
            numBufferGrowers = this.propsWithPos.filter(
                ({ prop }) => prop.mayAlloc
            ).length,
            lastPropGrows = this.propsWithPos[lastIndex].prop.mayAlloc;
        const serializeCodes = this.propsWithPos.map(
            ({ key, prop, pos }, index) => {
                const posStr =
                    index === 0 && pos === 0
                        ? "pos"
                        : index === lastIndex
                        ? `pos + ${pos - previousPos}`
                        : `pos += ${pos - previousPos}`;
                previousPos = pos;

                const serializeStr = `${prop.serializerName}(node.${key}, ${posStr})`;
                if (!prop.mayAlloc) return `${serializeStr};`;

                bufferGrownCount++;
                if (bufferGrownCount === 1) {
                    if (index === lastIndex) return `return ${serializeStr};`;

                    const prefix =
                        numBufferGrowers === 1 ||
                        (numBufferGrowers === 2 && lastPropGrows)
                            ? "const"
                            : "let";
                    return `
                        ${prefix} bufferGrownByBytes = ${serializeStr};
                        if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
                    `;
                }

                if (index === lastIndex)
                    return `return ${serializeStr} + bufferGrownByBytes;`;

                const prefix =
                    bufferGrownCount === 2
                        ? numBufferGrowers === 2
                            ? "const "
                            : "let "
                        : "";
                return `
                    ${prefix}thisBufferGrownByBytes = ${serializeStr};
                    if (thisBufferGrownByBytes > 0) {
                        pos += thisBufferGrownByBytes;
                        bufferGrownByBytes += thisBufferGrownByBytes;
                    }
                `;
            }
        );

        // NB Scratch must be allocated in 8-byte blocks
        const returnStr = lastPropGrows
            ? ""
            : `return ${this.mayAlloc ? "bufferGrownByBytes" : "0"}; `;
        return `function ${this.serializerName}(node, pos) {
            ${serializeCodes.join("\n")}
            ${returnStr}
        }`;
    }
}

module.exports = Node;

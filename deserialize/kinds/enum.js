"use strict";

// Modules
const assert = require("assert");

// Imports
const Kind = require("./kind.js"),
    Node = require("./node.js"),
    { Box } = require("./box.js"),
    Custom = require("./custom.js"),
    { getAligned } = require("./utils.js"),
    { getType } = require("../types/index.js");

// Exports

const enums = new Map();

/**
 * Enum class.
 *
 * Enums are serialized by RYKV as follows:
 *   - 1 byte for the ID of the selected value type.
 *   - Empty padding if needed to bring alignment up to alignment of the selected value type.
 *   - Serialized value.
 *   - Empty padding to length of longest possible value type.
 *     i.e. Length of Enum is always the maximum length it could possibly be.
 *   - Empty padding if needed to bring end alignment up to alignment of highest alignment value type.
 *   - Alignment of Enum is highest alignment of all possible value types.
 *     i.e. if alignment of value types is 4, 4, 8, 4 -> Enum's alignment is 8.
 */
class Enum extends Kind {
    valueTypes = null;

    constructor(valueTypes, options) {
        const enumObj = enums.get(JSON.stringify({ valueTypes, options }));
        if (enumObj) return enumObj;

        assert(valueTypes.length < 256);

        super();
        this.setOptions(options);
        this.valueTypes = valueTypes;

        enums.set(JSON.stringify({ valueTypes, options }), this);
    }

    link() {
        this.valueTypes = this.valueTypes.map(getType);
    }

    getName() {
        return this.valueTypes
            .map((valueType) => valueType.initName())
            .join("Or");
    }

    getLengthAndAlign() {
        let length = 0,
            align = 4;
        for (const valueType of this.valueTypes) {
            valueType.initLengthAndAlign();
            const optionLength = valueType.length + valueType.align;
            if (optionLength > length) length = optionLength;
            if (valueType.align > align) align = valueType.align;
        }

        return { length: getAligned(length, align), align };
    }

    generateDeserializer() {
        const caseCodes = this.valueTypes.map(
            ({ deserializerName, align }, index) =>
                `case ${index}: return ${deserializerName}(pos + ${align});`
        );

        // TODO Needs to be `buff[pos + 3]` on big-endian systems
        return `function ${this.deserializerName}(pos) {
            switch (buff[pos]) {
                ${caseCodes.join("\n")}
                default: throw new Error("Unexpected enum option ID for ${
                    this.name
                }");
            }
        }`;
    }

    /**
     * Generate serializer function code for type.
     * Serializer writes to buffer:
     *   - ID of selected value type.
     *   - Serialized value
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        // TODO For nested Enums, does `switch (node.type) {}` more than once - inefficient
        const serializeCodes = [],
            usedNodeNames = new Set();
        this.valueTypes.forEach((type, index) => {
            const addCode = (nodeName) => {
                if (usedNodeNames.has(nodeName)) return;
                usedNodeNames.add(nodeName);

                serializeCodes.push(`case "${nodeName}":`);
            };
            (function resolve(thisType) {
                if (thisType instanceof Node) return addCode(thisType.nodeName);
                if (thisType instanceof Enum)
                    return thisType.valueTypes.forEach(resolve);
                if (thisType instanceof Box) return resolve(thisType.valueType);
                if (thisType instanceof Custom) return addCode(thisType.name);
                throw new Error(
                    `Unexpected enum option type for ${this.name}, option ${index}`
                );
            })(type);

            serializeCodes.push(
                `serializeEnum(node, pos, ${index}, ${type.serializerName}, ${type.align}); break;`
            );
        });

        return `function ${this.serializerName}(node, pos) {
            switch (node.type) {
                ${serializeCodes.join("\n")}
                default: throw new Error("Unexpected enum option type for ${
                    this.name
                }");
            }
        }`;
    }
}

/**
 * Serialize Enum.
 * @param {*} node - Node
 * @param {number} pos - Position to write at
 * @param {number} id - Enum option ID
 * @param {Function} serialize - Serialize function for type
 * @param {number} offset - Length in bytes of option ID
 * @returns {undefined}
 */
function serializeEnum(node, pos, id, serialize, offset) {
    uint32[pos >>> 2] = id;
    serialize(node, pos + offset);
}

module.exports = { Enum, serializeEnum };

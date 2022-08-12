"use strict";

// Imports
const Kind = require("./kind.js"),
    { getType } = require("../types/index.js");

// Exports

const boxes = new Map();

/**
 * Box class.
 *
 * Boxed values are serialized by RYKV as follows:
 *   - The boxed value is added to buffer.
 *     Aligned as per the value's type.
 *   - Where boxed value is referenced (e.g. in a Node or Vec),
 *     a relative pointer to location of value (Int32, 4 bytes length).
 *     Pointer aligned on 4.
 */
class Box extends Kind {
    length = 4;
    align = 4;
    mayAlloc = true;
    valueType = null;

    constructor(valueType, options) {
        const box = boxes.get(valueType);
        if (box) return box;

        super();
        this.setOptions(options);
        this.valueType = valueType;

        boxes.set(valueType, this);
    }

    link() {
        this.valueType = getType(this.valueType);
    }

    getName() {
        return `Box${this.valueType.initName()}`;
    }

    generateDeserializer() {
        return `function ${this.deserializerName}(pos) {
            return deserializeBox(pos, ${this.valueType.deserializerName});
        }`;
    }

    /**
     * Generate serializer function code for type.
     * Serializer calls `serializeBox()` with info about value type.
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        const { valueType } = this;
        return `function ${this.serializerName}(value, pos) {
            return serializeBox(value, pos, ${valueType.serializerName}, ${valueType.length}, ${valueType.align});
        }`;
    }
}

/**
 * Deserialize boxed value.
 * @param {number} pos - Buffer position
 * @param {Function} deserialize - Deserialize function for value
 * @returns {*} - Value
 */
function deserializeBox(pos, deserialize) {
    return deserialize(pos + int32[pos >>> 2]);
}

/**
 * Serialize boxed value.
 * @param {*} value - Boxed value
 * @param {number} pos - Position to write at
 * @param {Function} serialize - Serialize function for type
 * @param {number} valueLength - Length of value type
 * @param {number} valueAlign - Alignment of value type
 * @returns {number} - Number of bytes buffer grew by during serialization
 */
function serializeBox(value, pos, serialize, valueLength, valueAlign) {
    alignPos(valueAlign);
    const bufferGrownByBytes = alloc(valueLength);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
    int32[pos >>> 2] = buffPos - pos;
    return serialize(value, buffPos) + bufferGrownByBytes;
}

module.exports = { Box, deserializeBox, serializeBox };

"use strict";

// Imports
const Kind = require("./kind.js"),
    { getType } = require("../types/index.js");

// Exports

const vecs = new Map();

/**
 * Vec class.
 *
 * Vecs are serialized by RYKV as follows:
 *   - The values are added to buffer.
 *     Alignment as per the value's type.
 *   - Where Vec is referenced (e.g. in a Node or Enum):
 *     - Relative pointer to location of start of values (Int32, 4 bytes).
 *     - Number of entries (Uint32, 4 bytes).
 *   - Vec aligned on 4, length 8.
 */
class Vec extends Kind {
    length = 8;
    align = 4;
    mayAlloc = true;
    valueType = null;

    constructor(valueType, options) {
        const vec = vecs.get(valueType);
        if (vec) return vec;

        super();
        this.setOptions(options);
        this.valueType = valueType;

        vecs.set(valueType, this);
    }

    link() {
        this.valueType = getType(this.valueType);
    }

    getName() {
        return `Vec${this.valueType.initName()}`;
    }

    generateDeserializer() {
        return `function ${this.deserializerName}(pos) {
            return deserializeVec(pos, ${this.valueType.deserializerName}, ${this.valueType.length});
        }`;
    }

    /**
     * Generate serializer function code for type.
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        const { valueType } = this;
        return `function ${this.serializerName}(values, pos) {
            return serializeVec(values, pos, ${valueType.serializerName}, ${valueType.length}, ${valueType.align});
        }`;
    }
}

/**
 * Deserialize Vec.
 * @param {number} pos - Buffer position
 * @param {Function} deserialize - Deserialize function for value
 * @param {number} length - Length in bytes of value
 * @returns {Array<*>} - Array of values
 */
function deserializeVec(pos, deserialize, length) {
    const pos32 = pos >>> 2;

    /* DEBUG_ONLY_START */
    console.log("Vec pointer target:", pos + int32[pos32]);
    /* DEBUG_ONLY_END */

    const numEntries = uint32[pos32 + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    pos += int32[pos32];
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(pos);
        pos += length;
    }
    return entries;
}

/**
 * Serialize Vec.
 * @param {Array<*>} values - Values
 * @param {number} pos - Position to write at
 * @param {Function} serialize - Serialize function for type
 * @param {number} valueLength - Length of value type
 * @param {number} valueAlign - Alignment of value type
 * @returns {number} - Number of bytes buffer grew by during serialization
 */
function serializeVec(values, pos, serialize, valueLength, valueAlign) {
    const numValues = values.length;
    if (numValues === 0) {
        alignPos(valueAlign);
        const pos32 = pos >>> 2;
        int32[pos32] = buffPos - pos;
        uint32[pos32 + 1] = 0;
        return 0;
    }

    alignPos(valueAlign);
    let bufferGrownByBytes = alloc(valueLength * numValues);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const pos32 = pos >>> 2;
    int32[pos32] = buffPos - pos;
    uint32[pos32 + 1] = numValues;

    let valuePos = buffPos,
        i = 0;
    while (true) {
        const thisBufferGrownByBytes = serialize(values[i], valuePos);
        if (thisBufferGrownByBytes > 0) {
            valuePos += thisBufferGrownByBytes;
            bufferGrownByBytes += thisBufferGrownByBytes;
        }
        if (++i === numValues) break;
        valuePos += valueLength;
    }

    return bufferGrownByBytes;
}

module.exports = { Vec, deserializeVec, serializeVec };

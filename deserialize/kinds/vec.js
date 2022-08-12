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
        const {
            serializerName,
            finalizerName,
            length: valueLength,
            align: valueAlign,
        } = this.valueType;
        return `function ${this.serializerName}(values) {
            return serializeVec(values, ${serializerName}, ${finalizerName}, ${valueLength}, ${valueAlign});
        }`;
    }

    // Use `finalizeVec` as finalizer for all Vec types
    finalizerName = "finalizeVec";
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
 * Store in scratch:
 *   - Bytes 0-3: Position of start of values in buffer (Uint32)
 *   - Bytes 4-7: Number of values (Uint32)
 * Return scratch position (in multiples of 4 bytes).
 *
 * @param {Array<*>} values - Values to serialize
 * @param {Function} serialize - Serialize function for type
 * @param {Function} finalize - Finalize function for type
 * @param {number} valueLength - Length of value type
 * @param {number} valueAlign - Alignment of value type
 * @returns {number} - Scratch position (in multiples of 4 bytes)
 */
function serializeVec(values, serialize, finalize, valueLength, valueAlign) {
    // Allocate 8 bytes scratch
    const storePos32 = allocScratch(2);

    // Store number of values in scratch bytes 4-7
    const numValues = values.length;
    scratchUint32[storePos32 + 1] = numValues;

    if (numValues === 0) {
        // NB No need to alloc for extra bytes required to obtain alignment, as buffer is grown
        // in 8-byte multiples. So there will always be enough space already allocated.
        alignPos(valueAlign);
        scratchUint32[storePos32] = pos;
        return storePos32;
    }

    const scratchPos32Before = scratchPos32;

    // Serialize values
    const finalizeData = new Array(numValues);
    for (let i = 0; i < numValues; i++) {
        finalizeData[i] = serialize(values[i]);
    }

    // Finalize values.
    // Store position of values in scratch bytes 0-3.
    alignPos(valueAlign);
    alloc(valueLength * numValues);
    scratchUint32[storePos32] = pos;
    for (let i = 0; i < numValues; i++) {
        finalize(finalizeData[i]);
    }

    // Free scratch space
    scratchPos32 = scratchPos32Before;

    // Return Uint32 position in scratch store
    return storePos32;
}

/**
 * Finalize Vec.
 * Retrieve number of values and position of values in output buffer from scratch.
 * Write to output buffer:
 *   - Bytes 0-3: Relative pointer to location of values as Int32
 *   - Bytes 4-7: Number of values as Uint32
 *
 * @param {number} storePos32 - Position of scratch data (in multiple of 4 bytes)
 * @returns {undefined}
 */
function finalizeVec(storePos32) {
    const pos32 = pos >>> 2;
    int32[pos32] = scratchUint32[storePos32] - pos;
    uint32[pos32 + 1] = scratchUint32[storePos32 + 1];
    pos += 8;
}

module.exports = { Vec, deserializeVec, serializeVec, finalizeVec };

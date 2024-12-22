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
        const {
            serializerName,
            finalizerName,
            length: valueLength,
            align: valueAlign,
        } = this.valueType;
        return `function ${this.serializerName}(value) {
            return serializeBox(value, ${serializerName}, ${finalizerName}, ${valueLength}, ${valueAlign});
        }`;
    }

    // Use `finalizeBox` as finalizer for all Box types
    finalizerName = "finalizeBox";
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
 * Return position of boxed value in buffer | 0x80000000.
 * Setting highest bit is to avoid 0 being returned. 0 has special meaning for Options.
 *
 * On NodeJS, `n | 0x80000000` is still an SMI for all values of n `0` - `0x7FFFFFFF`.
 * i.e. SMIs are 32 bit signed ints. Any 31-bit positive int can be encoded as an SMI.
 * `| 0x80000000` just sets the sign bit, so it remains an SMI.
 * I think it must be that pointer compression is disabled on NodeJS's V8 due to its
 * support for heap larger than 4GB.
 * However, if this code was running in a browser which does use pointer compression,
 * behavior might not be the same. I think using `| 0x80000000` would still produce an SMI,
 * but need to check.
 * Non-SMI numbers are stored on the heap in V8, so this would be a major performance hit.
 * Pointer compression in V8: https://v8.dev/blog/pointer-compression
 * TODO: Investigate behavior in browsers.
 *
 * @param {*} value - Boxed value
 * @param {Function} serialize - Serialize function for type
 * @param {Function} finalize - Finalize function for type
 * @param {number} valueLength - Length of value type
 * @param {number} valueAlign - Alignment of value type
 * @returns {number} - Position of boxed value in buffer | 0x80000000
 */
function serializeBox(value, serialize, finalize, valueLength, valueAlign) {
    const scratchPos32Before = scratchPos32;

    const finalizeData = serialize(value);
    alignPos(valueAlign);
    alloc(valueLength);
    const valuePos = pos;
    finalize(finalizeData);

    // Free scratch space
    scratchPos32 = scratchPos32Before;

    return valuePos | 0x80000000;
}

function finalizeBox(valuePos) {
    int32[pos >>> 2] = (valuePos & 0x7fffffff) - pos;
    pos += 4;
}

module.exports = { Box, deserializeBox, serializeBox, finalizeBox };

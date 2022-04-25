'use strict';

// Imports
const Kind = require('./kind.js'),
    { initType, getTypeName } = require('../types/index.js');

// Exports

const optionals = new Map();

/**
 * Option class.
 * 
 * Options are serialized by RYKV as follows:
 *   - 1 byte for whether value is present or not.
 *     - `0` for no value (becomes `null` is JS object)
 *     - `1` for value present
 *   - Empty padding if needed to bring alignment up to alignment of the value type.
 *   - If value: Serialized value.
 *   - If no value: Empty padding for length of value.
 *     i.e. Length of Option is always same, regardless of whether a value is present or not.
 *   - Empty padding if needed to bring end alignment up to alignment of value type.
 *   - Alignment of Option is same as alignment of it's value type.
 */
class Option extends Kind {
    childType = null;

    constructor(childType, options) {
        const optional = optionals.get(childType);
        if (optional) return optional;

        super();
        Object.assign(this, options);

        this.childType = childType;

        optionals.set(childType, this);
    }

    getName() {
        return `Option${getTypeName(this.childType)}`;
    }

    init() {
        this.childType = initType(this.childType);
        this.setLength(this.childType.align + this.childType.length);
        this.setAlign(this.childType.align);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(pos) {
            return deserializeOption(pos, deserialize${this.childType.name}, ${this.childType.align});
        }`;
    }

    /**
     * Generate serializer + finalizer function code for type.
     * @returns {string} - Code for `serialize` + `finalize` functions
     */
    generateSerializer() {
        const { childType } = this,
            { finalizerName, length: childLength, align: childAlign } = childType;
        return `function serialize${this.name}(value) {
            return serializeOption(value, ${childType.serializerName});
        }
        
        function finalize${this.name}(storePos) {
            return finalizeOption(storePos, ${finalizerName}, ${childLength}, ${childAlign});
        }`;
    }
}

/**
 * Deserialize Option.
 * @param {number} pos - Buffer position
 * @param {Function} deserialize - Deserialize function for value
 * @param {number} offset - Offset of value in buffer
 * @returns {*} - Value or `null`
 */
function deserializeOption(pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

/**
 * Serialize Option.
 * Store in scratch:
 *   - Byte 0: 0 if option disabled, 1 if enabled
 *   - Bytes 4-7: Serialize result
 * Return scratch position (in bytes).
 * @param {*} value - Value or `null`
 * @param {Function} serialize - Serialize function for type
 * @returns {number} - Scratch position (in bytes)
 */
function serializeOption(value, serialize) {
    const storePos = allocScratch(8);
    if (value === null) {
        scratchBuff[storePos] = 0;
    } else {
        scratchBuff[storePos] = 1;
        // Need to use `writeScratchUint32()` - reason explained in that function's definition
        writeScratchUint32((storePos >> 2) + 1, serialize(value));
    }
    return storePos;
}

/**
 * Finalize option.
 * @param {number} storePos - Position of scratch data (in bytes)
 * @param {Function} finalize - Finalize function for value
 * @param {number} valueLength - Length of value (NB value not total length of Option)
 * @param {number} offset - Offset of value from start of Option
 */
function finalizeOption(storePos, finalize, valueLength, offset) {
    if (scratchBuff[storePos] === 0) {
        // Option disabled
        buff[pos] = 0;
        pos += offset + valueLength;
    } else {
        // Option enabled
        buff[pos] = 1;
        pos += offset;
        finalize(scratchUint32[(storePos >> 2) + 1]);
    };
}



module.exports = { Option, deserializeOption, serializeOption, finalizeOption };

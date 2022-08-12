"use strict";

// Imports
const Kind = require("./kind.js"),
    { getType } = require("../types/index.js");

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
    valueType = null;

    constructor(valueType, options) {
        const optional = optionals.get(valueType);
        if (optional) return optional;

        super();
        this.setOptions(options);
        this.valueType = valueType;

        optionals.set(valueType, this);
    }

    link() {
        this.valueType = getType(this.valueType);
    }

    getName() {
        return `Option${this.valueType.initName()}`;
    }

    getLengthAndAlign() {
        this.valueType.initLengthAndAlign();
        return {
            length: this.valueType.align + this.valueType.length,
            align: this.valueType.align,
            mayAlloc: this.valueType.mayAlloc,
        };
    }

    generateDeserializer() {
        return `function ${this.deserializerName}(pos) {
            return deserializeOption(pos, ${this.valueType.deserializerName}, ${this.valueType.align});
        }`;
    }

    /**
     * Generate serializer function code for type.
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        const { valueType } = this;
        return `function ${this.serializerName}(value, pos) {
            return serializeOption(value, pos, ${valueType.serializerName}, ${valueType.align});
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
    // TODO Maybe should be `buff[pos + 3]` on big endian systems?
    switch (buff[pos]) {
        case 0:
            return null;
        case 1:
            return deserialize(pos + offset);
        default:
            throw new Error("Unexpected option value");
    }
}

/**
 * Serialize Option.
 * @param {*} value - Value (or null)
 * @param {number} pos - Position to write at
 * @param {Function} serialize - Serialize function for type
 * @param {number} offset - Offset of value from start of Option
 * @returns {number} - Number of bytes buffer grew by during serialization
 */
function serializeOption(value, pos, serialize, offset) {
    if (value === null) {
        // Option disabled
        // TODO Maybe should be `buff[pos + 3]` on big endian systems?
        buff[pos] = 0;
        return 0;
    }

    // Option enabled
    // TODO Maybe should be `buff[pos + 3]` on big endian systems?
    buff[pos] = 1;
    return serialize(value, pos + offset);
}

module.exports = { Option, deserializeOption, serializeOption };

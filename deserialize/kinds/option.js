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
        };
    }

    generateDeserializer() {
        return `function ${this.deserializerName}(pos) {
            return deserializeOption(pos, ${this.valueType.deserializerName}, ${this.valueType.align});
        }`;
    }

    generateVisitor() {
        if (this.valueType.visit === false) return null;
        return `function ${this.visitorName}(pos) {
            visitOption(pos, ${this.valueType.visitorName}, ${this.valueType.align});
        }`;
    }

    /**
     * Generate serializer + finalizer function code for type.
     * @returns {string} - Code for `serialize` + `finalize` functions
     */
    generateSerializer() {
        const { valueType } = this,
            {
                finalizerName,
                length: valueLength,
                align: valueAlign,
            } = valueType;
        return `function ${this.serializerName}(value) {
            return serializeOption(value, ${valueType.serializerName});
        }
        
        function ${this.finalizerName}(finalizeData) {
            return finalizeOption(finalizeData, ${finalizerName}, ${valueAlign}, ${
            valueLength + valueAlign
        });
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
        case 0:
            return null;
        case 1:
            return deserialize(pos + offset);
        default:
            throw new Error("Unexpected option value");
    }
}

/**
 * Visit Option.
 * @param {number} pos - Buffer position
 * @param {Function} visit - Visit function for value
 * @param {number} offset - Offset of value in buffer
 * @returns {undefined}
 */
function visitOption(pos, visit, offset) {
    switch (buff[pos]) {
        case 0:
            return;
        case 1:
            return visit(pos + offset);
        default:
            throw new Error("Unexpected option value");
    }
}

/**
 * Serialize Option.
 * If option disabled, return 0;
 * If option enabled, return finalize data for value.
 * Finalize data is never 0, so 0 can be safely used to denote option disabled.
 * (usually finalize data is scratch position, and scratch starts at 8)
 *
 * @param {*} value - Value or `null`
 * @param {Function} serialize - Serialize function for type
 * @returns {number} - Finalize data for value, or 0 if option disabled
 */
function serializeOption(value, serialize) {
    return value === null ? 0 : serialize(value);
}

/**
 * Finalize option.
 * @param {number} finalizeData - Finalize data for value
 * @param {Function} finalize - Finalize function for value
 * @param {number} offset - Offset of value from start of Option
 * @param {number} length - Length of Option (total inc. value and offset)
 */
function finalizeOption(finalizeData, finalize, offset, length) {
    if (finalizeData === 0) {
        // Option disabled
        buff[pos] = 0;
        pos += length;
    } else {
        // Option enabled
        buff[pos] = 1;
        pos += offset;
        finalize(finalizeData);
    }
}

module.exports = {
    Option,
    deserializeOption,
    visitOption,
    serializeOption,
    finalizeOption,
};

"use strict";

// Modules
const assert = require("assert");

// Imports
const Kind = require("./kind.js");

// Exports

const enumValues = new Map();

/**
 * Enum value class.
 * e.g. `Boolean` - which is either `true` or `false`.
 *
 * Enum values are are serialized by RYKV as follows:
 *   - 1 byte for the ID of the value.
 *   - Aligned on 4 (`repr(u32)` included in `ast_node` proc macro).
 */
class EnumValue extends Kind {
    length = 4;
    align = 4;
    values = null;

    constructor(values, options) {
        const enumValue = enumValues.get(JSON.stringify(values));
        if (enumValue) return enumValue;

        assert(values.length < 256);

        super();
        this.setOptions(options);
        this.values = values;

        enumValues.set(JSON.stringify(values), this);
    }

    link() {}

    getName() {
        return this.values.join("Or");
    }

    generateDeserializer() {
        const caseCodes = this.values.map(
            (value, index) =>
                `case ${index}: return ${
                    typeof value === "string" ? `"${value}"` : value
                };`
        );

        // TODO Needs to be `buff[pos + 3]` on big-endian systems
        return `function ${this.deserializerName}(pos) {
            switch (buff[pos]) {
                ${caseCodes.join("\n")}
                default: throw new Error("Unexpected enum value ID for ${
                    this.name
                }");
            }
        }`;
    }

    /**
     * Generate serializer function code for type.
     * Serializer returns ID of value + 256.
     * `+ 256` is to ensure result is never 0. 0 has a special meaning for Options.
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        const caseCodes = this.values.map(
            (value, index) =>
                `case ${JSON.stringify(value)}: return ${index + 256};`
        );

        return `function ${this.serializerName}(value) {
            switch (value) {
                ${caseCodes.join("\n")}
                default: throw new Error("Unexpected enum value for ${
                    this.name
                }");
            }
        }`;
    }

    // Use `finalizeEnumValue` as finalizer for all EnumValue types
    finalizerName = "finalizeEnumValue";
}

/**
 * Finalize EnumValue.
 * Write value ID to output buffer.
 * NB Only a single Uint8 value is required, so scratch is not used.
 * @param {number} id - Enum option ID
 * @returns {undefined}
 */
function finalizeEnumValue(id) {
    uint32[pos >>> 2] = id & 255;
    pos += 4;
}

module.exports = { EnumValue, finalizeEnumValue };

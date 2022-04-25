'use strict';

// Modules
const assert = require("assert");

// Imports
const Kind = require('./kind.js');

// Exports

const enumValues = new Map();

/**
 * Enum value class.
 * e.g. `Boolean` - which is either `true` or `false`.
 * 
 * Enum values are are serialized by RYKV as follows:
 *   - 1 byte for the ID of the value.
 *   - Aligned on 1.
 */
class EnumValue extends Kind {
    length = 1;
    align = 1;
    enumOptions = null;

    constructor(enumOptions, options) {
        const enumValue = enumValues.get(JSON.stringify(enumOptions));
        if (enumValue) return enumValue;

        assert(enumOptions.length < 256);

        super();
        Object.assign(this, options);

        this.enumOptions = enumOptions;

        enumValues.set(JSON.stringify(enumOptions), this);
    }

    getName() {
        return this.enumOptions.join('Or');
    }

    init() {
        this.setLength(1);
        this.setAlign(1);
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map((value, index) => (
            `case ${index}: return ${typeof value === 'string' ? `'${value}'` : value};`
        ));

        return `function deserialize${this.name}(pos) {
            switch (buff[pos]) {
                ${enumOptionCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
        }`;
    }

    /**
     * Generate serializer function code for type.
     * Serializer returns ID of enum value as Uint8.
     * @returns {string} - Code for `serialize` function
     */
    generateSerializer() {
        const enumOptionCodes = this.enumOptions.map((value, index) => (
            `case ${typeof value === 'string' ? `'${value}'` : value}: return ${index};`
        ));

        return `function serialize${this.name}(value) {
            switch (value) {
                ${enumOptionCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
        }`;
    }

    // Use `finalizeEnumValue` as finalizer for all Vec types
    get finalizerName() {
        return 'finalizeEnumValue';
    }
}

/**
 * Finalize EnumValue.
 * Write value ID to output buffer.
 * NB Only a single Uint8 value is required, so scratch is not used.
 * @param {number} id - Enum option ID
 * @returns {undefined}
 */
function finalizeEnumValue(id) {
    buff[pos] = id;
    pos++;
}

module.exports = { EnumValue, finalizeEnumValue };

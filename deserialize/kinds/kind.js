'use strict';

// Modules
const assert = require("assert");

// Imports
const { isPositiveInteger } = require('./utils.js');

// Exports

/**
 * Base class for types.
 * All type classes extend this.
 */
class Kind {
    name = null;
    length = null;
    align = null;
    isInitialized = false;

    setOptions(options) {
        if (!options) return;
        // Set options with define not assign so getters can be overridden
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(options));
    }

    getName() {
        return this.name;
    }

    init() { }

    setLength(length) {
        assert(isPositiveInteger(length), `Type ${this.name} has invalid length`);
        if (this.length) {
            assert(
                length === this.length,
                `Type ${this.name} specified length does not match calculated length`
            );
        } else {
            this.length = length;
        }
    }

    setAlign(align) {
        assert(isPositiveInteger(align), `Type ${this.name} has invalid align`);
        if (this.align) {
            assert(
                align === this.align,
                `Type ${this.name} specified align does not match calculated align`
            );
        } else {
            this.align = align;
        }
    }

    get deserializerName() {
        return `deserialize${this.name}`;
    }
    get serializerName() {
        return `serialize${this.name}`;
    }
    get finalizerName() {
        return `finalize${this.name}`;
    }
}

module.exports = Kind;

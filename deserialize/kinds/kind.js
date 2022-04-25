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

    get serializerName() {
        return `serialize${this.name}`;
    }
    set serializerName(name) {
        Object.defineProperty(this, 'serializerName', { value: name, writable: true });
    }

    get finalizerName() {
        return `finalize${this.name}`;
    }
    set finalizerName(name) {
        Object.defineProperty(this, 'finalizerName', { value: name, writable: true });
    }
}

module.exports = Kind;

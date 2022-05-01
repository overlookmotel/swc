'use strict';

// Modules
const assert = require('assert');

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
    isLinked = false;
    isInitialized = false;

    setOptions(options) {
        if (!options) return;
        // Set options with define not assign so getters can be overridden
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(options));
    }

    initName() {
        if (!this.name) {
            this.name = this.getName();
            assert(typeof this.name === 'string', 'Failed to get type name');
        }
        return this.name;
    }

    initLengthAndAlign() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        if (this.getLengthAndAlign) {
            const { length, align } = this.getLengthAndAlign();
            this.length = length;
            this.align = align;
        }

        assert(isPositiveInteger(this.length), `Type ${this.name} has invalid length`);
        assert(isPositiveInteger(this.align), `Type ${this.name} has invalid align`);
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

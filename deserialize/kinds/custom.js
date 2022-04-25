'use strict';

// Modules
const assert = require("assert");

// Imports
const Kind = require('./kind.js'),
    { isPositiveInteger } = require('./utils.js'),
    { initType } = require('../types/index.js');

// Exports

/**
 * Custom type class
 */
class Custom extends Kind {
    deserialize = null;
    dependencies = [];

    constructor(options) {
        super();
        Object.assign(this, options);
    }

    init() {
        this.dependencies = this.dependencies.map(name => initType(name));

        assert(isPositiveInteger(this.length), `Custom type ${this.name} has invalid length`);
        assert(isPositiveInteger(this.align), `Custom type ${this.name} has invalid align`);
        assert(typeof this.deserialize === 'function', `Custom type ${this.name} has no deserializer`);
        assert(typeof this.serialize === 'function', `Custom type ${this.name} has no serializer`);
        assert(
            typeof this.finalize === 'function' || this.finalize === false,
            `Custom type ${this.name} has no finalizer`
        );
    }

    generateDeserializer() {
        let code = this.deserialize.toString();
        assert(
            code.startsWith('deserialize('),
            `Custom type ${this.name} malformed deserializer function`
        );
        return `function deserialize${this.name}${code.slice('deserialize'.length)}`;
    }

    generateSerializer() {
        const serializeCode = this.serialize.toString();
        assert(
            serializeCode.startsWith('serialize('),
            `Custom type ${this.name} malformed serializer function`
        );
        let code = `function serialize${this.name}${serializeCode.slice('serialize'.length)}`;

        if (this.finalize) {
            const finalizeCode = this.finalize.toString();
            assert(
                finalizeCode.startsWith('finalize('),
                `Custom type ${this.name} malformed finalizer function`
            );
            code += `\n\n${' '.repeat(8)}function finalize${this.name}${finalizeCode.slice('finalize'.length)}`;
        }

        return code;
    }
}

module.exports = Custom;

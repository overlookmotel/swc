'use strict';

// Modules
const assert = require("assert");

// Imports
const Kind = require('./kind.js'),
    { getType } = require('../types/index.js');

// Exports

/**
 * Custom type class
 */
class Custom extends Kind {
    deserialize = null;
    serialize = null;
    finalize = null;
    dependencies = [];

    constructor(options) {
        super();
        this.setOptions(options);

        assert(
            typeof this.deserialize === 'function' || this.deserialize === false,
            `Custom type ${this.name} has no deserializer`
        );
        assert(typeof this.serialize === 'function', `Custom type ${this.name} has no serializer`);
        assert(
            typeof this.finalize === 'function' || this.finalize === false,
            `Custom type ${this.name} has no finalizer`
        );
    }

    link() {
        this.dependencies = this.dependencies.map(getType);
    }

    generateDeserializer() {
        if (!this.deserialize) return null;
        let code = this.deserialize.toString();
        assert(
            code.startsWith('deserialize('),
            `Custom type ${this.name} malformed deserializer function`
        );
        return `function ${this.deserializerName}${code.slice('deserialize'.length)}`;
    }

    generateSerializer() {
        const serializeCode = this.serialize.toString();
        assert(
            serializeCode.startsWith('serialize('),
            `Custom type ${this.name} malformed serializer function`
        );
        let code = `function ${this.serializerName}${serializeCode.slice('serialize'.length)}`;

        if (this.finalize) {
            const finalizeCode = this.finalize.toString();
            assert(
                finalizeCode.startsWith('finalize('),
                `Custom type ${this.name} malformed finalizer function`
            );
            code += `\n\n${' '.repeat(8)}function ${this.finalizerName}${finalizeCode.slice('finalize'.length)}`;
        }

        return code;
    }
}

module.exports = Custom;

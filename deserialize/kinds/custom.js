"use strict";

// Modules
const assert = require("assert");

// Imports
const Kind = require("./kind.js"),
    { getType } = require("../types/index.js");

// Exports

/**
 * Custom type class
 */
class Custom extends Kind {
    deserialize = null;
    serialize = null;
    dependencies = [];

    constructor(options) {
        super();
        this.setOptions(options);

        assert(
            typeof this.deserialize === "function" ||
                this.deserialize === false,
            `Custom type ${this.name} has no deserializer`
        );
        assert(
            typeof this.serialize === "function",
            `Custom type ${this.name} has no serializer`
        );
    }

    link() {
        this.dependencies = this.dependencies.map(getType);
    }

    generateDeserializer() {
        if (!this.deserialize) return null;
        let code = this.deserialize.toString();
        assert(
            code.startsWith("deserialize("),
            `Custom type ${this.name} malformed deserializer function`
        );
        return `function ${this.deserializerName}${code.slice(
            "deserialize".length
        )}`;
    }

    generateSerializer() {
        const serializeCode = this.serialize.toString();
        assert(
            serializeCode.startsWith("serialize("),
            `Custom type ${this.name} malformed serializer function`
        );
        return `function ${this.serializerName}${serializeCode.slice(
            "serialize".length
        )}`;
    }
}

module.exports = Custom;

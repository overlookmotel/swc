'use strict';

// Modules
const assert = require("assert");

// Imports
const Kind = require('./kind.js'),
    Node = require('./node.js'),
    { Box } = require('./box.js'),
    Custom = require('./custom.js'),
    { getAligned } = require('./utils.js'),
    { initType, getTypeName } = require('../types/index.js');

// Exports

const enums = new Map();

/**
 * Enum class
 */
class Enum extends Kind {
    enumOptions = null;
    order = null;

    constructor(enumOptions, options) {
        const enumObj = enums.get(JSON.stringify({ enumOptions, options }));
        if (enumObj) return enumObj;

        assert(enumOptions.length < 256);

        super();
        Object.assign(this, options);

        this.enumOptions = enumOptions;
        if (!this.order) this.order = enumOptions.map((_, index) => index);

        enums.set(JSON.stringify({ enumOptions, options }), this);
    }

    getName() {
        return this.enumOptions.map(getTypeName).join('Or');
    }

    init() {
        let length = 0,
            align = 0;
        this.enumOptions = this.enumOptions.map((enumOption) => {
            enumOption = initType(enumOption);
            const optionLength = enumOption.length + enumOption.align;
            if (optionLength > length) length = optionLength;
            if (enumOption.align > align) align = enumOption.align;
            return enumOption;
        });

        this.setLength(getAligned(length, align));
        this.setAlign(align);
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map(({ name, align }, index) => (
            `case ${index}: return deserialize${name}(pos + ${align});`
        ));

        return `function deserialize${this.name}(pos) {
            switch (buff[pos]) {
                ${enumOptionCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
        }`;
    }

    generateSerializer() {
        // TODO For nested Enums, does `switch (node.type) {}` more than once - inefficient
        const optionSerializeCodes = [],
            optionFinalizeCodes = [],
            usedNodeNames = new Set();
        for (const index of this.order) {
            const type = this.enumOptions[index];

            const addCode = (nodeName) => {
                if (usedNodeNames.has(nodeName)) return;
                usedNodeNames.add(nodeName);

                optionSerializeCodes.push(`case '${nodeName}':`);
            };
            (function resolve(thisType) {
                if (thisType instanceof Node) return addCode(thisType.nodeName);
                if (thisType instanceof Enum) return thisType.enumOptions.forEach(resolve);
                if (thisType instanceof Box) return resolve(thisType.childType);
                if (thisType instanceof Custom) return addCode(thisType.name);
                throw new Error(`Unexpected enum option type for ${this.name}, option ${index}`);
            })(type);

            optionSerializeCodes.push(...[
                `scratchBuff[storePos] = ${index};`,
                // Need to use `writeScratchUint32()` - reason explained in that function's definition
                `writeScratchUint32((storePos >> 2) + 1, ${type.serializerName}(node));`,
                'break;'
            ].map(line => `${' '.repeat(4)}${line}`));

            optionFinalizeCodes.push(
                `case ${index}: finalizeEnum(`
                + `${index}, scratchUint32[(storePos >> 2) + 1], ${type.finalizerName}, `
                + `${type.align}, ${this.length}`
                + '); '
                + 'break;'
            );
        }

        return `function serialize${this.name}(node) {
            const storePos = allocScratch(8);
            switch (node.type) {
                ${optionSerializeCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
            return storePos;
        }

        function finalize${this.name}(storePos) {
            switch (scratchBuff[storePos]) {
                ${optionFinalizeCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum ID for ${this.name}');
            }
        }`;
    }
}

/**
 * Finalize Enum.
 * @param {number} id - Enum option ID
 * @param {number} finalizeData - Finalize data from value serializer
 * @param {Function} finalize - Finalize function for value
 * @param {number} offset - Length in bytes of option ID
 * @param {number} length - Length in bytes of structure including enum option ID and value
 * @returns {undefined}
 */
function finalizeEnum(id, finalizeData, finalize, offset, length) {
    const startPos = pos;
    buff[pos] = id;
    pos += offset;
    finalize(finalizeData);
    pos = startPos + length;
}

module.exports = { Enum, finalizeEnum };

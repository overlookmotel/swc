'use strict';

// Modules
const assert = require('assert');

// Imports
const Kind = require('./kind.js'),
    Node = require('./node.js'),
    { Box } = require('./box.js'),
    Custom = require('./custom.js'),
    { getAligned } = require('./utils.js'),
    { getType } = require('../types/index.js');

// Exports

const enums = new Map();

/**
 * Enum class.
 *
 * Enums are serialized by RYKV as follows:
 *   - 1 byte for the ID of the selected value type.
 *   - Empty padding if needed to bring alignment up to alignment of the selected value type.
 *   - Serialized value.
 *   - Empty padding to length of longest possible value type.
 *     i.e. Length of Enum is always the maximum length it could possibly be.
 *   - Empty padding if needed to bring end alignment up to alignment of highest alignment value type.
 *   - Alignment of Enum is highest alignment of all possible value types.
 *     i.e. if alignment of value types is 4, 4, 8, 4 -> Enum's alignment is 8.
 */
class Enum extends Kind {
    valueTypes = null;

    constructor(valueTypes, options) {
        const enumObj = enums.get(JSON.stringify({ valueTypes, options }));
        if (enumObj) return enumObj;

        assert(valueTypes.length < 256);

        super();
        this.setOptions(options);
        this.valueTypes = valueTypes;

        enums.set(JSON.stringify({ valueTypes, options }), this);
    }

    link() {
        this.valueTypes = this.valueTypes.map(getType);
    }

    getName() {
        return this.valueTypes.map(valueType => valueType.initName()).join('Or');
    }

    getLengthAndAlign() {
        let length = 0,
            align = 0;
        for (const valueType of this.valueTypes) {
            valueType.initLengthAndAlign();
            const optionLength = valueType.length + valueType.align;
            if (optionLength > length) length = optionLength;
            if (valueType.align > align) align = valueType.align;
        }

        return { length: getAligned(length, align), align };
    }

    generateDeserializer() {
        const caseCodes = this.valueTypes.map(({ deserializerName, align }, index) => (
            `case ${index}: return ${deserializerName}(pos + ${align});`
        ));

        return `function ${this.deserializerName}(pos) {
            switch (buff[pos]) {
                ${caseCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum option ID for ${this.name}');
            }
        }`;
    }

    /**
     * Generate serializer + finalizer functions code for type.
     * Serializer stores 8 bytes in scratch:
     *   - Byte 0: ID of selected value type.
     *   - Bytes 4-7: Finalizer data from value type's `serialize` function
     * It returns position of this data in scratch as Uint32.
     * 
     * Finalizer retrieves this data from scratch, uses first byte to determine selected type,
     * and passes bytes 4-7 to finalizer for the selected type (via `finalizeEnum()`).
     * 
     * @returns {string} - Code for `serialize` + `finalize` functions
     */
    generateSerializer() {
        // TODO For nested Enums, does `switch (node.type) {}` more than once - inefficient
        const optionSerializeCodes = [],
            optionFinalizeCodes = [],
            usedNodeNames = new Set();
        this.valueTypes.forEach((type, index) => {
            const addCode = (nodeName) => {
                if (usedNodeNames.has(nodeName)) return;
                usedNodeNames.add(nodeName);

                optionSerializeCodes.push(`case '${nodeName}':`);
            };
            (function resolve(thisType) {
                if (thisType instanceof Node) return addCode(thisType.nodeName);
                if (thisType instanceof Enum) return thisType.valueTypes.forEach(resolve);
                if (thisType instanceof Box) return resolve(thisType.valueType);
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
        });

        return `function ${this.serializerName}(node) {
            const storePos = allocScratch(8);
            switch (node.type) {
                ${optionSerializeCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum option type for ${this.name}');
            }
            return storePos;
        }

        function ${this.finalizerName}(storePos) {
            switch (scratchBuff[storePos]) {
                ${optionFinalizeCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum option ID for ${this.name}');
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

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
        const opts = {},
            optionFinalizeCodes = [];
        this.valueTypes.forEach((type, index) => {
            const addCode = (nodeName) => {
                if (opts[nodeName]) return;
                opts[nodeName] = { type, index };
            };
            (function resolve(thisType) {
                if (thisType instanceof Node) return addCode(thisType.nodeName);
                if (thisType instanceof Enum) return thisType.valueTypes.forEach(resolve);
                if (thisType instanceof Box) return resolve(thisType.valueType);
                if (thisType instanceof Custom) return addCode(thisType.name);
                throw new Error(`Unexpected enum option type for ${this.name}, option ${index}`);
            })(type);

            optionFinalizeCodes.push(
                `case ${index}: finalizeEnum(`
                + `${index}, scratchUint32[(storePos >> 2) + 1], ${type.finalizerName}, `
                + `${type.align}, ${this.length}`
                + '); '
                + 'break;'
            );
        });

        // Group options by length of node name
        let groupedByLen = new Map();
        for (const [nodeName, { type, index }] of Object.entries(opts)) {
            const len = nodeName.length;
            let group = groupedByLen.get(len);
            if (!group) groupedByLen.set(len, group = []);
            group.push({ nodeName, type, index });
        }
        groupedByLen = [...groupedByLen.entries()].map(([len, members]) => ({ len, members }))
            .sort((group1, group2) => group1.len > group2.len ? 1 : -1);

        let typeVar;
        const generateGroup = (members, isNested, indent) => {
            let groupedByIndex = new Map();
            for (const member of members) {
                const { index } = member;
                let group = groupedByIndex.get(index);
                if (!group) groupedByIndex.set(index, group = { type: member.type, nodeNames: [] });
                group.nodeNames.push(member.nodeName);
            }
            groupedByIndex = [...groupedByIndex.entries()]
                .map(([index, { type, nodeNames }]) => ({ index, type, nodeNames }));

            if (groupedByIndex.length === 1) {
                const nodeNamesTxt = groupedByIndex[0].nodeNames.map(nodeName => `'${nodeName}'`).join(', ');
                return [
                    '/* DEBUG_ONLY_START */',
                    `if (![${nodeNamesTxt}].includes(${typeVar})) {`,
                    `    throw new Error('Unexpected enum option type for ${this.name}');`,
                    '}',
                    '/* DEBUG_ONLY_END */',
                    generateCase(groupedByIndex[0], isNested, false, indent)
                ].join(`\n${' '.repeat(indent)}`);
            }

            return [
                `switch (${typeVar}) {`,
                ...groupedByIndex.map((group) => {
                    return group.nodeNames.map(nodeName => `case '${nodeName}':`)
                        .join(`\n${' '.repeat(indent + 4)}`)
                        + `\n${' '.repeat(indent + 8)}` + generateCase(group, true, isNested, indent + 8);
                }).map(line => `${' '.repeat(4)}${line}`),
                `${' '.repeat(4)}default: throw new Error('Unexpected enum option type for ${this.name}');`,
                '}'
            ].join(`\n${' '.repeat(indent)}`);
        };

        const generateCase = ({ index, type }, addBreakOnEnd, isNested, indent) => {
            return [
                `scratchBuff[storePos] = ${index};`,
                // Need to use `writeScratchUint32()` - reason explained in that function's definition
                `writeScratchUint32((storePos >> 2) + 1, ${type.serializerName}(node));`,
                ...(addBreakOnEnd ? [isNested ? `break outer;` : 'break;'] : [])
            ].join(`\n${' '.repeat(indent)}`);
        };

        let serializerCode;
        if (groupedByLen.length === 1) {
            typeVar = 'node.type';
            serializerCode = generateGroup(groupedByLen[0].members, false, 12)
        } else {
            const hasNestedSwitches = groupedByLen.some(group => group.members.length > 1);
            typeVar = hasNestedSwitches ? 'type' : 'node.type';
            serializerCode = [
                `${hasNestedSwitches ? 'outer: ' : ''}switch (${typeVar}.length) {`,
                ...[
                    ...groupedByLen.map(({ len, members }) => [
                        `case ${len}:`,
                        generateGroup(members, true, 20)
                    ].join(`\n${' '.repeat(20)}`)),
                    `default: throw new Error('Unexpected enum option type for ${this.name}');`
                ].map(line => `${' '.repeat(4)}${line}`),
                '}'
            ].join(`\n${' '.repeat(12)}`);
        }

        return `function ${this.serializerName}(node) {
            const storePos = allocScratch(8)${typeVar === 'type' ? `,\n${' '.repeat(16)}{type} = node` : ''};
            ${serializerCode}
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

function splitOptions(options) {
    options = [...options].sort();
    return splitOptionsAtChar(options, 0);
}

function splitOptionsAtChar(options, charNum) {
    // If only one option, is leaf node
    if (options.length === 1) {
        return { char: undefined, option: options[0], charNum: undefined, splits: undefined };
    }

    // Split into groups of options with same character at specified position
    const groups = [];
    let previousChar = null, group;
    for (const option of options) {
        const char = option[charNum];
        if (char !== previousChar) {
            group = { char, options: [] };
            groups.push(group);
            previousChar = char;
        }
        group.options.push(option);
    }

    // Recursively split groups by next character
    const splits = groups.map(
        group => ({ ...splitOptionsAtChar(group.options, charNum + 1), char: group.char })
    );

    // If only one split group, collapse child into self
    if (splits.length === 1) return splits[0];

    // Return splits
    return { char: undefined, option: undefined, charNum, splits };
}

module.exports = { Enum, finalizeEnum, splitOptions };

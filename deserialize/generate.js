'use strict';

// Modules
const { writeFileSync } = require('fs'),
    pathJoin = require('path').join,
    assert = require('assert');

// Imports
const { types, initType } = require('./types/index.js'),
    utils = require('./utils.js');

// Constants
const SERIALIZE_INITIAL_BUFFER_SIZE = 8 * 1024, // 8 KB
    SCRATCH_INITIAL_BUFFER_SIZE = 8 * 1024; // 8 KB

// Generate deserializer code

const DEBUG = !!process.env.DEBUG;

assert(SERIALIZE_INITIAL_BUFFER_SIZE % 8 === 0);
assert(SCRATCH_INITIAL_BUFFER_SIZE % 8 === 0);

initType('Program');
writeFileSync(pathJoin(__dirname, 'index.js'), generateDeserializer());
writeFileSync(pathJoin(__dirname, 'serialize.js'), generateSerializer());

/**
 * Generate code for deserializer.
 * @returns {string} - Code for deserializer
 */
function generateDeserializer() {
    return [
        '// Generated code. Do not edit.',
        "'use strict';",

        // Deserializer entry point
        'module.exports = deserialize;',
        'let buff, int32, uint32, float64;',
        conformFunctionCode(`function deserialize(buffIn) {
            const arrayBuffer = buffIn.buffer;
            buff = Buffer.from(arrayBuffer);
            int32 = new Int32Array(arrayBuffer);
            uint32 = new Uint32Array(arrayBuffer);
            float64 = new Float64Array(arrayBuffer, 0, arrayBuffer.byteLength >> 3);
            return deserializeProgram(buffIn.byteOffset + buffIn.length - ${types.Program.length});
        }`),

        // Type deserializer functions
        ...Object.values(types).flatMap((type) => {
            let deserializerCode = type.generateDeserializer();
            if (!deserializerCode) return [];
            deserializerCode = conformFunctionCode(deserializerCode);
            if (!DEBUG) return deserializerCode;
            return deserializerCode.replace(
                /function deserialize.+\n/,
                line => line + `${' '.repeat(4)}debugBuff('${type.name}', pos, ${type.length});\n`
            );
        }),

        // Utility functions
        ...getUtilitiesCode(
            ['deserializeOption', 'deserializeBox', 'deserializeVec'],
            'debugBuff'
        )
    ].join('\n\n') + '\n';
}

/**
 * Generate code for serializer.
 * @returns {string} - Code for serializer
 */
function generateSerializer() {
    return [
        '// Generated code. Do not edit.',
        "'use strict';",

        // Serializer entry point
        'module.exports = serialize;',
        'let pos, buffLen, buff, int32, uint32, float64;',
        'let scratchPos, scratchLen, scratchBuff, scratchUint32, scratchFloat64, scratchArrayBuffer;',
        'resetBuffers();',
        conformFunctionCode(`function serialize(ast) {
            pos = 0;
            scratchPos = 0;

            /* DEBUG_ONLY_START */
            resetBuffers();
            /* DEBUG_ONLY_END */

            const storePos = serializeProgram(ast);
            alignAndAlloc(${types.Program.length}, ${types.Program.align});
            finalizeProgram(storePos);

            return buff.subarray(0, pos);
        }`),
        conformFunctionCode(`function resetBuffers() {
            buffLen = ${SERIALIZE_INITIAL_BUFFER_SIZE};
            scratchLen = ${SCRATCH_INITIAL_BUFFER_SIZE};
            initBuffer();
            initScratch();
        }`),

        // Type serialize functions
        ...Object.values(types).flatMap((type) => {
            let serializerCode = type.generateSerializer();
            if (!serializerCode) return [];
            serializerCode = conformFunctionCode(serializerCode);
            if (!DEBUG) return serializerCode;
            return serializerCode
                .replace(
                    /function serialize.+\n/,
                    line => line + `${' '.repeat(4)}debugAst('serialize ${type.name}');\n`
                )
                .replace(
                    /function finalize.+\n/,
                    line => line + `${' '.repeat(4)}debugAst('finalize ${type.name}');\n`
                );
        }),

        // Utility functions
        ...getUtilitiesCode(
            [
                'serializeOption', 'serializeBox', 'serializeVec',
                'finalizeEnum', 'finalizeEnumValue', 'finalizeOption', 'finalizeBox', 'finalizeVec',
                'initBuffer', 'alloc', 'alignAndAlloc',
                'initScratch', 'allocScratch', 'allocScratchAligned',
                'writeScratchUint32', 'copyFromScratch'
            ],
            'debugAst'
        ).map(code => code.replace(
            /function finalize(.+?)\(.+\n/,
            (line, name) => DEBUG ? line + `${' '.repeat(4)}debugAst('finalize ${name}');\n` : line
        )),

        // For use in tests only
        // TODO Find a better way to do this
        'serialize.resetBuffers = resetBuffers;'
    ].join('\n\n') + '\n';
}

/**
 * Get code for utility functions.
 * @param {Array<string>} utilNames - Utility function names
 * @param {string} debugUtilName - Debug utility function name
 * @returns {Array<string>} - Array of functions' code
 */
function getUtilitiesCode(utilNames, debugUtilName) {
    if (DEBUG) utilNames = [...utilNames, debugUtilName];
    return utilNames.map(
        utilName => removeLineBreaks(removeComments(removeDebugOnlyCode(utils[utilName].toString())))
    );
}

/**
 * Remove indentation, comments, and debug code from function code.
 * @param {string} code - Function code
 * @returns {string} - Conformed code
 */
function conformFunctionCode(code) {
    return removeLineBreaks(removeComments(removeDebugOnlyCode(removeIndent(code))));
}

/**
 * Remove indentation from function code.
 * Expects to receive a code for a function with opening on first line.
 * @param {string} code 
 * @returns {string} - Code with indentation removed
 */
function removeIndent(code) {
    const lines = code.split('\n');
    if (lines.length === 1) return code;

    const indentDepth = lines[1].match(/^\s+/)[0].length - 4;
    return [lines[0], ...lines.slice(1).map(line => line.slice(indentDepth))].join('\n');
}

/**
 * Remove comments from code.
 * @param {string} code - Code
 * @returns {string} - Code with comments removed
 */
function removeComments(code) {
    return code.replace(/\s*\/\/[^\n]+/g, '');
}

/**
 * Remove excess line breaks from code.
 * @param {string} code 
 * @returns {string} - Code with double line breaks removed
 */
function removeLineBreaks(code) {
    return code.replace(/\n\n+/g, '\n');
}

/**
 * Remove debug-only code blocks from code if debugging disabled.
 * @param {string} code - Code
 * @returns {string} - Code with debug code removed
 */
function removeDebugOnlyCode(code) {
    if (DEBUG) return code;
    return code.replace(/\s*\/\* DEBUG_ONLY_START \*\/[\s\S]+?\/\* DEBUG_ONLY_END \*\/\n?/g, '');
}

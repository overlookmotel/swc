'use strict';

// Modules
const { writeFileSync } = require('fs'),
    pathJoin = require('path').join;

// Imports
const { types, initType } = require('./types/index.js'),
    utils = require('./utils.js');

// Generate deserializer code

const DEBUG = !!process.env.DEBUG;

initType('Program');
writeFileSync(pathJoin(__dirname, 'index.js'), generateDeserializer());

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
        ...Object.values(types).map((type) => {
            const deserializerCode = conformFunctionCode(type.generateDeserializer());
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

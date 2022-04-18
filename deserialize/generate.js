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
        "module.exports = deserialize;",
        'let buff, int32, uint32;',
        removeIndent(`function deserialize(buffIn) {
            const { buffer } = buffIn;
            buff = Buffer.from(buffer);
            int32 = new Int32Array(buffer);
            uint32 = new Uint32Array(buffer);
            return deserializeProgram(buffIn.byteOffset + buffIn.length - ${types.Program.length});
        }`),

        // Type deserializer functions
        ...Object.values(types).map((type) => {
            let deserializerCode = removeIndent(type.generateDeserializer());
            if (DEBUG) {
                deserializerCode = deserializerCode.replace(
                    /function deserialize.+\n/,
                    line => line + `${' '.repeat(4)}debugBuff('${type.name}', pos, ${type.length});\n`
                );
            }
            return deserializerCode;
        }),

        // Utility functions
        ...[
            'deserializeOption', 'deserializeBox', 'deserializeVec', 'getPtr',
            ...(DEBUG ? ['debugBuff'] : [])
        ].map(utilName => utils[utilName].toString())
    ].join('\n\n') + '\n';
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

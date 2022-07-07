"use strict";

// Modules
const { writeFileSync } = require("fs"),
    pathJoin = require("path").join,
    prettier = require("prettier");

// Imports
const { types } = require("./types/index.js"),
    { finalizeEnum } = require("./kinds/enum.js"),
    { finalizeEnumValue } = require("./kinds/enumValue.js"),
    {
        deserializeOption,
        serializeOption,
        finalizeOption,
    } = require("./kinds/option.js"),
    { deserializeBox, serializeBox, finalizeBox } = require("./kinds/box.js"),
    { deserializeVec, serializeVec, finalizeVec } = require("./kinds/vec.js"),
    {
        deserialize,
        serialize,
        resetBuffers,
        initBuffer,
        alloc,
        growBuffer,
        alignPos,
        initScratch,
        allocScratch,
        allocScratchAligned,
        growScratch,
        writeScratchUint32,
        copyFromScratch,
        writeStringToBuffer,
        writeAsciiStringToBuffer,
        debugBuff,
        debugAst,
    } = require("./utils.js"),
    { ...constants } = require("./constants.js");

// Generate deserializer code

const DEBUG = !!process.env.DEBUG;

constants.PROGRAM_LENGTH = types.Program.length;
constants.PROGRAM_ALIGN = types.Program.align;

writeFileSync(pathJoin(__dirname, "deserialize.js"), generateDeserializer());
writeFileSync(pathJoin(__dirname, "serialize.js"), generateSerializer());

/**
 * Generate code for deserializer.
 * @returns {string} - Code for deserializer
 */
function generateDeserializer() {
    return format(
        [
            "// Generated code. Do not edit.",
            '"use strict";',

            // Deserializer entry point
            "module.exports = deserialize;",
            "let buff, int32, uint32, float64;",

            // Type deserializer functions
            ...Object.values(types).flatMap((type) => {
                let deserializerCode = type.generateDeserializer();
                if (!deserializerCode) return [];
                deserializerCode = conformFunctionCode(deserializerCode);
                if (!DEBUG) return deserializerCode;
                return deserializerCode.replace(
                    /function deserialize.+\n/,
                    (line) =>
                        line +
                        `debugBuff("${type.name}", pos, ${type.length});\n`
                );
            }),

            // Utility functions
            ...getUtilitiesCode(
                [
                    deserialize,
                    deserializeOption,
                    deserializeBox,
                    deserializeVec,
                ],
                debugBuff
            ),
        ].join("\n\n")
    );
}

/**
 * Generate code for serializer.
 * @returns {string} - Code for serializer
 */
function generateSerializer() {
    return format(
        [
            "// Generated code. Do not edit.",
            '"use strict";',

            // Serializer entry point
            "module.exports = serialize;",
            "let pos, buffLen, buff, uint16, int32, uint32, float64;",
            "let scratchPos32, scratchLen32, scratchBuff, scratchUint16, scratchUint32, scratchFloat64;",
            "resetBuffers();",

            // Type serialize functions
            ...Object.values(types).flatMap((type) => {
                let serializerCode = type.generateSerializer();
                if (!serializerCode) return [];
                serializerCode = conformFunctionCode(serializerCode);
                if (!DEBUG) return serializerCode;
                return serializerCode
                    .replace(
                        /function serialize.+\n/,
                        (line) => line + `debugAst("serialize ${type.name}");\n`
                    )
                    .replace(
                        /function finalize.+\n/,
                        (line) => line + `debugAst("finalize ${type.name}");\n`
                    );
            }),

            // Utility functions
            ...getUtilitiesCode(
                [
                    serialize,
                    serializeOption,
                    serializeBox,
                    serializeVec,
                    finalizeEnum,
                    finalizeEnumValue,
                    finalizeOption,
                    finalizeBox,
                    finalizeVec,
                    resetBuffers,
                    initBuffer,
                    alloc,
                    growBuffer,
                    alignPos,
                    initScratch,
                    allocScratch,
                    allocScratchAligned,
                    growScratch,
                    writeScratchUint32,
                    copyFromScratch,
                    writeStringToBuffer,
                    writeAsciiStringToBuffer,
                ],
                debugAst
            ).map((code) =>
                code.replace(/function finalize(.+?)\(.+\n/, (line, name) =>
                    DEBUG ? line + `debugAst("finalize ${name}");\n` : line
                )
            ),

            // For use in tests only
            // TODO Find a better way to do this
            "serialize.resetBuffers = resetBuffers;",
            getReplaceFinalizeJsWord(),
        ].join("\n\n")
    );
}

/**
 * Get code for utility functions.
 * @param {Array<Function>} utilFns - Utility functions
 * @param {Function} debugFn - Debug utility function
 * @returns {Array<string>} - Array of functions' code
 */
function getUtilitiesCode(utilFns, debugFn) {
    if (DEBUG) utilFns = [...utilFns, debugFn];
    return utilFns.map((fn) =>
        removeLineBreaks(
            removeComments(removeDebugOnlyCode(replaceConstants(fn.toString())))
        )
    );
}

/**
 * Remove indentation, comments, and debug code from function code.
 * @param {string} code - Function code
 * @returns {string} - Conformed code
 */
function conformFunctionCode(code) {
    return removeLineBreaks(
        removeComments(removeDebugOnlyCode(replaceConstants(code)))
    );
}

/**
 * Replace constants with their values.
 * @param {string} code - Function code
 * @returns {string} - Function code with constants replaced
 */
function replaceConstants(code) {
    return code.replace(
        /[A-Z][A-Z0-9]+(?:_[A-Z0-9]+)+/g,
        (constName) => constants[constName] || constName
    );
}

/**
 * Remove comments from code.
 * @param {string} code - Code
 * @returns {string} - Code with comments removed
 */
function removeComments(code) {
    return code.replace(/\s*\/\/[^\n]+/g, "");
}

/**
 * Remove excess line breaks from code.
 * @param {string} code
 * @returns {string} - Code with double line breaks removed
 */
function removeLineBreaks(code) {
    return code.replace(/\n\n+ */g, (space, pos, whole) =>
        whole.slice(pos + space.length).startsWith("function ") ? "\n\n" : "\n"
    );
}

/**
 * Remove debug-only code blocks from code if debugging disabled.
 * @param {string} code - Code
 * @returns {string} - Code with debug code removed
 */
function removeDebugOnlyCode(code) {
    if (DEBUG) return code;
    return code.replace(
        /\s*\/\* DEBUG_ONLY_START \*\/[\s\S]+?\/\* DEBUG_ONLY_END \*\//g,
        ""
    );
}

/**
 * Format code with `prettier`.
 * @param {string} code
 * @returns {string} - Formatted code
 */
function format(code) {
    return prettier.format(code, { tabWidth: 4, filepath: "/foo.js" });
}

/**
 * Create function to replace `finalizeJsWord` function with the debug code left in.
 * This debug code which is retained zeros out unallocted bytes which would otherwise
 * contain random data.
 * This is for use in tests only, where tests compare buffers and these random bytes,
 * even though they don't actually affect operation, cause the buffer comparisons to fail.
 * @returns {string}
 */
function getReplaceFinalizeJsWord() {
    return `serialize.replaceFinalizeJsWord = () => {
        const original = finalizeJsWord;
        finalizeJsWord = function${types.JsWord.finalize
            .toString()
            .slice("finalize".length)};
        return () => {
            finalizeJsWord = original;
        };
    }`;
}

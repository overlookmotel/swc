"use strict";

// Modules
const { writeFileSync } = require("fs"),
    pathJoin = require("path").join,
    prettier = require("prettier");

// Imports
const { types } = require("./types/index.js"),
    { serializeEnum } = require("./kinds/enum.js"),
    { deserializeOption, serializeOption } = require("./kinds/option.js"),
    { deserializeBox, serializeBox } = require("./kinds/box.js"),
    { deserializeVec, serializeVec } = require("./kinds/vec.js"),
    {
        deserialize,
        serialize,
        resetBuffer,
        initBuffer,
        alloc,
        allocAligned,
        growBuffer,
        alignPos,
        writeShortStringToBuffer,
        writeStringToBuffer,
        writeAsciiStringToBuffer,
        debugBuff,
        debugAst,
    } = require("./utils.js"),
    { ...constants } = require("./constants.js");

// Generate deserializer code

const DEBUG = !!process.env.DEBUG;

constants.PROGRAM_LENGTH_PLUS_4 = types.Program.length + 4;
constants.PROGRAM_ALIGN = Math.max(types.Program.align, 4);

writeFileSync(pathJoin(__dirname, "deserialize.js"), generateDeserializer());
writeFileSync(pathJoin(__dirname, "serialize.js"), generateSerializer());

// This branch contains a new simpler implementation of Serializer.
// It fills buffer from start-to-end, (`Program` node at start of buffer),
// unlike RKYV which fills buffer end-to-start.
// It doesn't use a scratch buffer or finalizers.
// It's almost twice as fast as previous serializer and does work, except for an
// incompatibility with how RKYV stores strings.
// RKYV relies on pointers to strings being negative, so uses the sign bit to interpret
// whether the 32-bit int is a pointer or an inline string.
// Filling the buffer in reverse order upsets that (pointers are now positive ints), so it doesn't work.
// 2 possible solutions:
//   1. Implement a separate deserializer in Rust for `JsWord`s which works around this.
//   2. In JS, begin at end of the buffer and work backwards to the start, so pointers are negative.
// The latter has the disadvantage that strings will have to be serialized and then moved in many cases,
// as the byte length of the UTF8-encoded string cannot be known until after it's serialized.

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
            "let buffPos, buffLen, buff, uint32, float64;",
            "resetBuffer();",

            // Type serialize functions
            ...Object.values(types).flatMap((type) => {
                let serializerCode = type.generateSerializer();
                if (!serializerCode) return [];
                serializerCode = conformFunctionCode(serializerCode);
                if (!DEBUG) return serializerCode;
                return serializerCode.replace(
                    /function serialize.+\n/,
                    (line) => line + `debugAst("${type.name}", pos);\n`
                );
            }),

            // Utility functions
            ...getUtilitiesCode(
                [
                    serialize,
                    serializeEnum,
                    serializeOption,
                    serializeBox,
                    serializeVec,
                    resetBuffer,
                    initBuffer,
                    alloc,
                    allocAligned,
                    alignPos,
                    growBuffer,
                    writeShortStringToBuffer,
                    writeStringToBuffer,
                    writeAsciiStringToBuffer,
                ],
                debugAst
            ),
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

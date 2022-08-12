"use strict";

// Modules
const { writeFileSync } = require("fs"),
    pathJoin = require("path").join,
    assert = require("assert"),
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
        alignPos,
        alloc,
        growBuffer,
        writeStringToBuffer,
        writeAsciiStringToBuffer,
        shiftBytesAndFree,
        debugBuff,
        debugAst,
    } = require("./utils.js"),
    { ...constants } = require("./constants.js");

// Generate deserializer code

const DEBUG = !!process.env.DEBUG;

constants.PROGRAM_LENGTH_PLUS_4 = types.Program.length + 4;
constants.PROGRAM_LENGTH_PLUS_8 = types.Program.length + 8;

assert(types.Program.align === 4, "Program node is not aligned to 4 bytes");

writeFileSync(pathJoin(__dirname, "deserialize.js"), generateDeserializer());
writeFileSync(pathJoin(__dirname, "serialize.js"), generateSerializer());

// This branch contains a new simpler implementation of Serializer.
//
// First version fills buffer from start-to-end, (`Program` node at start of buffer),
// unlike RKYV which fills buffer end-to-start.
// It doesn't use a scratch buffer or finalizers.
// It's almost twice as fast as previous serializer and does work, except for an
// incompatibility with how RKYV stores strings.
// RKYV relies on pointers to strings being negative, so uses the sign bit to interpret
// whether the 32-bit int is a pointer or an inline string.
// Filling the buffer in reverse order upsets that (pointers are now positive ints), so it doesn't work.
//
// 2nd version fixes this problem by filling buffer end-to-start (`Program` node at end of buffer).
// In fact it fills the end of the buffer first and works forward.
// This results in a slightly different buffer from what RKYV produces, because of the reverse order
// of filling buffer. But nonetheless it's valid - everything is aligned correctly.
// The buffer therefore needs to grow at it's front end, not its back end.
// When growth happens, a new larger buffer is created and the old buffer is copied to the *end*
// of the new buffer. So serialization can continue filling the buffer working towards the start.
// Because the buffer can grow at almost any time, pointers which are held at the time of growth
// all become invalid (because what was at byte 4 is now at byte 4 + n, if buffer grew by n bytes).
// Tracking this and adjusting pointers in such cases is quite a pain.
// It costs about 6% performance.
//
// A better solution would be to implement a separate deserializer in Rust for `JsWord`s which
// expects positive pointers, not negative. The buffer could then be filled in start to end order
// without any problems.

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
            "let buffPos, buffLen, buff, uint32, int32, float64;",
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
                    alignPos,
                    alloc,
                    growBuffer,
                    writeStringToBuffer,
                    writeAsciiStringToBuffer,
                    shiftBytesAndFree,
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

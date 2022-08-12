"use strict";

// Imports
const {
    PROGRAM_LENGTH_PLUS_4,
    PROGRAM_ALIGN,
    SERIALIZE_INITIAL_BUFFER_SIZE,
    SERIALIZE_MAX_BUFFER_SIZE,
} = require("./constants.js");

// Exports

module.exports = {
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
};

/**
 * Deserialize AST buffer.
 * @param {Buffer} buffIn - Buffer
 * @returns {Object} - AST
 */
function deserialize(buffIn) {
    const arrayBuffer = buffIn.buffer;
    buff = Buffer.from(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer, 0, arrayBuffer.byteLength >>> 3);

    // Skip over `VersionedSerializable` data
    return deserializeProgram(
        buffIn.byteOffset + buffIn.length - PROGRAM_LENGTH_PLUS_4
    );
}
let buff, int32, uint32, float64;

/**
 * Serialize AST to buffer.
 * @param {Object} ast - AST
 * @returns {Buffer} - Serialized buffer
 */
function serialize(ast) {
    /* DEBUG_ONLY_START */
    resetBuffer();
    /* DEBUG_ONLY_END */

    // Write `VersionedSerializable` version to buffer
    uint32[0] = AST_VERSION;

    // Allocate space for `VersionedSerializable` (4 bytes) and `Program` node
    buffPos = PROGRAM_LENGTH_PLUS_4;

    // Serialize program
    serializeProgram(ast, 4);

    // Add pointer to `VersionedSerializable` version as final Int32.
    // Write as `Uint32` to avoid creating an `Int32` view of buffer just for this.
    // 4294967296 === 1 << 32
    const pos = allocAligned(4, PROGRAM_ALIGN);
    uint32[pos >>> 2] = 4294967296 - pos;

    return subarray.call(buff, 0, pos + 4);
}
let buffPos;

serialize.toString = () =>
    Function.prototype.toString.call(serialize) +
    "\n\nconst { subarray } = Buffer.prototype;";

/**
 * Reset serialization buffer.
 * @returns {undefined}
 */
function resetBuffer() {
    buffLen = SERIALIZE_INITIAL_BUFFER_SIZE;
    initBuffer();
}

/**
 * Init output buffer for serializer.
 * TypedArray views over buffer are also created.
 * `Buffer.allocUnsafeSlow()` is used to ensure buffer is not created as part of NodeJS's pool
 * so the data starts at byte 0 of the underlying `ArrayBuffer`.
 * @returns {undefined}
 */
function initBuffer() {
    buff = Buffer.allocUnsafeSlow(buffLen);

    /* DEBUG_ONLY_START */
    buff.fill(0);
    /* DEBUG_ONLY_END */

    const arrayBuffer = buff.buffer;
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

/**
 * Allocate buffer space.
 * @param {number} bytes - Number of bytes to allocate
 * @returns {number} - Position of start of reserved space
 */
function alloc(bytes) {
    const startPos = buffPos;
    buffPos += bytes;
    if (buffPos > buffLen) growBuffer();
    return startPos;
}

/**
 * Allocate buffer space with start aligned.
 * @param {number} bytes - Number of bytes to allocate
 * @param {number} align - Alignment in bytes
 * @returns {number} - Position of start of reserved space
 */
function allocAligned(bytes, align) {
    alignPos(align);
    return alloc(bytes);
}

/**
 * Grow buffer.
 * @returns {undefined}
 */
function growBuffer() {
    do {
        buffLen *= 2;
    } while (buffLen < buffPos);

    if (buffLen > SERIALIZE_MAX_BUFFER_SIZE) {
        throw new Error("Exceeded maximum serialization buffer size");
    }

    const oldBuff = buff;
    initBuffer();
    setBuff.call(buff, oldBuff);
}

growBuffer.toString = () =>
    Function.prototype.toString.call(growBuffer) +
    "\n\nconst setBuff = Buffer.prototype.set;";

/**
 * Align `buffPos` to specified alignment.
 * @param {number} align - Aligment
 * @returns {undefined}
 */
function alignPos(align) {
    if (align !== 1) {
        const modulus = buffPos & (align - 1);
        if (modulus !== 0) buffPos += align - modulus;
    }
}

/**
 * Write short string to buffer.
 * String must be 1-7 chars long.
 * If non-ASCII character encountered, stop and return `false`.
 * @param {string} str - String
 * @param {number} pos - Position in buffer to write at
 * @param {number} strLen - Length of string
 * @returns {boolean} - `true` if written successfully
 */
function writeShortStringToBuffer(str, pos, strLen) {
    let strPos = 0;
    do {
        const c = charCodeAt.call(str, strPos);
        if (c >= 128) return false;
        buff[pos++] = c;
    } while (++strPos < strLen);
    return true;
}

/**
 * Write string to buffer, encoded as UTF8.
 * String must be at least 1 character long.
 * Assume common case that string contains no Unicode characters.
 * If a Unicode character is encountered, fall back to `Buffer.prototype.utf8Write()`.
 *
 * @param {string} str - String
 * @param {Buffer} buff - Buffer to write bytes to
 * @param {number} strLen - Length of string (in characters)
 * @param {number} pos - Position in buffer to write to
 * @returns {number} - Number of bytes written
 */
function writeStringToBuffer(str, buff, strLen, pos) {
    let strPos = 0;
    do {
        const c = charCodeAt.call(str, strPos);
        if (c >= 128) return utf8Write.call(buff, str, pos - strPos);
        buff[pos++] = c;
    } while (++strPos < strLen);
    return strLen;
}

writeStringToBuffer.toString = () =>
    Function.prototype.toString.call(writeStringToBuffer) +
    "\n\nconst { charCodeAt } = String.prototype;";

/**
 * Write ASCII string to buffer.
 * String must be at least 1 character long.
 * @param {string} str - String
 * @param {Buffer} buff - Buffer to write bytes to
 * @param {number} strLen - Length of string (in characters, or bytes - equivalent for ASCII strings)
 * @param {number} pos - Position in buffer to write to
 * @returns {undefined}
 */
function writeAsciiStringToBuffer(str, buff, strLen, pos) {
    let strPos = 0;
    do {
        buff[pos++] = charCodeAt.call(str, strPos);
    } while (++strPos < strLen);
}

/**
 * Log contents of section of buffer.
 * This function is added to start of all `deserialize` functions
 * in generated code in debug mode.
 * It is not included in production code.
 * @param {string} typeName - Type name
 * @param {number} pos - Start position in buffer
 * @param {number} length - Length of buffer section
 */
function debugBuff(typeName, pos, length) {
    console.log(`\x1b[36m${typeName}\x1b[0m:`, pos, pos % 16);

    if (length === undefined) length = 128;
    const str = buff.toString("hex", pos, pos + length);
    const mod = (pos % 16) * 2;
    let out =
        `\x1b[31m[${`${pos - mod / 2}`.padStart(5, "0")}]\x1b[0m` +
        " ".repeat(mod + Math.ceil(mod / 8));
    for (let offset = 0; offset < str.length; offset += 2) {
        if ((offset + mod) % 32 === 0 && offset !== 0) {
            out += `\n\x1b[31m[${`${pos + offset / 2}`.padStart(
                5,
                "0"
            )}]\x1b[0m`;
        }
        if ((offset + mod) % 8 === 0) out += " ";
        out += str.slice(offset, offset + 2);
    }
    console.log(out);
}

/**
 * Log position in output buffer where writing bytes for a structure.
 * This function is added to start of all `serialize` functions
 * in generated code in debug mode.
 * It is not included in production code.
 * @param {string} typeName - Type name
 * @param {number} pos - Position being written in buffer
 * @returns {undefined}
 */
function debugAst(typeName, pos) {
    console.log(`${typeName}:`, pos, pos % 16);
}

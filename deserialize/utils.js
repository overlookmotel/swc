"use strict";

// Imports
const {
    PROGRAM_LENGTH_PLUS_4,
    PROGRAM_LENGTH_PLUS_8,
    SERIALIZE_INITIAL_BUFFER_SIZE,
    SERIALIZE_MAX_BUFFER_SIZE,
} = require("./constants.js");

// Exports

module.exports = {
    deserialize,
    serialize,
    resetBuffer,
    initBuffer,
    alignPos,
    alloc,
    growBuffer,
    writeStringToBuffer,
    shiftBytesAndFree,
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

    // Allocate space for `VersionedSerializable` (4 bytes)
    // + `Program` node + pointer to `VersionedSerializable` (4 bytes)
    buffPos = buffLen - PROGRAM_LENGTH_PLUS_8;

    // Write `VersionedSerializable` version to buffer before `Program` node
    uint32[buffPos >>> 2] = AST_VERSION;

    // Write pointer to `VersionedSerializable` at end of buffer
    int32[(buffLen >>> 2) - 1] = -PROGRAM_LENGTH_PLUS_4;

    // Serialize program
    serializeProgram(ast, buffPos + 4);

    // Ensure start of buffer is aligned on 8
    alignPos(8);

    return subarray.call(buff, buffPos);
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
    int32 = new Int32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

/**
 * Align `buffPos` to specified alignment.
 * `align` must be no more than 8.
 * Therefore, no need to check if more space needs to be allocated.
 * Buffer length is always a multiple of 8.
 * TODO Could make this more efficient by having separate functions for each alignment.
 * @param {number} align - Aligment
 * @returns {undefined}
 */
function alignPos(align) {
    // 1 << 32 = 4294967296
    if (align !== 1) buffPos &= 4294967296 - align;
}

/**
 * Allocate buffer space.
 * @param {number} bytes - Number of bytes to allocate
 * @returns {number} - Number of bytes buffer grew by
 */
function alloc(bytes) {
    const bufferGrownByBytes = bytes <= buffPos ? 0 : growBuffer(bytes);
    buffPos -= bytes;
    return bufferGrownByBytes;
}

/**
 * Grow buffer.
 * Creates a new buffer with enough free space to accomodate allocation,
 * and copies the current buffer to end of new buffer.
 * i.e. New buffer has free space at *start*.
 * Buffer is grown in multiples of previous buffer size.
 * i.e. Buffer doubles in size. If not enough space, it doubles again,
 * and so on until amount of free space is sufficient.
 * `buffPos` is updated to point to the new address.
 * @param {number} minBytes - Minimum number of free bytes required
 * @returns {number} - Num bytes buffer grown by
 */
function growBuffer(minBytes) {
    let grownByBytes = 0;
    do {
        grownByBytes += buffLen;
        buffPos += buffLen;
        buffLen *= 2;
    } while (minBytes > buffPos);

    if (buffLen > SERIALIZE_MAX_BUFFER_SIZE) {
        throw new Error("Exceeded maximum serialization buffer size");
    }

    const oldBuff = buff;
    initBuffer();
    setBuff.call(buff, oldBuff, grownByBytes);

    return grownByBytes;
}

growBuffer.toString = () =>
    Function.prototype.toString.call(growBuffer) +
    "\n\nconst setBuff = Buffer.prototype.set;";

/**
 * Write string to buffer if it's all ASCII characters.
 * If non-ASCII character encountered, stop and return `false`.
 * @param {string} str - String
 * @param {number} pos - Position in buffer to write at
 * @param {number} strLen - Length of string
 * @returns {boolean} - `true` if written successfully
 */
function writeStringToBuffer(str, pos, strLen) {
    let strPos = 0;
    do {
        const c = charCodeAt.call(str, strPos);
        if (c >= 128) return false;
        buff[pos++] = c;
    } while (++strPos < strLen);
    return true;
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
 * Shift up bytes in buffer.
 * If `allocBytes` have been allocated, starting at `buffPos`, and only `len` bytes used,
 * shifts the bytes up so they occupy the end of the allocated space.
 * `buffPos` is then incremented to point to the new address of the start of the bytes.
 *
 * i.e.:
 * `allocBytes` = 8, `len` = 5
 * Before: Buffer contains `xxxxABCDExxx`, `buffPos` = 4.
 * After : Buffer contains `xxxxxxxABCDE`, `buffPos` = 7.
 * (actually buff contains `xxxxABCABCDE`, but first `ABC` is free for over-writing)
 *
 * @param {number} len - Number of bytes to shift
 * @param {number} allocBytes - Number of bytes allocated, starting at `buffPos`
 * @returns {undefined}
 */
function shiftBytesAndFree(len, allocBytes) {
    const numBytesFree = allocBytes - len;
    if (numBytesFree > 0) {
        const startPos = buffPos;
        copyWithinBuffer.call(
            buff,
            (buffPos += numBytesFree),
            startPos,
            startPos + len
        );

        /* DEBUG_ONLY_START */
        // Zero out bytes which were moved.
        // This is not required, but useful when debugging so buffer is clean.
        for (let pos = startPos; pos < buffPos; pos++) {
            buff[pos] = 0;
        }
        /* DEBUG_ONLY_END */
    }
}

shiftBytesAndFree.toString = () =>
    Function.prototype.toString.call(shiftBytesAndFree) +
    "\n\nconst copyWithinBuffer = Buffer.prototype.copyWithin;";

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

'use strict';

// Imports
const {
    PROGRAM_LENGTH, PROGRAM_ALIGN,
    SERIALIZE_INITIAL_BUFFER_SIZE, SCRATCH_INITIAL_BUFFER_SIZE,
    SERIALIZE_MAX_BUFFER_SIZE, SCRATCH_MAX_BUFFER_SIZE
} = require('./constants.js');

// Exports

module.exports = {
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
    freeScratch,
    writeScratchUint32,
    copyFromScratch,
    writeStringToBuffer,
    writeAsciiStringToBuffer,
    debugBuff,
    debugAst
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
    float64 = new Float64Array(arrayBuffer, 0, arrayBuffer.byteLength >> 3);
    return deserializeProgram(buffIn.byteOffset + buffIn.length - PROGRAM_LENGTH);
}
let buff, int32, uint32, float64;

/**
 * Serialize AST to buffer.
 * @param {Object} ast - AST
 * @returns {Buffer} - Serialized buffer
 */
function serialize(ast) {
    pos = 0;
    buffFree = buffLen;

    // Start scratch at 8 to allow 0 to be used as a special value.
    // Scratch must be aligned in blocks of 8.
    freeScratch(8);

    /* DEBUG_ONLY_START */
    resetBuffers();
    /* DEBUG_ONLY_END */

    const storePos = serializeProgram(ast);
    alignPos(PROGRAM_ALIGN);
    alloc(PROGRAM_LENGTH);
    finalizeProgram(storePos);

    return buff.subarray(0, pos);
}
let pos, scratchPos, scratchFree;

/**
 * Reset serialization buffers.
 * @returns {undefined}
 */
function resetBuffers() {
    buffLen = SERIALIZE_INITIAL_BUFFER_SIZE;
    scratchLen = SCRATCH_INITIAL_BUFFER_SIZE;
    initBuffer();
    initScratch();
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
    uint16 = new Uint16Array(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

/**
 * Allocate bytes in output buffer.
 * If buffer is not long enough to hold them, grow buffer.
 * @param {number} bytes - Number of bytes to allocate in output buffer
 * @returns {undefined}
 */
function alloc(bytes) {
    buffFree -= bytes;
    if (buffFree < 0) growBuffer(bytes);
}

/**
 * Grow buffer.
 * @param {number} bytes - Minimum bytes to grow by
 * @returns {undefined}
 */
function growBuffer(bytes) {
    const minLen = pos + bytes;
    do {
        buffLen *= 2;
    } while (buffLen < minLen);

    if (buffLen > SERIALIZE_MAX_BUFFER_SIZE) {
        throw new Error('Exceeded maximum serialization buffer size');
    }

    buffFree = buffLen - minLen;

    const oldBuff = buff;
    initBuffer();
    buff.set(oldBuff);
}

/**
 * Align pos to specified alignment.
 * e.g. `alignPos(4)` will ensure `pos % 4 === 0`.
 * @param {number} align - Alignment in bytes
 * @returns {undefined}
 */
function alignPos(align) {
    if (align !== 1) {
        const modulus = pos & (align - 1);
        if (modulus !== 0) pos += align - modulus;
    }
}

/**
 * Init scratch buffer for serializer.
 * Scratch buffer is used for temp storage during serialization.
 * TypedArray views over buffer are also created.
 * `Buffer.allocUnsafeSlow()` is used to ensure buffer is not created as part of NodeJS's pool
 * so the data starts at byte 0 of the underlying `ArrayBuffer`.
 * @returns {undefined}
 */
function initScratch() {
    scratchBuff = Buffer.allocUnsafeSlow(scratchLen);
    const arrayBuffer = scratchBuff.buffer;
    scratchUint16 = new Uint16Array(arrayBuffer);
    scratchUint32 = new Uint32Array(arrayBuffer);
    scratchFloat64 = new Float64Array(arrayBuffer);
}

/**
 * Allocate scratch space of specified number of bytes.
 * Advance position for next allocation.
 * Return position of start of scratch space allocated.
 * 
 * Scratch must be allocated in multiples of 8 bytes.
 * This is to support writing `Float64`s to scratch.
 * 
 * @param {number} bytes - Number of bytes to allocate
 * @returns {number} - Position of start of reserved scratch space
 */
function allocScratch(bytes) {
    /* DEBUG_ONLY_START */
    if (bytes % 8 !== 0) throw new Error('Scratch must be allocated in multiples of 8 bytes');
    /* DEBUG_ONLY_END */

    const startPos = scratchPos;
    scratchPos += bytes;
    scratchFree -= bytes;
    if (scratchFree < 0) growScratch();
    return startPos;
}

/**
 * Allocate scratch space.
 * Same as `allocScratch()` but ensures number of bytes allocated is a multiple of 8,
 * to preserve correct alignment.
 * @param {number} bytes - Number of bytes to allocate
 * @returns {number} - Position of start of reserved scratch space
 */
function allocScratchAligned(bytes) {
    const mod = bytes & 7;
    return allocScratch(mod === 0 ? bytes : bytes + 8 - mod);
}

/**
 * Grow scratch buffer.
 * @returns {undefined}
 */
function growScratch() {
    do {
        scratchLen *= 2;
    } while (scratchLen < scratchPos);

    if (scratchLen > SCRATCH_MAX_BUFFER_SIZE) {
        throw new Error('Exceeded maximum scratch buffer size');
    }

    scratchFree = scratchLen - scratchPos;

    const oldScratchBuff = scratchBuff;
    initScratch();
    scratchBuff.set(oldScratchBuff);
}

/**
 * Free scratch space.
 * @param {number} freePos - Position in scratch to free after
 * @returns {undefined}
 */
function freeScratch(freePos) {
    scratchPos = freePos;
    scratchFree = scratchLen - freePos;
}

/**
 * Write Uint32 to scratch buffer.
 * In some places, it can't be done directly inline.
 *
 * e.g.:
 * 1. `writeScratchUint32(pos, serialize(node));`
 * 2. `scratchUint32[pos] = serialize(node);`
 * The two appear equivalent, but there is a subtle difference.
 *
 * Calling the serializer may cause scratch to be grown.
 * So, the difference is that in (2), `scratchUint32` is the first value to be evaluated,
 * and a reference is obtained to `scratchUint32` as it is before `serialize()` is called.
 * If `serialize()` causes scratch to be grown, `scratchUint32` in global scope is replaced
 * with a new buffer. But the local reference to `scratchUint32` still refers to the old buffer.
 * So the write is made to the old buffer and has no effect.
 * `writeScratchUint32()` evaluates `scratchUint32` last,
 * and therefore always gets an up-to-date reference.
 *
 * @param {number} pos32 - Position in scratch buffer to write to (in 4-byte multiple)
 * @param {number} value - Value to write
 * @returns {undefined}
 */
function writeScratchUint32(pos32, value) {
    scratchUint32[pos32] = value;
}

/**
 * Copy bytes from scratch buffer to output buffer.
 * Uses fastest method available depending on alignment of output buffer position.
 *
 * `len` must be at least 8 bytes.
 * Scratch buffer position must be aligned to 4 bytes.
 * Both of these conditions are satisfied when copying `JsWord` content.
 *
 * @param {number} scratchPos - Starting position in scratch buffer
 * @param {number} len - Number of bytes to copy (minimum 8)
 * @returns {undefined}
 */
function copyFromScratch(scratchPos, len) {
    if ((pos & 3) === 0) {
        // Output position is aligned to 4 bytes.
        // Copy bulk as Uint32s.
        let pos32 = pos >> 2,
            scratchPos32 = scratchPos >> 2;
        const last32 = pos32 + (len >> 2) - 1;
        uint32[pos32] = scratchUint32[scratchPos32];
        uint32[++pos32] = scratchUint32[++scratchPos32];
        while (pos32 < last32) {
            uint32[++pos32] = scratchUint32[++scratchPos32];
        }

        // Copy final 1-3 bytes as Uint16 and/or Uint8
        if (len & 3) {
            if (len & 2) {
                pos32++;
                scratchPos32++;
                uint16[pos32 << 1] = scratchUint16[scratchPos32 << 1];
                if (len & 1) buff[(pos32 << 2) + 2] = scratchBuff[(scratchPos32 << 2) + 2];
            } else {
                buff[(pos32 + 1) << 2] = scratchBuff[(scratchPos32 + 1) << 2];
            }
        }
    } else if ((pos & 1) === 0) {
        // Output position is aligned to 2 bytes.
        // Copy bulk as Uint16s.
        let pos16 = pos >> 1,
            scratchPos16 = scratchPos >> 1;
        const last16 = pos16 + (len >> 1) - 1;
        uint16[pos16] = scratchUint16[scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        while (pos16 < last16) {
            uint16[++pos16] = scratchUint16[++scratchPos16];
        }

        // Copy final byte as Uint8
        if (len & 1) buff[(pos16 + 1) << 1] = scratchBuff[(scratchPos16 + 1) << 1];
    } else {
        // Target position not aligned. Copy all as Uint8s.
        let pos8 = pos,
            scratchPos8 = scratchPos;
        const last8 = pos + len - 1;
        buff[pos8] = scratchBuff[scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        while (pos8 < last8) {
            buff[++pos8] = scratchBuff[++scratchPos8];
        }
    }
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

writeStringToBuffer.toString = () => (
    Function.prototype.toString.call(writeStringToBuffer)
    + '\n\nconst { charCodeAt } = String.prototype;'
);

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
    const str = buff.toString('hex', pos, pos + length);
    const mod = (pos % 16) * 2;
    let out = `\x1b[31m[${`${pos - mod / 2}`.padStart(5, '0')}]\x1b[0m`
        + ' '.repeat(mod + Math.ceil(mod / 8));
    for (let offset = 0; offset < str.length; offset += 2) {
        if ((offset + mod) % 32 === 0 && offset !== 0) {
            out += `\n\x1b[31m[${`${pos + offset / 2}`.padStart(5, '0')}]\x1b[0m`;
        }
        if ((offset + mod) % 8 === 0) out += ' ';
        out += str.slice(offset, offset + 2);
    }
    console.log(out);
}

/**
 * Log position in output buffer where writing bytes for a structure.
 * This function is added to start of all `serialize` and `finalize` functions
 * in generated code in debug mode.
 * It is not included in production code.
 * @param {string} typeName - Type name
 */
function debugAst(typeName) {
    console.log(`${typeName}:`, pos, pos % 16);
}

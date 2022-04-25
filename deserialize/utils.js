'use strict';

// Exports

module.exports = {
    initBuffer,
    alloc,
    alignPos,
    initScratch,
    allocScratch,
    allocScratchAligned,
    writeScratchUint32,
    copyFromScratch,
    debugBuff,
    debugAst
};

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
    const end = pos + bytes;
    if (end <= buffLen) return;

    do {
        buffLen *= 2;
    } while (buffLen < end);

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

    if (scratchPos > scratchLen) {
        do {
            scratchLen *= 2;
        } while (scratchLen < scratchPos);

        const oldScratchBuff = scratchBuff;
        initScratch();
        scratchBuff.set(oldScratchBuff);
    }

    return startPos;
}

/**
 * Allocate scratch space.
 * Same as `allocScratch()` but ensures number of bytes allocated is a multiple of 8,
 * to preserve correct alignment.
 * `bytes` must be a multiple of 4.
 * @param {number} bytes - Number of bytes to allocate
 * @returns {number} - Position of start of reserved scratch space
 */
function allocScratchAligned(bytes) {
    return allocScratch((bytes & 4) ? bytes + 4 : bytes);
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

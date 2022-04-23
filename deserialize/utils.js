'use strict';

// Exports

module.exports = {
    finalizeEnum,
    finalizeEnumValue,
    deserializeOption,
    serializeOption,
    finalizeOption,
    deserializeBox,
    serializeBox,
    finalizeBox,
    deserializeVec,
    serializeVec,
    finalizeVec,
    initBuffer,
    alloc,
    alignAndAlloc,
    initScratch,
    allocScratch,
    allocScratchAligned,
    writeScratchUint32,
    copyFromScratch,
    debugBuff,
    debugAst
};

function finalizeEnum(id, finalizeData, finalize, offset, length) {
    const startPos = pos;
    buff[pos] = id;
    pos += offset;
    finalize(finalizeData);
    pos = startPos + length;
}

function finalizeEnumValue(id) {
    buff[pos] = id;
    pos++;
}

function deserializeOption(pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

/**
 * Serialize Option.
 * Store in scratch:
 * - Byte 0: 0 if option disabled, 1 if enabled
 * - Bytes 4-7: Serialize result
 * Return scratch position (in bytes).
 * @param {*} value - Value or `null`
 * @param {Function} serialize - Serialize function for type
 * @returns {number} - Scratch position (in bytes)
 */
function serializeOption(value, serialize) {
    const storePos = allocScratch(8);
    if (value === null) {
        scratchBuff[storePos] = 0;
    } else {
        scratchBuff[storePos] = 1;
        // Need to use `writeScratchUint32()` - reason explained in that function's definition
        writeScratchUint32((storePos >> 2) + 1, serialize(value));
    }
    return storePos;
}

function finalizeOption(storePos, finalize, valueLength, offset) {
    if (scratchBuff[storePos] === 0) {
        // Option disabled
        buff[pos] = 0;
        pos += offset + valueLength;
    } else {
        // Option enabled
        buff[pos] = 1;
        pos += offset;
        finalize(scratchUint32[(storePos >> 2) + 1]);
    };
}

function deserializeBox(pos, deserialize) {
    return deserialize(pos + int32[pos >> 2]);
}

/**
 * Serialize Box.
 * Return position of boxed value in buffer.
 * @param {*} value - Boxed value
 * @param {Function} serialize - Serialize function for type
 * @param {Function} finalize - Finalize function for type
 * @param {number} valueLength - Length of value type
 * @param {number} valueAlign - Alignment of value type
 * @returns {number} - Position of boxed value in buffer
 */
function serializeBox(value, serialize, finalize, valueLength, valueAlign) {
    const finalizeData = serialize(value);
    alignAndAlloc(valueLength, valueAlign);
    const valuePos = pos;
    finalize(finalizeData);
    return valuePos;
}

function finalizeBox(valuePos) {
    int32[pos >> 2] = valuePos - pos;
    pos += 4;
}

function deserializeVec(pos, deserialize, length) {
    const pos32 = pos >> 2;

    /* DEBUG_ONLY_START */
    console.log('Vec pointer target:', pos + int32[pos32]);
    /* DEBUG_ONLY_END */

    const numEntries = uint32[pos32 + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    pos += int32[pos32];
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(pos);
        pos += length;
    }
    return entries;
}

/**
 * Serialize Vec.
 * Store in scratch:
 * - Bytes 0-3: Position of start of values in buffer (Uint32)
 * - Bytes 4-7: Number of values (Uint32)
 * Return scratch position (in multiples of 4 bytes).
 *
 * @param {Array<*>} values - Values to serialize
 * @param {Function} serialize - Serialize function for type
 * @param {Function} finalize - Finalize function for type
 * @param {number} valueLength - Length of value type
 * @param {number} valueAlign - Alignment of value type
 * @returns {number} - Scratch position (in multiples of 4 bytes)
 */
function serializeVec(values, serialize, finalize, valueLength, valueAlign) {
    // Allocate 8 bytes scratch
    const storePos32 = allocScratch(8) >> 2;

    // Store number of values in scratch bytes 4-7
    const numValues = values.length;
    scratchUint32[storePos32 + 1] = numValues;

    if (numValues === 0) {
        alignAndAlloc(0, valueAlign);
        scratchUint32[storePos32] = pos;
        return storePos32;
    }

    // Serialize values
    const finalizeData = new Array(numValues);
    for (let i = 0; i < numValues; i++) {
        finalizeData[i] = serialize(values[i]);
    }

    // Finalize values.
    // Store position of values in scratch bytes 0-3.
    alignAndAlloc(valueLength * numValues, valueAlign);
    scratchUint32[storePos32] = pos;
    for (let i = 0; i < numValues; i++) {
        finalize(finalizeData[i]);
    }

    // Return Uint32 position in scratch store
    return storePos32;
}

function finalizeVec(storePos32) {
    const pos32 = pos >> 2;
    int32[pos32] = scratchUint32[storePos32] - pos;
    uint32[pos32 + 1] = scratchUint32[storePos32 + 1];
    pos += 8;
}

function initBuffer() {
    buff = Buffer.allocUnsafeSlow(buffLen);

    /* DEBUG_ONLY_START */
    buff.fill(0);
    /* DEBUG_ONLY_END */

    const arrayBuffer = buff.buffer;
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

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

function alignAndAlloc(bytes, align) {
    if (align !== 1) {
        const modulus = pos & (align - 1);
        if (modulus !== 0) pos += align - modulus;
    }
    alloc(bytes);
}

function initScratch() {
    scratchBuff = Buffer.allocUnsafeSlow(scratchLen);
    scratchArrayBuffer = scratchBuff.buffer;
    scratchUint32 = new Uint32Array(scratchArrayBuffer);
    scratchFloat64 = new Float64Array(scratchArrayBuffer);
}

/**
 * Allocate scratch space of specified number of bytes.
 * Advance position for next allocation.
 * Return position of start of scratch space allocated.
 * 
 * Scratch must be allocated in multiples of 8 bytes.
 * This is to support writing `Float64`s to scratch.
 * 
 * @param {number} bytes - Num bytes
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
 * @param {number} bytes - Num bytes
 * @returns {number} - Position of start of reserved scratch space
 */
function allocScratchAligned(bytes) {
    const modulus = bytes & 7;
    if (modulus === 0) return allocScratch(bytes);
    return allocScratch(bytes + 8 - modulus);
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
function writeScratchUint32(pos, value) {
    scratchUint32[pos] = value;
}

/**
 * Copy bytes from scratch buffer to output buffer.
 * @param {number} scratchPos - Starting position in scratch buffer
 * @param {number} len - Number of bytes to copy
 * @returns {undefined}
 */
function copyFromScratch(scratchPos, len) {
    buff.set(new Uint8Array(scratchArrayBuffer, scratchPos, len), pos);
}

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

function debugAst(typeName) {
    console.log(`${typeName}:`, pos, pos % 16);
}

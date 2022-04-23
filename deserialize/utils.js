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
    debugBuff,
    debugAst
};

function finalizeEnum([id, align, finalizeData, finalize], length) {
    const startPos = pos;
    buff[pos] = id;
    pos += align;
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

function serializeOption(value, serialize) {
    if (value === null) return null;
    return serialize(value);
}

function finalizeOption(finalizeData, finalize, valueLength, offset) {
    if (finalizeData === null) {
        buff[pos] = 0;
        pos += offset + valueLength;
    } else {
        buff[pos] = 1;
        pos += offset;
        finalize(finalizeData);
    };
}

function deserializeBox(pos, deserialize) {
    return deserialize(pos + int32[pos >> 2]);
}

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

function serializeVec(values, serialize, finalize, valueLength, valueAlign) {
    const numValues = values.length;
    if (numValues === 0) {
        alignAndAlloc(0, valueAlign);
        return [0, pos];
    }

    const finalizeData = new Array(numValues);
    for (let i = 0; i < numValues; i++) {
        finalizeData[i] = serialize(values[i]);
    }

    alignAndAlloc(valueLength * numValues, valueAlign);
    const valuesPos = pos;
    for (let i = 0; i < numValues; i++) {
        finalize(finalizeData[i]);
    }
    return [numValues, valuesPos];
}

function finalizeVec([numValues, valuesPos]) {
    int32[pos >> 2] = valuesPos - pos;
    uint32[(pos >> 2) + 1] = numValues;
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
    oldBuff.copy(buff, 0, 0, pos);
}

function alignAndAlloc(bytes, align) {
    if (align !== 1) {
        const modulus = pos & (align - 1);
        if (modulus !== 0) pos += align - modulus;
    }
    alloc(bytes);
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

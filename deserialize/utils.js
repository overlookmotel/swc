'use strict';

// Exports

module.exports = {
    deserializeOption,
    deserializeBox,
    deserializeVec,
    getPtr,
    readUint32LE,
    readInt32LE,
    debugBuff
};

function deserializeOption(buff, pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(buff, pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(buff, pos, deserialize) {
    return deserialize(buff, getPtr(buff, pos));
}

function deserializeVec(buff, pos, deserialize, length) {
    const numEntries = readUint32LE(buff, pos + 4);
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    let vecPos = getPtr(buff, pos);
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(buff, vecPos);
        vecPos += length;
    }
    return entries;
}

function getPtr(buff, pos) {
    return pos + readInt32LE(buff, pos);
}

/**
 * Read unsigned Uint32LE value from Buffer.
 * Code copied from NodeJS's `Buffer.prototype.readUint32LE` method,
 * but without validation and bounds-checking.
 * Changed `buff[++pos]` in NodeJS's code to `buff[pos + 1]` as it's slightly faster.
 * @param {Buffer} buff - Buffer
 * @param {number} pos - Position
 * @returns {number} - Uint32 value
 */
function readUint32LE(buff, pos) {
    return buff[pos]
        + buff[pos + 1] * 2 ** 8
        + buff[pos + 2] * 2 ** 16
        + buff[pos + 3] * 2 ** 24;
}

/**
 * Read signed Int32LE value from Buffer.
 * Code copied from NodeJS's `Buffer.prototype.readInt32LE` method,
 * but without validation and bounds-checking.
 * Changed `buff[++pos]` in NodeJS's code to `buff[pos + 1]` as it's slightly faster.
 * @param {Buffer} buff - Buffer
 * @param {number} pos - Position
 * @returns {number} - Int32 value
 */
function readInt32LE(buff, pos) {
    return buff[pos]
        + buff[pos + 1] * 2 ** 8
        + buff[pos + 2] * 2 ** 16
        + (buff[pos + 3] << 24);
}

function debugBuff(typeName, buff, pos, length) {
    console.log(`${typeName}:`, pos, pos % 16);

    if (length === undefined) length = 128;
    const str = buff.toString('hex', pos, pos + length);
    const mod = (pos % 16) * 2;
    let out = ' '.repeat(mod + Math.floor(mod / 8));
    for (let offset = 0; offset < str.length; offset += 2) {
        out += str.slice(offset, offset + 2);
        if ((offset + mod) % 32 === 30) {
            out += '\n';
        } else if ((offset + mod) % 8 === 6) {
            out += ' ';
        }
    }
    console.log(out);
}

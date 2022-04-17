'use strict';

// Exports

module.exports = {
    deserializeOption,
    deserializeBox,
    deserializeVec,
    getPtr,
    debugBuff
};

function deserializeOption(buff, pos, deserialize, offset) {
    switch (buff.readUInt8(pos)) {
        case 0: return null;
        case 1: return deserialize(buff, pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(buff, pos, deserialize) {
    return deserialize(buff, getPtr(buff, pos));
}

function deserializeVec(buff, pos, deserialize, length) {
    const numEntries = buff.readUInt32LE(pos + 4);
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
    return pos + buff.readInt32LE(pos);
}

function debugBuff(typeName, buff, pos, length) {
    console.log(`${typeName}:`, pos, pos % 16);

    if (length === undefined) length = 128;
    const str = buff.slice(pos, pos + length).toString('hex');
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

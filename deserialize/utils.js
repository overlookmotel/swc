'use strict';

// Exports

module.exports = {
    deserializeOption,
    deserializeBox,
    deserializeVec,
    getPtr,
    debugBuff
};

function deserializeOption(buff, int32, uint32, pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(buff, int32, uint32, pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(buff, int32, uint32, pos, deserialize) {
    return deserialize(buff, int32, uint32, getPtr(int32, pos));
}

function deserializeVec(buff, int32, uint32, pos, deserialize, length) {
    const numEntries = uint32[(pos >> 2) + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    let vecPos = getPtr(int32, pos);
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(buff, int32, uint32, vecPos);
        vecPos += length;
    }
    return entries;
}

function getPtr(int32, pos) {
    return pos + int32[pos >> 2];
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

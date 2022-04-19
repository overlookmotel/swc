'use strict';

// Exports

module.exports = {
    deserializeOption,
    deserializeBox,
    deserializeVec,
    getPtr,
    debugBuff
};

function deserializeOption(pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(pos, deserialize) {
    return deserialize(getPtr(int32, pos));
}

function deserializeVec(pos, deserialize, length) {
    const numEntries = uint32[(pos >> 2) + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    let vecPos = getPtr(int32, pos);
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(vecPos);
        vecPos += length;
    }
    return entries;
}

function getPtr(int32, pos) {
    return pos + int32[pos >> 2];
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

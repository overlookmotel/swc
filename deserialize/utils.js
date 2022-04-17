'use strict';

// Exports

module.exports = { getPtr, debugBuff };

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

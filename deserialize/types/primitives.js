'use strict';

// Imports
const { EnumValue, Custom } = require('../kinds.js');

// Exports

module.exports = {
    JsWord: Custom({
        deserialize(pos) {
            // 8 bytes. Last byte is length.
            // If length <= 7, bytes 0-6 contain the word.
            // Otherwise, bytes 0-3 contain length, and bytes 4-7 a relative pointer to string.
            // TODO I don't think this can be correct.
            // How would you disambiguate between length <= 7 and a pointer whose last byte is e.g. 01?
            let len = buff[pos + 7];
            if (len > 7) {
                const pos32 = pos >> 2;
                len = uint32[pos32];
                // Pointer is relative to byte containing length, not byte containing pointer
                pos += int32[pos32 + 1];
            }

            /* DEBUG_ONLY_START */
            debugBuff('JsWord content', pos, len);
            /* DEBUG_ONLY_END */

            // `Buffer.prototype.utf8Slice` is undocumented but used internally by
            // `Buffer.prototype.toString`. `.utf8Slice` is faster as skips bounds-checking.
            // This line is equivalent to `buff.toString('utf8', pos, pos + len)`.
            return buff.utf8Slice(pos, pos + len);
        },
        serialize(str) {
            const strBuffer = Buffer.from(str, 'utf8'),
                len = strBuffer.length;
            if (len <= 7) return [len, 0, strBuffer];

            const strPos = pos;

            /* DEBUG_ONLY_START */
            debugAst('finalize JsWord content');
            /* DEBUG_ONLY_END */

            alloc(len);
            strBuffer.copy(buff, pos, 0, len);
            pos += len;
            return [len, strPos, undefined];
        },
        finalize([len, strPos, strBuffer]) {
            if (len <= 7) {
                strBuffer.copy(buff, pos, 0, len);
                buff[pos + 7] = len;
            } else {
                uint32[pos >> 2] = len;
                int32[(pos >> 2) + 1] = strPos - pos;
            }
            pos += 8;
        },
        length: 8,
        align: 4
    }),

    Boolean: EnumValue([false, true]),

    Number: Custom({
        deserialize(pos) {
            return float64[pos >> 3];
        },
        serialize(num) {
            return num;
        },
        finalize(num) {
            float64[pos >> 3] = num;
            pos += 16;
        },
        length: 16, // 8 longer than expected. TODO Not sure why.
        align: 8
    }),

    Span: Custom({
        deserialize(pos) {
            const pos32 = pos >> 2;
            return {
                start: uint32[pos32],
                end: uint32[pos32 + 1],
                ctxt: uint32[pos32 + 2]
            };
        },
        serialize(span) {
            return span;
        },
        finalize(span) {
            const pos32 = pos >> 2;
            uint32[pos32] = span.start;
            uint32[pos32 + 1] = span.end;
            uint32[pos32 + 2] = span.ctxt;
            pos += 12;
        },
        length: 12,
        align: 4
    })
};

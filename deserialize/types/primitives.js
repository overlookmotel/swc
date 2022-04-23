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
            // TODO Might be faster to align string to 8 bytes so that the copy later
            // for short strings is aligned to a 64 bit word if it's aligned in output too
            // (which it will be about 50% of the time)
            const storePos = allocScratchAligned(4 + str.length * 2),
                storePos32 = storePos >> 2;

            // `Buffer.prototype.utf8Write` is undocumented but used internally by
            // `Buffer.prototype.write`. `.utf8Write` is faster as skips bounds-checking.
            // This line is equivalent to `scratchBuff.write(str, storePos + 4)`.
            const len = scratchBuff.utf8Write(str, storePos + 4);
            scratchUint32[storePos32] = len;

            if (len <= 7) {
                // Free unused scratch. Scratch must remain aligned to 8-byte chunks.
                scratchPos = storePos + (len <= 4 ? 8 : 16);
                return storePos;
            }

            const strPos = pos;

            /* DEBUG_ONLY_START */
            debugAst('finalize JsWord content');
            /* DEBUG_ONLY_END */

            alloc(len);
            copyFromScratch(storePos + 4, len);
            pos += len;

            scratchPos = storePos + 8; // Free scratch which contained string
            scratchUint32[storePos32 + 1] = strPos;

            return storePos;
        },
        finalize(storePos) {
            const storePos32 = storePos >> 2,
                len = scratchUint32[storePos32];
            if (len <= 7) {
                if (len > 0) {
                    const pos32 = pos >> 2;
                    uint32[pos32] = scratchUint32[storePos32 + 1];
                    if (len > 4) uint32[pos32 + 1] = scratchUint32[storePos32 + 2];
                }

                /* DEBUG_ONLY_START */
                // Zero out extra bytes which were copied after end of string.
                // It doesn't matter that this happens, but makes it hard to validate
                // output by comparing buffers as it introduces a random element.
                if (len !== 0 && len !== 4 && len !== 7) {
                    for (let emptyPos = pos + len; emptyPos < pos + (len < 4 ? 4 : 7); emptyPos++) {
                        buff[emptyPos] = 0;
                    }
                }
                /* DEBUG_ONLY_END */

                buff[pos + 7] = len;
            } else {
                const pos32 = pos >> 2;
                uint32[pos32] = len;
                int32[pos32 + 1] = scratchUint32[storePos32 + 1] - pos;
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
            const storePos64 = allocScratch(8) >> 3;
            scratchFloat64[storePos64] = num;
            return storePos64;
        },
        finalize(storePos64) {
            float64[pos >> 3] = scratchFloat64[storePos64];
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
            // Only need 12 bytes scratch, but scratch must be allocated in 8-byte blocks
            const storePos32 = allocScratch(16) >> 2;
            scratchUint32[storePos32] = span.start;
            scratchUint32[storePos32 + 1] = span.end;
            scratchUint32[storePos32 + 2] = span.ctxt;
            return storePos32;
        },
        finalize(storePos32) {
            const pos32 = pos >> 2;
            uint32[pos32] = scratchUint32[storePos32];
            uint32[pos32 + 1] = scratchUint32[storePos32 + 1];
            uint32[pos32 + 2] = scratchUint32[storePos32 + 2];
            pos += 12;
        },
        length: 12,
        align: 4
    })
};

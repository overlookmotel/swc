'use strict';

// Imports
const { EnumValue, Option, Custom } = require('../kinds/index.js');

// Exports

const { utf8Slice, utf8Write } = Buffer.prototype;

module.exports = {
    JsWord: Custom({
        /**
         * Deserialize string.
         * Strings are serialized by RYKV as follows:
         *   - 8 bytes length, aligned on 4.
         *   - If length <= 7, byte 7 contains length, bytes 0-6 contain the string.
         *   - Otherwise, bytes 0-3 contain length, and bytes 4-7 a relative pointer to string (i32).
         *
         * TODO I don't think this can be quite correct.
         * How would you disambiguate between length <= 7 and a pointer whose last byte is e.g. 01?
         *
         * @param {number} pos - Position in buffer
         * @returns {string} - Decoded string
         */
        deserialize(pos) {
            // Fast path for empty string
            let len = buff[pos + 7];
            if (len === 0) {
                /* DEBUG_ONLY_START */
                debugBuff('JsWord content', pos, len);
                /* DEBUG_ONLY_END */

                return '';
            }

            // Fast path for single-char strings (common in minified code)
            if (len === 1) {
                /* DEBUG_ONLY_START */
                debugBuff('JsWord content', pos, len);
                /* DEBUG_ONLY_END */

                return String.fromCharCode(buff[pos]);
            }

            if (len > 7) {
                const pos32 = pos >> 2;
                len = uint32[pos32];
                // Pointer is relative to byte containing length, not byte containing pointer
                pos += int32[pos32 + 1];

                /* DEBUG_ONLY_START */
                debugBuff('JsWord content', pos, len);
                /* DEBUG_ONLY_END */

                // For longer strings, native method is faster.
                // Determined that the tipping point is 24 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.utf8Slice` is undocumented but used internally by
                // `Buffer.prototype.toString`. `.utf8Slice` is faster as skips bounds-checking.
                // Next line is equivalent to `buff.toString('utf8', pos, pos + len)`.
                if (len > 24) return utf8Slice.call(buff, pos, pos + len);
            }
            /* DEBUG_ONLY_START */
            else {
                debugBuff('JsWord content', pos, len);
            }
            /* DEBUG_ONLY_END */

            // String 24 chars or shorter - JS implementation is faster than call into C++.
            // Bail out and use `buff.utf8Slice()` if unicode character found (uncommon case).
            const arr = new Array(len),
                end = pos + len;
            let arrPos = 0;
            do {
                const c = buff[pos];
                if (c >= 128) return utf8Slice.call(buff, pos - arrPos, end);
                arr[arrPos++] = c;
            } while (++pos < end);
            return String.fromCharCode(...arr);
        },
        generateDeserializer() {
            return Custom.prototype.generateDeserializer.call(this)
                + `\n\n${' '.repeat(8)}const { utf8Slice } = Buffer.prototype;`;
        },
        serialize(str) {
            // Handle empty string
            const strLen = str.length;
            if (strLen === 0) {
                const storePos = allocScratch(8);
                scratchUint32[storePos >> 2] = 0;
                return storePos;
            }

            // If string is longer than 7 chars, write direct to output buffer
            if (strLen > 7) {
                /* DEBUG_ONLY_START */
                debugAst('finalize JsWord content');
                /* DEBUG_ONLY_END */

                // Allocate 3 bytes for every character (in case of Unicode chars).
                // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encodeInto#buffer_sizing
                // Does not matter if over-allocate, as next allocation will start from end pos
                // of actual string, regardless of how much space has been pre-allocated.
                alloc(strLen * 3);

                // For longer strings, native method is faster.
                // Determined that the tipping point is 42 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.utf8Write` is undocumented but used internally by
                // `Buffer.prototype.write`. `.utf8Write` is faster as skips bounds-checking.
                // `utf8Write.call(buff, str, pos)` is equivalent to `buff.write(str, pos)`.
                const len = strLen < 42
                    ? writeStringToBuffer(str, buff, strLen, pos)
                    : utf8Write.call(buff, str, pos);

                const storePos = allocScratch(8),
                    storePos32 = storePos >> 2;
                scratchUint32[storePos32] = len;
                scratchUint32[storePos32 + 1] = pos;
                pos += len;
                return storePos;
            }

            // Likely string needs to be added to output buffer in `finalize()`, as is 7 chars or less.
            // Uncommon case is if it contains Unicode chars, and UTF8 byte length
            // may turn out to be greater than 7.
            // So write to scratch buffer on assumption UTF8-encoded string is 7 chars or less.
            // If it turns out longer than 7 chars, copy to output buffer in 2nd step.

            // Allocate 3 bytes scratch for every character (in case of Unicode chars)
            // + 4 bytes for length. Ensure allocate scratch in multiple of 8 bytes.
            const storePos = allocScratchAligned(4 + strLen * 3),
                storePos32 = storePos >> 2;
            const len = writeStringToBuffer(str, scratchBuff, strLen, storePos + 4);
            scratchUint32[storePos32] = len;

            if (len <= 7) {
                // Free unused scratch. Scratch must remain aligned to 8-byte chunks.
                scratchPos = storePos + (len <= 4 ? 8 : 16);
                return storePos;
            }

            // UTF8-encoded string ended up being longer than 7 chars - move to output buffer
            /* DEBUG_ONLY_START */
            debugAst('finalize JsWord content');
            /* DEBUG_ONLY_END */

            alloc(len);
            copyFromScratch(storePos + 4, len);

            scratchPos = storePos + 8; // Free scratch which contained string
            scratchUint32[storePos32 + 1] = pos;

            pos += len;

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
        generateSerializer() {
            return Custom.prototype.generateSerializer.call(this)
                + `\n\n${' '.repeat(8)}const { utf8Write } = Buffer.prototype;`;
        },
        length: 8,
        align: 4
    }),

    AsciiJsWord: Custom({
        /**
         * Deserialize string where it's known from context to be ASCII - no Unicode characters.
         * This requires less overhead as each character is always represented by 1 byte in UTF8.
         * @param {number} pos - Position in buffer
         * @returns {string} - Decoded string
         */
        deserialize(pos) {
            // Fast path for empty string
            let len = buff[pos + 7];
            if (len === 0) {
                /* DEBUG_ONLY_START */
                debugBuff('JsWord content', pos, len);
                /* DEBUG_ONLY_END */

                return '';
            }

            // Fast path for single-char strings
            if (len === 1) {
                /* DEBUG_ONLY_START */
                debugBuff('AsciiJsWord content', pos, len);
                /* DEBUG_ONLY_END */

                return String.fromCharCode(buff[pos]);
            }

            if (len > 7) {
                const pos32 = pos >> 2;
                len = uint32[pos32];
                // Pointer is relative to byte containing length, not byte containing pointer
                pos += int32[pos32 + 1];

                /* DEBUG_ONLY_START */
                debugBuff('AsciiJsWord content', pos, len);
                /* DEBUG_ONLY_END */

                // For longer strings, native method is faster.
                // Determined that the tipping point is 28 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.asciiSlice` is undocumented but used internally by
                // `Buffer.prototype.toString`. `.asciiSlice` is faster as skips bounds-checking.
                // Next line is equivalent to `buff.toString('ascii', pos, pos + len)`.
                if (len > 28) return asciiSlice.call(buff, pos, pos + len);
            }
            /* DEBUG_ONLY_START */
            else {
                debugBuff('AsciiJsWord content', pos, len);
            }
            /* DEBUG_ONLY_END */

            // String 28 chars or shorter - JS implementation is faster than call into C++
            const arr = new Array(len),
                end = pos + len;
            let arrPos = 0;
            do {
                arr[arrPos++] = buff[pos];
            } while (++pos < end);
            return String.fromCharCode(...arr);
        },
        generateDeserializer() {
            return Custom.prototype.generateDeserializer.call(this)
                + `\n\n${' '.repeat(8)}const { asciiSlice } = Buffer.prototype;`;
        },
        serialize(str) {
            // Handle empty string
            const len = str.length;
            if (len === 0) {
                const storePos = allocScratch(8);
                scratchUint32[storePos >> 2] = 0;
                return storePos;
            }

            // If string is longer than 7 chars, write direct to output buffer
            if (len > 7) {
                /* DEBUG_ONLY_START */
                debugAst('finalize AsciiJsWord content');
                /* DEBUG_ONLY_END */

                // Allocate 1 byte for every character
                alloc(len);

                // For longer strings, native method is faster.
                // Determined that the tipping point is 48 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.asciiWrite` is undocumented but used internally by
                // `Buffer.prototype.write`. `.asciiWrite` is faster as skips bounds-checking.
                // `asciiWrite.call(buff, str, pos)` is equivalent to `buff.write(str, pos, 'ascii')`.
                // NB `asciiWrite()` cab be passed a `len` argument, but it's 2% faster if omitted.
                if (len < 48) {
                    writeAsciiStringToBuffer(str, buff, len, pos);
                } else {
                    asciiWrite.call(buff, str, pos);
                }

                const storePos = allocScratch(8),
                    storePos32 = storePos >> 2;
                scratchUint32[storePos32] = len;
                scratchUint32[storePos32 + 1] = pos;
                pos += len;
                return storePos;
            }

            // String needs to be added to output buffer in `finalize()`, as is 7 chars or less.
            // Allocate 1 byte scratch for every character + 4 bytes for length.
            // Ensure allocate scratch in multiple of 8 bytes.
            const storePos = allocScratch(len > 4 ? 16 : 8);
            writeAsciiStringToBuffer(str, scratchBuff, len, storePos + 4);
            scratchUint32[storePos >> 2] = len;
            return storePos;
        },
        generateSerializer() {
            return Custom.prototype.generateSerializer.call(this)
                + `\n\n${' '.repeat(8)}const { asciiWrite } = Buffer.prototype;`;
        },
        // Use `finalizeJsWord` as finalizer for type
        finalize: false,
        finalizerName: 'finalizeJsWord',
        dependencies: ['JsWord'],
        length: 8,
        align: 4
    }),
    OptionAsciiJsWord: Option('AsciiJsWord', {
        // Use `finalizeOptionJsWord` as finalizer for type
        generateSerializer() {
            return Option.prototype.generateSerializer.call(this)
                .replace(/\s+function finalize[\s\S]+$/, '');
        },
        finalizerName: 'finalizeOptionJsWord'
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
            pos += 8;
        },
        length: 8,
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

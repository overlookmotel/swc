"use strict";

// Imports
const { Option, Custom } = require("../kinds/index.js");

// Exports

const { utf8Slice, utf8Write } = Buffer.prototype;

module.exports = {
    JsWord: Custom({
        /**
         * Deserialize string.
         * Strings are serialized by RYKV as follows:
         *   - 8 bytes length, aligned on 4.
         *   - String stored in UTF8 encoding.
         *   - If length (in bytes) <= 7, byte 7 contains length, bytes 0-6 contain the string.
         *   - Otherwise, bytes 0-3 contain length, and bytes 4-7 a relative pointer to string (i32).
         *   - In latter case, relative pointer is always negative. Rel pointer is stored little-endian,
         *     regardless of machine architecture, so sign bit is highest bit in byte 7.
         *     Therefore if byte 7's highest bit is set, it's a string longer than 7 bytes,
         *     if that bit is not set, it's a string with length <= 7 bytes.
         *
         * @param {number} pos - Position in buffer
         * @returns {string} - Decoded string
         */
        deserialize(pos) {
            // Fast path for empty string
            let len = buff[pos + 7];
            if (len === 0) {
                /* DEBUG_ONLY_START */
                debugBuff("JsWord content", pos, len);
                /* DEBUG_ONLY_END */

                return "";
            }

            // Fast path for single-char strings (common in minified code)
            if (len === 1) {
                /* DEBUG_ONLY_START */
                debugBuff("JsWord content", pos, len);
                /* DEBUG_ONLY_END */

                return String.fromCharCode(buff[pos]);
            }

            if (
                len & 128
            ) {
                const pos32 = pos >>> 2;
                // Length always stored little-endian, regardless of machine architecture
                // TODO Need to alter next line to read as little-endian on big-endian systems
                len = uint32[pos32];
                // Pointer is relative to byte containing length, not byte containing pointer
                pos += int32[pos32 + 1];

                /* DEBUG_ONLY_START */
                debugBuff("JsWord content", pos, len);
                /* DEBUG_ONLY_END */

                // For longer strings, native method is faster.
                // Determined that the tipping point is 24 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.utf8Slice` is undocumented but used internally by
                // `Buffer.prototype.toString`. `.utf8Slice` is faster as skips bounds-checking.
                // Next line is equivalent to `buff.toString("utf8", pos, pos + len)`.
                if (len > 24) return utf8Slice.call(buff, pos, pos + len);
            }
            // prettier-ignore
            /* DEBUG_ONLY_START */
            else {
                debugBuff("JsWord content", pos, len);
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
            return (
                Custom.prototype.generateDeserializer.call(this) +
                "\n\nconst { utf8Slice } = Buffer.prototype;"
            );
        },
        serialize(str, pos) {
            // Handle empty string
            const strLen = str.length;
            if (strLen === 0) {
                buff[pos + 7] = 0;
                return;
            }

            let strPos, len;
            if (strLen <= 7) {
                // String is 7 chars or less - try writing inline.
                // If Unicode character encountered, bail out.
                const isWritten = writeShortStringToBuffer(str, pos, strLen);
                if (isWritten) {
                    buff[pos + 7] = strLen;
                    return;
                }

                // If 2 chars or less, can definitely fit inline
                if (strLen <= 2) {
                    buff[pos + 7] = utf8Write.call(buff, str, pos);
                    return;
                }

                // Write out of line
                strPos = alloc(strLen * 3); // See below for why 3 bytes per char
                len = utf8Write.call(buff, str, strPos);

                /* DEBUG_ONLY_START */
                debugAst("JsWord content", strPos);
                /* DEBUG_ONLY_END */

                if (len <= 7) {
                    // Move back inline
                    buff[pos + 7] = len;

                    // Free space previously used out of line
                    buffPos = strPos;

                    const endPos = pos + len;
                    do {
                        buff[pos++] = buff[strPos++];
                    } while (pos < endPos);

                    return;
                }
            } else {
                // Allocate 3 bytes for every character (in case of Unicode chars).
                // https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encodeInto#buffer_sizing
                // Does not matter if over-allocate, as next allocation will start from end pos
                // of actual string, regardless of how much space has been pre-allocated.
                strPos = alloc(strLen * 3);

                /* DEBUG_ONLY_START */
                debugAst("JsWord content", strPos);
                /* DEBUG_ONLY_END */

                // Write string to buffer.
                // For longer strings, native method is faster.
                // Determined that the tipping point is 42 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.utf8Write` is undocumented but used internally by
                // `Buffer.prototype.write`. `.utf8Write` is faster as skips bounds-checking.
                // `utf8Write.call(buff, str, pos)` is equivalent to `buff.write(str, pos)`.
                len =
                    strLen < 42
                        ? writeStringToBuffer(str, buff, strLen, strPos)
                        : utf8Write.call(buff, str, strPos);
            }

            // Free space which wasn't used
            buffPos = strPos + len;

            const pos32 = pos >>> 2;
            // Length always stored little-endian, regardless of machine architecture
            // TODO Need to alter next line to write as little-endian on big-endian systems
            uint32[pos32] = len;
            uint32[pos32 + 1] = strPos - pos; // Always positive number, so safe to use `uint32`
        },
        generateSerializer() {
            return (
                Custom.prototype.generateSerializer.call(this) +
                "\n\nconst { utf8Write } = Buffer.prototype;"
            );
        },
        length: 8,
        align: 4,
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
                debugBuff("JsWord content", pos, len);
                /* DEBUG_ONLY_END */

                return "";
            }

            // Fast path for single-char strings
            if (len === 1) {
                /* DEBUG_ONLY_START */
                debugBuff("AsciiJsWord content", pos, len);
                /* DEBUG_ONLY_END */

                return String.fromCharCode(buff[pos]);
            }

            if (
                len & 128
            ) {
                const pos32 = pos >>> 2;
                // Length always stored little-endian, regardless of machine architecture
                // TODO Need to alter next line to read as little-endian on big-endian systems
                len = uint32[pos32];
                // Pointer is relative to byte containing length, not byte containing pointer
                pos += int32[pos32 + 1];

                /* DEBUG_ONLY_START */
                debugBuff("AsciiJsWord content", pos, len);
                /* DEBUG_ONLY_END */

                // For longer strings, native method is faster.
                // Determined that the tipping point is 28 chars on a MacBook Pro 14-inch 2021 M1 Pro.
                // Tipping point might be a bit different on Intel etc processors as M1 seems
                // to run JS faster, but it's not going to make a significant difference.
                // `Buffer.prototype.asciiSlice` is undocumented but used internally by
                // `Buffer.prototype.toString`. `.asciiSlice` is faster as skips bounds-checking.
                // Next line is equivalent to `buff.toString("ascii", pos, pos + len)`.
                if (len > 28) return asciiSlice.call(buff, pos, pos + len);
            }
            // prettier-ignore
            /* DEBUG_ONLY_START */
            else {
                debugBuff("AsciiJsWord content", pos, len);
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
            return (
                Custom.prototype.generateDeserializer.call(this) +
                "\n\nconst { asciiSlice } = Buffer.prototype;"
            );
        },
        serialize(str, pos) {
            // Handle empty string
            const len = str.length;
            if (len === 0) {
                buff[pos + 7] = 0;
                return;
            }

            // If string is 7 chars or less, write inline
            if (len <= 7) {
                buff[pos + 7] = len;

                let charIndex = 0;
                do {
                    buff[pos++] = charCodeAt.call(str, charIndex);
                } while (++charIndex < len);
                return;
            }

            // String is longer than 7 chars - write out of line
            // Allocate 1 byte for every character
            const strPos = alloc(len);

            /* DEBUG_ONLY_START */
            debugAst("AsciiJsWord content", strPos);
            /* DEBUG_ONLY_END */

            // For longer strings, native method is faster.
            // Determined that the tipping point is 48 chars on a MacBook Pro 14-inch 2021 M1 Pro.
            // Tipping point might be a bit different on Intel etc processors as M1 seems
            // to run JS faster, but it's not going to make a significant difference.
            // `Buffer.prototype.asciiWrite` is undocumented but used internally by
            // `Buffer.prototype.write`. `.asciiWrite` is faster as skips bounds-checking.
            // `asciiWrite.call(buff, str, pos)` is equivalent to `buff.write(str, pos, 'ascii')`.
            // NB `asciiWrite()` can be passed a `len` argument, but it's 2% faster if omitted.
            if (len < 48) {
                writeAsciiStringToBuffer(str, buff, len, strPos);
            } else {
                asciiWrite.call(buff, str, strPos);
            }

            const pos32 = pos >>> 2;
            // Length always stored little-endian, regardless of machine architecture
            // TODO Need to alter next line to write as little-endian on big-endian systems
            uint32[pos32] = len;
            uint32[pos32 + 1] = strPos - pos; // Always positive number, so safe to use `uint32`
        },
        generateSerializer() {
            return (
                Custom.prototype.generateSerializer.call(this) +
                "\n\nconst { asciiWrite } = Buffer.prototype;"
            );
        },
        dependencies: ["JsWord"],
        length: 8,
        align: 4,
    }),

    Boolean: Custom({
        deserialize(pos) {
            return buff[pos] === 1;
        },
        serialize(value, pos) {
            buff[pos] = value ? 1 : 0;
        },
        length: 1,
        align: 1,
    }),

    Number: Custom({
        deserialize(pos) {
            return float64[pos >>> 3];
        },
        serialize(num, pos) {
            float64[pos >>> 3] = num;
        },
        length: 8,
        align: 8,
    }),

    Span: Custom({
        deserialize(pos) {
            const pos32 = pos >>> 2;
            return {
                start: uint32[pos32],
                end: uint32[pos32 + 1],
                ctxt: uint32[pos32 + 2],
            };
        },
        serialize(span, pos) {
            const pos32 = pos >>> 2;
            uint32[pos32] = span.start;
            uint32[pos32 + 1] = span.end;
            uint32[pos32 + 2] = span.ctxt;
        },
        length: 12,
        align: 4,
    }),
};

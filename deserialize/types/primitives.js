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
            // Bail out and use `buff.utf8Slice()` if non-ASCII character found (uncommon case).
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

        /**
         * Serialize string.
         *
         * This is complicated because if string contains non-ASCII characters,
         * its representation in UTF8 will be more bytes than `str.length`.
         * The length in bytes is not knowable until string is converted to UTF8.
         * Can be up to 3 bytes per character.
         * https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encodeInto#buffer_sizing
         *
         * Fastest available function in NodeJS for UTF8-encoding is `Buffer.prototype.utf8Write`.
         * This method is undocumented, but used internally by `Buffer.prototype.write`.
         * `utf8Write()` is faster than `write()` as it skips bounds-checking.
         * `utf8Write.call(buff, str, pos)` is equivalent to `buff.write(str, pos)`.
         *
         * However, calling `Buffer.prototype.utf8Write` involves a call into C++,
         * so for shorter strings it's faster to encode character by character in JS.
         * Determined that the tipping point is 42 chars on a MacBook Pro 14-inch 2021 M1 Pro -
         * JS is faster below 42 chars, `utf8Write` is faster above 42 chars.
         * Tipping point might be a bit different on Intel etc processors, as M1 seems
         * to run JS faster, but it's not going to make a significant difference either way.
         *
         * So, strategy used here is:
         *
         * 1. Strings less than 42 chars:
         *   - Try char-by-char in JS.
         *   - If non-ASCII character found, bail out and go to (2).
         * 2. Longer strings / strings with non-ASCII characters:
         *   - Allocate 3 bytes per character in buffer.
         *   - Write to buffer as UTF8 with `utf8Write`.
         *   - Shift up bytes to end of allocated space.
         *   - Free unused space.
         *
         * In this function:
         *   - `strLen` is length of string in characters.
         *   - `len` is length in bytes, once encoded as UTF8.
         *   - `allocBytes` is number of bytes allocated to hold string.
         *
         * @param {string} str - String
         * @param {number} pos - Position to write at
         * @returns {number} - Number of bytes buffer grew by during serialization
         */
        serialize(str, pos) {
            // Handle empty string
            const strLen = str.length;
            if (strLen === 0) {
                buff[pos + 7] = 0;
                return 0;
            }

            let len, bufferGrownByBytes;
            if (strLen <= 7) {
                // String is 7 chars or less - try writing inline.
                // If non-ASCII character encountered, bail out.
                if (writeStringToBuffer(str, pos, strLen)) {
                    buff[pos + 7] = strLen;
                    return 0;
                }

                // If 2 chars or less, can definitely fit inline
                if (strLen <= 2) {
                    buff[pos + 7] = utf8Write.call(buff, str, pos);
                    return 0;
                }

                // Write out of line
                const allocBytes = strLen * 3;
                bufferGrownByBytes = alloc(allocBytes);
                if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
                len = utf8Write.call(buff, str, buffPos);

                if (len <= 7) {
                    // Move back inline
                    buff[pos + 7] = len;

                    const endPos = pos + len;
                    let charPos = buffPos;
                    do {
                        buff[pos++] = buff[charPos++];
                    } while (pos < endPos);

                    /* DEBUG_ONLY_START */
                    // Zero out bytes which were moved.
                    // This is not required, but useful when debugging so buffer is clean.
                    for (let pos = buffPos; pos < buffPos + len; pos++) {
                        buff[pos] = 0;
                    }
                    /* DEBUG_ONLY_END */

                    // Free space previously used out of line
                    buffPos += allocBytes;

                    return bufferGrownByBytes;
                }

                // Shift up bytes and free space at start
                shiftBytesAndFree(len, allocBytes);
            } else if (strLen < 42) {
                // For shorter strings, it's faster to serialize string byte by byte in JS

                // Allocate 1 byte per char
                bufferGrownByBytes = alloc(strLen);
                if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

                if (writeStringToBuffer(str, buffPos, strLen)) {
                    // All ASCII characters - whole string written successfully
                    len = strLen;
                } else {
                    // Non-ASCII chars found.
                    // Allocate 2 more bytes per char and use native method.
                    bufferGrownByBytes += alloc(strLen * 2);
                    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
                    len = utf8Write.call(buff, str, buffPos);
                    shiftBytesAndFree(len, strLen * 3);
                }
            } else {
                // Long string - use native method
                const allocBytes = strLen * 3;
                bufferGrownByBytes = alloc(allocBytes);
                if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
                len = utf8Write.call(buff, str, buffPos);
                shiftBytesAndFree(len, allocBytes);
            }

            /* DEBUG_ONLY_START */
            debugAst("JsWord content", buffPos);
            /* DEBUG_ONLY_END */

            const pos32 = pos >>> 2;
            // Length always stored little-endian, regardless of machine architecture
            // TODO Need to alter next line to write as little-endian on big-endian systems
            uint32[pos32] = len;
            int32[pos32 + 1] = buffPos - pos;

            return bufferGrownByBytes;
        },
        generateSerializer() {
            return (
                Custom.prototype.generateSerializer.call(this) +
                "\n\nconst { utf8Write } = Buffer.prototype;"
            );
        },
        length: 8,
        align: 4,
        mayAlloc: true,
    }),

    AsciiJsWord: Custom({
        /**
         * Deserialize string where it's known from context to be ASCII characters only.
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
                return 0;
            }

            // If string is 7 chars or less, write inline
            if (len <= 7) {
                buff[pos + 7] = len;

                let charIndex = 0;
                do {
                    buff[pos++] = charCodeAt.call(str, charIndex);
                } while (++charIndex < len);
                return 0;
            }

            // String is longer than 7 chars - write out of line.
            // Allocate 1 byte for every character.
            const bufferGrownByBytes = alloc(len);
            if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

            /* DEBUG_ONLY_START */
            debugAst("AsciiJsWord content", buffPos);
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
                writeAsciiStringToBuffer(str, buff, len, buffPos);
            } else {
                asciiWrite.call(buff, str, buffPos);
            }

            const pos32 = pos >>> 2;
            // Length always stored little-endian, regardless of machine architecture
            // TODO Need to alter next line to write as little-endian on big-endian systems
            uint32[pos32] = len;
            int32[pos32 + 1] = buffPos - pos;

            return bufferGrownByBytes;
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
        mayAlloc: true,
    }),

    Boolean: Custom({
        deserialize(pos) {
            return buff[pos] === 1;
        },
        serialize(value, pos) {
            buff[pos] = value ? 1 : 0;
            return 0;
        },
        length: 1,
        align: 1,
        mayAlloc: false,
    }),

    Number: Custom({
        deserialize(pos) {
            return float64[pos >>> 3];
        },
        serialize(num, pos) {
            float64[pos >>> 3] = num;
            return 0;
        },
        length: 8,
        align: 8,
        mayAlloc: false,
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
            return 0;
        },
        length: 12,
        align: 4,
        mayAlloc: false,
    }),
};

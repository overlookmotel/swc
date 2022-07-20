"use strict";

// Imports
const { Option, Custom } = require("../kinds/index.js");

// Exports

const { utf8Write } = Buffer.prototype;

module.exports = {
    JsWord: Custom({
        deserialize(pos) {
            return strings[uint32[pos >> 2]];
        },
        serialize(str) {
            // Handle empty string
            const strLen = str.length;
            if (strLen === 0) {
                const storePos32 = allocScratch(2);
                scratchUint32[storePos32] = 0;
                return storePos32;
            }

            // If string is longer than 7 chars, write direct to output buffer
            if (strLen > 7) {
                /* DEBUG_ONLY_START */
                debugAst("finalize JsWord content");
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
                const len =
                    strLen < 42
                        ? writeStringToBuffer(str, buff, strLen, pos)
                        : utf8Write.call(buff, str, pos);

                const storePos32 = allocScratch(2);
                scratchUint32[storePos32] = len;
                scratchUint32[storePos32 + 1] = pos;
                pos += len;
                return storePos32;
            }

            // Likely string needs to be added to output buffer in `finalize()`, as is 7 chars or less.
            // Uncommon case is if it contains Unicode chars, and UTF8 byte length
            // may turn out to be greater than 7.
            // So write to scratch buffer on assumption UTF8-encoded string is 7 chars or less.
            // If it turns out longer than 7 chars, copy to output buffer in 2nd step.

            // Allocate 3 bytes scratch for every character (in case of Unicode chars)
            // + 4 bytes for length. Ensure allocate scratch in multiple of 8 bytes.
            const storePos32 = allocScratchAligned(4 + strLen * 3);
            const len = writeStringToBuffer(
                str,
                scratchBuff,
                strLen,
                (storePos32 + 1) << 2
            );
            scratchUint32[storePos32] = len;

            if (len <= 7) {
                // Free unused scratch. Scratch must remain aligned to 8-byte chunks.
                scratchPos32 = storePos32 + (len > 4 ? 4 : 2);
                return storePos32;
            }

            // UTF8-encoded string ended up being longer than 7 chars - move to output buffer
            /* DEBUG_ONLY_START */
            debugAst("finalize JsWord content");
            /* DEBUG_ONLY_END */

            alloc(len);
            copyFromScratch(storePos32 + 1, len);

            scratchUint32[storePos32 + 1] = pos;
            scratchPos32 = storePos32 + 2; // Free scratch which contained string

            pos += len;

            return storePos32;
        },
        finalize(storePos32) {
            const len = scratchUint32[storePos32];
            if (len <= 7) {
                if (len > 0) {
                    const pos32 = pos >> 2;
                    uint32[pos32] = scratchUint32[storePos32 + 1];
                    if (len > 4)
                        uint32[pos32 + 1] = scratchUint32[storePos32 + 2];
                }

                /* DEBUG_ONLY_START */
                // Zero out extra bytes which were copied after end of string.
                // It doesn't matter that this happens, but makes it hard to validate
                // output by comparing buffers as it introduces a random element.
                if (len !== 0 && len !== 4 && len !== 7) {
                    for (
                        let emptyPos = pos + len;
                        emptyPos < pos + (len < 4 ? 4 : 7);
                        emptyPos++
                    ) {
                        buff[emptyPos] = 0;
                    }
                }
                /* DEBUG_ONLY_END */

                buff[pos + 7] = len;
            } else {
                const pos32 = pos >> 2;
                // Length always stored little-endian, regardless of machine architecture
                // TODO Need to alter next line to write as little-endian on big-endian systems
                uint32[pos32] = len;
                int32[pos32 + 1] = scratchUint32[storePos32 + 1] - pos;
            }
            pos += 8;
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
        deserialize(pos) {
            return strings[uint32[pos >> 2]];
        },
        serialize(str) {
            // Handle empty string
            const len = str.length;
            if (len === 0) {
                const storePos32 = allocScratch(2);
                scratchUint32[storePos32] = 0;
                return storePos32;
            }

            // If string is longer than 7 chars, write direct to output buffer
            if (len > 7) {
                /* DEBUG_ONLY_START */
                debugAst("finalize AsciiJsWord content");
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

                const storePos32 = allocScratch(2);
                scratchUint32[storePos32] = len;
                scratchUint32[storePos32 + 1] = pos;
                pos += len;
                return storePos32;
            }

            // String needs to be added to output buffer in `finalize()`, as is 7 chars or less.
            // Allocate 1 byte scratch for every character + 4 bytes for length.
            // Ensure allocate scratch in multiple of 8 bytes.
            const storePos32 = allocScratch(len > 4 ? 4 : 2);
            writeAsciiStringToBuffer(
                str,
                scratchBuff,
                len,
                (storePos32 + 1) << 2
            );
            scratchUint32[storePos32] = len;
            return storePos32;
        },
        generateSerializer() {
            return (
                Custom.prototype.generateSerializer.call(this) +
                "\n\nconst { asciiWrite } = Buffer.prototype;"
            );
        },
        // Use `finalizeJsWord` as finalizer for type
        finalize: false,
        finalizerName: "finalizeJsWord",
        dependencies: ["JsWord"],
        length: 8,
        align: 4,
    }),
    OptionAsciiJsWord: Option("AsciiJsWord", {
        // Use `finalizeOptionJsWord` as finalizer for type
        generateSerializer() {
            return Option.prototype.generateSerializer
                .call(this)
                .replace(/\s+function finalize[\s\S]+$/, "");
        },
        finalizerName: "finalizeOptionJsWord",
    }),

    Boolean: Custom({
        deserialize(pos) {
            return buff[pos] === 1;
        },
        serialize(value) {
            // 0 has special meaning for Options, but is safe to use as finalizer data here
            // as `Option<Boolean>` is never used
            return value ? 1 : 0;
        },
        finalize(id) {
            buff[pos] = id;
            pos++;
        },
        length: 1,
        align: 1,
    }),

    Number: Custom({
        deserialize(pos) {
            return float64[pos >> 3];
        },
        serialize(num) {
            const storePos64 = allocScratch(2) >> 1;
            scratchFloat64[storePos64] = num;
            return storePos64;
        },
        finalize(storePos64) {
            float64[pos >> 3] = scratchFloat64[storePos64];
            pos += 8;
        },
        length: 8,
        align: 8,
    }),

    Span: Custom({
        deserialize(pos) {
            const pos32 = pos >> 2;
            return {
                start: uint32[pos32],
                end: uint32[pos32 + 1],
                ctxt: uint32[pos32 + 2],
            };
        },
        serialize(span) {
            // Only need 12 bytes scratch, but scratch must be allocated in 8-byte blocks
            const storePos32 = allocScratch(4);
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
        align: 4,
    }),
};

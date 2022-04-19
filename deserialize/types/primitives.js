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
                len = uint32[pos >> 2];
                pos = getPtr(int32, pos + 4) - 4;
            }

            /* DEBUG_ONLY_START */
            debugBuff('JsWord content', pos, len);
            /* DEBUG_ONLY_END */

            return buff.toString('utf8', pos, pos + len); // TODO What encoding?
        },
        length: 8,
        align: 4
    }),

    Boolean: EnumValue([false, true]),

    Span: Custom({
        deserialize(pos) {
            const pos32 = pos >> 2;
            return {
                start: uint32[pos32],
                end: uint32[pos32 + 1],
                ctxt: uint32[pos32 + 2]
            };
        },
        length: 12,
        align: 4
    })
};

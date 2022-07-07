"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Literals", () => {
    itParsesAndPrints("String literals", [
        "''",
        "'a'",
        "'ab'",
        "'abc'",
        "'abcd'",
        "'abcde'",
        "'abcdef'",
        "'abcdefg'",
        "'abcdefgh'",
        "'abcdefghi'",
        "'abcdefghij'",
        "'abcdefghijk'",
        "'abcdefghijkl'",
        "'abcdefghijklm'",
        "'abcdefghijklmn'",
        "'abcdefghijklmno'",
        "'abcdefghijklmnop'",
        "'abcdefghijklmnopq'",
        "'abcdefghijklmnopqr'",
        "'abcdefghijklmnopqrs'",
        "'abcdefghijklmnopqrst'",
        "'abcdefghijklmnopqrstu'",
        "'abcdefghijklmnopqrstuv'",
        "'abcdefghijklmnopqrstuvw'",
        "'abcdefghijklmnopqrstuvwx'",
        "'abcdefghijklmnopqrstuvwxy'",
        "'abcdefghijklmnopqrstuvwxyz'",
        "'abcdefghijklmnopqrstuvwxyz0'",
        "'abcdefghijklmnopqrstuvwxyz01'",
        "'abcdefghijklmnopqrstuvwxyz012'",
        "'abcdefghijklmnopqrstuvwxyz0123'",
        "'abcdefghijklmnopqrstuvwxyz01234'",
        "'abcdefghijklmnopqrstuvwxyz012345'",
        "'abcdefghijklmnopqrstuvwxyz0123456'",
        "'abcdefghijklmnopqrstuvwxyz01234567'",
        "'abcdefghijklmnopqrstuvwxyz012345678'",
        "'abcdefghijklmnopqrstuvwxyz0123456789'",
        "'abcdefghijklmnopqrstuvwxyz0123456789A'",
        "'abcdefghijklmnopqrstuvwxyz0123456789AB'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABC'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCD'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDE'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEF'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGH'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHI'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJ'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJK'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKL'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLM'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMN'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNO'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOP'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQ'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQR'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRS'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRST'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTU'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUV'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVW'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWX'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXY'",
        "'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'", // 62 length
        "'string_longer_than_7_chars'",
        "'😀'",
        "'abc😀def'",
        "'😀😂😇😍🤪💩abc😀😂😇😍🤪💩def😀😂😇😍🤪💩'",
        "'a', 'b', 'c', 'string_longer_than_7_chars', '😀', 'd', 'e'",
    ]);

    itParsesAndPrints("Boolean literals", [
        "true",
        "false",
        "true, true, false, false, true, false, true, false",
    ]);

    itParsesAndPrints("`null` literals", [
        "null",
        "null, null, null"
    ]);

    itParsesAndPrints("Numeric literals", [
        "0",
        "1",
        "1234",
        "9007199254740991", // Number.MAX_SAFE_INTEGER
        "-0",
        "-1",
        "-1234",
        "-9007199254740991", // Number.MIN_SAFE_INTEGER
        "0.1234",
        "1234.5678",
        "1e20",
        "1.234e20",
    ]);

    itParsesAndPrints("BigInt literals", [
        "0n",
        "1n",
        "100000n",
        "10000000000n",
        "1000000000000000n",
        "100000000000000000000n",
        "10000000000000000000000000n",
        "1000000000000000000000000000000n",
        "100000000000000000000000000000000000n",
        "10000000000000000000000000000000000000000n",
        "1000000000000000000000000000000000000000000000n",
        "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n",
        "100n, 10000000n, 100n, 10000000n",
    ]);

    itParsesAndPrints("RegExp literals", [
        "/a/",
        "/abc/",
        "/string_longer_than_7_chars/",
        "/^a\\tb(\\r\\n)+c$/",
        "/abc/g",
        "/abc/i",
        "/abc/gi",
        "/abc/, /def/, /ghi/",
    ]);
});

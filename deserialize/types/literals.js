"use strict";

// Imports
const { Node, Enum, Option, Custom } = require("../kinds/index.js");

// Exports

module.exports = {
    Literal: Enum([
        "StringLiteral",
        "BooleanLiteral",
        "NullLiteral",
        "NumericLiteral",
        "BigIntLiteral",
        "RegExpLiteral",
        "JSXText",
    ]),

    StringLiteral: Node({ value: "JsWord", raw: Option("JsWord") }),

    BooleanLiteral: Node({ value: "Boolean" }),

    NullLiteral: Node({}),

    NumericLiteral: Node({ value: "Number", raw: Option("AsciiJsWord") }),

    BigIntLiteral: Node({ value: "BigIntValue", raw: Option("AsciiJsWord") }),
    BigIntValue: Custom({
        deserialize(pos) {
            // TODO This implementation could be more efficient
            const str = deserializeAsciiJsWord(pos);
            if (str === "0") return [0, []];

            let sign, current;
            if (str[0] === "-") {
                sign = -1;
                current = BigInt(str.slice(1));
            } else {
                sign = 1;
                current = BigInt(str);
            }

            const parts = [];
            while (true) {
                const next = current >> 32n;
                if (next === 0n) {
                    parts.push(Number(current));
                    break;
                }

                parts.push(Number(current & 4294967295n)); // 4294967295n === (2 ** 32) - 1
                current = next;
            }

            return [sign, parts];
        },
        serialize(value, pos) {
            if (value[0] === 0) return serializeAsciiJsWord("0", pos);

            const parts = value[1];
            let num = 0n;
            for (let i = parts.length - 1; i >= 0; i--) {
                num <<= 32n;
                num += BigInt(parts[i]);
            }

            let str = num.toString();
            if (value[0] === -1) str = `-${str}`;

            return serializeAsciiJsWord(str, pos);
        },
        dependencies: ["AsciiJsWord", "JsWord"],
        length: 8,
        align: 4,
        mayAlloc: true,
    }),

    RegExpLiteral: Node({ pattern: "JsWord", flags: "AsciiJsWord" }),
};

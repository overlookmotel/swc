'use strict';

// Imports
const { Node, Enum, Option, Custom } = require('../kinds.js');

// Exports

module.exports = {
    Literal: Enum([
        'StringLiteral', 'BooleanLiteral', 'NullLiteral', 'NumericLiteral',
        'BigIntLiteral', 'RegExpLiteral', 'JSXText'
    ]),

    StringLiteral: Node({ value: 'JsWord', raw: Option('JsWord') }),

    BooleanLiteral: Node({ value: 'Boolean' }),

    NullLiteral: Node({}),

    NumericLiteral: Node({ value: 'Number' }),

    BigIntLiteral: Node({ value: 'BigIntValue' }),
    BigIntValue: Custom({
        deserialize(pos) {
            // TODO This implementation could be more efficient
            const str = deserializeJsWord(pos);
            if (str === '0') return [0, []];

            let current = BigInt(str);
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

            return [1, parts]; // TODO What is the initial 1 for?
        },
        dependencies: ['JsWord'],
        length: 8,
        align: 4
    }),

    RegExpLiteral: Node({ pattern: 'JsWord', flags: 'JsWord' })
};

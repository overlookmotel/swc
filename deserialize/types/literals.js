'use strict';

// Imports
const { Node, Enum, Option, Custom } = require('../kinds.js');

// Exports

module.exports = {
    Literal: Enum(
        [
            'StringLiteral', 'BooleanLiteral', 'NullLiteral', 'NumericLiteral',
            'BigIntLiteral', 'RegExpLiteral', 'JSXText'
        ],
        { emptyBefore: 4 } // TODO Not sure why
    ),

    StringLiteral: Node({ value: 'JsWord', raw: Option('JsWord') }),

    BooleanLiteral: Node({ value: 'Boolean' }),

    NullLiteral: Node({}),

    NumericLiteral: Custom({
        // Empty bytes: 4 before span, 4 after span, 8 after value
        // TODO Not sure why
        deserialize(buff, pos) {
            return {
                type: 'NumericLiteral',
                span: deserializeSpan(buff, pos + 4),
                value: new Float64Array(buff.buffer, pos + 20, 1)[0]
            };
        },
        dependencies: ['Span'],
        length: 36,
        align: 4
    }),

    BigIntLiteral: Node({ value: 'BigIntValue' }),
    BigIntValue: Custom({
        deserialize(buff, pos) {
            // TODO This implementation could be more efficient
            const str = deserializeJsWord(buff, pos);
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

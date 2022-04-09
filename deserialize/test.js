'use strict';

// Imports
const { parseSync, parseSyncToBuffer } = require('../index.js'),
	deserializeBuffer = require('./index.js');

// Tests

describe('Parses correctly', () => {
	describe('Program', () => {
		itParses('Module', { isModule: true }, [
			// TODO Tests for `interpreter`
			'',
			'const x = 1'
		]);

		itParses('Script', { isModule: false }, [
			// TODO Tests for `interpreter`
			'',
			'const x = 1'
		]);
	});

	describe('Statements', () => {
		itParses('Variable declarations', [
			'var x',
			'let x',
			'const x = 1',
			'var x = 1',
			'let x = 1',

			'let x, y, z',
			'let x = 1, y, z',
			'let x, y = 1, z',
			'let x, y, z = 1',
			'let x = 1, y = 2, z = 3',

			'let x; let y; let z;',
			'let x = 1; let y = 2; let z = 3;'
		]);

		itParses('Block statements', [
			'{}',
			'{ let x; }',
			'{ let x; let y; }'
		]);

		itParses('Empty statements', [
			';',
			';;;'
		]);

		itParses('`debugger` statements', [
			'debugger',
			'debugger; debugger; debugger'
		]);

		itParses('`with` statements', { isModule: false }, [
			'with (1) {}',
			'with (1) ;',
			'with (1) {}; with (2) ; with (3) {}'
		]);

		itParses('`return` statements', [
			'function f() { return; }',
			'function f() { return 1; }',
			'function f() { return; return; return; }',
			'function f() { return 1; return 2; return 3; }'
		]);

		itParses('Labeled statements', [
			'a: ;',
			'a: {}',
			'a: { let x; let y; }',
			'label_name_longer_than_7_chars: { let x; }',
			'a: b: c: ;',
			'a: label_name_longer_than_7_chars: c: ;',
			'a: label_name_longer_than_7_chars: c: { let x; let y; }'
		]);

		itParses('`break` statements', [
			'a: break;',
			'a: break a;',
			'label_name_longer_than_7_chars: break;',
			'label_name_longer_than_7_chars: break label_name_longer_than_7_chars;',
			'a: b: c: break a;'
		]);

		itParses('`continue` statements', [
			'while (1) { continue; }',
			'a: while (1) { continue a; }',
			'label_name_longer_than_7_chars: while (1) { continue label_name_longer_than_7_chars; }',
			'a: b: c: while (1) { continue a; continue b; continue c; }'
		]);

		itParses('`if` statements', [
			'if (1) ;',
			'if (1) {}',
			'if (1) { let x = 2; }',
			'if (1) ; else ;',
			'if (1) { let x = 2; } else { let y = 3; }'
		]);

		itParses('`switch` statements', [
			'switch (x) {}',
			'switch (x) { case 1: let x = 1; }',
			'switch (x) { default: let x = 1; }',
			`switch (x) {
				case 1:
					let x = 1;
				case 2:
					let y = 2;
					break;
				default:
					let z = 3;
			}`
		]);

		itParses('`throw` statements', [
			'throw 1',
			'throw 1; throw 2; throw 3;'
		]);

		itParses('`try` statements', [
			'try {} catch {}',
			'try {} catch (e) {}',
			'try {} finally {}',
			`try {
				throw 1;
			} catch (e) {
				let x = e;
			} finally {
				let y = 2;
			}`
		]);

		itParses('`while` statements', [
			'while (1) ;',
			'while (1) {}',
			`while (1) {
				if (1) break;
				continue;
			}`
		]);

		itParses('`do ... while` statements', [
			'do ; while (1)',
			'do {} while (1)',
			`do {
				if (1) break;
				continue;
			} while (1);`
		]);

		itParses('`for` statements', [
			'for (;;) ;',
			'for (x; y; z) ;',
			'for (let x = 1; x; x) ;',
			`for (let x = 1; x; x) {
				if (x) break;
				continue;
			}`
		]);

		itParses('`for (... in ...)` statements', [
			'for (x in y) ;',
			'for (let x in y) ;',
			`for (let x in y) {
				if (x) break;
				continue;
			}`
		]);

		itParses('`for (... of ...)` statements', [
			'for (x of y) ;',
			'for (let x of y) ;',
			`for (let x of y) {
				if (x) break;
				continue;
			}`,
			`for await (let x of y) ;`,
			`for await (let x of y) {}`
		]);

		itParses('Expression statements', [
			'x',
			'1'
		]);
	});

	describe('Expressions', () => {
		itParses('`this` expressions', [
			'this',
			'this; this; this;'
		]);

		itParses('Array expressions', [
			'[]',
			'[1]',
			'[1, 2, 3]',
			'[x, y, z]',
			'[, , ,]',
			'[x, , z]',
			'[, , x, , , , y, , , z, , ]',
			'[...x]',
			'[x, y, ...z]',
			'[, , x, , , y, , , ...z]'
		]);

		itParses('Unary expressions', [
			'+1',
			'-1',
			'!1',
			'~1',
			'typeof 1',
			'void 1',
			'delete 1',
			'+1; -1; !1; ~1; typeof 1; void 1; delete 1;'
		]);

		itParses('Update expressions', [
			'x++',
			'x--',
			'++x',
			'--x',
			'x++; x--; ++x; --x;'
		]);

		itParses('Binary expressions', [
			'x == y',
			'x != y',
			'x === y',
			'x !== y',
			'x < y',
			'x <= y',
			'x > y',
			'x >= y',
			'x << y',
			'x >> y',
			'x >>> y',
			'x + y',
			'x - y',
			'x * y',
			'x / y',
			'x % y',
			'x | y',
			'x ^ y',
			'x & y',
			'x || y',
			'x && y',
			'x in y',
			'x instanceof y',
			'x ** y',
			'x ?? y',
			`x == y; x != y; x === y; x !== y;
			x < y; x <= y; x > y; x >= y; x << y; x >> y; x >>> y;
			x + y; x - y; x * y; x / y; x % y; x | y; x ^ y; x & y;
			x || y; x && y; x in y; x instanceof y; x ** y; x ?? y`
		]);

		itParses('Assignment expressions', [
			// TODO Add test cases for where left side is a pattern e.g. `[x] = y`
			'x = 1',
			'x += 1',
			'x -= 1',
			'x *= 1',
			'x /= 1',
			'x %= 1',
			'x <<= 1',
			'x >>= 1',
			'x >>>= 1',
			'x |= 1',
			'x ^= 1',
			'x &= 1',
			'x **= 1',
			'x &&= 1',
			'x ||= 1',
			'x ??= 1',
			`x = 1; x += 1; x -= 1; x *= 1; x /= 1; x %= 1;
			x <<= 1; x >>= 1; x >>>= 1; x |= 1; x ^= 1; x &= 1;
			x **= 1; x &&= 1; x ||= 1; x ??= 1`
		]);

		itParses('Member expressions', [
			'x.y',
			'x.#y',
			'x[y]',
			'x[1]',
			'x[y + z]',
			"x['foo bar']",
			"x['foo bar qux']",
			'x.y.z',
			'x.#y.z',
			"x.#y[1][2][3].z['foo']['bar qux'][a + 3]"
		]);

		itParses('Conditional expressions', [
			'x ? y : z',
			'1 ? 2 : 3',
			'x ? 1 : y ? 2 : z ? 3 : 4'
		]);

		itParses('Call expressions', [
			// TODO Tests for `super()` call
			'f()',
			'func_name_longer_than_7_chars()',
			'f(1)',
			'f(x)',
			'f(x, y, z)',
			'f(param_name_longer_than_7_chars)',
			'f(param_name_longer_than_7_chars, x, y)',
			`func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			)`,
			'f(...x)',
			'f(...param_name_longer_than_7_chars)',
			'f(x, y, ...z)',
			'f(x, y, ...param_name_longer_than_7_chars)',
			`func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				...param_name_longer_than_7_chars3
			)`,

			"import(x)",
			"import(param_name_longer_than_7_chars)",
			"import('foo')",
			"import('foo/bar/qux.js')",
			'import(x, y, z)',
			'import(...x)',
			'import(x, y, ...z)'
		]);

		itParses('`new` expressions', [
			'new C()',
			'new Class_name_longer_than_7_chars()',
			'new C(x)',
			'new C(x, y, z)',
			'new C(param_name_longer_than_7_chars)',
			'new C(param_name_longer_than_7_chars, x, y)',
			`new Class_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			)`,
			'new C(...x)',
			'new C(...param_name_longer_than_7_chars)',
			'new C(x, y, ...z)',
			'new C(x, y, ...param_name_longer_than_7_chars)',
			`new Class_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				...param_name_longer_than_7_chars3
			)`
		]);

		itParses('Sequence expressions', [
			'x, x',
			'x, x, x',
			'1, 1',
			'1, 1, 1'
		]);

		itParses('Template literals', [
			'``',
			'`a`',
			'`str_longer_than_7_chars`',
			'`${x}`',
			'`${x}${y}${z}`',
			'`${x}a${y}b${z}`',
			'`a${x}b${y}c${z}d`',
			'`str_longer_than_7_chars${x}str_longer_than_7_chars2${y}str_longer_than_7_chars3${z}str_longer_than_7_chars4`',
			// Multi-line
			['`', 'a', '${x}', 'b', '${y}', 'c', '${z}', 'd', '`'].join('\n')
		]);

		itParses('Tagged template expressions', [
			'f``',
			'f`a`',
			'f`str_longer_than_7_chars`',
			'f`${x}`',
			'f`${x}${y}${z}`',
			'f`${x}a${y}b${z}`',
			'f`a${x}b${y}c${z}d`',
			'f`str_longer_than_7_chars${x}str_longer_than_7_chars2${y}str_longer_than_7_chars3${z}str_longer_than_7_chars4`',
			// Multi-line
			['f`', 'a', '${x}', 'b', '${y}', 'c', '${z}', 'd', '`'].join('\n')
		]);

		itParses('`yield` expressions', [
			'function *f() { yield; }',
			'function *f() { yield x; }',
			'function *f() { yield var_name_longer_than_7_chars; }',
			'function *f() { yield 1; }',
			'function *f() { yield 1; yield 2; yield 3; }',
			'function *f() { yield* x; }',
			'function *f() { yield* var_name_longer_than_7_chars; }',
			'function *f() { yield* 1; }',
			'function *f() { yield* x; yield* y; yield* z; }'
		]);

		describe('Meta properties', () => {
			itParses('new.target', [
				'new.target',
				'function f() { return new.target; }'
			]);

			itParses('import.meta', [
				'import.meta',
				'import.meta.url',
				'import.meta.resolve',
				'import.meta[x]'
			]);
		});

		describe('`await` expressions', () => {
			itParses('top level', { target: 'es2017', topLevelAwait: true }, [
				'await 1;',
				'await x;',
				'await var_name_longer_than_7_chars;'
			]);

			itParses('in functions', [
				'async function f() { await x; await y; await z; }',
				'async function *f() { await x; await y; await z; }'
			]);
		});

		itParses('Parenthesis expressions', [
			'(x)',
			'(1)'
		]);

		itParses('Optional chaining expressions', [
			'x?.y',
			'x?.[y]',
			'x?.[1]',
			'x?.y?.z',
			'x?.[y]?.[z]',
			'x?.[1]?.[2]',
			'var_name_longer_than_7_chars?.prop_name_longer_than_7_chars?.prop_name_longer_than_7_chars2',
			'var_name_longer_than_7_chars?.[var_name_longer_than_7_chars2]?.[var_name_longer_than_7_chars3]',

			'f?.()',
			'func_name_longer_than_7_chars?.()',
			'f?.(1)',
			'f?.(x)',
			'f?.(x, y, z)',
			'f?.(param_name_longer_than_7_chars)',
			'f?.(param_name_longer_than_7_chars, x, y)',
			`func_name_longer_than_7_chars?.(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			)`,
			'f?.(...x)',
			'f?.(...param_name_longer_than_7_chars)',
			'f?.(x, y, ...z)',
			'f?.(x, y, ...param_name_longer_than_7_chars)',
			`func_name_longer_than_7_chars?.(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				...param_name_longer_than_7_chars3
			)`,

			'x.y?.()',
			'var_name_longer_than_7_chars.prop_name_longer_than_7_chars?.()'
		]);
	});

	describe('Functions', () => {
		itParses('Function declarations', [
			'function f() {}',
			'function func_name_longer_than_7_chars() {}',
			'function f(x) {}',
			'function f(x, y, z) {}',
			`function f(
				param_name_longer_than_7_chars,
				y, z
			) {}`,
			`function f(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {}`,
			`function func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {}`,
			'function f() { let x = 1; }',
			'function f() { let x = 1; let y = 2; }',
			`function f(x, y) {
				if (x) return 1;
				if (y) return 2;
				return 3;
			}`,
			'function* f() {}',
			'async function f() {}',
			'async function* f() {}'
		]);

		itParses('Function expressions', [
			'(function f() {})',
			'(function func_name_longer_than_7_chars() {})',
			'(function f(x) {})',
			'(function f(x, y, z) {})',
			`(function f(
				param_name_longer_than_7_chars,
				y, z
			) {})`,
			`(function f(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {})`,
			`(function func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {})`,
			'(function f() { let x = 1; })',
			'(function f() { let x = 1; let y = 2; })',
			`(function f(x, y) {
				if (x) return 1;
				if (y) return 2;
				return 3;
			})`,
			'(function* f() {})',
			'(async function f() {})',
			'(async function* f() {})'
		]);

		itParses('Arrow function expressions', [
			'() => {}',
			'() => 1',
			'x => x',
			'(x, y, z) => x',
			'param_name_longer_than_7_chars => param_name_longer_than_7_chars',
			'(param_name_longer_than_7_chars, y, z) => param_name_longer_than_7_chars',
			`(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) => param_name_longer_than_7_chars`,
			`(x, y, z) => {
				if (x) return 1;
				if (y) return 2;
				if (z) return 3;
				return;
			}`,
			'async () => {}',
			'async () => 1',
			'async (x, y, z) => x',
			`async (x, y, z) => {
				if (x) return 1;
				if (y) return 2;
				if (z) return 3;
				return;
			}`
		]);
	});
});

// Utils

function parseSyncViaBuffer(code, options) {
	const buff = parseSyncToBuffer(code, options);
	return deserializeBuffer(buff);
}

function itParses(name, options, codes) {
	if (Array.isArray(options)) {
		codes = options;
		options = undefined;
	}

	describe(name, () => {
		for (const code of codes) {
			let testName = code.replace(/\s+/g, ' ');
			if (options) testName += ` (${JSON.stringify(options).replace(/"/g, '')})`;
			it(testName, () => {
				const ast = conformSpans(parseSync(code, options)),
					astViaBuffer = conformSpans(parseSyncViaBuffer(code, options));
				expect(astViaBuffer).toStrictEqual(ast);
				expect(JSON.stringify(astViaBuffer)).toBe(JSON.stringify(ast));
			});
		}
	})
}

// Make all spans relative to zero = start of file
function conformSpans(ast) {
	const offset = ast.span.start;
	function conformNode(node) {
		if (node.span) {
			node.span.start -= offset;
			node.span.end -= offset;
		}
		for (const [key, child] of Object.entries(node)) {
			if (key === 'span') continue;
			if (!child || typeof child !== 'object') continue;
			if (Array.isArray(child)) {
				for (const childNode of child) {
					if (childNode) conformNode(childNode);
				}
			} else if (
				(key === 'await' && node.type === 'ForOfStatement')
				|| (key === 'questionDotToken' && node.type === 'OptionalChainingExpression')
				|| (key === 'spread' && Object.keys(node).length === 2 && node.expression)
			) {
				// Special cases for:
				// - `ForOfStatement` which has an additional span under `await` key
				// - `OptionalChainingExpression` which has an additional span under `questionDotToken` key
				// - `ExpressionOrSpread` which may have a span under `spread` key
				child.start -= offset;
				child.end -= offset;
			} else {
				conformNode(child);
			}
		}
	}
	conformNode(ast);
	return ast;
}

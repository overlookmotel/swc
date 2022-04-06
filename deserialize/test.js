'use strict';

// Imports
const { parseSync, parseSyncToBuffer } = require('../index.js'),
	deserializeBuffer = require('./index.js');

// Tests

describe('Parses correctly', () => {
	describe('Program', () => {
		itParses('Module', { isModule: true }, [
			'',
			'const x = 1'
		]);

		itParses('Script', { isModule: false }, [
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
		itParses('Parenthesis expressions', [
			'(x)',
			'(1)'
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
				child.forEach(conformNode);
			} else if (key === 'await' && node.type === 'ForOfStatement') {
				// Special case for `ForOfStatement` which has an additional span under `await key`
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

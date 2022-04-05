'use strict';

// Imports
const { parseSync, parseSyncToBuffer } = require('../index.js'),
	deserializeBuffer = require('./index.js');

// Tests

describe('Parses correctly', () => {
	it.each(
		[
			// Module / Script
			['', { isModule: true }],
			['', { isModule: false }],
			['const x = 1', { isModule: true }],
			['const x = 1', { isModule: false }],

			// Variable declaration
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
			'let x = 1; let y = 2; let z = 3;',

			// Block statement
			'{}',
			'{ let x; }',
			'{ let x; let y; }',

			// Empty statement
			';',
			';;;',

			// `debugger` statement
			'debugger',
			'debugger; debugger; debugger',

			// `with` statement
			['with (1) {}', { isModule: false }],
			['with (1) ;', { isModule: false }],
			['with (1) {}; with (2) ; with (3) {}', { isModule: false }],

			// Labeled statement
			'a: ;',
			'a: {}',
			'a: { let x; let y; }',
			'label_name_longer_than_7_chars: { let x; }',
			'a: b: c: ;',
			'a: label_name_longer_than_7_chars: c: ;',
			'a: label_name_longer_than_7_chars: c: { let x; let y; }',

			// `break` statement
			'a: break;',
			'a: break a;',
			'label_name_longer_than_7_chars: break;',
			'label_name_longer_than_7_chars: break label_name_longer_than_7_chars;',
			'a: b: c: break a;',

			// `continue` statement
			'while (1) { continue; }',
			'a: while (1) { continue a; }',
			'label_name_longer_than_7_chars: while (1) { continue label_name_longer_than_7_chars; }',
			'a: b: c: while (1) { continue a; continue b; continue c; }',

			// `if` statement
			'if (1) ;',
			'if (1) {}',
			'if (1) { let x = 2; }',
			'if (1) ; else ;',
			'if (1) { let x = 2; } else { let y = 3; }',

			// `switch` statement
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
			}`,

			// `throw` statement
			'throw 1',
			'throw 1; throw 2; throw 3;',

			// `try` statement
			'try {} catch {}',
			'try {} catch (e) {}',
			'try {} finally {}',
			`try {
				throw 1;
			} catch (e) {
				let x = e;
			} finally {
				let y = 2;
			}`,

			// `while` statement
			'while (1) ;',
			'while (1) {}',
			`while (1) {
				if (1) break;
				continue;
			}`,

			// `do ... while` statement
			'do ; while (1)',
			'do {} while (1)',
			`do {
				if (1) break;
				continue;
			} while (1);`,

			// `for` statement
			'for (;;) ;',
			'for (x; y; z) ;',
			'for (let x = 1; x; x) ;',
			`for (let x = 1; x; x) {
				if (x) break;
				continue;
			}`,

			// `for (... in ...)` statement
			'for (x in y) ;',
			'for (let x in y) ;',
			`for (let x in y) {
				if (x) break;
				continue;
			}`,

			// `for (... of ...)` statement
			'for (x of y) ;',
			'for (let x of y) ;',
			`for (let x of y) {
				if (x) break;
				continue;
			}`,
			`for await (let x of y) ;`,
			`for await (let x of y) {}`,

			// Expression statement
			'x',
			'1'
		].map(
			(code) => {
				let options;
				if (Array.isArray(code)) [code, options] = code;
				let testName = code.replace(/\s+/g, ' ');
				if (options) testName += ` (${JSON.stringify(options).replace(/"/g, '')})`;
				return [testName, code, options];
			}
		)
	)('%p', (_, code, options) => {
		const ast = conformSpans(parseSync(code, options)),
			astViaBuffer = conformSpans(parseSyncViaBuffer(code, options));
		expect(astViaBuffer).toEqual(ast);
	});
});

// Utils

function parseSyncViaBuffer(code, options) {
	const buff = parseSyncToBuffer(code, options);
	return deserializeBuffer(buff);
}

// Make all spans relative to zero = start of file
function conformSpans(ast) {
	const offset = ast.span.start;
	function conformNode(node) {
		node.span.start -= offset;
		node.span.end -= offset;
		for (const [key, child] of Object.entries(node)) {
			if (key === 'span') continue;
			if (!child || typeof child !== 'object') continue;
			if (Array.isArray(child)) {
				child.forEach(conformNode);
			} else if (child.span) {
				conformNode(child);
			} else if (key === 'await' && node.type === 'ForOfStatement') {
				// Special case for `ForOfStatement` which has an additional span under `await key`
				child.start -= offset;
				child.end -= offset;
			}
		}
	}
	conformNode(ast);
	return ast;
}

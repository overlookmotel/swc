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
			'let x = 1; let y = 2; let z = 3;'
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
			} else {
				conformNode(child);
			}
		}
	}
	conformNode(ast);
	return ast;
}

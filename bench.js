'use strict';

const b = require('benny'),
	{ readFile } = require('fs/promises'),
	pathJoin = require('path').join,
	expect = require('expect'),
	filesize = require('filesize');

const {
	parseSync, parseSyncNoReturn,
	parseSyncToBuffer, parseSyncToBufferNoReturn, parseSyncRkyvNoReturn,
	parseSyncNoSerialization
} = require('./index.js'),
	parseSyncBinding = require('./binding.js').parseSync,
	deserializeBuffer = require('./deserialize/index.js'),
	babelParse = require('@babel/parser').parse,
	acornParse = require('acorn').parse;

function parseSyncViaBuffer(code) {
	const buff = parseSyncToBuffer(code);
	return deserializeBuffer(buff);
}

function parseSyncRawJson(code, options, filename) {
	options = options || { syntax: 'ecmascript' };
	options.syntax = options.syntax || 'ecmascript';
	return parseSyncBinding(code, Buffer.from(JSON.stringify(options)), filename);
}

async function run() {
	// Get input code
	const code = await readFile(
		// pathJoin(__dirname, 'node_modules/react/cjs/react-jsx-runtime.production.min.js'),
		pathJoin(__dirname, 'node_modules/react/cjs/react.production.min.js'),
		// pathJoin(__dirname, 'node_modules/react/cjs/react.development.js'),
		'utf8'
	);

	// Check alternative parser produces same result as `parseSync()`
	const ast = conformSpans(parseSync(code)),
		astViaBuffer = conformSpans(parseSyncViaBuffer(code));
	assertAstsEqual(astViaBuffer, ast);

	// Run benchmark
	await b.suite(
		`react.production.min.js (${filesize(code.length)})`,

		b.add('SWC', () => {
			parseSync(code);
		}),

		b.add('SWC with buffer serialization and deserialization', () => {
			parseSyncViaBuffer(code);
		}),

		b.add('SWC with buffer serialization but no deserialization', () => {
			parseSyncToBuffer(code);
		}),

		b.add('SWC with buffer serialization but buffer not returned to JS', () => {
			parseSyncToBufferNoReturn(code);
		}),

		b.add('SWC with RKYV serialization but not returned to JS', () => {
			parseSyncRkyvNoReturn(code);
		}),

		b.add('SWC with no serialization or deserialization', () => {
			parseSyncNoSerialization(code);
		}),

		b.add('SWC with JSON serialization but no deserialization', () => {
			parseSyncRawJson(code);
		}),

		b.add('SWC with JSON serialization but JSON not returned to JS', () => {
			parseSyncNoReturn(code);
		}),

		b.add('Babel', () => {
			babelParse(code);
		}),

		b.add('Acorn', () => {
			acornParse(code, { ecmaVersion: 2022 });
		}),

		b.cycle(),
		b.complete(),

		b.save({
			file: 'react',
			folder: __dirname,
			details: true,
			format: 'chart.html'
		})
	);
}

run().catch((e) => {
	console.log('ERROR:', e); // eslint-disable-line no-console
});

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
			} else if (
				(key === 'await' && node.type === 'ForOfStatement')
				|| (key === 'questionDotToken' && node.type === 'OptionalChainingExpression')
				|| (key === 'rest' && node.type === 'RestElement')
				|| (
					key === 'spread'
					&& (
						node.type === 'SpreadElement'
						|| (Object.keys(node).length === 2 && node.expression)
					)
				)
			) {
				// Special cases for:
				// - `ForOfStatement` which has an additional span under `await` key
				// - `OptionalChainingExpression` which has an additional span under `questionDotToken` key
				// - `RestElement` which has an additional span under `rest` key
				// - `SpreadElement` which has an additional span under `spread` key
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

// Strip extra properties off Jest's error object for comprehensible output
function assertAstsEqual(ast1, ast2) {
	try {
		expect(ast1).toStrictEqual(ast2);
		expect(JSON.stringify(ast1)).toBe(JSON.stringify(ast2));
	} catch (err) {
		throw new Error(err.message);
	}
}

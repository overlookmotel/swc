'use strict';

const b = require('benny'),
	expect = require('expect'),
	filesize = require('filesize');

const {
	parseSync, parseSyncNoReturn,
	parseSyncToBuffer, parseSyncToBufferNoReturn,
	parseSyncNoSerialization
} = require('./index.js'),
	parseSyncWasm = require('./crates/wasm/pkg/wasm.js').parseSync,
	parseSyncBinding = require('./binding.js').parseSync,
	deserializeBuffer = require('./deserialize/index.js'),
	deserializeJson = require('./deserialize/json.js'),
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

function parseSyncCustomJsonDeserialize(code) {
	return deserializeJson(parseSyncRawJson(code));
}

async function run(numLines) {
	// Create input code
	let code = '';
	for (let i = 0; i < numLines; i++) {
		code += `const _${i} = ${i};\n`;
	}

	// Check alternative parsers produce same result as `parseSync()`
	const ast = conformSpans(parseSync(code)),
		astViaBuffer = conformSpans(parseSyncViaBuffer(code)),
		astViaCustomJsonDeserialize = conformSpans(parseSyncCustomJsonDeserialize(code));
	assertAstsEqual(astViaBuffer, ast);
	assertAstsEqual(astViaCustomJsonDeserialize, ast);

	// Run benchmark
	await b.suite(
		`${numLines} lines (${filesize(code.length)})`,

		b.add('swc WASM', () => {
			parseSyncWasm(code, { syntax: 'ecmascript' });
		}),

		b.add('swc', () => {
			parseSync(code);
		}),

		b.add('swc with buffer serialization and deserialization', () => {
			parseSyncViaBuffer(code);
		}),

		b.add('swc with buffer serialization but no deserialization', () => {
			parseSyncToBuffer(code);
		}),

		b.add('swc with buffer serialization but buffer not returned to JS', () => {
			parseSyncToBufferNoReturn(code);
		}),

		b.add('swc with no serialization or deserialization', () => {
			parseSyncNoSerialization(code);
		}),

		b.add('swc with custom JSON deserialization', () => {
			parseSyncCustomJsonDeserialize(code);
		}),

		b.add('swc with JSON serialization but no deserialization', () => {
			parseSyncRawJson(code);
		}),

		b.add('swc with JSON serialization but JSON not returned to JS', () => {
			parseSyncNoReturn(code);
		}),

		b.add('babel', () => {
			babelParse(code);
		}),

		b.add('acorn', () => {
			acornParse(code, { ecmaVersion: 2022 });
		}),

		b.cycle(),
		b.complete(),

		b.save({
			file: `${numLines} lines`,
			folder: __dirname,
			details: true,
			format: 'chart.html'
		})
	);
}

(async () => {
	await run(100);
	await run(1000);
	await run(10000);
})().catch((e) => {
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

// Strip extra properties off Jest's error object for comprehensible output
function assertAstsEqual(ast1, ast2) {
	try {
		expect(ast1).toStrictEqual(ast2);
		expect(JSON.stringify(ast1)).toBe(JSON.stringify(ast2));
	} catch (err) {
		throw new Error(err.message);
	}
}

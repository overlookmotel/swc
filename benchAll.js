'use strict';

const b = require('benny'),
	{ readFile } = require('fs/promises'),
	pathJoin = require('path').join,
	expect = require('expect'),
	filesize = require('filesize');

const {
	parseSync, parseSyncToBuffer,
	printSync, printSyncFromBuffer,
	transformSync, transformSyncFromBuffer
} = require('./index.js'),
	deserialize = require('./deserialize/deserialize.js'),
	serialize = require('./deserialize/serialize.js'),
	babelParse = require('@babel/parser').parse,
	babelGenerate = require('@babel/generator').default;

function parseSyncViaBuffer(code, options) {
	const buff = parseSyncToBuffer(code, options);
	return deserialize(buff);
}

function printSyncViaBuffer(ast, options) {
	const buff = serialize(ast);
	return printSyncFromBuffer(buff, options);
}

function transformSyncViaBuffer(code, options) {
	const { plugin, ...newOptions } = options || {};
	const ast = parseSyncViaBuffer(code, newOptions?.jsc?.parser);
	const astTransformed = plugin(ast);
	const buff = serialize(astTransformed);
	return transformSyncFromBuffer(buff, newOptions);
}

async function run() {
	// Get input code
	// const filename = 'react-jsx-runtime.production.min.js';
	// const filename = 'react.development.js';
	const filename = 'react.production.min.js';

	const sourceMaps = false;
	const parseOptions = { isModule: false };
	const printOptions = { sourceMaps };
	const transformOptions = {
		jsc: {
			parser: parseOptions
		},
		plugin: function noopPlugin(ast) {
			return ast;
		},
		sourceMaps
	};

	const code = await readFile(pathJoin(__dirname, 'node_modules/react/cjs', filename), 'utf8');

	// Check buffer parser produces same result as `parseSync()`
	const astOrig = conformSpans(parseSync(code, parseOptions)),
		astViaBuffer = conformSpans(parseSyncViaBuffer(code, parseOptions));
	assertEqual(astViaBuffer, astOrig);

	// Check print via buffer produces same result as `printSync()`
	const ast = parseSync(code, parseOptions),
		printedOrig = printSync(ast, printOptions),
		printedViaBuffer = printSyncViaBuffer(ast, printOptions);
	assertEqual(printedViaBuffer, printedOrig);

	// Check transform via buffer produces same result as `transformSync()`
	const transformedOrig = transformSync(code, transformOptions),
		transformedViaBuffer = transformSyncViaBuffer(code, transformOptions);
	assertEqual(transformedViaBuffer, transformedOrig);

	// Get Babel AST
	const astBabel = babelParse(code);

	// Run benchmark
	await b.suite(
		`${filename} (${filesize(code.length)}) (${sourceMaps ? 'with' : 'without'} sourcemaps)`,

		// Parse
		b.add('SWC parse', () => {
			parseSync(code);
		}),

		b.add('SWC parse via buffer', () => {
			parseSyncViaBuffer(code);
		}),

		b.add('Babel parse', () => {
			babelParse(code);
		}),

		// Print
		b.add('SWC print', () => {
			printSync(ast, printOptions);
		}),

		b.add('SWC print via buffer', () => {
			printSyncViaBuffer(ast, printOptions);
		}),

		b.add('Babel print', () => {
			babelGenerate(astBabel, { sourceMaps, sourceFileName: 'foo.js' });
		}),

		// Parse and print
		b.add('SWC parse + print', () => {
			const ast = parseSync(code, parseOptions);
			printSync(ast, printOptions);
		}),

		b.add('SWC parse + print via buffer', () => {
			const ast = parseSyncViaBuffer(code, parseOptions);
			printSyncViaBuffer(ast, printOptions);
		}),

		b.add('Babel parse + print', () => {
			const ast = babelParse(code);
			babelGenerate(ast, { sourceMaps, sourceFileName: 'foo.js' });
		}),

		// Transform
		b.add('SWC transform', () => {
			transformSync(code, transformOptions);
		}),

		b.add('SWC transform via buffer', () => {
			transformSyncViaBuffer(code, transformOptions);
		}),

		b.add('SWC transform without JS roundtrip', () => {
			const optionsWithoutPlugin = { ...transformOptions };
			delete optionsWithoutPlugin.plugin;
			transformSync(code, optionsWithoutPlugin);
		}),

		b.cycle(),
		b.complete(),

		b.save({
			file: 'reactAll',
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
function assertEqual(val1, val2) {
	try {
		expect(val1).toStrictEqual(val2);
		expect(JSON.stringify(val1)).toBe(JSON.stringify(val2));
	} catch (err) {
		throw new Error(err.message);
	}
}

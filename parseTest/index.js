'use strict';

const pathJoin = require('path').join;
const { loadBinding } = require('@node-rs/helper');
const createJs = require('./createJs.js');

const bindings = loadBinding(pathJoin(__dirname, '..'), 'swc', '@swc/core');

const js = createJs(100000);

time('to AST', () => parseToAst(js));
time('to JSON', () => parseToJson(js));
time('to undefined', () => parseToUndefined(js));
time('to undefined (no serde)', () => parseToUndefinedNoSerde(js));


function parseToAst(js) {
	return JSON.parse(bindings.parseSync(js, getOptions()));
}

function parseToJson(js) {
	return bindings.parseSync(js, getOptions());
}

function parseToUndefined(js) {
	return bindings.parseSyncUndefined(js, getOptions());
}

function parseToUndefinedNoSerde(js) {
	return bindings.parseSyncUndefinedNoSerde(js, getOptions());
}

function getOptions() {
	return Buffer.from(JSON.stringify({ syntax: "ecmascript" }));
}

function time(name, fn) {
	const start = new Date();
	fn();
	const ms = new Date() - start;
	console.log(`${name}:`, ms, 'ms');
}

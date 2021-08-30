'use strict';

const pathJoin = require('path').join;
const { loadBinding } = require('@node-rs/helper');
const createJs = require('./createJs.js');

const bindings = loadBinding(pathJoin(__dirname, '..'), 'swc', '@swc/core');

const js = createJs(1);

console.log(bindings.parseSyncBincode(js, getOptions()));

function getOptions() {
	return Buffer.from(JSON.stringify({ syntax: "ecmascript" }));
}

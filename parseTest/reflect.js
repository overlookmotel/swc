'use strict';

const pathJoin = require('path').join;
const { loadBinding } = require('@node-rs/helper');

const bindings = loadBinding(pathJoin(__dirname, '..'), 'swc', '@swc/core');

console.dir(JSON.parse(bindings.reflect()), { depth: Infinity });

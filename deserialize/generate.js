'use strict';

// Modules
const { writeFileSync } = require('fs'),
    pathJoin = require('path').join;

// Imports
const { init, generateDeserializer } = require('./kinds.js'),
    types = require('./types/index.js'),
    utils = require('./utils.js');

// Generate deserializer code

init(types);
const code = generateDeserializer(utils);
writeFileSync(pathJoin(__dirname, 'index.js'), code);

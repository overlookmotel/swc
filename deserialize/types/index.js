'use strict';

// Modules
const assert = require("assert");

// Exports
const types = {};
module.exports = { types, initType, getTypeName };

// Imports
const programTypes = require('./program.js'),
    moduleTypes = require('./modules.js'),
    statementTypes = require('./statements.js'),
    declarationTypes = require('./declarations.js'),
    functionTypes = require('./functions.js'),
    classTypes = require('./classes.js'),
    patternTypes = require('./patterns.js'),
    expressionTypes = require('./expressions.js'),
    objectTypes = require('./objects.js'),
    literalTypes = require('./literals.js'),
    jsxTypes = require('./jsx.js'),
    typescriptTypes = require('./typescript.js'),
    primitiveTypes = require('./primitives.js');

// Assemble types
Object.assign(
    types,
    programTypes,
    moduleTypes,
    statementTypes,
    declarationTypes,
    functionTypes,
    classTypes,
    patternTypes,
    expressionTypes,
    objectTypes,
    literalTypes,
    jsxTypes,
    typescriptTypes,
    primitiveTypes
);

for (const [name, type] of Object.entries(types)) {
    type.name = name;
}

/**
 * Initialize type.
 * If string provided, looks up type object by name in `types`.
 * @param {string|Object} type - Type name or type object
 * @returns {Object} - Type object
 */
function initType(type) {
    if (typeof type === 'string') {
        assert(types[type], `Type not found: ${type}`);
        type = types[type];
    }

    if (!type.isInitialized) {
        type.isInitialized = true;
        getTypeName(type);
        type.init();
        assert(typeof type.name === 'string', 'No type name');
        assert(isPositiveInteger(type.length), `${type.name} type has no length`);
        assert(isPositiveInteger(type.align), `${type.name} type has no align`);
        types[type.name] = type;
    }

    return type;
}

/**
 * Get name of type. Calls `type.getName()` to get name.
 * @param {string|Object} type - Type name or type object
 * @returns {string} - Type name
 */
function getTypeName(type) {
    if (typeof type === 'string') return type;
    if (!type.name) type.name = type.getName();
    return type.name;
}

/**
 * Check if input is a positive integer.
 * @param {*} num - Input
 * @returns {boolean} - `true` if input is a positive integer
 */
function isPositiveInteger(num) {
    return typeof num === 'number' && num !== 0 && !isNaN(num) && num % 1 === 0;
}

'use strict';

// Modules
const assert = require('assert');

// Exports
const types = {};
module.exports = { types, getType };

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

// Set `name` for all types defined as properties of `type`
for (const [name, type] of Object.entries(types)) {
    type.name = name;
}

// Link types to each other
const unnamedTypes = new Set();
getType('Program');

// Get names for unnamed types and add to `types`
for (const type of unnamedTypes) {
    const typeName = type.initName();
    if (types[typeName]) {
        assert(types[typeName] === type, `Clashing type definitions for type name ${typeName}`);
    } else {
        types[typeName] = type;
    }
}

// Init `length` and `align` for all types
for (const type of Object.values(types)) {
    type.initLengthAndAlign();
}

/**
 * Get type object.
 * @param {Object|string} typeOrTypeName - Type object or type name
 * @returns {Object} - Type object
 */
function getType(typeOrTypeName) {
    let type;
    if (typeOrTypeName && typeof typeOrTypeName === 'object') {
        type = typeOrTypeName;
        if (!type.name) unnamedTypes.add(type);
    } else {
        assert(
            typeof typeOrTypeName === 'string',
            'getType() must be called with type object or type name'
        );
        type = types[typeOrTypeName];
        assert(type, `${typeOrTypeName} type not found`);
    }

    if (!type.isLinked) {
        type.isLinked = true;
        type.link();
    }

    return type;
}

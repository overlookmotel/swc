'use strict';

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

// Exports

module.exports = {
    ...programTypes,
    ...moduleTypes,
    ...statementTypes,
    ...declarationTypes,
    ...functionTypes,
    ...classTypes,
    ...patternTypes,
    ...expressionTypes,
    ...objectTypes,
    ...literalTypes,
    ...jsxTypes,
    ...typescriptTypes,
    ...primitiveTypes
};

'use strict';

// Imports
const { Node, Enum, EnumValue, Option, Box, Vec } = require('../kinds.js');

// Exports

module.exports = {
    Declaration: Enum([
        'ClassDeclaration', 'FunctionDeclaration', 'VariableDeclaration', 'TsInterfaceDeclaration',
        'TsTypeAliasDeclaration', 'TsEnumDeclaration', 'TsModuleDeclaration'
    ]),

    VariableDeclaration: Node({
        kind: 'VariableDeclarationKind',
        declare: 'BooleanBitAnd2Empty', // TODO Needs tests
        declarations: Vec('VariableDeclarator')
    }),
    VariableDeclarationKind: EnumValue(['var', 'let', 'const'], { length: 1 }),
    VariableDeclarator: Node({
        id: 'Pattern',
        init: Option(Box('Expression')),
        definite: 'Boolean' // TODO Needs tests
    })
};

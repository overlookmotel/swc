'use strict';

// Imports
const { Node, Enum, Option, Box, Vec } = require('../kinds.js');

// Exports

module.exports = {
    FunctionDeclaration: Node(
        {
            identifier: 'Identifier',
            declare: 'Boolean',
            params: Vec('Parameter'),
            decorators: Vec('Decorator'),
            span: 'Span',
            body: 'OptionBlockStatement',
            typeParameters: Option('TsTypeParameterDeclaration'),
            generator: 'BooleanBit',
            async: 'BooleanBitAnd2Empty',
            returnType: Option('TsTypeAnnotation')
        },
        {
            keys: [
                'identifier', 'declare', 'params', 'decorators',
                'span', 'body', 'generator', 'async',
                'typeParameters', 'returnType'
            ]
        }
    ),

    FunctionExpression: Node(
        {
            // Same as `FunctionDeclaration` except `identifier` is optional and no `declare` property
            identifier: Option('Identifier'),
            params: Vec('Parameter'),
            decorators: Vec('Decorator'),
            span: 'Span',
            body: 'OptionBlockStatement',
            typeParameters: Option('TsTypeParameterDeclaration'),
            generator: 'BooleanBit',
            async: 'BooleanBitAnd2Empty',
            returnType: Option('TsTypeAnnotation')
        },
        {
            keys: [
                'identifier', 'params', 'decorators', 'span',
                'body', 'generator', 'async', 'typeParameters',
                'returnType'
            ]
        }
    ),

    ArrowFunctionExpression: Node(
        {
            params: Vec('Pattern'),
            body: Enum(['BlockStatement', Box('Expression')]),
            typeParameters: Option('TsTypeParameterDeclaration'),
            async: 'BooleanBit',
            generator: 'BooleanBitAnd2Empty', // TODO Needs test. Do generator arrow functions exist?
            returnType: Option('TsTypeAnnotation')
        },
        {
            keys: [
                'span', 'params', 'body', 'async',
                'generator', 'typeParameters', 'returnType'
            ]
        }
    ),

    Parameter: Node({ decorators: Vec('Decorator'), pat: 'Pattern' }),
    Decorator: Node({ expression: Box('Expression') }) // TODO Needs tests
};

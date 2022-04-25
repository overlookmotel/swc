'use strict';

// Imports
const { Node, Enum, Option, Box, Vec } = require('../kinds/index.js');

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
            generator: 'Boolean',
            async: 'Boolean',
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
            generator: 'Boolean',
            async: 'Boolean',
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
            async: 'Boolean',
            generator: 'Boolean', // TODO Needs tests. Do generator arrow functions exist?
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

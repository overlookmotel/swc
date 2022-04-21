'use strict';

// Imports
const { Node, Enum, Option, Box, Vec } = require('../kinds.js');

// Exports

module.exports = {
    ObjectExpression: Node({
        properties: Vec(Enum(['SpreadElement', Box('ObjectProperty')]))
    }),

    SpreadElement: Node(
        { spread: 'Span', arguments: Box('Expression') },
        { noSpan: true }
    ),

    ObjectProperty: Enum([
        'Identifier', 'KeyValueProperty', 'AssignmentProperty', 'GetterProperty',
        'SetterProperty', 'MethodProperty'
    ]),
    KeyValueProperty: Node(
        { key: 'PropertyName', value: Box('Expression') },
        { noSpan: true }
    ),
    AssignmentProperty: Node({ key: 'Identifier', value: Box('Expression') }),
    GetterProperty: Node(
        {
            key: 'PropertyName',
            span: 'Span',
            typeAnnotation: Option('TsTypeAnnotation'),
            body: 'OptionBlockStatement'
        },
        { keys: ['span', 'key', 'typeAnnotation', 'body'] }
    ),
    SetterProperty: Node(
        {
            key: 'PropertyName',
            span: 'Span',
            param: 'Pattern',
            body: 'OptionBlockStatement'
        },
        { keys: ['span', 'key', 'param', 'body'] }
    ),
    MethodProperty: Node(
        {
            key: 'PropertyName',
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
                'key', 'params', 'decorators', 'span',
                'body', 'generator', 'async', 'typeParameters',
                'returnType'
            ]
        }
    ),

    PropertyName: Enum([
        'Identifier', 'StringLiteral', 'NumericLiteral', 'Computed',
        'BigIntLiteral'
    ])
};

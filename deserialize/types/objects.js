'use strict';

// Imports
const { Node, Enum, Option, Box, Vec, Custom } = require('../kinds.js');

// Exports

module.exports = {
    ObjectExpression: Node(
        { properties: Vec(Enum(['SpreadElement', Box('ObjectProperty')])) },
        { length: 20 } // Length explicit due to circularity
    ),

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

    PropertyName: Custom({
        // `PropertyNameWrapped` is 36 bytes length.
        // 4 empty bytes before and after `PropertyNameWrapped`.
        // TODO Not sure why
        deserialize(buff, pos) {
            return deserializePropertyNameWrapped(buff, pos + 4);
        },
        dependencies: ['PropertyNameWrapped'],
        length: 44,
        align: 4 // TODO Remove wrapping with `align = 8`?
    }),
    PropertyNameWrapped: Enum([
        'Identifier', 'StringLiteral', 'NumericLiteral', 'Computed',
        'BigIntLiteral'
    ])
};

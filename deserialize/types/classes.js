'use strict';

// Imports
const { Node, Enum, EnumValue, Option, Box, Vec } = require('../kinds/index.js');

// Exports

module.exports = {
    // Classes
    ClassDeclaration: Node({
        identifier: 'Identifier',
        declare: 'Boolean', // TODO Needs tests
        span: 'Span',
        decorators: Vec('Decorator'),
        body: Vec('ClassMember'),
        superClass: Option(Box('Expression')),
        isAbstract: 'Boolean', // TODO Needs tests
        typeParams: Option('TsTypeParamDeclaration'),
        superTypeParams: Option('TsTypeParameterInstantiation'),
        implements: Vec('TsExpressionWithTypeArg')
    }),

    ClassExpression: Node({
        // Same as `ClassDeclaration` but minus `declare` property, and `identifier` is optional
        identifier: Option('Identifier'),
        span: 'Span',
        decorators: Vec('Decorator'),
        body: Vec('ClassMember'),
        superClass: Option(Box('Expression')),
        isAbstract: 'Boolean', // TODO Needs tests
        typeParams: Option('TsTypeParamDeclaration'),
        superTypeParams: Option('TsTypeParameterInstantiation'),
        implements: Vec('TsExpressionWithTypeArg')
    }),

    // Class members
    ClassMember: Enum([
        'Constructor', 'ClassMethod', 'PrivateMethod', 'ClassProperty',
        'PrivateProperty', 'TsIndexSignature', 'EmptyStatement', 'StaticBlock'
    ]),

    Constructor: Node(
        {
            key: 'PropertyName',
            span: 'Span',
            params: Vec(Enum(['TsParamProp', 'Parameter'])),
            body: Option('BlockStatement'),
            accessibility: Option('Accessibility'), // TODO Needs tests
            isOptional: 'Boolean' // TODO Needs tests
        },
        { keys: ['span', 'key', 'params', 'body', 'accessibility', 'isOptional'] }
    ),

    ClassMethod: Node(
        {
            key: 'PropertyName',
            span: 'Span',
            function: 'Function',
            kind: 'MethodKind',
            isStatic: 'Boolean',
            isAbstract: 'Boolean', // TODO Needs tests
            isOptional: 'Boolean', // TODO Needs tests
            accessibility: Option('Accessibility'), // TODO Needs tests
            isOverride: 'Boolean' // TODO Needs tests
        },
        {
            keys: [
                'span', 'key', 'function', 'kind',
                'isStatic', 'accessibility', 'isAbstract', 'isOptional',
                'isOverride'
            ]
        }
    ),

    PrivateMethod: Node(
        {
            key: 'PrivateName',
            function: 'Function',
            kind: 'MethodKind',
            isStatic: 'Boolean',
            isAbstract: 'Boolean', // TODO Needs tests
            isOptional: 'Boolean', // TODO Needs tests
            accessibility: Option('Accessibility'), // TODO Needs tests
            isOverride: 'Boolean' // TODO Needs tests
        },
        {
            keys: [
                'span', 'key', 'function', 'kind',
                'isStatic', 'accessibility', 'isAbstract', 'isOptional',
                'isOverride'
            ]
        }
    ),

    ClassProperty: Node(
        {
            key: 'PropertyName',
            span: 'Span',
            value: Option(Box('Expression')),
            typeAnnotation: Option('TsTypeAnnotation'),
            decorators: Vec('Decorator'),
            isStatic: 'Boolean',
            accessibility: Option('Accessibility'), // TODO Needs tests
            isAbstract: 'Boolean', // TODO Needs tests
            isOptional: 'Boolean', // TODO Needs tests
            isOverride: 'Boolean', // TODO Needs tests
            readonly: 'Boolean', // TODO Needs tests
            declare: 'Boolean', // TODO Needs tests
            definite: 'Boolean' // TODO Needs tests
        },
        {
            keys: [
                'span', 'key', 'value', 'typeAnnotation',
                'isStatic', 'decorators', 'accessibility', 'isAbstract',
                'isOptional', 'isOverride', 'readonly', 'declare',
                'definite'
            ]
        }
    ),

    PrivateProperty: Node(
        {
            key: 'PrivateName',
            value: Option(Box('Expression')),
            typeAnnotation: Option('TsTypeAnnotation'),
            decorators: Vec('Decorator'),
            isStatic: 'Boolean',
            accessibility: Option('Accessibility'), // TODO Needs tests
            isOptional: 'Boolean', // TODO Needs tests
            isOverride: 'Boolean', // TODO Needs tests
            readonly: 'Boolean', // TODO Needs tests
            definite: 'Boolean' // TODO Needs tests
        },
        {
            keys: [
                'span', 'key', 'value', 'typeAnnotation',
                'isStatic', 'decorators', 'accessibility', 'isOptional',
                'isOverride', 'readonly', 'definite'
            ]
        }
    ),

    StaticBlock: Node({ body: 'BlockStatement' }),

    // Methods
    MethodKind: EnumValue(['method', 'getter', 'setter']),

    Function: Node(
        {
            params: Vec('Parameter'),
            decorators: Vec('Decorator'),
            span: 'Span',
            body: Option('BlockStatement'),
            typeParameters: Option('TsTypeParamDeclaration'),
            generator: 'Boolean',
            async: 'Boolean',
            returnType: Option('TsTypeAnnotation')
        },
        {
            noType: true,
            keys: [
                'params', 'decorators', 'span', 'body',
                'generator', 'async', 'typeParameters', 'returnType'
            ]
        }
    )
};

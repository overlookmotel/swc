'use strict';

// Imports
const { Node, Enum, EnumValue, Option, Box, Vec } = require('../kinds.js'),
    { initType } = require('./index.js');

// Exports

module.exports = {
    Expression: Enum([
        'ThisExpression', 'ArrayExpression', 'ObjectExpression', 'FunctionExpression',
        'UnaryExpression', 'UpdateExpression', 'BinaryExpression', 'AssignmentExpression',
        'MemberExpression', 'SuperPropExpression', 'ConditionalExpression', 'CallExpression',
        'NewExpression', 'SequenceExpression', 'Identifier', 'Literal',
        'TemplateLiteral', 'TaggedTemplateExpression', 'ArrowFunctionExpression', 'ClassExpression',
        'YieldExpression', 'MetaProperty', 'AwaitExpression', 'ParenthesisExpression',
        'JSXMemberExpression', 'JSXNamespacedName', 'JSXEmptyExpression', 'JSXElement',
        'JSXFragment', 'TsTypeAssertion', 'TsConstAssertion', 'TsNonNullExpression',
        'TsAsExpression', 'TsInstantiation', 'PrivateName', 'OptionalChainingExpression',
        'Invalid'
    ]),

    ThisExpression: Node({}),

    ArrayExpression: Node({ elements: Vec(Option('ExpressionOrSpread')) }),

    UnaryExpression: Node({ operator: 'UnaryOperator', argument: Box('Expression') }),
    UnaryOperator: EnumValue(['-', '+', '!', '~', 'typeof', 'void', 'delete']),

    UpdateExpression: Node({
        operator: 'UpdateOperator',
        prefix: 'Boolean',
        argument: Box('Expression')
    }),
    UpdateOperator: EnumValue(['++', '--']),

    BinaryExpression: Node(
        {
            left: Box('Expression'),
            operator: 'BinaryOperator',
            right: Box('Expression')
        },
        { keys: ['span', 'operator', 'left', 'right'] }
    ),
    BinaryOperator: EnumValue([
        '==', '!=', '===', '!==',
        '<', '<=', '>', '>=',
        '<<', '>>', '>>>', '+',
        '-', '*', '/', '%',
        '|', '^', '&', '||',
        '&&', 'in', 'instanceof', '**',
        '??'
    ]),

    AssignmentExpression: Node(
        {
            left: 'AssignmentLeft',
            operator: 'AssignmentOperator',
            right: Box('Expression')
        },
        {
            keys: ['span', 'operator', 'left', 'right'],
            init() {
                Node.prototype.init.call(this);
                initType('AssignmentLeftEquals');
            },
            generateSerializer() {
                return Node.prototype.generateSerializer.call(this)
                    .replace(
                        'serializeAssignmentLeft(',
                        `node.operator === '=' 
                    ? serializeAssignmentLeftEquals(node.left)
                    : serializeAssignmentLeft(`
                    );
            }
        }
    ),
    AssignmentLeft: Enum([Box('Expression'), Box('Pattern')]),
    AssignmentLeftEquals: Enum(
        [Box('Expression'), Box('Pattern')],
        {
            order: [1, 0], // Interpret nodes as patterns over expressions
            generateDeserializer() {
                // No deserializer needed. Only used in serializer.
                return null;
            },
            generateSerializer() {
                // No finalizer needed. `finalizeAssignmentLeft()` is used.
                return Enum.prototype.generateSerializer.call(this)
                    .replace(/\s+function finalizeAssignmentLeftEquals\([\s\S]+$/, '');
            }
        }
    ),
    AssignmentOperator: EnumValue([
        '=', '+=', '-=', '*=',
        '/=', '%=', '<<=', '>>=',
        '>>>=', '|=', '^=', '&=',
        '**=', '&&=', '||=', '??='
    ]),

    MemberExpression: Node({
        object: Box('Expression'),
        property: Enum(['Identifier', 'PrivateName', 'Computed'])
    }),

    SuperPropExpression: Node({
        obj: 'Super',
        property: Enum(['Identifier', 'Computed'])
    }),

    ConditionalExpression: Node({
        test: Box('Expression'),
        consequent: Box('Expression'),
        alternate: Box('Expression')
    }),

    CallExpression: Node({
        callee: Enum(['Super', 'Import', Box('Expression')]),
        arguments: Vec('ExpressionOrSpread'),
        typeArguments: Option('TsTypeParameterInstantiation')
    }),

    NewExpression: Node({
        callee: Box('Expression'),
        arguments: Option(Vec('ExpressionOrSpread')),
        typeArguments: Option('TsTypeParameterInstantiation')
    }),

    SequenceExpression: Node({ expressions: Vec(Box('Expression')) }),

    Identifier: Node({ value: 'JsWord', optional: 'Boolean' }), // TODO Needs tests

    TemplateLiteral: Node({ expressions: Vec(Box('Expression')), quasis: Vec('TemplateElement') }),
    TemplateElement: Node(
        {
            cooked: Option('JsWord'),
            tail: 'Boolean',
            raw: 'JsWord'
        },
        { keys: ['span', 'tail', 'cooked', 'raw'] }
    ),

    TaggedTemplateExpression: Node({
        tag: Box('Expression'),
        typeParameters: Option('TsTypeParameterInstantiation'),
        template: 'TemplateLiteral'
    }),

    YieldExpression: Node({ argument: Option(Box('Expression')), delegate: 'Boolean' }),

    MetaProperty: Node({ kind: 'MetaPropertyKind' }),
    MetaPropertyKind: EnumValue(['new.target', 'import.meta']),

    AwaitExpression: Node({ argument: Box('Expression') }),

    ParenthesisExpression: Node({ expression: Box('Expression') }),

    PrivateName: Node({ id: 'Identifier' }),

    OptionalChainingExpression: Node({
        questionDotToken: 'Span',
        base: Enum(['MemberExpression', 'OptionalChainingCall'])
    }),
    OptionalChainingCall: Node(
        {
            callee: Box('Expression'),
            arguments: Vec('ExpressionOrSpread'),
            typeArguments: Option('TsTypeParameterInstantiation')
        },
        { nodeName: 'CallExpression' }
    ),

    Super: Node({}),

    Import: Node({}),

    Invalid: Node({}), // TODO Needs tests. Not sure in what circumstances this is used.

    Computed: Node({ expression: Box('Expression') }),

    ExpressionOrSpread: Node(
        { spread: Option('Span'), expression: Box('Expression') },
        { noSpan: true, noType: true }
    )
};

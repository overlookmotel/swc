"use strict";

// Imports
const {
        Node,
        Enum,
        EnumValue,
        Option,
        Box,
        Vec,
        Custom,
    } = require("../kinds/index.js"),
    { getType } = require("./index.js");

// Exports

const ExpressionNode = (props, options) =>
    Node(props, { inheritFrom: "ExpressionBase", ...options });

module.exports = {
    Expression: Enum([
        "ThisExpression",
        "ArrayExpression",
        "ObjectExpression",
        "FunctionExpression",
        "UnaryExpression",
        "UpdateExpression",
        "BinaryExpression",
        "AssignmentExpression",
        "MemberExpression",
        "SuperPropExpression",
        "ConditionalExpression",
        "CallExpression",
        "NewExpression",
        "SequenceExpression",
        "Identifier",
        "Literal",
        "TemplateLiteral",
        "TaggedTemplateExpression",
        "ArrowFunctionExpression",
        "ClassExpression",
        "YieldExpression",
        "MetaProperty",
        "AwaitExpression",
        "ParenthesisExpression",
        "JSXMemberExpression",
        "JSXNamespacedName",
        "JSXEmptyExpression",
        Box("JSXElement"),
        "JSXFragment",
        "TsTypeAssertion",
        "TsConstAssertion",
        "TsNonNullExpression",
        "TsAsExpression",
        "TsInstantiation",
        "PrivateName",
        "OptionalChainingExpression",
        "Invalid",
    ]),

    ExpressionBase: Node(
        {},
        {
            generateDeserializer() {},
            generateSerializer() {},
            noType: true,
            noSpan: true,
            tsExtends: ["Node", "HasSpan"],
            tsNoExport: true,
        }
    ),

    ThisExpression: ExpressionNode({}),

    ArrayExpression: ExpressionNode({ elements: Vec(Option("ExprOrSpread")) }),

    UnaryExpression: ExpressionNode({
        operator: "UnaryOperator",
        argument: Box("Expression"),
    }),
    UnaryOperator: EnumValue(["-", "+", "!", "~", "typeof", "void", "delete"]),

    UpdateExpression: ExpressionNode({
        operator: "UpdateOperator",
        prefix: "Boolean",
        argument: Box("Expression"),
    }),
    UpdateOperator: EnumValue(["++", "--"]),

    BinaryExpression: ExpressionNode({
        operator: "BinaryOperator",
        left: Box("Expression"),
        right: Box("Expression"),
    }),
    BinaryOperator: EnumValue([
        "==",
        "!=",
        "===",
        "!==",
        "<",
        "<=",
        ">",
        ">=",
        "<<",
        ">>",
        ">>>",
        "+",
        "-",
        "*",
        "/",
        "%",
        "|",
        "^",
        "&",
        "||",
        "&&",
        "in",
        "instanceof",
        "**",
        "??",
    ]),

    // Assignment expressions need special treatment as left-hand side is treated differently
    // depending on operator.
    // When operator is `=`, left-hand side is a `Pattern`, and nodes with `Identifier` type in JS
    // are `BindingIdentifier` Rust type.
    // With any other operator, left-hand side is an `Expression`, and nodes with `Identifier`
    // type in JS are `Identifier` Rust type.
    AssignmentExpression: ExpressionNode(
        {
            operator: "AssignmentOperator",
            left: "AssignmentLeft",
            right: Box("Expression"),
        },
        {
            link() {
                Node.prototype.link.call(this);
                getType("AssignmentLeftEquals");
            },
            generateSerializer() {
                return Node.prototype.generateSerializer.call(this).replace(
                    "serializeAssignmentLeft(",
                    `node.operator === "="
                        ? serializeAssignmentLeftEquals(node.left)
                        : serializeAssignmentLeft(`
                );
            },
        }
    ),
    AssignmentLeft: Enum([Box("Expression"), Box("Pattern")], {
        tsInline: true,
    }),
    AssignmentLeftEquals: Custom({
        // Use `deserializeAssignmentLeft` as deserializer for type
        deserialize: false,
        // Shortened serializer as only patterns are valid on left side of `=` assignment expression
        serialize(node) {
            const storePos32 = allocScratch(2);
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBoxPattern(node));
            return storePos32;
        },
        // Use `finalizeAssignmentLeft` as finalizer for type
        finalize: false,
        dependencies: [Box("Expression"), Box("Pattern")],
        length: 8,
        align: 4,
    }),
    AssignmentOperator: EnumValue([
        "=",
        "+=",
        "-=",
        "*=",
        "/=",
        "%=",
        "<<=",
        ">>=",
        ">>>=",
        "|=",
        "^=",
        "&=",
        "**=",
        "&&=",
        "||=",
        "??=",
    ]),

    MemberExpression: ExpressionNode({
        object: Box("Expression"),
        property: Enum(["Identifier", "PrivateName", "Computed"]),
    }),

    SuperPropExpression: ExpressionNode({
        obj: "Super",
        property: Enum(["Identifier", "Computed"]),
    }),

    ConditionalExpression: ExpressionNode({
        test: Box("Expression"),
        consequent: Box("Expression"),
        alternate: Box("Expression"),
    }),

    CallExpression: ExpressionNode(
        {
            callee: Enum(["Super", "Import", Box("Expression")]),
            arguments: Vec("ExprOrSpread"),
            typeArguments: Option("TsTypeParameterInstantiation"),
        },
        {
            generateTypeDef() {
                return Node.prototype.generateTypeDef.call({
                    ...this,
                    props: {
                        ...this.props,
                        arguments: {
                            ...this.props.arguments,
                            tsName: "Argument[]",
                        },
                    },
                });
            },
        }
    ),
    Argument: Node(
        { spread: Option("Span"), expression: Box("Expression") },
        {
            generateDeserializer() {},
            generateSerializer() {},
            noSpan: true,
            noType: true,
        }
    ),

    NewExpression: ExpressionNode(
        {
            callee: Box("Expression"),
            arguments: Option(Vec("ExprOrSpread")),
            typeArguments: Option("TsTypeParameterInstantiation"),
        },
        {
            generateTypeDef() {
                return Node.prototype.generateTypeDef.call({
                    ...this,
                    props: {
                        ...this.props,
                        arguments: {
                            ...this.props.arguments,
                            tsName: "Argument[]",
                        },
                    },
                });
            },
        }
    ),

    SequenceExpression: ExpressionNode({ expressions: Vec(Box("Expression")) }),

    Identifier: ExpressionNode({ value: "JsWord", optional: "Boolean" }), // TODO Needs tests

    TemplateLiteral: ExpressionNode({
        expressions: Vec(Box("Expression")),
        quasis: Vec("TemplateElement"),
    }),
    TemplateElement: ExpressionNode({
        tail: "Boolean",
        cooked: Option("JsWord"),
        raw: "JsWord",
    }),

    TaggedTemplateExpression: ExpressionNode({
        tag: Box("Expression"),
        typeParameters: Option("TsTypeParameterInstantiation"),
        template: "TemplateLiteral",
    }),

    YieldExpression: ExpressionNode({
        argument: Option(Box("Expression")),
        delegate: "Boolean",
    }),

    MetaProperty: Node({ kind: "MetaPropertyKind" }),
    MetaPropertyKind: EnumValue(["new.target", "import.meta"], {
        tsInline: true,
    }),

    AwaitExpression: ExpressionNode({ argument: Box("Expression") }),

    ParenthesisExpression: ExpressionNode({ expression: Box("Expression") }),

    PrivateName: ExpressionNode({ id: "Identifier" }),

    OptionalChainingExpression: ExpressionNode({
        questionDotToken: "Span",
        base: Enum(["MemberExpression", "OptionalChainingCall"]),
    }),
    OptionalChainingCall: ExpressionNode(
        {
            callee: Box("Expression"),
            arguments: Vec("ExprOrSpread"),
            typeArguments: Option("TsTypeParameterInstantiation"),
        },
        { nodeName: "CallExpression", tsName: "OptionalChainingCall" }
    ),

    Super: Node({}),

    Import: Node({}),

    Invalid: Node({}), // TODO Needs tests. Not sure in what circumstances this is used.

    Computed: Node(
        { expression: Box("Expression") },
        { tsName: "ComputedPropName" }
    ),

    ExprOrSpread: Node(
        { spread: Option("Span"), expression: Box("Expression") },
        { noSpan: true, noType: true }
    ),
};

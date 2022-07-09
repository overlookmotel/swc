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

    ThisExpression: Node({}),

    ArrayExpression: Node({ elements: Vec(Option("ExpressionOrSpread")) }),

    UnaryExpression: Node({
        operator: "UnaryOperator",
        argument: Box("Expression"),
    }),
    UnaryOperator: EnumValue(["-", "+", "!", "~", "typeof", "void", "delete"]),

    UpdateExpression: Node({
        operator: "UpdateOperator",
        prefix: "Boolean",
        argument: Box("Expression"),
    }),
    UpdateOperator: EnumValue(["++", "--"]),

    BinaryExpression: Node({
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
    // type in JS are `Identifer` Rust type.
    AssignmentExpression: Node(
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
    AssignmentLeft: Enum([Box("Expression"), Box("Pattern")]),
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

    MemberExpression: Node({
        object: Box("Expression"),
        property: Enum(["Identifier", "PrivateName", "Computed"]),
    }),

    SuperPropExpression: Node({
        obj: "Super",
        property: Enum(["Identifier", "Computed"]),
    }),

    ConditionalExpression: Node({
        test: Box("Expression"),
        consequent: Box("Expression"),
        alternate: Box("Expression"),
    }),

    CallExpression: Node({
        callee: Enum(["Super", "Import", Box("Expression")]),
        arguments: Vec("ExpressionOrSpread"),
        typeArguments: Option("TsTypeParameterInstantiation"),
    }),

    NewExpression: Node({
        callee: Box("Expression"),
        arguments: Option(Vec("ExpressionOrSpread")),
        typeArguments: Option("TsTypeParameterInstantiation"),
    }),

    SequenceExpression: Node({ expressions: Vec(Box("Expression")) }),

    Identifier: Node({ value: "JsWord", optional: "Boolean" }), // TODO Needs tests

    TemplateLiteral: Node({
        expressions: Vec(Box("Expression")),
        quasis: Vec("TemplateElement"),
    }),
    TemplateElement: Node({
        tail: "Boolean",
        cooked: Option("JsWord"),
        raw: "JsWord",
    }),

    TaggedTemplateExpression: Node({
        tag: Box("Expression"),
        typeParameters: Option("TsTypeParameterInstantiation"),
        template: "TemplateLiteral",
    }),

    YieldExpression: Node({
        argument: Option(Box("Expression")),
        delegate: "Boolean",
    }),

    MetaProperty: Node({ kind: "MetaPropertyKind" }),
    MetaPropertyKind: EnumValue(["new.target", "import.meta"]),

    AwaitExpression: Node({ argument: Box("Expression") }),

    ParenthesisExpression: Node({ expression: Box("Expression") }),

    PrivateName: Node({ id: "Identifier" }),

    OptionalChainingExpression: Node({
        questionDotToken: "Span",
        base: Enum(["MemberExpression", "OptionalChainingCall"]),
    }),
    OptionalChainingCall: Node(
        {
            callee: Box("Expression"),
            arguments: Vec("ExpressionOrSpread"),
            typeArguments: Option("TsTypeParameterInstantiation"),
        },
        { nodeName: "CallExpression" }
    ),

    Super: Node({}),

    Import: Node({}),

    Invalid: Node({}), // TODO Needs tests. Not sure in what circumstances this is used.

    Computed: Node({ expression: Box("Expression") }),

    ExpressionOrSpread: Node(
        { spread: Option("Span"), expression: Box("Expression") },
        { noSpan: true, noType: true }
    ),
};

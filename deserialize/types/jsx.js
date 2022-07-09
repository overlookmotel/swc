"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    JSXElement: Node({
        opening: "JSXOpeningElement",
        children: Vec("JSXElementChild"),
        closing: Option("JSXClosingElement"),
    }),
    JSXOpeningElement: Node({
        name: "JSXElementName",
        span: "Span",
        attributes: Vec(Enum(["JSXAttribute", "SpreadElement"])),
        selfClosing: "Boolean",
        typeArguments: Option("TsTypeParameterInstantiation"), // TODO Needs tests
    }),
    JSXAttribute: Node({
        name: "JSXAttributeName",
        value: Option("JSXAttributeValue"),
    }),
    JSXAttributeName: Enum(["Identifier", "JSXNamespacedName"]),
    JSXAttributeValue: Enum([
        "Literal",
        "JSXExpressionContainer",
        Box("JSXElement"),
        "JSXFragment",
    ]),
    JSXClosingElement: Node({ name: "JSXElementName" }),

    JSXFragment: Node({
        opening: "JSXOpeningFragment",
        children: Vec("JSXElementChild"),
        closing: "JSXClosingFragment",
    }),
    JSXOpeningFragment: Node({}),
    JSXClosingFragment: Node({}),

    JSXMemberExpression: Node(
        { object: "JSXObject", property: "Identifier" },
        { noSpan: true }
    ),
    JSXObject: Enum([Box("JSXMemberExpression"), "Identifier"]),

    JSXNamespacedName: Node(
        { namespace: "Identifier", name: "Identifier" },
        { noSpan: true }
    ),

    JSXText: Node({ value: "JsWord", raw: "JsWord" }),

    JSXEmptyExpression: Node({}),

    JSXElementChild: Enum([
        "JSXText",
        "JSXExpressionContainer",
        "JSXSpreadChild",
        Box("JSXElement"),
        "JSXFragment",
    ]),

    JSXExpressionContainer: Node({ expression: "JSXExpression" }),
    JSXExpression: Enum(["JSXEmptyExpression", Box("Expression")]),
    JSXSpreadChild: Node({ expression: Box("Expression") }),

    JSXElementName: Enum([
        "Identifier",
        "JSXMemberExpression",
        "JSXNamespacedName",
    ]),
};

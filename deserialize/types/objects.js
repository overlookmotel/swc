"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    ObjectExpression: Node({
        properties: Vec(Enum(["SpreadElement", Box("ObjectProperty")])),
    }),

    SpreadElement: Node(
        { spread: "Span", arguments: Box("Expression") },
        { noSpan: true }
    ),

    ObjectProperty: Enum([
        "Identifier",
        "KeyValueProperty",
        "AssignmentProperty",
        "GetterProperty",
        "SetterProperty",
        "MethodProperty",
    ]),
    KeyValueProperty: Node(
        { key: "PropertyName", value: Box("Expression") },
        { noSpan: true }
    ),
    AssignmentProperty: Node(
        // TODO Needs tests. However, I can't see how this can be valid.
        // A comment in `prop.rs` says "This is **invalid** for object literal."
        // but only place `AssignmentProperty` is used is as a property of `ObjectExpression`.
        { key: "Identifier", value: Box("Expression") },
        { noSpan: true }
    ),
    GetterProperty: Node({
        key: "PropertyName",
        typeAnnotation: Option("TsTypeAnnotation"),
        body: Option("BlockStatement"),
    }),
    SetterProperty: Node({
        key: "PropertyName",
        param: "Pattern",
        body: Option("BlockStatement"),
    }),
    MethodProperty: Node({
        key: "PropertyName",
        params: Vec("Parameter"),
        decorators: Vec("Decorator"),
        span: "Span",
        body: Option("BlockStatement"),
        generator: "Boolean",
        async: "Boolean",
        typeParameters: Option("TsTypeParameterDeclaration"),
        returnType: Option("TsTypeAnnotation"),
    }),

    PropertyName: Enum([
        "Identifier",
        "StringLiteral",
        "NumericLiteral",
        "Computed",
        "BigIntLiteral",
    ]),
};

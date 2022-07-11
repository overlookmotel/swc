"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    FunctionDeclaration: Node(
        { identifier: "Identifier", declare: "Boolean" },
        { inheritFrom: "Fn", noSpan: true } // Span inherited
    ),

    FunctionExpression: Node(
        { identifier: Option("Identifier") },
        {
            inheritFrom: "Fn",
            noSpan: true, // Span inherited from `Fn`
            tsExtends: ["Fn", "ExpressionBase"],
        }
    ),

    Fn: Node(
        {
            params: Vec("Parameter"),
            decorators: Vec("Decorator"),
            span: "Span",
            body: Option("BlockStatement"),
            generator: "Boolean",
            async: "Boolean",
            typeParameters: Option("TsTypeParameterDeclaration"),
            returnType: Option("TsTypeAnnotation"),
        },
        { noType: true }
    ),

    ArrowFunctionExpression: Node(
        {
            params: Vec("Pattern"),
            body: Enum(["BlockStatement", Box("Expression")]),
            async: "Boolean",
            generator: "Boolean", // TODO Needs tests. Do generator arrow functions exist?
            typeParameters: Option("TsTypeParameterDeclaration"),
            returnType: Option("TsTypeAnnotation"),
        },
        { tsExtends: ["ExpressionBase"] }
    ),

    Parameter: Node(
        { decorators: Vec("Decorator"), pat: "Pattern" },
        { tsName: "Param" }
    ),
    Decorator: Node({ expression: Box("Expression") }), // TODO Needs tests
};

"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    FunctionDeclaration: Node({
        identifier: "Identifier",
        declare: "Boolean",
        params: Vec("Parameter"),
        decorators: Vec("Decorator"),
        span: "Span",
        body: Option("BlockStatement"),
        generator: "Boolean",
        async: "Boolean",
        typeParameters: Option("TsTypeParameterDeclaration"),
        returnType: Option("TsTypeAnnotation"),
    }),

    FunctionExpression: Node({
        // Same as `FunctionDeclaration` except `identifier` is optional and no `declare` property
        identifier: Option("Identifier"),
        params: Vec("Parameter"),
        decorators: Vec("Decorator"),
        span: "Span",
        body: Option("BlockStatement"),
        generator: "Boolean",
        async: "Boolean",
        typeParameters: Option("TsTypeParameterDeclaration"),
        returnType: Option("TsTypeAnnotation"),
    }),

    ArrowFunctionExpression: Node({
        params: Vec("Pattern"),
        body: Enum(["BlockStatement", Box("Expression")]),
        async: "Boolean",
        generator: "Boolean", // TODO Needs tests. Do generator arrow functions exist?
        typeParameters: Option("TsTypeParameterDeclaration"),
        returnType: Option("TsTypeAnnotation"),
    }),

    Parameter: Node({ decorators: Vec("Decorator"), pat: "Pattern" }),
    Decorator: Node({ expression: Box("Expression") }), // TODO Needs tests
};

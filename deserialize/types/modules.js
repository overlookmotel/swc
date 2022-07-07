"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    ModuleDeclaration: Enum([
        "ImportDeclaration",
        "ExportDeclaration",
        "ExportNamedDeclaration",
        "ExportDefaultDeclaration",
        "ExportDefaultExpression",
        "ExportAllDeclaration",
        "TsImportEqualsDeclaration",
        "TsExportAssignment",
        "TsNamespaceExportDeclaration",
    ]),

    // Imports
    ImportDeclaration: Node({
        specifiers: Vec("ImportSpecifier"),
        source: "StringLiteral",
        typeOnly: "Boolean", // TODO Needs tests
        asserts: Option("ObjectExpression"), // TODO Needs tests
    }),

    ImportSpecifier: Enum([
        "ImportNamedSpecifier",
        "ImportDefaultSpecifier",
        "ImportNamespaceSpecifier",
    ]),
    ImportNamedSpecifier: Node(
        {
            local: "Identifier",
            imported: Option("ModuleExportName"),
            isTypeOnly: "Boolean", // TODO Needs tests
        },
        { nodeName: "ImportSpecifier" }
    ),
    ImportDefaultSpecifier: Node({ local: "Identifier" }),
    ImportNamespaceSpecifier: Node({ local: "Identifier" }),

    // Exports
    ExportDeclaration: Node({ declaration: "Declaration" }),

    ExportNamedDeclaration: Node({
        specifiers: Vec("ExportSpecifier"),
        source: Option("StringLiteral"),
        typeOnly: "Boolean", // TODO Needs tests
        asserts: Option("ObjectExpression"), // TODO Needs tests
    }),
    ExportSpecifier: Enum([
        "ExportNamespaceSpecifier",
        "ExportDefaultSpecifier",
        "ExportNamedSpecifier",
    ]),
    ExportNamespaceSpecifier: Node({ name: "ModuleExportName" }),
    ExportDefaultSpecifier: Node({ exported: "Identifier" }),
    ExportNamedSpecifier: Node(
        {
            orig: "ModuleExportName",
            exported: Option("ModuleExportName"),
            isTypeOnly: "Boolean", // TODO Needs tests
        },
        { nodeName: "ExportSpecifier" }
    ),

    ExportDefaultDeclaration: Node({
        decl: Enum([
            "ClassExpression",
            "FunctionExpression",
            "TsInterfaceDeclaration",
        ]),
    }),

    ExportDefaultExpression: Node({ expression: Box("Expression") }),

    ExportAllDeclaration: Node({
        source: "StringLiteral",
        asserts: Option("ObjectExpression"), // TODO Needs tests
    }),

    // Import/export name
    ModuleExportName: Enum(["Identifier", "StringLiteral"]),
};

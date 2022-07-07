"use strict";

// Imports
const {
    Node,
    Enum,
    EnumValue,
    Option,
    Box,
    Vec,
} = require("../kinds/index.js");

// Exports

module.exports = {
    Declaration: Enum([
        "ClassDeclaration",
        "FunctionDeclaration",
        "VariableDeclaration",
        "TsInterfaceDeclaration",
        "TsTypeAliasDeclaration",
        "TsEnumDeclaration",
        "TsModuleDeclaration",
    ]),

    VariableDeclaration: Node({
        kind: "VariableDeclarationKind",
        declare: "Boolean", // TODO Needs tests
        declarations: Vec("VariableDeclarator"),
    }),
    VariableDeclarationKind: EnumValue(["var", "let", "const"]),
    VariableDeclarator: Node({
        id: "Pattern",
        init: Option(Box("Expression")),
        definite: "Boolean", // TODO Needs tests
    }),
};

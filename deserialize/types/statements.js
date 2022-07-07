"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    Statement: Enum([
        "BlockStatement",
        "EmptyStatement",
        "DebuggerStatement",
        "WithStatement",
        "ReturnStatement",
        "LabeledStatement",
        "BreakStatement",
        "ContinueStatement",
        "IfStatement",
        "SwitchStatement",
        "ThrowStatement",
        "TryStatement",
        "WhileStatement",
        "DoWhileStatement",
        "ForStatement",
        "ForInStatement",
        "ForOfStatement",
        "Declaration",
        "ExpressionStatement",
    ]),

    BlockStatement: Node({ stmts: Vec("Statement") }),

    EmptyStatement: Node({}),

    DebuggerStatement: Node({}),

    WithStatement: Node({ object: Box("Expression"), body: Box("Statement") }),

    ReturnStatement: Node({ argument: Option(Box("Expression")) }),

    LabeledStatement: Node({ label: "Identifier", body: Box("Statement") }),

    BreakStatement: Node({ label: Option("Identifier") }),

    ContinueStatement: Node({ label: Option("Identifier") }),

    IfStatement: Node({
        test: Box("Expression"),
        consequent: Box("Statement"),
        alternate: Option(Box("Statement")),
    }),

    SwitchStatement: Node({
        discriminant: Box("Expression"),
        cases: Vec("SwitchCase"),
    }),
    SwitchCase: Node({
        test: Option(Box("Expression")),
        consequent: Vec("Statement"),
    }),

    ThrowStatement: Node({ argument: Box("Expression") }),

    TryStatement: Node({
        block: "BlockStatement",
        handler: Option("CatchClause"),
        finalizer: Option("BlockStatement"),
    }),
    CatchClause: Node({ param: Option("Pattern"), body: "BlockStatement" }),

    WhileStatement: Node({ test: Box("Expression"), body: Box("Statement") }),

    DoWhileStatement: Node({ test: Box("Expression"), body: Box("Statement") }),

    ForStatement: Node({
        init: Option(Enum(["VariableDeclaration", Box("Expression")])),
        test: Option(Box("Expression")),
        update: Option(Box("Expression")),
        body: Box("Statement"),
    }),

    ForInStatement: Node({
        left: Enum(["VariableDeclaration", "Pattern"]),
        right: Box("Expression"),
        body: Box("Statement"),
    }),

    ForOfStatement: Node({
        await: Option("Span"),
        left: Enum(["VariableDeclaration", "Pattern"]),
        right: Box("Expression"),
        body: Box("Statement"),
    }),

    ExpressionStatement: Node({ expression: Box("Expression") }),
};

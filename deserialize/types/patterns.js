"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    Pattern: Enum([
        "BindingIdentifier",
        "ArrayPattern",
        "RestElement",
        "ObjectPattern",
        "AssignmentPattern",
        "Invalid",
        Box("Expression"),
    ]),

    BindingIdentifier: Node(
        {
            value: "JsWord",
            optional: "Boolean", // TODO Needs tests
            typeAnnotation: Option("TsTypeAnnotation"),
        },
        { nodeName: "Identifier" }
    ),

    ArrayPattern: Node({
        elements: Vec(Option("Pattern")),
        optional: "Boolean", // TODO Needs tests
        typeAnnotation: Option("TsTypeAnnotation"),
    }),

    RestElement: Node({
        rest: "Span",
        argument: Box("Pattern"),
        typeAnnotation: Option("TsTypeAnnotation"),
    }),

    ObjectPattern: Node({
        properties: Vec("ObjectPatternProperty"),
        optional: "Boolean", // TODO Needs tests
        typeAnnotation: Option("TsTypeAnnotation"),
    }),
    ObjectPatternProperty: Enum([
        "KeyValuePatternProperty",
        "AssignmentPatternProperty",
        "RestElement",
    ]),
    KeyValuePatternProperty: Node(
        { key: "PropertyName", value: Box("Pattern") },
        { noSpan: true }
    ),
    AssignmentPatternProperty: Node({
        key: "Identifier",
        value: Option(Box("Expression")),
    }),

    AssignmentPattern: Node({
        left: Box("Pattern"),
        right: Box("Expression"),
        typeAnnotation: Option("TsTypeAnnotation"),
    }),
};

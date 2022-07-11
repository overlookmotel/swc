"use strict";

// Imports
const { Node, Enum, Option, Box, Vec } = require("../kinds/index.js");

// Exports

const PatternNode = (props, options) =>
    Node(props, { inheritFrom: "PatternBase", ...options });

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

    PatternBase: Node(
        { typeAnnotation: Option("TsTypeAnnotation") },
        {
            generateDeserializer() {},
            generateSerializer() {},
            noType: true,
            tsExtends: ["Node", "HasSpan"],
            tsNoExport: true,
        }
    ),

    BindingIdentifier: PatternNode(
        {
            value: "JsWord",
            optional: "Boolean", // TODO Needs tests
        },
        { nodeName: "Identifier", tsName: "BindingIdentifier" }
    ),

    ArrayPattern: PatternNode({
        elements: Vec(Option("Pattern")),
        optional: "Boolean", // TODO Needs tests
    }),

    RestElement: PatternNode({
        rest: "Span",
        argument: Box("Pattern"),
    }),

    ObjectPattern: PatternNode({
        properties: Vec("ObjectPatternProperty"),
        optional: "Boolean", // TODO Needs tests
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

    AssignmentPattern: PatternNode({
        left: Box("Pattern"),
        right: Box("Expression"),
    }),
};

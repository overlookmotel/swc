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
    // Classes
    Class: Node(
        {
            decorators: Vec("Decorator"),
            body: Vec("ClassMember"),
            superClass: Option(Box("Expression")),
            isAbstract: "Boolean", // TODO Needs tests
            typeParams: Option("TsTypeParameterDeclaration"),
            superTypeParams: Option("TsTypeParameterInstantiation"),
            implements: Vec("TsExpressionWithTypeArguments"),
        },
        {
            generateDeserializer() {},
            generateSerializer() {},
            noType: true,
            tsExtends: ["HasSpan", "HasDecorator"],
        }
    ),

    ClassDeclaration: Node(
        {
            identifier: "Identifier",
            declare: "Boolean", // TODO Needs tests
        },
        {
            inheritFrom: "Class",
            tsExtends: ["Class", "Node"],
        }
    ),

    ClassExpression: Node(
        { identifier: Option("Identifier") },
        {
            inheritFrom: "Class",
            tsExtends: ["Class", "ExpressionBase"],
        }
    ),

    // Class members
    ClassMember: Enum([
        "Constructor",
        "ClassMethod",
        "PrivateMethod",
        "ClassProperty",
        "PrivateProperty",
        "TsIndexSignature",
        "EmptyStatement",
        "StaticBlock",
    ]),

    Constructor: Node({
        key: "PropertyName",
        params: Vec(Enum(["TsParameterProperty", "Parameter"])),
        body: Option("BlockStatement"),
        accessibility: Option("Accessibility"), // TODO Needs tests
        isOptional: "Boolean", // TODO Needs tests
    }),

    ClassMethodBase: Node(
        {
            function: "Fn",
            kind: "MethodKind",
            isStatic: "Boolean",
            accessibility: Option("Accessibility"), // TODO Needs tests
            isAbstract: "Boolean", // TODO Needs tests
            isOptional: "Boolean", // TODO Needs tests
            isOverride: "Boolean", // TODO Needs tests
        },
        {
            generateDeserializer() {},
            generateSerializer() {},
            noType: true,
            tsExtends: ["Node", "HasSpan"],
        }
    ),

    ClassMethod: Node(
        { key: "PropertyName" },
        { inheritFrom: "ClassMethodBase" }
    ),

    PrivateMethod: Node(
        { key: "PrivateName" },
        { inheritFrom: "ClassMethodBase" }
    ),

    ClassPropertyBase: Node(
        {
            value: Option(Box("Expression")),
            typeAnnotation: Option("TsTypeAnnotation"),
            isStatic: "Boolean",
            decorators: Vec("Decorator"),
            accessibility: Option("Accessibility"), // TODO Needs tests
            isOptional: "Boolean", // TODO Needs tests
            isOverride: "Boolean", // TODO Needs tests
            readonly: "Boolean", // TODO Needs tests
            definite: "Boolean", // TODO Needs tests
        },
        {
            generateDeserializer() {},
            generateSerializer() {},
            noType: true,
            tsExtends: ["Node", "HasSpan", "HasDecorator"],
        }
    ),

    ClassProperty: Node(
        {
            // The `null` properties are inherited from `ClassPropertyBase`
            // but need to define them to keep them in correct order
            key: "PropertyName",
            value: null,
            typeAnnotation: null,
            isStatic: null,
            decorators: null,
            accessibility: null,
            isAbstract: "Boolean", // TODO Needs tests
            isOptional: null,
            isOverride: null,
            readonly: null,
            declare: "Boolean", // TODO Needs tests
            definite: null,
        },
        { inheritFrom: "ClassPropertyBase" }
    ),

    PrivateProperty: Node(
        { key: "PrivateName" },
        { inheritFrom: "ClassPropertyBase" }
    ),

    StaticBlock: Node({ body: "BlockStatement" }),

    // Methods
    MethodKind: EnumValue(["method", "getter", "setter"]),
};

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
    ClassDeclaration: Node({
        identifier: "Identifier",
        declare: "Boolean", // TODO Needs tests
        span: "Span",
        decorators: Vec("Decorator"),
        body: Vec("ClassMember"),
        superClass: Option(Box("Expression")),
        isAbstract: "Boolean", // TODO Needs tests
        typeParams: Option("TsTypeParameterDeclaration"),
        superTypeParams: Option("TsTypeParameterInstantiation"),
        implements: Vec("TsExpressionWithTypeArguments"),
    }),

    ClassExpression: Node({
        // Same as `ClassDeclaration` but minus `declare` property, and `identifier` is optional
        identifier: Option("Identifier"),
        span: "Span",
        decorators: Vec("Decorator"),
        body: Vec("ClassMember"),
        superClass: Option(Box("Expression")),
        isAbstract: "Boolean", // TODO Needs tests
        typeParams: Option("TsTypeParameterDeclaration"),
        superTypeParams: Option("TsTypeParameterInstantiation"),
        implements: Vec("TsExpressionWithTypeArguments"),
    }),

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

    ClassMethod: Node({
        key: "PropertyName",
        function: "Function",
        kind: "MethodKind",
        isStatic: "Boolean",
        accessibility: Option("Accessibility"), // TODO Needs tests
        isAbstract: "Boolean", // TODO Needs tests
        isOptional: "Boolean", // TODO Needs tests
        isOverride: "Boolean", // TODO Needs tests
    }),

    PrivateMethod: Node({
        key: "PrivateName",
        function: "Function",
        kind: "MethodKind",
        isStatic: "Boolean",
        accessibility: Option("Accessibility"), // TODO Needs tests
        isAbstract: "Boolean", // TODO Needs tests
        isOptional: "Boolean", // TODO Needs tests
        isOverride: "Boolean", // TODO Needs tests
    }),

    ClassProperty: Node({
        key: "PropertyName",
        value: Option(Box("Expression")),
        typeAnnotation: Option("TsTypeAnnotation"),
        isStatic: "Boolean",
        decorators: Vec("Decorator"),
        accessibility: Option("Accessibility"), // TODO Needs tests
        isAbstract: "Boolean", // TODO Needs tests
        isOptional: "Boolean", // TODO Needs tests
        isOverride: "Boolean", // TODO Needs tests
        readonly: "Boolean", // TODO Needs tests
        declare: "Boolean", // TODO Needs tests
        definite: "Boolean", // TODO Needs tests
    }),

    PrivateProperty: Node({
        key: "PrivateName",
        value: Option(Box("Expression")),
        typeAnnotation: Option("TsTypeAnnotation"),
        isStatic: "Boolean",
        decorators: Vec("Decorator"),
        accessibility: Option("Accessibility"), // TODO Needs tests
        isOptional: "Boolean", // TODO Needs tests
        isOverride: "Boolean", // TODO Needs tests
        readonly: "Boolean", // TODO Needs tests
        definite: "Boolean", // TODO Needs tests
    }),

    StaticBlock: Node({ body: "BlockStatement" }),

    // Methods
    MethodKind: EnumValue(["method", "getter", "setter"]),

    Function: Node(
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
};

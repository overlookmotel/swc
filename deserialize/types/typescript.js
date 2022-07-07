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
    TsTypeAssertion: Node({}), // TODO
    TsConstAssertion: Node({}), // TODO
    TsNonNullExpression: Node({}), // TODO
    TsAsExpression: Node({}), // TODO
    TsInstantiation: Node({}), // TODO
    TsTypeAnnotation: Node({ typeAnnotation: Box("TsType") }), // TODO Needs tests
    TsInterfaceDeclaration: Node({}), // TODO
    TsTypeAliasDeclaration: Node({}), // TODO
    TsEnumDeclaration: Node({}), // TODO
    TsModuleDeclaration: Node({}), // TODO
    TsImportEqualsDeclaration: Node({}), // TODO
    TsExportAssignment: Node({}), // TODO
    TsNamespaceExportDeclaration: Node({}), // TODO
    TsTypeParamDeclaration: Node({ parameters: Vec("TsTypeParameter") }),
    TsTypeParameterInstantiation: Node({ params: Vec(Box("TsType")) }),
    TsExpressionWithTypeArg: Node({}), // TODO
    TsIndexSignature: Node({}), // TODO
    TsParamProp: Node({
        // TODO Needs tests
        decorators: Vec("Decorator"),
        accessibility: Option("Accessibility"),
        override: "Boolean",
        readonly: "Boolean",
        param: "TsParamPropParam",
    }),
    TsParamPropParam: Enum(["BindingIdentifier", "AssignmentPattern"]), // TODO Needs tests

    TsTypeParameterDeclaration: Node({ parameters: Vec("TsTypeParameter") }),
    TsTypeParameterInstantiation: Node({ params: Vec(Box("TsType")) }),
    TsTypeParameter: Node({}), // TODO

    TsType: Node({}), // TODO

    Accessibility: EnumValue(["public", "protected", "private"]), // TODO Needs tests
};

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
    TsTypeAnnotation: Node({ typeAnnotation: Box("TsType") }), // TODO Needs tests
    TsTypeParameterDeclaration: Node({ parameters: Vec("TsTypeParameter") }), // TODO Needs tests
    TsTypeParameter: Node({
        // TODO Needs tests
        name: "Identifier",
        in: "Boolean",
        out: "Boolean",
        constraint: Option(Box("TsType")),
        default: Option(Box("TsType")),
    }),
    TsTypeParameterInstantiation: Node({ params: Vec(Box("TsType")) }), // TODO Needs tests
    TsParameterProperty: Node({
        // TODO Needs tests
        decorators: Vec("Decorator"),
        accessibility: Option("Accessibility"),
        override: "Boolean",
        readonly: "Boolean",
        param: "TsParamPropParam",
    }),
    TsParamPropParam: Enum(["BindingIdentifier", "AssignmentPattern"]), // TODO Needs tests

    TsQualifiedName: Node(
        // TODO Needs tests
        { left: "TsEntityName", right: "Identifier" },
        { noSpan: true }
    ),
    TsEntityName: Enum([Box("TsQualifiedName"), "Identifier"]), // TODO Needs tests

    /*
     * TypeScript type members (for type literal / interface / class)
     */
    TsTypeElement: Enum([
        // TODO Needs tests
        "TsCallSignatureDeclaration",
        "TsConstructSignatureDeclaration",
        "TsPropertySignature",
        "TsGetterSignature",
        "TsSetterSignature",
        "TsMethodSignature",
        "TsIndexSignature",
    ]),
    TsCallSignatureDeclaration: Node({
        // TODO Needs tests
        params: Vec("TsFnParam"),
        typeAnnotation: Option("TsTypeAnnotation"),
        typeParams: Option("TsTypeParameterDeclaration"),
    }),
    TsConstructSignatureDeclaration: Node({
        // TODO Needs tests
        params: Vec("TsFnParam"),
        typeAnnotation: Option("TsTypeAnnotation"),
        typeParams: Option("TsTypeParameterDeclaration"),
    }),
    TsPropertySignature: Node({
        // TODO Needs tests
        readonly: "Boolean",
        key: Box("Expression"),
        computed: "Boolean",
        optional: "Boolean",
        init: Option(Box("Expression")),
        params: Vec("TsFnParam"),
        typeAnnotation: Option("TsTypeAnnotation"),
        typeParams: Option("TsTypeParameterDeclaration"),
    }),
    TsGetterSignature: Node({
        // TODO Needs tests
        readonly: "Boolean",
        key: Box("Expression"),
        computed: "Boolean",
        optional: "Boolean",
        typeAnnotation: Option("TsTypeAnnotation"),
    }),
    TsSetterSignature: Node({
        // TODO Needs tests
        readonly: "Boolean",
        key: Box("Expression"),
        computed: "Boolean",
        optional: "Boolean",
        param: "TsFnParam",
    }),
    TsMethodSignature: Node({
        // TODO Needs tests
        readonly: "Boolean",
        key: Box("Expression"),
        computed: "Boolean",
        optional: "Boolean",
        params: Vec("TsFnParam"),
        typeAnn: Option("TsTypeAnnotation"),
        typeParams: Option("TsTypeParameterDeclaration"),
    }),
    TsIndexSignature: Node({
        // TODO Needs tests
        params: Vec("TsFnParam"),
        typeAnnotation: Option("TsTypeAnnotation"),
        readonly: "Boolean",
        static: "Boolean",
        span: "Span",
    }),

    /*
     * TypeScript types
     */
    TsType: Enum([
        // TODO Needs tests
        "TsKeywordType",
        "TsThisType",
        "TsFnOrConstructorType",
        "TsTypeReference",
        "TsTypeQuery",
        "TsTypeLiteral",
        "TsArrayType",
        "TsTupleType",
        "TsOptionalType",
        "TsRestType",
        "TsUnionOrIntersectionType",
        "TsConditionalType",
        "TsInferType",
        "TsParenthesizedType",
        "TsTypeOperator",
        "TsIndexedAccessType",
        "TsMappedType",
        "TsLiteralType",
        "TsTypePredicate",
        "TsImportType",
    ]),
    TsFnOrConstructorType: Enum(["TsFunctionType", "TsConstructorType"]), // TODO Needs tests
    TsKeywordType: Node({ kind: "TsKeywordTypeKind" }), // TODO Needs tests
    TsKeywordTypeKind: EnumValue([
        // TODO Needs tests
        "any",
        "unknown",
        "number",
        "object",
        "boolean",
        "bigint",
        "string",
        "symbol",
        "void",
        "undefined",
        "null",
        "never",
        "intrinsic",
    ]),
    TsThisType: Node({}), // TODO Needs tests
    TsFnParam: Enum([
        // TODO Needs tests
        "BindingIdentifier",
        "ArrayPattern",
        "RestElement",
        "ObjectPattern",
    ]),
    TsFunctionType: Node({
        // TODO Needs tests
        params: Vec("TsFnParam"),
        typeParams: Option("TsTypeParameterDeclaration"),
        typeAnnotation: "TsTypeAnnotation",
    }),
    TsConstructorType: Node({
        // TODO Needs tests
        params: Vec("TsFnParam"),
        typeParams: Option("TsTypeParameterDeclaration"),
        typeAnnotation: "TsTypeAnnotation",
        isAbstract: "Boolean",
    }),
    TsTypeReference: Node({
        // TODO Needs tests
        typeName: "TsEntityName",
        typeParams: Option("TsTypeParameterInstantiation"),
    }),
    TsTypePredicate: Node({
        // TODO Needs tests
        asserts: "Boolean",
        paramName: "TsThisTypeOrIdent",
        typeAnnotation: Option("TsTypeAnnotation"),
    }),
    TsThisTypeOrIdent: Enum(["TsThisType", "Identifier"]), // TODO Needs tests
    TsTypeQuery: Node({
        // TODO Needs tests
        exprName: "TsTypeQueryExpr",
        typeArguments: Option("TsTypeParameterInstantiation"),
    }),
    TsTypeQueryExpr: Enum(["TsEntityName", "TsImportType"]), // TODO Needs tests
    TsImportType: Node({
        // TODO Needs tests
        argument: "StringLiteral",
        qualifier: Option("TsEntityName"),
        typeArguments: Option("TsTypeParameterInstantiation"),
    }),
    TsTypeLiteral: Node({ members: Vec("TsTypeElement") }), // TODO Needs tests
    TsArrayType: Node({ elemType: Box("TsType") }), // TODO Needs tests
    TsTupleType: Node({ elemTypes: Vec("TsTupleElement") }), // TODO Needs tests
    TsTupleElement: Node({ label: Option("Pattern"), ty: "TsType" }), // TODO Needs tests
    TsOptionalType: Node({ typeAnnotation: Box("TsType") }), // TODO Needs tests
    TsRestType: Node({ typeAnnotation: Box("TsType") }), // TODO Needs tests
    TsUnionOrIntersectionType: Enum(["TsUnionType", "TsIntersectionType"]), // TODO Needs tests
    TsUnionType: Node({ types: Vec(Box("TsType")) }), // TODO Needs tests
    TsIntersectionType: Node({ types: Vec(Box("TsType")) }), // TODO Needs tests
    TsConditionalType: Node({
        // TODO Needs tests
        checkType: Box("TsType"),
        extendsType: Box("TsType"),
        trueType: Box("TsType"),
        falseType: Box("TsType"),
    }),
    TsInferType: Node({ typeParam: "TsTypeParameter" }), // TODO Needs tests
    TsParenthesizedType: Node({ typeAnnotation: Box("TsType") }), // TODO Needs tests
    TsTypeOperator: Node({
        // TODO Needs tests
        op: "TsTypeOperatorOp",
        typeAnnotation: Box("TsType"),
    }),
    TsTypeOperatorOp: EnumValue(["keyof", "unique", "readonly"]), // TODO Needs tests
    TsIndexedAccessType: Node({
        // TODO Needs tests
        readonly: "Boolean",
        objectType: Box("TsType"),
        indexType: Box("TsType"),
    }),
    TruePlusMinus: EnumValue(
        // TODO Needs tests
        [true, "+", "-"],
        {
            generateSerializer() {
                // Add case for string value "true"
                return EnumValue.prototype.generateSerializer
                    .call(this)
                    .replace("case true:", 'case true:\ncase "true":');
            },
        }
    ),
    TsMappedType: Node({
        // TODO Needs tests
        readonly: Option("TruePlusMinus"),
        typeParam: "TsTypeParameter",
        nameType: Option(Box("TsType")),
        optional: Option("TruePlusMinus"),
        typeAnnotation: Option(Box("TsType")),
    }),
    TsLiteralType: Node({ literal: "TsLit" }), // TODO Needs tests
    TsLit: Enum([
        // TODO Needs tests
        "NumericLiteral",
        "StringLiteral",
        "BooleanLiteral",
        "BigIntLiteral",
        "TsTemplateLiteralType",
    ]),
    TsTemplateLiteralType: Node(
        // TODO Needs tests
        { types: Vec(Box("TsType")), quasis: Vec("TemplateElement") },
        { nodeName: "TemplateLiteral" }
    ),

    /*
     * TypeScript declarations
     */
    TsInterfaceDeclaration: Node({
        // TODO Needs tests
        id: "Identifier",
        declare: "Boolean",
        typeParams: Option("TsTypeParameterDeclaration"),
        extends: Vec("TsExpressionWithTypeArguments"),
        body: "TsInterfaceBody",
    }),
    TsInterfaceBody: Node({ body: Vec("TsTypeElement") }), // TODO Needs tests
    TsExpressionWithTypeArguments: Node({
        // TODO Needs tests
        expression: Box("Expression"),
        typeArguments: Option("TsTypeParameterInstantiation"),
    }),
    TsTypeAliasDeclaration: Node({
        // TODO Needs tests
        declare: "Boolean",
        id: "Identifier",
        typeParams: Option("TsTypeParameterDeclaration"),
        typeAnnotation: Box("TsType"),
    }),
    TsEnumDeclaration: Node({
        // TODO Needs tests
        declare: "Boolean",
        isConst: "Boolean",
        id: "Identifier",
        members: Vec("TsEnumMember"),
    }),
    TsEnumMember: Node({
        // TODO Needs tests
        id: "TsEnumMemberId",
        init: Option(Box("Expression")),
    }),
    TsEnumMemberId: Enum(["Identifier", "StringLiteral"]), // TODO Needs tests
    TsModuleDeclaration: Node({
        // TODO Needs tests
        declare: "Boolean",
        global: "Boolean",
        id: "TsModuleName",
        body: Option("TsNamespaceBody"),
    }),
    TsNamespaceBody: Enum(["TsModuleBlock", "TsNamespaceDeclaration"]), // TODO Needs tests
    TsModuleBlock: Node({ body: Vec("ModuleItem") }), // TODO Needs tests
    TsNamespaceDeclaration: Node({
        // TODO Needs tests
        declare: "Boolean",
        global: "Boolean",
        id: "Identifier",
        body: Box("TsNamespaceBody"),
    }),
    TsModuleName: Enum(["Identifier", "StringLiteral"]), // TODO Needs tests
    TsImportEqualsDeclaration: Node({
        // TODO Needs tests
        declare: "Boolean",
        isExport: "Boolean",
        isTypeOnly: "Boolean",
        id: "Identifier",
        moduleRef: "TsModuleRef",
    }),
    TsModuleRef: Enum(["TsEntityName", "TsExternalModuleReference"]), // TODO Needs tests
    TsExternalModuleReference: Node({ expression: "StringLiteral" }), // TODO Needs tests
    TsExportAssignment: Node({ expression: Box("Expression") }), // TODO Needs tests
    TsNamespaceExportDeclaration: Node({ id: "Identifier" }), // TODO Needs tests

    /*
     * TypeScript exprs
     */
    // TODO Needs tests
    TsAsExpression: Node({
        // TODO Needs tests
        expression: Box("Expression"),
        typeAnnotation: Box("TsType"),
    }),
    TsTypeAssertion: Node({
        // TODO Needs tests
        expression: Box("Expression"),
        typeAnnotation: Box("TsType"),
    }),
    TsNonNullExpression: Node({ expression: Box("Expression") }), // TODO Needs tests
    Accessibility: EnumValue(["public", "protected", "private"]), // TODO Needs tests
    TsConstAssertion: Node({ expression: Box("Expression") }), // TODO Needs tests
    TsInstantiation: Node({
        // TODO Needs tests
        expression: Box("Expression"),
        typeArguments: "TsTypeParameterInstantiation",
    }),
};

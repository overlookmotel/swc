// Generated code. Do not edit.

"use strict";

module.exports = serialize;

let buffPos, buffLen, buff, uint32, float64;

resetBuffer();

function serializeProgram(node, pos) {
    switch (node.type) {
        case "Module":
            serializeEnum(node, pos, 0, serializeModule, 4);
            break;
        case "Script":
            serializeEnum(node, pos, 1, serializeScript, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for Program");
    }
}

function serializeModule(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecModuleItem(node.body, pos + 12);
    serializeOptionJsWord(node.interpreter, pos + 20);
}

function serializeScript(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecStatement(node.body, pos + 12);
    serializeOptionJsWord(node.interpreter, pos + 20);
}

function serializeModuleItem(node, pos) {
    switch (node.type) {
        case "ImportDeclaration":
        case "ExportDeclaration":
        case "ExportNamedDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportDefaultExpression":
        case "ExportAllDeclaration":
        case "TsImportEqualsDeclaration":
        case "TsExportAssignment":
        case "TsNamespaceExportDeclaration":
            serializeEnum(node, pos, 0, serializeModuleDeclaration, 4);
            break;
        case "BlockStatement":
        case "EmptyStatement":
        case "DebuggerStatement":
        case "WithStatement":
        case "ReturnStatement":
        case "LabeledStatement":
        case "BreakStatement":
        case "ContinueStatement":
        case "IfStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "TryStatement":
        case "WhileStatement":
        case "DoWhileStatement":
        case "ForStatement":
        case "ForInStatement":
        case "ForOfStatement":
        case "ClassDeclaration":
        case "FunctionDeclaration":
        case "VariableDeclaration":
        case "TsInterfaceDeclaration":
        case "TsTypeAliasDeclaration":
        case "TsEnumDeclaration":
        case "TsModuleDeclaration":
        case "ExpressionStatement":
            serializeEnum(node, pos, 1, serializeStatement, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for ModuleItem");
    }
}

function serializeModuleDeclaration(node, pos) {
    switch (node.type) {
        case "ImportDeclaration":
            serializeEnum(node, pos, 0, serializeImportDeclaration, 4);
            break;
        case "ExportDeclaration":
            serializeEnum(node, pos, 1, serializeExportDeclaration, 4);
            break;
        case "ExportNamedDeclaration":
            serializeEnum(node, pos, 2, serializeExportNamedDeclaration, 4);
            break;
        case "ExportDefaultDeclaration":
            serializeEnum(node, pos, 3, serializeExportDefaultDeclaration, 4);
            break;
        case "ExportDefaultExpression":
            serializeEnum(node, pos, 4, serializeExportDefaultExpression, 4);
            break;
        case "ExportAllDeclaration":
            serializeEnum(node, pos, 5, serializeExportAllDeclaration, 4);
            break;
        case "TsImportEqualsDeclaration":
            serializeEnum(node, pos, 6, serializeTsImportEqualsDeclaration, 4);
            break;
        case "TsExportAssignment":
            serializeEnum(node, pos, 7, serializeTsExportAssignment, 4);
            break;
        case "TsNamespaceExportDeclaration":
            serializeEnum(
                node,
                pos,
                8,
                serializeTsNamespaceExportDeclaration,
                4
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for ModuleDeclaration"
            );
    }
}

function serializeImportDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecImportSpecifier(node.specifiers, pos + 12);
    serializeStringLiteral(node.source, pos + 20);
    serializeBoolean(node.typeOnly, pos + 52);
    serializeOptionObjectExpression(node.asserts, pos + 56);
}

function serializeImportSpecifier(node, pos) {
    switch (node.type) {
        case "ImportSpecifier":
            serializeEnum(node, pos, 0, serializeImportNamedSpecifier, 4);
            break;
        case "ImportDefaultSpecifier":
            serializeEnum(node, pos, 1, serializeImportDefaultSpecifier, 4);
            break;
        case "ImportNamespaceSpecifier":
            serializeEnum(node, pos, 2, serializeImportNamespaceSpecifier, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for ImportSpecifier");
    }
}

function serializeImportNamedSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.local, pos + 12);
    serializeOptionTsModuleName(node.imported, pos + 36);
    serializeBoolean(node.isTypeOnly, pos + 76);
}

function serializeImportDefaultSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.local, pos + 12);
}

function serializeImportNamespaceSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.local, pos + 12);
}

function serializeExportDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeDeclaration(node.declaration, pos + 12);
}

function serializeExportNamedDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecExportSpecifier(node.specifiers, pos + 12);
    serializeOptionStringLiteral(node.source, pos + 20);
    serializeBoolean(node.typeOnly, pos + 56);
    serializeOptionObjectExpression(node.asserts, pos + 60);
}

function serializeExportSpecifier(node, pos) {
    switch (node.type) {
        case "ExportNamespaceSpecifier":
            serializeEnum(node, pos, 0, serializeExportNamespaceSpecifier, 4);
            break;
        case "ExportDefaultSpecifier":
            serializeEnum(node, pos, 1, serializeExportDefaultSpecifier, 4);
            break;
        case "ExportSpecifier":
            serializeEnum(node, pos, 2, serializeExportNamedSpecifier, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for ExportSpecifier");
    }
}

function serializeExportNamespaceSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsModuleName(node.name, pos + 12);
}

function serializeExportDefaultSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.exported, pos + 12);
}

function serializeExportNamedSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsModuleName(node.orig, pos + 12);
    serializeOptionTsModuleName(node.exported, pos + 48);
    serializeBoolean(node.isTypeOnly, pos + 88);
}

function serializeExportDefaultDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(
        node.decl,
        pos + 12
    );
}

function serializeExportDefaultExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeExportAllDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeStringLiteral(node.source, pos + 12);
    serializeOptionObjectExpression(node.asserts, pos + 44);
}

function serializeTsModuleName(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "StringLiteral":
            serializeEnum(node, pos, 1, serializeStringLiteral, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
}

function serializeStatement(node, pos) {
    switch (node.type) {
        case "BlockStatement":
            serializeEnum(node, pos, 0, serializeBlockStatement, 4);
            break;
        case "EmptyStatement":
            serializeEnum(node, pos, 1, serializeEmptyStatement, 4);
            break;
        case "DebuggerStatement":
            serializeEnum(node, pos, 2, serializeDebuggerStatement, 4);
            break;
        case "WithStatement":
            serializeEnum(node, pos, 3, serializeWithStatement, 4);
            break;
        case "ReturnStatement":
            serializeEnum(node, pos, 4, serializeReturnStatement, 4);
            break;
        case "LabeledStatement":
            serializeEnum(node, pos, 5, serializeLabeledStatement, 4);
            break;
        case "BreakStatement":
            serializeEnum(node, pos, 6, serializeBreakStatement, 4);
            break;
        case "ContinueStatement":
            serializeEnum(node, pos, 7, serializeContinueStatement, 4);
            break;
        case "IfStatement":
            serializeEnum(node, pos, 8, serializeIfStatement, 4);
            break;
        case "SwitchStatement":
            serializeEnum(node, pos, 9, serializeSwitchStatement, 4);
            break;
        case "ThrowStatement":
            serializeEnum(node, pos, 10, serializeThrowStatement, 4);
            break;
        case "TryStatement":
            serializeEnum(node, pos, 11, serializeTryStatement, 4);
            break;
        case "WhileStatement":
            serializeEnum(node, pos, 12, serializeWhileStatement, 4);
            break;
        case "DoWhileStatement":
            serializeEnum(node, pos, 13, serializeDoWhileStatement, 4);
            break;
        case "ForStatement":
            serializeEnum(node, pos, 14, serializeForStatement, 4);
            break;
        case "ForInStatement":
            serializeEnum(node, pos, 15, serializeForInStatement, 4);
            break;
        case "ForOfStatement":
            serializeEnum(node, pos, 16, serializeForOfStatement, 4);
            break;
        case "ClassDeclaration":
        case "FunctionDeclaration":
        case "VariableDeclaration":
        case "TsInterfaceDeclaration":
        case "TsTypeAliasDeclaration":
        case "TsEnumDeclaration":
        case "TsModuleDeclaration":
            serializeEnum(node, pos, 17, serializeDeclaration, 4);
            break;
        case "ExpressionStatement":
            serializeEnum(node, pos, 18, serializeExpressionStatement, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for Statement");
    }
}

function serializeBlockStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecStatement(node.stmts, pos + 12);
}

function serializeEmptyStatement(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeDebuggerStatement(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeWithStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.object, pos + 12);
    serializeBoxStatement(node.body, pos + 16);
}

function serializeReturnStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionBoxExpression(node.argument, pos + 12);
}

function serializeLabeledStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.label, pos + 12);
    serializeBoxStatement(node.body, pos + 36);
}

function serializeBreakStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionIdentifier(node.label, pos + 12);
}

function serializeContinueStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionIdentifier(node.label, pos + 12);
}

function serializeIfStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.test, pos + 12);
    serializeBoxStatement(node.consequent, pos + 16);
    serializeOptionBoxStatement(node.alternate, pos + 20);
}

function serializeSwitchStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.discriminant, pos + 12);
    serializeVecSwitchCase(node.cases, pos + 16);
}

function serializeSwitchCase(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionBoxExpression(node.test, pos + 12);
    serializeVecStatement(node.consequent, pos + 20);
}

function serializeThrowStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.argument, pos + 12);
}

function serializeTryStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBlockStatement(node.block, pos + 12);
    serializeOptionCatchClause(node.handler, pos + 32);
    serializeOptionBlockStatement(node.finalizer, pos + 124);
}

function serializeCatchClause(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionPattern(node.param, pos + 12);
    serializeBlockStatement(node.body, pos + 68);
}

function serializeWhileStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.test, pos + 12);
    serializeBoxStatement(node.body, pos + 16);
}

function serializeDoWhileStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.test, pos + 12);
    serializeBoxStatement(node.body, pos + 16);
}

function serializeForStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionVariableDeclarationOrBoxExpression(node.init, pos + 12);
    serializeOptionBoxExpression(node.test, pos + 48);
    serializeOptionBoxExpression(node.update, pos + 56);
    serializeBoxStatement(node.body, pos + 64);
}

function serializeForInStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeVariableDeclarationOrPattern(node.left, pos + 12);
    serializeBoxExpression(node.right, pos + 68);
    serializeBoxStatement(node.body, pos + 72);
}

function serializeForOfStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionSpan(node.await, pos + 12);
    serializeVariableDeclarationOrPattern(node.left, pos + 28);
    serializeBoxExpression(node.right, pos + 84);
    serializeBoxStatement(node.body, pos + 88);
}

function serializeExpressionStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeDeclaration(node, pos) {
    switch (node.type) {
        case "ClassDeclaration":
            serializeEnum(node, pos, 0, serializeClassDeclaration, 4);
            break;
        case "FunctionDeclaration":
            serializeEnum(node, pos, 1, serializeFunctionDeclaration, 4);
            break;
        case "VariableDeclaration":
            serializeEnum(node, pos, 2, serializeVariableDeclaration, 4);
            break;
        case "TsInterfaceDeclaration":
            serializeEnum(node, pos, 3, serializeTsInterfaceDeclaration, 4);
            break;
        case "TsTypeAliasDeclaration":
            serializeEnum(node, pos, 4, serializeTsTypeAliasDeclaration, 4);
            break;
        case "TsEnumDeclaration":
            serializeEnum(node, pos, 5, serializeTsEnumDeclaration, 4);
            break;
        case "TsModuleDeclaration":
            serializeEnum(node, pos, 6, serializeTsModuleDeclaration, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for Declaration");
    }
}

function serializeVariableDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVariableDeclarationKind(node.kind, pos + 12);
    serializeBoolean(node.declare, pos + 16);
    serializeVecVariableDeclarator(node.declarations, pos + 20);
}

function serializeVariableDeclarationKind(value, pos) {
    switch (value) {
        case "var":
            uint32[pos >>> 2] = 0;
            break;
        case "let":
            uint32[pos >>> 2] = 1;
            break;
        case "const":
            uint32[pos >>> 2] = 2;
            break;
        default:
            throw new Error(
                "Unexpected enum value for VariableDeclarationKind"
            );
    }
}

function serializeVariableDeclarator(node, pos) {
    serializeSpan(node.span, pos);
    serializePattern(node.id, pos + 12);
    serializeOptionBoxExpression(node.init, pos + 64);
    serializeBoolean(node.definite, pos + 72);
}

function serializeFunctionDeclaration(node, pos) {
    serializeIdentifier(node.identifier, pos);
    serializeBoolean(node.declare, pos + 24);
    serializeVecParameter(node.params, pos + 28);
    serializeVecDecorator(node.decorators, pos + 36);
    serializeSpan(node.span, pos + 44);
    serializeOptionBlockStatement(node.body, pos + 56);
    serializeBoolean(node.generator, pos + 80);
    serializeBoolean(node.async, pos + 81);
    serializeOptionTsTypeParameterDeclaration(node.typeParameters, pos + 84);
    serializeOptionTsTypeAnnotation(node.returnType, pos + 108);
}

function serializeFunctionExpression(node, pos) {
    serializeOptionIdentifier(node.identifier, pos);
    serializeVecParameter(node.params, pos + 28);
    serializeVecDecorator(node.decorators, pos + 36);
    serializeSpan(node.span, pos + 44);
    serializeOptionBlockStatement(node.body, pos + 56);
    serializeBoolean(node.generator, pos + 80);
    serializeBoolean(node.async, pos + 81);
    serializeOptionTsTypeParameterDeclaration(node.typeParameters, pos + 84);
    serializeOptionTsTypeAnnotation(node.returnType, pos + 108);
}

function serializeArrowFunctionExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecPattern(node.params, pos + 12);
    serializeBlockStatementOrBoxExpression(node.body, pos + 20);
    serializeBoolean(node.async, pos + 44);
    serializeBoolean(node.generator, pos + 45);
    serializeOptionTsTypeParameterDeclaration(node.typeParameters, pos + 48);
    serializeOptionTsTypeAnnotation(node.returnType, pos + 72);
}

function serializeParameter(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecDecorator(node.decorators, pos + 12);
    serializePattern(node.pat, pos + 20);
}

function serializeDecorator(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeClassDeclaration(node, pos) {
    serializeIdentifier(node.identifier, pos);
    serializeBoolean(node.declare, pos + 24);
    serializeSpan(node.span, pos + 28);
    serializeVecDecorator(node.decorators, pos + 40);
    serializeVecClassMember(node.body, pos + 48);
    serializeOptionBoxExpression(node.superClass, pos + 56);
    serializeBoolean(node.isAbstract, pos + 64);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 68);
    serializeOptionTsTypeParameterInstantiation(node.superTypeParams, pos + 92);
    serializeVecTsExpressionWithTypeArguments(node.implements, pos + 116);
}

function serializeClassExpression(node, pos) {
    serializeOptionIdentifier(node.identifier, pos);
    serializeSpan(node.span, pos + 28);
    serializeVecDecorator(node.decorators, pos + 40);
    serializeVecClassMember(node.body, pos + 48);
    serializeOptionBoxExpression(node.superClass, pos + 56);
    serializeBoolean(node.isAbstract, pos + 64);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 68);
    serializeOptionTsTypeParameterInstantiation(node.superTypeParams, pos + 92);
    serializeVecTsExpressionWithTypeArguments(node.implements, pos + 116);
}

function serializeClassMember(node, pos) {
    switch (node.type) {
        case "Constructor":
            serializeEnum(node, pos, 0, serializeConstructor, 8);
            break;
        case "ClassMethod":
            serializeEnum(node, pos, 1, serializeClassMethod, 8);
            break;
        case "PrivateMethod":
            serializeEnum(node, pos, 2, serializePrivateMethod, 4);
            break;
        case "ClassProperty":
            serializeEnum(node, pos, 3, serializeClassProperty, 8);
            break;
        case "PrivateProperty":
            serializeEnum(node, pos, 4, serializePrivateProperty, 4);
            break;
        case "TsIndexSignature":
            serializeEnum(node, pos, 5, serializeTsIndexSignature, 4);
            break;
        case "EmptyStatement":
            serializeEnum(node, pos, 6, serializeEmptyStatement, 4);
            break;
        case "StaticBlock":
            serializeEnum(node, pos, 7, serializeStaticBlock, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for ClassMember");
    }
}

function serializeConstructor(node, pos) {
    serializeSpan(node.span, pos);
    serializePropertyName(node.key, pos + 16);
    serializeVecTsParameterPropertyOrParameter(node.params, pos + 64);
    serializeOptionBlockStatement(node.body, pos + 72);
    serializeOptionAccessibility(node.accessibility, pos + 96);
    serializeBoolean(node.isOptional, pos + 104);
}

function serializeClassMethod(node, pos) {
    serializeSpan(node.span, pos);
    serializePropertyName(node.key, pos + 16);
    serializeFunction(node.function, pos + 64);
    serializeMethodKind(node.kind, pos + 164);
    serializeBoolean(node.isStatic, pos + 168);
    serializeOptionAccessibility(node.accessibility, pos + 172);
    serializeBoolean(node.isAbstract, pos + 180);
    serializeBoolean(node.isOptional, pos + 181);
    serializeBoolean(node.isOverride, pos + 182);
}

function serializePrivateMethod(node, pos) {
    serializeSpan(node.span, pos);
    serializePrivateName(node.key, pos + 12);
    serializeFunction(node.function, pos + 48);
    serializeMethodKind(node.kind, pos + 148);
    serializeBoolean(node.isStatic, pos + 152);
    serializeOptionAccessibility(node.accessibility, pos + 156);
    serializeBoolean(node.isAbstract, pos + 164);
    serializeBoolean(node.isOptional, pos + 165);
    serializeBoolean(node.isOverride, pos + 166);
}

function serializeClassProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializePropertyName(node.key, pos + 16);
    serializeOptionBoxExpression(node.value, pos + 64);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 72);
    serializeBoolean(node.isStatic, pos + 92);
    serializeVecDecorator(node.decorators, pos + 96);
    serializeOptionAccessibility(node.accessibility, pos + 104);
    serializeBoolean(node.isAbstract, pos + 112);
    serializeBoolean(node.isOptional, pos + 113);
    serializeBoolean(node.isOverride, pos + 114);
    serializeBoolean(node.readonly, pos + 115);
    serializeBoolean(node.declare, pos + 116);
    serializeBoolean(node.definite, pos + 117);
}

function serializePrivateProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializePrivateName(node.key, pos + 12);
    serializeOptionBoxExpression(node.value, pos + 48);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 56);
    serializeBoolean(node.isStatic, pos + 76);
    serializeVecDecorator(node.decorators, pos + 80);
    serializeOptionAccessibility(node.accessibility, pos + 88);
    serializeBoolean(node.isOptional, pos + 96);
    serializeBoolean(node.isOverride, pos + 97);
    serializeBoolean(node.readonly, pos + 98);
    serializeBoolean(node.definite, pos + 99);
}

function serializeStaticBlock(node, pos) {
    serializeSpan(node.span, pos);
    serializeBlockStatement(node.body, pos + 12);
}

function serializeMethodKind(value, pos) {
    switch (value) {
        case "method":
            uint32[pos >>> 2] = 0;
            break;
        case "getter":
            uint32[pos >>> 2] = 1;
            break;
        case "setter":
            uint32[pos >>> 2] = 2;
            break;
        default:
            throw new Error("Unexpected enum value for MethodKind");
    }
}

function serializeFunction(node, pos) {
    serializeVecParameter(node.params, pos);
    serializeVecDecorator(node.decorators, pos + 8);
    serializeSpan(node.span, pos + 16);
    serializeOptionBlockStatement(node.body, pos + 28);
    serializeBoolean(node.generator, pos + 52);
    serializeBoolean(node.async, pos + 53);
    serializeOptionTsTypeParameterDeclaration(node.typeParameters, pos + 56);
    serializeOptionTsTypeAnnotation(node.returnType, pos + 80);
}

function serializePattern(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeBindingIdentifier, 4);
            break;
        case "ArrayPattern":
            serializeEnum(node, pos, 1, serializeArrayPattern, 4);
            break;
        case "RestElement":
            serializeEnum(node, pos, 2, serializeRestElement, 4);
            break;
        case "ObjectPattern":
            serializeEnum(node, pos, 3, serializeObjectPattern, 4);
            break;
        case "AssignmentPattern":
            serializeEnum(node, pos, 4, serializeAssignmentPattern, 4);
            break;
        case "Invalid":
            serializeEnum(node, pos, 5, serializeInvalid, 4);
            break;
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXEmptyExpression":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
            serializeEnum(node, pos, 6, serializeBoxExpression, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for Pattern");
    }
}

function serializeBindingIdentifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeJsWord(node.value, pos + 12);
    serializeBoolean(node.optional, pos + 20);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 24);
}

function serializeArrayPattern(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecOptionPattern(node.elements, pos + 12);
    serializeBoolean(node.optional, pos + 20);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 24);
}

function serializeRestElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeSpan(node.rest, pos + 12);
    serializeBoxPattern(node.argument, pos + 24);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 28);
}

function serializeObjectPattern(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecObjectPatternProperty(node.properties, pos + 12);
    serializeBoolean(node.optional, pos + 20);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 24);
}

function serializeObjectPatternProperty(node, pos) {
    switch (node.type) {
        case "KeyValuePatternProperty":
            serializeEnum(node, pos, 0, serializeKeyValuePatternProperty, 8);
            break;
        case "AssignmentPatternProperty":
            serializeEnum(node, pos, 1, serializeAssignmentPatternProperty, 4);
            break;
        case "RestElement":
            serializeEnum(node, pos, 2, serializeRestElement, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for ObjectPatternProperty"
            );
    }
}

function serializeKeyValuePatternProperty(node, pos) {
    serializePropertyName(node.key, pos);
    serializeBoxPattern(node.value, pos + 48);
}

function serializeAssignmentPatternProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.key, pos + 12);
    serializeOptionBoxExpression(node.value, pos + 36);
}

function serializeAssignmentPattern(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxPattern(node.left, pos + 12);
    serializeBoxExpression(node.right, pos + 16);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 20);
}

function serializeExpression(node, pos) {
    switch (node.type) {
        case "ThisExpression":
            serializeEnum(node, pos, 0, serializeThisExpression, 4);
            break;
        case "ArrayExpression":
            serializeEnum(node, pos, 1, serializeArrayExpression, 4);
            break;
        case "ObjectExpression":
            serializeEnum(node, pos, 2, serializeObjectExpression, 4);
            break;
        case "FunctionExpression":
            serializeEnum(node, pos, 3, serializeFunctionExpression, 4);
            break;
        case "UnaryExpression":
            serializeEnum(node, pos, 4, serializeUnaryExpression, 4);
            break;
        case "UpdateExpression":
            serializeEnum(node, pos, 5, serializeUpdateExpression, 4);
            break;
        case "BinaryExpression":
            serializeEnum(node, pos, 6, serializeBinaryExpression, 4);
            break;
        case "AssignmentExpression":
            serializeEnum(node, pos, 7, serializeAssignmentExpression, 4);
            break;
        case "MemberExpression":
            serializeEnum(node, pos, 8, serializeMemberExpression, 4);
            break;
        case "SuperPropExpression":
            serializeEnum(node, pos, 9, serializeSuperPropExpression, 4);
            break;
        case "ConditionalExpression":
            serializeEnum(node, pos, 10, serializeConditionalExpression, 4);
            break;
        case "CallExpression":
            serializeEnum(node, pos, 11, serializeCallExpression, 4);
            break;
        case "NewExpression":
            serializeEnum(node, pos, 12, serializeNewExpression, 4);
            break;
        case "SequenceExpression":
            serializeEnum(node, pos, 13, serializeSequenceExpression, 4);
            break;
        case "Identifier":
            serializeEnum(node, pos, 14, serializeIdentifier, 4);
            break;
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
            serializeEnum(node, pos, 15, serializeLiteral, 8);
            break;
        case "TemplateLiteral":
            serializeEnum(node, pos, 16, serializeTemplateLiteral, 4);
            break;
        case "TaggedTemplateExpression":
            serializeEnum(node, pos, 17, serializeTaggedTemplateExpression, 4);
            break;
        case "ArrowFunctionExpression":
            serializeEnum(node, pos, 18, serializeArrowFunctionExpression, 4);
            break;
        case "ClassExpression":
            serializeEnum(node, pos, 19, serializeClassExpression, 4);
            break;
        case "YieldExpression":
            serializeEnum(node, pos, 20, serializeYieldExpression, 4);
            break;
        case "MetaProperty":
            serializeEnum(node, pos, 21, serializeMetaProperty, 4);
            break;
        case "AwaitExpression":
            serializeEnum(node, pos, 22, serializeAwaitExpression, 4);
            break;
        case "ParenthesisExpression":
            serializeEnum(node, pos, 23, serializeParenthesisExpression, 4);
            break;
        case "JSXMemberExpression":
            serializeEnum(node, pos, 24, serializeJSXMemberExpression, 4);
            break;
        case "JSXNamespacedName":
            serializeEnum(node, pos, 25, serializeJSXNamespacedName, 4);
            break;
        case "JSXEmptyExpression":
            serializeEnum(node, pos, 26, serializeJSXEmptyExpression, 4);
            break;
        case "JSXElement":
            serializeEnum(node, pos, 27, serializeBoxJSXElement, 4);
            break;
        case "JSXFragment":
            serializeEnum(node, pos, 28, serializeJSXFragment, 4);
            break;
        case "TsTypeAssertion":
            serializeEnum(node, pos, 29, serializeTsTypeAssertion, 4);
            break;
        case "TsConstAssertion":
            serializeEnum(node, pos, 30, serializeTsConstAssertion, 4);
            break;
        case "TsNonNullExpression":
            serializeEnum(node, pos, 31, serializeTsNonNullExpression, 4);
            break;
        case "TsAsExpression":
            serializeEnum(node, pos, 32, serializeTsAsExpression, 4);
            break;
        case "TsInstantiation":
            serializeEnum(node, pos, 33, serializeTsInstantiation, 4);
            break;
        case "PrivateName":
            serializeEnum(node, pos, 34, serializePrivateName, 4);
            break;
        case "OptionalChainingExpression":
            serializeEnum(
                node,
                pos,
                35,
                serializeOptionalChainingExpression,
                4
            );
            break;
        case "Invalid":
            serializeEnum(node, pos, 36, serializeInvalid, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for Expression");
    }
}

function serializeThisExpression(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeArrayExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecOptionExpressionOrSpread(node.elements, pos + 12);
}

function serializeUnaryExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeUnaryOperator(node.operator, pos + 12);
    serializeBoxExpression(node.argument, pos + 16);
}

function serializeUnaryOperator(value, pos) {
    switch (value) {
        case "-":
            uint32[pos >>> 2] = 0;
            break;
        case "+":
            uint32[pos >>> 2] = 1;
            break;
        case "!":
            uint32[pos >>> 2] = 2;
            break;
        case "~":
            uint32[pos >>> 2] = 3;
            break;
        case "typeof":
            uint32[pos >>> 2] = 4;
            break;
        case "void":
            uint32[pos >>> 2] = 5;
            break;
        case "delete":
            uint32[pos >>> 2] = 6;
            break;
        default:
            throw new Error("Unexpected enum value for UnaryOperator");
    }
}

function serializeUpdateExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeUpdateOperator(node.operator, pos + 12);
    serializeBoolean(node.prefix, pos + 16);
    serializeBoxExpression(node.argument, pos + 20);
}

function serializeUpdateOperator(value, pos) {
    switch (value) {
        case "++":
            uint32[pos >>> 2] = 0;
            break;
        case "--":
            uint32[pos >>> 2] = 1;
            break;
        default:
            throw new Error("Unexpected enum value for UpdateOperator");
    }
}

function serializeBinaryExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBinaryOperator(node.operator, pos + 12);
    serializeBoxExpression(node.left, pos + 16);
    serializeBoxExpression(node.right, pos + 20);
}

function serializeBinaryOperator(value, pos) {
    switch (value) {
        case "==":
            uint32[pos >>> 2] = 0;
            break;
        case "!=":
            uint32[pos >>> 2] = 1;
            break;
        case "===":
            uint32[pos >>> 2] = 2;
            break;
        case "!==":
            uint32[pos >>> 2] = 3;
            break;
        case "<":
            uint32[pos >>> 2] = 4;
            break;
        case "<=":
            uint32[pos >>> 2] = 5;
            break;
        case ">":
            uint32[pos >>> 2] = 6;
            break;
        case ">=":
            uint32[pos >>> 2] = 7;
            break;
        case "<<":
            uint32[pos >>> 2] = 8;
            break;
        case ">>":
            uint32[pos >>> 2] = 9;
            break;
        case ">>>":
            uint32[pos >>> 2] = 10;
            break;
        case "+":
            uint32[pos >>> 2] = 11;
            break;
        case "-":
            uint32[pos >>> 2] = 12;
            break;
        case "*":
            uint32[pos >>> 2] = 13;
            break;
        case "/":
            uint32[pos >>> 2] = 14;
            break;
        case "%":
            uint32[pos >>> 2] = 15;
            break;
        case "|":
            uint32[pos >>> 2] = 16;
            break;
        case "^":
            uint32[pos >>> 2] = 17;
            break;
        case "&":
            uint32[pos >>> 2] = 18;
            break;
        case "||":
            uint32[pos >>> 2] = 19;
            break;
        case "&&":
            uint32[pos >>> 2] = 20;
            break;
        case "in":
            uint32[pos >>> 2] = 21;
            break;
        case "instanceof":
            uint32[pos >>> 2] = 22;
            break;
        case "**":
            uint32[pos >>> 2] = 23;
            break;
        case "??":
            uint32[pos >>> 2] = 24;
            break;
        default:
            throw new Error("Unexpected enum value for BinaryOperator");
    }
}

function serializeAssignmentExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeAssignmentOperator(node.operator, pos + 12);
    node.operator === "="
        ? serializeAssignmentLeftEquals(node.left, pos + 16)
        : serializeAssignmentLeft(node.left, pos + 16);
    serializeBoxExpression(node.right, pos + 24);
}

function serializeAssignmentLeft(node, pos) {
    switch (node.type) {
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "Identifier":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXEmptyExpression":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
        case "Invalid":
            serializeEnum(node, pos, 0, serializeBoxExpression, 4);
            break;
        case "ArrayPattern":
        case "RestElement":
        case "ObjectPattern":
        case "AssignmentPattern":
            serializeEnum(node, pos, 1, serializeBoxPattern, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for AssignmentLeft");
    }
}

function serializeAssignmentLeftEquals(node, pos) {
    uint32[pos >>> 2] = 1;
    serializeBoxPattern(node, pos + 4);
}

function serializeAssignmentOperator(value, pos) {
    switch (value) {
        case "=":
            uint32[pos >>> 2] = 0;
            break;
        case "+=":
            uint32[pos >>> 2] = 1;
            break;
        case "-=":
            uint32[pos >>> 2] = 2;
            break;
        case "*=":
            uint32[pos >>> 2] = 3;
            break;
        case "/=":
            uint32[pos >>> 2] = 4;
            break;
        case "%=":
            uint32[pos >>> 2] = 5;
            break;
        case "<<=":
            uint32[pos >>> 2] = 6;
            break;
        case ">>=":
            uint32[pos >>> 2] = 7;
            break;
        case ">>>=":
            uint32[pos >>> 2] = 8;
            break;
        case "|=":
            uint32[pos >>> 2] = 9;
            break;
        case "^=":
            uint32[pos >>> 2] = 10;
            break;
        case "&=":
            uint32[pos >>> 2] = 11;
            break;
        case "**=":
            uint32[pos >>> 2] = 12;
            break;
        case "&&=":
            uint32[pos >>> 2] = 13;
            break;
        case "||=":
            uint32[pos >>> 2] = 14;
            break;
        case "??=":
            uint32[pos >>> 2] = 15;
            break;
        default:
            throw new Error("Unexpected enum value for AssignmentOperator");
    }
}

function serializeMemberExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.object, pos + 12);
    serializeIdentifierOrPrivateNameOrComputed(node.property, pos + 16);
}

function serializeSuperPropExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeSuper(node.obj, pos + 12);
    serializeIdentifierOrComputed(node.property, pos + 24);
}

function serializeConditionalExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.test, pos + 12);
    serializeBoxExpression(node.consequent, pos + 16);
    serializeBoxExpression(node.alternate, pos + 20);
}

function serializeCallExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeSuperOrImportOrBoxExpression(node.callee, pos + 12);
    serializeVecExpressionOrSpread(node.arguments, pos + 28);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 36);
}

function serializeNewExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.callee, pos + 12);
    serializeOptionVecExpressionOrSpread(node.arguments, pos + 16);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 28);
}

function serializeSequenceExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecBoxExpression(node.expressions, pos + 12);
}

function serializeIdentifier(node, pos) {
    serializeSpan(node.span, pos);
    serializeJsWord(node.value, pos + 12);
    serializeBoolean(node.optional, pos + 20);
}

function serializeTemplateLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecBoxExpression(node.expressions, pos + 12);
    serializeVecTemplateElement(node.quasis, pos + 20);
}

function serializeTemplateElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.tail, pos + 12);
    serializeOptionJsWord(node.cooked, pos + 16);
    serializeJsWord(node.raw, pos + 28);
}

function serializeTaggedTemplateExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.tag, pos + 12);
    serializeOptionTsTypeParameterInstantiation(node.typeParameters, pos + 16);
    serializeTemplateLiteral(node.template, pos + 40);
}

function serializeYieldExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionBoxExpression(node.argument, pos + 12);
    serializeBoolean(node.delegate, pos + 20);
}

function serializeMetaProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializeMetaPropertyKind(node.kind, pos + 12);
}

function serializeMetaPropertyKind(value, pos) {
    switch (value) {
        case "new.target":
            uint32[pos >>> 2] = 0;
            break;
        case "import.meta":
            uint32[pos >>> 2] = 1;
            break;
        default:
            throw new Error("Unexpected enum value for MetaPropertyKind");
    }
}

function serializeAwaitExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.argument, pos + 12);
}

function serializeParenthesisExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializePrivateName(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.id, pos + 12);
}

function serializeOptionalChainingExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeSpan(node.questionDotToken, pos + 12);
    serializeMemberExpressionOrOptionalChainingCall(node.base, pos + 24);
}

function serializeOptionalChainingCall(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.callee, pos + 12);
    serializeVecExpressionOrSpread(node.arguments, pos + 16);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 24);
}

function serializeSuper(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeImport(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeInvalid(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeComputed(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeExpressionOrSpread(node, pos) {
    serializeOptionSpan(node.spread, pos);
    serializeBoxExpression(node.expression, pos + 16);
}

function serializeObjectExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecSpreadElementOrBoxObjectProperty(node.properties, pos + 12);
}

function serializeSpreadElement(node, pos) {
    serializeSpan(node.spread, pos);
    serializeBoxExpression(node.arguments, pos + 12);
}

function serializeObjectProperty(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "KeyValueProperty":
            serializeEnum(node, pos, 1, serializeKeyValueProperty, 8);
            break;
        case "AssignmentProperty":
            serializeEnum(node, pos, 2, serializeAssignmentProperty, 4);
            break;
        case "GetterProperty":
            serializeEnum(node, pos, 3, serializeGetterProperty, 8);
            break;
        case "SetterProperty":
            serializeEnum(node, pos, 4, serializeSetterProperty, 8);
            break;
        case "MethodProperty":
            serializeEnum(node, pos, 5, serializeMethodProperty, 8);
            break;
        default:
            throw new Error("Unexpected enum option type for ObjectProperty");
    }
}

function serializeKeyValueProperty(node, pos) {
    serializePropertyName(node.key, pos);
    serializeBoxExpression(node.value, pos + 48);
}

function serializeAssignmentProperty(node, pos) {
    serializeIdentifier(node.key, pos);
    serializeBoxExpression(node.value, pos + 24);
}

function serializeGetterProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializePropertyName(node.key, pos + 16);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 64);
    serializeOptionBlockStatement(node.body, pos + 84);
}

function serializeSetterProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializePropertyName(node.key, pos + 16);
    serializePattern(node.param, pos + 64);
    serializeOptionBlockStatement(node.body, pos + 116);
}

function serializeMethodProperty(node, pos) {
    serializePropertyName(node.key, pos);
    serializeVecParameter(node.params, pos + 48);
    serializeVecDecorator(node.decorators, pos + 56);
    serializeSpan(node.span, pos + 64);
    serializeOptionBlockStatement(node.body, pos + 76);
    serializeBoolean(node.generator, pos + 100);
    serializeBoolean(node.async, pos + 101);
    serializeOptionTsTypeParameterDeclaration(node.typeParameters, pos + 104);
    serializeOptionTsTypeAnnotation(node.returnType, pos + 128);
}

function serializePropertyName(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "StringLiteral":
            serializeEnum(node, pos, 1, serializeStringLiteral, 4);
            break;
        case "NumericLiteral":
            serializeEnum(node, pos, 2, serializeNumericLiteral, 8);
            break;
        case "Computed":
            serializeEnum(node, pos, 3, serializeComputed, 4);
            break;
        case "BigIntLiteral":
            serializeEnum(node, pos, 4, serializeBigIntLiteral, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for PropertyName");
    }
}

function serializeLiteral(node, pos) {
    switch (node.type) {
        case "StringLiteral":
            serializeEnum(node, pos, 0, serializeStringLiteral, 4);
            break;
        case "BooleanLiteral":
            serializeEnum(node, pos, 1, serializeBooleanLiteral, 4);
            break;
        case "NullLiteral":
            serializeEnum(node, pos, 2, serializeNullLiteral, 4);
            break;
        case "NumericLiteral":
            serializeEnum(node, pos, 3, serializeNumericLiteral, 8);
            break;
        case "BigIntLiteral":
            serializeEnum(node, pos, 4, serializeBigIntLiteral, 4);
            break;
        case "RegExpLiteral":
            serializeEnum(node, pos, 5, serializeRegExpLiteral, 4);
            break;
        case "JSXText":
            serializeEnum(node, pos, 6, serializeJSXText, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for Literal");
    }
}

function serializeStringLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeJsWord(node.value, pos + 12);
    serializeOptionJsWord(node.raw, pos + 20);
}

function serializeBooleanLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.value, pos + 12);
}

function serializeNullLiteral(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeNumericLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeNumber(node.value, pos + 16);
    serializeOptionAsciiJsWord(node.raw, pos + 24);
}

function serializeBigIntLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeBigIntValue(node.value, pos + 12);
    serializeOptionAsciiJsWord(node.raw, pos + 20);
}

function serializeBigIntValue(value, pos) {
    if (value[0] === 0) {
        serializeAsciiJsWord("0", pos);
    } else {
        const parts = value[1];
        let num = 0n;
        for (let i = parts.length - 1; i >= 0; i--) {
            num <<= 32n;
            num += BigInt(parts[i]);
        }
        let str = num.toString();
        if (value[0] === -1) str = `-${str}`;
        serializeAsciiJsWord(str, pos);
    }
}

function serializeRegExpLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeJsWord(node.pattern, pos + 12);
    serializeAsciiJsWord(node.flags, pos + 20);
}

function serializeJSXElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeJSXOpeningElement(node.opening, pos + 12);
    serializeVecJSXElementChild(node.children, pos + 116);
    serializeOptionJSXClosingElement(node.closing, pos + 124);
}

function serializeJSXOpeningElement(node, pos) {
    serializeJSXElementName(node.name, pos);
    serializeSpan(node.span, pos + 56);
    serializeVecJSXAttributeOrSpreadElement(node.attributes, pos + 68);
    serializeBoolean(node.selfClosing, pos + 76);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 80);
}

function serializeJSXAttribute(node, pos) {
    serializeSpan(node.span, pos);
    serializeJSXAttributeName(node.name, pos + 12);
    serializeOptionJSXAttributeValue(node.value, pos + 64);
}

function serializeJSXAttributeName(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "JSXNamespacedName":
            serializeEnum(node, pos, 1, serializeJSXNamespacedName, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for JSXAttributeName");
    }
}

function serializeJSXAttributeValue(node, pos) {
    switch (node.type) {
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
            serializeEnum(node, pos, 0, serializeLiteral, 8);
            break;
        case "JSXExpressionContainer":
            serializeEnum(node, pos, 1, serializeJSXExpressionContainer, 4);
            break;
        case "JSXElement":
            serializeEnum(node, pos, 2, serializeBoxJSXElement, 4);
            break;
        case "JSXFragment":
            serializeEnum(node, pos, 3, serializeJSXFragment, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for JSXAttributeValue"
            );
    }
}

function serializeJSXClosingElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeJSXElementName(node.name, pos + 12);
}

function serializeJSXFragment(node, pos) {
    serializeSpan(node.span, pos);
    serializeJSXOpeningFragment(node.opening, pos + 12);
    serializeVecJSXElementChild(node.children, pos + 24);
    serializeJSXClosingFragment(node.closing, pos + 32);
}

function serializeJSXOpeningFragment(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeJSXClosingFragment(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeJSXMemberExpression(node, pos) {
    serializeJSXObject(node.object, pos);
    serializeIdentifier(node.property, pos + 28);
}

function serializeJSXObject(node, pos) {
    switch (node.type) {
        case "JSXMemberExpression":
            serializeEnum(node, pos, 0, serializeBoxJSXMemberExpression, 4);
            break;
        case "Identifier":
            serializeEnum(node, pos, 1, serializeIdentifier, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for JSXObject");
    }
}

function serializeJSXNamespacedName(node, pos) {
    serializeIdentifier(node.namespace, pos);
    serializeIdentifier(node.name, pos + 24);
}

function serializeJSXText(node, pos) {
    serializeSpan(node.span, pos);
    serializeJsWord(node.value, pos + 12);
    serializeJsWord(node.raw, pos + 20);
}

function serializeJSXEmptyExpression(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeJSXElementChild(node, pos) {
    switch (node.type) {
        case "JSXText":
            serializeEnum(node, pos, 0, serializeJSXText, 4);
            break;
        case "JSXExpressionContainer":
            serializeEnum(node, pos, 1, serializeJSXExpressionContainer, 4);
            break;
        case "JSXSpreadChild":
            serializeEnum(node, pos, 2, serializeJSXSpreadChild, 4);
            break;
        case "JSXElement":
            serializeEnum(node, pos, 3, serializeBoxJSXElement, 4);
            break;
        case "JSXFragment":
            serializeEnum(node, pos, 4, serializeJSXFragment, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for JSXElementChild");
    }
}

function serializeJSXExpressionContainer(node, pos) {
    serializeSpan(node.span, pos);
    serializeJSXExpression(node.expression, pos + 12);
}

function serializeJSXExpression(node, pos) {
    switch (node.type) {
        case "JSXEmptyExpression":
            serializeEnum(node, pos, 0, serializeJSXEmptyExpression, 4);
            break;
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "Identifier":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
        case "Invalid":
            serializeEnum(node, pos, 1, serializeBoxExpression, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for JSXExpression");
    }
}

function serializeJSXSpreadChild(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeJSXElementName(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "JSXMemberExpression":
            serializeEnum(node, pos, 1, serializeJSXMemberExpression, 4);
            break;
        case "JSXNamespacedName":
            serializeEnum(node, pos, 2, serializeJSXNamespacedName, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for JSXElementName");
    }
}

function serializeTsTypeAnnotation(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsTypeParameterDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsTypeParameter(node.parameters, pos + 12);
}

function serializeTsTypeParameter(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.name, pos + 12);
    serializeBoolean(node.in, pos + 36);
    serializeBoolean(node.out, pos + 37);
    serializeOptionBoxTsType(node.constraint, pos + 40);
    serializeOptionBoxTsType(node.default, pos + 48);
}

function serializeTsTypeParameterInstantiation(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecBoxTsType(node.params, pos + 12);
}

function serializeTsParameterProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecDecorator(node.decorators, pos + 12);
    serializeOptionAccessibility(node.accessibility, pos + 20);
    serializeBoolean(node.override, pos + 28);
    serializeBoolean(node.readonly, pos + 29);
    serializeTsParamPropParam(node.param, pos + 32);
}

function serializeTsParamPropParam(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeBindingIdentifier, 4);
            break;
        case "AssignmentPattern":
            serializeEnum(node, pos, 1, serializeAssignmentPattern, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsParamPropParam");
    }
}

function serializeTsQualifiedName(node, pos) {
    serializeTsEntityName(node.left, pos);
    serializeIdentifier(node.right, pos + 28);
}

function serializeTsEntityName(node, pos) {
    switch (node.type) {
        case "TsQualifiedName":
            serializeEnum(node, pos, 0, serializeBoxTsQualifiedName, 4);
            break;
        case "Identifier":
            serializeEnum(node, pos, 1, serializeIdentifier, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsEntityName");
    }
}

function serializeTsTypeElement(node, pos) {
    switch (node.type) {
        case "TsCallSignatureDeclaration":
            serializeEnum(node, pos, 0, serializeTsCallSignatureDeclaration, 4);
            break;
        case "TsConstructSignatureDeclaration":
            serializeEnum(
                node,
                pos,
                1,
                serializeTsConstructSignatureDeclaration,
                4
            );
            break;
        case "TsPropertySignature":
            serializeEnum(node, pos, 2, serializeTsPropertySignature, 4);
            break;
        case "TsGetterSignature":
            serializeEnum(node, pos, 3, serializeTsGetterSignature, 4);
            break;
        case "TsSetterSignature":
            serializeEnum(node, pos, 4, serializeTsSetterSignature, 4);
            break;
        case "TsMethodSignature":
            serializeEnum(node, pos, 5, serializeTsMethodSignature, 4);
            break;
        case "TsIndexSignature":
            serializeEnum(node, pos, 6, serializeTsIndexSignature, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsTypeElement");
    }
}

function serializeTsCallSignatureDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsFnParam(node.params, pos + 12);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 20);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 40);
}

function serializeTsConstructSignatureDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsFnParam(node.params, pos + 12);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 20);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 40);
}

function serializeTsPropertySignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, pos + 12);
    serializeBoxExpression(node.key, pos + 16);
    serializeBoolean(node.computed, pos + 20);
    serializeBoolean(node.optional, pos + 21);
    serializeOptionBoxExpression(node.init, pos + 24);
    serializeVecTsFnParam(node.params, pos + 32);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 40);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 60);
}

function serializeTsGetterSignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, pos + 12);
    serializeBoxExpression(node.key, pos + 16);
    serializeBoolean(node.computed, pos + 20);
    serializeBoolean(node.optional, pos + 21);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 24);
}

function serializeTsSetterSignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, pos + 12);
    serializeBoxExpression(node.key, pos + 16);
    serializeBoolean(node.computed, pos + 20);
    serializeBoolean(node.optional, pos + 21);
    serializeTsFnParam(node.param, pos + 24);
}

function serializeTsMethodSignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, pos + 12);
    serializeBoxExpression(node.key, pos + 16);
    serializeBoolean(node.computed, pos + 20);
    serializeBoolean(node.optional, pos + 21);
    serializeVecTsFnParam(node.params, pos + 24);
    serializeOptionTsTypeAnnotation(node.typeAnn, pos + 32);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 52);
}

function serializeTsIndexSignature(node, pos) {
    serializeVecTsFnParam(node.params, pos);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 8);
    serializeBoolean(node.readonly, pos + 28);
    serializeBoolean(node.static, pos + 29);
    serializeSpan(node.span, pos + 32);
}

function serializeTsType(node, pos) {
    switch (node.type) {
        case "TsKeywordType":
            serializeEnum(node, pos, 0, serializeTsKeywordType, 4);
            break;
        case "TsThisType":
            serializeEnum(node, pos, 1, serializeTsThisType, 4);
            break;
        case "TsFunctionType":
        case "TsConstructorType":
            serializeEnum(node, pos, 2, serializeTsFnOrConstructorType, 4);
            break;
        case "TsTypeReference":
            serializeEnum(node, pos, 3, serializeTsTypeReference, 4);
            break;
        case "TsTypeQuery":
            serializeEnum(node, pos, 4, serializeTsTypeQuery, 4);
            break;
        case "TsTypeLiteral":
            serializeEnum(node, pos, 5, serializeTsTypeLiteral, 4);
            break;
        case "TsArrayType":
            serializeEnum(node, pos, 6, serializeTsArrayType, 4);
            break;
        case "TsTupleType":
            serializeEnum(node, pos, 7, serializeTsTupleType, 4);
            break;
        case "TsOptionalType":
            serializeEnum(node, pos, 8, serializeTsOptionalType, 4);
            break;
        case "TsRestType":
            serializeEnum(node, pos, 9, serializeTsRestType, 4);
            break;
        case "TsUnionType":
        case "TsIntersectionType":
            serializeEnum(node, pos, 10, serializeTsUnionOrIntersectionType, 4);
            break;
        case "TsConditionalType":
            serializeEnum(node, pos, 11, serializeTsConditionalType, 4);
            break;
        case "TsInferType":
            serializeEnum(node, pos, 12, serializeTsInferType, 4);
            break;
        case "TsParenthesizedType":
            serializeEnum(node, pos, 13, serializeTsParenthesizedType, 4);
            break;
        case "TsTypeOperator":
            serializeEnum(node, pos, 14, serializeTsTypeOperator, 4);
            break;
        case "TsIndexedAccessType":
            serializeEnum(node, pos, 15, serializeTsIndexedAccessType, 4);
            break;
        case "TsMappedType":
            serializeEnum(node, pos, 16, serializeTsMappedType, 4);
            break;
        case "TsLiteralType":
            serializeEnum(node, pos, 17, serializeTsLiteralType, 8);
            break;
        case "TsTypePredicate":
            serializeEnum(node, pos, 18, serializeTsTypePredicate, 4);
            break;
        case "TsImportType":
            serializeEnum(node, pos, 19, serializeTsImportType, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsType");
    }
}

function serializeTsFnOrConstructorType(node, pos) {
    switch (node.type) {
        case "TsFunctionType":
            serializeEnum(node, pos, 0, serializeTsFunctionType, 4);
            break;
        case "TsConstructorType":
            serializeEnum(node, pos, 1, serializeTsConstructorType, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsFnOrConstructorType"
            );
    }
}

function serializeTsKeywordType(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsKeywordTypeKind(node.kind, pos + 12);
}

function serializeTsKeywordTypeKind(value, pos) {
    switch (value) {
        case "any":
            uint32[pos >>> 2] = 0;
            break;
        case "unknown":
            uint32[pos >>> 2] = 1;
            break;
        case "number":
            uint32[pos >>> 2] = 2;
            break;
        case "object":
            uint32[pos >>> 2] = 3;
            break;
        case "boolean":
            uint32[pos >>> 2] = 4;
            break;
        case "bigint":
            uint32[pos >>> 2] = 5;
            break;
        case "string":
            uint32[pos >>> 2] = 6;
            break;
        case "symbol":
            uint32[pos >>> 2] = 7;
            break;
        case "void":
            uint32[pos >>> 2] = 8;
            break;
        case "undefined":
            uint32[pos >>> 2] = 9;
            break;
        case "null":
            uint32[pos >>> 2] = 10;
            break;
        case "never":
            uint32[pos >>> 2] = 11;
            break;
        case "intrinsic":
            uint32[pos >>> 2] = 12;
            break;
        default:
            throw new Error("Unexpected enum value for TsKeywordTypeKind");
    }
}

function serializeTsThisType(node, pos) {
    serializeSpan(node.span, pos);
}

function serializeTsFnParam(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeBindingIdentifier, 4);
            break;
        case "ArrayPattern":
            serializeEnum(node, pos, 1, serializeArrayPattern, 4);
            break;
        case "RestElement":
            serializeEnum(node, pos, 2, serializeRestElement, 4);
            break;
        case "ObjectPattern":
            serializeEnum(node, pos, 3, serializeObjectPattern, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsFnParam");
    }
}

function serializeTsFunctionType(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsFnParam(node.params, pos + 12);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 20);
    serializeTsTypeAnnotation(node.typeAnnotation, pos + 44);
}

function serializeTsConstructorType(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsFnParam(node.params, pos + 12);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 20);
    serializeTsTypeAnnotation(node.typeAnnotation, pos + 44);
    serializeBoolean(node.isAbstract, pos + 60);
}

function serializeTsTypeReference(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsEntityName(node.typeName, pos + 12);
    serializeOptionTsTypeParameterInstantiation(node.typeParams, pos + 40);
}

function serializeTsTypePredicate(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.asserts, pos + 12);
    serializeTsThisTypeOrIdent(node.paramName, pos + 16);
    serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 44);
}

function serializeTsThisTypeOrIdent(node, pos) {
    switch (node.type) {
        case "TsThisType":
            serializeEnum(node, pos, 0, serializeTsThisType, 4);
            break;
        case "Identifier":
            serializeEnum(node, pos, 1, serializeIdentifier, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsThisTypeOrIdent"
            );
    }
}

function serializeTsTypeQuery(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsTypeQueryExpr(node.exprName, pos + 12);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 116);
}

function serializeTsTypeQueryExpr(node, pos) {
    switch (node.type) {
        case "TsQualifiedName":
        case "Identifier":
            serializeEnum(node, pos, 0, serializeTsEntityName, 4);
            break;
        case "TsImportType":
            serializeEnum(node, pos, 1, serializeTsImportType, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsTypeQueryExpr");
    }
}

function serializeTsImportType(node, pos) {
    serializeSpan(node.span, pos);
    serializeStringLiteral(node.argument, pos + 12);
    serializeOptionTsEntityName(node.qualifier, pos + 44);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 76);
}

function serializeTsTypeLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsTypeElement(node.members, pos + 12);
}

function serializeTsArrayType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxTsType(node.elemType, pos + 12);
}

function serializeTsTupleType(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsTupleElement(node.elemTypes, pos + 12);
}

function serializeTsTupleElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionPattern(node.label, pos + 12);
    serializeTsType(node.ty, pos + 72);
}

function serializeTsOptionalType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsRestType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsUnionOrIntersectionType(node, pos) {
    switch (node.type) {
        case "TsUnionType":
            serializeEnum(node, pos, 0, serializeTsUnionType, 4);
            break;
        case "TsIntersectionType":
            serializeEnum(node, pos, 1, serializeTsIntersectionType, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsUnionOrIntersectionType"
            );
    }
}

function serializeTsUnionType(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecBoxTsType(node.types, pos + 12);
}

function serializeTsIntersectionType(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecBoxTsType(node.types, pos + 12);
}

function serializeTsConditionalType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxTsType(node.checkType, pos + 12);
    serializeBoxTsType(node.extendsType, pos + 16);
    serializeBoxTsType(node.trueType, pos + 20);
    serializeBoxTsType(node.falseType, pos + 24);
}

function serializeTsInferType(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsTypeParameter(node.typeParam, pos + 12);
}

function serializeTsParenthesizedType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsTypeOperator(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsTypeOperatorOp(node.op, pos + 12);
    serializeBoxTsType(node.typeAnnotation, pos + 16);
}

function serializeTsTypeOperatorOp(value, pos) {
    switch (value) {
        case "keyof":
            uint32[pos >>> 2] = 0;
            break;
        case "unique":
            uint32[pos >>> 2] = 1;
            break;
        case "readonly":
            uint32[pos >>> 2] = 2;
            break;
        default:
            throw new Error("Unexpected enum value for TsTypeOperatorOp");
    }
}

function serializeTsIndexedAccessType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, pos + 12);
    serializeBoxTsType(node.objectType, pos + 16);
    serializeBoxTsType(node.indexType, pos + 20);
}

function serializeTruePlusMinus(value, pos) {
    switch (value) {
        case true:
        case "true":
            uint32[pos >>> 2] = 0;
            break;
        case "+":
            uint32[pos >>> 2] = 1;
            break;
        case "-":
            uint32[pos >>> 2] = 2;
            break;
        default:
            throw new Error("Unexpected enum value for TruePlusMinus");
    }
}

function serializeTsMappedType(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionTruePlusMinus(node.readonly, pos + 12);
    serializeTsTypeParameter(node.typeParam, pos + 20);
    serializeOptionBoxTsType(node.nameType, pos + 76);
    serializeOptionTruePlusMinus(node.optional, pos + 84);
    serializeOptionBoxTsType(node.typeAnnotation, pos + 92);
}

function serializeTsLiteralType(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsLit(node.literal, pos + 16);
}

function serializeTsLit(node, pos) {
    switch (node.type) {
        case "NumericLiteral":
            serializeEnum(node, pos, 0, serializeNumericLiteral, 8);
            break;
        case "StringLiteral":
            serializeEnum(node, pos, 1, serializeStringLiteral, 4);
            break;
        case "BooleanLiteral":
            serializeEnum(node, pos, 2, serializeBooleanLiteral, 4);
            break;
        case "BigIntLiteral":
            serializeEnum(node, pos, 3, serializeBigIntLiteral, 4);
            break;
        case "TemplateLiteral":
            serializeEnum(node, pos, 4, serializeTsTemplateLiteralType, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsLit");
    }
}

function serializeTsTemplateLiteralType(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecBoxTsType(node.types, pos + 12);
    serializeVecTemplateElement(node.quasis, pos + 20);
}

function serializeTsInterfaceDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.id, pos + 12);
    serializeBoolean(node.declare, pos + 36);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 40);
    serializeVecTsExpressionWithTypeArguments(node.extends, pos + 64);
    serializeTsInterfaceBody(node.body, pos + 72);
}

function serializeTsInterfaceBody(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecTsTypeElement(node.body, pos + 12);
}

function serializeTsExpressionWithTypeArguments(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
    serializeOptionTsTypeParameterInstantiation(node.typeArguments, pos + 16);
}

function serializeTsTypeAliasDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, pos + 12);
    serializeIdentifier(node.id, pos + 16);
    serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 40);
    serializeBoxTsType(node.typeAnnotation, pos + 64);
}

function serializeTsEnumDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, pos + 12);
    serializeBoolean(node.isConst, pos + 13);
    serializeIdentifier(node.id, pos + 16);
    serializeVecTsEnumMember(node.members, pos + 40);
}

function serializeTsEnumMember(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsModuleName(node.id, pos + 12);
    serializeOptionBoxExpression(node.init, pos + 48);
}

function serializeTsModuleName(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "StringLiteral":
            serializeEnum(node, pos, 1, serializeStringLiteral, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
}

function serializeTsModuleDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, pos + 12);
    serializeBoolean(node.global, pos + 13);
    serializeTsModuleName(node.id, pos + 16);
    serializeOptionTsNamespaceBody(node.body, pos + 52);
}

function serializeTsNamespaceBody(node, pos) {
    switch (node.type) {
        case "TsModuleBlock":
            serializeEnum(node, pos, 0, serializeTsModuleBlock, 4);
            break;
        case "TsNamespaceDeclaration":
            serializeEnum(node, pos, 1, serializeTsNamespaceDeclaration, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsNamespaceBody");
    }
}

function serializeTsModuleBlock(node, pos) {
    serializeSpan(node.span, pos);
    serializeVecModuleItem(node.body, pos + 12);
}

function serializeTsNamespaceDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, pos + 12);
    serializeBoolean(node.global, pos + 13);
    serializeIdentifier(node.id, pos + 16);
    serializeBoxTsNamespaceBody(node.body, pos + 40);
}

function serializeTsModuleName(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "StringLiteral":
            serializeEnum(node, pos, 1, serializeStringLiteral, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
}

function serializeTsImportEqualsDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, pos + 12);
    serializeBoolean(node.isExport, pos + 13);
    serializeBoolean(node.isTypeOnly, pos + 14);
    serializeIdentifier(node.id, pos + 16);
    serializeTsModuleRef(node.moduleRef, pos + 40);
}

function serializeTsModuleRef(node, pos) {
    switch (node.type) {
        case "TsQualifiedName":
        case "Identifier":
            serializeEnum(node, pos, 0, serializeTsEntityName, 4);
            break;
        case "TsExternalModuleReference":
            serializeEnum(node, pos, 1, serializeTsExternalModuleReference, 4);
            break;
        default:
            throw new Error("Unexpected enum option type for TsModuleRef");
    }
}

function serializeTsExternalModuleReference(node, pos) {
    serializeSpan(node.span, pos);
    serializeStringLiteral(node.expression, pos + 12);
}

function serializeTsExportAssignment(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeTsNamespaceExportDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeIdentifier(node.id, pos + 12);
}

function serializeTsAsExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
    serializeBoxTsType(node.typeAnnotation, pos + 16);
}

function serializeTsTypeAssertion(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
    serializeBoxTsType(node.typeAnnotation, pos + 16);
}

function serializeTsNonNullExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeAccessibility(value, pos) {
    switch (value) {
        case "public":
            uint32[pos >>> 2] = 0;
            break;
        case "protected":
            uint32[pos >>> 2] = 1;
            break;
        case "private":
            uint32[pos >>> 2] = 2;
            break;
        default:
            throw new Error("Unexpected enum value for Accessibility");
    }
}

function serializeTsConstAssertion(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
}

function serializeTsInstantiation(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoxExpression(node.expression, pos + 12);
    serializeTsTypeParameterInstantiation(node.typeArguments, pos + 16);
}

function serializeJsWord(str, pos) {
    const strLen = str.length;
    if (strLen === 0) {
        buff[pos + 7] = 0;
        return;
    }
    let strPos, len;
    if (strLen <= 7) {
        const isWritten = writeShortStringToBuffer(str, pos, strLen);
        if (isWritten) {
            buff[pos + 7] = strLen;
            return;
        }
        if (strLen <= 2) {
            buff[pos + 7] = utf8Write.call(buff, str, pos);
            return;
        }
        strPos = alloc(strLen * 3);
        len = utf8Write.call(buff, str, strPos);
        if (len <= 7) {
            buff[pos + 7] = len;
            buffPos = strPos;
            const endPos = pos + len;
            do {
                buff[pos++] = buff[strPos++];
            } while (pos < endPos);
            return;
        }
    } else {
        strPos = alloc(strLen * 3);
        len =
            strLen < 42
                ? writeStringToBuffer(str, buff, strLen, strPos)
                : utf8Write.call(buff, str, strPos);
    }
    buffPos = strPos + len;
    const pos32 = pos >>> 2;
    uint32[pos32] = len;
    uint32[pos32 + 1] = strPos - pos;
}
const { utf8Write } = Buffer.prototype;

function serializeAsciiJsWord(str, pos) {
    const len = str.length;
    if (len === 0) {
        buff[pos + 7] = 0;
        return;
    }
    if (len <= 7) {
        buff[pos + 7] = len;
        let charIndex = 0;
        do {
            buff[pos++] = charCodeAt.call(str, charIndex);
        } while (++charIndex < len);
        return;
    }
    const strPos = alloc(len);
    if (len < 48) {
        writeAsciiStringToBuffer(str, buff, len, strPos);
    } else {
        asciiWrite.call(buff, str, strPos);
    }
    const pos32 = pos >>> 2;
    uint32[pos32] = len;
    uint32[pos32 + 1] = strPos - pos;
}
const { asciiWrite } = Buffer.prototype;

function serializeBoolean(value, pos) {
    buff[pos] = value ? 1 : 0;
}

function serializeNumber(num, pos) {
    float64[pos >>> 3] = num;
}

function serializeSpan(span, pos) {
    const pos32 = pos >>> 2;
    uint32[pos32] = span.start;
    uint32[pos32 + 1] = span.end;
    uint32[pos32 + 2] = span.ctxt;
}

function serializeVecModuleItem(values, pos) {
    serializeVec(values, pos, serializeModuleItem, 156, 4);
}

function serializeVecImportSpecifier(values, pos) {
    serializeVec(values, pos, serializeImportSpecifier, 84, 4);
}

function serializeOptionTsModuleName(value, pos) {
    serializeOption(value, pos, serializeTsModuleName, 4);
}

function serializeOptionJsWord(value, pos) {
    serializeOption(value, pos, serializeJsWord, 4);
}

function serializeOptionObjectExpression(value, pos) {
    serializeOption(value, pos, serializeObjectExpression, 4);
}

function serializeVecSpreadElementOrBoxObjectProperty(values, pos) {
    serializeVec(values, pos, serializeSpreadElementOrBoxObjectProperty, 20, 4);
}

function serializeSpreadElementOrBoxObjectProperty(node, pos) {
    switch (node.type) {
        case "SpreadElement":
            serializeEnum(node, pos, 0, serializeSpreadElement, 4);
            break;
        case "Identifier":
        case "KeyValueProperty":
        case "AssignmentProperty":
        case "GetterProperty":
        case "SetterProperty":
        case "MethodProperty":
            serializeEnum(node, pos, 1, serializeBoxObjectProperty, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for SpreadElementOrBoxObjectProperty"
            );
    }
}

function serializeBoxExpression(value, pos) {
    serializeBox(value, pos, serializeExpression, 136, 8);
}

function serializeVecOptionExpressionOrSpread(values, pos) {
    serializeVec(values, pos, serializeOptionExpressionOrSpread, 24, 4);
}

function serializeOptionExpressionOrSpread(value, pos) {
    serializeOption(value, pos, serializeExpressionOrSpread, 4);
}

function serializeOptionSpan(value, pos) {
    serializeOption(value, pos, serializeSpan, 4);
}

function serializeOptionIdentifier(value, pos) {
    serializeOption(value, pos, serializeIdentifier, 4);
}

function serializeVecParameter(values, pos) {
    serializeVec(values, pos, serializeParameter, 72, 4);
}

function serializeVecDecorator(values, pos) {
    serializeVec(values, pos, serializeDecorator, 16, 4);
}

function serializeOptionTsTypeAnnotation(value, pos) {
    serializeOption(value, pos, serializeTsTypeAnnotation, 4);
}

function serializeBoxTsType(value, pos) {
    serializeBox(value, pos, serializeTsType, 144, 8);
}

function serializeVecTsFnParam(values, pos) {
    serializeVec(values, pos, serializeTsFnParam, 52, 4);
}

function serializeVecOptionPattern(values, pos) {
    serializeVec(values, pos, serializeOptionPattern, 56, 4);
}

function serializeOptionPattern(value, pos) {
    serializeOption(value, pos, serializePattern, 4);
}

function serializeBoxPattern(value, pos) {
    serializeBox(value, pos, serializePattern, 52, 4);
}

function serializeVecObjectPatternProperty(values, pos) {
    serializeVec(values, pos, serializeObjectPatternProperty, 64, 8);
}

function serializeOptionAsciiJsWord(value, pos) {
    serializeOption(value, pos, serializeAsciiJsWord, 4);
}

function serializeOptionBoxExpression(value, pos) {
    serializeOption(value, pos, serializeBoxExpression, 4);
}

function serializeOptionTsTypeParameterDeclaration(value, pos) {
    serializeOption(value, pos, serializeTsTypeParameterDeclaration, 4);
}

function serializeVecTsTypeParameter(values, pos) {
    serializeVec(values, pos, serializeTsTypeParameter, 56, 4);
}

function serializeOptionBoxTsType(value, pos) {
    serializeOption(value, pos, serializeBoxTsType, 4);
}

function serializeBoxTsQualifiedName(value, pos) {
    serializeBox(value, pos, serializeTsQualifiedName, 52, 4);
}

function serializeOptionTsTypeParameterInstantiation(value, pos) {
    serializeOption(value, pos, serializeTsTypeParameterInstantiation, 4);
}

function serializeVecBoxTsType(values, pos) {
    serializeVec(values, pos, serializeBoxTsType, 4, 4);
}

function serializeOptionTsEntityName(value, pos) {
    serializeOption(value, pos, serializeTsEntityName, 4);
}

function serializeVecTsTypeElement(values, pos) {
    serializeVec(values, pos, serializeTsTypeElement, 88, 4);
}

function serializeVecTsTupleElement(values, pos) {
    serializeVec(values, pos, serializeTsTupleElement, 216, 8);
}

function serializeOptionTruePlusMinus(value, pos) {
    serializeOption(value, pos, serializeTruePlusMinus, 4);
}

function serializeVecTemplateElement(values, pos) {
    serializeVec(values, pos, serializeTemplateElement, 36, 4);
}

function serializeOptionBlockStatement(value, pos) {
    serializeOption(value, pos, serializeBlockStatement, 4);
}

function serializeVecStatement(values, pos) {
    serializeVec(values, pos, serializeStatement, 152, 4);
}

function serializeBoxStatement(value, pos) {
    serializeBox(value, pos, serializeStatement, 152, 4);
}

function serializeOptionBoxStatement(value, pos) {
    serializeOption(value, pos, serializeBoxStatement, 4);
}

function serializeVecSwitchCase(values, pos) {
    serializeVec(values, pos, serializeSwitchCase, 28, 4);
}

function serializeOptionCatchClause(value, pos) {
    serializeOption(value, pos, serializeCatchClause, 4);
}

function serializeOptionVariableDeclarationOrBoxExpression(value, pos) {
    serializeOption(value, pos, serializeVariableDeclarationOrBoxExpression, 4);
}

function serializeVariableDeclarationOrBoxExpression(node, pos) {
    switch (node.type) {
        case "VariableDeclaration":
            serializeEnum(node, pos, 0, serializeVariableDeclaration, 4);
            break;
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "Identifier":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXEmptyExpression":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
        case "Invalid":
            serializeEnum(node, pos, 1, serializeBoxExpression, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for VariableDeclarationOrBoxExpression"
            );
    }
}

function serializeVecVariableDeclarator(values, pos) {
    serializeVec(values, pos, serializeVariableDeclarator, 76, 4);
}

function serializeVariableDeclarationOrPattern(node, pos) {
    switch (node.type) {
        case "VariableDeclaration":
            serializeEnum(node, pos, 0, serializeVariableDeclaration, 4);
            break;
        case "Identifier":
        case "ArrayPattern":
        case "RestElement":
        case "ObjectPattern":
        case "AssignmentPattern":
        case "Invalid":
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXEmptyExpression":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
            serializeEnum(node, pos, 1, serializePattern, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for VariableDeclarationOrPattern"
            );
    }
}

function serializeVecClassMember(values, pos) {
    serializeVec(values, pos, serializeClassMember, 192, 8);
}

function serializeVecTsParameterPropertyOrParameter(values, pos) {
    serializeVec(values, pos, serializeTsParameterPropertyOrParameter, 84, 4);
}

function serializeTsParameterPropertyOrParameter(node, pos) {
    switch (node.type) {
        case "TsParameterProperty":
            serializeEnum(node, pos, 0, serializeTsParameterProperty, 4);
            break;
        case "Parameter":
            serializeEnum(node, pos, 1, serializeParameter, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsParameterPropertyOrParameter"
            );
    }
}

function serializeOptionAccessibility(value, pos) {
    serializeOption(value, pos, serializeAccessibility, 4);
}

function serializeVecTsExpressionWithTypeArguments(values, pos) {
    serializeVec(values, pos, serializeTsExpressionWithTypeArguments, 40, 4);
}

function serializeVecTsEnumMember(values, pos) {
    serializeVec(values, pos, serializeTsEnumMember, 56, 4);
}

function serializeOptionTsNamespaceBody(value, pos) {
    serializeOption(value, pos, serializeTsNamespaceBody, 4);
}

function serializeBoxTsNamespaceBody(value, pos) {
    serializeBox(value, pos, serializeTsNamespaceBody, 48, 4);
}

function serializeIdentifierOrPrivateNameOrComputed(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "PrivateName":
            serializeEnum(node, pos, 1, serializePrivateName, 4);
            break;
        case "Computed":
            serializeEnum(node, pos, 2, serializeComputed, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for IdentifierOrPrivateNameOrComputed"
            );
    }
}

function serializeIdentifierOrComputed(node, pos) {
    switch (node.type) {
        case "Identifier":
            serializeEnum(node, pos, 0, serializeIdentifier, 4);
            break;
        case "Computed":
            serializeEnum(node, pos, 1, serializeComputed, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for IdentifierOrComputed"
            );
    }
}

function serializeSuperOrImportOrBoxExpression(node, pos) {
    switch (node.type) {
        case "Super":
            serializeEnum(node, pos, 0, serializeSuper, 4);
            break;
        case "Import":
            serializeEnum(node, pos, 1, serializeImport, 4);
            break;
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "Identifier":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXEmptyExpression":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
        case "Invalid":
            serializeEnum(node, pos, 2, serializeBoxExpression, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for SuperOrImportOrBoxExpression"
            );
    }
}

function serializeVecExpressionOrSpread(values, pos) {
    serializeVec(values, pos, serializeExpressionOrSpread, 20, 4);
}

function serializeOptionVecExpressionOrSpread(value, pos) {
    serializeOption(value, pos, serializeVecExpressionOrSpread, 4);
}

function serializeVecBoxExpression(values, pos) {
    serializeVec(values, pos, serializeBoxExpression, 4, 4);
}

function serializeVecPattern(values, pos) {
    serializeVec(values, pos, serializePattern, 52, 4);
}

function serializeBlockStatementOrBoxExpression(node, pos) {
    switch (node.type) {
        case "BlockStatement":
            serializeEnum(node, pos, 0, serializeBlockStatement, 4);
            break;
        case "ThisExpression":
        case "ArrayExpression":
        case "ObjectExpression":
        case "FunctionExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "MemberExpression":
        case "SuperPropExpression":
        case "ConditionalExpression":
        case "CallExpression":
        case "NewExpression":
        case "SequenceExpression":
        case "Identifier":
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
        case "TemplateLiteral":
        case "TaggedTemplateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "YieldExpression":
        case "MetaProperty":
        case "AwaitExpression":
        case "ParenthesisExpression":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXEmptyExpression":
        case "JSXElement":
        case "JSXFragment":
        case "TsTypeAssertion":
        case "TsConstAssertion":
        case "TsNonNullExpression":
        case "TsAsExpression":
        case "TsInstantiation":
        case "PrivateName":
        case "OptionalChainingExpression":
        case "Invalid":
            serializeEnum(node, pos, 1, serializeBoxExpression, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for BlockStatementOrBoxExpression"
            );
    }
}

function serializeBoxJSXMemberExpression(value, pos) {
    serializeBox(value, pos, serializeJSXMemberExpression, 52, 4);
}

function serializeBoxJSXElement(value, pos) {
    serializeBox(value, pos, serializeJSXElement, 196, 4);
}

function serializeVecJSXAttributeOrSpreadElement(values, pos) {
    serializeVec(values, pos, serializeJSXAttributeOrSpreadElement, 136, 8);
}

function serializeJSXAttributeOrSpreadElement(node, pos) {
    switch (node.type) {
        case "JSXAttribute":
            serializeEnum(node, pos, 0, serializeJSXAttribute, 8);
            break;
        case "SpreadElement":
            serializeEnum(node, pos, 1, serializeSpreadElement, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for JSXAttributeOrSpreadElement"
            );
    }
}

function serializeOptionJSXAttributeValue(value, pos) {
    serializeOption(value, pos, serializeJSXAttributeValue, 8);
}

function serializeVecJSXElementChild(values, pos) {
    serializeVec(values, pos, serializeJSXElementChild, 48, 4);
}

function serializeOptionJSXClosingElement(value, pos) {
    serializeOption(value, pos, serializeJSXClosingElement, 4);
}

function serializeMemberExpressionOrOptionalChainingCall(node, pos) {
    switch (node.type) {
        case "MemberExpression":
            serializeEnum(node, pos, 0, serializeMemberExpression, 4);
            break;
        case "CallExpression":
            serializeEnum(node, pos, 1, serializeOptionalChainingCall, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for MemberExpressionOrOptionalChainingCall"
            );
    }
}

function serializeBoxObjectProperty(value, pos) {
    serializeBox(value, pos, serializeObjectProperty, 160, 8);
}

function serializeVecExportSpecifier(values, pos) {
    serializeVec(values, pos, serializeExportSpecifier, 96, 4);
}

function serializeOptionStringLiteral(value, pos) {
    serializeOption(value, pos, serializeStringLiteral, 4);
}

function serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(
    node,
    pos
) {
    switch (node.type) {
        case "ClassExpression":
            serializeEnum(node, pos, 0, serializeClassExpression, 4);
            break;
        case "FunctionExpression":
            serializeEnum(node, pos, 1, serializeFunctionExpression, 4);
            break;
        case "TsInterfaceDeclaration":
            serializeEnum(node, pos, 2, serializeTsInterfaceDeclaration, 4);
            break;
        default:
            throw new Error(
                "Unexpected enum option type for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration"
            );
    }
}

function serialize(ast) {
    uint32[0] = 1;
    buffPos = 40;
    serializeProgram(ast, 4);
    const pos = allocAligned(4, 4);
    uint32[pos >>> 2] = 4294967296 - pos;
    return subarray.call(buff, 0, pos + 4);
}
const { subarray } = Buffer.prototype;

function serializeEnum(node, pos, id, serialize, offset) {
    uint32[pos >>> 2] = id;
    serialize(node, pos + offset);
}

function serializeOption(value, pos, serialize, offset) {
    if (value === null) {
        buff[pos] = 0;
    } else {
        buff[pos] = 1;
        serialize(value, pos + offset);
    }
}

function serializeBox(value, pos, serialize, valueLength, valueAlign) {
    const valuePos = allocAligned(valueLength, valueAlign);
    uint32[pos >>> 2] = valuePos - pos;
    serialize(value, valuePos);
}

function serializeVec(values, pos, serialize, valueLength, valueAlign) {
    const numValues = values.length,
        pos32 = pos >>> 2;
    if (numValues === 0) {
        alignPos(valueAlign);
        uint32[pos32] = buffPos - pos;
        uint32[pos32 + 1] = 0;
        return;
    }
    let valuePos = allocAligned(valueLength * numValues, valueAlign);
    uint32[pos32] = valuePos - pos;
    uint32[pos32 + 1] = numValues;
    let i = 0;
    while (true) {
        serialize(values[i], valuePos);
        if (++i === numValues) break;
        valuePos += valueLength;
    }
}

function resetBuffer() {
    buffLen = 65536;
    initBuffer();
}

function initBuffer() {
    buff = Buffer.allocUnsafeSlow(buffLen);
    const arrayBuffer = buff.buffer;
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

function alloc(bytes) {
    const startPos = buffPos;
    buffPos += bytes;
    if (buffPos > buffLen) growBuffer();
    return startPos;
}

function allocAligned(bytes, align) {
    alignPos(align);
    return alloc(bytes);
}

function alignPos(align) {
    if (align !== 1) {
        const modulus = buffPos & (align - 1);
        if (modulus !== 0) buffPos += align - modulus;
    }
}

function growBuffer() {
    do {
        buffLen *= 2;
    } while (buffLen < buffPos);
    if (buffLen > 2147483648) {
        throw new Error("Exceeded maximum serialization buffer size");
    }
    const oldBuff = buff;
    initBuffer();
    setBuff.call(buff, oldBuff);
}
const setBuff = Buffer.prototype.set;

function writeShortStringToBuffer(str, pos, strLen) {
    let strPos = 0;
    do {
        const c = charCodeAt.call(str, strPos);
        if (c >= 128) return false;
        buff[pos++] = c;
    } while (++strPos < strLen);
    return true;
}

function writeStringToBuffer(str, buff, strLen, pos) {
    let strPos = 0;
    do {
        const c = charCodeAt.call(str, strPos);
        if (c >= 128) return utf8Write.call(buff, str, pos - strPos);
        buff[pos++] = c;
    } while (++strPos < strLen);
    return strLen;
}
const { charCodeAt } = String.prototype;

function writeAsciiStringToBuffer(str, buff, strLen, pos) {
    let strPos = 0;
    do {
        buff[pos++] = charCodeAt.call(str, strPos);
    } while (++strPos < strLen);
}

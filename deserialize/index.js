// Generated code. Do not edit.

'use strict';

const assert = require('assert');

module.exports = deserialialize;

function deserialialize(buff) {
    return deserializeProgram(buff, buff.length - 36);
}

function deserializeProgram(buff, pos) {
    const deserialize = enumOptionsProgram[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsProgram = [
    deserializeModule,
    deserializeScript
];

function deserializeModule(buff, pos) {
    return {
        type: 'Module',
        span: deserializeSpan(buff, pos),
        body: deserializeVecModuleDeclarationOrStatement(buff, pos + 12),
        interpreter: deserializeOptionJsWord(buff, pos + 20)
    };
}

function deserializeScript(buff, pos) {
    return {
        type: 'Script',
        span: deserializeSpan(buff, pos),
        body: deserializeVecStatement(buff, pos + 12),
        interpreter: deserializeOptionJsWord(buff, pos + 20)
    };
}

function deserializeModuleDeclaration(buff, pos) {
    const deserialize = enumOptionsModuleDeclaration[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsModuleDeclaration = [
    deserializeImportDeclaration,
    deserializeExportDeclaration,
    deserializeExportNamedDeclaration,
    deserializeExportDefaultDeclaration,
    deserializeExportDefaultExpression,
    deserializeExportAllDeclaration,
    deserializeTsImportEqualsDeclaration,
    deserializeTsExportAssignment,
    deserializeTsNamespaceExportDeclaration
];

function deserializeImportDeclaration(buff, pos) {
    return {
        type: 'ImportDeclaration',
        span: deserializeSpan(buff, pos),
        specifiers: deserializeVecImportSpecifier(buff, pos + 12),
        source: deserializeStringLiteral(buff, pos + 20),
        typeOnly: deserializeBoolean(buff, pos + 52),
        asserts: deserializeOptionObjectExpression(buff, pos + 56)
    };
}

function deserializeImportSpecifier(buff, pos) {
    const deserialize = enumOptionsImportSpecifier[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsImportSpecifier = [
    deserializeImportNamedSpecifier,
    deserializeImportDefaultSpecifier,
    deserializeImportNamespaceSpecifier
];

function deserializeImportNamedSpecifier(buff, pos) {
    return {
        type: 'ImportSpecifier',
        span: deserializeSpan(buff, pos),
        local: deserializeIdentifier(buff, pos + 12),
        imported: deserializeOptionModuleExportName(buff, pos + 36),
        isTypeOnly: deserializeBoolean(buff, pos + 76)
    };
}

function deserializeImportDefaultSpecifier(buff, pos) {
    return {
        type: 'ImportDefaultSpecifier',
        span: deserializeSpan(buff, pos),
        local: deserializeIdentifier(buff, pos + 12)
    };
}

function deserializeImportNamespaceSpecifier(buff, pos) {
    return {
        type: 'ImportNamespaceSpecifier',
        span: deserializeSpan(buff, pos),
        local: deserializeIdentifier(buff, pos + 12)
    };
}

function deserializeExportDeclaration(buff, pos) {
    return {
        type: 'ExportDeclaration',
        span: deserializeSpan(buff, pos),
        declaration: deserializeDeclaration(buff, pos + 12)
    };
}

function deserializeExportNamedDeclaration(buff, pos) {
    return {
        type: 'ExportNamedDeclaration',
        span: deserializeSpan(buff, pos),
        specifiers: deserializeVecExportSpecifier(buff, pos + 12),
        source: deserializeOptionStringLiteral(buff, pos + 20),
        typeOnly: deserializeBoolean(buff, pos + 56),
        asserts: deserializeOptionObjectExpression(buff, pos + 60)
    };
}

function deserializeExportSpecifier(buff, pos) {
    const deserialize = enumOptionsExportSpecifier[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsExportSpecifier = [
    deserializeExportNamespaceSpecifier,
    deserializeExportDefaultSpecifier,
    deserializeExportNamedSpecifier
];

function deserializeExportNamespaceSpecifier(buff, pos) {
    return {
        type: 'ExportNamespaceSpecifier',
        span: deserializeSpan(buff, pos),
        name: deserializeModuleExportName(buff, pos + 12)
    };
}

function deserializeExportDefaultSpecifier(buff, pos) {
    return {
        type: 'ExportDefaultSpecifier',
        span: deserializeSpan(buff, pos),
        exported: deserializeIdentifier(buff, pos + 12)
    };
}

function deserializeExportNamedSpecifier(buff, pos) {
    return {
        type: 'ExportSpecifier',
        span: deserializeSpan(buff, pos),
        orig: deserializeModuleExportName(buff, pos + 12),
        exported: deserializeOptionModuleExportName(buff, pos + 48),
        isTypeOnly: deserializeBoolean(buff, pos + 88)
    };
}

function deserializeExportDefaultDeclaration(buff, pos) {
    return {
        type: 'ExportDefaultDeclaration',
        span: deserializeSpan(buff, pos),
        decl: deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(buff, pos + 12)
    };
}

function deserializeExportDefaultExpression(buff, pos) {
    return {
        type: 'ExportDefaultExpression',
        span: deserializeSpan(buff, pos),
        expression: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeExportAllDeclaration(buff, pos) {
    return {
        type: 'ExportAllDeclaration',
        span: deserializeSpan(buff, pos),
        source: deserializeStringLiteral(buff, pos + 12),
        asserts: deserializeOptionObjectExpression(buff, pos + 44)
    };
}

function deserializeModuleExportName(buff, pos) {
    const deserialize = enumOptionsModuleExportName[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsModuleExportName = [
    deserializeIdentifier,
    deserializeStringLiteral
];

function deserializeStatement(buff, pos) {
    const deserialize = enumOptionsStatement[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsStatement = [
    deserializeBlockStatement,
    deserializeEmptyStatement,
    deserializeDebuggerStatement,
    deserializeWithStatement,
    deserializeReturnStatement,
    deserializeLabeledStatement,
    deserializeBreakStatement,
    deserializeContinueStatement,
    deserializeIfStatement,
    deserializeSwitchStatement,
    deserializeThrowStatement,
    deserializeTryStatement,
    deserializeWhileStatement,
    deserializeDoWhileStatement,
    deserializeForStatement,
    deserializeForInStatement,
    deserializeForOfStatement,
    deserializeDeclaration,
    deserializeExpressionStatement
];

function deserializeBlockStatement(buff, pos) {
    return {
        type: 'BlockStatement',
        span: deserializeSpan(buff, pos),
        stmts: deserializeVecStatement(buff, pos + 12)
    };
}

function deserializeOptionBlockStatement(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeBlockStatement(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeEmptyStatement(buff, pos) {
    return {
        type: 'EmptyStatement',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeDebuggerStatement(buff, pos) {
    return {
        type: 'DebuggerStatement',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeWithStatement(buff, pos) {
    return {
        type: 'WithStatement',
        span: deserializeSpan(buff, pos),
        object: deserializeBoxExpression(buff, pos + 12),
        body: deserializeBoxStatement(buff, pos + 16)
    };
}

function deserializeReturnStatement(buff, pos) {
    return {
        type: 'ReturnStatement',
        span: deserializeSpan(buff, pos),
        argument: deserializeOptionBoxExpression(buff, pos + 12)
    };
}

function deserializeLabeledStatement(buff, pos) {
    return {
        type: 'LabeledStatement',
        span: deserializeSpan(buff, pos),
        label: deserializeIdentifier(buff, pos + 12),
        body: deserializeBoxStatement(buff, pos + 36)
    };
}

function deserializeBreakStatement(buff, pos) {
    return {
        type: 'BreakStatement',
        span: deserializeSpan(buff, pos),
        label: deserializeOptionIdentifier(buff, pos + 12)
    };
}

function deserializeContinueStatement(buff, pos) {
    return {
        type: 'ContinueStatement',
        span: deserializeSpan(buff, pos),
        label: deserializeOptionIdentifier(buff, pos + 12)
    };
}

function deserializeIfStatement(buff, pos) {
    return {
        type: 'IfStatement',
        span: deserializeSpan(buff, pos),
        test: deserializeBoxExpression(buff, pos + 12),
        consequent: deserializeBoxStatement(buff, pos + 16),
        alternate: deserializeOptionBoxStatement(buff, pos + 20)
    };
}

function deserializeSwitchStatement(buff, pos) {
    return {
        type: 'SwitchStatement',
        span: deserializeSpan(buff, pos),
        discriminant: deserializeBoxExpression(buff, pos + 12),
        cases: deserializeVecSwitchCase(buff, pos + 16)
    };
}

function deserializeSwitchCase(buff, pos) {
    return {
        type: 'SwitchCase',
        span: deserializeSpan(buff, pos),
        test: deserializeOptionBoxExpression(buff, pos + 12),
        consequent: deserializeVecStatement(buff, pos + 20)
    };
}

function deserializeThrowStatement(buff, pos) {
    return {
        type: 'ThrowStatement',
        span: deserializeSpan(buff, pos),
        argument: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeTryStatement(buff, pos) {
    return {
        type: 'TryStatement',
        span: deserializeSpan(buff, pos),
        block: deserializeBlockStatement(buff, pos + 12),
        handler: deserializeOptionCatchClause(buff, pos + 32),
        finalizer: deserializeOptionBlockStatement(buff, pos + 124)
    };
}

function deserializeCatchClause(buff, pos) {
    return {
        type: 'CatchClause',
        span: deserializeSpan(buff, pos),
        param: deserializeOptionPattern(buff, pos + 12),
        body: deserializeBlockStatement(buff, pos + 68)
    };
}

function deserializeWhileStatement(buff, pos) {
    return {
        type: 'WhileStatement',
        span: deserializeSpan(buff, pos),
        test: deserializeBoxExpression(buff, pos + 12),
        body: deserializeBoxStatement(buff, pos + 16)
    };
}

function deserializeDoWhileStatement(buff, pos) {
    return {
        type: 'DoWhileStatement',
        span: deserializeSpan(buff, pos),
        test: deserializeBoxExpression(buff, pos + 12),
        body: deserializeBoxStatement(buff, pos + 16)
    };
}

function deserializeForStatement(buff, pos) {
    return {
        type: 'ForStatement',
        span: deserializeSpan(buff, pos),
        init: deserializeOptionVariableDeclarationOrBoxExpression(buff, pos + 12),
        test: deserializeOptionBoxExpression(buff, pos + 44),
        update: deserializeOptionBoxExpression(buff, pos + 52),
        body: deserializeBoxStatement(buff, pos + 60)
    };
}

function deserializeForInStatement(buff, pos) {
    return {
        type: 'ForInStatement',
        span: deserializeSpan(buff, pos),
        left: deserializeVariableDeclarationOrPattern(buff, pos + 12),
        right: deserializeBoxExpression(buff, pos + 68),
        body: deserializeBoxStatement(buff, pos + 72)
    };
}

function deserializeForOfStatement(buff, pos) {
    return {
        type: 'ForOfStatement',
        span: deserializeSpan(buff, pos),
        await: deserializeOptionSpan(buff, pos + 12),
        left: deserializeVariableDeclarationOrPattern(buff, pos + 28),
        right: deserializeBoxExpression(buff, pos + 84),
        body: deserializeBoxStatement(buff, pos + 88)
    };
}

function deserializeExpressionStatement(buff, pos) {
    return {
        type: 'ExpressionStatement',
        span: deserializeSpan(buff, pos),
        expression: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeDeclaration(buff, pos) {
    const deserialize = enumOptionsDeclaration[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsDeclaration = [
    deserializeClassDeclaration,
    deserializeFunctionDeclaration,
    deserializeVariableDeclaration,
    deserializeTsInterfaceDeclaration,
    deserializeTsTypeAliasDeclaration,
    deserializeTsEnumDeclaration,
    deserializeTsModuleDeclaration
];

function deserializeVariableDeclaration(buff, pos) {
    return {
        type: 'VariableDeclaration',
        span: deserializeSpan(buff, pos),
        kind: deserializeVariableDeclarationKind(buff, pos + 12),
        declare: deserializeBooleanBitAnd2Empty(buff, pos + 13),
        declarations: deserializeVecVariableDeclarator(buff, pos + 16)
    };
}

function deserializeVariableDeclarationKind(buff, pos) {
    const opt = buff.readUInt8(pos);
    const value = enumOptionsVariableDeclarationKind[opt];
    assert(value);
    return value;
}

const enumOptionsVariableDeclarationKind = ['var', 'let', 'const'];

function deserializeVariableDeclarator(buff, pos) {
    return {
        type: 'VariableDeclarator',
        span: deserializeSpan(buff, pos),
        id: deserializePattern(buff, pos + 12),
        init: deserializeOptionBoxExpression(buff, pos + 64),
        definite: deserializeBoolean(buff, pos + 72)
    };
}

function deserializeFunctionDeclaration(buff, pos) {
    return {
        type: 'FunctionDeclaration',
        identifier: deserializeIdentifier(buff, pos),
        declare: deserializeBoolean(buff, pos + 24),
        params: deserializeVecParameter(buff, pos + 28),
        decorators: deserializeVecDecorator(buff, pos + 36),
        span: deserializeSpan(buff, pos + 44),
        body: deserializeOptionBlockStatement(buff, pos + 56),
        generator: deserializeBooleanBit(buff, pos + 104),
        async: deserializeBooleanBitAnd2Empty(buff, pos + 105),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, pos + 80),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 108)
    };
}

function deserializeFunctionExpression(buff, pos) {
    return {
        type: 'FunctionExpression',
        identifier: deserializeOptionIdentifier(buff, pos),
        params: deserializeVecParameter(buff, pos + 28),
        decorators: deserializeVecDecorator(buff, pos + 36),
        span: deserializeSpan(buff, pos + 44),
        body: deserializeOptionBlockStatement(buff, pos + 56),
        generator: deserializeBooleanBit(buff, pos + 104),
        async: deserializeBooleanBitAnd2Empty(buff, pos + 105),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, pos + 80),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 108)
    };
}

function deserializeArrowFunctionExpression(buff, pos) {
    return {
        type: 'ArrowFunctionExpression',
        span: deserializeSpan(buff, pos),
        params: deserializeVecPattern(buff, pos + 12),
        body: deserializeBlockStatementOrBoxExpression(buff, pos + 20),
        async: deserializeBooleanBit(buff, pos + 68),
        generator: deserializeBooleanBitAnd2Empty(buff, pos + 69),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, pos + 44),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 72)
    };
}

function deserializeParameter(buff, pos) {
    return {
        type: 'Parameter',
        span: deserializeSpan(buff, pos),
        decorators: deserializeVecDecorator(buff, pos + 12),
        pat: deserializePattern(buff, pos + 20)
    };
}

function deserializeDecorator(buff, pos) {
    return {
        type: 'Decorator',
        span: deserializeSpan(buff, pos),
        expression: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeClassDeclaration(buff, pos) {
    return {
        type: 'ClassDeclaration',
        identifier: deserializeIdentifier(buff, pos),
        declare: deserializeBoolean(buff, pos + 24),
        span: deserializeSpan(buff, pos + 28),
        decorators: deserializeVecDecorator(buff, pos + 40),
        body: deserializeVecClassMember(buff, pos + 48),
        superClass: deserializeOptionBoxExpression(buff, pos + 56),
        isAbstract: deserializeBoolean(buff, pos + 64),
        typeParams: deserializeOptionTsTypeParamDeclaration(buff, pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(buff, pos + 92),
        implements: deserializeVecTsExpressionWithTypeArg(buff, pos + 116)
    };
}

function deserializeClassExpression(buff, pos) {
    return {
        type: 'ClassExpression',
        identifier: deserializeOptionIdentifier(buff, pos),
        span: deserializeSpan(buff, pos + 28),
        decorators: deserializeVecDecorator(buff, pos + 40),
        body: deserializeVecClassMember(buff, pos + 48),
        superClass: deserializeOptionBoxExpression(buff, pos + 56),
        isAbstract: deserializeBoolean(buff, pos + 64),
        typeParams: deserializeOptionTsTypeParamDeclaration(buff, pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(buff, pos + 92),
        implements: deserializeVecTsExpressionWithTypeArg(buff, pos + 116)
    };
}

function deserializeClassMember(buff, pos) {
    const deserialize = enumOptionsClassMember[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsClassMember = [
    deserializeConstructor,
    deserializeClassMethod,
    deserializePrivateMethod,
    deserializeClassProperty,
    deserializePrivateProperty,
    deserializeTsIndexSignature,
    deserializeEmptyStatement,
    deserializeStaticBlock
];

function deserializeConstructor(buff, pos) {
    return {
        type: 'Constructor',
        span: deserializeSpan(buff, pos + 44),
        key: deserializePropertyName(buff, pos),
        params: deserializeVecTsParamPropOrParameter(buff, pos + 56),
        body: deserializeOptionBlockStatement(buff, pos + 64),
        accessibility: deserializeOptionAccessibility(buff, pos + 88),
        isOptional: deserializeBoolean(buff, pos + 90)
    };
}

function deserializeClassMethod(buff, pos) {
    return {
        type: 'ClassMethod',
        span: deserializeSpan(buff, pos + 44),
        key: deserializePropertyName(buff, pos),
        function: deserializeFunction(buff, pos + 56),
        kind: deserializeMethodKind(buff, pos + 156),
        isStatic: deserializeBooleanBit(buff, pos + 157),
        accessibility: deserializeOptionAccessibility(buff, pos + 160),
        isAbstract: deserializeBooleanBit(buff, pos + 158),
        isOptional: deserializeBooleanBit(buff, pos + 159),
        isOverride: deserializeBooleanBitAnd1Empty(buff, pos + 162)
    };
}

function deserializePrivateMethod(buff, pos) {
    return {
        type: 'PrivateMethod',
        span: deserializeSpan(buff, pos),
        key: deserializePrivateName(buff, pos + 12),
        function: deserializeFunction(buff, pos + 48),
        kind: deserializeMethodKind(buff, pos + 148),
        isStatic: deserializeBooleanBit(buff, pos + 149),
        accessibility: deserializeOptionAccessibility(buff, pos + 152),
        isAbstract: deserializeBooleanBit(buff, pos + 150),
        isOptional: deserializeBooleanBit(buff, pos + 151),
        isOverride: deserializeBooleanBitAnd1Empty(buff, pos + 154)
    };
}

function deserializeClassProperty(buff, pos) {
    return {
        type: 'ClassProperty',
        span: deserializeSpan(buff, pos + 44),
        key: deserializePropertyName(buff, pos),
        value: deserializeOptionBoxExpression(buff, pos + 56),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 64),
        isStatic: deserializeBoolean(buff, pos + 92),
        decorators: deserializeVecDecorator(buff, pos + 84),
        accessibility: deserializeOptionAccessibility(buff, pos + 96),
        isAbstract: deserializeBooleanBit(buff, pos + 98),
        isOptional: deserializeBooleanBit(buff, pos + 99),
        isOverride: deserializeBooleanBit(buff, pos + 100),
        readonly: deserializeBooleanBit(buff, pos + 101),
        declare: deserializeBooleanBit(buff, pos + 102),
        definite: deserializeBooleanBit(buff, pos + 103)
    };
}

function deserializePrivateProperty(buff, pos) {
    return {
        type: 'PrivateProperty',
        span: deserializeSpan(buff, pos),
        key: deserializePrivateName(buff, pos + 12),
        value: deserializeOptionBoxExpression(buff, pos + 48),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 56),
        isStatic: deserializeBoolean(buff, pos + 84),
        decorators: deserializeVecDecorator(buff, pos + 76),
        accessibility: deserializeOptionAccessibility(buff, pos + 88),
        isOptional: deserializeBooleanBit(buff, pos + 90),
        isOverride: deserializeBooleanBit(buff, pos + 91),
        readonly: deserializeBooleanBit(buff, pos + 92),
        definite: deserializeBooleanBitAnd1Empty(buff, pos + 93)
    };
}

function deserializeStaticBlock(buff, pos) {
    return {
        type: 'StaticBlock',
        span: deserializeSpan(buff, pos),
        body: deserializeBlockStatement(buff, pos + 12)
    };
}

function deserializeMethodKind(buff, pos) {
    const opt = buff.readUInt8(pos);
    const value = enumOptionsMethodKind[opt];
    assert(value);
    return value;
}

const enumOptionsMethodKind = ['method', 'getter', 'setter'];

function deserializeFunction(buff, pos) {
    return {
        params: deserializeVecParameter(buff, pos),
        decorators: deserializeVecDecorator(buff, pos + 8),
        span: deserializeSpan(buff, pos + 16),
        body: deserializeOptionBlockStatement(buff, pos + 28),
        generator: deserializeBooleanBit(buff, pos + 76),
        async: deserializeBooleanBitAnd2Empty(buff, pos + 77),
        typeParameters: deserializeOptionTsTypeParamDeclaration(buff, pos + 52),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 80)
    };
}

function deserializePattern(buff, pos) {
    const deserialize = enumOptionsPattern[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsPattern = [
    deserializeBindingIdentifier,
    deserializeArrayPattern,
    deserializeRestElement,
    deserializeObjectPattern,
    deserializeAssignmentPattern,
    deserializeInvalid,
    deserializeBoxExpression
];

function deserializeBindingIdentifier(buff, pos) {
    return {
        type: 'Identifier',
        span: deserializeSpan(buff, pos),
        value: deserializeJsWord(buff, pos + 12),
        optional: deserializeBoolean(buff, pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 24)
    };
}

function deserializeArrayPattern(buff, pos) {
    return {
        type: 'ArrayPattern',
        span: deserializeSpan(buff, pos),
        elements: deserializeVecOptionPattern(buff, pos + 12),
        optional: deserializeBoolean(buff, pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 24)
    };
}

function deserializeRestElement(buff, pos) {
    return {
        type: 'RestElement',
        span: deserializeSpan(buff, pos),
        rest: deserializeSpan(buff, pos + 12),
        argument: deserializeBoxPattern(buff, pos + 24),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 28)
    };
}

function deserializeObjectPattern(buff, pos) {
    return {
        type: 'ObjectPattern',
        span: deserializeSpan(buff, pos),
        properties: deserializeVecObjectPatternProperty(buff, pos + 12),
        optional: deserializeBoolean(buff, pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 24)
    };
}

function deserializeObjectPatternProperty(buff, pos) {
    const deserialize = enumOptionsObjectPatternProperty[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsObjectPatternProperty = [
    deserializeKeyValuePatternProperty,
    deserializeAssignmentPatternProperty,
    deserializeRestElement
];

function deserializeKeyValuePatternProperty(buff, pos) {
    return {
        type: 'KeyValuePatternProperty',
        key: deserializePropertyName(buff, pos),
        value: deserializeBoxPattern(buff, pos + 44)
    };
}

function deserializeAssignmentPatternProperty(buff, pos) {
    return {
        type: 'AssignmentPatternProperty',
        span: deserializeSpan(buff, pos),
        key: deserializeIdentifier(buff, pos + 12),
        value: deserializeOptionBoxExpression(buff, pos + 36)
    };
}

function deserializeAssignmentPattern(buff, pos) {
    return {
        type: 'AssignmentPattern',
        span: deserializeSpan(buff, pos),
        left: deserializeBoxPattern(buff, pos + 12),
        right: deserializeBoxExpression(buff, pos + 16),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 20)
    };
}

function deserializeExpression(buff, pos) {
    const deserialize = enumOptionsExpression[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsExpression = [
    deserializeThisExpression,
    deserializeArrayExpression,
    deserializeObjectExpression,
    deserializeFunctionExpression,
    deserializeUnaryExpression,
    deserializeUpdateExpression,
    deserializeBinaryExpression,
    deserializeAssignmentExpression,
    deserializeMemberExpression,
    deserializeSuperPropExpression,
    deserializeConditionalExpression,
    deserializeCallExpression,
    deserializeNewExpression,
    deserializeSequenceExpression,
    deserializeIdentifier,
    deserializeLiteral,
    deserializeTemplateLiteral,
    deserializeTaggedTemplateExpression,
    deserializeArrowFunctionExpression,
    deserializeClassExpression,
    deserializeYieldExpression,
    deserializeMetaProperty,
    deserializeAwaitExpression,
    deserializeParenthesisExpression,
    deserializeJSXMemberExpression,
    deserializeJSXNamespacedName,
    deserializeJSXEmptyExpression,
    deserializeJSXElement,
    deserializeJSXFragment,
    deserializeTsTypeAssertion,
    deserializeTsConstAssertion,
    deserializeTsNonNullExpression,
    deserializeTsAsExpression,
    deserializeTsInstantiation,
    deserializePrivateName,
    deserializeOptionalChainingExpression,
    deserializeInvalid
];

function deserializeThisExpression(buff, pos) {
    return {
        type: 'ThisExpression',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeArrayExpression(buff, pos) {
    return {
        type: 'ArrayExpression',
        span: deserializeSpan(buff, pos),
        elements: deserializeVecOptionExpressionOrSpread(buff, pos + 12)
    };
}

function deserializeUnaryExpression(buff, pos) {
    return {
        type: 'UnaryExpression',
        span: deserializeSpan(buff, pos),
        operator: deserializeUnaryOperator(buff, pos + 12),
        argument: deserializeBoxExpression(buff, pos + 16)
    };
}

function deserializeUnaryOperator(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    const value = enumOptionsUnaryOperator[opt];
    assert(value);
    return value;
}

const enumOptionsUnaryOperator = ['-', '+', '!', '~', 'typeof', 'void', 'delete'];

function deserializeUpdateExpression(buff, pos) {
    return {
        type: 'UpdateExpression',
        span: deserializeSpan(buff, pos),
        operator: deserializeUpdateOperator(buff, pos + 12),
        prefix: deserializeBooleanBitAnd2Empty(buff, pos + 13),
        argument: deserializeBoxExpression(buff, pos + 16)
    };
}

function deserializeUpdateOperator(buff, pos) {
    const opt = buff.readUInt8(pos);
    const value = enumOptionsUpdateOperator[opt];
    assert(value);
    return value;
}

const enumOptionsUpdateOperator = ['++', '--'];

function deserializeBinaryExpression(buff, pos) {
    return {
        type: 'BinaryExpression',
        span: deserializeSpan(buff, pos),
        operator: deserializeBinaryOperator(buff, pos + 16),
        left: deserializeBoxExpression(buff, pos + 12),
        right: deserializeBoxExpression(buff, pos + 20)
    };
}

function deserializeBinaryOperator(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    const value = enumOptionsBinaryOperator[opt];
    assert(value);
    return value;
}

const enumOptionsBinaryOperator = ['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', '||', '&&', 'in', 'instanceof', '**', '??'];

function deserializeAssignmentExpression(buff, pos) {
    return {
        type: 'AssignmentExpression',
        span: deserializeSpan(buff, pos),
        operator: deserializeAssignmentOperator(buff, pos + 20),
        left: deserializeBoxExpressionOrBoxPattern(buff, pos + 12),
        right: deserializeBoxExpression(buff, pos + 24)
    };
}

function deserializeAssignmentOperator(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    const value = enumOptionsAssignmentOperator[opt];
    assert(value);
    return value;
}

const enumOptionsAssignmentOperator = ['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=', '**=', '&&=', '||=', '??='];

function deserializeMemberExpression(buff, pos) {
    return {
        type: 'MemberExpression',
        span: deserializeSpan(buff, pos),
        object: deserializeBoxExpression(buff, pos + 12),
        property: deserializeIdentifierOrPrivateNameOrComputed(buff, pos + 16)
    };
}

function deserializeSuperPropExpression(buff, pos) {
    return {
        type: 'SuperPropExpression',
        span: deserializeSpan(buff, pos),
        obj: deserializeSuper(buff, pos + 12),
        property: deserializeIdentifierOrComputed(buff, pos + 24)
    };
}

function deserializeConditionalExpression(buff, pos) {
    return {
        type: 'ConditionalExpression',
        span: deserializeSpan(buff, pos),
        test: deserializeBoxExpression(buff, pos + 12),
        consequent: deserializeBoxExpression(buff, pos + 16),
        alternate: deserializeBoxExpression(buff, pos + 20)
    };
}

function deserializeCallExpression(buff, pos) {
    return {
        type: 'CallExpression',
        span: deserializeSpan(buff, pos),
        callee: deserializeSuperOrImportOrBoxExpression(buff, pos + 12),
        arguments: deserializeVecExpressionOrSpread(buff, pos + 28),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(buff, pos + 36)
    };
}

function deserializeNewExpression(buff, pos) {
    return {
        type: 'NewExpression',
        span: deserializeSpan(buff, pos),
        callee: deserializeBoxExpression(buff, pos + 12),
        arguments: deserializeOptionVecExpressionOrSpread(buff, pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(buff, pos + 28)
    };
}

function deserializeSequenceExpression(buff, pos) {
    return {
        type: 'SequenceExpression',
        span: deserializeSpan(buff, pos),
        expressions: deserializeVecBoxExpression(buff, pos + 12)
    };
}

function deserializeIdentifier(buff, pos) {
    return {
        type: 'Identifier',
        span: deserializeSpan(buff, pos),
        value: deserializeJsWord(buff, pos + 12),
        optional: deserializeBoolean(buff, pos + 20)
    };
}

function deserializeTemplateLiteral(buff, pos) {
    return {
        type: 'TemplateLiteral',
        span: deserializeSpan(buff, pos),
        expressions: deserializeVecBoxExpression(buff, pos + 12),
        quasis: deserializeVecTemplateElement(buff, pos + 20)
    };
}

function deserializeTemplateElement(buff, pos) {
    return {
        type: 'TemplateElement',
        span: deserializeSpan(buff, pos),
        tail: deserializeBoolean(buff, pos + 24),
        cooked: deserializeOptionJsWord(buff, pos + 12),
        raw: deserializeJsWord(buff, pos + 28)
    };
}

function deserializeTaggedTemplateExpression(buff, pos) {
    return {
        type: 'TaggedTemplateExpression',
        span: deserializeSpan(buff, pos),
        tag: deserializeBoxExpression(buff, pos + 12),
        typeParameters: deserializeOptionTsTypeParameterInstantiation(buff, pos + 16),
        template: deserializeTemplateLiteral(buff, pos + 40)
    };
}

function deserializeYieldExpression(buff, pos) {
    return {
        type: 'YieldExpression',
        span: deserializeSpan(buff, pos),
        argument: deserializeOptionBoxExpression(buff, pos + 12),
        delegate: deserializeBoolean(buff, pos + 20)
    };
}

function deserializeMetaProperty(buff, pos) {
    return {
        type: 'MetaProperty',
        span: deserializeSpan(buff, pos),
        kind: deserializeMetaPropertyKind(buff, pos + 12)
    };
}

function deserializeMetaPropertyKind(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    const value = enumOptionsMetaPropertyKind[opt];
    assert(value);
    return value;
}

const enumOptionsMetaPropertyKind = ['new.target', 'import.meta'];

function deserializeAwaitExpression(buff, pos) {
    return {
        type: 'AwaitExpression',
        span: deserializeSpan(buff, pos),
        argument: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeParenthesisExpression(buff, pos) {
    return {
        type: 'ParenthesisExpression',
        span: deserializeSpan(buff, pos),
        expression: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializePrivateName(buff, pos) {
    return {
        type: 'PrivateName',
        span: deserializeSpan(buff, pos),
        id: deserializeIdentifier(buff, pos + 12)
    };
}

function deserializeOptionalChainingExpression(buff, pos) {
    return {
        type: 'OptionalChainingExpression',
        span: deserializeSpan(buff, pos),
        questionDotToken: deserializeSpan(buff, pos + 12),
        base: deserializeMemberExpressionOrOptionalChainingCall(buff, pos + 24)
    };
}

function deserializeOptionalChainingCall(buff, pos) {
    return {
        type: 'CallExpression',
        span: deserializeSpan(buff, pos),
        callee: deserializeBoxExpression(buff, pos + 12),
        arguments: deserializeVecExpressionOrSpread(buff, pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(buff, pos + 24)
    };
}

function deserializeSuper(buff, pos) {
    return {
        type: 'Super',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeImport(buff, pos) {
    return {
        type: 'Import',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeInvalid(buff, pos) {
    return {
        type: 'Invalid',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeComputed(buff, pos) {
    return {
        type: 'Computed',
        span: deserializeSpan(buff, pos),
        expression: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeExpressionOrSpread(buff, pos) {
    return {
        spread: deserializeOptionSpan(buff, pos),
        expression: deserializeBoxExpression(buff, pos + 16)
    };
}

function deserializeObjectExpression(buff, pos) {
    return {
        type: 'ObjectExpression',
        span: deserializeSpan(buff, pos),
        properties: deserializeVecSpreadElementOrBoxObjectProperty(buff, pos + 12)
    };
}

function deserializeSpreadElement(buff, pos) {
    return {
        type: 'SpreadElement',
        spread: deserializeSpan(buff, pos),
        arguments: deserializeBoxExpression(buff, pos + 12)
    };
}

function deserializeObjectProperty(buff, pos) {
    const deserialize = enumOptionsObjectProperty[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsObjectProperty = [
    deserializeIdentifier,
    deserializeKeyValueProperty,
    deserializeAssignmentProperty,
    deserializeGetterProperty,
    deserializeSetterProperty,
    deserializeMethodProperty
];

function deserializeKeyValueProperty(buff, pos) {
    return {
        type: 'KeyValueProperty',
        key: deserializePropertyName(buff, pos),
        value: deserializeBoxExpression(buff, pos + 44)
    };
}

function deserializeAssignmentProperty(buff, pos) {
    return {
        type: 'AssignmentProperty',
        span: deserializeSpan(buff, pos),
        key: deserializeIdentifier(buff, pos + 12),
        value: deserializeBoxExpression(buff, pos + 36)
    };
}

function deserializeGetterProperty(buff, pos) {
    return {
        type: 'GetterProperty',
        span: deserializeSpan(buff, pos + 44),
        key: deserializePropertyName(buff, pos),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, pos + 56),
        body: deserializeOptionBlockStatement(buff, pos + 76)
    };
}

function deserializeSetterProperty(buff, pos) {
    return {
        type: 'SetterProperty',
        span: deserializeSpan(buff, pos + 44),
        key: deserializePropertyName(buff, pos),
        param: deserializePattern(buff, pos + 56),
        body: deserializeOptionBlockStatement(buff, pos + 108)
    };
}

function deserializeMethodProperty(buff, pos) {
    return {
        type: 'MethodProperty',
        key: deserializePropertyName(buff, pos),
        params: deserializeVecParameter(buff, pos + 44),
        decorators: deserializeVecDecorator(buff, pos + 52),
        span: deserializeSpan(buff, pos + 60),
        body: deserializeOptionBlockStatement(buff, pos + 72),
        generator: deserializeBooleanBit(buff, pos + 120),
        async: deserializeBooleanBitAnd2Empty(buff, pos + 121),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, pos + 96),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 124)
    };
}

function deserializePropertyName(buff, pos) {
    return deserializePropertyNameWrapped(buff, pos + 4);
}

function deserializePropertyNameWrapped(buff, pos) {
    const deserialize = enumOptionsPropertyNameWrapped[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsPropertyNameWrapped = [
    deserializeIdentifier,
    deserializeStringLiteral,
    deserializeNumericLiteral,
    deserializeComputed,
    deserializeBigIntLiteral
];

function deserializeLiteral(buff, pos) {
    return deserializeLiteralWrapped(buff, pos + 4); // TODO Not sure why +4
}

function deserializeLiteralWrapped(buff, pos) {
    const deserialize = enumOptionsLiteralWrapped[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsLiteralWrapped = [
    deserializeStringLiteral,
    deserializeBooleanLiteral,
    deserializeNullLiteral,
    deserializeNumericLiteral,
    deserializeBigIntLiteral,
    deserializeRegExpLiteral,
    deserializeJSXText
];

function deserializeStringLiteral(buff, pos) {
    return {
        type: 'StringLiteral',
        span: deserializeSpan(buff, pos),
        value: deserializeJsWord(buff, pos + 12),
        raw: deserializeOptionJsWord(buff, pos + 20)
    };
}

function deserializeBooleanLiteral(buff, pos) {
    return {
        type: 'BooleanLiteral',
        span: deserializeSpan(buff, pos),
        value: deserializeBoolean(buff, pos + 12)
    };
}

function deserializeNullLiteral(buff, pos) {
    return {
        type: 'NullLiteral',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeNumericLiteral(buff, pos) {
    return {
        type: 'NumericLiteral',
        span: deserializeSpan(buff, pos + 4), // TODO Not sure why +4
        // TODO Not sure why +4 after span
        value: new Float64Array(buff.buffer, buff.byteOffset + pos + 20, 1)[0]
    };
}

function deserializeBigIntLiteral(buff, pos) {
    return {
        type: 'BigIntLiteral',
        span: deserializeSpan(buff, pos),
        value: deserializeBigIntValue(buff, pos + 12)
    };
}

function deserializeBigIntValue(buff, pos) {
    // TODO This implementation could be more efficient
    const str = deserializeJsWord(buff, pos);
    if (str === '0') return [0, []];

    let current = BigInt(str);
    const parts = [];
    while (true) {
        const next = current >> 32n;
        if (next === 0n) {
            parts.push(Number(current));
            break;
        }

        parts.push(Number(current & 4294967295n)); // 4294967295n === (2 ** 32) - 1
        current = next;
    }

    return [1, parts]; // TODO What is the initial 1 for?
}

function deserializeRegExpLiteral(buff, pos) {
    return {
        type: 'RegExpLiteral',
        span: deserializeSpan(buff, pos),
        pattern: deserializeJsWord(buff, pos + 12),
        flags: deserializeJsWord(buff, pos + 20)
    };
}

function deserializeJSXText(buff, pos) {
    return {
        type: 'JSXText',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeJSXMemberExpression(buff, pos) {
    return {
        type: 'JSXMemberExpression',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeJSXNamespacedName(buff, pos) {
    return {
        type: 'JSXNamespacedName',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeJSXEmptyExpression(buff, pos) {
    return {
        type: 'JSXEmptyExpression',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeJSXElement(buff, pos) {
    return {
        type: 'JSXElement',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeJSXFragment(buff, pos) {
    return {
        type: 'JSXFragment',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsTypeAssertion(buff, pos) {
    return {
        type: 'TsTypeAssertion',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsConstAssertion(buff, pos) {
    return {
        type: 'TsConstAssertion',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsNonNullExpression(buff, pos) {
    return {
        type: 'TsNonNullExpression',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsAsExpression(buff, pos) {
    return {
        type: 'TsAsExpression',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsInstantiation(buff, pos) {
    return {
        type: 'TsInstantiation',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsTypeAnnotation(buff, pos) {
    return {
        type: 'TsTypeAnnotation',
        span: deserializeSpan(buff, pos),
        typeAnnotation: deserializeBoxTsType(buff, pos + 12)
    };
}

function deserializeTsInterfaceDeclaration(buff, pos) {
    return {
        type: 'TsInterfaceDeclaration',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsTypeAliasDeclaration(buff, pos) {
    return {
        type: 'TsTypeAliasDeclaration',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsEnumDeclaration(buff, pos) {
    return {
        type: 'TsEnumDeclaration',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsModuleDeclaration(buff, pos) {
    return {
        type: 'TsModuleDeclaration',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsImportEqualsDeclaration(buff, pos) {
    return {
        type: 'TsImportEqualsDeclaration',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsExportAssignment(buff, pos) {
    return {
        type: 'TsExportAssignment',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsNamespaceExportDeclaration(buff, pos) {
    return {
        type: 'TsNamespaceExportDeclaration',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsTypeParamDeclaration(buff, pos) {
    return {
        type: 'TsTypeParamDeclaration',
        span: deserializeSpan(buff, pos),
        parameters: deserializeVecTsTypeParameter(buff, pos + 12)
    };
}

function deserializeTsTypeParameterInstantiation(buff, pos) {
    return {
        type: 'TsTypeParameterInstantiation',
        span: deserializeSpan(buff, pos),
        params: deserializeVecBoxTsType(buff, pos + 12)
    };
}

function deserializeTsExpressionWithTypeArg(buff, pos) {
    return {
        type: 'TsExpressionWithTypeArg',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsIndexSignature(buff, pos) {
    return {
        type: 'TsIndexSignature',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsParamProp(buff, pos) {
    return {
        type: 'TsParamProp',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsTypeParameterDeclaration(buff, pos) {
    return {
        type: 'TsTypeParameterDeclaration',
        span: deserializeSpan(buff, pos),
        parameters: deserializeVecTsTypeParameter(buff, pos + 12)
    };
}

function deserializeTsTypeParameter(buff, pos) {
    return {
        type: 'TsTypeParameter',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeTsType(buff, pos) {
    return {
        type: 'TsType',
        span: deserializeSpan(buff, pos)
    };
}

function deserializeAccessibility(buff, pos) {
    const opt = buff.readUInt8(pos);
    const value = enumOptionsAccessibility[opt];
    assert(value);
    return value;
}

const enumOptionsAccessibility = ['public', 'protected', 'private'];

function deserializeOptionAccessibility(buff, pos) {
    const opt = buff.readUInt8(pos);
    if (opt === 1) return deserializeAccessibility(buff, pos + 1);
    assert(opt === 0);
    return null;
}

function deserializeJsWord(buff, pos) {
    // 8 bytes. Last byte is length.
    // If length <= 7, bytes 0-6 contain the word.
    // Otherwise, bytes 0-3 contain length, and bytes 4-7 a relative pointer to string.
    // TODO I don't think this can be correct.
    // How would you disambiguate between length <= 7 and a pointer whose last byte is e.g. 01?
    let len = buff.readUInt8(pos + 7);
    if (len > 7) {
        len = buff.readUint32LE(pos);
        pos = getPtr(buff, pos + 4) - 4;
    }

    return buff.toString('utf8', pos, pos + len); // TODO What encoding?
}

function deserializeBoolean(buff, pos) {
    const value = buff.readUInt32LE(pos);
    if (value === 0) return false;
    assert(value === 1);
    return true;
}

function deserializeBooleanBit(buff, pos) {
    const value = buff.readUInt8(pos);
    if (value === 0) return false;
    assert(value === 1);
    return true;
}

function deserializeBooleanBitAnd2Empty(buff, pos) {
    const value = buff.readUInt8(pos);
    if (value === 0) return false;
    assert(value === 1);
    return true;
}

function deserializeBooleanBitAnd1Empty(buff, pos) {
    const value = buff.readUInt8(pos);
    if (value === 0) return false;
    assert(value === 1);
    return true;
}

function deserializeSpan(buff, pos) {
    return {
        start: buff.readUInt32LE(pos),
        end: buff.readUInt32LE(pos + 4),
        ctxt: buff.readUInt32LE(pos + 8)
    };
}

function deserializeOptionJsWord(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeJsWord(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeOptionModuleExportName(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeModuleExportName(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecImportSpecifier(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeImportSpecifier(buff, vecPos + i * 84));
    }
    return entries;
}

function deserializeOptionSpan(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeSpan(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeOptionExpressionOrSpread(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeExpressionOrSpread(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecOptionExpressionOrSpread(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeOptionExpressionOrSpread(buff, vecPos + i * 24));
    }
    return entries;
}

function deserializeOptionIdentifier(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeIdentifier(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecDecorator(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeDecorator(buff, vecPos + i * 16));
    }
    return entries;
}

function deserializeBoxTsType(buff, pos) {
    const ptr = getPtr(buff, pos);
    return deserializeTsType(buff, ptr);
}

function deserializeOptionTsTypeAnnotation(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeTsTypeAnnotation(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeOptionPattern(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializePattern(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecOptionPattern(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeOptionPattern(buff, vecPos + i * 56));
    }
    return entries;
}

function deserializeBoxPattern(buff, pos) {
    const ptr = getPtr(buff, pos);
    return deserializePattern(buff, ptr);
}

function deserializeOptionBoxExpression(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeBoxExpression(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecObjectPatternProperty(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeObjectPatternProperty(buff, vecPos + i * 56));
    }
    return entries;
}

function deserializeVecParameter(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeParameter(buff, vecPos + i * 72));
    }
    return entries;
}

function deserializeBoxStatement(buff, pos) {
    const ptr = getPtr(buff, pos);
    return deserializeStatement(buff, ptr);
}

function deserializeOptionBoxStatement(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeBoxStatement(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecSwitchCase(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeSwitchCase(buff, vecPos + i * 28));
    }
    return entries;
}

function deserializeOptionCatchClause(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeCatchClause(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecVariableDeclarator(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeVariableDeclarator(buff, vecPos + i * 76));
    }
    return entries;
}

function deserializeVariableDeclarationOrBoxExpression(buff, pos) {
    const deserialize = enumOptionsVariableDeclarationOrBoxExpression[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsVariableDeclarationOrBoxExpression = [
    deserializeVariableDeclaration,
    deserializeBoxExpression
];

function deserializeOptionVariableDeclarationOrBoxExpression(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeVariableDeclarationOrBoxExpression(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVariableDeclarationOrPattern(buff, pos) {
    const deserialize = enumOptionsVariableDeclarationOrPattern[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsVariableDeclarationOrPattern = [
    deserializeVariableDeclaration,
    deserializePattern
];

function deserializeTsParamPropOrParameter(buff, pos) {
    const deserialize = enumOptionsTsParamPropOrParameter[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsTsParamPropOrParameter = [
    deserializeTsParamProp,
    deserializeParameter
];

function deserializeVecTsParamPropOrParameter(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeTsParamPropOrParameter(buff, vecPos + i * 76));
    }
    return entries;
}

function deserializeVecTsTypeParameter(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeTsTypeParameter(buff, vecPos + i * 12));
    }
    return entries;
}

function deserializeOptionTsTypeParamDeclaration(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeTsTypeParamDeclaration(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecClassMember(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeClassMember(buff, vecPos + i * 168));
    }
    return entries;
}

function deserializeVecBoxTsType(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeBoxTsType(buff, vecPos + i * 4));
    }
    return entries;
}

function deserializeOptionTsTypeParameterInstantiation(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeTsTypeParameterInstantiation(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecTsExpressionWithTypeArg(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeTsExpressionWithTypeArg(buff, vecPos + i * 12));
    }
    return entries;
}

function deserializeOptionTsTypeParameterDeclaration(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeTsTypeParameterDeclaration(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecStatement(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeStatement(buff, vecPos + i * 152));
    }
    return entries;
}

function deserializeBoxExpressionOrBoxPattern(buff, pos) {
    const deserialize = enumOptionsBoxExpressionOrBoxPattern[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsBoxExpressionOrBoxPattern = [
    deserializeBoxExpression,
    deserializeBoxPattern
];

function deserializeIdentifierOrPrivateNameOrComputed(buff, pos) {
    const deserialize = enumOptionsIdentifierOrPrivateNameOrComputed[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsIdentifierOrPrivateNameOrComputed = [
    deserializeIdentifier,
    deserializePrivateName,
    deserializeComputed
];

function deserializeIdentifierOrComputed(buff, pos) {
    const deserialize = enumOptionsIdentifierOrComputed[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsIdentifierOrComputed = [
    deserializeIdentifier,
    deserializeComputed
];

function deserializeSuperOrImportOrBoxExpression(buff, pos) {
    const deserialize = enumOptionsSuperOrImportOrBoxExpression[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsSuperOrImportOrBoxExpression = [
    deserializeSuper,
    deserializeImport,
    deserializeBoxExpression
];

function deserializeVecExpressionOrSpread(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeExpressionOrSpread(buff, vecPos + i * 20));
    }
    return entries;
}

function deserializeOptionVecExpressionOrSpread(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeVecExpressionOrSpread(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecBoxExpression(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeBoxExpression(buff, vecPos + i * 4));
    }
    return entries;
}

function deserializeVecTemplateElement(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeTemplateElement(buff, vecPos + i * 36));
    }
    return entries;
}

function deserializeVecPattern(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializePattern(buff, vecPos + i * 52));
    }
    return entries;
}

function deserializeBlockStatementOrBoxExpression(buff, pos) {
    const deserialize = enumOptionsBlockStatementOrBoxExpression[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsBlockStatementOrBoxExpression = [
    deserializeBlockStatement,
    deserializeBoxExpression
];

function deserializeMemberExpressionOrOptionalChainingCall(buff, pos) {
    const deserialize = enumOptionsMemberExpressionOrOptionalChainingCall[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsMemberExpressionOrOptionalChainingCall = [
    deserializeMemberExpression,
    deserializeOptionalChainingCall
];

function deserializeBoxExpression(buff, pos) {
    const ptr = getPtr(buff, pos);
    return deserializeExpression(buff, ptr);
}

function deserializeBoxObjectProperty(buff, pos) {
    const ptr = getPtr(buff, pos);
    return deserializeObjectProperty(buff, ptr);
}

function deserializeSpreadElementOrBoxObjectProperty(buff, pos) {
    const deserialize = enumOptionsSpreadElementOrBoxObjectProperty[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsSpreadElementOrBoxObjectProperty = [
    deserializeSpreadElement,
    deserializeBoxObjectProperty
];

function deserializeVecSpreadElementOrBoxObjectProperty(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeSpreadElementOrBoxObjectProperty(buff, vecPos + i * 20));
    }
    return entries;
}

function deserializeOptionObjectExpression(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeObjectExpression(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeVecExportSpecifier(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeExportSpecifier(buff, vecPos + i * 96));
    }
    return entries;
}

function deserializeOptionStringLiteral(buff, pos) {
    const opt = buff.readUInt32LE(pos);
    if (opt === 1) return deserializeStringLiteral(buff, pos + 4);
    assert(opt === 0);
    return null;
}

function deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(buff, pos) {
    const deserialize = enumOptionsClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration = [
    deserializeClassExpression,
    deserializeFunctionExpression,
    deserializeTsInterfaceDeclaration
];

function deserializeModuleDeclarationOrStatement(buff, pos) {
    const deserialize = enumOptionsModuleDeclarationOrStatement[buff.readUInt32LE(pos)];
    assert(deserialize);
    return deserialize(buff, pos + 4);
}

const enumOptionsModuleDeclarationOrStatement = [
    deserializeModuleDeclaration,
    deserializeStatement
];

function deserializeVecModuleDeclarationOrStatement(buff, pos) {
    const vecPos = getPtr(buff, pos),
        numEntries = buff.readUInt32LE(pos + 4);
    const entries = [];
    for (let i = 0; i < numEntries; i++) {
        entries.push(deserializeModuleDeclarationOrStatement(buff, vecPos + i * 156));
    }
    return entries;
}

function getPtr(buff, pos) {
    return pos + buff.readInt32LE(pos);
}

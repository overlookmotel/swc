// Generated code. Do not edit.

'use strict';

module.exports = serialize;

let pos, buffLen = 8192, buff, int32, uint32, float64;

initBuffer();

function serialize(ast) {
    pos = 0;
    const finalizeData = serializeProgram(ast);
    alignAndAlloc(36, 4);
    finalizeProgram(finalizeData);

    return buff.subarray(0, pos);
}

function serializeProgram(node) {
    switch(node.type) {
        case 'Module': return [0, 4, serializeModule(node), finalizeModule];
        case 'Script': return [1, 4, serializeScript(node), finalizeScript];
        default: throw new Error('Unexpected enum value for Program');
    }
}

function finalizeProgram(finalizeData) {
    finalizeEnum(finalizeData, 36);
}

function serializeModule(node) {
    return [
        serializeSpan(node.span),
        serializeVecModuleDeclarationOrStatement(node.body),
        serializeOptionJsWord(node.interpreter)
    ];
}

function finalizeModule(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeOptionJsWord(finalizeData[2]);
}

function serializeScript(node) {
    return [
        serializeSpan(node.span),
        serializeVecStatement(node.body),
        serializeOptionJsWord(node.interpreter)
    ];
}

function finalizeScript(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeOptionJsWord(finalizeData[2]);
}

function serializeModuleDeclaration(node) {
    switch(node.type) {
        case 'ImportDeclaration': return [0, 4, serializeImportDeclaration(node), finalizeImportDeclaration];
        case 'ExportDeclaration': return [1, 4, serializeExportDeclaration(node), finalizeExportDeclaration];
        case 'ExportNamedDeclaration': return [2, 4, serializeExportNamedDeclaration(node), finalizeExportNamedDeclaration];
        case 'ExportDefaultDeclaration': return [3, 4, serializeExportDefaultDeclaration(node), finalizeExportDefaultDeclaration];
        case 'ExportDefaultExpression': return [4, 4, serializeExportDefaultExpression(node), finalizeExportDefaultExpression];
        case 'ExportAllDeclaration': return [5, 4, serializeExportAllDeclaration(node), finalizeExportAllDeclaration];
        case 'TsImportEqualsDeclaration': return [6, 4, serializeTsImportEqualsDeclaration(node), finalizeTsImportEqualsDeclaration];
        case 'TsExportAssignment': return [7, 4, serializeTsExportAssignment(node), finalizeTsExportAssignment];
        case 'TsNamespaceExportDeclaration': return [8, 4, serializeTsNamespaceExportDeclaration(node), finalizeTsNamespaceExportDeclaration];
        default: throw new Error('Unexpected enum value for ModuleDeclaration');
    }
}

function finalizeModuleDeclaration(finalizeData) {
    finalizeEnum(finalizeData, 148);
}

function serializeImportDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeVecImportSpecifier(node.specifiers),
        serializeStringLiteral(node.source),
        serializeBoolean(node.typeOnly),
        serializeOptionObjectExpression(node.asserts)
    ];
}

function finalizeImportDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeStringLiteral(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    pos += 3;
    finalizeOptionObjectExpression(finalizeData[4]);
}

function serializeImportSpecifier(node) {
    switch(node.type) {
        case 'ImportSpecifier': return [0, 4, serializeImportNamedSpecifier(node), finalizeImportNamedSpecifier];
        case 'ImportDefaultSpecifier': return [1, 4, serializeImportDefaultSpecifier(node), finalizeImportDefaultSpecifier];
        case 'ImportNamespaceSpecifier': return [2, 4, serializeImportNamespaceSpecifier(node), finalizeImportNamespaceSpecifier];
        default: throw new Error('Unexpected enum value for ImportSpecifier');
    }
}

function finalizeImportSpecifier(finalizeData) {
    finalizeEnum(finalizeData, 84);
}

function serializeImportNamedSpecifier(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.local),
        serializeOptionModuleExportName(node.imported),
        serializeBoolean(node.isTypeOnly)
    ];
}

function finalizeImportNamedSpecifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
    finalizeOptionModuleExportName(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    pos += 3;
}

function serializeImportDefaultSpecifier(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.local)
    ];
}

function finalizeImportDefaultSpecifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
}

function serializeImportNamespaceSpecifier(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.local)
    ];
}

function finalizeImportNamespaceSpecifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
}

function serializeExportDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeDeclaration(node.declaration)
    ];
}

function finalizeExportDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeDeclaration(finalizeData[1]);
}

function serializeExportNamedDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeVecExportSpecifier(node.specifiers),
        serializeOptionStringLiteral(node.source),
        serializeBoolean(node.typeOnly),
        serializeOptionObjectExpression(node.asserts)
    ];
}

function finalizeExportNamedDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeOptionStringLiteral(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    pos += 3;
    finalizeOptionObjectExpression(finalizeData[4]);
}

function serializeExportSpecifier(node) {
    switch(node.type) {
        case 'ExportNamespaceSpecifier': return [0, 4, serializeExportNamespaceSpecifier(node), finalizeExportNamespaceSpecifier];
        case 'ExportDefaultSpecifier': return [1, 4, serializeExportDefaultSpecifier(node), finalizeExportDefaultSpecifier];
        case 'ExportSpecifier': return [2, 4, serializeExportNamedSpecifier(node), finalizeExportNamedSpecifier];
        default: throw new Error('Unexpected enum value for ExportSpecifier');
    }
}

function finalizeExportSpecifier(finalizeData) {
    finalizeEnum(finalizeData, 96);
}

function serializeExportNamespaceSpecifier(node) {
    return [
        serializeSpan(node.span),
        serializeModuleExportName(node.name)
    ];
}

function finalizeExportNamespaceSpecifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeModuleExportName(finalizeData[1]);
}

function serializeExportDefaultSpecifier(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.exported)
    ];
}

function finalizeExportDefaultSpecifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
}

function serializeExportNamedSpecifier(node) {
    return [
        serializeSpan(node.span),
        serializeModuleExportName(node.orig),
        serializeOptionModuleExportName(node.exported),
        serializeBoolean(node.isTypeOnly)
    ];
}

function finalizeExportNamedSpecifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeModuleExportName(finalizeData[1]);
    finalizeOptionModuleExportName(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    pos += 3;
}

function serializeExportDefaultDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(node.decl)
    ];
}

function finalizeExportDefaultDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(finalizeData[1]);
}

function serializeExportDefaultExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.expression)
    ];
}

function finalizeExportDefaultExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeExportAllDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeStringLiteral(node.source),
        serializeOptionObjectExpression(node.asserts)
    ];
}

function finalizeExportAllDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeStringLiteral(finalizeData[1]);
    finalizeOptionObjectExpression(finalizeData[2]);
}

function serializeModuleExportName(node) {
    switch(node.type) {
        case 'Identifier': return [0, 4, serializeIdentifier(node), finalizeIdentifier];
        case 'StringLiteral': return [1, 4, serializeStringLiteral(node), finalizeStringLiteral];
        default: throw new Error('Unexpected enum value for ModuleExportName');
    }
}

function finalizeModuleExportName(finalizeData) {
    finalizeEnum(finalizeData, 36);
}

function serializeStatement(node) {
    switch(node.type) {
        case 'BlockStatement': return [0, 4, serializeBlockStatement(node), finalizeBlockStatement];
        case 'EmptyStatement': return [1, 4, serializeEmptyStatement(node), finalizeEmptyStatement];
        case 'DebuggerStatement': return [2, 4, serializeDebuggerStatement(node), finalizeDebuggerStatement];
        case 'WithStatement': return [3, 4, serializeWithStatement(node), finalizeWithStatement];
        case 'ReturnStatement': return [4, 4, serializeReturnStatement(node), finalizeReturnStatement];
        case 'LabeledStatement': return [5, 4, serializeLabeledStatement(node), finalizeLabeledStatement];
        case 'BreakStatement': return [6, 4, serializeBreakStatement(node), finalizeBreakStatement];
        case 'ContinueStatement': return [7, 4, serializeContinueStatement(node), finalizeContinueStatement];
        case 'IfStatement': return [8, 4, serializeIfStatement(node), finalizeIfStatement];
        case 'SwitchStatement': return [9, 4, serializeSwitchStatement(node), finalizeSwitchStatement];
        case 'ThrowStatement': return [10, 4, serializeThrowStatement(node), finalizeThrowStatement];
        case 'TryStatement': return [11, 4, serializeTryStatement(node), finalizeTryStatement];
        case 'WhileStatement': return [12, 4, serializeWhileStatement(node), finalizeWhileStatement];
        case 'DoWhileStatement': return [13, 4, serializeDoWhileStatement(node), finalizeDoWhileStatement];
        case 'ForStatement': return [14, 4, serializeForStatement(node), finalizeForStatement];
        case 'ForInStatement': return [15, 4, serializeForInStatement(node), finalizeForInStatement];
        case 'ForOfStatement': return [16, 4, serializeForOfStatement(node), finalizeForOfStatement];
        case 'ClassDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'FunctionDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'VariableDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'TsInterfaceDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'TsTypeAliasDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'TsEnumDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'TsModuleDeclaration': return [17, 4, serializeDeclaration(node), finalizeDeclaration];
        case 'ExpressionStatement': return [18, 4, serializeExpressionStatement(node), finalizeExpressionStatement];
        default: throw new Error('Unexpected enum value for Statement');
    }
}

function finalizeStatement(finalizeData) {
    finalizeEnum(finalizeData, 152);
}

function serializeBlockStatement(node) {
    return [
        serializeSpan(node.span),
        serializeVecStatement(node.stmts)
    ];
}

function finalizeBlockStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeOptionBlockStatement(value) {
    return serializeOption(value, serializeBlockStatement);
}

function finalizeOptionBlockStatement(finalizeData) {
    return finalizeOption(finalizeData, finalizeBlockStatement, 20, 4);
}

function serializeEmptyStatement(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeEmptyStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeDebuggerStatement(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeDebuggerStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeWithStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.object),
        serializeBoxStatement(node.body)
    ];
}

function finalizeWithStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeBox(finalizeData[2]);
}

function serializeReturnStatement(node) {
    return [
        serializeSpan(node.span),
        serializeOptionBoxExpression(node.argument)
    ];
}

function finalizeReturnStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionBoxExpression(finalizeData[1]);
}

function serializeLabeledStatement(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.label),
        serializeBoxStatement(node.body)
    ];
}

function finalizeLabeledStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
    finalizeBox(finalizeData[2]);
}

function serializeBreakStatement(node) {
    return [
        serializeSpan(node.span),
        serializeOptionIdentifier(node.label)
    ];
}

function finalizeBreakStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionIdentifier(finalizeData[1]);
}

function serializeContinueStatement(node) {
    return [
        serializeSpan(node.span),
        serializeOptionIdentifier(node.label)
    ];
}

function finalizeContinueStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionIdentifier(finalizeData[1]);
}

function serializeIfStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.test),
        serializeBoxStatement(node.consequent),
        serializeOptionBoxStatement(node.alternate)
    ];
}

function finalizeIfStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeBox(finalizeData[2]);
    finalizeOptionBoxStatement(finalizeData[3]);
}

function serializeSwitchStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.discriminant),
        serializeVecSwitchCase(node.cases)
    ];
}

function finalizeSwitchStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeVec(finalizeData[2]);
}

function serializeSwitchCase(node) {
    return [
        serializeSpan(node.span),
        serializeOptionBoxExpression(node.test),
        serializeVecStatement(node.consequent)
    ];
}

function finalizeSwitchCase(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionBoxExpression(finalizeData[1]);
    finalizeVec(finalizeData[2]);
}

function serializeThrowStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.argument)
    ];
}

function finalizeThrowStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeTryStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBlockStatement(node.block),
        serializeOptionCatchClause(node.handler),
        serializeOptionBlockStatement(node.finalizer)
    ];
}

function finalizeTryStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBlockStatement(finalizeData[1]);
    finalizeOptionCatchClause(finalizeData[2]);
    finalizeOptionBlockStatement(finalizeData[3]);
}

function serializeCatchClause(node) {
    return [
        serializeSpan(node.span),
        serializeOptionPattern(node.param),
        serializeBlockStatement(node.body)
    ];
}

function finalizeCatchClause(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionPattern(finalizeData[1]);
    finalizeBlockStatement(finalizeData[2]);
}

function serializeWhileStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.test),
        serializeBoxStatement(node.body)
    ];
}

function finalizeWhileStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeBox(finalizeData[2]);
}

function serializeDoWhileStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.test),
        serializeBoxStatement(node.body)
    ];
}

function finalizeDoWhileStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeBox(finalizeData[2]);
}

function serializeForStatement(node) {
    return [
        serializeSpan(node.span),
        serializeOptionVariableDeclarationOrBoxExpression(node.init),
        serializeOptionBoxExpression(node.test),
        serializeOptionBoxExpression(node.update),
        serializeBoxStatement(node.body)
    ];
}

function finalizeForStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionVariableDeclarationOrBoxExpression(finalizeData[1]);
    finalizeOptionBoxExpression(finalizeData[2]);
    finalizeOptionBoxExpression(finalizeData[3]);
    finalizeBox(finalizeData[4]);
}

function serializeForInStatement(node) {
    return [
        serializeSpan(node.span),
        serializeVariableDeclarationOrPattern(node.left),
        serializeBoxExpression(node.right),
        serializeBoxStatement(node.body)
    ];
}

function finalizeForInStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVariableDeclarationOrPattern(finalizeData[1]);
    finalizeBox(finalizeData[2]);
    finalizeBox(finalizeData[3]);
}

function serializeForOfStatement(node) {
    return [
        serializeSpan(node.span),
        serializeOptionSpan(node.await),
        serializeVariableDeclarationOrPattern(node.left),
        serializeBoxExpression(node.right),
        serializeBoxStatement(node.body)
    ];
}

function finalizeForOfStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionSpan(finalizeData[1]);
    finalizeVariableDeclarationOrPattern(finalizeData[2]);
    finalizeBox(finalizeData[3]);
    finalizeBox(finalizeData[4]);
}

function serializeExpressionStatement(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.expression)
    ];
}

function finalizeExpressionStatement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeDeclaration(node) {
    switch(node.type) {
        case 'ClassDeclaration': return [0, 4, serializeClassDeclaration(node), finalizeClassDeclaration];
        case 'FunctionDeclaration': return [1, 4, serializeFunctionDeclaration(node), finalizeFunctionDeclaration];
        case 'VariableDeclaration': return [2, 4, serializeVariableDeclaration(node), finalizeVariableDeclaration];
        case 'TsInterfaceDeclaration': return [3, 4, serializeTsInterfaceDeclaration(node), finalizeTsInterfaceDeclaration];
        case 'TsTypeAliasDeclaration': return [4, 4, serializeTsTypeAliasDeclaration(node), finalizeTsTypeAliasDeclaration];
        case 'TsEnumDeclaration': return [5, 4, serializeTsEnumDeclaration(node), finalizeTsEnumDeclaration];
        case 'TsModuleDeclaration': return [6, 4, serializeTsModuleDeclaration(node), finalizeTsModuleDeclaration];
        default: throw new Error('Unexpected enum value for Declaration');
    }
}

function finalizeDeclaration(finalizeData) {
    finalizeEnum(finalizeData, 132);
}

function serializeVariableDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeVariableDeclarationKind(node.kind),
        serializeBoolean(node.declare),
        serializeVecVariableDeclarator(node.declarations)
    ];
}

function finalizeVariableDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 2;
    finalizeVec(finalizeData[3]);
}

function serializeVariableDeclarationKind(value) {
    switch (value) {
        case 'var': return 0;
        case 'let': return 1;
        case 'const': return 2;
        default: throw new Error('Unexpected enum value for VariableDeclarationKind');
    }
}

function serializeVariableDeclarator(node) {
    return [
        serializeSpan(node.span),
        serializePattern(node.id),
        serializeOptionBoxExpression(node.init),
        serializeBoolean(node.definite)
    ];
}

function finalizeVariableDeclarator(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizePattern(finalizeData[1]);
    finalizeOptionBoxExpression(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    pos += 3;
}

function serializeFunctionDeclaration(node) {
    return [
        serializeIdentifier(node.identifier),
        serializeBoolean(node.declare),
        serializeVecParameter(node.params),
        serializeVecDecorator(node.decorators),
        serializeSpan(node.span),
        serializeOptionBlockStatement(node.body),
        serializeOptionTsTypeParameterDeclaration(node.typeParameters),
        serializeBoolean(node.generator),
        serializeBoolean(node.async),
        serializeOptionTsTypeAnnotation(node.returnType)
    ];
}

function finalizeFunctionDeclaration(finalizeData) {
    finalizeIdentifier(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    pos += 3;
    finalizeVec(finalizeData[2]);
    finalizeVec(finalizeData[3]);
    finalizeSpan(finalizeData[4]);
    finalizeOptionBlockStatement(finalizeData[5]);
    finalizeOptionTsTypeParameterDeclaration(finalizeData[6]);
    finalizeEnumValue(finalizeData[7]);
    finalizeEnumValue(finalizeData[8]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(finalizeData[9]);
}

function serializeFunctionExpression(node) {
    return [
        serializeOptionIdentifier(node.identifier),
        serializeVecParameter(node.params),
        serializeVecDecorator(node.decorators),
        serializeSpan(node.span),
        serializeOptionBlockStatement(node.body),
        serializeOptionTsTypeParameterDeclaration(node.typeParameters),
        serializeBoolean(node.generator),
        serializeBoolean(node.async),
        serializeOptionTsTypeAnnotation(node.returnType)
    ];
}

function finalizeFunctionExpression(finalizeData) {
    finalizeOptionIdentifier(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeVec(finalizeData[2]);
    finalizeSpan(finalizeData[3]);
    finalizeOptionBlockStatement(finalizeData[4]);
    finalizeOptionTsTypeParameterDeclaration(finalizeData[5]);
    finalizeEnumValue(finalizeData[6]);
    finalizeEnumValue(finalizeData[7]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(finalizeData[8]);
}

function serializeArrowFunctionExpression(node) {
    return [
        serializeSpan(node.span),
        serializeVecPattern(node.params),
        serializeBlockStatementOrBoxExpression(node.body),
        serializeOptionTsTypeParameterDeclaration(node.typeParameters),
        serializeBoolean(node.async),
        serializeBoolean(node.generator),
        serializeOptionTsTypeAnnotation(node.returnType)
    ];
}

function finalizeArrowFunctionExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeBlockStatementOrBoxExpression(finalizeData[2]);
    finalizeOptionTsTypeParameterDeclaration(finalizeData[3]);
    finalizeEnumValue(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(finalizeData[6]);
}

function serializeParameter(node) {
    return [
        serializeSpan(node.span),
        serializeVecDecorator(node.decorators),
        serializePattern(node.pat)
    ];
}

function finalizeParameter(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizePattern(finalizeData[2]);
}

function serializeDecorator(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.expression)
    ];
}

function finalizeDecorator(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeClassDeclaration(node) {
    return [
        serializeIdentifier(node.identifier),
        serializeBoolean(node.declare),
        serializeSpan(node.span),
        serializeVecDecorator(node.decorators),
        serializeVecClassMember(node.body),
        serializeOptionBoxExpression(node.superClass),
        serializeBoolean(node.isAbstract),
        serializeOptionTsTypeParamDeclaration(node.typeParams),
        serializeOptionTsTypeParameterInstantiation(node.superTypeParams),
        serializeVecTsExpressionWithTypeArg(node.implements)
    ];
}

function finalizeClassDeclaration(finalizeData) {
    finalizeIdentifier(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    pos += 3;
    finalizeSpan(finalizeData[2]);
    finalizeVec(finalizeData[3]);
    finalizeVec(finalizeData[4]);
    finalizeOptionBoxExpression(finalizeData[5]);
    finalizeEnumValue(finalizeData[6]);
    pos += 3;
    finalizeOptionTsTypeParamDeclaration(finalizeData[7]);
    finalizeOptionTsTypeParameterInstantiation(finalizeData[8]);
    finalizeVec(finalizeData[9]);
}

function serializeClassExpression(node) {
    return [
        serializeOptionIdentifier(node.identifier),
        serializeSpan(node.span),
        serializeVecDecorator(node.decorators),
        serializeVecClassMember(node.body),
        serializeOptionBoxExpression(node.superClass),
        serializeBoolean(node.isAbstract),
        serializeOptionTsTypeParamDeclaration(node.typeParams),
        serializeOptionTsTypeParameterInstantiation(node.superTypeParams),
        serializeVecTsExpressionWithTypeArg(node.implements)
    ];
}

function finalizeClassExpression(finalizeData) {
    finalizeOptionIdentifier(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeVec(finalizeData[2]);
    finalizeVec(finalizeData[3]);
    finalizeOptionBoxExpression(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    pos += 3;
    finalizeOptionTsTypeParamDeclaration(finalizeData[6]);
    finalizeOptionTsTypeParameterInstantiation(finalizeData[7]);
    finalizeVec(finalizeData[8]);
}

function serializeClassMember(node) {
    switch(node.type) {
        case 'Constructor': return [0, 8, serializeConstructor(node), finalizeConstructor];
        case 'ClassMethod': return [1, 8, serializeClassMethod(node), finalizeClassMethod];
        case 'PrivateMethod': return [2, 4, serializePrivateMethod(node), finalizePrivateMethod];
        case 'ClassProperty': return [3, 8, serializeClassProperty(node), finalizeClassProperty];
        case 'PrivateProperty': return [4, 4, serializePrivateProperty(node), finalizePrivateProperty];
        case 'TsIndexSignature': return [5, 4, serializeTsIndexSignature(node), finalizeTsIndexSignature];
        case 'EmptyStatement': return [6, 4, serializeEmptyStatement(node), finalizeEmptyStatement];
        case 'StaticBlock': return [7, 4, serializeStaticBlock(node), finalizeStaticBlock];
        default: throw new Error('Unexpected enum value for ClassMember');
    }
}

function finalizeClassMember(finalizeData) {
    finalizeEnum(finalizeData, 168);
}

function serializeConstructor(node) {
    return [
        serializePropertyName(node.key),
        serializeSpan(node.span),
        serializeVecTsParamPropOrParameter(node.params),
        serializeOptionBlockStatement(node.body),
        serializeOptionAccessibility(node.accessibility),
        serializeBoolean(node.isOptional)
    ];
}

function finalizeConstructor(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeVec(finalizeData[2]);
    finalizeOptionBlockStatement(finalizeData[3]);
    finalizeOptionAccessibility(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    pos += 1;
}

function serializeClassMethod(node) {
    return [
        serializePropertyName(node.key),
        serializeSpan(node.span),
        serializeFunction(node.function),
        serializeMethodKind(node.kind),
        serializeBoolean(node.isStatic),
        serializeBoolean(node.isAbstract),
        serializeBoolean(node.isOptional),
        serializeOptionAccessibility(node.accessibility),
        serializeBoolean(node.isOverride)
    ];
}

function finalizeClassMethod(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeFunction(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    finalizeEnumValue(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    finalizeEnumValue(finalizeData[6]);
    finalizeOptionAccessibility(finalizeData[7]);
    finalizeEnumValue(finalizeData[8]);
    pos += 1;
}

function serializePrivateMethod(node) {
    return [
        serializeSpan(node.span),
        serializePrivateName(node.key),
        serializeFunction(node.function),
        serializeMethodKind(node.kind),
        serializeBoolean(node.isStatic),
        serializeBoolean(node.isAbstract),
        serializeBoolean(node.isOptional),
        serializeOptionAccessibility(node.accessibility),
        serializeBoolean(node.isOverride)
    ];
}

function finalizePrivateMethod(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizePrivateName(finalizeData[1]);
    finalizeFunction(finalizeData[2]);
    finalizeEnumValue(finalizeData[3]);
    finalizeEnumValue(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    finalizeEnumValue(finalizeData[6]);
    finalizeOptionAccessibility(finalizeData[7]);
    finalizeEnumValue(finalizeData[8]);
    pos += 1;
}

function serializeClassProperty(node) {
    return [
        serializePropertyName(node.key),
        serializeSpan(node.span),
        serializeOptionBoxExpression(node.value),
        serializeOptionTsTypeAnnotation(node.typeAnnotation),
        serializeVecDecorator(node.decorators),
        serializeBoolean(node.isStatic),
        serializeOptionAccessibility(node.accessibility),
        serializeBoolean(node.isAbstract),
        serializeBoolean(node.isOptional),
        serializeBoolean(node.isOverride),
        serializeBoolean(node.readonly),
        serializeBoolean(node.declare),
        serializeBoolean(node.definite)
    ];
}

function finalizeClassProperty(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeOptionBoxExpression(finalizeData[2]);
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
    finalizeVec(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    finalizeOptionAccessibility(finalizeData[6]);
    finalizeEnumValue(finalizeData[7]);
    finalizeEnumValue(finalizeData[8]);
    finalizeEnumValue(finalizeData[9]);
    finalizeEnumValue(finalizeData[10]);
    finalizeEnumValue(finalizeData[11]);
    finalizeEnumValue(finalizeData[12]);
    pos += 7;
}

function serializePrivateProperty(node) {
    return [
        serializeSpan(node.span),
        serializePrivateName(node.key),
        serializeOptionBoxExpression(node.value),
        serializeOptionTsTypeAnnotation(node.typeAnnotation),
        serializeVecDecorator(node.decorators),
        serializeBoolean(node.isStatic),
        serializeOptionAccessibility(node.accessibility),
        serializeBoolean(node.isOptional),
        serializeBoolean(node.isOverride),
        serializeBoolean(node.readonly),
        serializeBoolean(node.definite)
    ];
}

function finalizePrivateProperty(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizePrivateName(finalizeData[1]);
    finalizeOptionBoxExpression(finalizeData[2]);
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
    finalizeVec(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    finalizeOptionAccessibility(finalizeData[6]);
    finalizeEnumValue(finalizeData[7]);
    finalizeEnumValue(finalizeData[8]);
    finalizeEnumValue(finalizeData[9]);
    finalizeEnumValue(finalizeData[10]);
    pos += 1;
}

function serializeStaticBlock(node) {
    return [
        serializeSpan(node.span),
        serializeBlockStatement(node.body)
    ];
}

function finalizeStaticBlock(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBlockStatement(finalizeData[1]);
}

function serializeMethodKind(value) {
    switch (value) {
        case 'method': return 0;
        case 'getter': return 1;
        case 'setter': return 2;
        default: throw new Error('Unexpected enum value for MethodKind');
    }
}

function serializeFunction(node) {
    return [
        serializeVecParameter(node.params),
        serializeVecDecorator(node.decorators),
        serializeSpan(node.span),
        serializeOptionBlockStatement(node.body),
        serializeOptionTsTypeParamDeclaration(node.typeParameters),
        serializeBoolean(node.generator),
        serializeBoolean(node.async),
        serializeOptionTsTypeAnnotation(node.returnType)
    ];
}

function finalizeFunction(finalizeData) {
    finalizeVec(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeSpan(finalizeData[2]);
    finalizeOptionBlockStatement(finalizeData[3]);
    finalizeOptionTsTypeParamDeclaration(finalizeData[4]);
    finalizeEnumValue(finalizeData[5]);
    finalizeEnumValue(finalizeData[6]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(finalizeData[7]);
}

function serializePattern(node) {
    switch(node.type) {
        case 'Identifier': return [0, 4, serializeBindingIdentifier(node), finalizeBindingIdentifier];
        case 'ArrayPattern': return [1, 4, serializeArrayPattern(node), finalizeArrayPattern];
        case 'RestElement': return [2, 4, serializeRestElement(node), finalizeRestElement];
        case 'ObjectPattern': return [3, 4, serializeObjectPattern(node), finalizeObjectPattern];
        case 'AssignmentPattern': return [4, 4, serializeAssignmentPattern(node), finalizeAssignmentPattern];
        case 'Invalid': return [5, 4, serializeInvalid(node), finalizeInvalid];
        case 'ThisExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrayExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'ObjectExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'FunctionExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'UnaryExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'UpdateExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'BinaryExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'AssignmentExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'MemberExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'SuperPropExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'ConditionalExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'CallExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'NewExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'SequenceExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'StringLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'BooleanLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'NullLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'NumericLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'BigIntLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'RegExpLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXText': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TemplateLiteral': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TaggedTemplateExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrowFunctionExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'ClassExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'YieldExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'MetaProperty': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'AwaitExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'ParenthesisExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXMemberExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXNamespacedName': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXEmptyExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXElement': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXFragment': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsTypeAssertion': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsConstAssertion': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsNonNullExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsAsExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsInstantiation': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'PrivateName': return [6, 4, serializeBoxExpression(node), finalizeBox];
        case 'OptionalChainingExpression': return [6, 4, serializeBoxExpression(node), finalizeBox];
        default: throw new Error('Unexpected enum value for Pattern');
    }
}

function finalizePattern(finalizeData) {
    finalizeEnum(finalizeData, 52);
}

function serializeBindingIdentifier(node) {
    return [
        serializeSpan(node.span),
        serializeJsWord(node.value),
        serializeBoolean(node.optional),
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    ];
}

function finalizeBindingIdentifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeJsWord(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
}

function serializeArrayPattern(node) {
    return [
        serializeSpan(node.span),
        serializeVecOptionPattern(node.elements),
        serializeBoolean(node.optional),
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    ];
}

function finalizeArrayPattern(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
}

function serializeRestElement(node) {
    return [
        serializeSpan(node.span),
        serializeSpan(node.rest),
        serializeBoxPattern(node.argument),
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    ];
}

function finalizeRestElement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeBox(finalizeData[2]);
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
}

function serializeObjectPattern(node) {
    return [
        serializeSpan(node.span),
        serializeVecObjectPatternProperty(node.properties),
        serializeBoolean(node.optional),
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    ];
}

function finalizeObjectPattern(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
}

function serializeObjectPatternProperty(node) {
    switch(node.type) {
        case 'KeyValuePatternProperty': return [0, 8, serializeKeyValuePatternProperty(node), finalizeKeyValuePatternProperty];
        case 'AssignmentPatternProperty': return [1, 4, serializeAssignmentPatternProperty(node), finalizeAssignmentPatternProperty];
        case 'RestElement': return [2, 4, serializeRestElement(node), finalizeRestElement];
        default: throw new Error('Unexpected enum value for ObjectPatternProperty');
    }
}

function finalizeObjectPatternProperty(finalizeData) {
    finalizeEnum(finalizeData, 56);
}

function serializeKeyValuePatternProperty(node) {
    return [
        serializePropertyName(node.key),
        serializeBoxPattern(node.value)
    ];
}

function finalizeKeyValuePatternProperty(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    pos += 4;
}

function serializeAssignmentPatternProperty(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.key),
        serializeOptionBoxExpression(node.value)
    ];
}

function finalizeAssignmentPatternProperty(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
    finalizeOptionBoxExpression(finalizeData[2]);
}

function serializeAssignmentPattern(node) {
    return [
        serializeSpan(node.span),
        serializeBoxPattern(node.left),
        serializeBoxExpression(node.right),
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    ];
}

function finalizeAssignmentPattern(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeBox(finalizeData[2]);
    finalizeOptionTsTypeAnnotation(finalizeData[3]);
}

function serializeExpression(node) {
    switch(node.type) {
        case 'ThisExpression': return [0, 4, serializeThisExpression(node), finalizeThisExpression];
        case 'ArrayExpression': return [1, 4, serializeArrayExpression(node), finalizeArrayExpression];
        case 'ObjectExpression': return [2, 4, serializeObjectExpression(node), finalizeObjectExpression];
        case 'FunctionExpression': return [3, 4, serializeFunctionExpression(node), finalizeFunctionExpression];
        case 'UnaryExpression': return [4, 4, serializeUnaryExpression(node), finalizeUnaryExpression];
        case 'UpdateExpression': return [5, 4, serializeUpdateExpression(node), finalizeUpdateExpression];
        case 'BinaryExpression': return [6, 4, serializeBinaryExpression(node), finalizeBinaryExpression];
        case 'AssignmentExpression': return [7, 4, serializeAssignmentExpression(node), finalizeAssignmentExpression];
        case 'MemberExpression': return [8, 4, serializeMemberExpression(node), finalizeMemberExpression];
        case 'SuperPropExpression': return [9, 4, serializeSuperPropExpression(node), finalizeSuperPropExpression];
        case 'ConditionalExpression': return [10, 4, serializeConditionalExpression(node), finalizeConditionalExpression];
        case 'CallExpression': return [11, 4, serializeCallExpression(node), finalizeCallExpression];
        case 'NewExpression': return [12, 4, serializeNewExpression(node), finalizeNewExpression];
        case 'SequenceExpression': return [13, 4, serializeSequenceExpression(node), finalizeSequenceExpression];
        case 'Identifier': return [14, 4, serializeIdentifier(node), finalizeIdentifier];
        case 'StringLiteral': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'BooleanLiteral': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'NullLiteral': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'NumericLiteral': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'BigIntLiteral': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'RegExpLiteral': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'JSXText': return [15, 8, serializeLiteral(node), finalizeLiteral];
        case 'TemplateLiteral': return [16, 4, serializeTemplateLiteral(node), finalizeTemplateLiteral];
        case 'TaggedTemplateExpression': return [17, 4, serializeTaggedTemplateExpression(node), finalizeTaggedTemplateExpression];
        case 'ArrowFunctionExpression': return [18, 4, serializeArrowFunctionExpression(node), finalizeArrowFunctionExpression];
        case 'ClassExpression': return [19, 4, serializeClassExpression(node), finalizeClassExpression];
        case 'YieldExpression': return [20, 4, serializeYieldExpression(node), finalizeYieldExpression];
        case 'MetaProperty': return [21, 4, serializeMetaProperty(node), finalizeMetaProperty];
        case 'AwaitExpression': return [22, 4, serializeAwaitExpression(node), finalizeAwaitExpression];
        case 'ParenthesisExpression': return [23, 4, serializeParenthesisExpression(node), finalizeParenthesisExpression];
        case 'JSXMemberExpression': return [24, 4, serializeJSXMemberExpression(node), finalizeJSXMemberExpression];
        case 'JSXNamespacedName': return [25, 4, serializeJSXNamespacedName(node), finalizeJSXNamespacedName];
        case 'JSXEmptyExpression': return [26, 4, serializeJSXEmptyExpression(node), finalizeJSXEmptyExpression];
        case 'JSXElement': return [27, 4, serializeJSXElement(node), finalizeJSXElement];
        case 'JSXFragment': return [28, 4, serializeJSXFragment(node), finalizeJSXFragment];
        case 'TsTypeAssertion': return [29, 4, serializeTsTypeAssertion(node), finalizeTsTypeAssertion];
        case 'TsConstAssertion': return [30, 4, serializeTsConstAssertion(node), finalizeTsConstAssertion];
        case 'TsNonNullExpression': return [31, 4, serializeTsNonNullExpression(node), finalizeTsNonNullExpression];
        case 'TsAsExpression': return [32, 4, serializeTsAsExpression(node), finalizeTsAsExpression];
        case 'TsInstantiation': return [33, 4, serializeTsInstantiation(node), finalizeTsInstantiation];
        case 'PrivateName': return [34, 4, serializePrivateName(node), finalizePrivateName];
        case 'OptionalChainingExpression': return [35, 4, serializeOptionalChainingExpression(node), finalizeOptionalChainingExpression];
        case 'Invalid': return [36, 4, serializeInvalid(node), finalizeInvalid];
        default: throw new Error('Unexpected enum value for Expression');
    }
}

function finalizeExpression(finalizeData) {
    finalizeEnum(finalizeData, 136);
}

function serializeThisExpression(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeThisExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeArrayExpression(node) {
    return [
        serializeSpan(node.span),
        serializeVecOptionExpressionOrSpread(node.elements)
    ];
}

function finalizeArrayExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeUnaryExpression(node) {
    return [
        serializeSpan(node.span),
        serializeUnaryOperator(node.operator),
        serializeBoxExpression(node.argument)
    ];
}

function finalizeUnaryExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    pos += 3;
    finalizeBox(finalizeData[2]);
}

function serializeUnaryOperator(value) {
    switch (value) {
        case '-': return 0;
        case '+': return 1;
        case '!': return 2;
        case '~': return 3;
        case 'typeof': return 4;
        case 'void': return 5;
        case 'delete': return 6;
        default: throw new Error('Unexpected enum value for UnaryOperator');
    }
}

function serializeUpdateExpression(node) {
    return [
        serializeSpan(node.span),
        serializeUpdateOperator(node.operator),
        serializeBoolean(node.prefix),
        serializeBoxExpression(node.argument)
    ];
}

function finalizeUpdateExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 2;
    finalizeBox(finalizeData[3]);
}

function serializeUpdateOperator(value) {
    switch (value) {
        case '++': return 0;
        case '--': return 1;
        default: throw new Error('Unexpected enum value for UpdateOperator');
    }
}

function serializeBinaryExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.left),
        serializeBinaryOperator(node.operator),
        serializeBoxExpression(node.right)
    ];
}

function finalizeBinaryExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
    finalizeBox(finalizeData[3]);
}

function serializeBinaryOperator(value) {
    switch (value) {
        case '==': return 0;
        case '!=': return 1;
        case '===': return 2;
        case '!==': return 3;
        case '<': return 4;
        case '<=': return 5;
        case '>': return 6;
        case '>=': return 7;
        case '<<': return 8;
        case '>>': return 9;
        case '>>>': return 10;
        case '+': return 11;
        case '-': return 12;
        case '*': return 13;
        case '/': return 14;
        case '%': return 15;
        case '|': return 16;
        case '^': return 17;
        case '&': return 18;
        case '||': return 19;
        case '&&': return 20;
        case 'in': return 21;
        case 'instanceof': return 22;
        case '**': return 23;
        case '??': return 24;
        default: throw new Error('Unexpected enum value for BinaryOperator');
    }
}

function serializeAssignmentExpression(node) {
    return [
        serializeSpan(node.span),
        node.operator === '=' 
            ? serializeAssignmentLeftEquals(node.left)
            : serializeAssignmentLeft(node.left),
        serializeAssignmentOperator(node.operator),
        serializeBoxExpression(node.right)
    ];
}

function finalizeAssignmentExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeAssignmentLeft(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
    finalizeBox(finalizeData[3]);
}

function serializeAssignmentLeft(node) {
    switch(node.type) {
        case 'ThisExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrayExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ObjectExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'FunctionExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'UnaryExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'UpdateExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'BinaryExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'AssignmentExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'MemberExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'SuperPropExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ConditionalExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'CallExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'NewExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'SequenceExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'Identifier': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'StringLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'BooleanLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'NullLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'NumericLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'BigIntLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'RegExpLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXText': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TemplateLiteral': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TaggedTemplateExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrowFunctionExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ClassExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'YieldExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'MetaProperty': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'AwaitExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ParenthesisExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXMemberExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXNamespacedName': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXEmptyExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXElement': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXFragment': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsTypeAssertion': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsConstAssertion': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsNonNullExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsAsExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsInstantiation': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'PrivateName': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'OptionalChainingExpression': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'Invalid': return [0, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrayPattern': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'RestElement': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ObjectPattern': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'AssignmentPattern': return [1, 4, serializeBoxPattern(node), finalizeBox];
        default: throw new Error('Unexpected enum value for AssignmentLeft');
    }
}

function finalizeAssignmentLeft(finalizeData) {
    finalizeEnum(finalizeData, 8);
}

function serializeAssignmentLeftEquals(node) {
    switch(node.type) {
        case 'Identifier': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ArrayPattern': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'RestElement': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ObjectPattern': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'AssignmentPattern': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'Invalid': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ThisExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ArrayExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ObjectExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'FunctionExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'UnaryExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'UpdateExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'BinaryExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'AssignmentExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'MemberExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'SuperPropExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ConditionalExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'CallExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'NewExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'SequenceExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'StringLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'BooleanLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'NullLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'NumericLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'BigIntLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'RegExpLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'JSXText': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TemplateLiteral': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TaggedTemplateExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ArrowFunctionExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ClassExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'YieldExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'MetaProperty': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'AwaitExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'ParenthesisExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'JSXMemberExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'JSXNamespacedName': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'JSXEmptyExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'JSXElement': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'JSXFragment': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TsTypeAssertion': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TsConstAssertion': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TsNonNullExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TsAsExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'TsInstantiation': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'PrivateName': return [1, 4, serializeBoxPattern(node), finalizeBox];
        case 'OptionalChainingExpression': return [1, 4, serializeBoxPattern(node), finalizeBox];
        default: throw new Error('Unexpected enum value for AssignmentLeftEquals');
    }
}

function serializeAssignmentOperator(value) {
    switch (value) {
        case '=': return 0;
        case '+=': return 1;
        case '-=': return 2;
        case '*=': return 3;
        case '/=': return 4;
        case '%=': return 5;
        case '<<=': return 6;
        case '>>=': return 7;
        case '>>>=': return 8;
        case '|=': return 9;
        case '^=': return 10;
        case '&=': return 11;
        case '**=': return 12;
        case '&&=': return 13;
        case '||=': return 14;
        case '??=': return 15;
        default: throw new Error('Unexpected enum value for AssignmentOperator');
    }
}

function serializeMemberExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.object),
        serializeIdentifierOrPrivateNameOrComputed(node.property)
    ];
}

function finalizeMemberExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeIdentifierOrPrivateNameOrComputed(finalizeData[2]);
}

function serializeSuperPropExpression(node) {
    return [
        serializeSpan(node.span),
        serializeSuper(node.obj),
        serializeIdentifierOrComputed(node.property)
    ];
}

function finalizeSuperPropExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeSuper(finalizeData[1]);
    finalizeIdentifierOrComputed(finalizeData[2]);
}

function serializeConditionalExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.test),
        serializeBoxExpression(node.consequent),
        serializeBoxExpression(node.alternate)
    ];
}

function finalizeConditionalExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeBox(finalizeData[2]);
    finalizeBox(finalizeData[3]);
}

function serializeCallExpression(node) {
    return [
        serializeSpan(node.span),
        serializeSuperOrImportOrBoxExpression(node.callee),
        serializeVecExpressionOrSpread(node.arguments),
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    ];
}

function finalizeCallExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeSuperOrImportOrBoxExpression(finalizeData[1]);
    finalizeVec(finalizeData[2]);
    finalizeOptionTsTypeParameterInstantiation(finalizeData[3]);
}

function serializeNewExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.callee),
        serializeOptionVecExpressionOrSpread(node.arguments),
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    ];
}

function finalizeNewExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeOptionVecExpressionOrSpread(finalizeData[2]);
    finalizeOptionTsTypeParameterInstantiation(finalizeData[3]);
}

function serializeSequenceExpression(node) {
    return [
        serializeSpan(node.span),
        serializeVecBoxExpression(node.expressions)
    ];
}

function finalizeSequenceExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeIdentifier(node) {
    return [
        serializeSpan(node.span),
        serializeJsWord(node.value),
        serializeBoolean(node.optional)
    ];
}

function finalizeIdentifier(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeJsWord(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
}

function serializeTemplateLiteral(node) {
    return [
        serializeSpan(node.span),
        serializeVecBoxExpression(node.expressions),
        serializeVecTemplateElement(node.quasis)
    ];
}

function finalizeTemplateLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeVec(finalizeData[2]);
}

function serializeTemplateElement(node) {
    return [
        serializeSpan(node.span),
        serializeOptionJsWord(node.cooked),
        serializeBoolean(node.tail),
        serializeJsWord(node.raw)
    ];
}

function finalizeTemplateElement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionJsWord(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
    finalizeJsWord(finalizeData[3]);
}

function serializeTaggedTemplateExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.tag),
        serializeOptionTsTypeParameterInstantiation(node.typeParameters),
        serializeTemplateLiteral(node.template)
    ];
}

function finalizeTaggedTemplateExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeOptionTsTypeParameterInstantiation(finalizeData[2]);
    finalizeTemplateLiteral(finalizeData[3]);
}

function serializeYieldExpression(node) {
    return [
        serializeSpan(node.span),
        serializeOptionBoxExpression(node.argument),
        serializeBoolean(node.delegate)
    ];
}

function finalizeYieldExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeOptionBoxExpression(finalizeData[1]);
    finalizeEnumValue(finalizeData[2]);
    pos += 3;
}

function serializeMetaProperty(node) {
    return [
        serializeSpan(node.span),
        serializeMetaPropertyKind(node.kind)
    ];
}

function finalizeMetaProperty(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    pos += 3;
}

function serializeMetaPropertyKind(value) {
    switch (value) {
        case 'new.target': return 0;
        case 'import.meta': return 1;
        default: throw new Error('Unexpected enum value for MetaPropertyKind');
    }
}

function serializeAwaitExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.argument)
    ];
}

function finalizeAwaitExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeParenthesisExpression(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.expression)
    ];
}

function finalizeParenthesisExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializePrivateName(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.id)
    ];
}

function finalizePrivateName(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
}

function serializeOptionalChainingExpression(node) {
    return [
        serializeSpan(node.span),
        serializeSpan(node.questionDotToken),
        serializeMemberExpressionOrOptionalChainingCall(node.base)
    ];
}

function finalizeOptionalChainingExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeMemberExpressionOrOptionalChainingCall(finalizeData[2]);
}

function serializeOptionalChainingCall(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.callee),
        serializeVecExpressionOrSpread(node.arguments),
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    ];
}

function finalizeOptionalChainingCall(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    finalizeVec(finalizeData[2]);
    finalizeOptionTsTypeParameterInstantiation(finalizeData[3]);
}

function serializeSuper(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeSuper(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeImport(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeImport(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeInvalid(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeInvalid(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeComputed(node) {
    return [
        serializeSpan(node.span),
        serializeBoxExpression(node.expression)
    ];
}

function finalizeComputed(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeExpressionOrSpread(node) {
    return [
        serializeOptionSpan(node.spread),
        serializeBoxExpression(node.expression)
    ];
}

function finalizeExpressionOrSpread(finalizeData) {
    finalizeOptionSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeObjectExpression(node) {
    return [
        serializeSpan(node.span),
        serializeVecSpreadElementOrBoxObjectProperty(node.properties)
    ];
}

function finalizeObjectExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeSpreadElement(node) {
    return [
        serializeSpan(node.spread),
        serializeBoxExpression(node.arguments)
    ];
}

function finalizeSpreadElement(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeObjectProperty(node) {
    switch(node.type) {
        case 'Identifier': return [0, 4, serializeIdentifier(node), finalizeIdentifier];
        case 'KeyValueProperty': return [1, 8, serializeKeyValueProperty(node), finalizeKeyValueProperty];
        case 'AssignmentProperty': return [2, 4, serializeAssignmentProperty(node), finalizeAssignmentProperty];
        case 'GetterProperty': return [3, 8, serializeGetterProperty(node), finalizeGetterProperty];
        case 'SetterProperty': return [4, 8, serializeSetterProperty(node), finalizeSetterProperty];
        case 'MethodProperty': return [5, 8, serializeMethodProperty(node), finalizeMethodProperty];
        default: throw new Error('Unexpected enum value for ObjectProperty');
    }
}

function finalizeObjectProperty(finalizeData) {
    finalizeEnum(finalizeData, 152);
}

function serializeKeyValueProperty(node) {
    return [
        serializePropertyName(node.key),
        serializeBoxExpression(node.value)
    ];
}

function finalizeKeyValueProperty(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeBox(finalizeData[1]);
    pos += 4;
}

function serializeAssignmentProperty(node) {
    return [
        serializeSpan(node.span),
        serializeIdentifier(node.key),
        serializeBoxExpression(node.value)
    ];
}

function finalizeAssignmentProperty(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeIdentifier(finalizeData[1]);
    finalizeBox(finalizeData[2]);
}

function serializeGetterProperty(node) {
    return [
        serializePropertyName(node.key),
        serializeSpan(node.span),
        serializeOptionTsTypeAnnotation(node.typeAnnotation),
        serializeOptionBlockStatement(node.body)
    ];
}

function finalizeGetterProperty(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizeOptionTsTypeAnnotation(finalizeData[2]);
    finalizeOptionBlockStatement(finalizeData[3]);
}

function serializeSetterProperty(node) {
    return [
        serializePropertyName(node.key),
        serializeSpan(node.span),
        serializePattern(node.param),
        serializeOptionBlockStatement(node.body)
    ];
}

function finalizeSetterProperty(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeSpan(finalizeData[1]);
    finalizePattern(finalizeData[2]);
    finalizeOptionBlockStatement(finalizeData[3]);
}

function serializeMethodProperty(node) {
    return [
        serializePropertyName(node.key),
        serializeVecParameter(node.params),
        serializeVecDecorator(node.decorators),
        serializeSpan(node.span),
        serializeOptionBlockStatement(node.body),
        serializeOptionTsTypeParameterDeclaration(node.typeParameters),
        serializeBoolean(node.generator),
        serializeBoolean(node.async),
        serializeOptionTsTypeAnnotation(node.returnType)
    ];
}

function finalizeMethodProperty(finalizeData) {
    finalizePropertyName(finalizeData[0]);
    finalizeVec(finalizeData[1]);
    finalizeVec(finalizeData[2]);
    finalizeSpan(finalizeData[3]);
    finalizeOptionBlockStatement(finalizeData[4]);
    finalizeOptionTsTypeParameterDeclaration(finalizeData[5]);
    finalizeEnumValue(finalizeData[6]);
    finalizeEnumValue(finalizeData[7]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(finalizeData[8]);
    pos += 4;
}

function serializePropertyName(node) {
    switch(node.type) {
        case 'Identifier': return [0, 4, serializeIdentifier(node), finalizeIdentifier];
        case 'StringLiteral': return [1, 4, serializeStringLiteral(node), finalizeStringLiteral];
        case 'NumericLiteral': return [2, 8, serializeNumericLiteral(node), finalizeNumericLiteral];
        case 'Computed': return [3, 4, serializeComputed(node), finalizeComputed];
        case 'BigIntLiteral': return [4, 4, serializeBigIntLiteral(node), finalizeBigIntLiteral];
        default: throw new Error('Unexpected enum value for PropertyName');
    }
}

function finalizePropertyName(finalizeData) {
    finalizeEnum(finalizeData, 40);
}

function serializeLiteral(node) {
    switch(node.type) {
        case 'StringLiteral': return [0, 4, serializeStringLiteral(node), finalizeStringLiteral];
        case 'BooleanLiteral': return [1, 4, serializeBooleanLiteral(node), finalizeBooleanLiteral];
        case 'NullLiteral': return [2, 4, serializeNullLiteral(node), finalizeNullLiteral];
        case 'NumericLiteral': return [3, 8, serializeNumericLiteral(node), finalizeNumericLiteral];
        case 'BigIntLiteral': return [4, 4, serializeBigIntLiteral(node), finalizeBigIntLiteral];
        case 'RegExpLiteral': return [5, 4, serializeRegExpLiteral(node), finalizeRegExpLiteral];
        case 'JSXText': return [6, 4, serializeJSXText(node), finalizeJSXText];
        default: throw new Error('Unexpected enum value for Literal');
    }
}

function finalizeLiteral(finalizeData) {
    finalizeEnum(finalizeData, 40);
}

function serializeStringLiteral(node) {
    return [
        serializeSpan(node.span),
        serializeJsWord(node.value),
        serializeOptionJsWord(node.raw)
    ];
}

function finalizeStringLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeJsWord(finalizeData[1]);
    finalizeOptionJsWord(finalizeData[2]);
}

function serializeBooleanLiteral(node) {
    return [
        serializeSpan(node.span),
        serializeBoolean(node.value)
    ];
}

function finalizeBooleanLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeEnumValue(finalizeData[1]);
    pos += 3;
}

function serializeNullLiteral(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeNullLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeNumericLiteral(node) {
    return [
        serializeSpan(node.span),
        serializeNumber(node.value)
    ];
}

function finalizeNumericLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
    pos += 4;
    finalizeNumber(finalizeData[1]);
}

function serializeBigIntLiteral(node) {
    return [
        serializeSpan(node.span),
        serializeBigIntValue(node.value)
    ];
}

function finalizeBigIntLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeJsWord(finalizeData[1]);
}

function serializeBigIntValue([count, parts]) {
    if (count === 0) return serializeJsWord('0');

    let num = 0n;
    for (let i = parts.length - 1; i >= 0; i--) {
        num <<= 32n;
        num += BigInt(parts[i]);
    }

    return serializeJsWord(num.toString());
}

function serializeRegExpLiteral(node) {
    return [
        serializeSpan(node.span),
        serializeJsWord(node.pattern),
        serializeJsWord(node.flags)
    ];
}

function finalizeRegExpLiteral(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeJsWord(finalizeData[1]);
    finalizeJsWord(finalizeData[2]);
}

function serializeJSXText(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeJSXText(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeJSXMemberExpression(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeJSXMemberExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeJSXNamespacedName(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeJSXNamespacedName(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeJSXEmptyExpression(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeJSXEmptyExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeJSXElement(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeJSXElement(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeJSXFragment(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeJSXFragment(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsTypeAssertion(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsTypeAssertion(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsConstAssertion(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsConstAssertion(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsNonNullExpression(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsNonNullExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsAsExpression(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsAsExpression(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsInstantiation(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsInstantiation(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsTypeAnnotation(node) {
    return [
        serializeSpan(node.span),
        serializeBoxTsType(node.typeAnnotation)
    ];
}

function finalizeTsTypeAnnotation(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeBox(finalizeData[1]);
}

function serializeTsInterfaceDeclaration(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsInterfaceDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsTypeAliasDeclaration(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsTypeAliasDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsEnumDeclaration(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsEnumDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsModuleDeclaration(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsModuleDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsImportEqualsDeclaration(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsImportEqualsDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsExportAssignment(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsExportAssignment(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsNamespaceExportDeclaration(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsNamespaceExportDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsTypeParamDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeVecTsTypeParameter(node.parameters)
    ];
}

function finalizeTsTypeParamDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeTsTypeParameterInstantiation(node) {
    return [
        serializeSpan(node.span),
        serializeVecBoxTsType(node.params)
    ];
}

function finalizeTsTypeParameterInstantiation(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeTsExpressionWithTypeArg(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsExpressionWithTypeArg(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsIndexSignature(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsIndexSignature(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsParamProp(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsParamProp(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsTypeParameterDeclaration(node) {
    return [
        serializeSpan(node.span),
        serializeVecTsTypeParameter(node.parameters)
    ];
}

function finalizeTsTypeParameterDeclaration(finalizeData) {
    finalizeSpan(finalizeData[0]);
    finalizeVec(finalizeData[1]);
}

function serializeTsTypeParameter(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsTypeParameter(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeTsType(node) {
    return [
        serializeSpan(node.span)
    ];
}

function finalizeTsType(finalizeData) {
    finalizeSpan(finalizeData[0]);
}

function serializeAccessibility(value) {
    switch (value) {
        case 'public': return 0;
        case 'protected': return 1;
        case 'private': return 2;
        default: throw new Error('Unexpected enum value for Accessibility');
    }
}

function serializeJsWord(str) {
    const strBuffer = Buffer.from(str, 'utf8'),
        len = strBuffer.length;
    if (len <= 7) return [len, 0, strBuffer];

    const strPos = pos;
    alloc(len);
    strBuffer.copy(buff, pos, 0, len);
    pos += len;
    return [len, strPos, undefined];
}

function finalizeJsWord([len, strPos, strBuffer]) {
    if (len <= 7) {
        strBuffer.copy(buff, pos, 0, len);
        buff[pos + 7] = len;
    } else {
        uint32[pos >> 2] = len;
        int32[(pos >> 2) + 1] = strPos - pos;
    }
    pos += 8;
}

function serializeBoolean(value) {
    switch (value) {
        case false: return 0;
        case true: return 1;
        default: throw new Error('Unexpected enum value for Boolean');
    }
}

function serializeNumber(num) {
    return num;
}

function finalizeNumber(num) {
    float64[pos >> 3] = num;
    pos += 16;
}

function serializeSpan(span) {
    return span;
}

function finalizeSpan(span) {
    const pos32 = pos >> 2;
    uint32[pos32] = span.start;
    uint32[pos32 + 1] = span.end;
    uint32[pos32 + 2] = span.ctxt;
    pos += 12;
}

function serializeOptionJsWord(value) {
    return serializeOption(value, serializeJsWord);
}

function finalizeOptionJsWord(finalizeData) {
    return finalizeOption(finalizeData, finalizeJsWord, 8, 4);
}

function serializeOptionModuleExportName(value) {
    return serializeOption(value, serializeModuleExportName);
}

function finalizeOptionModuleExportName(finalizeData) {
    return finalizeOption(finalizeData, finalizeModuleExportName, 36, 4);
}

function serializeVecImportSpecifier(values) {
    return serializeVec(values, serializeImportSpecifier, finalizeImportSpecifier, 84, 4);
}

function serializeOptionSpan(value) {
    return serializeOption(value, serializeSpan);
}

function finalizeOptionSpan(finalizeData) {
    return finalizeOption(finalizeData, finalizeSpan, 12, 4);
}

function serializeOptionExpressionOrSpread(value) {
    return serializeOption(value, serializeExpressionOrSpread);
}

function finalizeOptionExpressionOrSpread(finalizeData) {
    return finalizeOption(finalizeData, finalizeExpressionOrSpread, 20, 4);
}

function serializeVecOptionExpressionOrSpread(values) {
    return serializeVec(values, serializeOptionExpressionOrSpread, finalizeOptionExpressionOrSpread, 24, 4);
}

function serializeOptionIdentifier(value) {
    return serializeOption(value, serializeIdentifier);
}

function finalizeOptionIdentifier(finalizeData) {
    return finalizeOption(finalizeData, finalizeIdentifier, 24, 4);
}

function serializeVecDecorator(values) {
    return serializeVec(values, serializeDecorator, finalizeDecorator, 16, 4);
}

function serializeBoxTsType(value) {
    return serializeBox(value, serializeTsType, finalizeTsType, 12, 4);
}

function serializeOptionTsTypeAnnotation(value) {
    return serializeOption(value, serializeTsTypeAnnotation);
}

function finalizeOptionTsTypeAnnotation(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsTypeAnnotation, 16, 4);
}

function serializeOptionPattern(value) {
    return serializeOption(value, serializePattern);
}

function finalizeOptionPattern(finalizeData) {
    return finalizeOption(finalizeData, finalizePattern, 52, 4);
}

function serializeVecOptionPattern(values) {
    return serializeVec(values, serializeOptionPattern, finalizeOptionPattern, 56, 4);
}

function serializeBoxPattern(value) {
    return serializeBox(value, serializePattern, finalizePattern, 52, 4);
}

function serializeOptionBoxExpression(value) {
    return serializeOption(value, serializeBoxExpression);
}

function finalizeOptionBoxExpression(finalizeData) {
    return finalizeOption(finalizeData, finalizeBox, 4, 4);
}

function serializeVecObjectPatternProperty(values) {
    return serializeVec(values, serializeObjectPatternProperty, finalizeObjectPatternProperty, 56, 8);
}

function serializeVecParameter(values) {
    return serializeVec(values, serializeParameter, finalizeParameter, 72, 4);
}

function serializeBoxStatement(value) {
    return serializeBox(value, serializeStatement, finalizeStatement, 152, 4);
}

function serializeOptionBoxStatement(value) {
    return serializeOption(value, serializeBoxStatement);
}

function finalizeOptionBoxStatement(finalizeData) {
    return finalizeOption(finalizeData, finalizeBox, 4, 4);
}

function serializeVecSwitchCase(values) {
    return serializeVec(values, serializeSwitchCase, finalizeSwitchCase, 28, 4);
}

function serializeOptionCatchClause(value) {
    return serializeOption(value, serializeCatchClause);
}

function finalizeOptionCatchClause(finalizeData) {
    return finalizeOption(finalizeData, finalizeCatchClause, 88, 4);
}

function serializeVecVariableDeclarator(values) {
    return serializeVec(values, serializeVariableDeclarator, finalizeVariableDeclarator, 76, 4);
}

function serializeVariableDeclarationOrBoxExpression(node) {
    switch(node.type) {
        case 'VariableDeclaration': return [0, 4, serializeVariableDeclaration(node), finalizeVariableDeclaration];
        case 'ThisExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrayExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ObjectExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'FunctionExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'UnaryExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'UpdateExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'BinaryExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'AssignmentExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'MemberExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'SuperPropExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ConditionalExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'CallExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'NewExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'SequenceExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'Identifier': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'StringLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'BooleanLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'NullLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'NumericLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'BigIntLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'RegExpLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXText': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TemplateLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TaggedTemplateExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrowFunctionExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ClassExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'YieldExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'MetaProperty': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'AwaitExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ParenthesisExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXMemberExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXNamespacedName': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXEmptyExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXElement': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXFragment': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsTypeAssertion': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsConstAssertion': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsNonNullExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsAsExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsInstantiation': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'PrivateName': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'OptionalChainingExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'Invalid': return [1, 4, serializeBoxExpression(node), finalizeBox];
        default: throw new Error('Unexpected enum value for VariableDeclarationOrBoxExpression');
    }
}

function finalizeVariableDeclarationOrBoxExpression(finalizeData) {
    finalizeEnum(finalizeData, 28);
}

function serializeOptionVariableDeclarationOrBoxExpression(value) {
    return serializeOption(value, serializeVariableDeclarationOrBoxExpression);
}

function finalizeOptionVariableDeclarationOrBoxExpression(finalizeData) {
    return finalizeOption(finalizeData, finalizeVariableDeclarationOrBoxExpression, 28, 4);
}

function serializeVariableDeclarationOrPattern(node) {
    switch(node.type) {
        case 'VariableDeclaration': return [0, 4, serializeVariableDeclaration(node), finalizeVariableDeclaration];
        case 'Identifier': return [1, 4, serializePattern(node), finalizePattern];
        case 'ArrayPattern': return [1, 4, serializePattern(node), finalizePattern];
        case 'RestElement': return [1, 4, serializePattern(node), finalizePattern];
        case 'ObjectPattern': return [1, 4, serializePattern(node), finalizePattern];
        case 'AssignmentPattern': return [1, 4, serializePattern(node), finalizePattern];
        case 'Invalid': return [1, 4, serializePattern(node), finalizePattern];
        case 'ThisExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'ArrayExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'ObjectExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'FunctionExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'UnaryExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'UpdateExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'BinaryExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'AssignmentExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'MemberExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'SuperPropExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'ConditionalExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'CallExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'NewExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'SequenceExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'StringLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'BooleanLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'NullLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'NumericLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'BigIntLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'RegExpLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'JSXText': return [1, 4, serializePattern(node), finalizePattern];
        case 'TemplateLiteral': return [1, 4, serializePattern(node), finalizePattern];
        case 'TaggedTemplateExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'ArrowFunctionExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'ClassExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'YieldExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'MetaProperty': return [1, 4, serializePattern(node), finalizePattern];
        case 'AwaitExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'ParenthesisExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'JSXMemberExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'JSXNamespacedName': return [1, 4, serializePattern(node), finalizePattern];
        case 'JSXEmptyExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'JSXElement': return [1, 4, serializePattern(node), finalizePattern];
        case 'JSXFragment': return [1, 4, serializePattern(node), finalizePattern];
        case 'TsTypeAssertion': return [1, 4, serializePattern(node), finalizePattern];
        case 'TsConstAssertion': return [1, 4, serializePattern(node), finalizePattern];
        case 'TsNonNullExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'TsAsExpression': return [1, 4, serializePattern(node), finalizePattern];
        case 'TsInstantiation': return [1, 4, serializePattern(node), finalizePattern];
        case 'PrivateName': return [1, 4, serializePattern(node), finalizePattern];
        case 'OptionalChainingExpression': return [1, 4, serializePattern(node), finalizePattern];
        default: throw new Error('Unexpected enum value for VariableDeclarationOrPattern');
    }
}

function finalizeVariableDeclarationOrPattern(finalizeData) {
    finalizeEnum(finalizeData, 56);
}

function serializeTsParamPropOrParameter(node) {
    switch(node.type) {
        case 'TsParamProp': return [0, 4, serializeTsParamProp(node), finalizeTsParamProp];
        case 'Parameter': return [1, 4, serializeParameter(node), finalizeParameter];
        default: throw new Error('Unexpected enum value for TsParamPropOrParameter');
    }
}

function finalizeTsParamPropOrParameter(finalizeData) {
    finalizeEnum(finalizeData, 76);
}

function serializeVecTsParamPropOrParameter(values) {
    return serializeVec(values, serializeTsParamPropOrParameter, finalizeTsParamPropOrParameter, 76, 4);
}

function serializeOptionAccessibility(value) {
    return serializeOption(value, serializeAccessibility);
}

function finalizeOptionAccessibility(finalizeData) {
    return finalizeOption(finalizeData, finalizeEnumValue, 1, 1);
}

function serializeVecTsTypeParameter(values) {
    return serializeVec(values, serializeTsTypeParameter, finalizeTsTypeParameter, 12, 4);
}

function serializeOptionTsTypeParamDeclaration(value) {
    return serializeOption(value, serializeTsTypeParamDeclaration);
}

function finalizeOptionTsTypeParamDeclaration(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsTypeParamDeclaration, 20, 4);
}

function serializeVecClassMember(values) {
    return serializeVec(values, serializeClassMember, finalizeClassMember, 168, 8);
}

function serializeVecBoxTsType(values) {
    return serializeVec(values, serializeBoxTsType, finalizeBox, 4, 4);
}

function serializeOptionTsTypeParameterInstantiation(value) {
    return serializeOption(value, serializeTsTypeParameterInstantiation);
}

function finalizeOptionTsTypeParameterInstantiation(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsTypeParameterInstantiation, 20, 4);
}

function serializeVecTsExpressionWithTypeArg(values) {
    return serializeVec(values, serializeTsExpressionWithTypeArg, finalizeTsExpressionWithTypeArg, 12, 4);
}

function serializeOptionTsTypeParameterDeclaration(value) {
    return serializeOption(value, serializeTsTypeParameterDeclaration);
}

function finalizeOptionTsTypeParameterDeclaration(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsTypeParameterDeclaration, 20, 4);
}

function serializeVecStatement(values) {
    return serializeVec(values, serializeStatement, finalizeStatement, 152, 4);
}

function serializeIdentifierOrPrivateNameOrComputed(node) {
    switch(node.type) {
        case 'Identifier': return [0, 4, serializeIdentifier(node), finalizeIdentifier];
        case 'PrivateName': return [1, 4, serializePrivateName(node), finalizePrivateName];
        case 'Computed': return [2, 4, serializeComputed(node), finalizeComputed];
        default: throw new Error('Unexpected enum value for IdentifierOrPrivateNameOrComputed');
    }
}

function finalizeIdentifierOrPrivateNameOrComputed(finalizeData) {
    finalizeEnum(finalizeData, 40);
}

function serializeIdentifierOrComputed(node) {
    switch(node.type) {
        case 'Identifier': return [0, 4, serializeIdentifier(node), finalizeIdentifier];
        case 'Computed': return [1, 4, serializeComputed(node), finalizeComputed];
        default: throw new Error('Unexpected enum value for IdentifierOrComputed');
    }
}

function finalizeIdentifierOrComputed(finalizeData) {
    finalizeEnum(finalizeData, 28);
}

function serializeSuperOrImportOrBoxExpression(node) {
    switch(node.type) {
        case 'Super': return [0, 4, serializeSuper(node), finalizeSuper];
        case 'Import': return [1, 4, serializeImport(node), finalizeImport];
        case 'ThisExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrayExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'ObjectExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'FunctionExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'UnaryExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'UpdateExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'BinaryExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'AssignmentExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'MemberExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'SuperPropExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'ConditionalExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'CallExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'NewExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'SequenceExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'Identifier': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'StringLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'BooleanLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'NullLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'NumericLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'BigIntLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'RegExpLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXText': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TemplateLiteral': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TaggedTemplateExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrowFunctionExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'ClassExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'YieldExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'MetaProperty': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'AwaitExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'ParenthesisExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXMemberExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXNamespacedName': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXEmptyExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXElement': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXFragment': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsTypeAssertion': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsConstAssertion': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsNonNullExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsAsExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsInstantiation': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'PrivateName': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'OptionalChainingExpression': return [2, 4, serializeBoxExpression(node), finalizeBox];
        case 'Invalid': return [2, 4, serializeBoxExpression(node), finalizeBox];
        default: throw new Error('Unexpected enum value for SuperOrImportOrBoxExpression');
    }
}

function finalizeSuperOrImportOrBoxExpression(finalizeData) {
    finalizeEnum(finalizeData, 16);
}

function serializeVecExpressionOrSpread(values) {
    return serializeVec(values, serializeExpressionOrSpread, finalizeExpressionOrSpread, 20, 4);
}

function serializeOptionVecExpressionOrSpread(value) {
    return serializeOption(value, serializeVecExpressionOrSpread);
}

function finalizeOptionVecExpressionOrSpread(finalizeData) {
    return finalizeOption(finalizeData, finalizeVec, 8, 4);
}

function serializeVecBoxExpression(values) {
    return serializeVec(values, serializeBoxExpression, finalizeBox, 4, 4);
}

function serializeVecTemplateElement(values) {
    return serializeVec(values, serializeTemplateElement, finalizeTemplateElement, 36, 4);
}

function serializeVecPattern(values) {
    return serializeVec(values, serializePattern, finalizePattern, 52, 4);
}

function serializeBlockStatementOrBoxExpression(node) {
    switch(node.type) {
        case 'BlockStatement': return [0, 4, serializeBlockStatement(node), finalizeBlockStatement];
        case 'ThisExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrayExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ObjectExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'FunctionExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'UnaryExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'UpdateExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'BinaryExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'AssignmentExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'MemberExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'SuperPropExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ConditionalExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'CallExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'NewExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'SequenceExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'Identifier': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'StringLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'BooleanLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'NullLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'NumericLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'BigIntLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'RegExpLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXText': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TemplateLiteral': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TaggedTemplateExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ArrowFunctionExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ClassExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'YieldExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'MetaProperty': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'AwaitExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'ParenthesisExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXMemberExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXNamespacedName': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXEmptyExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXElement': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'JSXFragment': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsTypeAssertion': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsConstAssertion': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsNonNullExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsAsExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'TsInstantiation': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'PrivateName': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'OptionalChainingExpression': return [1, 4, serializeBoxExpression(node), finalizeBox];
        case 'Invalid': return [1, 4, serializeBoxExpression(node), finalizeBox];
        default: throw new Error('Unexpected enum value for BlockStatementOrBoxExpression');
    }
}

function finalizeBlockStatementOrBoxExpression(finalizeData) {
    finalizeEnum(finalizeData, 24);
}

function serializeMemberExpressionOrOptionalChainingCall(node) {
    switch(node.type) {
        case 'MemberExpression': return [0, 4, serializeMemberExpression(node), finalizeMemberExpression];
        case 'CallExpression': return [1, 4, serializeOptionalChainingCall(node), finalizeOptionalChainingCall];
        default: throw new Error('Unexpected enum value for MemberExpressionOrOptionalChainingCall');
    }
}

function finalizeMemberExpressionOrOptionalChainingCall(finalizeData) {
    finalizeEnum(finalizeData, 60);
}

function serializeBoxExpression(value) {
    return serializeBox(value, serializeExpression, finalizeExpression, 136, 8);
}

function serializeBoxObjectProperty(value) {
    return serializeBox(value, serializeObjectProperty, finalizeObjectProperty, 152, 8);
}

function serializeSpreadElementOrBoxObjectProperty(node) {
    switch(node.type) {
        case 'SpreadElement': return [0, 4, serializeSpreadElement(node), finalizeSpreadElement];
        case 'Identifier': return [1, 4, serializeBoxObjectProperty(node), finalizeBox];
        case 'KeyValueProperty': return [1, 4, serializeBoxObjectProperty(node), finalizeBox];
        case 'AssignmentProperty': return [1, 4, serializeBoxObjectProperty(node), finalizeBox];
        case 'GetterProperty': return [1, 4, serializeBoxObjectProperty(node), finalizeBox];
        case 'SetterProperty': return [1, 4, serializeBoxObjectProperty(node), finalizeBox];
        case 'MethodProperty': return [1, 4, serializeBoxObjectProperty(node), finalizeBox];
        default: throw new Error('Unexpected enum value for SpreadElementOrBoxObjectProperty');
    }
}

function finalizeSpreadElementOrBoxObjectProperty(finalizeData) {
    finalizeEnum(finalizeData, 20);
}

function serializeVecSpreadElementOrBoxObjectProperty(values) {
    return serializeVec(values, serializeSpreadElementOrBoxObjectProperty, finalizeSpreadElementOrBoxObjectProperty, 20, 4);
}

function serializeOptionObjectExpression(value) {
    return serializeOption(value, serializeObjectExpression);
}

function finalizeOptionObjectExpression(finalizeData) {
    return finalizeOption(finalizeData, finalizeObjectExpression, 20, 4);
}

function serializeVecExportSpecifier(values) {
    return serializeVec(values, serializeExportSpecifier, finalizeExportSpecifier, 96, 4);
}

function serializeOptionStringLiteral(value) {
    return serializeOption(value, serializeStringLiteral);
}

function finalizeOptionStringLiteral(finalizeData) {
    return finalizeOption(finalizeData, finalizeStringLiteral, 32, 4);
}

function serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(node) {
    switch(node.type) {
        case 'ClassExpression': return [0, 4, serializeClassExpression(node), finalizeClassExpression];
        case 'FunctionExpression': return [1, 4, serializeFunctionExpression(node), finalizeFunctionExpression];
        case 'TsInterfaceDeclaration': return [2, 4, serializeTsInterfaceDeclaration(node), finalizeTsInterfaceDeclaration];
        default: throw new Error('Unexpected enum value for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration');
    }
}

function finalizeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(finalizeData) {
    finalizeEnum(finalizeData, 132);
}

function serializeModuleDeclarationOrStatement(node) {
    switch(node.type) {
        case 'ImportDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'ExportDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'ExportNamedDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'ExportDefaultDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'ExportDefaultExpression': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'ExportAllDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'TsImportEqualsDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'TsExportAssignment': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'TsNamespaceExportDeclaration': return [0, 4, serializeModuleDeclaration(node), finalizeModuleDeclaration];
        case 'BlockStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'EmptyStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'DebuggerStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'WithStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ReturnStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'LabeledStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'BreakStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ContinueStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'IfStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'SwitchStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ThrowStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'TryStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'WhileStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'DoWhileStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ForStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ForInStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ForOfStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ClassDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'FunctionDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'VariableDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'TsInterfaceDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'TsTypeAliasDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'TsEnumDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'TsModuleDeclaration': return [1, 4, serializeStatement(node), finalizeStatement];
        case 'ExpressionStatement': return [1, 4, serializeStatement(node), finalizeStatement];
        default: throw new Error('Unexpected enum value for ModuleDeclarationOrStatement');
    }
}

function finalizeModuleDeclarationOrStatement(finalizeData) {
    finalizeEnum(finalizeData, 156);
}

function serializeVecModuleDeclarationOrStatement(values) {
    return serializeVec(values, serializeModuleDeclarationOrStatement, finalizeModuleDeclarationOrStatement, 156, 4);
}

function serializeOption(value, serialize) {
    if (value === null) return null;
    return serialize(value);
}

function serializeBox(value, serialize, finalize, valueLength, valueAlign) {
    const finalizeData = serialize(value);
    alignAndAlloc(valueLength, valueAlign);
    const valuePos = pos;
    finalize(finalizeData);
    return valuePos;
}

function serializeVec(values, serialize, finalize, valueLength, valueAlign) {
    const numValues = values.length;
    if (numValues === 0) {
        alignAndAlloc(0, valueAlign);
        return [0, pos];
    }

    const finalizeData = new Array(numValues);
    for (let i = 0; i < numValues; i++) {
        finalizeData[i] = serialize(values[i]);
    }

    alignAndAlloc(valueLength * numValues, valueAlign);
    const valuesPos = pos;
    for (let i = 0; i < numValues; i++) {
        finalize(finalizeData[i]);
    }
    return [numValues, valuesPos];
}

function finalizeEnum([id, align, finalizeData, finalize], length) {
    const startPos = pos;
    buff[pos] = id;
    pos += align;
    finalize(finalizeData);
    pos = startPos + length;
}

function finalizeEnumValue(id) {
    buff[pos] = id;
    pos++;
}

function finalizeOption(finalizeData, finalize, valueLength, offset) {
    if (finalizeData === null) {
        buff[pos] = 0;
        pos += offset + valueLength;
    } else {
        buff[pos] = 1;
        pos += offset;
        finalize(finalizeData);
    };
}

function finalizeBox(valuePos) {
    int32[pos >> 2] = valuePos - pos;
    pos += 4;
}

function finalizeVec([numValues, valuesPos]) {
    int32[pos >> 2] = valuesPos - pos;
    uint32[(pos >> 2) + 1] = numValues;
    pos += 8;
}

function initBuffer() {
    buff = Buffer.allocUnsafeSlow(buffLen);
    const arrayBuffer = buff.buffer;
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

function alloc(bytes) {
    const end = pos + bytes;
    if (end <= buffLen) return;

    do {
        buffLen *= 2;
    } while (buffLen < end);

    const oldBuff = buff;
    initBuffer();
    oldBuff.copy(buff, 0, 0, pos);
}

function alignAndAlloc(bytes, align) {
    if (align !== 1) {
        const modulus = pos & (align - 1);
        if (modulus !== 0) pos += align - modulus;
    }
    alloc(bytes);
}

serialize.initBuffer = initBuffer;

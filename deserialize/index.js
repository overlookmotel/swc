// Generated code. Do not edit.

'use strict';

module.exports = deserialize;

function deserialize(buff) {
    const { buffer } = buff;
    return deserializeProgram(
        Buffer.from(buffer),
        new Int32Array(buffer),
        new Uint32Array(buffer),
        buff.byteOffset + buff.length - 36
    );
}

function deserializeProgram(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeModule(buff, int32, uint32, pos + 4);
        case 1: return deserializeScript(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for Program');
    }
}

function deserializeModule(buff, int32, uint32, pos) {
    return {
        type: 'Module',
        span: deserializeSpan(buff, int32, uint32, pos),
        body: deserializeVecModuleDeclarationOrStatement(buff, int32, uint32, pos + 12),
        interpreter: deserializeOptionJsWord(buff, int32, uint32, pos + 20)
    };
}

function deserializeScript(buff, int32, uint32, pos) {
    return {
        type: 'Script',
        span: deserializeSpan(buff, int32, uint32, pos),
        body: deserializeVecStatement(buff, int32, uint32, pos + 12),
        interpreter: deserializeOptionJsWord(buff, int32, uint32, pos + 20)
    };
}

function deserializeModuleDeclaration(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeImportDeclaration(buff, int32, uint32, pos + 4);
        case 1: return deserializeExportDeclaration(buff, int32, uint32, pos + 4);
        case 2: return deserializeExportNamedDeclaration(buff, int32, uint32, pos + 4);
        case 3: return deserializeExportDefaultDeclaration(buff, int32, uint32, pos + 4);
        case 4: return deserializeExportDefaultExpression(buff, int32, uint32, pos + 4);
        case 5: return deserializeExportAllDeclaration(buff, int32, uint32, pos + 4);
        case 6: return deserializeTsImportEqualsDeclaration(buff, int32, uint32, pos + 4);
        case 7: return deserializeTsExportAssignment(buff, int32, uint32, pos + 4);
        case 8: return deserializeTsNamespaceExportDeclaration(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ModuleDeclaration');
    }
}

function deserializeImportDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'ImportDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        specifiers: deserializeVecImportSpecifier(buff, int32, uint32, pos + 12),
        source: deserializeStringLiteral(buff, int32, uint32, pos + 20),
        typeOnly: deserializeBoolean(buff, int32, uint32, pos + 52),
        asserts: deserializeOptionObjectExpression(buff, int32, uint32, pos + 56)
    };
}

function deserializeImportSpecifier(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeImportNamedSpecifier(buff, int32, uint32, pos + 4);
        case 1: return deserializeImportDefaultSpecifier(buff, int32, uint32, pos + 4);
        case 2: return deserializeImportNamespaceSpecifier(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ImportSpecifier');
    }
}

function deserializeImportNamedSpecifier(buff, int32, uint32, pos) {
    return {
        type: 'ImportSpecifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        local: deserializeIdentifier(buff, int32, uint32, pos + 12),
        imported: deserializeOptionModuleExportName(buff, int32, uint32, pos + 36),
        isTypeOnly: deserializeBoolean(buff, int32, uint32, pos + 76)
    };
}

function deserializeImportDefaultSpecifier(buff, int32, uint32, pos) {
    return {
        type: 'ImportDefaultSpecifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        local: deserializeIdentifier(buff, int32, uint32, pos + 12)
    };
}

function deserializeImportNamespaceSpecifier(buff, int32, uint32, pos) {
    return {
        type: 'ImportNamespaceSpecifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        local: deserializeIdentifier(buff, int32, uint32, pos + 12)
    };
}

function deserializeExportDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'ExportDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        declaration: deserializeDeclaration(buff, int32, uint32, pos + 12)
    };
}

function deserializeExportNamedDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'ExportNamedDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        specifiers: deserializeVecExportSpecifier(buff, int32, uint32, pos + 12),
        source: deserializeOptionStringLiteral(buff, int32, uint32, pos + 20),
        typeOnly: deserializeBoolean(buff, int32, uint32, pos + 56),
        asserts: deserializeOptionObjectExpression(buff, int32, uint32, pos + 60)
    };
}

function deserializeExportSpecifier(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeExportNamespaceSpecifier(buff, int32, uint32, pos + 4);
        case 1: return deserializeExportDefaultSpecifier(buff, int32, uint32, pos + 4);
        case 2: return deserializeExportNamedSpecifier(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ExportSpecifier');
    }
}

function deserializeExportNamespaceSpecifier(buff, int32, uint32, pos) {
    return {
        type: 'ExportNamespaceSpecifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        name: deserializeModuleExportName(buff, int32, uint32, pos + 12)
    };
}

function deserializeExportDefaultSpecifier(buff, int32, uint32, pos) {
    return {
        type: 'ExportDefaultSpecifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        exported: deserializeIdentifier(buff, int32, uint32, pos + 12)
    };
}

function deserializeExportNamedSpecifier(buff, int32, uint32, pos) {
    return {
        type: 'ExportSpecifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        orig: deserializeModuleExportName(buff, int32, uint32, pos + 12),
        exported: deserializeOptionModuleExportName(buff, int32, uint32, pos + 48),
        isTypeOnly: deserializeBoolean(buff, int32, uint32, pos + 88)
    };
}

function deserializeExportDefaultDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'ExportDefaultDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        decl: deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(buff, int32, uint32, pos + 12)
    };
}

function deserializeExportDefaultExpression(buff, int32, uint32, pos) {
    return {
        type: 'ExportDefaultExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        expression: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeExportAllDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'ExportAllDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        source: deserializeStringLiteral(buff, int32, uint32, pos + 12),
        asserts: deserializeOptionObjectExpression(buff, int32, uint32, pos + 44)
    };
}

function deserializeModuleExportName(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(buff, int32, uint32, pos + 4);
        case 1: return deserializeStringLiteral(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ModuleExportName');
    }
}

function deserializeStatement(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeBlockStatement(buff, int32, uint32, pos + 4);
        case 1: return deserializeEmptyStatement(buff, int32, uint32, pos + 4);
        case 2: return deserializeDebuggerStatement(buff, int32, uint32, pos + 4);
        case 3: return deserializeWithStatement(buff, int32, uint32, pos + 4);
        case 4: return deserializeReturnStatement(buff, int32, uint32, pos + 4);
        case 5: return deserializeLabeledStatement(buff, int32, uint32, pos + 4);
        case 6: return deserializeBreakStatement(buff, int32, uint32, pos + 4);
        case 7: return deserializeContinueStatement(buff, int32, uint32, pos + 4);
        case 8: return deserializeIfStatement(buff, int32, uint32, pos + 4);
        case 9: return deserializeSwitchStatement(buff, int32, uint32, pos + 4);
        case 10: return deserializeThrowStatement(buff, int32, uint32, pos + 4);
        case 11: return deserializeTryStatement(buff, int32, uint32, pos + 4);
        case 12: return deserializeWhileStatement(buff, int32, uint32, pos + 4);
        case 13: return deserializeDoWhileStatement(buff, int32, uint32, pos + 4);
        case 14: return deserializeForStatement(buff, int32, uint32, pos + 4);
        case 15: return deserializeForInStatement(buff, int32, uint32, pos + 4);
        case 16: return deserializeForOfStatement(buff, int32, uint32, pos + 4);
        case 17: return deserializeDeclaration(buff, int32, uint32, pos + 4);
        case 18: return deserializeExpressionStatement(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for Statement');
    }
}

function deserializeBlockStatement(buff, int32, uint32, pos) {
    return {
        type: 'BlockStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        stmts: deserializeVecStatement(buff, int32, uint32, pos + 12)
    };
}

function deserializeOptionBlockStatement(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeBlockStatement, 4);
}

function deserializeEmptyStatement(buff, int32, uint32, pos) {
    return {
        type: 'EmptyStatement',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeDebuggerStatement(buff, int32, uint32, pos) {
    return {
        type: 'DebuggerStatement',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeWithStatement(buff, int32, uint32, pos) {
    return {
        type: 'WithStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        object: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 16)
    };
}

function deserializeReturnStatement(buff, int32, uint32, pos) {
    return {
        type: 'ReturnStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        argument: deserializeOptionBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeLabeledStatement(buff, int32, uint32, pos) {
    return {
        type: 'LabeledStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        label: deserializeIdentifier(buff, int32, uint32, pos + 12),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 36)
    };
}

function deserializeBreakStatement(buff, int32, uint32, pos) {
    return {
        type: 'BreakStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        label: deserializeOptionIdentifier(buff, int32, uint32, pos + 12)
    };
}

function deserializeContinueStatement(buff, int32, uint32, pos) {
    return {
        type: 'ContinueStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        label: deserializeOptionIdentifier(buff, int32, uint32, pos + 12)
    };
}

function deserializeIfStatement(buff, int32, uint32, pos) {
    return {
        type: 'IfStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        test: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        consequent: deserializeBoxStatement(buff, int32, uint32, pos + 16),
        alternate: deserializeOptionBoxStatement(buff, int32, uint32, pos + 20)
    };
}

function deserializeSwitchStatement(buff, int32, uint32, pos) {
    return {
        type: 'SwitchStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        discriminant: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        cases: deserializeVecSwitchCase(buff, int32, uint32, pos + 16)
    };
}

function deserializeSwitchCase(buff, int32, uint32, pos) {
    return {
        type: 'SwitchCase',
        span: deserializeSpan(buff, int32, uint32, pos),
        test: deserializeOptionBoxExpression(buff, int32, uint32, pos + 12),
        consequent: deserializeVecStatement(buff, int32, uint32, pos + 20)
    };
}

function deserializeThrowStatement(buff, int32, uint32, pos) {
    return {
        type: 'ThrowStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        argument: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeTryStatement(buff, int32, uint32, pos) {
    return {
        type: 'TryStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        block: deserializeBlockStatement(buff, int32, uint32, pos + 12),
        handler: deserializeOptionCatchClause(buff, int32, uint32, pos + 32),
        finalizer: deserializeOptionBlockStatement(buff, int32, uint32, pos + 124)
    };
}

function deserializeCatchClause(buff, int32, uint32, pos) {
    return {
        type: 'CatchClause',
        span: deserializeSpan(buff, int32, uint32, pos),
        param: deserializeOptionPattern(buff, int32, uint32, pos + 12),
        body: deserializeBlockStatement(buff, int32, uint32, pos + 68)
    };
}

function deserializeWhileStatement(buff, int32, uint32, pos) {
    return {
        type: 'WhileStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        test: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 16)
    };
}

function deserializeDoWhileStatement(buff, int32, uint32, pos) {
    return {
        type: 'DoWhileStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        test: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 16)
    };
}

function deserializeForStatement(buff, int32, uint32, pos) {
    return {
        type: 'ForStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        init: deserializeOptionVariableDeclarationOrBoxExpression(buff, int32, uint32, pos + 12),
        test: deserializeOptionBoxExpression(buff, int32, uint32, pos + 44),
        update: deserializeOptionBoxExpression(buff, int32, uint32, pos + 52),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 60)
    };
}

function deserializeForInStatement(buff, int32, uint32, pos) {
    return {
        type: 'ForInStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        left: deserializeVariableDeclarationOrPattern(buff, int32, uint32, pos + 12),
        right: deserializeBoxExpression(buff, int32, uint32, pos + 68),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 72)
    };
}

function deserializeForOfStatement(buff, int32, uint32, pos) {
    return {
        type: 'ForOfStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        await: deserializeOptionSpan(buff, int32, uint32, pos + 12),
        left: deserializeVariableDeclarationOrPattern(buff, int32, uint32, pos + 28),
        right: deserializeBoxExpression(buff, int32, uint32, pos + 84),
        body: deserializeBoxStatement(buff, int32, uint32, pos + 88)
    };
}

function deserializeExpressionStatement(buff, int32, uint32, pos) {
    return {
        type: 'ExpressionStatement',
        span: deserializeSpan(buff, int32, uint32, pos),
        expression: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeDeclaration(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeClassDeclaration(buff, int32, uint32, pos + 4);
        case 1: return deserializeFunctionDeclaration(buff, int32, uint32, pos + 4);
        case 2: return deserializeVariableDeclaration(buff, int32, uint32, pos + 4);
        case 3: return deserializeTsInterfaceDeclaration(buff, int32, uint32, pos + 4);
        case 4: return deserializeTsTypeAliasDeclaration(buff, int32, uint32, pos + 4);
        case 5: return deserializeTsEnumDeclaration(buff, int32, uint32, pos + 4);
        case 6: return deserializeTsModuleDeclaration(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for Declaration');
    }
}

function deserializeVariableDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'VariableDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        kind: deserializeVariableDeclarationKind(buff, int32, uint32, pos + 12),
        declare: deserializeBoolean(buff, int32, uint32, pos + 13),
        declarations: deserializeVecVariableDeclarator(buff, int32, uint32, pos + 16)
    };
}

function deserializeVariableDeclarationKind(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return 'var';
        case 1: return 'let';
        case 2: return 'const';
        default: throw new Error('Unexpected enum value for VariableDeclarationKind');
    }
}

function deserializeVariableDeclarator(buff, int32, uint32, pos) {
    return {
        type: 'VariableDeclarator',
        span: deserializeSpan(buff, int32, uint32, pos),
        id: deserializePattern(buff, int32, uint32, pos + 12),
        init: deserializeOptionBoxExpression(buff, int32, uint32, pos + 64),
        definite: deserializeBoolean(buff, int32, uint32, pos + 72)
    };
}

function deserializeFunctionDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'FunctionDeclaration',
        identifier: deserializeIdentifier(buff, int32, uint32, pos),
        declare: deserializeBoolean(buff, int32, uint32, pos + 24),
        params: deserializeVecParameter(buff, int32, uint32, pos + 28),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 36),
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 56),
        generator: deserializeBoolean(buff, int32, uint32, pos + 104),
        async: deserializeBoolean(buff, int32, uint32, pos + 105),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, int32, uint32, pos + 80),
        returnType: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 108)
    };
}

function deserializeFunctionExpression(buff, int32, uint32, pos) {
    return {
        type: 'FunctionExpression',
        identifier: deserializeOptionIdentifier(buff, int32, uint32, pos),
        params: deserializeVecParameter(buff, int32, uint32, pos + 28),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 36),
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 56),
        generator: deserializeBoolean(buff, int32, uint32, pos + 104),
        async: deserializeBoolean(buff, int32, uint32, pos + 105),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, int32, uint32, pos + 80),
        returnType: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 108)
    };
}

function deserializeArrowFunctionExpression(buff, int32, uint32, pos) {
    return {
        type: 'ArrowFunctionExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        params: deserializeVecPattern(buff, int32, uint32, pos + 12),
        body: deserializeBlockStatementOrBoxExpression(buff, int32, uint32, pos + 20),
        async: deserializeBoolean(buff, int32, uint32, pos + 68),
        generator: deserializeBoolean(buff, int32, uint32, pos + 69),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, int32, uint32, pos + 44),
        returnType: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 72)
    };
}

function deserializeParameter(buff, int32, uint32, pos) {
    return {
        type: 'Parameter',
        span: deserializeSpan(buff, int32, uint32, pos),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 12),
        pat: deserializePattern(buff, int32, uint32, pos + 20)
    };
}

function deserializeDecorator(buff, int32, uint32, pos) {
    return {
        type: 'Decorator',
        span: deserializeSpan(buff, int32, uint32, pos),
        expression: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeClassDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'ClassDeclaration',
        identifier: deserializeIdentifier(buff, int32, uint32, pos),
        declare: deserializeBoolean(buff, int32, uint32, pos + 24),
        span: deserializeSpan(buff, int32, uint32, pos + 28),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 40),
        body: deserializeVecClassMember(buff, int32, uint32, pos + 48),
        superClass: deserializeOptionBoxExpression(buff, int32, uint32, pos + 56),
        isAbstract: deserializeBoolean(buff, int32, uint32, pos + 64),
        typeParams: deserializeOptionTsTypeParamDeclaration(buff, int32, uint32, pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos + 92),
        implements: deserializeVecTsExpressionWithTypeArg(buff, int32, uint32, pos + 116)
    };
}

function deserializeClassExpression(buff, int32, uint32, pos) {
    return {
        type: 'ClassExpression',
        identifier: deserializeOptionIdentifier(buff, int32, uint32, pos),
        span: deserializeSpan(buff, int32, uint32, pos + 28),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 40),
        body: deserializeVecClassMember(buff, int32, uint32, pos + 48),
        superClass: deserializeOptionBoxExpression(buff, int32, uint32, pos + 56),
        isAbstract: deserializeBoolean(buff, int32, uint32, pos + 64),
        typeParams: deserializeOptionTsTypeParamDeclaration(buff, int32, uint32, pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos + 92),
        implements: deserializeVecTsExpressionWithTypeArg(buff, int32, uint32, pos + 116)
    };
}

function deserializeClassMember(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeConstructor(buff, int32, uint32, pos + 4);
        case 1: return deserializeClassMethod(buff, int32, uint32, pos + 4);
        case 2: return deserializePrivateMethod(buff, int32, uint32, pos + 4);
        case 3: return deserializeClassProperty(buff, int32, uint32, pos + 4);
        case 4: return deserializePrivateProperty(buff, int32, uint32, pos + 4);
        case 5: return deserializeTsIndexSignature(buff, int32, uint32, pos + 4);
        case 6: return deserializeEmptyStatement(buff, int32, uint32, pos + 4);
        case 7: return deserializeStaticBlock(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ClassMember');
    }
}

function deserializeConstructor(buff, int32, uint32, pos) {
    return {
        type: 'Constructor',
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        key: deserializePropertyName(buff, int32, uint32, pos),
        params: deserializeVecTsParamPropOrParameter(buff, int32, uint32, pos + 56),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 64),
        accessibility: deserializeOptionAccessibility(buff, int32, uint32, pos + 88),
        isOptional: deserializeBoolean(buff, int32, uint32, pos + 90)
    };
}

function deserializeClassMethod(buff, int32, uint32, pos) {
    return {
        type: 'ClassMethod',
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        key: deserializePropertyName(buff, int32, uint32, pos),
        function: deserializeFunction(buff, int32, uint32, pos + 56),
        kind: deserializeMethodKind(buff, int32, uint32, pos + 156),
        isStatic: deserializeBoolean(buff, int32, uint32, pos + 157),
        accessibility: deserializeOptionAccessibility(buff, int32, uint32, pos + 160),
        isAbstract: deserializeBoolean(buff, int32, uint32, pos + 158),
        isOptional: deserializeBoolean(buff, int32, uint32, pos + 159),
        isOverride: deserializeBoolean(buff, int32, uint32, pos + 162)
    };
}

function deserializePrivateMethod(buff, int32, uint32, pos) {
    return {
        type: 'PrivateMethod',
        span: deserializeSpan(buff, int32, uint32, pos),
        key: deserializePrivateName(buff, int32, uint32, pos + 12),
        function: deserializeFunction(buff, int32, uint32, pos + 48),
        kind: deserializeMethodKind(buff, int32, uint32, pos + 148),
        isStatic: deserializeBoolean(buff, int32, uint32, pos + 149),
        accessibility: deserializeOptionAccessibility(buff, int32, uint32, pos + 152),
        isAbstract: deserializeBoolean(buff, int32, uint32, pos + 150),
        isOptional: deserializeBoolean(buff, int32, uint32, pos + 151),
        isOverride: deserializeBoolean(buff, int32, uint32, pos + 154)
    };
}

function deserializeClassProperty(buff, int32, uint32, pos) {
    return {
        type: 'ClassProperty',
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        key: deserializePropertyName(buff, int32, uint32, pos),
        value: deserializeOptionBoxExpression(buff, int32, uint32, pos + 56),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 64),
        isStatic: deserializeBoolean(buff, int32, uint32, pos + 92),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 84),
        accessibility: deserializeOptionAccessibility(buff, int32, uint32, pos + 93),
        isAbstract: deserializeBoolean(buff, int32, uint32, pos + 95),
        isOptional: deserializeBoolean(buff, int32, uint32, pos + 96),
        isOverride: deserializeBoolean(buff, int32, uint32, pos + 97),
        readonly: deserializeBoolean(buff, int32, uint32, pos + 98),
        declare: deserializeBoolean(buff, int32, uint32, pos + 99),
        definite: deserializeBoolean(buff, int32, uint32, pos + 100)
    };
}

function deserializePrivateProperty(buff, int32, uint32, pos) {
    return {
        type: 'PrivateProperty',
        span: deserializeSpan(buff, int32, uint32, pos),
        key: deserializePrivateName(buff, int32, uint32, pos + 12),
        value: deserializeOptionBoxExpression(buff, int32, uint32, pos + 48),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 56),
        isStatic: deserializeBoolean(buff, int32, uint32, pos + 84),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 76),
        accessibility: deserializeOptionAccessibility(buff, int32, uint32, pos + 85),
        isOptional: deserializeBoolean(buff, int32, uint32, pos + 87),
        isOverride: deserializeBoolean(buff, int32, uint32, pos + 88),
        readonly: deserializeBoolean(buff, int32, uint32, pos + 89),
        definite: deserializeBoolean(buff, int32, uint32, pos + 90)
    };
}

function deserializeStaticBlock(buff, int32, uint32, pos) {
    return {
        type: 'StaticBlock',
        span: deserializeSpan(buff, int32, uint32, pos),
        body: deserializeBlockStatement(buff, int32, uint32, pos + 12)
    };
}

function deserializeMethodKind(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return 'method';
        case 1: return 'getter';
        case 2: return 'setter';
        default: throw new Error('Unexpected enum value for MethodKind');
    }
}

function deserializeFunction(buff, int32, uint32, pos) {
    return {
        params: deserializeVecParameter(buff, int32, uint32, pos),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 8),
        span: deserializeSpan(buff, int32, uint32, pos + 16),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 28),
        generator: deserializeBoolean(buff, int32, uint32, pos + 76),
        async: deserializeBoolean(buff, int32, uint32, pos + 77),
        typeParameters: deserializeOptionTsTypeParamDeclaration(buff, int32, uint32, pos + 52),
        returnType: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 80)
    };
}

function deserializePattern(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeBindingIdentifier(buff, int32, uint32, pos + 4);
        case 1: return deserializeArrayPattern(buff, int32, uint32, pos + 4);
        case 2: return deserializeRestElement(buff, int32, uint32, pos + 4);
        case 3: return deserializeObjectPattern(buff, int32, uint32, pos + 4);
        case 4: return deserializeAssignmentPattern(buff, int32, uint32, pos + 4);
        case 5: return deserializeInvalid(buff, int32, uint32, pos + 4);
        case 6: return deserializeBoxExpression(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for Pattern');
    }
}

function deserializeBindingIdentifier(buff, int32, uint32, pos) {
    return {
        type: 'Identifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        value: deserializeJsWord(buff, int32, uint32, pos + 12),
        optional: deserializeBoolean(buff, int32, uint32, pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 24)
    };
}

function deserializeArrayPattern(buff, int32, uint32, pos) {
    return {
        type: 'ArrayPattern',
        span: deserializeSpan(buff, int32, uint32, pos),
        elements: deserializeVecOptionPattern(buff, int32, uint32, pos + 12),
        optional: deserializeBoolean(buff, int32, uint32, pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 24)
    };
}

function deserializeRestElement(buff, int32, uint32, pos) {
    return {
        type: 'RestElement',
        span: deserializeSpan(buff, int32, uint32, pos),
        rest: deserializeSpan(buff, int32, uint32, pos + 12),
        argument: deserializeBoxPattern(buff, int32, uint32, pos + 24),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 28)
    };
}

function deserializeObjectPattern(buff, int32, uint32, pos) {
    return {
        type: 'ObjectPattern',
        span: deserializeSpan(buff, int32, uint32, pos),
        properties: deserializeVecObjectPatternProperty(buff, int32, uint32, pos + 12),
        optional: deserializeBoolean(buff, int32, uint32, pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 24)
    };
}

function deserializeObjectPatternProperty(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeKeyValuePatternProperty(buff, int32, uint32, pos + 4);
        case 1: return deserializeAssignmentPatternProperty(buff, int32, uint32, pos + 4);
        case 2: return deserializeRestElement(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ObjectPatternProperty');
    }
}

function deserializeKeyValuePatternProperty(buff, int32, uint32, pos) {
    return {
        type: 'KeyValuePatternProperty',
        key: deserializePropertyName(buff, int32, uint32, pos),
        value: deserializeBoxPattern(buff, int32, uint32, pos + 44)
    };
}

function deserializeAssignmentPatternProperty(buff, int32, uint32, pos) {
    return {
        type: 'AssignmentPatternProperty',
        span: deserializeSpan(buff, int32, uint32, pos),
        key: deserializeIdentifier(buff, int32, uint32, pos + 12),
        value: deserializeOptionBoxExpression(buff, int32, uint32, pos + 36)
    };
}

function deserializeAssignmentPattern(buff, int32, uint32, pos) {
    return {
        type: 'AssignmentPattern',
        span: deserializeSpan(buff, int32, uint32, pos),
        left: deserializeBoxPattern(buff, int32, uint32, pos + 12),
        right: deserializeBoxExpression(buff, int32, uint32, pos + 16),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 20)
    };
}

function deserializeExpression(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeThisExpression(buff, int32, uint32, pos + 4);
        case 1: return deserializeArrayExpression(buff, int32, uint32, pos + 4);
        case 2: return deserializeObjectExpression(buff, int32, uint32, pos + 4);
        case 3: return deserializeFunctionExpression(buff, int32, uint32, pos + 4);
        case 4: return deserializeUnaryExpression(buff, int32, uint32, pos + 4);
        case 5: return deserializeUpdateExpression(buff, int32, uint32, pos + 4);
        case 6: return deserializeBinaryExpression(buff, int32, uint32, pos + 4);
        case 7: return deserializeAssignmentExpression(buff, int32, uint32, pos + 4);
        case 8: return deserializeMemberExpression(buff, int32, uint32, pos + 4);
        case 9: return deserializeSuperPropExpression(buff, int32, uint32, pos + 4);
        case 10: return deserializeConditionalExpression(buff, int32, uint32, pos + 4);
        case 11: return deserializeCallExpression(buff, int32, uint32, pos + 4);
        case 12: return deserializeNewExpression(buff, int32, uint32, pos + 4);
        case 13: return deserializeSequenceExpression(buff, int32, uint32, pos + 4);
        case 14: return deserializeIdentifier(buff, int32, uint32, pos + 4);
        case 15: return deserializeLiteral(buff, int32, uint32, pos + 4);
        case 16: return deserializeTemplateLiteral(buff, int32, uint32, pos + 4);
        case 17: return deserializeTaggedTemplateExpression(buff, int32, uint32, pos + 4);
        case 18: return deserializeArrowFunctionExpression(buff, int32, uint32, pos + 4);
        case 19: return deserializeClassExpression(buff, int32, uint32, pos + 4);
        case 20: return deserializeYieldExpression(buff, int32, uint32, pos + 4);
        case 21: return deserializeMetaProperty(buff, int32, uint32, pos + 4);
        case 22: return deserializeAwaitExpression(buff, int32, uint32, pos + 4);
        case 23: return deserializeParenthesisExpression(buff, int32, uint32, pos + 4);
        case 24: return deserializeJSXMemberExpression(buff, int32, uint32, pos + 4);
        case 25: return deserializeJSXNamespacedName(buff, int32, uint32, pos + 4);
        case 26: return deserializeJSXEmptyExpression(buff, int32, uint32, pos + 4);
        case 27: return deserializeJSXElement(buff, int32, uint32, pos + 4);
        case 28: return deserializeJSXFragment(buff, int32, uint32, pos + 4);
        case 29: return deserializeTsTypeAssertion(buff, int32, uint32, pos + 4);
        case 30: return deserializeTsConstAssertion(buff, int32, uint32, pos + 4);
        case 31: return deserializeTsNonNullExpression(buff, int32, uint32, pos + 4);
        case 32: return deserializeTsAsExpression(buff, int32, uint32, pos + 4);
        case 33: return deserializeTsInstantiation(buff, int32, uint32, pos + 4);
        case 34: return deserializePrivateName(buff, int32, uint32, pos + 4);
        case 35: return deserializeOptionalChainingExpression(buff, int32, uint32, pos + 4);
        case 36: return deserializeInvalid(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for Expression');
    }
}

function deserializeThisExpression(buff, int32, uint32, pos) {
    return {
        type: 'ThisExpression',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeArrayExpression(buff, int32, uint32, pos) {
    return {
        type: 'ArrayExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        elements: deserializeVecOptionExpressionOrSpread(buff, int32, uint32, pos + 12)
    };
}

function deserializeUnaryExpression(buff, int32, uint32, pos) {
    return {
        type: 'UnaryExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        operator: deserializeUnaryOperator(buff, int32, uint32, pos + 12),
        argument: deserializeBoxExpression(buff, int32, uint32, pos + 16)
    };
}

function deserializeUnaryOperator(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return '-';
        case 1: return '+';
        case 2: return '!';
        case 3: return '~';
        case 4: return 'typeof';
        case 5: return 'void';
        case 6: return 'delete';
        default: throw new Error('Unexpected enum value for UnaryOperator');
    }
}

function deserializeUpdateExpression(buff, int32, uint32, pos) {
    return {
        type: 'UpdateExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        operator: deserializeUpdateOperator(buff, int32, uint32, pos + 12),
        prefix: deserializeBoolean(buff, int32, uint32, pos + 13),
        argument: deserializeBoxExpression(buff, int32, uint32, pos + 16)
    };
}

function deserializeUpdateOperator(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return '++';
        case 1: return '--';
        default: throw new Error('Unexpected enum value for UpdateOperator');
    }
}

function deserializeBinaryExpression(buff, int32, uint32, pos) {
    return {
        type: 'BinaryExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        operator: deserializeBinaryOperator(buff, int32, uint32, pos + 16),
        left: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        right: deserializeBoxExpression(buff, int32, uint32, pos + 20)
    };
}

function deserializeBinaryOperator(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return '==';
        case 1: return '!=';
        case 2: return '===';
        case 3: return '!==';
        case 4: return '<';
        case 5: return '<=';
        case 6: return '>';
        case 7: return '>=';
        case 8: return '<<';
        case 9: return '>>';
        case 10: return '>>>';
        case 11: return '+';
        case 12: return '-';
        case 13: return '*';
        case 14: return '/';
        case 15: return '%';
        case 16: return '|';
        case 17: return '^';
        case 18: return '&';
        case 19: return '||';
        case 20: return '&&';
        case 21: return 'in';
        case 22: return 'instanceof';
        case 23: return '**';
        case 24: return '??';
        default: throw new Error('Unexpected enum value for BinaryOperator');
    }
}

function deserializeAssignmentExpression(buff, int32, uint32, pos) {
    return {
        type: 'AssignmentExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        operator: deserializeAssignmentOperator(buff, int32, uint32, pos + 20),
        left: deserializeBoxExpressionOrBoxPattern(buff, int32, uint32, pos + 12),
        right: deserializeBoxExpression(buff, int32, uint32, pos + 24)
    };
}

function deserializeAssignmentOperator(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return '=';
        case 1: return '+=';
        case 2: return '-=';
        case 3: return '*=';
        case 4: return '/=';
        case 5: return '%=';
        case 6: return '<<=';
        case 7: return '>>=';
        case 8: return '>>>=';
        case 9: return '|=';
        case 10: return '^=';
        case 11: return '&=';
        case 12: return '**=';
        case 13: return '&&=';
        case 14: return '||=';
        case 15: return '??=';
        default: throw new Error('Unexpected enum value for AssignmentOperator');
    }
}

function deserializeMemberExpression(buff, int32, uint32, pos) {
    return {
        type: 'MemberExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        object: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        property: deserializeIdentifierOrPrivateNameOrComputed(buff, int32, uint32, pos + 16)
    };
}

function deserializeSuperPropExpression(buff, int32, uint32, pos) {
    return {
        type: 'SuperPropExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        obj: deserializeSuper(buff, int32, uint32, pos + 12),
        property: deserializeIdentifierOrComputed(buff, int32, uint32, pos + 24)
    };
}

function deserializeConditionalExpression(buff, int32, uint32, pos) {
    return {
        type: 'ConditionalExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        test: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        consequent: deserializeBoxExpression(buff, int32, uint32, pos + 16),
        alternate: deserializeBoxExpression(buff, int32, uint32, pos + 20)
    };
}

function deserializeCallExpression(buff, int32, uint32, pos) {
    return {
        type: 'CallExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        callee: deserializeSuperOrImportOrBoxExpression(buff, int32, uint32, pos + 12),
        arguments: deserializeVecExpressionOrSpread(buff, int32, uint32, pos + 28),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos + 36)
    };
}

function deserializeNewExpression(buff, int32, uint32, pos) {
    return {
        type: 'NewExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        callee: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        arguments: deserializeOptionVecExpressionOrSpread(buff, int32, uint32, pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos + 28)
    };
}

function deserializeSequenceExpression(buff, int32, uint32, pos) {
    return {
        type: 'SequenceExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        expressions: deserializeVecBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeIdentifier(buff, int32, uint32, pos) {
    return {
        type: 'Identifier',
        span: deserializeSpan(buff, int32, uint32, pos),
        value: deserializeJsWord(buff, int32, uint32, pos + 12),
        optional: deserializeBoolean(buff, int32, uint32, pos + 20)
    };
}

function deserializeTemplateLiteral(buff, int32, uint32, pos) {
    return {
        type: 'TemplateLiteral',
        span: deserializeSpan(buff, int32, uint32, pos),
        expressions: deserializeVecBoxExpression(buff, int32, uint32, pos + 12),
        quasis: deserializeVecTemplateElement(buff, int32, uint32, pos + 20)
    };
}

function deserializeTemplateElement(buff, int32, uint32, pos) {
    return {
        type: 'TemplateElement',
        span: deserializeSpan(buff, int32, uint32, pos),
        tail: deserializeBoolean(buff, int32, uint32, pos + 24),
        cooked: deserializeOptionJsWord(buff, int32, uint32, pos + 12),
        raw: deserializeJsWord(buff, int32, uint32, pos + 28)
    };
}

function deserializeTaggedTemplateExpression(buff, int32, uint32, pos) {
    return {
        type: 'TaggedTemplateExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        tag: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        typeParameters: deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos + 16),
        template: deserializeTemplateLiteral(buff, int32, uint32, pos + 40)
    };
}

function deserializeYieldExpression(buff, int32, uint32, pos) {
    return {
        type: 'YieldExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        argument: deserializeOptionBoxExpression(buff, int32, uint32, pos + 12),
        delegate: deserializeBoolean(buff, int32, uint32, pos + 20)
    };
}

function deserializeMetaProperty(buff, int32, uint32, pos) {
    return {
        type: 'MetaProperty',
        span: deserializeSpan(buff, int32, uint32, pos),
        kind: deserializeMetaPropertyKind(buff, int32, uint32, pos + 12)
    };
}

function deserializeMetaPropertyKind(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return 'new.target';
        case 1: return 'import.meta';
        default: throw new Error('Unexpected enum value for MetaPropertyKind');
    }
}

function deserializeAwaitExpression(buff, int32, uint32, pos) {
    return {
        type: 'AwaitExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        argument: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeParenthesisExpression(buff, int32, uint32, pos) {
    return {
        type: 'ParenthesisExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        expression: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializePrivateName(buff, int32, uint32, pos) {
    return {
        type: 'PrivateName',
        span: deserializeSpan(buff, int32, uint32, pos),
        id: deserializeIdentifier(buff, int32, uint32, pos + 12)
    };
}

function deserializeOptionalChainingExpression(buff, int32, uint32, pos) {
    return {
        type: 'OptionalChainingExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        questionDotToken: deserializeSpan(buff, int32, uint32, pos + 12),
        base: deserializeMemberExpressionOrOptionalChainingCall(buff, int32, uint32, pos + 24)
    };
}

function deserializeOptionalChainingCall(buff, int32, uint32, pos) {
    return {
        type: 'CallExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        callee: deserializeBoxExpression(buff, int32, uint32, pos + 12),
        arguments: deserializeVecExpressionOrSpread(buff, int32, uint32, pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos + 24)
    };
}

function deserializeSuper(buff, int32, uint32, pos) {
    return {
        type: 'Super',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeImport(buff, int32, uint32, pos) {
    return {
        type: 'Import',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeInvalid(buff, int32, uint32, pos) {
    return {
        type: 'Invalid',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeComputed(buff, int32, uint32, pos) {
    return {
        type: 'Computed',
        span: deserializeSpan(buff, int32, uint32, pos),
        expression: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeExpressionOrSpread(buff, int32, uint32, pos) {
    return {
        spread: deserializeOptionSpan(buff, int32, uint32, pos),
        expression: deserializeBoxExpression(buff, int32, uint32, pos + 16)
    };
}

function deserializeObjectExpression(buff, int32, uint32, pos) {
    return {
        type: 'ObjectExpression',
        span: deserializeSpan(buff, int32, uint32, pos),
        properties: deserializeVecSpreadElementOrBoxObjectProperty(buff, int32, uint32, pos + 12)
    };
}

function deserializeSpreadElement(buff, int32, uint32, pos) {
    return {
        type: 'SpreadElement',
        spread: deserializeSpan(buff, int32, uint32, pos),
        arguments: deserializeBoxExpression(buff, int32, uint32, pos + 12)
    };
}

function deserializeObjectProperty(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(buff, int32, uint32, pos + 4);
        case 1: return deserializeKeyValueProperty(buff, int32, uint32, pos + 4);
        case 2: return deserializeAssignmentProperty(buff, int32, uint32, pos + 4);
        case 3: return deserializeGetterProperty(buff, int32, uint32, pos + 4);
        case 4: return deserializeSetterProperty(buff, int32, uint32, pos + 4);
        case 5: return deserializeMethodProperty(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ObjectProperty');
    }
}

function deserializeKeyValueProperty(buff, int32, uint32, pos) {
    return {
        type: 'KeyValueProperty',
        key: deserializePropertyName(buff, int32, uint32, pos),
        value: deserializeBoxExpression(buff, int32, uint32, pos + 44)
    };
}

function deserializeAssignmentProperty(buff, int32, uint32, pos) {
    return {
        type: 'AssignmentProperty',
        span: deserializeSpan(buff, int32, uint32, pos),
        key: deserializeIdentifier(buff, int32, uint32, pos + 12),
        value: deserializeBoxExpression(buff, int32, uint32, pos + 36)
    };
}

function deserializeGetterProperty(buff, int32, uint32, pos) {
    return {
        type: 'GetterProperty',
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        key: deserializePropertyName(buff, int32, uint32, pos),
        typeAnnotation: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 56),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 76)
    };
}

function deserializeSetterProperty(buff, int32, uint32, pos) {
    return {
        type: 'SetterProperty',
        span: deserializeSpan(buff, int32, uint32, pos + 44),
        key: deserializePropertyName(buff, int32, uint32, pos),
        param: deserializePattern(buff, int32, uint32, pos + 56),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 108)
    };
}

function deserializeMethodProperty(buff, int32, uint32, pos) {
    return {
        type: 'MethodProperty',
        key: deserializePropertyName(buff, int32, uint32, pos),
        params: deserializeVecParameter(buff, int32, uint32, pos + 44),
        decorators: deserializeVecDecorator(buff, int32, uint32, pos + 52),
        span: deserializeSpan(buff, int32, uint32, pos + 60),
        body: deserializeOptionBlockStatement(buff, int32, uint32, pos + 72),
        generator: deserializeBoolean(buff, int32, uint32, pos + 120),
        async: deserializeBoolean(buff, int32, uint32, pos + 121),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, int32, uint32, pos + 96),
        returnType: deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos + 124)
    };
}

function deserializePropertyName(buff, int32, uint32, pos) {
    switch (buff[pos + 4]) {
        case 0: return deserializeIdentifier(buff, int32, uint32, pos + 8);
        case 1: return deserializeStringLiteral(buff, int32, uint32, pos + 8);
        case 2: return deserializeNumericLiteral(buff, int32, uint32, pos + 8);
        case 3: return deserializeComputed(buff, int32, uint32, pos + 8);
        case 4: return deserializeBigIntLiteral(buff, int32, uint32, pos + 8);
        default: throw new Error('Unexpected enum value for PropertyName');
    }
}

function deserializeLiteral(buff, int32, uint32, pos) {
    switch (buff[pos + 4]) {
        case 0: return deserializeStringLiteral(buff, int32, uint32, pos + 8);
        case 1: return deserializeBooleanLiteral(buff, int32, uint32, pos + 8);
        case 2: return deserializeNullLiteral(buff, int32, uint32, pos + 8);
        case 3: return deserializeNumericLiteral(buff, int32, uint32, pos + 8);
        case 4: return deserializeBigIntLiteral(buff, int32, uint32, pos + 8);
        case 5: return deserializeRegExpLiteral(buff, int32, uint32, pos + 8);
        case 6: return deserializeJSXText(buff, int32, uint32, pos + 8);
        default: throw new Error('Unexpected enum value for Literal');
    }
}

function deserializeStringLiteral(buff, int32, uint32, pos) {
    return {
        type: 'StringLiteral',
        span: deserializeSpan(buff, int32, uint32, pos),
        value: deserializeJsWord(buff, int32, uint32, pos + 12),
        raw: deserializeOptionJsWord(buff, int32, uint32, pos + 20)
    };
}

function deserializeBooleanLiteral(buff, int32, uint32, pos) {
    return {
        type: 'BooleanLiteral',
        span: deserializeSpan(buff, int32, uint32, pos),
        value: deserializeBoolean(buff, int32, uint32, pos + 12)
    };
}

function deserializeNullLiteral(buff, int32, uint32, pos) {
    return {
        type: 'NullLiteral',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeNumericLiteral(buff, int32, uint32, pos) {
    return {
        type: 'NumericLiteral',
        span: deserializeSpan(buff, int32, uint32, pos + 4),
        value: new Float64Array(buff.buffer, pos + 20, 1)[0]
    };
}

function deserializeBigIntLiteral(buff, int32, uint32, pos) {
    return {
        type: 'BigIntLiteral',
        span: deserializeSpan(buff, int32, uint32, pos),
        value: deserializeBigIntValue(buff, int32, uint32, pos + 12)
    };
}

function deserializeBigIntValue(buff, int32, uint32, pos) {
    // TODO This implementation could be more efficient
    const str = deserializeJsWord(buff, int32, uint32, pos);
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

function deserializeRegExpLiteral(buff, int32, uint32, pos) {
    return {
        type: 'RegExpLiteral',
        span: deserializeSpan(buff, int32, uint32, pos),
        pattern: deserializeJsWord(buff, int32, uint32, pos + 12),
        flags: deserializeJsWord(buff, int32, uint32, pos + 20)
    };
}

function deserializeJSXText(buff, int32, uint32, pos) {
    return {
        type: 'JSXText',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeJSXMemberExpression(buff, int32, uint32, pos) {
    return {
        type: 'JSXMemberExpression',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeJSXNamespacedName(buff, int32, uint32, pos) {
    return {
        type: 'JSXNamespacedName',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeJSXEmptyExpression(buff, int32, uint32, pos) {
    return {
        type: 'JSXEmptyExpression',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeJSXElement(buff, int32, uint32, pos) {
    return {
        type: 'JSXElement',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeJSXFragment(buff, int32, uint32, pos) {
    return {
        type: 'JSXFragment',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsTypeAssertion(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeAssertion',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsConstAssertion(buff, int32, uint32, pos) {
    return {
        type: 'TsConstAssertion',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsNonNullExpression(buff, int32, uint32, pos) {
    return {
        type: 'TsNonNullExpression',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsAsExpression(buff, int32, uint32, pos) {
    return {
        type: 'TsAsExpression',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsInstantiation(buff, int32, uint32, pos) {
    return {
        type: 'TsInstantiation',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsTypeAnnotation(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeAnnotation',
        span: deserializeSpan(buff, int32, uint32, pos),
        typeAnnotation: deserializeBoxTsType(buff, int32, uint32, pos + 12)
    };
}

function deserializeTsInterfaceDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsInterfaceDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsTypeAliasDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeAliasDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsEnumDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsEnumDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsModuleDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsModuleDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsImportEqualsDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsImportEqualsDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsExportAssignment(buff, int32, uint32, pos) {
    return {
        type: 'TsExportAssignment',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsNamespaceExportDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsNamespaceExportDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsTypeParamDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeParamDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        parameters: deserializeVecTsTypeParameter(buff, int32, uint32, pos + 12)
    };
}

function deserializeTsTypeParameterInstantiation(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeParameterInstantiation',
        span: deserializeSpan(buff, int32, uint32, pos),
        params: deserializeVecBoxTsType(buff, int32, uint32, pos + 12)
    };
}

function deserializeTsExpressionWithTypeArg(buff, int32, uint32, pos) {
    return {
        type: 'TsExpressionWithTypeArg',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsIndexSignature(buff, int32, uint32, pos) {
    return {
        type: 'TsIndexSignature',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsParamProp(buff, int32, uint32, pos) {
    return {
        type: 'TsParamProp',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsTypeParameterDeclaration(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeParameterDeclaration',
        span: deserializeSpan(buff, int32, uint32, pos),
        parameters: deserializeVecTsTypeParameter(buff, int32, uint32, pos + 12)
    };
}

function deserializeTsTypeParameter(buff, int32, uint32, pos) {
    return {
        type: 'TsTypeParameter',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeTsType(buff, int32, uint32, pos) {
    return {
        type: 'TsType',
        span: deserializeSpan(buff, int32, uint32, pos)
    };
}

function deserializeAccessibility(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return 'public';
        case 1: return 'protected';
        case 2: return 'private';
        default: throw new Error('Unexpected enum value for Accessibility');
    }
}

function deserializeJsWord(buff, int32, uint32, pos) {
    // 8 bytes. Last byte is length.
    // If length <= 7, bytes 0-6 contain the word.
    // Otherwise, bytes 0-3 contain length, and bytes 4-7 a relative pointer to string.
    // TODO I don't think this can be correct.
    // How would you disambiguate between length <= 7 and a pointer whose last byte is e.g. 01?
    let len = buff[pos + 7];
    if (len > 7) {
        len = uint32[pos >> 2];
        pos = getPtr(int32, pos + 4) - 4;
    }

    return buff.toString('utf8', pos, pos + len); // TODO What encoding?
}

function deserializeBoolean(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return false;
        case 1: return true;
        default: throw new Error('Unexpected enum value for Boolean');
    }
}

function deserializeSpan(buff, int32, uint32, pos) {
    const pos32 = pos >> 2;
    return {
        start: uint32[pos32],
        end: uint32[pos32 + 1],
        ctxt: uint32[pos32 + 2]
    };
}

function deserializeOptionJsWord(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeJsWord, 4);
}

function deserializeOptionModuleExportName(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeModuleExportName, 4);
}

function deserializeVecImportSpecifier(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeImportSpecifier, 84);
}

function deserializeOptionSpan(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeSpan, 4);
}

function deserializeOptionExpressionOrSpread(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeExpressionOrSpread, 4);
}

function deserializeVecOptionExpressionOrSpread(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeOptionExpressionOrSpread, 24);
}

function deserializeOptionIdentifier(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeIdentifier, 4);
}

function deserializeVecDecorator(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeDecorator, 16);
}

function deserializeBoxTsType(buff, int32, uint32, pos) {
    return deserializeBox(buff, int32, uint32, pos, deserializeTsType);
}

function deserializeOptionTsTypeAnnotation(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeTsTypeAnnotation, 4);
}

function deserializeOptionPattern(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializePattern, 4);
}

function deserializeVecOptionPattern(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeOptionPattern, 56);
}

function deserializeBoxPattern(buff, int32, uint32, pos) {
    return deserializeBox(buff, int32, uint32, pos, deserializePattern);
}

function deserializeOptionBoxExpression(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeBoxExpression, 4);
}

function deserializeVecObjectPatternProperty(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeObjectPatternProperty, 56);
}

function deserializeVecParameter(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeParameter, 72);
}

function deserializeBoxStatement(buff, int32, uint32, pos) {
    return deserializeBox(buff, int32, uint32, pos, deserializeStatement);
}

function deserializeOptionBoxStatement(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeBoxStatement, 4);
}

function deserializeVecSwitchCase(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeSwitchCase, 28);
}

function deserializeOptionCatchClause(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeCatchClause, 4);
}

function deserializeVecVariableDeclarator(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeVariableDeclarator, 76);
}

function deserializeVariableDeclarationOrBoxExpression(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeVariableDeclaration(buff, int32, uint32, pos + 4);
        case 1: return deserializeBoxExpression(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for VariableDeclarationOrBoxExpression');
    }
}

function deserializeOptionVariableDeclarationOrBoxExpression(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeVariableDeclarationOrBoxExpression, 4);
}

function deserializeVariableDeclarationOrPattern(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeVariableDeclaration(buff, int32, uint32, pos + 4);
        case 1: return deserializePattern(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for VariableDeclarationOrPattern');
    }
}

function deserializeTsParamPropOrParameter(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeTsParamProp(buff, int32, uint32, pos + 4);
        case 1: return deserializeParameter(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for TsParamPropOrParameter');
    }
}

function deserializeVecTsParamPropOrParameter(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeTsParamPropOrParameter, 76);
}

function deserializeOptionAccessibility(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeAccessibility, 1);
}

function deserializeVecTsTypeParameter(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeTsTypeParameter, 12);
}

function deserializeOptionTsTypeParamDeclaration(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeTsTypeParamDeclaration, 4);
}

function deserializeVecClassMember(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeClassMember, 168);
}

function deserializeVecBoxTsType(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeBoxTsType, 4);
}

function deserializeOptionTsTypeParameterInstantiation(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeTsTypeParameterInstantiation, 4);
}

function deserializeVecTsExpressionWithTypeArg(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeTsExpressionWithTypeArg, 12);
}

function deserializeOptionTsTypeParameterDeclaration(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeTsTypeParameterDeclaration, 4);
}

function deserializeVecStatement(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeStatement, 152);
}

function deserializeBoxExpressionOrBoxPattern(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeBoxExpression(buff, int32, uint32, pos + 4);
        case 1: return deserializeBoxPattern(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for BoxExpressionOrBoxPattern');
    }
}

function deserializeIdentifierOrPrivateNameOrComputed(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(buff, int32, uint32, pos + 4);
        case 1: return deserializePrivateName(buff, int32, uint32, pos + 4);
        case 2: return deserializeComputed(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for IdentifierOrPrivateNameOrComputed');
    }
}

function deserializeIdentifierOrComputed(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(buff, int32, uint32, pos + 4);
        case 1: return deserializeComputed(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for IdentifierOrComputed');
    }
}

function deserializeSuperOrImportOrBoxExpression(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeSuper(buff, int32, uint32, pos + 4);
        case 1: return deserializeImport(buff, int32, uint32, pos + 4);
        case 2: return deserializeBoxExpression(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for SuperOrImportOrBoxExpression');
    }
}

function deserializeVecExpressionOrSpread(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeExpressionOrSpread, 20);
}

function deserializeOptionVecExpressionOrSpread(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeVecExpressionOrSpread, 4);
}

function deserializeVecBoxExpression(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeBoxExpression, 4);
}

function deserializeVecTemplateElement(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeTemplateElement, 36);
}

function deserializeVecPattern(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializePattern, 52);
}

function deserializeBlockStatementOrBoxExpression(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeBlockStatement(buff, int32, uint32, pos + 4);
        case 1: return deserializeBoxExpression(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for BlockStatementOrBoxExpression');
    }
}

function deserializeMemberExpressionOrOptionalChainingCall(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeMemberExpression(buff, int32, uint32, pos + 4);
        case 1: return deserializeOptionalChainingCall(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for MemberExpressionOrOptionalChainingCall');
    }
}

function deserializeBoxExpression(buff, int32, uint32, pos) {
    return deserializeBox(buff, int32, uint32, pos, deserializeExpression);
}

function deserializeBoxObjectProperty(buff, int32, uint32, pos) {
    return deserializeBox(buff, int32, uint32, pos, deserializeObjectProperty);
}

function deserializeSpreadElementOrBoxObjectProperty(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeSpreadElement(buff, int32, uint32, pos + 4);
        case 1: return deserializeBoxObjectProperty(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for SpreadElementOrBoxObjectProperty');
    }
}

function deserializeVecSpreadElementOrBoxObjectProperty(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeSpreadElementOrBoxObjectProperty, 20);
}

function deserializeOptionObjectExpression(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeObjectExpression, 4);
}

function deserializeVecExportSpecifier(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeExportSpecifier, 96);
}

function deserializeOptionStringLiteral(buff, int32, uint32, pos) {
    return deserializeOption(buff, int32, uint32, pos, deserializeStringLiteral, 4);
}

function deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeClassExpression(buff, int32, uint32, pos + 4);
        case 1: return deserializeFunctionExpression(buff, int32, uint32, pos + 4);
        case 2: return deserializeTsInterfaceDeclaration(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration');
    }
}

function deserializeModuleDeclarationOrStatement(buff, int32, uint32, pos) {
    switch (buff[pos]) {
        case 0: return deserializeModuleDeclaration(buff, int32, uint32, pos + 4);
        case 1: return deserializeStatement(buff, int32, uint32, pos + 4);
        default: throw new Error('Unexpected enum value for ModuleDeclarationOrStatement');
    }
}

function deserializeVecModuleDeclarationOrStatement(buff, int32, uint32, pos) {
    return deserializeVec(buff, int32, uint32, pos, deserializeModuleDeclarationOrStatement, 156);
}

function deserializeOption(buff, int32, uint32, pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(buff, int32, uint32, pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(buff, int32, uint32, pos, deserialize) {
    return deserialize(buff, int32, uint32, getPtr(int32, pos));
}

function deserializeVec(buff, int32, uint32, pos, deserialize, length) {
    const numEntries = uint32[(pos >> 2) + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    let vecPos = getPtr(int32, pos);
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(buff, int32, uint32, vecPos);
        vecPos += length;
    }
    return entries;
}

function getPtr(int32, pos) {
    return pos + int32[pos >> 2];
}

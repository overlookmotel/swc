// Generated code. Do not edit.

'use strict';

module.exports = deserialialize;

function deserialialize(buff) {
    return deserializeProgram(buff, buff.length - 36);
}

function deserializeProgram(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeModule(buff, pos + 4);
        case 1: return deserializeScript(buff, pos + 4);
        default: throw new Error('Unexpected enum value for Program');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeImportDeclaration(buff, pos + 4);
        case 1: return deserializeExportDeclaration(buff, pos + 4);
        case 2: return deserializeExportNamedDeclaration(buff, pos + 4);
        case 3: return deserializeExportDefaultDeclaration(buff, pos + 4);
        case 4: return deserializeExportDefaultExpression(buff, pos + 4);
        case 5: return deserializeExportAllDeclaration(buff, pos + 4);
        case 6: return deserializeTsImportEqualsDeclaration(buff, pos + 4);
        case 7: return deserializeTsExportAssignment(buff, pos + 4);
        case 8: return deserializeTsNamespaceExportDeclaration(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ModuleDeclaration');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeImportNamedSpecifier(buff, pos + 4);
        case 1: return deserializeImportDefaultSpecifier(buff, pos + 4);
        case 2: return deserializeImportNamespaceSpecifier(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ImportSpecifier');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeExportNamespaceSpecifier(buff, pos + 4);
        case 1: return deserializeExportDefaultSpecifier(buff, pos + 4);
        case 2: return deserializeExportNamedSpecifier(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ExportSpecifier');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeIdentifier(buff, pos + 4);
        case 1: return deserializeStringLiteral(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ModuleExportName');
    }
}

function deserializeStatement(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeBlockStatement(buff, pos + 4);
        case 1: return deserializeEmptyStatement(buff, pos + 4);
        case 2: return deserializeDebuggerStatement(buff, pos + 4);
        case 3: return deserializeWithStatement(buff, pos + 4);
        case 4: return deserializeReturnStatement(buff, pos + 4);
        case 5: return deserializeLabeledStatement(buff, pos + 4);
        case 6: return deserializeBreakStatement(buff, pos + 4);
        case 7: return deserializeContinueStatement(buff, pos + 4);
        case 8: return deserializeIfStatement(buff, pos + 4);
        case 9: return deserializeSwitchStatement(buff, pos + 4);
        case 10: return deserializeThrowStatement(buff, pos + 4);
        case 11: return deserializeTryStatement(buff, pos + 4);
        case 12: return deserializeWhileStatement(buff, pos + 4);
        case 13: return deserializeDoWhileStatement(buff, pos + 4);
        case 14: return deserializeForStatement(buff, pos + 4);
        case 15: return deserializeForInStatement(buff, pos + 4);
        case 16: return deserializeForOfStatement(buff, pos + 4);
        case 17: return deserializeDeclaration(buff, pos + 4);
        case 18: return deserializeExpressionStatement(buff, pos + 4);
        default: throw new Error('Unexpected enum value for Statement');
    }
}

function deserializeBlockStatement(buff, pos) {
    return {
        type: 'BlockStatement',
        span: deserializeSpan(buff, pos),
        stmts: deserializeVecStatement(buff, pos + 12)
    };
}

function deserializeOptionBlockStatement(buff, pos) {
    return deserializeOption(buff, pos, deserializeBlockStatement, 4);
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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeClassDeclaration(buff, pos + 4);
        case 1: return deserializeFunctionDeclaration(buff, pos + 4);
        case 2: return deserializeVariableDeclaration(buff, pos + 4);
        case 3: return deserializeTsInterfaceDeclaration(buff, pos + 4);
        case 4: return deserializeTsTypeAliasDeclaration(buff, pos + 4);
        case 5: return deserializeTsEnumDeclaration(buff, pos + 4);
        case 6: return deserializeTsModuleDeclaration(buff, pos + 4);
        default: throw new Error('Unexpected enum value for Declaration');
    }
}

function deserializeVariableDeclaration(buff, pos) {
    return {
        type: 'VariableDeclaration',
        span: deserializeSpan(buff, pos),
        kind: deserializeVariableDeclarationKind(buff, pos + 12),
        declare: deserializeBoolean(buff, pos + 13),
        declarations: deserializeVecVariableDeclarator(buff, pos + 16)
    };
}

function deserializeVariableDeclarationKind(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return 'var';
        case 1: return 'let';
        case 2: return 'const';
        default: throw new Error('Unexpected enum value for VariableDeclarationKind');
    }
}

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
        generator: deserializeBoolean(buff, pos + 104),
        async: deserializeBoolean(buff, pos + 105),
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
        generator: deserializeBoolean(buff, pos + 104),
        async: deserializeBoolean(buff, pos + 105),
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
        async: deserializeBoolean(buff, pos + 68),
        generator: deserializeBoolean(buff, pos + 69),
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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeConstructor(buff, pos + 4);
        case 1: return deserializeClassMethod(buff, pos + 4);
        case 2: return deserializePrivateMethod(buff, pos + 4);
        case 3: return deserializeClassProperty(buff, pos + 4);
        case 4: return deserializePrivateProperty(buff, pos + 4);
        case 5: return deserializeTsIndexSignature(buff, pos + 4);
        case 6: return deserializeEmptyStatement(buff, pos + 4);
        case 7: return deserializeStaticBlock(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ClassMember');
    }
}

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
        isStatic: deserializeBoolean(buff, pos + 157),
        accessibility: deserializeOptionAccessibility(buff, pos + 160),
        isAbstract: deserializeBoolean(buff, pos + 158),
        isOptional: deserializeBoolean(buff, pos + 159),
        isOverride: deserializeBoolean(buff, pos + 162)
    };
}

function deserializePrivateMethod(buff, pos) {
    return {
        type: 'PrivateMethod',
        span: deserializeSpan(buff, pos),
        key: deserializePrivateName(buff, pos + 12),
        function: deserializeFunction(buff, pos + 48),
        kind: deserializeMethodKind(buff, pos + 148),
        isStatic: deserializeBoolean(buff, pos + 149),
        accessibility: deserializeOptionAccessibility(buff, pos + 152),
        isAbstract: deserializeBoolean(buff, pos + 150),
        isOptional: deserializeBoolean(buff, pos + 151),
        isOverride: deserializeBoolean(buff, pos + 154)
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
        accessibility: deserializeOptionAccessibility(buff, pos + 93),
        isAbstract: deserializeBoolean(buff, pos + 95),
        isOptional: deserializeBoolean(buff, pos + 96),
        isOverride: deserializeBoolean(buff, pos + 97),
        readonly: deserializeBoolean(buff, pos + 98),
        declare: deserializeBoolean(buff, pos + 99),
        definite: deserializeBoolean(buff, pos + 100)
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
        accessibility: deserializeOptionAccessibility(buff, pos + 85),
        isOptional: deserializeBoolean(buff, pos + 87),
        isOverride: deserializeBoolean(buff, pos + 88),
        readonly: deserializeBoolean(buff, pos + 89),
        definite: deserializeBoolean(buff, pos + 90)
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
    switch (buff.readUInt8(pos)) {
        case 0: return 'method';
        case 1: return 'getter';
        case 2: return 'setter';
        default: throw new Error('Unexpected enum value for MethodKind');
    }
}

function deserializeFunction(buff, pos) {
    return {
        params: deserializeVecParameter(buff, pos),
        decorators: deserializeVecDecorator(buff, pos + 8),
        span: deserializeSpan(buff, pos + 16),
        body: deserializeOptionBlockStatement(buff, pos + 28),
        generator: deserializeBoolean(buff, pos + 76),
        async: deserializeBoolean(buff, pos + 77),
        typeParameters: deserializeOptionTsTypeParamDeclaration(buff, pos + 52),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 80)
    };
}

function deserializePattern(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeBindingIdentifier(buff, pos + 4);
        case 1: return deserializeArrayPattern(buff, pos + 4);
        case 2: return deserializeRestElement(buff, pos + 4);
        case 3: return deserializeObjectPattern(buff, pos + 4);
        case 4: return deserializeAssignmentPattern(buff, pos + 4);
        case 5: return deserializeInvalid(buff, pos + 4);
        case 6: return deserializeBoxExpression(buff, pos + 4);
        default: throw new Error('Unexpected enum value for Pattern');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeKeyValuePatternProperty(buff, pos + 4);
        case 1: return deserializeAssignmentPatternProperty(buff, pos + 4);
        case 2: return deserializeRestElement(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ObjectPatternProperty');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeThisExpression(buff, pos + 4);
        case 1: return deserializeArrayExpression(buff, pos + 4);
        case 2: return deserializeObjectExpression(buff, pos + 4);
        case 3: return deserializeFunctionExpression(buff, pos + 4);
        case 4: return deserializeUnaryExpression(buff, pos + 4);
        case 5: return deserializeUpdateExpression(buff, pos + 4);
        case 6: return deserializeBinaryExpression(buff, pos + 4);
        case 7: return deserializeAssignmentExpression(buff, pos + 4);
        case 8: return deserializeMemberExpression(buff, pos + 4);
        case 9: return deserializeSuperPropExpression(buff, pos + 4);
        case 10: return deserializeConditionalExpression(buff, pos + 4);
        case 11: return deserializeCallExpression(buff, pos + 4);
        case 12: return deserializeNewExpression(buff, pos + 4);
        case 13: return deserializeSequenceExpression(buff, pos + 4);
        case 14: return deserializeIdentifier(buff, pos + 4);
        case 15: return deserializeLiteral(buff, pos + 4);
        case 16: return deserializeTemplateLiteral(buff, pos + 4);
        case 17: return deserializeTaggedTemplateExpression(buff, pos + 4);
        case 18: return deserializeArrowFunctionExpression(buff, pos + 4);
        case 19: return deserializeClassExpression(buff, pos + 4);
        case 20: return deserializeYieldExpression(buff, pos + 4);
        case 21: return deserializeMetaProperty(buff, pos + 4);
        case 22: return deserializeAwaitExpression(buff, pos + 4);
        case 23: return deserializeParenthesisExpression(buff, pos + 4);
        case 24: return deserializeJSXMemberExpression(buff, pos + 4);
        case 25: return deserializeJSXNamespacedName(buff, pos + 4);
        case 26: return deserializeJSXEmptyExpression(buff, pos + 4);
        case 27: return deserializeJSXElement(buff, pos + 4);
        case 28: return deserializeJSXFragment(buff, pos + 4);
        case 29: return deserializeTsTypeAssertion(buff, pos + 4);
        case 30: return deserializeTsConstAssertion(buff, pos + 4);
        case 31: return deserializeTsNonNullExpression(buff, pos + 4);
        case 32: return deserializeTsAsExpression(buff, pos + 4);
        case 33: return deserializeTsInstantiation(buff, pos + 4);
        case 34: return deserializePrivateName(buff, pos + 4);
        case 35: return deserializeOptionalChainingExpression(buff, pos + 4);
        case 36: return deserializeInvalid(buff, pos + 4);
        default: throw new Error('Unexpected enum value for Expression');
    }
}

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
    switch (buff.readUInt8(pos)) {
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

function deserializeUpdateExpression(buff, pos) {
    return {
        type: 'UpdateExpression',
        span: deserializeSpan(buff, pos),
        operator: deserializeUpdateOperator(buff, pos + 12),
        prefix: deserializeBoolean(buff, pos + 13),
        argument: deserializeBoxExpression(buff, pos + 16)
    };
}

function deserializeUpdateOperator(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return '++';
        case 1: return '--';
        default: throw new Error('Unexpected enum value for UpdateOperator');
    }
}

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
    switch (buff.readUInt8(pos)) {
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
    switch (buff.readUInt8(pos)) {
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
    switch (buff.readUInt8(pos)) {
        case 0: return 'new.target';
        case 1: return 'import.meta';
        default: throw new Error('Unexpected enum value for MetaPropertyKind');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeIdentifier(buff, pos + 4);
        case 1: return deserializeKeyValueProperty(buff, pos + 4);
        case 2: return deserializeAssignmentProperty(buff, pos + 4);
        case 3: return deserializeGetterProperty(buff, pos + 4);
        case 4: return deserializeSetterProperty(buff, pos + 4);
        case 5: return deserializeMethodProperty(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ObjectProperty');
    }
}

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
        generator: deserializeBoolean(buff, pos + 120),
        async: deserializeBoolean(buff, pos + 121),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(buff, pos + 96),
        returnType: deserializeOptionTsTypeAnnotation(buff, pos + 124)
    };
}

function deserializePropertyName(buff, pos) {
    return deserializePropertyNameWrapped(buff, pos + 4);
}

function deserializePropertyNameWrapped(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeIdentifier(buff, pos + 4);
        case 1: return deserializeStringLiteral(buff, pos + 4);
        case 2: return deserializeNumericLiteral(buff, pos + 4);
        case 3: return deserializeComputed(buff, pos + 4);
        case 4: return deserializeBigIntLiteral(buff, pos + 4);
        default: throw new Error('Unexpected enum value for PropertyNameWrapped');
    }
}

function deserializeLiteral(buff, pos) {
    return deserializeLiteralWrapped(buff, pos + 4); // TODO Not sure why +4
}

function deserializeLiteralWrapped(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeStringLiteral(buff, pos + 4);
        case 1: return deserializeBooleanLiteral(buff, pos + 4);
        case 2: return deserializeNullLiteral(buff, pos + 4);
        case 3: return deserializeNumericLiteral(buff, pos + 4);
        case 4: return deserializeBigIntLiteral(buff, pos + 4);
        case 5: return deserializeRegExpLiteral(buff, pos + 4);
        case 6: return deserializeJSXText(buff, pos + 4);
        default: throw new Error('Unexpected enum value for LiteralWrapped');
    }
}

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
    switch (buff.readUInt8(pos)) {
        case 0: return 'public';
        case 1: return 'protected';
        case 2: return 'private';
        default: throw new Error('Unexpected enum value for Accessibility');
    }
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
    switch (buff.readUInt8(pos)) {
        case 0: return false;
        case 1: return true;
        default: throw new Error('Unexpected enum value for Boolean');
    }
}

function deserializeSpan(buff, pos) {
    return {
        start: buff.readUInt32LE(pos),
        end: buff.readUInt32LE(pos + 4),
        ctxt: buff.readUInt32LE(pos + 8)
    };
}

function deserializeOptionJsWord(buff, pos) {
    return deserializeOption(buff, pos, deserializeJsWord, 4);
}

function deserializeOptionModuleExportName(buff, pos) {
    return deserializeOption(buff, pos, deserializeModuleExportName, 4);
}

function deserializeVecImportSpecifier(buff, pos) {
    return deserializeVec(buff, pos, deserializeImportSpecifier, 84);
}

function deserializeOptionSpan(buff, pos) {
    return deserializeOption(buff, pos, deserializeSpan, 4);
}

function deserializeOptionExpressionOrSpread(buff, pos) {
    return deserializeOption(buff, pos, deserializeExpressionOrSpread, 4);
}

function deserializeVecOptionExpressionOrSpread(buff, pos) {
    return deserializeVec(buff, pos, deserializeOptionExpressionOrSpread, 24);
}

function deserializeOptionIdentifier(buff, pos) {
    return deserializeOption(buff, pos, deserializeIdentifier, 4);
}

function deserializeVecDecorator(buff, pos) {
    return deserializeVec(buff, pos, deserializeDecorator, 16);
}

function deserializeBoxTsType(buff, pos) {
    return deserializeBox(buff, pos, deserializeTsType);
}

function deserializeOptionTsTypeAnnotation(buff, pos) {
    return deserializeOption(buff, pos, deserializeTsTypeAnnotation, 4);
}

function deserializeOptionPattern(buff, pos) {
    return deserializeOption(buff, pos, deserializePattern, 4);
}

function deserializeVecOptionPattern(buff, pos) {
    return deserializeVec(buff, pos, deserializeOptionPattern, 56);
}

function deserializeBoxPattern(buff, pos) {
    return deserializeBox(buff, pos, deserializePattern);
}

function deserializeOptionBoxExpression(buff, pos) {
    return deserializeOption(buff, pos, deserializeBoxExpression, 4);
}

function deserializeVecObjectPatternProperty(buff, pos) {
    return deserializeVec(buff, pos, deserializeObjectPatternProperty, 56);
}

function deserializeVecParameter(buff, pos) {
    return deserializeVec(buff, pos, deserializeParameter, 72);
}

function deserializeBoxStatement(buff, pos) {
    return deserializeBox(buff, pos, deserializeStatement);
}

function deserializeOptionBoxStatement(buff, pos) {
    return deserializeOption(buff, pos, deserializeBoxStatement, 4);
}

function deserializeVecSwitchCase(buff, pos) {
    return deserializeVec(buff, pos, deserializeSwitchCase, 28);
}

function deserializeOptionCatchClause(buff, pos) {
    return deserializeOption(buff, pos, deserializeCatchClause, 4);
}

function deserializeVecVariableDeclarator(buff, pos) {
    return deserializeVec(buff, pos, deserializeVariableDeclarator, 76);
}

function deserializeVariableDeclarationOrBoxExpression(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeVariableDeclaration(buff, pos + 4);
        case 1: return deserializeBoxExpression(buff, pos + 4);
        default: throw new Error('Unexpected enum value for VariableDeclarationOrBoxExpression');
    }
}

function deserializeOptionVariableDeclarationOrBoxExpression(buff, pos) {
    return deserializeOption(buff, pos, deserializeVariableDeclarationOrBoxExpression, 4);
}

function deserializeVariableDeclarationOrPattern(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeVariableDeclaration(buff, pos + 4);
        case 1: return deserializePattern(buff, pos + 4);
        default: throw new Error('Unexpected enum value for VariableDeclarationOrPattern');
    }
}

function deserializeTsParamPropOrParameter(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeTsParamProp(buff, pos + 4);
        case 1: return deserializeParameter(buff, pos + 4);
        default: throw new Error('Unexpected enum value for TsParamPropOrParameter');
    }
}

function deserializeVecTsParamPropOrParameter(buff, pos) {
    return deserializeVec(buff, pos, deserializeTsParamPropOrParameter, 76);
}

function deserializeOptionAccessibility(buff, pos) {
    return deserializeOption(buff, pos, deserializeAccessibility, 1);
}

function deserializeVecTsTypeParameter(buff, pos) {
    return deserializeVec(buff, pos, deserializeTsTypeParameter, 12);
}

function deserializeOptionTsTypeParamDeclaration(buff, pos) {
    return deserializeOption(buff, pos, deserializeTsTypeParamDeclaration, 4);
}

function deserializeVecClassMember(buff, pos) {
    return deserializeVec(buff, pos, deserializeClassMember, 168);
}

function deserializeVecBoxTsType(buff, pos) {
    return deserializeVec(buff, pos, deserializeBoxTsType, 4);
}

function deserializeOptionTsTypeParameterInstantiation(buff, pos) {
    return deserializeOption(buff, pos, deserializeTsTypeParameterInstantiation, 4);
}

function deserializeVecTsExpressionWithTypeArg(buff, pos) {
    return deserializeVec(buff, pos, deserializeTsExpressionWithTypeArg, 12);
}

function deserializeOptionTsTypeParameterDeclaration(buff, pos) {
    return deserializeOption(buff, pos, deserializeTsTypeParameterDeclaration, 4);
}

function deserializeVecStatement(buff, pos) {
    return deserializeVec(buff, pos, deserializeStatement, 152);
}

function deserializeBoxExpressionOrBoxPattern(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeBoxExpression(buff, pos + 4);
        case 1: return deserializeBoxPattern(buff, pos + 4);
        default: throw new Error('Unexpected enum value for BoxExpressionOrBoxPattern');
    }
}

function deserializeIdentifierOrPrivateNameOrComputed(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeIdentifier(buff, pos + 4);
        case 1: return deserializePrivateName(buff, pos + 4);
        case 2: return deserializeComputed(buff, pos + 4);
        default: throw new Error('Unexpected enum value for IdentifierOrPrivateNameOrComputed');
    }
}

function deserializeIdentifierOrComputed(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeIdentifier(buff, pos + 4);
        case 1: return deserializeComputed(buff, pos + 4);
        default: throw new Error('Unexpected enum value for IdentifierOrComputed');
    }
}

function deserializeSuperOrImportOrBoxExpression(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeSuper(buff, pos + 4);
        case 1: return deserializeImport(buff, pos + 4);
        case 2: return deserializeBoxExpression(buff, pos + 4);
        default: throw new Error('Unexpected enum value for SuperOrImportOrBoxExpression');
    }
}

function deserializeVecExpressionOrSpread(buff, pos) {
    return deserializeVec(buff, pos, deserializeExpressionOrSpread, 20);
}

function deserializeOptionVecExpressionOrSpread(buff, pos) {
    return deserializeOption(buff, pos, deserializeVecExpressionOrSpread, 4);
}

function deserializeVecBoxExpression(buff, pos) {
    return deserializeVec(buff, pos, deserializeBoxExpression, 4);
}

function deserializeVecTemplateElement(buff, pos) {
    return deserializeVec(buff, pos, deserializeTemplateElement, 36);
}

function deserializeVecPattern(buff, pos) {
    return deserializeVec(buff, pos, deserializePattern, 52);
}

function deserializeBlockStatementOrBoxExpression(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeBlockStatement(buff, pos + 4);
        case 1: return deserializeBoxExpression(buff, pos + 4);
        default: throw new Error('Unexpected enum value for BlockStatementOrBoxExpression');
    }
}

function deserializeMemberExpressionOrOptionalChainingCall(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeMemberExpression(buff, pos + 4);
        case 1: return deserializeOptionalChainingCall(buff, pos + 4);
        default: throw new Error('Unexpected enum value for MemberExpressionOrOptionalChainingCall');
    }
}

function deserializeBoxExpression(buff, pos) {
    return deserializeBox(buff, pos, deserializeExpression);
}

function deserializeBoxObjectProperty(buff, pos) {
    return deserializeBox(buff, pos, deserializeObjectProperty);
}

function deserializeSpreadElementOrBoxObjectProperty(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeSpreadElement(buff, pos + 4);
        case 1: return deserializeBoxObjectProperty(buff, pos + 4);
        default: throw new Error('Unexpected enum value for SpreadElementOrBoxObjectProperty');
    }
}

function deserializeVecSpreadElementOrBoxObjectProperty(buff, pos) {
    return deserializeVec(buff, pos, deserializeSpreadElementOrBoxObjectProperty, 20);
}

function deserializeOptionObjectExpression(buff, pos) {
    return deserializeOption(buff, pos, deserializeObjectExpression, 4);
}

function deserializeVecExportSpecifier(buff, pos) {
    return deserializeVec(buff, pos, deserializeExportSpecifier, 96);
}

function deserializeOptionStringLiteral(buff, pos) {
    return deserializeOption(buff, pos, deserializeStringLiteral, 4);
}

function deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeClassExpression(buff, pos + 4);
        case 1: return deserializeFunctionExpression(buff, pos + 4);
        case 2: return deserializeTsInterfaceDeclaration(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration');
    }
}

function deserializeModuleDeclarationOrStatement(buff, pos) {
    switch (buff.readUInt8(pos)) {
        case 0: return deserializeModuleDeclaration(buff, pos + 4);
        case 1: return deserializeStatement(buff, pos + 4);
        default: throw new Error('Unexpected enum value for ModuleDeclarationOrStatement');
    }
}

function deserializeVecModuleDeclarationOrStatement(buff, pos) {
    return deserializeVec(buff, pos, deserializeModuleDeclarationOrStatement, 156);
}

function deserializeOption(buff, pos, deserialize, offset) {
    switch (buff.readUInt8(pos)) {
        case 0: return null;
        case 1: return deserialize(buff, pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(buff, pos, deserialize) {
    return deserialize(buff, getPtr(buff, pos));
}

function deserializeVec(buff, pos, deserialize, length) {
    const numEntries = buff.readUInt32LE(pos + 4);
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    let vecPos = getPtr(buff, pos);
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(buff, vecPos);
        vecPos += length;
    }
    return entries;
}

function getPtr(buff, pos) {
    return pos + buff.readInt32LE(pos);
}

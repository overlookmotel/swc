// Generated code. Do not edit.

'use strict';

module.exports = deserialize;

let arrayBuffer, buff, int32, uint32;

function deserialize(buffIn) {
    arrayBuffer = buffIn.buffer;
    buff = Buffer.from(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    return deserializeProgram(buffIn.byteOffset + buffIn.length - 36);
}

function deserializeProgram(pos) {
    switch (buff[pos]) {
        case 0: return deserializeModule(pos + 4);
        case 1: return deserializeScript(pos + 4);
        default: throw new Error('Unexpected enum value for Program');
    }
}

function deserializeModule(pos) {
    return {
        type: 'Module',
        span: deserializeSpan(pos),
        body: deserializeVecModuleDeclarationOrStatement(pos + 12),
        interpreter: deserializeOptionJsWord(pos + 20)
    };
}

function deserializeScript(pos) {
    return {
        type: 'Script',
        span: deserializeSpan(pos),
        body: deserializeVecStatement(pos + 12),
        interpreter: deserializeOptionJsWord(pos + 20)
    };
}

function deserializeModuleDeclaration(pos) {
    switch (buff[pos]) {
        case 0: return deserializeImportDeclaration(pos + 4);
        case 1: return deserializeExportDeclaration(pos + 4);
        case 2: return deserializeExportNamedDeclaration(pos + 4);
        case 3: return deserializeExportDefaultDeclaration(pos + 4);
        case 4: return deserializeExportDefaultExpression(pos + 4);
        case 5: return deserializeExportAllDeclaration(pos + 4);
        case 6: return deserializeTsImportEqualsDeclaration(pos + 4);
        case 7: return deserializeTsExportAssignment(pos + 4);
        case 8: return deserializeTsNamespaceExportDeclaration(pos + 4);
        default: throw new Error('Unexpected enum value for ModuleDeclaration');
    }
}

function deserializeImportDeclaration(pos) {
    return {
        type: 'ImportDeclaration',
        span: deserializeSpan(pos),
        specifiers: deserializeVecImportSpecifier(pos + 12),
        source: deserializeStringLiteral(pos + 20),
        typeOnly: deserializeBoolean(pos + 52),
        asserts: deserializeOptionObjectExpression(pos + 56)
    };
}

function deserializeImportSpecifier(pos) {
    switch (buff[pos]) {
        case 0: return deserializeImportNamedSpecifier(pos + 4);
        case 1: return deserializeImportDefaultSpecifier(pos + 4);
        case 2: return deserializeImportNamespaceSpecifier(pos + 4);
        default: throw new Error('Unexpected enum value for ImportSpecifier');
    }
}

function deserializeImportNamedSpecifier(pos) {
    return {
        type: 'ImportSpecifier',
        span: deserializeSpan(pos),
        local: deserializeIdentifier(pos + 12),
        imported: deserializeOptionModuleExportName(pos + 36),
        isTypeOnly: deserializeBoolean(pos + 76)
    };
}

function deserializeImportDefaultSpecifier(pos) {
    return {
        type: 'ImportDefaultSpecifier',
        span: deserializeSpan(pos),
        local: deserializeIdentifier(pos + 12)
    };
}

function deserializeImportNamespaceSpecifier(pos) {
    return {
        type: 'ImportNamespaceSpecifier',
        span: deserializeSpan(pos),
        local: deserializeIdentifier(pos + 12)
    };
}

function deserializeExportDeclaration(pos) {
    return {
        type: 'ExportDeclaration',
        span: deserializeSpan(pos),
        declaration: deserializeDeclaration(pos + 12)
    };
}

function deserializeExportNamedDeclaration(pos) {
    return {
        type: 'ExportNamedDeclaration',
        span: deserializeSpan(pos),
        specifiers: deserializeVecExportSpecifier(pos + 12),
        source: deserializeOptionStringLiteral(pos + 20),
        typeOnly: deserializeBoolean(pos + 56),
        asserts: deserializeOptionObjectExpression(pos + 60)
    };
}

function deserializeExportSpecifier(pos) {
    switch (buff[pos]) {
        case 0: return deserializeExportNamespaceSpecifier(pos + 4);
        case 1: return deserializeExportDefaultSpecifier(pos + 4);
        case 2: return deserializeExportNamedSpecifier(pos + 4);
        default: throw new Error('Unexpected enum value for ExportSpecifier');
    }
}

function deserializeExportNamespaceSpecifier(pos) {
    return {
        type: 'ExportNamespaceSpecifier',
        span: deserializeSpan(pos),
        name: deserializeModuleExportName(pos + 12)
    };
}

function deserializeExportDefaultSpecifier(pos) {
    return {
        type: 'ExportDefaultSpecifier',
        span: deserializeSpan(pos),
        exported: deserializeIdentifier(pos + 12)
    };
}

function deserializeExportNamedSpecifier(pos) {
    return {
        type: 'ExportSpecifier',
        span: deserializeSpan(pos),
        orig: deserializeModuleExportName(pos + 12),
        exported: deserializeOptionModuleExportName(pos + 48),
        isTypeOnly: deserializeBoolean(pos + 88)
    };
}

function deserializeExportDefaultDeclaration(pos) {
    return {
        type: 'ExportDefaultDeclaration',
        span: deserializeSpan(pos),
        decl: deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(pos + 12)
    };
}

function deserializeExportDefaultExpression(pos) {
    return {
        type: 'ExportDefaultExpression',
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12)
    };
}

function deserializeExportAllDeclaration(pos) {
    return {
        type: 'ExportAllDeclaration',
        span: deserializeSpan(pos),
        source: deserializeStringLiteral(pos + 12),
        asserts: deserializeOptionObjectExpression(pos + 44)
    };
}

function deserializeModuleExportName(pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(pos + 4);
        case 1: return deserializeStringLiteral(pos + 4);
        default: throw new Error('Unexpected enum value for ModuleExportName');
    }
}

function deserializeStatement(pos) {
    switch (buff[pos]) {
        case 0: return deserializeBlockStatement(pos + 4);
        case 1: return deserializeEmptyStatement(pos + 4);
        case 2: return deserializeDebuggerStatement(pos + 4);
        case 3: return deserializeWithStatement(pos + 4);
        case 4: return deserializeReturnStatement(pos + 4);
        case 5: return deserializeLabeledStatement(pos + 4);
        case 6: return deserializeBreakStatement(pos + 4);
        case 7: return deserializeContinueStatement(pos + 4);
        case 8: return deserializeIfStatement(pos + 4);
        case 9: return deserializeSwitchStatement(pos + 4);
        case 10: return deserializeThrowStatement(pos + 4);
        case 11: return deserializeTryStatement(pos + 4);
        case 12: return deserializeWhileStatement(pos + 4);
        case 13: return deserializeDoWhileStatement(pos + 4);
        case 14: return deserializeForStatement(pos + 4);
        case 15: return deserializeForInStatement(pos + 4);
        case 16: return deserializeForOfStatement(pos + 4);
        case 17: return deserializeDeclaration(pos + 4);
        case 18: return deserializeExpressionStatement(pos + 4);
        default: throw new Error('Unexpected enum value for Statement');
    }
}

function deserializeBlockStatement(pos) {
    return {
        type: 'BlockStatement',
        span: deserializeSpan(pos),
        stmts: deserializeVecStatement(pos + 12)
    };
}

function deserializeOptionBlockStatement(pos) {
    return deserializeOption(pos, deserializeBlockStatement, 4);
}

function deserializeEmptyStatement(pos) {
    return {
        type: 'EmptyStatement',
        span: deserializeSpan(pos)
    };
}

function deserializeDebuggerStatement(pos) {
    return {
        type: 'DebuggerStatement',
        span: deserializeSpan(pos)
    };
}

function deserializeWithStatement(pos) {
    return {
        type: 'WithStatement',
        span: deserializeSpan(pos),
        object: deserializeBoxExpression(pos + 12),
        body: deserializeBoxStatement(pos + 16)
    };
}

function deserializeReturnStatement(pos) {
    return {
        type: 'ReturnStatement',
        span: deserializeSpan(pos),
        argument: deserializeOptionBoxExpression(pos + 12)
    };
}

function deserializeLabeledStatement(pos) {
    return {
        type: 'LabeledStatement',
        span: deserializeSpan(pos),
        label: deserializeIdentifier(pos + 12),
        body: deserializeBoxStatement(pos + 36)
    };
}

function deserializeBreakStatement(pos) {
    return {
        type: 'BreakStatement',
        span: deserializeSpan(pos),
        label: deserializeOptionIdentifier(pos + 12)
    };
}

function deserializeContinueStatement(pos) {
    return {
        type: 'ContinueStatement',
        span: deserializeSpan(pos),
        label: deserializeOptionIdentifier(pos + 12)
    };
}

function deserializeIfStatement(pos) {
    return {
        type: 'IfStatement',
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        consequent: deserializeBoxStatement(pos + 16),
        alternate: deserializeOptionBoxStatement(pos + 20)
    };
}

function deserializeSwitchStatement(pos) {
    return {
        type: 'SwitchStatement',
        span: deserializeSpan(pos),
        discriminant: deserializeBoxExpression(pos + 12),
        cases: deserializeVecSwitchCase(pos + 16)
    };
}

function deserializeSwitchCase(pos) {
    return {
        type: 'SwitchCase',
        span: deserializeSpan(pos),
        test: deserializeOptionBoxExpression(pos + 12),
        consequent: deserializeVecStatement(pos + 20)
    };
}

function deserializeThrowStatement(pos) {
    return {
        type: 'ThrowStatement',
        span: deserializeSpan(pos),
        argument: deserializeBoxExpression(pos + 12)
    };
}

function deserializeTryStatement(pos) {
    return {
        type: 'TryStatement',
        span: deserializeSpan(pos),
        block: deserializeBlockStatement(pos + 12),
        handler: deserializeOptionCatchClause(pos + 32),
        finalizer: deserializeOptionBlockStatement(pos + 124)
    };
}

function deserializeCatchClause(pos) {
    return {
        type: 'CatchClause',
        span: deserializeSpan(pos),
        param: deserializeOptionPattern(pos + 12),
        body: deserializeBlockStatement(pos + 68)
    };
}

function deserializeWhileStatement(pos) {
    return {
        type: 'WhileStatement',
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        body: deserializeBoxStatement(pos + 16)
    };
}

function deserializeDoWhileStatement(pos) {
    return {
        type: 'DoWhileStatement',
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        body: deserializeBoxStatement(pos + 16)
    };
}

function deserializeForStatement(pos) {
    return {
        type: 'ForStatement',
        span: deserializeSpan(pos),
        init: deserializeOptionVariableDeclarationOrBoxExpression(pos + 12),
        test: deserializeOptionBoxExpression(pos + 44),
        update: deserializeOptionBoxExpression(pos + 52),
        body: deserializeBoxStatement(pos + 60)
    };
}

function deserializeForInStatement(pos) {
    return {
        type: 'ForInStatement',
        span: deserializeSpan(pos),
        left: deserializeVariableDeclarationOrPattern(pos + 12),
        right: deserializeBoxExpression(pos + 68),
        body: deserializeBoxStatement(pos + 72)
    };
}

function deserializeForOfStatement(pos) {
    return {
        type: 'ForOfStatement',
        span: deserializeSpan(pos),
        await: deserializeOptionSpan(pos + 12),
        left: deserializeVariableDeclarationOrPattern(pos + 28),
        right: deserializeBoxExpression(pos + 84),
        body: deserializeBoxStatement(pos + 88)
    };
}

function deserializeExpressionStatement(pos) {
    return {
        type: 'ExpressionStatement',
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12)
    };
}

function deserializeDeclaration(pos) {
    switch (buff[pos]) {
        case 0: return deserializeClassDeclaration(pos + 4);
        case 1: return deserializeFunctionDeclaration(pos + 4);
        case 2: return deserializeVariableDeclaration(pos + 4);
        case 3: return deserializeTsInterfaceDeclaration(pos + 4);
        case 4: return deserializeTsTypeAliasDeclaration(pos + 4);
        case 5: return deserializeTsEnumDeclaration(pos + 4);
        case 6: return deserializeTsModuleDeclaration(pos + 4);
        default: throw new Error('Unexpected enum value for Declaration');
    }
}

function deserializeVariableDeclaration(pos) {
    return {
        type: 'VariableDeclaration',
        span: deserializeSpan(pos),
        kind: deserializeVariableDeclarationKind(pos + 12),
        declare: deserializeBoolean(pos + 13),
        declarations: deserializeVecVariableDeclarator(pos + 16)
    };
}

function deserializeVariableDeclarationKind(pos) {
    switch (buff[pos]) {
        case 0: return 'var';
        case 1: return 'let';
        case 2: return 'const';
        default: throw new Error('Unexpected enum value for VariableDeclarationKind');
    }
}

function deserializeVariableDeclarator(pos) {
    return {
        type: 'VariableDeclarator',
        span: deserializeSpan(pos),
        id: deserializePattern(pos + 12),
        init: deserializeOptionBoxExpression(pos + 64),
        definite: deserializeBoolean(pos + 72)
    };
}

function deserializeFunctionDeclaration(pos) {
    return {
        type: 'FunctionDeclaration',
        identifier: deserializeIdentifier(pos),
        declare: deserializeBoolean(pos + 24),
        params: deserializeVecParameter(pos + 28),
        decorators: deserializeVecDecorator(pos + 36),
        span: deserializeSpan(pos + 44),
        body: deserializeOptionBlockStatement(pos + 56),
        generator: deserializeBoolean(pos + 104),
        async: deserializeBoolean(pos + 105),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 80),
        returnType: deserializeOptionTsTypeAnnotation(pos + 108)
    };
}

function deserializeFunctionExpression(pos) {
    return {
        type: 'FunctionExpression',
        identifier: deserializeOptionIdentifier(pos),
        params: deserializeVecParameter(pos + 28),
        decorators: deserializeVecDecorator(pos + 36),
        span: deserializeSpan(pos + 44),
        body: deserializeOptionBlockStatement(pos + 56),
        generator: deserializeBoolean(pos + 104),
        async: deserializeBoolean(pos + 105),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 80),
        returnType: deserializeOptionTsTypeAnnotation(pos + 108)
    };
}

function deserializeArrowFunctionExpression(pos) {
    return {
        type: 'ArrowFunctionExpression',
        span: deserializeSpan(pos),
        params: deserializeVecPattern(pos + 12),
        body: deserializeBlockStatementOrBoxExpression(pos + 20),
        async: deserializeBoolean(pos + 68),
        generator: deserializeBoolean(pos + 69),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 44),
        returnType: deserializeOptionTsTypeAnnotation(pos + 72)
    };
}

function deserializeParameter(pos) {
    return {
        type: 'Parameter',
        span: deserializeSpan(pos),
        decorators: deserializeVecDecorator(pos + 12),
        pat: deserializePattern(pos + 20)
    };
}

function deserializeDecorator(pos) {
    return {
        type: 'Decorator',
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12)
    };
}

function deserializeClassDeclaration(pos) {
    return {
        type: 'ClassDeclaration',
        identifier: deserializeIdentifier(pos),
        declare: deserializeBoolean(pos + 24),
        span: deserializeSpan(pos + 28),
        decorators: deserializeVecDecorator(pos + 40),
        body: deserializeVecClassMember(pos + 48),
        superClass: deserializeOptionBoxExpression(pos + 56),
        isAbstract: deserializeBoolean(pos + 64),
        typeParams: deserializeOptionTsTypeParamDeclaration(pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(pos + 92),
        implements: deserializeVecTsExpressionWithTypeArg(pos + 116)
    };
}

function deserializeClassExpression(pos) {
    return {
        type: 'ClassExpression',
        identifier: deserializeOptionIdentifier(pos),
        span: deserializeSpan(pos + 28),
        decorators: deserializeVecDecorator(pos + 40),
        body: deserializeVecClassMember(pos + 48),
        superClass: deserializeOptionBoxExpression(pos + 56),
        isAbstract: deserializeBoolean(pos + 64),
        typeParams: deserializeOptionTsTypeParamDeclaration(pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(pos + 92),
        implements: deserializeVecTsExpressionWithTypeArg(pos + 116)
    };
}

function deserializeClassMember(pos) {
    switch (buff[pos]) {
        case 0: return deserializeConstructor(pos + 4);
        case 1: return deserializeClassMethod(pos + 4);
        case 2: return deserializePrivateMethod(pos + 4);
        case 3: return deserializeClassProperty(pos + 4);
        case 4: return deserializePrivateProperty(pos + 4);
        case 5: return deserializeTsIndexSignature(pos + 4);
        case 6: return deserializeEmptyStatement(pos + 4);
        case 7: return deserializeStaticBlock(pos + 4);
        default: throw new Error('Unexpected enum value for ClassMember');
    }
}

function deserializeConstructor(pos) {
    return {
        type: 'Constructor',
        span: deserializeSpan(pos + 44),
        key: deserializePropertyName(pos),
        params: deserializeVecTsParamPropOrParameter(pos + 56),
        body: deserializeOptionBlockStatement(pos + 64),
        accessibility: deserializeOptionAccessibility(pos + 88),
        isOptional: deserializeBoolean(pos + 90)
    };
}

function deserializeClassMethod(pos) {
    return {
        type: 'ClassMethod',
        span: deserializeSpan(pos + 44),
        key: deserializePropertyName(pos),
        function: deserializeFunction(pos + 56),
        kind: deserializeMethodKind(pos + 156),
        isStatic: deserializeBoolean(pos + 157),
        accessibility: deserializeOptionAccessibility(pos + 160),
        isAbstract: deserializeBoolean(pos + 158),
        isOptional: deserializeBoolean(pos + 159),
        isOverride: deserializeBoolean(pos + 162)
    };
}

function deserializePrivateMethod(pos) {
    return {
        type: 'PrivateMethod',
        span: deserializeSpan(pos),
        key: deserializePrivateName(pos + 12),
        function: deserializeFunction(pos + 48),
        kind: deserializeMethodKind(pos + 148),
        isStatic: deserializeBoolean(pos + 149),
        accessibility: deserializeOptionAccessibility(pos + 152),
        isAbstract: deserializeBoolean(pos + 150),
        isOptional: deserializeBoolean(pos + 151),
        isOverride: deserializeBoolean(pos + 154)
    };
}

function deserializeClassProperty(pos) {
    return {
        type: 'ClassProperty',
        span: deserializeSpan(pos + 44),
        key: deserializePropertyName(pos),
        value: deserializeOptionBoxExpression(pos + 56),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 64),
        isStatic: deserializeBoolean(pos + 92),
        decorators: deserializeVecDecorator(pos + 84),
        accessibility: deserializeOptionAccessibility(pos + 93),
        isAbstract: deserializeBoolean(pos + 95),
        isOptional: deserializeBoolean(pos + 96),
        isOverride: deserializeBoolean(pos + 97),
        readonly: deserializeBoolean(pos + 98),
        declare: deserializeBoolean(pos + 99),
        definite: deserializeBoolean(pos + 100)
    };
}

function deserializePrivateProperty(pos) {
    return {
        type: 'PrivateProperty',
        span: deserializeSpan(pos),
        key: deserializePrivateName(pos + 12),
        value: deserializeOptionBoxExpression(pos + 48),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 56),
        isStatic: deserializeBoolean(pos + 84),
        decorators: deserializeVecDecorator(pos + 76),
        accessibility: deserializeOptionAccessibility(pos + 85),
        isOptional: deserializeBoolean(pos + 87),
        isOverride: deserializeBoolean(pos + 88),
        readonly: deserializeBoolean(pos + 89),
        definite: deserializeBoolean(pos + 90)
    };
}

function deserializeStaticBlock(pos) {
    return {
        type: 'StaticBlock',
        span: deserializeSpan(pos),
        body: deserializeBlockStatement(pos + 12)
    };
}

function deserializeMethodKind(pos) {
    switch (buff[pos]) {
        case 0: return 'method';
        case 1: return 'getter';
        case 2: return 'setter';
        default: throw new Error('Unexpected enum value for MethodKind');
    }
}

function deserializeFunction(pos) {
    return {
        params: deserializeVecParameter(pos),
        decorators: deserializeVecDecorator(pos + 8),
        span: deserializeSpan(pos + 16),
        body: deserializeOptionBlockStatement(pos + 28),
        generator: deserializeBoolean(pos + 76),
        async: deserializeBoolean(pos + 77),
        typeParameters: deserializeOptionTsTypeParamDeclaration(pos + 52),
        returnType: deserializeOptionTsTypeAnnotation(pos + 80)
    };
}

function deserializePattern(pos) {
    switch (buff[pos]) {
        case 0: return deserializeBindingIdentifier(pos + 4);
        case 1: return deserializeArrayPattern(pos + 4);
        case 2: return deserializeRestElement(pos + 4);
        case 3: return deserializeObjectPattern(pos + 4);
        case 4: return deserializeAssignmentPattern(pos + 4);
        case 5: return deserializeInvalid(pos + 4);
        case 6: return deserializeBoxExpression(pos + 4);
        default: throw new Error('Unexpected enum value for Pattern');
    }
}

function deserializeBindingIdentifier(pos) {
    return {
        type: 'Identifier',
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        optional: deserializeBoolean(pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24)
    };
}

function deserializeArrayPattern(pos) {
    return {
        type: 'ArrayPattern',
        span: deserializeSpan(pos),
        elements: deserializeVecOptionPattern(pos + 12),
        optional: deserializeBoolean(pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24)
    };
}

function deserializeRestElement(pos) {
    return {
        type: 'RestElement',
        span: deserializeSpan(pos),
        rest: deserializeSpan(pos + 12),
        argument: deserializeBoxPattern(pos + 24),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 28)
    };
}

function deserializeObjectPattern(pos) {
    return {
        type: 'ObjectPattern',
        span: deserializeSpan(pos),
        properties: deserializeVecObjectPatternProperty(pos + 12),
        optional: deserializeBoolean(pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24)
    };
}

function deserializeObjectPatternProperty(pos) {
    switch (buff[pos]) {
        case 0: return deserializeKeyValuePatternProperty(pos + 4);
        case 1: return deserializeAssignmentPatternProperty(pos + 4);
        case 2: return deserializeRestElement(pos + 4);
        default: throw new Error('Unexpected enum value for ObjectPatternProperty');
    }
}

function deserializeKeyValuePatternProperty(pos) {
    return {
        type: 'KeyValuePatternProperty',
        key: deserializePropertyName(pos),
        value: deserializeBoxPattern(pos + 44)
    };
}

function deserializeAssignmentPatternProperty(pos) {
    return {
        type: 'AssignmentPatternProperty',
        span: deserializeSpan(pos),
        key: deserializeIdentifier(pos + 12),
        value: deserializeOptionBoxExpression(pos + 36)
    };
}

function deserializeAssignmentPattern(pos) {
    return {
        type: 'AssignmentPattern',
        span: deserializeSpan(pos),
        left: deserializeBoxPattern(pos + 12),
        right: deserializeBoxExpression(pos + 16),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 20)
    };
}

function deserializeExpression(pos) {
    switch (buff[pos]) {
        case 0: return deserializeThisExpression(pos + 4);
        case 1: return deserializeArrayExpression(pos + 4);
        case 2: return deserializeObjectExpression(pos + 4);
        case 3: return deserializeFunctionExpression(pos + 4);
        case 4: return deserializeUnaryExpression(pos + 4);
        case 5: return deserializeUpdateExpression(pos + 4);
        case 6: return deserializeBinaryExpression(pos + 4);
        case 7: return deserializeAssignmentExpression(pos + 4);
        case 8: return deserializeMemberExpression(pos + 4);
        case 9: return deserializeSuperPropExpression(pos + 4);
        case 10: return deserializeConditionalExpression(pos + 4);
        case 11: return deserializeCallExpression(pos + 4);
        case 12: return deserializeNewExpression(pos + 4);
        case 13: return deserializeSequenceExpression(pos + 4);
        case 14: return deserializeIdentifier(pos + 4);
        case 15: return deserializeLiteral(pos + 4);
        case 16: return deserializeTemplateLiteral(pos + 4);
        case 17: return deserializeTaggedTemplateExpression(pos + 4);
        case 18: return deserializeArrowFunctionExpression(pos + 4);
        case 19: return deserializeClassExpression(pos + 4);
        case 20: return deserializeYieldExpression(pos + 4);
        case 21: return deserializeMetaProperty(pos + 4);
        case 22: return deserializeAwaitExpression(pos + 4);
        case 23: return deserializeParenthesisExpression(pos + 4);
        case 24: return deserializeJSXMemberExpression(pos + 4);
        case 25: return deserializeJSXNamespacedName(pos + 4);
        case 26: return deserializeJSXEmptyExpression(pos + 4);
        case 27: return deserializeJSXElement(pos + 4);
        case 28: return deserializeJSXFragment(pos + 4);
        case 29: return deserializeTsTypeAssertion(pos + 4);
        case 30: return deserializeTsConstAssertion(pos + 4);
        case 31: return deserializeTsNonNullExpression(pos + 4);
        case 32: return deserializeTsAsExpression(pos + 4);
        case 33: return deserializeTsInstantiation(pos + 4);
        case 34: return deserializePrivateName(pos + 4);
        case 35: return deserializeOptionalChainingExpression(pos + 4);
        case 36: return deserializeInvalid(pos + 4);
        default: throw new Error('Unexpected enum value for Expression');
    }
}

function deserializeThisExpression(pos) {
    return {
        type: 'ThisExpression',
        span: deserializeSpan(pos)
    };
}

function deserializeArrayExpression(pos) {
    return {
        type: 'ArrayExpression',
        span: deserializeSpan(pos),
        elements: deserializeVecOptionExpressionOrSpread(pos + 12)
    };
}

function deserializeUnaryExpression(pos) {
    return {
        type: 'UnaryExpression',
        span: deserializeSpan(pos),
        operator: deserializeUnaryOperator(pos + 12),
        argument: deserializeBoxExpression(pos + 16)
    };
}

function deserializeUnaryOperator(pos) {
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

function deserializeUpdateExpression(pos) {
    return {
        type: 'UpdateExpression',
        span: deserializeSpan(pos),
        operator: deserializeUpdateOperator(pos + 12),
        prefix: deserializeBoolean(pos + 13),
        argument: deserializeBoxExpression(pos + 16)
    };
}

function deserializeUpdateOperator(pos) {
    switch (buff[pos]) {
        case 0: return '++';
        case 1: return '--';
        default: throw new Error('Unexpected enum value for UpdateOperator');
    }
}

function deserializeBinaryExpression(pos) {
    return {
        type: 'BinaryExpression',
        span: deserializeSpan(pos),
        operator: deserializeBinaryOperator(pos + 16),
        left: deserializeBoxExpression(pos + 12),
        right: deserializeBoxExpression(pos + 20)
    };
}

function deserializeBinaryOperator(pos) {
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

function deserializeAssignmentExpression(pos) {
    return {
        type: 'AssignmentExpression',
        span: deserializeSpan(pos),
        operator: deserializeAssignmentOperator(pos + 20),
        left: deserializeBoxExpressionOrBoxPattern(pos + 12),
        right: deserializeBoxExpression(pos + 24)
    };
}

function deserializeAssignmentOperator(pos) {
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

function deserializeMemberExpression(pos) {
    return {
        type: 'MemberExpression',
        span: deserializeSpan(pos),
        object: deserializeBoxExpression(pos + 12),
        property: deserializeIdentifierOrPrivateNameOrComputed(pos + 16)
    };
}

function deserializeSuperPropExpression(pos) {
    return {
        type: 'SuperPropExpression',
        span: deserializeSpan(pos),
        obj: deserializeSuper(pos + 12),
        property: deserializeIdentifierOrComputed(pos + 24)
    };
}

function deserializeConditionalExpression(pos) {
    return {
        type: 'ConditionalExpression',
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        consequent: deserializeBoxExpression(pos + 16),
        alternate: deserializeBoxExpression(pos + 20)
    };
}

function deserializeCallExpression(pos) {
    return {
        type: 'CallExpression',
        span: deserializeSpan(pos),
        callee: deserializeSuperOrImportOrBoxExpression(pos + 12),
        arguments: deserializeVecExpressionOrSpread(pos + 28),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 36)
    };
}

function deserializeNewExpression(pos) {
    return {
        type: 'NewExpression',
        span: deserializeSpan(pos),
        callee: deserializeBoxExpression(pos + 12),
        arguments: deserializeOptionVecExpressionOrSpread(pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 28)
    };
}

function deserializeSequenceExpression(pos) {
    return {
        type: 'SequenceExpression',
        span: deserializeSpan(pos),
        expressions: deserializeVecBoxExpression(pos + 12)
    };
}

function deserializeIdentifier(pos) {
    return {
        type: 'Identifier',
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        optional: deserializeBoolean(pos + 20)
    };
}

function deserializeTemplateLiteral(pos) {
    return {
        type: 'TemplateLiteral',
        span: deserializeSpan(pos),
        expressions: deserializeVecBoxExpression(pos + 12),
        quasis: deserializeVecTemplateElement(pos + 20)
    };
}

function deserializeTemplateElement(pos) {
    return {
        type: 'TemplateElement',
        span: deserializeSpan(pos),
        tail: deserializeBoolean(pos + 24),
        cooked: deserializeOptionJsWord(pos + 12),
        raw: deserializeJsWord(pos + 28)
    };
}

function deserializeTaggedTemplateExpression(pos) {
    return {
        type: 'TaggedTemplateExpression',
        span: deserializeSpan(pos),
        tag: deserializeBoxExpression(pos + 12),
        typeParameters: deserializeOptionTsTypeParameterInstantiation(pos + 16),
        template: deserializeTemplateLiteral(pos + 40)
    };
}

function deserializeYieldExpression(pos) {
    return {
        type: 'YieldExpression',
        span: deserializeSpan(pos),
        argument: deserializeOptionBoxExpression(pos + 12),
        delegate: deserializeBoolean(pos + 20)
    };
}

function deserializeMetaProperty(pos) {
    return {
        type: 'MetaProperty',
        span: deserializeSpan(pos),
        kind: deserializeMetaPropertyKind(pos + 12)
    };
}

function deserializeMetaPropertyKind(pos) {
    switch (buff[pos]) {
        case 0: return 'new.target';
        case 1: return 'import.meta';
        default: throw new Error('Unexpected enum value for MetaPropertyKind');
    }
}

function deserializeAwaitExpression(pos) {
    return {
        type: 'AwaitExpression',
        span: deserializeSpan(pos),
        argument: deserializeBoxExpression(pos + 12)
    };
}

function deserializeParenthesisExpression(pos) {
    return {
        type: 'ParenthesisExpression',
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12)
    };
}

function deserializePrivateName(pos) {
    return {
        type: 'PrivateName',
        span: deserializeSpan(pos),
        id: deserializeIdentifier(pos + 12)
    };
}

function deserializeOptionalChainingExpression(pos) {
    return {
        type: 'OptionalChainingExpression',
        span: deserializeSpan(pos),
        questionDotToken: deserializeSpan(pos + 12),
        base: deserializeMemberExpressionOrOptionalChainingCall(pos + 24)
    };
}

function deserializeOptionalChainingCall(pos) {
    return {
        type: 'CallExpression',
        span: deserializeSpan(pos),
        callee: deserializeBoxExpression(pos + 12),
        arguments: deserializeVecExpressionOrSpread(pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 24)
    };
}

function deserializeSuper(pos) {
    return {
        type: 'Super',
        span: deserializeSpan(pos)
    };
}

function deserializeImport(pos) {
    return {
        type: 'Import',
        span: deserializeSpan(pos)
    };
}

function deserializeInvalid(pos) {
    return {
        type: 'Invalid',
        span: deserializeSpan(pos)
    };
}

function deserializeComputed(pos) {
    return {
        type: 'Computed',
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12)
    };
}

function deserializeExpressionOrSpread(pos) {
    return {
        spread: deserializeOptionSpan(pos),
        expression: deserializeBoxExpression(pos + 16)
    };
}

function deserializeObjectExpression(pos) {
    return {
        type: 'ObjectExpression',
        span: deserializeSpan(pos),
        properties: deserializeVecSpreadElementOrBoxObjectProperty(pos + 12)
    };
}

function deserializeSpreadElement(pos) {
    return {
        type: 'SpreadElement',
        spread: deserializeSpan(pos),
        arguments: deserializeBoxExpression(pos + 12)
    };
}

function deserializeObjectProperty(pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(pos + 4);
        case 1: return deserializeKeyValueProperty(pos + 4);
        case 2: return deserializeAssignmentProperty(pos + 4);
        case 3: return deserializeGetterProperty(pos + 4);
        case 4: return deserializeSetterProperty(pos + 4);
        case 5: return deserializeMethodProperty(pos + 4);
        default: throw new Error('Unexpected enum value for ObjectProperty');
    }
}

function deserializeKeyValueProperty(pos) {
    return {
        type: 'KeyValueProperty',
        key: deserializePropertyName(pos),
        value: deserializeBoxExpression(pos + 44)
    };
}

function deserializeAssignmentProperty(pos) {
    return {
        type: 'AssignmentProperty',
        span: deserializeSpan(pos),
        key: deserializeIdentifier(pos + 12),
        value: deserializeBoxExpression(pos + 36)
    };
}

function deserializeGetterProperty(pos) {
    return {
        type: 'GetterProperty',
        span: deserializeSpan(pos + 44),
        key: deserializePropertyName(pos),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 56),
        body: deserializeOptionBlockStatement(pos + 76)
    };
}

function deserializeSetterProperty(pos) {
    return {
        type: 'SetterProperty',
        span: deserializeSpan(pos + 44),
        key: deserializePropertyName(pos),
        param: deserializePattern(pos + 56),
        body: deserializeOptionBlockStatement(pos + 108)
    };
}

function deserializeMethodProperty(pos) {
    return {
        type: 'MethodProperty',
        key: deserializePropertyName(pos),
        params: deserializeVecParameter(pos + 44),
        decorators: deserializeVecDecorator(pos + 52),
        span: deserializeSpan(pos + 60),
        body: deserializeOptionBlockStatement(pos + 72),
        generator: deserializeBoolean(pos + 120),
        async: deserializeBoolean(pos + 121),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 96),
        returnType: deserializeOptionTsTypeAnnotation(pos + 124)
    };
}

function deserializePropertyName(pos) {
    switch (buff[pos + 4]) {
        case 0: return deserializeIdentifier(pos + 8);
        case 1: return deserializeStringLiteral(pos + 8);
        case 2: return deserializeNumericLiteral(pos + 8);
        case 3: return deserializeComputed(pos + 8);
        case 4: return deserializeBigIntLiteral(pos + 8);
        default: throw new Error('Unexpected enum value for PropertyName');
    }
}

function deserializeLiteral(pos) {
    switch (buff[pos + 4]) {
        case 0: return deserializeStringLiteral(pos + 8);
        case 1: return deserializeBooleanLiteral(pos + 8);
        case 2: return deserializeNullLiteral(pos + 8);
        case 3: return deserializeNumericLiteral(pos + 8);
        case 4: return deserializeBigIntLiteral(pos + 8);
        case 5: return deserializeRegExpLiteral(pos + 8);
        case 6: return deserializeJSXText(pos + 8);
        default: throw new Error('Unexpected enum value for Literal');
    }
}

function deserializeStringLiteral(pos) {
    return {
        type: 'StringLiteral',
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        raw: deserializeOptionJsWord(pos + 20)
    };
}

function deserializeBooleanLiteral(pos) {
    return {
        type: 'BooleanLiteral',
        span: deserializeSpan(pos),
        value: deserializeBoolean(pos + 12)
    };
}

function deserializeNullLiteral(pos) {
    return {
        type: 'NullLiteral',
        span: deserializeSpan(pos)
    };
}

function deserializeNumericLiteral(pos) {
    return {
        type: 'NumericLiteral',
        span: deserializeSpan(pos + 4),
        value: new Float64Array(arrayBuffer, pos + 20, 1)[0]
    };
}

function deserializeBigIntLiteral(pos) {
    return {
        type: 'BigIntLiteral',
        span: deserializeSpan(pos),
        value: deserializeBigIntValue(pos + 12)
    };
}

function deserializeBigIntValue(pos) {
    // TODO This implementation could be more efficient
    const str = deserializeJsWord(pos);
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

function deserializeRegExpLiteral(pos) {
    return {
        type: 'RegExpLiteral',
        span: deserializeSpan(pos),
        pattern: deserializeJsWord(pos + 12),
        flags: deserializeJsWord(pos + 20)
    };
}

function deserializeJSXText(pos) {
    return {
        type: 'JSXText',
        span: deserializeSpan(pos)
    };
}

function deserializeJSXMemberExpression(pos) {
    return {
        type: 'JSXMemberExpression',
        span: deserializeSpan(pos)
    };
}

function deserializeJSXNamespacedName(pos) {
    return {
        type: 'JSXNamespacedName',
        span: deserializeSpan(pos)
    };
}

function deserializeJSXEmptyExpression(pos) {
    return {
        type: 'JSXEmptyExpression',
        span: deserializeSpan(pos)
    };
}

function deserializeJSXElement(pos) {
    return {
        type: 'JSXElement',
        span: deserializeSpan(pos)
    };
}

function deserializeJSXFragment(pos) {
    return {
        type: 'JSXFragment',
        span: deserializeSpan(pos)
    };
}

function deserializeTsTypeAssertion(pos) {
    return {
        type: 'TsTypeAssertion',
        span: deserializeSpan(pos)
    };
}

function deserializeTsConstAssertion(pos) {
    return {
        type: 'TsConstAssertion',
        span: deserializeSpan(pos)
    };
}

function deserializeTsNonNullExpression(pos) {
    return {
        type: 'TsNonNullExpression',
        span: deserializeSpan(pos)
    };
}

function deserializeTsAsExpression(pos) {
    return {
        type: 'TsAsExpression',
        span: deserializeSpan(pos)
    };
}

function deserializeTsInstantiation(pos) {
    return {
        type: 'TsInstantiation',
        span: deserializeSpan(pos)
    };
}

function deserializeTsTypeAnnotation(pos) {
    return {
        type: 'TsTypeAnnotation',
        span: deserializeSpan(pos),
        typeAnnotation: deserializeBoxTsType(pos + 12)
    };
}

function deserializeTsInterfaceDeclaration(pos) {
    return {
        type: 'TsInterfaceDeclaration',
        span: deserializeSpan(pos)
    };
}

function deserializeTsTypeAliasDeclaration(pos) {
    return {
        type: 'TsTypeAliasDeclaration',
        span: deserializeSpan(pos)
    };
}

function deserializeTsEnumDeclaration(pos) {
    return {
        type: 'TsEnumDeclaration',
        span: deserializeSpan(pos)
    };
}

function deserializeTsModuleDeclaration(pos) {
    return {
        type: 'TsModuleDeclaration',
        span: deserializeSpan(pos)
    };
}

function deserializeTsImportEqualsDeclaration(pos) {
    return {
        type: 'TsImportEqualsDeclaration',
        span: deserializeSpan(pos)
    };
}

function deserializeTsExportAssignment(pos) {
    return {
        type: 'TsExportAssignment',
        span: deserializeSpan(pos)
    };
}

function deserializeTsNamespaceExportDeclaration(pos) {
    return {
        type: 'TsNamespaceExportDeclaration',
        span: deserializeSpan(pos)
    };
}

function deserializeTsTypeParamDeclaration(pos) {
    return {
        type: 'TsTypeParamDeclaration',
        span: deserializeSpan(pos),
        parameters: deserializeVecTsTypeParameter(pos + 12)
    };
}

function deserializeTsTypeParameterInstantiation(pos) {
    return {
        type: 'TsTypeParameterInstantiation',
        span: deserializeSpan(pos),
        params: deserializeVecBoxTsType(pos + 12)
    };
}

function deserializeTsExpressionWithTypeArg(pos) {
    return {
        type: 'TsExpressionWithTypeArg',
        span: deserializeSpan(pos)
    };
}

function deserializeTsIndexSignature(pos) {
    return {
        type: 'TsIndexSignature',
        span: deserializeSpan(pos)
    };
}

function deserializeTsParamProp(pos) {
    return {
        type: 'TsParamProp',
        span: deserializeSpan(pos)
    };
}

function deserializeTsTypeParameterDeclaration(pos) {
    return {
        type: 'TsTypeParameterDeclaration',
        span: deserializeSpan(pos),
        parameters: deserializeVecTsTypeParameter(pos + 12)
    };
}

function deserializeTsTypeParameter(pos) {
    return {
        type: 'TsTypeParameter',
        span: deserializeSpan(pos)
    };
}

function deserializeTsType(pos) {
    return {
        type: 'TsType',
        span: deserializeSpan(pos)
    };
}

function deserializeAccessibility(pos) {
    switch (buff[pos]) {
        case 0: return 'public';
        case 1: return 'protected';
        case 2: return 'private';
        default: throw new Error('Unexpected enum value for Accessibility');
    }
}

function deserializeJsWord(pos) {
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

function deserializeBoolean(pos) {
    switch (buff[pos]) {
        case 0: return false;
        case 1: return true;
        default: throw new Error('Unexpected enum value for Boolean');
    }
}

function deserializeSpan(pos) {
    const pos32 = pos >> 2;
    return {
        start: uint32[pos32],
        end: uint32[pos32 + 1],
        ctxt: uint32[pos32 + 2]
    };
}

function deserializeOptionJsWord(pos) {
    return deserializeOption(pos, deserializeJsWord, 4);
}

function deserializeOptionModuleExportName(pos) {
    return deserializeOption(pos, deserializeModuleExportName, 4);
}

function deserializeVecImportSpecifier(pos) {
    return deserializeVec(pos, deserializeImportSpecifier, 84);
}

function deserializeOptionSpan(pos) {
    return deserializeOption(pos, deserializeSpan, 4);
}

function deserializeOptionExpressionOrSpread(pos) {
    return deserializeOption(pos, deserializeExpressionOrSpread, 4);
}

function deserializeVecOptionExpressionOrSpread(pos) {
    return deserializeVec(pos, deserializeOptionExpressionOrSpread, 24);
}

function deserializeOptionIdentifier(pos) {
    return deserializeOption(pos, deserializeIdentifier, 4);
}

function deserializeVecDecorator(pos) {
    return deserializeVec(pos, deserializeDecorator, 16);
}

function deserializeBoxTsType(pos) {
    return deserializeBox(pos, deserializeTsType);
}

function deserializeOptionTsTypeAnnotation(pos) {
    return deserializeOption(pos, deserializeTsTypeAnnotation, 4);
}

function deserializeOptionPattern(pos) {
    return deserializeOption(pos, deserializePattern, 4);
}

function deserializeVecOptionPattern(pos) {
    return deserializeVec(pos, deserializeOptionPattern, 56);
}

function deserializeBoxPattern(pos) {
    return deserializeBox(pos, deserializePattern);
}

function deserializeOptionBoxExpression(pos) {
    return deserializeOption(pos, deserializeBoxExpression, 4);
}

function deserializeVecObjectPatternProperty(pos) {
    return deserializeVec(pos, deserializeObjectPatternProperty, 56);
}

function deserializeVecParameter(pos) {
    return deserializeVec(pos, deserializeParameter, 72);
}

function deserializeBoxStatement(pos) {
    return deserializeBox(pos, deserializeStatement);
}

function deserializeOptionBoxStatement(pos) {
    return deserializeOption(pos, deserializeBoxStatement, 4);
}

function deserializeVecSwitchCase(pos) {
    return deserializeVec(pos, deserializeSwitchCase, 28);
}

function deserializeOptionCatchClause(pos) {
    return deserializeOption(pos, deserializeCatchClause, 4);
}

function deserializeVecVariableDeclarator(pos) {
    return deserializeVec(pos, deserializeVariableDeclarator, 76);
}

function deserializeVariableDeclarationOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0: return deserializeVariableDeclaration(pos + 4);
        case 1: return deserializeBoxExpression(pos + 4);
        default: throw new Error('Unexpected enum value for VariableDeclarationOrBoxExpression');
    }
}

function deserializeOptionVariableDeclarationOrBoxExpression(pos) {
    return deserializeOption(pos, deserializeVariableDeclarationOrBoxExpression, 4);
}

function deserializeVariableDeclarationOrPattern(pos) {
    switch (buff[pos]) {
        case 0: return deserializeVariableDeclaration(pos + 4);
        case 1: return deserializePattern(pos + 4);
        default: throw new Error('Unexpected enum value for VariableDeclarationOrPattern');
    }
}

function deserializeTsParamPropOrParameter(pos) {
    switch (buff[pos]) {
        case 0: return deserializeTsParamProp(pos + 4);
        case 1: return deserializeParameter(pos + 4);
        default: throw new Error('Unexpected enum value for TsParamPropOrParameter');
    }
}

function deserializeVecTsParamPropOrParameter(pos) {
    return deserializeVec(pos, deserializeTsParamPropOrParameter, 76);
}

function deserializeOptionAccessibility(pos) {
    return deserializeOption(pos, deserializeAccessibility, 1);
}

function deserializeVecTsTypeParameter(pos) {
    return deserializeVec(pos, deserializeTsTypeParameter, 12);
}

function deserializeOptionTsTypeParamDeclaration(pos) {
    return deserializeOption(pos, deserializeTsTypeParamDeclaration, 4);
}

function deserializeVecClassMember(pos) {
    return deserializeVec(pos, deserializeClassMember, 168);
}

function deserializeVecBoxTsType(pos) {
    return deserializeVec(pos, deserializeBoxTsType, 4);
}

function deserializeOptionTsTypeParameterInstantiation(pos) {
    return deserializeOption(pos, deserializeTsTypeParameterInstantiation, 4);
}

function deserializeVecTsExpressionWithTypeArg(pos) {
    return deserializeVec(pos, deserializeTsExpressionWithTypeArg, 12);
}

function deserializeOptionTsTypeParameterDeclaration(pos) {
    return deserializeOption(pos, deserializeTsTypeParameterDeclaration, 4);
}

function deserializeVecStatement(pos) {
    return deserializeVec(pos, deserializeStatement, 152);
}

function deserializeBoxExpressionOrBoxPattern(pos) {
    switch (buff[pos]) {
        case 0: return deserializeBoxExpression(pos + 4);
        case 1: return deserializeBoxPattern(pos + 4);
        default: throw new Error('Unexpected enum value for BoxExpressionOrBoxPattern');
    }
}

function deserializeIdentifierOrPrivateNameOrComputed(pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(pos + 4);
        case 1: return deserializePrivateName(pos + 4);
        case 2: return deserializeComputed(pos + 4);
        default: throw new Error('Unexpected enum value for IdentifierOrPrivateNameOrComputed');
    }
}

function deserializeIdentifierOrComputed(pos) {
    switch (buff[pos]) {
        case 0: return deserializeIdentifier(pos + 4);
        case 1: return deserializeComputed(pos + 4);
        default: throw new Error('Unexpected enum value for IdentifierOrComputed');
    }
}

function deserializeSuperOrImportOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0: return deserializeSuper(pos + 4);
        case 1: return deserializeImport(pos + 4);
        case 2: return deserializeBoxExpression(pos + 4);
        default: throw new Error('Unexpected enum value for SuperOrImportOrBoxExpression');
    }
}

function deserializeVecExpressionOrSpread(pos) {
    return deserializeVec(pos, deserializeExpressionOrSpread, 20);
}

function deserializeOptionVecExpressionOrSpread(pos) {
    return deserializeOption(pos, deserializeVecExpressionOrSpread, 4);
}

function deserializeVecBoxExpression(pos) {
    return deserializeVec(pos, deserializeBoxExpression, 4);
}

function deserializeVecTemplateElement(pos) {
    return deserializeVec(pos, deserializeTemplateElement, 36);
}

function deserializeVecPattern(pos) {
    return deserializeVec(pos, deserializePattern, 52);
}

function deserializeBlockStatementOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0: return deserializeBlockStatement(pos + 4);
        case 1: return deserializeBoxExpression(pos + 4);
        default: throw new Error('Unexpected enum value for BlockStatementOrBoxExpression');
    }
}

function deserializeMemberExpressionOrOptionalChainingCall(pos) {
    switch (buff[pos]) {
        case 0: return deserializeMemberExpression(pos + 4);
        case 1: return deserializeOptionalChainingCall(pos + 4);
        default: throw new Error('Unexpected enum value for MemberExpressionOrOptionalChainingCall');
    }
}

function deserializeBoxExpression(pos) {
    return deserializeBox(pos, deserializeExpression);
}

function deserializeBoxObjectProperty(pos) {
    return deserializeBox(pos, deserializeObjectProperty);
}

function deserializeSpreadElementOrBoxObjectProperty(pos) {
    switch (buff[pos]) {
        case 0: return deserializeSpreadElement(pos + 4);
        case 1: return deserializeBoxObjectProperty(pos + 4);
        default: throw new Error('Unexpected enum value for SpreadElementOrBoxObjectProperty');
    }
}

function deserializeVecSpreadElementOrBoxObjectProperty(pos) {
    return deserializeVec(pos, deserializeSpreadElementOrBoxObjectProperty, 20);
}

function deserializeOptionObjectExpression(pos) {
    return deserializeOption(pos, deserializeObjectExpression, 4);
}

function deserializeVecExportSpecifier(pos) {
    return deserializeVec(pos, deserializeExportSpecifier, 96);
}

function deserializeOptionStringLiteral(pos) {
    return deserializeOption(pos, deserializeStringLiteral, 4);
}

function deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(pos) {
    switch (buff[pos]) {
        case 0: return deserializeClassExpression(pos + 4);
        case 1: return deserializeFunctionExpression(pos + 4);
        case 2: return deserializeTsInterfaceDeclaration(pos + 4);
        default: throw new Error('Unexpected enum value for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration');
    }
}

function deserializeModuleDeclarationOrStatement(pos) {
    switch (buff[pos]) {
        case 0: return deserializeModuleDeclaration(pos + 4);
        case 1: return deserializeStatement(pos + 4);
        default: throw new Error('Unexpected enum value for ModuleDeclarationOrStatement');
    }
}

function deserializeVecModuleDeclarationOrStatement(pos) {
    return deserializeVec(pos, deserializeModuleDeclarationOrStatement, 156);
}

function deserializeOption(pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0: return null;
        case 1: return deserialize(pos + offset);
        default: throw new Error('Unexpected option value');
    }
}

function deserializeBox(pos, deserialize) {
    return deserialize(getPtr(int32, pos));
}

function deserializeVec(pos, deserialize, length) {
    const numEntries = uint32[(pos >> 2) + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    let vecPos = getPtr(int32, pos);
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(vecPos);
        vecPos += length;
    }
    return entries;
}

function getPtr(int32, pos) {
    return pos + int32[pos >> 2];
}

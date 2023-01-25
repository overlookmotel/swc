// Generated code. Do not edit.

"use strict";

module.exports = deserialize;

let buff, int32, uint32, float64;

function deserializeProgram(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeModule(pos + 4);
        case 1:
            return deserializeScript(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for Program");
    }
}

function deserializeModule(pos) {
    return {
        type: "Module",
        span: deserializeSpan(pos),
        body: deserializeVecModuleItem(pos + 12),
        interpreter: deserializeOptionJsWord(pos + 20),
    };
}

function deserializeScript(pos) {
    return {
        type: "Script",
        span: deserializeSpan(pos),
        body: deserializeVecStatement(pos + 12),
        interpreter: deserializeOptionJsWord(pos + 20),
    };
}

function deserializeModuleItem(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeModuleDeclaration(pos + 4);
        case 1:
            return deserializeStatement(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for ModuleItem");
    }
}

function deserializeModuleDeclaration(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeImportDeclaration(pos + 4);
        case 1:
            return deserializeExportDeclaration(pos + 4);
        case 2:
            return deserializeExportNamedDeclaration(pos + 4);
        case 3:
            return deserializeExportDefaultDeclaration(pos + 4);
        case 4:
            return deserializeExportDefaultExpression(pos + 4);
        case 5:
            return deserializeExportAllDeclaration(pos + 4);
        case 6:
            return deserializeTsImportEqualsDeclaration(pos + 4);
        case 7:
            return deserializeTsExportAssignment(pos + 4);
        case 8:
            return deserializeTsNamespaceExportDeclaration(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for ModuleDeclaration");
    }
}

function deserializeImportDeclaration(pos) {
    return {
        type: "ImportDeclaration",
        span: deserializeSpan(pos),
        specifiers: deserializeVecImportSpecifier(pos + 12),
        source: deserializeStringLiteral(pos + 20),
        typeOnly: deserializeBoolean(pos + 52),
        asserts: deserializeOptionObjectExpression(pos + 56),
    };
}

function deserializeImportSpecifier(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeImportNamedSpecifier(pos + 4);
        case 1:
            return deserializeImportDefaultSpecifier(pos + 4);
        case 2:
            return deserializeImportNamespaceSpecifier(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for ImportSpecifier");
    }
}

function deserializeImportNamedSpecifier(pos) {
    return {
        type: "ImportSpecifier",
        span: deserializeSpan(pos),
        local: deserializeIdentifier(pos + 12),
        imported: deserializeOptionTsModuleName(pos + 36),
        isTypeOnly: deserializeBoolean(pos + 76),
    };
}

function deserializeImportDefaultSpecifier(pos) {
    return {
        type: "ImportDefaultSpecifier",
        span: deserializeSpan(pos),
        local: deserializeIdentifier(pos + 12),
    };
}

function deserializeImportNamespaceSpecifier(pos) {
    return {
        type: "ImportNamespaceSpecifier",
        span: deserializeSpan(pos),
        local: deserializeIdentifier(pos + 12),
    };
}

function deserializeExportDeclaration(pos) {
    return {
        type: "ExportDeclaration",
        span: deserializeSpan(pos),
        declaration: deserializeDeclaration(pos + 12),
    };
}

function deserializeExportNamedDeclaration(pos) {
    return {
        type: "ExportNamedDeclaration",
        span: deserializeSpan(pos),
        specifiers: deserializeVecExportSpecifier(pos + 12),
        source: deserializeOptionStringLiteral(pos + 20),
        typeOnly: deserializeBoolean(pos + 56),
        asserts: deserializeOptionObjectExpression(pos + 60),
    };
}

function deserializeExportSpecifier(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeExportNamespaceSpecifier(pos + 4);
        case 1:
            return deserializeExportDefaultSpecifier(pos + 4);
        case 2:
            return deserializeExportNamedSpecifier(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for ExportSpecifier");
    }
}

function deserializeExportNamespaceSpecifier(pos) {
    return {
        type: "ExportNamespaceSpecifier",
        span: deserializeSpan(pos),
        name: deserializeTsModuleName(pos + 12),
    };
}

function deserializeExportDefaultSpecifier(pos) {
    return {
        type: "ExportDefaultSpecifier",
        span: deserializeSpan(pos),
        exported: deserializeIdentifier(pos + 12),
    };
}

function deserializeExportNamedSpecifier(pos) {
    return {
        type: "ExportSpecifier",
        span: deserializeSpan(pos),
        orig: deserializeTsModuleName(pos + 12),
        exported: deserializeOptionTsModuleName(pos + 48),
        isTypeOnly: deserializeBoolean(pos + 88),
    };
}

function deserializeExportDefaultDeclaration(pos) {
    return {
        type: "ExportDefaultDeclaration",
        span: deserializeSpan(pos),
        decl: deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(
            pos + 12
        ),
    };
}

function deserializeExportDefaultExpression(pos) {
    return {
        type: "ExportDefaultExpression",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeExportAllDeclaration(pos) {
    return {
        type: "ExportAllDeclaration",
        span: deserializeSpan(pos),
        source: deserializeStringLiteral(pos + 12),
        asserts: deserializeOptionObjectExpression(pos + 44),
    };
}

function deserializeTsModuleName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeStringLiteral(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsModuleName");
    }
}

function deserializeStatement(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBlockStatement(pos + 4);
        case 1:
            return deserializeEmptyStatement(pos + 4);
        case 2:
            return deserializeDebuggerStatement(pos + 4);
        case 3:
            return deserializeWithStatement(pos + 4);
        case 4:
            return deserializeReturnStatement(pos + 4);
        case 5:
            return deserializeLabeledStatement(pos + 4);
        case 6:
            return deserializeBreakStatement(pos + 4);
        case 7:
            return deserializeContinueStatement(pos + 4);
        case 8:
            return deserializeIfStatement(pos + 4);
        case 9:
            return deserializeSwitchStatement(pos + 4);
        case 10:
            return deserializeThrowStatement(pos + 4);
        case 11:
            return deserializeTryStatement(pos + 4);
        case 12:
            return deserializeWhileStatement(pos + 4);
        case 13:
            return deserializeDoWhileStatement(pos + 4);
        case 14:
            return deserializeForStatement(pos + 4);
        case 15:
            return deserializeForInStatement(pos + 4);
        case 16:
            return deserializeForOfStatement(pos + 4);
        case 17:
            return deserializeDeclaration(pos + 4);
        case 18:
            return deserializeExpressionStatement(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for Statement");
    }
}

function deserializeBlockStatement(pos) {
    return {
        type: "BlockStatement",
        span: deserializeSpan(pos),
        stmts: deserializeVecStatement(pos + 12),
    };
}

function deserializeEmptyStatement(pos) {
    return {
        type: "EmptyStatement",
        span: deserializeSpan(pos),
    };
}

function deserializeDebuggerStatement(pos) {
    return {
        type: "DebuggerStatement",
        span: deserializeSpan(pos),
    };
}

function deserializeWithStatement(pos) {
    return {
        type: "WithStatement",
        span: deserializeSpan(pos),
        object: deserializeBoxExpression(pos + 12),
        body: deserializeBoxStatement(pos + 16),
    };
}

function deserializeReturnStatement(pos) {
    return {
        type: "ReturnStatement",
        span: deserializeSpan(pos),
        argument: deserializeOptionBoxExpression(pos + 12),
    };
}

function deserializeLabeledStatement(pos) {
    return {
        type: "LabeledStatement",
        span: deserializeSpan(pos),
        label: deserializeIdentifier(pos + 12),
        body: deserializeBoxStatement(pos + 36),
    };
}

function deserializeBreakStatement(pos) {
    return {
        type: "BreakStatement",
        span: deserializeSpan(pos),
        label: deserializeOptionIdentifier(pos + 12),
    };
}

function deserializeContinueStatement(pos) {
    return {
        type: "ContinueStatement",
        span: deserializeSpan(pos),
        label: deserializeOptionIdentifier(pos + 12),
    };
}

function deserializeIfStatement(pos) {
    return {
        type: "IfStatement",
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        consequent: deserializeBoxStatement(pos + 16),
        alternate: deserializeOptionBoxStatement(pos + 20),
    };
}

function deserializeSwitchStatement(pos) {
    return {
        type: "SwitchStatement",
        span: deserializeSpan(pos),
        discriminant: deserializeBoxExpression(pos + 12),
        cases: deserializeVecSwitchCase(pos + 16),
    };
}

function deserializeSwitchCase(pos) {
    return {
        type: "SwitchCase",
        span: deserializeSpan(pos),
        test: deserializeOptionBoxExpression(pos + 12),
        consequent: deserializeVecStatement(pos + 20),
    };
}

function deserializeThrowStatement(pos) {
    return {
        type: "ThrowStatement",
        span: deserializeSpan(pos),
        argument: deserializeBoxExpression(pos + 12),
    };
}

function deserializeTryStatement(pos) {
    return {
        type: "TryStatement",
        span: deserializeSpan(pos),
        block: deserializeBlockStatement(pos + 12),
        handler: deserializeOptionCatchClause(pos + 32),
        finalizer: deserializeOptionBlockStatement(pos + 124),
    };
}

function deserializeCatchClause(pos) {
    return {
        type: "CatchClause",
        span: deserializeSpan(pos),
        param: deserializeOptionPattern(pos + 12),
        body: deserializeBlockStatement(pos + 68),
    };
}

function deserializeWhileStatement(pos) {
    return {
        type: "WhileStatement",
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        body: deserializeBoxStatement(pos + 16),
    };
}

function deserializeDoWhileStatement(pos) {
    return {
        type: "DoWhileStatement",
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        body: deserializeBoxStatement(pos + 16),
    };
}

function deserializeForStatement(pos) {
    return {
        type: "ForStatement",
        span: deserializeSpan(pos),
        init: deserializeOptionVariableDeclarationOrBoxExpression(pos + 12),
        test: deserializeOptionBoxExpression(pos + 48),
        update: deserializeOptionBoxExpression(pos + 56),
        body: deserializeBoxStatement(pos + 64),
    };
}

function deserializeForInStatement(pos) {
    return {
        type: "ForInStatement",
        span: deserializeSpan(pos),
        left: deserializeVariableDeclarationOrPattern(pos + 12),
        right: deserializeBoxExpression(pos + 68),
        body: deserializeBoxStatement(pos + 72),
    };
}

function deserializeForOfStatement(pos) {
    return {
        type: "ForOfStatement",
        span: deserializeSpan(pos),
        await: deserializeOptionSpan(pos + 12),
        left: deserializeVariableDeclarationOrPattern(pos + 28),
        right: deserializeBoxExpression(pos + 84),
        body: deserializeBoxStatement(pos + 88),
    };
}

function deserializeExpressionStatement(pos) {
    return {
        type: "ExpressionStatement",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeDeclaration(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeClassDeclaration(pos + 4);
        case 1:
            return deserializeFunctionDeclaration(pos + 4);
        case 2:
            return deserializeVariableDeclaration(pos + 4);
        case 3:
            return deserializeTsInterfaceDeclaration(pos + 4);
        case 4:
            return deserializeTsTypeAliasDeclaration(pos + 4);
        case 5:
            return deserializeTsEnumDeclaration(pos + 4);
        case 6:
            return deserializeTsModuleDeclaration(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for Declaration");
    }
}

function deserializeVariableDeclaration(pos) {
    return {
        type: "VariableDeclaration",
        span: deserializeSpan(pos),
        kind: deserializeVariableDeclarationKind(pos + 12),
        declare: deserializeBoolean(pos + 16),
        declarations: deserializeVecVariableDeclarator(pos + 20),
    };
}

function deserializeVariableDeclarationKind(pos) {
    switch (buff[pos]) {
        case 0:
            return "var";
        case 1:
            return "let";
        case 2:
            return "const";
        default:
            throw new Error(
                "Unexpected enum value ID for VariableDeclarationKind"
            );
    }
}

function deserializeVariableDeclarator(pos) {
    return {
        type: "VariableDeclarator",
        span: deserializeSpan(pos),
        id: deserializePattern(pos + 12),
        init: deserializeOptionBoxExpression(pos + 64),
        definite: deserializeBoolean(pos + 72),
    };
}

function deserializeFunctionDeclaration(pos) {
    return {
        type: "FunctionDeclaration",
        identifier: deserializeIdentifier(pos),
        declare: deserializeBoolean(pos + 24),
        params: deserializeVecParameter(pos + 28),
        decorators: deserializeVecDecorator(pos + 36),
        span: deserializeSpan(pos + 44),
        body: deserializeOptionBlockStatement(pos + 56),
        generator: deserializeBoolean(pos + 80),
        async: deserializeBoolean(pos + 81),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 84),
        returnType: deserializeOptionTsTypeAnnotation(pos + 108),
    };
}

function deserializeFunctionExpression(pos) {
    return {
        type: "FunctionExpression",
        identifier: deserializeOptionIdentifier(pos),
        params: deserializeVecParameter(pos + 28),
        decorators: deserializeVecDecorator(pos + 36),
        span: deserializeSpan(pos + 44),
        body: deserializeOptionBlockStatement(pos + 56),
        generator: deserializeBoolean(pos + 80),
        async: deserializeBoolean(pos + 81),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 84),
        returnType: deserializeOptionTsTypeAnnotation(pos + 108),
    };
}

function deserializeArrowFunctionExpression(pos) {
    return {
        type: "ArrowFunctionExpression",
        span: deserializeSpan(pos),
        params: deserializeVecPattern(pos + 12),
        body: deserializeBlockStatementOrBoxExpression(pos + 20),
        async: deserializeBoolean(pos + 44),
        generator: deserializeBoolean(pos + 45),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 48),
        returnType: deserializeOptionTsTypeAnnotation(pos + 72),
    };
}

function deserializeParameter(pos) {
    return {
        type: "Parameter",
        span: deserializeSpan(pos),
        decorators: deserializeVecDecorator(pos + 12),
        pat: deserializePattern(pos + 20),
    };
}

function deserializeDecorator(pos) {
    return {
        type: "Decorator",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeClassDeclaration(pos) {
    return {
        type: "ClassDeclaration",
        identifier: deserializeIdentifier(pos),
        declare: deserializeBoolean(pos + 24),
        span: deserializeSpan(pos + 28),
        decorators: deserializeVecDecorator(pos + 40),
        body: deserializeVecClassMember(pos + 48),
        superClass: deserializeOptionBoxExpression(pos + 56),
        isAbstract: deserializeBoolean(pos + 64),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(
            pos + 92
        ),
        implements: deserializeVecTsExpressionWithTypeArguments(pos + 116),
    };
}

function deserializeClassExpression(pos) {
    return {
        type: "ClassExpression",
        identifier: deserializeOptionIdentifier(pos),
        span: deserializeSpan(pos + 28),
        decorators: deserializeVecDecorator(pos + 40),
        body: deserializeVecClassMember(pos + 48),
        superClass: deserializeOptionBoxExpression(pos + 56),
        isAbstract: deserializeBoolean(pos + 64),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 68),
        superTypeParams: deserializeOptionTsTypeParameterInstantiation(
            pos + 92
        ),
        implements: deserializeVecTsExpressionWithTypeArguments(pos + 116),
    };
}

function deserializeClassMember(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeConstructor(pos + 8);
        case 1:
            return deserializeClassMethod(pos + 8);
        case 2:
            return deserializePrivateMethod(pos + 4);
        case 3:
            return deserializeClassProperty(pos + 8);
        case 4:
            return deserializePrivateProperty(pos + 4);
        case 5:
            return deserializeTsIndexSignature(pos + 4);
        case 6:
            return deserializeEmptyStatement(pos + 4);
        case 7:
            return deserializeStaticBlock(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for ClassMember");
    }
}

function deserializeConstructor(pos) {
    return {
        type: "Constructor",
        span: deserializeSpan(pos),
        key: deserializePropertyName(pos + 16),
        params: deserializeVecTsParameterPropertyOrParameter(pos + 64),
        body: deserializeOptionBlockStatement(pos + 72),
        accessibility: deserializeOptionAccessibility(pos + 96),
        isOptional: deserializeBoolean(pos + 104),
    };
}

function deserializeClassMethod(pos) {
    return {
        type: "ClassMethod",
        span: deserializeSpan(pos),
        key: deserializePropertyName(pos + 16),
        function: deserializeFunction(pos + 64),
        kind: deserializeMethodKind(pos + 164),
        isStatic: deserializeBoolean(pos + 168),
        accessibility: deserializeOptionAccessibility(pos + 172),
        isAbstract: deserializeBoolean(pos + 180),
        isOptional: deserializeBoolean(pos + 181),
        isOverride: deserializeBoolean(pos + 182),
    };
}

function deserializePrivateMethod(pos) {
    return {
        type: "PrivateMethod",
        span: deserializeSpan(pos),
        key: deserializePrivateName(pos + 12),
        function: deserializeFunction(pos + 48),
        kind: deserializeMethodKind(pos + 148),
        isStatic: deserializeBoolean(pos + 152),
        accessibility: deserializeOptionAccessibility(pos + 156),
        isAbstract: deserializeBoolean(pos + 164),
        isOptional: deserializeBoolean(pos + 165),
        isOverride: deserializeBoolean(pos + 166),
    };
}

function deserializeClassProperty(pos) {
    return {
        type: "ClassProperty",
        span: deserializeSpan(pos),
        key: deserializePropertyName(pos + 16),
        value: deserializeOptionBoxExpression(pos + 64),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 72),
        isStatic: deserializeBoolean(pos + 92),
        decorators: deserializeVecDecorator(pos + 96),
        accessibility: deserializeOptionAccessibility(pos + 104),
        isAbstract: deserializeBoolean(pos + 112),
        isOptional: deserializeBoolean(pos + 113),
        isOverride: deserializeBoolean(pos + 114),
        readonly: deserializeBoolean(pos + 115),
        declare: deserializeBoolean(pos + 116),
        definite: deserializeBoolean(pos + 117),
    };
}

function deserializePrivateProperty(pos) {
    return {
        type: "PrivateProperty",
        span: deserializeSpan(pos),
        key: deserializePrivateName(pos + 12),
        value: deserializeOptionBoxExpression(pos + 48),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 56),
        isStatic: deserializeBoolean(pos + 76),
        decorators: deserializeVecDecorator(pos + 80),
        accessibility: deserializeOptionAccessibility(pos + 88),
        isOptional: deserializeBoolean(pos + 96),
        isOverride: deserializeBoolean(pos + 97),
        readonly: deserializeBoolean(pos + 98),
        definite: deserializeBoolean(pos + 99),
    };
}

function deserializeStaticBlock(pos) {
    return {
        type: "StaticBlock",
        span: deserializeSpan(pos),
        body: deserializeBlockStatement(pos + 12),
    };
}

function deserializeMethodKind(pos) {
    switch (buff[pos]) {
        case 0:
            return "method";
        case 1:
            return "getter";
        case 2:
            return "setter";
        default:
            throw new Error("Unexpected enum value ID for MethodKind");
    }
}

function deserializeFunction(pos) {
    return {
        params: deserializeVecParameter(pos),
        decorators: deserializeVecDecorator(pos + 8),
        span: deserializeSpan(pos + 16),
        body: deserializeOptionBlockStatement(pos + 28),
        generator: deserializeBoolean(pos + 52),
        async: deserializeBoolean(pos + 53),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 56),
        returnType: deserializeOptionTsTypeAnnotation(pos + 80),
    };
}

function deserializePattern(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBindingIdentifier(pos + 4);
        case 1:
            return deserializeArrayPattern(pos + 4);
        case 2:
            return deserializeRestElement(pos + 4);
        case 3:
            return deserializeObjectPattern(pos + 4);
        case 4:
            return deserializeAssignmentPattern(pos + 4);
        case 5:
            return deserializeInvalid(pos + 4);
        case 6:
            return deserializeBoxExpression(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for Pattern");
    }
}

function deserializeBindingIdentifier(pos) {
    return {
        type: "Identifier",
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        optional: deserializeBoolean(pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24),
    };
}

function deserializeArrayPattern(pos) {
    return {
        type: "ArrayPattern",
        span: deserializeSpan(pos),
        elements: deserializeVecOptionPattern(pos + 12),
        optional: deserializeBoolean(pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24),
    };
}

function deserializeRestElement(pos) {
    return {
        type: "RestElement",
        span: deserializeSpan(pos),
        rest: deserializeSpan(pos + 12),
        argument: deserializeBoxPattern(pos + 24),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 28),
    };
}

function deserializeObjectPattern(pos) {
    return {
        type: "ObjectPattern",
        span: deserializeSpan(pos),
        properties: deserializeVecObjectPatternProperty(pos + 12),
        optional: deserializeBoolean(pos + 20),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24),
    };
}

function deserializeObjectPatternProperty(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeKeyValuePatternProperty(pos + 8);
        case 1:
            return deserializeAssignmentPatternProperty(pos + 4);
        case 2:
            return deserializeRestElement(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for ObjectPatternProperty"
            );
    }
}

function deserializeKeyValuePatternProperty(pos) {
    return {
        type: "KeyValuePatternProperty",
        key: deserializePropertyName(pos),
        value: deserializeBoxPattern(pos + 48),
    };
}

function deserializeAssignmentPatternProperty(pos) {
    return {
        type: "AssignmentPatternProperty",
        span: deserializeSpan(pos),
        key: deserializeIdentifier(pos + 12),
        value: deserializeOptionBoxExpression(pos + 36),
    };
}

function deserializeAssignmentPattern(pos) {
    return {
        type: "AssignmentPattern",
        span: deserializeSpan(pos),
        left: deserializeBoxPattern(pos + 12),
        right: deserializeBoxExpression(pos + 16),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 20),
    };
}

function deserializeExpression(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeThisExpression(pos + 4);
        case 1:
            return deserializeArrayExpression(pos + 4);
        case 2:
            return deserializeObjectExpression(pos + 4);
        case 3:
            return deserializeFunctionExpression(pos + 4);
        case 4:
            return deserializeUnaryExpression(pos + 4);
        case 5:
            return deserializeUpdateExpression(pos + 4);
        case 6:
            return deserializeBinaryExpression(pos + 4);
        case 7:
            return deserializeAssignmentExpression(pos + 4);
        case 8:
            return deserializeMemberExpression(pos + 4);
        case 9:
            return deserializeSuperPropExpression(pos + 4);
        case 10:
            return deserializeConditionalExpression(pos + 4);
        case 11:
            return deserializeCallExpression(pos + 4);
        case 12:
            return deserializeNewExpression(pos + 4);
        case 13:
            return deserializeSequenceExpression(pos + 4);
        case 14:
            return deserializeIdentifier(pos + 4);
        case 15:
            return deserializeLiteral(pos + 8);
        case 16:
            return deserializeTemplateLiteral(pos + 4);
        case 17:
            return deserializeTaggedTemplateExpression(pos + 4);
        case 18:
            return deserializeArrowFunctionExpression(pos + 4);
        case 19:
            return deserializeClassExpression(pos + 4);
        case 20:
            return deserializeYieldExpression(pos + 4);
        case 21:
            return deserializeMetaProperty(pos + 4);
        case 22:
            return deserializeAwaitExpression(pos + 4);
        case 23:
            return deserializeParenthesisExpression(pos + 4);
        case 24:
            return deserializeJSXMemberExpression(pos + 4);
        case 25:
            return deserializeJSXNamespacedName(pos + 4);
        case 26:
            return deserializeJSXEmptyExpression(pos + 4);
        case 27:
            return deserializeBoxJSXElement(pos + 4);
        case 28:
            return deserializeJSXFragment(pos + 4);
        case 29:
            return deserializeTsTypeAssertion(pos + 4);
        case 30:
            return deserializeTsConstAssertion(pos + 4);
        case 31:
            return deserializeTsNonNullExpression(pos + 4);
        case 32:
            return deserializeTsAsExpression(pos + 4);
        case 33:
            return deserializeTsInstantiation(pos + 4);
        case 34:
            return deserializePrivateName(pos + 4);
        case 35:
            return deserializeOptionalChainingExpression(pos + 4);
        case 36:
            return deserializeInvalid(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for Expression");
    }
}

function deserializeThisExpression(pos) {
    return {
        type: "ThisExpression",
        span: deserializeSpan(pos),
    };
}

function deserializeArrayExpression(pos) {
    return {
        type: "ArrayExpression",
        span: deserializeSpan(pos),
        elements: deserializeVecOptionExpressionOrSpread(pos + 12),
    };
}

function deserializeUnaryExpression(pos) {
    return {
        type: "UnaryExpression",
        span: deserializeSpan(pos),
        operator: deserializeUnaryOperator(pos + 12),
        argument: deserializeBoxExpression(pos + 16),
    };
}

function deserializeUnaryOperator(pos) {
    switch (buff[pos]) {
        case 0:
            return "-";
        case 1:
            return "+";
        case 2:
            return "!";
        case 3:
            return "~";
        case 4:
            return "typeof";
        case 5:
            return "void";
        case 6:
            return "delete";
        default:
            throw new Error("Unexpected enum value ID for UnaryOperator");
    }
}

function deserializeUpdateExpression(pos) {
    return {
        type: "UpdateExpression",
        span: deserializeSpan(pos),
        operator: deserializeUpdateOperator(pos + 12),
        prefix: deserializeBoolean(pos + 16),
        argument: deserializeBoxExpression(pos + 20),
    };
}

function deserializeUpdateOperator(pos) {
    switch (buff[pos]) {
        case 0:
            return "++";
        case 1:
            return "--";
        default:
            throw new Error("Unexpected enum value ID for UpdateOperator");
    }
}

function deserializeBinaryExpression(pos) {
    return {
        type: "BinaryExpression",
        span: deserializeSpan(pos),
        operator: deserializeBinaryOperator(pos + 12),
        left: deserializeBoxExpression(pos + 16),
        right: deserializeBoxExpression(pos + 20),
    };
}

function deserializeBinaryOperator(pos) {
    switch (buff[pos]) {
        case 0:
            return "==";
        case 1:
            return "!=";
        case 2:
            return "===";
        case 3:
            return "!==";
        case 4:
            return "<";
        case 5:
            return "<=";
        case 6:
            return ">";
        case 7:
            return ">=";
        case 8:
            return "<<";
        case 9:
            return ">>";
        case 10:
            return ">>>";
        case 11:
            return "+";
        case 12:
            return "-";
        case 13:
            return "*";
        case 14:
            return "/";
        case 15:
            return "%";
        case 16:
            return "|";
        case 17:
            return "^";
        case 18:
            return "&";
        case 19:
            return "||";
        case 20:
            return "&&";
        case 21:
            return "in";
        case 22:
            return "instanceof";
        case 23:
            return "**";
        case 24:
            return "??";
        default:
            throw new Error("Unexpected enum value ID for BinaryOperator");
    }
}

function deserializeAssignmentExpression(pos) {
    return {
        type: "AssignmentExpression",
        span: deserializeSpan(pos),
        operator: deserializeAssignmentOperator(pos + 12),
        left: deserializeAssignmentLeft(pos + 16),
        right: deserializeBoxExpression(pos + 24),
    };
}

function deserializeAssignmentLeft(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBoxExpression(pos + 4);
        case 1:
            return deserializeBoxPattern(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for AssignmentLeft");
    }
}

function deserializeAssignmentOperator(pos) {
    switch (buff[pos]) {
        case 0:
            return "=";
        case 1:
            return "+=";
        case 2:
            return "-=";
        case 3:
            return "*=";
        case 4:
            return "/=";
        case 5:
            return "%=";
        case 6:
            return "<<=";
        case 7:
            return ">>=";
        case 8:
            return ">>>=";
        case 9:
            return "|=";
        case 10:
            return "^=";
        case 11:
            return "&=";
        case 12:
            return "**=";
        case 13:
            return "&&=";
        case 14:
            return "||=";
        case 15:
            return "??=";
        default:
            throw new Error("Unexpected enum value ID for AssignmentOperator");
    }
}

function deserializeMemberExpression(pos) {
    return {
        type: "MemberExpression",
        span: deserializeSpan(pos),
        object: deserializeBoxExpression(pos + 12),
        property: deserializeIdentifierOrPrivateNameOrComputed(pos + 16),
    };
}

function deserializeSuperPropExpression(pos) {
    return {
        type: "SuperPropExpression",
        span: deserializeSpan(pos),
        obj: deserializeSuper(pos + 12),
        property: deserializeIdentifierOrComputed(pos + 24),
    };
}

function deserializeConditionalExpression(pos) {
    return {
        type: "ConditionalExpression",
        span: deserializeSpan(pos),
        test: deserializeBoxExpression(pos + 12),
        consequent: deserializeBoxExpression(pos + 16),
        alternate: deserializeBoxExpression(pos + 20),
    };
}

function deserializeCallExpression(pos) {
    return {
        type: "CallExpression",
        span: deserializeSpan(pos),
        callee: deserializeSuperOrImportOrBoxExpression(pos + 12),
        arguments: deserializeVecExpressionOrSpread(pos + 28),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 36),
    };
}

function deserializeNewExpression(pos) {
    return {
        type: "NewExpression",
        span: deserializeSpan(pos),
        callee: deserializeBoxExpression(pos + 12),
        arguments: deserializeOptionVecExpressionOrSpread(pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 28),
    };
}

function deserializeSequenceExpression(pos) {
    return {
        type: "SequenceExpression",
        span: deserializeSpan(pos),
        expressions: deserializeVecBoxExpression(pos + 12),
    };
}

function deserializeIdentifier(pos) {
    return {
        type: "Identifier",
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        optional: deserializeBoolean(pos + 20),
    };
}

function deserializeTemplateLiteral(pos) {
    return {
        type: "TemplateLiteral",
        span: deserializeSpan(pos),
        expressions: deserializeVecBoxExpression(pos + 12),
        quasis: deserializeVecTemplateElement(pos + 20),
    };
}

function deserializeTemplateElement(pos) {
    return {
        type: "TemplateElement",
        span: deserializeSpan(pos),
        tail: deserializeBoolean(pos + 12),
        cooked: deserializeOptionJsWord(pos + 16),
        raw: deserializeJsWord(pos + 28),
    };
}

function deserializeTaggedTemplateExpression(pos) {
    return {
        type: "TaggedTemplateExpression",
        span: deserializeSpan(pos),
        tag: deserializeBoxExpression(pos + 12),
        typeParameters: deserializeOptionTsTypeParameterInstantiation(pos + 16),
        template: deserializeTemplateLiteral(pos + 40),
    };
}

function deserializeYieldExpression(pos) {
    return {
        type: "YieldExpression",
        span: deserializeSpan(pos),
        argument: deserializeOptionBoxExpression(pos + 12),
        delegate: deserializeBoolean(pos + 20),
    };
}

function deserializeMetaProperty(pos) {
    return {
        type: "MetaProperty",
        span: deserializeSpan(pos),
        kind: deserializeMetaPropertyKind(pos + 12),
    };
}

function deserializeMetaPropertyKind(pos) {
    switch (buff[pos]) {
        case 0:
            return "new.target";
        case 1:
            return "import.meta";
        default:
            throw new Error("Unexpected enum value ID for MetaPropertyKind");
    }
}

function deserializeAwaitExpression(pos) {
    return {
        type: "AwaitExpression",
        span: deserializeSpan(pos),
        argument: deserializeBoxExpression(pos + 12),
    };
}

function deserializeParenthesisExpression(pos) {
    return {
        type: "ParenthesisExpression",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializePrivateName(pos) {
    return {
        type: "PrivateName",
        span: deserializeSpan(pos),
        id: deserializeIdentifier(pos + 12),
    };
}

function deserializeOptionalChainingExpression(pos) {
    return {
        type: "OptionalChainingExpression",
        span: deserializeSpan(pos),
        questionDotToken: deserializeSpan(pos + 12),
        base: deserializeMemberExpressionOrOptionalChainingCall(pos + 24),
    };
}

function deserializeOptionalChainingCall(pos) {
    return {
        type: "CallExpression",
        span: deserializeSpan(pos),
        callee: deserializeBoxExpression(pos + 12),
        arguments: deserializeVecExpressionOrSpread(pos + 16),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 24),
    };
}

function deserializeSuper(pos) {
    return {
        type: "Super",
        span: deserializeSpan(pos),
    };
}

function deserializeImport(pos) {
    return {
        type: "Import",
        span: deserializeSpan(pos),
    };
}

function deserializeInvalid(pos) {
    return {
        type: "Invalid",
        span: deserializeSpan(pos),
    };
}

function deserializeComputed(pos) {
    return {
        type: "Computed",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeExpressionOrSpread(pos) {
    return {
        spread: deserializeOptionSpan(pos),
        expression: deserializeBoxExpression(pos + 16),
    };
}

function deserializeObjectExpression(pos) {
    return {
        type: "ObjectExpression",
        span: deserializeSpan(pos),
        properties: deserializeVecSpreadElementOrBoxObjectProperty(pos + 12),
    };
}

function deserializeSpreadElement(pos) {
    return {
        type: "SpreadElement",
        spread: deserializeSpan(pos),
        arguments: deserializeBoxExpression(pos + 12),
    };
}

function deserializeObjectProperty(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeKeyValueProperty(pos + 8);
        case 2:
            return deserializeAssignmentProperty(pos + 4);
        case 3:
            return deserializeGetterProperty(pos + 8);
        case 4:
            return deserializeSetterProperty(pos + 8);
        case 5:
            return deserializeMethodProperty(pos + 8);
        default:
            throw new Error("Unexpected enum option ID for ObjectProperty");
    }
}

function deserializeKeyValueProperty(pos) {
    return {
        type: "KeyValueProperty",
        key: deserializePropertyName(pos),
        value: deserializeBoxExpression(pos + 48),
    };
}

function deserializeAssignmentProperty(pos) {
    return {
        type: "AssignmentProperty",
        key: deserializeIdentifier(pos),
        value: deserializeBoxExpression(pos + 24),
    };
}

function deserializeGetterProperty(pos) {
    return {
        type: "GetterProperty",
        span: deserializeSpan(pos),
        key: deserializePropertyName(pos + 16),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 64),
        body: deserializeOptionBlockStatement(pos + 84),
    };
}

function deserializeSetterProperty(pos) {
    return {
        type: "SetterProperty",
        span: deserializeSpan(pos),
        key: deserializePropertyName(pos + 16),
        param: deserializePattern(pos + 64),
        body: deserializeOptionBlockStatement(pos + 116),
    };
}

function deserializeMethodProperty(pos) {
    return {
        type: "MethodProperty",
        key: deserializePropertyName(pos),
        params: deserializeVecParameter(pos + 48),
        decorators: deserializeVecDecorator(pos + 56),
        span: deserializeSpan(pos + 64),
        body: deserializeOptionBlockStatement(pos + 76),
        generator: deserializeBoolean(pos + 100),
        async: deserializeBoolean(pos + 101),
        typeParameters: deserializeOptionTsTypeParameterDeclaration(pos + 104),
        returnType: deserializeOptionTsTypeAnnotation(pos + 128),
    };
}

function deserializePropertyName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeStringLiteral(pos + 4);
        case 2:
            return deserializeNumericLiteral(pos + 8);
        case 3:
            return deserializeComputed(pos + 4);
        case 4:
            return deserializeBigIntLiteral(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for PropertyName");
    }
}

function deserializeLiteral(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeStringLiteral(pos + 4);
        case 1:
            return deserializeBooleanLiteral(pos + 4);
        case 2:
            return deserializeNullLiteral(pos + 4);
        case 3:
            return deserializeNumericLiteral(pos + 8);
        case 4:
            return deserializeBigIntLiteral(pos + 4);
        case 5:
            return deserializeRegExpLiteral(pos + 4);
        case 6:
            return deserializeJSXText(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for Literal");
    }
}

function deserializeStringLiteral(pos) {
    return {
        type: "StringLiteral",
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        raw: deserializeOptionJsWord(pos + 20),
    };
}

function deserializeBooleanLiteral(pos) {
    return {
        type: "BooleanLiteral",
        span: deserializeSpan(pos),
        value: deserializeBoolean(pos + 12),
    };
}

function deserializeNullLiteral(pos) {
    return {
        type: "NullLiteral",
        span: deserializeSpan(pos),
    };
}

function deserializeNumericLiteral(pos) {
    return {
        type: "NumericLiteral",
        span: deserializeSpan(pos),
        value: deserializeNumber(pos + 16),
        raw: deserializeOptionAsciiJsWord(pos + 24),
    };
}

function deserializeBigIntLiteral(pos) {
    return {
        type: "BigIntLiteral",
        span: deserializeSpan(pos),
        value: deserializeBigIntValue(pos + 12),
        raw: deserializeOptionAsciiJsWord(pos + 20),
    };
}

function deserializeBigIntValue(pos) {
    const str = deserializeAsciiJsWord(pos);
    if (str === "0") return [0, []];
    let sign, current;
    if (str[0] === "-") {
        sign = -1;
        current = BigInt(str.slice(1));
    } else {
        sign = 1;
        current = BigInt(str);
    }
    const parts = [];
    while (true) {
        const next = current >> 32n;
        if (next === 0n) {
            parts.push(Number(current));
            break;
        }
        parts.push(Number(current & 4294967295n));
        current = next;
    }
    return [sign, parts];
}

function deserializeRegExpLiteral(pos) {
    return {
        type: "RegExpLiteral",
        span: deserializeSpan(pos),
        pattern: deserializeJsWord(pos + 12),
        flags: deserializeAsciiJsWord(pos + 20),
    };
}

function deserializeJSXElement(pos) {
    return {
        type: "JSXElement",
        span: deserializeSpan(pos),
        opening: deserializeJSXOpeningElement(pos + 12),
        children: deserializeVecJSXElementChild(pos + 116),
        closing: deserializeOptionJSXClosingElement(pos + 124),
    };
}

function deserializeJSXOpeningElement(pos) {
    return {
        type: "JSXOpeningElement",
        name: deserializeJSXElementName(pos),
        span: deserializeSpan(pos + 56),
        attributes: deserializeVecJSXAttributeOrSpreadElement(pos + 68),
        selfClosing: deserializeBoolean(pos + 76),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 80),
    };
}

function deserializeJSXAttribute(pos) {
    return {
        type: "JSXAttribute",
        span: deserializeSpan(pos),
        name: deserializeJSXAttributeName(pos + 12),
        value: deserializeOptionJSXAttributeValue(pos + 64),
    };
}

function deserializeJSXAttributeName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeJSXNamespacedName(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for JSXAttributeName");
    }
}

function deserializeJSXAttributeValue(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeLiteral(pos + 8);
        case 1:
            return deserializeJSXExpressionContainer(pos + 4);
        case 2:
            return deserializeBoxJSXElement(pos + 4);
        case 3:
            return deserializeJSXFragment(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for JSXAttributeValue");
    }
}

function deserializeJSXClosingElement(pos) {
    return {
        type: "JSXClosingElement",
        span: deserializeSpan(pos),
        name: deserializeJSXElementName(pos + 12),
    };
}

function deserializeJSXFragment(pos) {
    return {
        type: "JSXFragment",
        span: deserializeSpan(pos),
        opening: deserializeJSXOpeningFragment(pos + 12),
        children: deserializeVecJSXElementChild(pos + 24),
        closing: deserializeJSXClosingFragment(pos + 32),
    };
}

function deserializeJSXOpeningFragment(pos) {
    return {
        type: "JSXOpeningFragment",
        span: deserializeSpan(pos),
    };
}

function deserializeJSXClosingFragment(pos) {
    return {
        type: "JSXClosingFragment",
        span: deserializeSpan(pos),
    };
}

function deserializeJSXMemberExpression(pos) {
    return {
        type: "JSXMemberExpression",
        object: deserializeJSXObject(pos),
        property: deserializeIdentifier(pos + 28),
    };
}

function deserializeJSXObject(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBoxJSXMemberExpression(pos + 4);
        case 1:
            return deserializeIdentifier(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for JSXObject");
    }
}

function deserializeJSXNamespacedName(pos) {
    return {
        type: "JSXNamespacedName",
        namespace: deserializeIdentifier(pos),
        name: deserializeIdentifier(pos + 24),
    };
}

function deserializeJSXText(pos) {
    return {
        type: "JSXText",
        span: deserializeSpan(pos),
        value: deserializeJsWord(pos + 12),
        raw: deserializeJsWord(pos + 20),
    };
}

function deserializeJSXEmptyExpression(pos) {
    return {
        type: "JSXEmptyExpression",
        span: deserializeSpan(pos),
    };
}

function deserializeJSXElementChild(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeJSXText(pos + 4);
        case 1:
            return deserializeJSXExpressionContainer(pos + 4);
        case 2:
            return deserializeJSXSpreadChild(pos + 4);
        case 3:
            return deserializeBoxJSXElement(pos + 4);
        case 4:
            return deserializeJSXFragment(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for JSXElementChild");
    }
}

function deserializeJSXExpressionContainer(pos) {
    return {
        type: "JSXExpressionContainer",
        span: deserializeSpan(pos),
        expression: deserializeJSXExpression(pos + 12),
    };
}

function deserializeJSXExpression(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeJSXEmptyExpression(pos + 4);
        case 1:
            return deserializeBoxExpression(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for JSXExpression");
    }
}

function deserializeJSXSpreadChild(pos) {
    return {
        type: "JSXSpreadChild",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeJSXElementName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeJSXMemberExpression(pos + 4);
        case 2:
            return deserializeJSXNamespacedName(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for JSXElementName");
    }
}

function deserializeTsTypeAnnotation(pos) {
    return {
        type: "TsTypeAnnotation",
        span: deserializeSpan(pos),
        typeAnnotation: deserializeBoxTsType(pos + 12),
    };
}

function deserializeTsTypeParameterDeclaration(pos) {
    return {
        type: "TsTypeParameterDeclaration",
        span: deserializeSpan(pos),
        parameters: deserializeVecTsTypeParameter(pos + 12),
    };
}

function deserializeTsTypeParameter(pos) {
    return {
        type: "TsTypeParameter",
        span: deserializeSpan(pos),
        name: deserializeIdentifier(pos + 12),
        in: deserializeBoolean(pos + 36),
        out: deserializeBoolean(pos + 37),
        constraint: deserializeOptionBoxTsType(pos + 40),
        default: deserializeOptionBoxTsType(pos + 48),
    };
}

function deserializeTsTypeParameterInstantiation(pos) {
    return {
        type: "TsTypeParameterInstantiation",
        span: deserializeSpan(pos),
        params: deserializeVecBoxTsType(pos + 12),
    };
}

function deserializeTsParameterProperty(pos) {
    return {
        type: "TsParameterProperty",
        span: deserializeSpan(pos),
        decorators: deserializeVecDecorator(pos + 12),
        accessibility: deserializeOptionAccessibility(pos + 20),
        override: deserializeBoolean(pos + 28),
        readonly: deserializeBoolean(pos + 29),
        param: deserializeTsParamPropParam(pos + 32),
    };
}

function deserializeTsParamPropParam(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBindingIdentifier(pos + 4);
        case 1:
            return deserializeAssignmentPattern(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsParamPropParam");
    }
}

function deserializeTsQualifiedName(pos) {
    return {
        type: "TsQualifiedName",
        left: deserializeTsEntityName(pos),
        right: deserializeIdentifier(pos + 28),
    };
}

function deserializeTsEntityName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBoxTsQualifiedName(pos + 4);
        case 1:
            return deserializeIdentifier(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsEntityName");
    }
}

function deserializeTsTypeElement(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsCallSignatureDeclaration(pos + 4);
        case 1:
            return deserializeTsConstructSignatureDeclaration(pos + 4);
        case 2:
            return deserializeTsPropertySignature(pos + 4);
        case 3:
            return deserializeTsGetterSignature(pos + 4);
        case 4:
            return deserializeTsSetterSignature(pos + 4);
        case 5:
            return deserializeTsMethodSignature(pos + 4);
        case 6:
            return deserializeTsIndexSignature(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsTypeElement");
    }
}

function deserializeTsCallSignatureDeclaration(pos) {
    return {
        type: "TsCallSignatureDeclaration",
        span: deserializeSpan(pos),
        params: deserializeVecTsFnParam(pos + 12),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 20),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 40),
    };
}

function deserializeTsConstructSignatureDeclaration(pos) {
    return {
        type: "TsConstructSignatureDeclaration",
        span: deserializeSpan(pos),
        params: deserializeVecTsFnParam(pos + 12),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 20),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 40),
    };
}

function deserializeTsPropertySignature(pos) {
    return {
        type: "TsPropertySignature",
        span: deserializeSpan(pos),
        readonly: deserializeBoolean(pos + 12),
        key: deserializeBoxExpression(pos + 16),
        computed: deserializeBoolean(pos + 20),
        optional: deserializeBoolean(pos + 21),
        init: deserializeOptionBoxExpression(pos + 24),
        params: deserializeVecTsFnParam(pos + 32),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 40),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 60),
    };
}

function deserializeTsGetterSignature(pos) {
    return {
        type: "TsGetterSignature",
        span: deserializeSpan(pos),
        readonly: deserializeBoolean(pos + 12),
        key: deserializeBoxExpression(pos + 16),
        computed: deserializeBoolean(pos + 20),
        optional: deserializeBoolean(pos + 21),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 24),
    };
}

function deserializeTsSetterSignature(pos) {
    return {
        type: "TsSetterSignature",
        span: deserializeSpan(pos),
        readonly: deserializeBoolean(pos + 12),
        key: deserializeBoxExpression(pos + 16),
        computed: deserializeBoolean(pos + 20),
        optional: deserializeBoolean(pos + 21),
        param: deserializeTsFnParam(pos + 24),
    };
}

function deserializeTsMethodSignature(pos) {
    return {
        type: "TsMethodSignature",
        span: deserializeSpan(pos),
        readonly: deserializeBoolean(pos + 12),
        key: deserializeBoxExpression(pos + 16),
        computed: deserializeBoolean(pos + 20),
        optional: deserializeBoolean(pos + 21),
        params: deserializeVecTsFnParam(pos + 24),
        typeAnn: deserializeOptionTsTypeAnnotation(pos + 32),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 52),
    };
}

function deserializeTsIndexSignature(pos) {
    return {
        type: "TsIndexSignature",
        params: deserializeVecTsFnParam(pos),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 8),
        readonly: deserializeBoolean(pos + 28),
        static: deserializeBoolean(pos + 29),
        span: deserializeSpan(pos + 32),
    };
}

function deserializeTsType(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsKeywordType(pos + 4);
        case 1:
            return deserializeTsThisType(pos + 4);
        case 2:
            return deserializeTsFnOrConstructorType(pos + 4);
        case 3:
            return deserializeTsTypeReference(pos + 4);
        case 4:
            return deserializeTsTypeQuery(pos + 4);
        case 5:
            return deserializeTsTypeLiteral(pos + 4);
        case 6:
            return deserializeTsArrayType(pos + 4);
        case 7:
            return deserializeTsTupleType(pos + 4);
        case 8:
            return deserializeTsOptionalType(pos + 4);
        case 9:
            return deserializeTsRestType(pos + 4);
        case 10:
            return deserializeTsUnionOrIntersectionType(pos + 4);
        case 11:
            return deserializeTsConditionalType(pos + 4);
        case 12:
            return deserializeTsInferType(pos + 4);
        case 13:
            return deserializeTsParenthesizedType(pos + 4);
        case 14:
            return deserializeTsTypeOperator(pos + 4);
        case 15:
            return deserializeTsIndexedAccessType(pos + 4);
        case 16:
            return deserializeTsMappedType(pos + 4);
        case 17:
            return deserializeTsLiteralType(pos + 8);
        case 18:
            return deserializeTsTypePredicate(pos + 4);
        case 19:
            return deserializeTsImportType(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsType");
    }
}

function deserializeTsFnOrConstructorType(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsFunctionType(pos + 4);
        case 1:
            return deserializeTsConstructorType(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for TsFnOrConstructorType"
            );
    }
}

function deserializeTsKeywordType(pos) {
    return {
        type: "TsKeywordType",
        span: deserializeSpan(pos),
        kind: deserializeTsKeywordTypeKind(pos + 12),
    };
}

function deserializeTsKeywordTypeKind(pos) {
    switch (buff[pos]) {
        case 0:
            return "any";
        case 1:
            return "unknown";
        case 2:
            return "number";
        case 3:
            return "object";
        case 4:
            return "boolean";
        case 5:
            return "bigint";
        case 6:
            return "string";
        case 7:
            return "symbol";
        case 8:
            return "void";
        case 9:
            return "undefined";
        case 10:
            return "null";
        case 11:
            return "never";
        case 12:
            return "intrinsic";
        default:
            throw new Error("Unexpected enum value ID for TsKeywordTypeKind");
    }
}

function deserializeTsThisType(pos) {
    return {
        type: "TsThisType",
        span: deserializeSpan(pos),
    };
}

function deserializeTsFnParam(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBindingIdentifier(pos + 4);
        case 1:
            return deserializeArrayPattern(pos + 4);
        case 2:
            return deserializeRestElement(pos + 4);
        case 3:
            return deserializeObjectPattern(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsFnParam");
    }
}

function deserializeTsFunctionType(pos) {
    return {
        type: "TsFunctionType",
        span: deserializeSpan(pos),
        params: deserializeVecTsFnParam(pos + 12),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 20),
        typeAnnotation: deserializeTsTypeAnnotation(pos + 44),
    };
}

function deserializeTsConstructorType(pos) {
    return {
        type: "TsConstructorType",
        span: deserializeSpan(pos),
        params: deserializeVecTsFnParam(pos + 12),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 20),
        typeAnnotation: deserializeTsTypeAnnotation(pos + 44),
        isAbstract: deserializeBoolean(pos + 60),
    };
}

function deserializeTsTypeReference(pos) {
    return {
        type: "TsTypeReference",
        span: deserializeSpan(pos),
        typeName: deserializeTsEntityName(pos + 12),
        typeParams: deserializeOptionTsTypeParameterInstantiation(pos + 40),
    };
}

function deserializeTsTypePredicate(pos) {
    return {
        type: "TsTypePredicate",
        span: deserializeSpan(pos),
        asserts: deserializeBoolean(pos + 12),
        paramName: deserializeTsThisTypeOrIdent(pos + 16),
        typeAnnotation: deserializeOptionTsTypeAnnotation(pos + 44),
    };
}

function deserializeTsThisTypeOrIdent(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsThisType(pos + 4);
        case 1:
            return deserializeIdentifier(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsThisTypeOrIdent");
    }
}

function deserializeTsTypeQuery(pos) {
    return {
        type: "TsTypeQuery",
        span: deserializeSpan(pos),
        exprName: deserializeTsTypeQueryExpr(pos + 12),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 116),
    };
}

function deserializeTsTypeQueryExpr(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsEntityName(pos + 4);
        case 1:
            return deserializeTsImportType(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsTypeQueryExpr");
    }
}

function deserializeTsImportType(pos) {
    return {
        type: "TsImportType",
        span: deserializeSpan(pos),
        argument: deserializeStringLiteral(pos + 12),
        qualifier: deserializeOptionTsEntityName(pos + 44),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 76),
    };
}

function deserializeTsTypeLiteral(pos) {
    return {
        type: "TsTypeLiteral",
        span: deserializeSpan(pos),
        members: deserializeVecTsTypeElement(pos + 12),
    };
}

function deserializeTsArrayType(pos) {
    return {
        type: "TsArrayType",
        span: deserializeSpan(pos),
        elemType: deserializeBoxTsType(pos + 12),
    };
}

function deserializeTsTupleType(pos) {
    return {
        type: "TsTupleType",
        span: deserializeSpan(pos),
        elemTypes: deserializeVecTsTupleElement(pos + 12),
    };
}

function deserializeTsTupleElement(pos) {
    return {
        type: "TsTupleElement",
        span: deserializeSpan(pos),
        label: deserializeOptionPattern(pos + 12),
        ty: deserializeTsType(pos + 72),
    };
}

function deserializeTsOptionalType(pos) {
    return {
        type: "TsOptionalType",
        span: deserializeSpan(pos),
        typeAnnotation: deserializeBoxTsType(pos + 12),
    };
}

function deserializeTsRestType(pos) {
    return {
        type: "TsRestType",
        span: deserializeSpan(pos),
        typeAnnotation: deserializeBoxTsType(pos + 12),
    };
}

function deserializeTsUnionOrIntersectionType(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsUnionType(pos + 4);
        case 1:
            return deserializeTsIntersectionType(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for TsUnionOrIntersectionType"
            );
    }
}

function deserializeTsUnionType(pos) {
    return {
        type: "TsUnionType",
        span: deserializeSpan(pos),
        types: deserializeVecBoxTsType(pos + 12),
    };
}

function deserializeTsIntersectionType(pos) {
    return {
        type: "TsIntersectionType",
        span: deserializeSpan(pos),
        types: deserializeVecBoxTsType(pos + 12),
    };
}

function deserializeTsConditionalType(pos) {
    return {
        type: "TsConditionalType",
        span: deserializeSpan(pos),
        checkType: deserializeBoxTsType(pos + 12),
        extendsType: deserializeBoxTsType(pos + 16),
        trueType: deserializeBoxTsType(pos + 20),
        falseType: deserializeBoxTsType(pos + 24),
    };
}

function deserializeTsInferType(pos) {
    return {
        type: "TsInferType",
        span: deserializeSpan(pos),
        typeParam: deserializeTsTypeParameter(pos + 12),
    };
}

function deserializeTsParenthesizedType(pos) {
    return {
        type: "TsParenthesizedType",
        span: deserializeSpan(pos),
        typeAnnotation: deserializeBoxTsType(pos + 12),
    };
}

function deserializeTsTypeOperator(pos) {
    return {
        type: "TsTypeOperator",
        span: deserializeSpan(pos),
        op: deserializeTsTypeOperatorOp(pos + 12),
        typeAnnotation: deserializeBoxTsType(pos + 16),
    };
}

function deserializeTsTypeOperatorOp(pos) {
    switch (buff[pos]) {
        case 0:
            return "keyof";
        case 1:
            return "unique";
        case 2:
            return "readonly";
        default:
            throw new Error("Unexpected enum value ID for TsTypeOperatorOp");
    }
}

function deserializeTsIndexedAccessType(pos) {
    return {
        type: "TsIndexedAccessType",
        span: deserializeSpan(pos),
        readonly: deserializeBoolean(pos + 12),
        objectType: deserializeBoxTsType(pos + 16),
        indexType: deserializeBoxTsType(pos + 20),
    };
}

function deserializeTruePlusMinus(pos) {
    switch (buff[pos]) {
        case 0:
            return true;
        case 1:
            return "+";
        case 2:
            return "-";
        default:
            throw new Error("Unexpected enum value ID for TruePlusMinus");
    }
}

function deserializeTsMappedType(pos) {
    return {
        type: "TsMappedType",
        span: deserializeSpan(pos),
        readonly: deserializeOptionTruePlusMinus(pos + 12),
        typeParam: deserializeTsTypeParameter(pos + 20),
        nameType: deserializeOptionBoxTsType(pos + 76),
        optional: deserializeOptionTruePlusMinus(pos + 84),
        typeAnnotation: deserializeOptionBoxTsType(pos + 92),
    };
}

function deserializeTsLiteralType(pos) {
    return {
        type: "TsLiteralType",
        span: deserializeSpan(pos),
        literal: deserializeTsLit(pos + 16),
    };
}

function deserializeTsLit(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeNumericLiteral(pos + 8);
        case 1:
            return deserializeStringLiteral(pos + 4);
        case 2:
            return deserializeBooleanLiteral(pos + 4);
        case 3:
            return deserializeBigIntLiteral(pos + 4);
        case 4:
            return deserializeTsTemplateLiteralType(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsLit");
    }
}

function deserializeTsTemplateLiteralType(pos) {
    return {
        type: "TemplateLiteral",
        span: deserializeSpan(pos),
        types: deserializeVecBoxTsType(pos + 12),
        quasis: deserializeVecTemplateElement(pos + 20),
    };
}

function deserializeTsInterfaceDeclaration(pos) {
    return {
        type: "TsInterfaceDeclaration",
        span: deserializeSpan(pos),
        id: deserializeIdentifier(pos + 12),
        declare: deserializeBoolean(pos + 36),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 40),
        extends: deserializeVecTsExpressionWithTypeArguments(pos + 64),
        body: deserializeTsInterfaceBody(pos + 72),
    };
}

function deserializeTsInterfaceBody(pos) {
    return {
        type: "TsInterfaceBody",
        span: deserializeSpan(pos),
        body: deserializeVecTsTypeElement(pos + 12),
    };
}

function deserializeTsExpressionWithTypeArguments(pos) {
    return {
        type: "TsExpressionWithTypeArguments",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
        typeArguments: deserializeOptionTsTypeParameterInstantiation(pos + 16),
    };
}

function deserializeTsTypeAliasDeclaration(pos) {
    return {
        type: "TsTypeAliasDeclaration",
        span: deserializeSpan(pos),
        declare: deserializeBoolean(pos + 12),
        id: deserializeIdentifier(pos + 16),
        typeParams: deserializeOptionTsTypeParameterDeclaration(pos + 40),
        typeAnnotation: deserializeBoxTsType(pos + 64),
    };
}

function deserializeTsEnumDeclaration(pos) {
    return {
        type: "TsEnumDeclaration",
        span: deserializeSpan(pos),
        declare: deserializeBoolean(pos + 12),
        isConst: deserializeBoolean(pos + 13),
        id: deserializeIdentifier(pos + 16),
        members: deserializeVecTsEnumMember(pos + 40),
    };
}

function deserializeTsEnumMember(pos) {
    return {
        type: "TsEnumMember",
        span: deserializeSpan(pos),
        id: deserializeTsModuleName(pos + 12),
        init: deserializeOptionBoxExpression(pos + 48),
    };
}

function deserializeTsModuleName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeStringLiteral(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsModuleName");
    }
}

function deserializeTsModuleDeclaration(pos) {
    return {
        type: "TsModuleDeclaration",
        span: deserializeSpan(pos),
        declare: deserializeBoolean(pos + 12),
        global: deserializeBoolean(pos + 13),
        id: deserializeTsModuleName(pos + 16),
        body: deserializeOptionTsNamespaceBody(pos + 52),
    };
}

function deserializeTsNamespaceBody(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsModuleBlock(pos + 4);
        case 1:
            return deserializeTsNamespaceDeclaration(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsNamespaceBody");
    }
}

function deserializeTsModuleBlock(pos) {
    return {
        type: "TsModuleBlock",
        span: deserializeSpan(pos),
        body: deserializeVecModuleItem(pos + 12),
    };
}

function deserializeTsNamespaceDeclaration(pos) {
    return {
        type: "TsNamespaceDeclaration",
        span: deserializeSpan(pos),
        declare: deserializeBoolean(pos + 12),
        global: deserializeBoolean(pos + 13),
        id: deserializeIdentifier(pos + 16),
        body: deserializeBoxTsNamespaceBody(pos + 40),
    };
}

function deserializeTsModuleName(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeStringLiteral(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsModuleName");
    }
}

function deserializeTsImportEqualsDeclaration(pos) {
    return {
        type: "TsImportEqualsDeclaration",
        span: deserializeSpan(pos),
        declare: deserializeBoolean(pos + 12),
        isExport: deserializeBoolean(pos + 13),
        isTypeOnly: deserializeBoolean(pos + 14),
        id: deserializeIdentifier(pos + 16),
        moduleRef: deserializeTsModuleRef(pos + 40),
    };
}

function deserializeTsModuleRef(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsEntityName(pos + 4);
        case 1:
            return deserializeTsExternalModuleReference(pos + 4);
        default:
            throw new Error("Unexpected enum option ID for TsModuleRef");
    }
}

function deserializeTsExternalModuleReference(pos) {
    return {
        type: "TsExternalModuleReference",
        span: deserializeSpan(pos),
        expression: deserializeStringLiteral(pos + 12),
    };
}

function deserializeTsExportAssignment(pos) {
    return {
        type: "TsExportAssignment",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeTsNamespaceExportDeclaration(pos) {
    return {
        type: "TsNamespaceExportDeclaration",
        span: deserializeSpan(pos),
        id: deserializeIdentifier(pos + 12),
    };
}

function deserializeTsAsExpression(pos) {
    return {
        type: "TsAsExpression",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
        typeAnnotation: deserializeBoxTsType(pos + 16),
    };
}

function deserializeTsTypeAssertion(pos) {
    return {
        type: "TsTypeAssertion",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
        typeAnnotation: deserializeBoxTsType(pos + 16),
    };
}

function deserializeTsNonNullExpression(pos) {
    return {
        type: "TsNonNullExpression",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeAccessibility(pos) {
    switch (buff[pos]) {
        case 0:
            return "public";
        case 1:
            return "protected";
        case 2:
            return "private";
        default:
            throw new Error("Unexpected enum value ID for Accessibility");
    }
}

function deserializeTsConstAssertion(pos) {
    return {
        type: "TsConstAssertion",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
    };
}

function deserializeTsInstantiation(pos) {
    return {
        type: "TsInstantiation",
        span: deserializeSpan(pos),
        expression: deserializeBoxExpression(pos + 12),
        typeArguments: deserializeTsTypeParameterInstantiation(pos + 16),
    };
}

function deserializeJsWord(pos) {
    let len = buff[pos + 7];
    if (len === 0) {
        return "";
    }
    if (len === 1) {
        return String.fromCharCode(buff[pos]);
    }
    if (len & 128) {
        const pos32 = pos >>> 2;
        len = uint32[pos32];
        pos += int32[pos32 + 1];
        if (len > 24) return utf8Slice.call(buff, pos, pos + len);
    }
    const arr = new Array(len),
        end = pos + len;
    let arrPos = 0;
    do {
        const c = buff[pos];
        if (c >= 128) return utf8Slice.call(buff, pos - arrPos, end);
        arr[arrPos++] = c;
    } while (++pos < end);
    return String.fromCharCode(...arr);
}
const { utf8Slice } = Buffer.prototype;

function deserializeAsciiJsWord(pos) {
    let len = buff[pos + 7];
    if (len === 0) {
        return "";
    }
    if (len === 1) {
        return String.fromCharCode(buff[pos]);
    }
    if (len & 128) {
        const pos32 = pos >>> 2;
        len = uint32[pos32];
        pos += int32[pos32 + 1];
        if (len > 28) return asciiSlice.call(buff, pos, pos + len);
    }
    const arr = new Array(len),
        end = pos + len;
    let arrPos = 0;
    do {
        arr[arrPos++] = buff[pos];
    } while (++pos < end);
    return String.fromCharCode(...arr);
}
const { asciiSlice } = Buffer.prototype;

function deserializeOptionAsciiJsWord(pos) {
    return deserializeOption(pos, deserializeAsciiJsWord, 4);
}

function deserializeBoolean(pos) {
    return buff[pos] === 1;
}

function deserializeNumber(pos) {
    return float64[pos >>> 3];
}

function deserializeSpan(pos) {
    const pos32 = pos >>> 2;
    return {
        start: uint32[pos32],
        end: uint32[pos32 + 1],
        ctxt: uint32[pos32 + 2],
    };
}

function deserializeVecModuleItem(pos) {
    return deserializeVec(pos, deserializeModuleItem, 156);
}

function deserializeVecImportSpecifier(pos) {
    return deserializeVec(pos, deserializeImportSpecifier, 84);
}

function deserializeOptionTsModuleName(pos) {
    return deserializeOption(pos, deserializeTsModuleName, 4);
}

function deserializeOptionJsWord(pos) {
    return deserializeOption(pos, deserializeJsWord, 4);
}

function deserializeOptionObjectExpression(pos) {
    return deserializeOption(pos, deserializeObjectExpression, 4);
}

function deserializeVecSpreadElementOrBoxObjectProperty(pos) {
    return deserializeVec(pos, deserializeSpreadElementOrBoxObjectProperty, 20);
}

function deserializeSpreadElementOrBoxObjectProperty(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeSpreadElement(pos + 4);
        case 1:
            return deserializeBoxObjectProperty(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for SpreadElementOrBoxObjectProperty"
            );
    }
}

function deserializeBoxExpression(pos) {
    return deserializeBox(pos, deserializeExpression);
}

function deserializeVecOptionExpressionOrSpread(pos) {
    return deserializeVec(pos, deserializeOptionExpressionOrSpread, 24);
}

function deserializeOptionExpressionOrSpread(pos) {
    return deserializeOption(pos, deserializeExpressionOrSpread, 4);
}

function deserializeOptionSpan(pos) {
    return deserializeOption(pos, deserializeSpan, 4);
}

function deserializeOptionIdentifier(pos) {
    return deserializeOption(pos, deserializeIdentifier, 4);
}

function deserializeVecParameter(pos) {
    return deserializeVec(pos, deserializeParameter, 72);
}

function deserializeVecDecorator(pos) {
    return deserializeVec(pos, deserializeDecorator, 16);
}

function deserializeOptionTsTypeAnnotation(pos) {
    return deserializeOption(pos, deserializeTsTypeAnnotation, 4);
}

function deserializeBoxTsType(pos) {
    return deserializeBox(pos, deserializeTsType);
}

function deserializeVecTsFnParam(pos) {
    return deserializeVec(pos, deserializeTsFnParam, 52);
}

function deserializeVecOptionPattern(pos) {
    return deserializeVec(pos, deserializeOptionPattern, 56);
}

function deserializeOptionPattern(pos) {
    return deserializeOption(pos, deserializePattern, 4);
}

function deserializeBoxPattern(pos) {
    return deserializeBox(pos, deserializePattern);
}

function deserializeVecObjectPatternProperty(pos) {
    return deserializeVec(pos, deserializeObjectPatternProperty, 64);
}

function deserializeOptionBoxExpression(pos) {
    return deserializeOption(pos, deserializeBoxExpression, 4);
}

function deserializeOptionTsTypeParameterDeclaration(pos) {
    return deserializeOption(pos, deserializeTsTypeParameterDeclaration, 4);
}

function deserializeVecTsTypeParameter(pos) {
    return deserializeVec(pos, deserializeTsTypeParameter, 56);
}

function deserializeOptionBoxTsType(pos) {
    return deserializeOption(pos, deserializeBoxTsType, 4);
}

function deserializeBoxTsQualifiedName(pos) {
    return deserializeBox(pos, deserializeTsQualifiedName);
}

function deserializeOptionTsTypeParameterInstantiation(pos) {
    return deserializeOption(pos, deserializeTsTypeParameterInstantiation, 4);
}

function deserializeVecBoxTsType(pos) {
    return deserializeVec(pos, deserializeBoxTsType, 4);
}

function deserializeOptionTsEntityName(pos) {
    return deserializeOption(pos, deserializeTsEntityName, 4);
}

function deserializeVecTsTypeElement(pos) {
    return deserializeVec(pos, deserializeTsTypeElement, 88);
}

function deserializeVecTsTupleElement(pos) {
    return deserializeVec(pos, deserializeTsTupleElement, 216);
}

function deserializeOptionTruePlusMinus(pos) {
    return deserializeOption(pos, deserializeTruePlusMinus, 4);
}

function deserializeVecTemplateElement(pos) {
    return deserializeVec(pos, deserializeTemplateElement, 36);
}

function deserializeOptionBlockStatement(pos) {
    return deserializeOption(pos, deserializeBlockStatement, 4);
}

function deserializeVecStatement(pos) {
    return deserializeVec(pos, deserializeStatement, 152);
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

function deserializeOptionVariableDeclarationOrBoxExpression(pos) {
    return deserializeOption(
        pos,
        deserializeVariableDeclarationOrBoxExpression,
        4
    );
}

function deserializeVariableDeclarationOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeVariableDeclaration(pos + 4);
        case 1:
            return deserializeBoxExpression(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for VariableDeclarationOrBoxExpression"
            );
    }
}

function deserializeVecVariableDeclarator(pos) {
    return deserializeVec(pos, deserializeVariableDeclarator, 76);
}

function deserializeVariableDeclarationOrPattern(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeVariableDeclaration(pos + 4);
        case 1:
            return deserializePattern(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for VariableDeclarationOrPattern"
            );
    }
}

function deserializeVecClassMember(pos) {
    return deserializeVec(pos, deserializeClassMember, 192);
}

function deserializeVecTsParameterPropertyOrParameter(pos) {
    return deserializeVec(pos, deserializeTsParameterPropertyOrParameter, 84);
}

function deserializeTsParameterPropertyOrParameter(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeTsParameterProperty(pos + 4);
        case 1:
            return deserializeParameter(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for TsParameterPropertyOrParameter"
            );
    }
}

function deserializeOptionAccessibility(pos) {
    return deserializeOption(pos, deserializeAccessibility, 4);
}

function deserializeVecTsExpressionWithTypeArguments(pos) {
    return deserializeVec(pos, deserializeTsExpressionWithTypeArguments, 40);
}

function deserializeVecTsEnumMember(pos) {
    return deserializeVec(pos, deserializeTsEnumMember, 56);
}

function deserializeOptionTsNamespaceBody(pos) {
    return deserializeOption(pos, deserializeTsNamespaceBody, 4);
}

function deserializeBoxTsNamespaceBody(pos) {
    return deserializeBox(pos, deserializeTsNamespaceBody);
}

function deserializeIdentifierOrPrivateNameOrComputed(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializePrivateName(pos + 4);
        case 2:
            return deserializeComputed(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for IdentifierOrPrivateNameOrComputed"
            );
    }
}

function deserializeIdentifierOrComputed(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeIdentifier(pos + 4);
        case 1:
            return deserializeComputed(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for IdentifierOrComputed"
            );
    }
}

function deserializeSuperOrImportOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeSuper(pos + 4);
        case 1:
            return deserializeImport(pos + 4);
        case 2:
            return deserializeBoxExpression(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for SuperOrImportOrBoxExpression"
            );
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

function deserializeVecPattern(pos) {
    return deserializeVec(pos, deserializePattern, 52);
}

function deserializeBlockStatementOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeBlockStatement(pos + 4);
        case 1:
            return deserializeBoxExpression(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for BlockStatementOrBoxExpression"
            );
    }
}

function deserializeBoxJSXMemberExpression(pos) {
    return deserializeBox(pos, deserializeJSXMemberExpression);
}

function deserializeBoxJSXElement(pos) {
    return deserializeBox(pos, deserializeJSXElement);
}

function deserializeVecJSXAttributeOrSpreadElement(pos) {
    return deserializeVec(pos, deserializeJSXAttributeOrSpreadElement, 136);
}

function deserializeJSXAttributeOrSpreadElement(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeJSXAttribute(pos + 8);
        case 1:
            return deserializeSpreadElement(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for JSXAttributeOrSpreadElement"
            );
    }
}

function deserializeOptionJSXAttributeValue(pos) {
    return deserializeOption(pos, deserializeJSXAttributeValue, 8);
}

function deserializeVecJSXElementChild(pos) {
    return deserializeVec(pos, deserializeJSXElementChild, 48);
}

function deserializeOptionJSXClosingElement(pos) {
    return deserializeOption(pos, deserializeJSXClosingElement, 4);
}

function deserializeMemberExpressionOrOptionalChainingCall(pos) {
    switch (buff[pos]) {
        case 0:
            return deserializeMemberExpression(pos + 4);
        case 1:
            return deserializeOptionalChainingCall(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for MemberExpressionOrOptionalChainingCall"
            );
    }
}

function deserializeBoxObjectProperty(pos) {
    return deserializeBox(pos, deserializeObjectProperty);
}

function deserializeVecExportSpecifier(pos) {
    return deserializeVec(pos, deserializeExportSpecifier, 96);
}

function deserializeOptionStringLiteral(pos) {
    return deserializeOption(pos, deserializeStringLiteral, 4);
}

function deserializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(
    pos
) {
    switch (buff[pos]) {
        case 0:
            return deserializeClassExpression(pos + 4);
        case 1:
            return deserializeFunctionExpression(pos + 4);
        case 2:
            return deserializeTsInterfaceDeclaration(pos + 4);
        default:
            throw new Error(
                "Unexpected enum option ID for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration"
            );
    }
}

function deserialize(buffIn) {
    const arrayBuffer = buffIn.buffer;
    buff = buffIn.byteOffset === 0 ? buffIn : new Uint8Array(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer, 0, arrayBuffer.byteLength >>> 3);
    const ast = deserializeProgram(buffIn.byteOffset + buffIn.length - 36);
    buff = int32 = uint32 = float64 = undefined;
    return ast;
}

function deserializeOption(pos, deserialize, offset) {
    switch (buff[pos]) {
        case 0:
            return null;
        case 1:
            return deserialize(pos + offset);
        default:
            throw new Error("Unexpected option value");
    }
}

function deserializeBox(pos, deserialize) {
    return deserialize(pos + int32[pos >>> 2]);
}

function deserializeVec(pos, deserialize, length) {
    const pos32 = pos >>> 2;
    const numEntries = uint32[pos32 + 1];
    if (numEntries === 0) return [];
    const entries = new Array(numEntries);
    pos += int32[pos32];
    for (let i = 0; i < numEntries; i++) {
        entries[i] = deserialize(pos);
        pos += length;
    }
    return entries;
}

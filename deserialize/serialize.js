// Generated code. Do not edit.

"use strict";

module.exports = serialize;

let buffPos, buffLen, buff, uint32, int32, float64;

resetBuffer();

function serializeProgram(node, pos) {
    switch (node.type) {
        case "Module":
            return serializeEnum(node, pos, 0, serializeModule, 4);
        case "Script":
            return serializeEnum(node, pos, 1, serializeScript, 4);
        default:
            throw new Error("Unexpected enum option type for Program");
    }
}

function serializeModule(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecModuleItem(node.body, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionJsWord(node.interpreter, pos + 8) + bufferGrownByBytes
    );
}

function serializeScript(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecStatement(node.body, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionJsWord(node.interpreter, pos + 8) + bufferGrownByBytes
    );
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
            return serializeEnum(node, pos, 0, serializeModuleDeclaration, 4);
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
            return serializeEnum(node, pos, 1, serializeStatement, 4);
        default:
            throw new Error("Unexpected enum option type for ModuleItem");
    }
}

function serializeModuleDeclaration(node, pos) {
    switch (node.type) {
        case "ImportDeclaration":
            return serializeEnum(node, pos, 0, serializeImportDeclaration, 4);
        case "ExportDeclaration":
            return serializeEnum(node, pos, 1, serializeExportDeclaration, 4);
        case "ExportNamedDeclaration":
            return serializeEnum(
                node,
                pos,
                2,
                serializeExportNamedDeclaration,
                4
            );
        case "ExportDefaultDeclaration":
            return serializeEnum(
                node,
                pos,
                3,
                serializeExportDefaultDeclaration,
                4
            );
        case "ExportDefaultExpression":
            return serializeEnum(
                node,
                pos,
                4,
                serializeExportDefaultExpression,
                4
            );
        case "ExportAllDeclaration":
            return serializeEnum(
                node,
                pos,
                5,
                serializeExportAllDeclaration,
                4
            );
        case "TsImportEqualsDeclaration":
            return serializeEnum(
                node,
                pos,
                6,
                serializeTsImportEqualsDeclaration,
                4
            );
        case "TsExportAssignment":
            return serializeEnum(node, pos, 7, serializeTsExportAssignment, 4);
        case "TsNamespaceExportDeclaration":
            return serializeEnum(
                node,
                pos,
                8,
                serializeTsNamespaceExportDeclaration,
                4
            );
        default:
            throw new Error(
                "Unexpected enum option type for ModuleDeclaration"
            );
    }
}

function serializeImportDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecImportSpecifier(
        node.specifiers,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeStringLiteral(
        node.source,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.typeOnly, (pos += 32));
    return (
        serializeOptionObjectExpression(node.asserts, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeImportSpecifier(node, pos) {
    switch (node.type) {
        case "ImportSpecifier":
            return serializeEnum(
                node,
                pos,
                0,
                serializeImportNamedSpecifier,
                4
            );
        case "ImportDefaultSpecifier":
            return serializeEnum(
                node,
                pos,
                1,
                serializeImportDefaultSpecifier,
                4
            );
        case "ImportNamespaceSpecifier":
            return serializeEnum(
                node,
                pos,
                2,
                serializeImportNamespaceSpecifier,
                4
            );
        default:
            throw new Error("Unexpected enum option type for ImportSpecifier");
    }
}

function serializeImportNamedSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeIdentifier(node.local, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const thisBufferGrownByBytes = serializeOptionTsModuleName(
        node.imported,
        (pos += 24)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isTypeOnly, pos + 40);
    return bufferGrownByBytes;
}

function serializeImportDefaultSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    return serializeIdentifier(node.local, pos + 12);
}

function serializeImportNamespaceSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    return serializeIdentifier(node.local, pos + 12);
}

function serializeExportDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    return serializeDeclaration(node.declaration, pos + 12);
}

function serializeExportNamedDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecExportSpecifier(
        node.specifiers,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionStringLiteral(
        node.source,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.typeOnly, (pos += 36));
    return (
        serializeOptionObjectExpression(node.asserts, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeExportSpecifier(node, pos) {
    switch (node.type) {
        case "ExportNamespaceSpecifier":
            return serializeEnum(
                node,
                pos,
                0,
                serializeExportNamespaceSpecifier,
                4
            );
        case "ExportDefaultSpecifier":
            return serializeEnum(
                node,
                pos,
                1,
                serializeExportDefaultSpecifier,
                4
            );
        case "ExportSpecifier":
            return serializeEnum(
                node,
                pos,
                2,
                serializeExportNamedSpecifier,
                4
            );
        default:
            throw new Error("Unexpected enum option type for ExportSpecifier");
    }
}

function serializeExportNamespaceSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    return serializeTsModuleName(node.name, pos + 12);
}

function serializeExportDefaultSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    return serializeIdentifier(node.exported, pos + 12);
}

function serializeExportNamedSpecifier(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeTsModuleName(node.orig, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const thisBufferGrownByBytes = serializeOptionTsModuleName(
        node.exported,
        (pos += 36)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isTypeOnly, pos + 40);
    return bufferGrownByBytes;
}

function serializeExportDefaultDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    return serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(
        node.decl,
        pos + 12
    );
}

function serializeExportDefaultExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeExportAllDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeStringLiteral(node.source, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionObjectExpression(node.asserts, pos + 32) +
        bufferGrownByBytes
    );
}

function serializeTsModuleName(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "StringLiteral":
            return serializeEnum(node, pos, 1, serializeStringLiteral, 4);
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
}

function serializeStatement(node, pos) {
    switch (node.type) {
        case "BlockStatement":
            return serializeEnum(node, pos, 0, serializeBlockStatement, 4);
        case "EmptyStatement":
            return serializeEnum(node, pos, 1, serializeEmptyStatement, 4);
        case "DebuggerStatement":
            return serializeEnum(node, pos, 2, serializeDebuggerStatement, 4);
        case "WithStatement":
            return serializeEnum(node, pos, 3, serializeWithStatement, 4);
        case "ReturnStatement":
            return serializeEnum(node, pos, 4, serializeReturnStatement, 4);
        case "LabeledStatement":
            return serializeEnum(node, pos, 5, serializeLabeledStatement, 4);
        case "BreakStatement":
            return serializeEnum(node, pos, 6, serializeBreakStatement, 4);
        case "ContinueStatement":
            return serializeEnum(node, pos, 7, serializeContinueStatement, 4);
        case "IfStatement":
            return serializeEnum(node, pos, 8, serializeIfStatement, 4);
        case "SwitchStatement":
            return serializeEnum(node, pos, 9, serializeSwitchStatement, 4);
        case "ThrowStatement":
            return serializeEnum(node, pos, 10, serializeThrowStatement, 4);
        case "TryStatement":
            return serializeEnum(node, pos, 11, serializeTryStatement, 4);
        case "WhileStatement":
            return serializeEnum(node, pos, 12, serializeWhileStatement, 4);
        case "DoWhileStatement":
            return serializeEnum(node, pos, 13, serializeDoWhileStatement, 4);
        case "ForStatement":
            return serializeEnum(node, pos, 14, serializeForStatement, 4);
        case "ForInStatement":
            return serializeEnum(node, pos, 15, serializeForInStatement, 4);
        case "ForOfStatement":
            return serializeEnum(node, pos, 16, serializeForOfStatement, 4);
        case "ClassDeclaration":
        case "FunctionDeclaration":
        case "VariableDeclaration":
        case "TsInterfaceDeclaration":
        case "TsTypeAliasDeclaration":
        case "TsEnumDeclaration":
        case "TsModuleDeclaration":
            return serializeEnum(node, pos, 17, serializeDeclaration, 4);
        case "ExpressionStatement":
            return serializeEnum(
                node,
                pos,
                18,
                serializeExpressionStatement,
                4
            );
        default:
            throw new Error("Unexpected enum option type for Statement");
    }
}

function serializeBlockStatement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecStatement(node.stmts, pos + 12);
}

function serializeEmptyStatement(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeDebuggerStatement(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeWithStatement(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(node.object, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxStatement(node.body, pos + 4) + bufferGrownByBytes;
}

function serializeReturnStatement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeOptionBoxExpression(node.argument, pos + 12);
}

function serializeLabeledStatement(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeIdentifier(node.label, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxStatement(node.body, pos + 24) + bufferGrownByBytes;
}

function serializeBreakStatement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeOptionIdentifier(node.label, pos + 12);
}

function serializeContinueStatement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeOptionIdentifier(node.label, pos + 12);
}

function serializeIfStatement(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxExpression(node.test, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBoxStatement(
        node.consequent,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionBoxStatement(node.alternate, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeSwitchStatement(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(
        node.discriminant,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeVecSwitchCase(node.cases, pos + 4) + bufferGrownByBytes;
}

function serializeSwitchCase(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeOptionBoxExpression(
        node.test,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeVecStatement(node.consequent, pos + 8) + bufferGrownByBytes;
}

function serializeThrowStatement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.argument, pos + 12);
}

function serializeTryStatement(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBlockStatement(node.block, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionCatchClause(
        node.handler,
        (pos += 20)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionBlockStatement(node.finalizer, pos + 92) +
        bufferGrownByBytes
    );
}

function serializeCatchClause(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeOptionPattern(node.param, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBlockStatement(node.body, pos + 56) + bufferGrownByBytes;
}

function serializeWhileStatement(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(node.test, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxStatement(node.body, pos + 4) + bufferGrownByBytes;
}

function serializeDoWhileStatement(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(node.test, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxStatement(node.body, pos + 4) + bufferGrownByBytes;
}

function serializeForStatement(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeOptionVariableDeclarationOrBoxExpression(
        node.init,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.test,
        (pos += 36)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.update,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeBoxStatement(node.body, pos + 8) + bufferGrownByBytes;
}

function serializeForInStatement(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVariableDeclarationOrPattern(
        node.left,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBoxExpression(
        node.right,
        (pos += 56)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeBoxStatement(node.body, pos + 4) + bufferGrownByBytes;
}

function serializeForOfStatement(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionSpan(node.await, (pos += 12));
    let bufferGrownByBytes = serializeVariableDeclarationOrPattern(
        node.left,
        (pos += 16)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBoxExpression(
        node.right,
        (pos += 56)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeBoxStatement(node.body, pos + 4) + bufferGrownByBytes;
}

function serializeExpressionStatement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeDeclaration(node, pos) {
    switch (node.type) {
        case "ClassDeclaration":
            return serializeEnum(node, pos, 0, serializeClassDeclaration, 4);
        case "FunctionDeclaration":
            return serializeEnum(node, pos, 1, serializeFunctionDeclaration, 4);
        case "VariableDeclaration":
            return serializeEnum(node, pos, 2, serializeVariableDeclaration, 4);
        case "TsInterfaceDeclaration":
            return serializeEnum(
                node,
                pos,
                3,
                serializeTsInterfaceDeclaration,
                4
            );
        case "TsTypeAliasDeclaration":
            return serializeEnum(
                node,
                pos,
                4,
                serializeTsTypeAliasDeclaration,
                4
            );
        case "TsEnumDeclaration":
            return serializeEnum(node, pos, 5, serializeTsEnumDeclaration, 4);
        case "TsModuleDeclaration":
            return serializeEnum(node, pos, 6, serializeTsModuleDeclaration, 4);
        default:
            throw new Error("Unexpected enum option type for Declaration");
    }
}

function serializeVariableDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeVariableDeclarationKind(node.kind, (pos += 12));
    serializeBoolean(node.declare, (pos += 4));
    return serializeVecVariableDeclarator(node.declarations, pos + 4);
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
    return 0;
}

function serializeVariableDeclarator(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePattern(node.id, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.init,
        (pos += 52)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.definite, pos + 8);
    return bufferGrownByBytes;
}

function serializeFunctionDeclaration(node, pos) {
    let bufferGrownByBytes = serializeIdentifier(node.identifier, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.declare, (pos += 24));
    let thisBufferGrownByBytes = serializeVecParameter(node.params, (pos += 4));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecDecorator(node.decorators, (pos += 8));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeSpan(node.span, (pos += 8));
    thisBufferGrownByBytes = serializeOptionBlockStatement(
        node.body,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.generator, (pos += 24));
    serializeBoolean(node.async, (pos += 1));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParameters,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeAnnotation(node.returnType, pos + 24) +
        bufferGrownByBytes
    );
}

function serializeFunctionExpression(node, pos) {
    let bufferGrownByBytes = serializeOptionIdentifier(node.identifier, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecParameter(
        node.params,
        (pos += 28)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecDecorator(node.decorators, (pos += 8));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeSpan(node.span, (pos += 8));
    thisBufferGrownByBytes = serializeOptionBlockStatement(
        node.body,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.generator, (pos += 24));
    serializeBoolean(node.async, (pos += 1));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParameters,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeAnnotation(node.returnType, pos + 24) +
        bufferGrownByBytes
    );
}

function serializeArrowFunctionExpression(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecPattern(node.params, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBlockStatementOrBoxExpression(
        node.body,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.async, (pos += 24));
    serializeBoolean(node.generator, (pos += 1));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParameters,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeAnnotation(node.returnType, pos + 24) +
        bufferGrownByBytes
    );
}

function serializeParameter(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecDecorator(
        node.decorators,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializePattern(node.pat, pos + 8) + bufferGrownByBytes;
}

function serializeDecorator(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeClassDeclaration(node, pos) {
    let bufferGrownByBytes = serializeIdentifier(node.identifier, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.declare, (pos += 24));
    serializeSpan(node.span, (pos += 4));
    let thisBufferGrownByBytes = serializeVecDecorator(
        node.decorators,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecClassMember(node.body, (pos += 8));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.superClass,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isAbstract, (pos += 8));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParams,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionTsTypeParameterInstantiation(
        node.superTypeParams,
        (pos += 24)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeVecTsExpressionWithTypeArguments(node.implements, pos + 24) +
        bufferGrownByBytes
    );
}

function serializeClassExpression(node, pos) {
    let bufferGrownByBytes = serializeOptionIdentifier(node.identifier, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeSpan(node.span, (pos += 28));
    let thisBufferGrownByBytes = serializeVecDecorator(
        node.decorators,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecClassMember(node.body, (pos += 8));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.superClass,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isAbstract, (pos += 8));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParams,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionTsTypeParameterInstantiation(
        node.superTypeParams,
        (pos += 24)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeVecTsExpressionWithTypeArguments(node.implements, pos + 24) +
        bufferGrownByBytes
    );
}

function serializeClassMember(node, pos) {
    switch (node.type) {
        case "Constructor":
            return serializeEnum(node, pos, 0, serializeConstructor, 8);
        case "ClassMethod":
            return serializeEnum(node, pos, 1, serializeClassMethod, 8);
        case "PrivateMethod":
            return serializeEnum(node, pos, 2, serializePrivateMethod, 4);
        case "ClassProperty":
            return serializeEnum(node, pos, 3, serializeClassProperty, 8);
        case "PrivateProperty":
            return serializeEnum(node, pos, 4, serializePrivateProperty, 4);
        case "TsIndexSignature":
            return serializeEnum(node, pos, 5, serializeTsIndexSignature, 4);
        case "EmptyStatement":
            return serializeEnum(node, pos, 6, serializeEmptyStatement, 4);
        case "StaticBlock":
            return serializeEnum(node, pos, 7, serializeStaticBlock, 4);
        default:
            throw new Error("Unexpected enum option type for ClassMember");
    }
}

function serializeConstructor(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePropertyName(node.key, (pos += 16));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecTsParameterPropertyOrParameter(
        node.params,
        (pos += 48)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionBlockStatement(
        node.body,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeOptionAccessibility(node.accessibility, (pos += 24));
    serializeBoolean(node.isOptional, pos + 8);
    return bufferGrownByBytes;
}

function serializeClassMethod(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePropertyName(node.key, (pos += 16));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const thisBufferGrownByBytes = serializeFunction(
        node.function,
        (pos += 48)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeMethodKind(node.kind, (pos += 100));
    serializeBoolean(node.isStatic, (pos += 4));
    serializeOptionAccessibility(node.accessibility, (pos += 4));
    serializeBoolean(node.isAbstract, (pos += 8));
    serializeBoolean(node.isOptional, (pos += 1));
    serializeBoolean(node.isOverride, pos + 1);
    return bufferGrownByBytes;
}

function serializePrivateMethod(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePrivateName(node.key, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const thisBufferGrownByBytes = serializeFunction(
        node.function,
        (pos += 36)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeMethodKind(node.kind, (pos += 100));
    serializeBoolean(node.isStatic, (pos += 4));
    serializeOptionAccessibility(node.accessibility, (pos += 4));
    serializeBoolean(node.isAbstract, (pos += 8));
    serializeBoolean(node.isOptional, (pos += 1));
    serializeBoolean(node.isOverride, pos + 1);
    return bufferGrownByBytes;
}

function serializeClassProperty(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePropertyName(node.key, (pos += 16));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.value,
        (pos += 48)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isStatic, (pos += 20));
    thisBufferGrownByBytes = serializeVecDecorator(node.decorators, (pos += 4));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeOptionAccessibility(node.accessibility, (pos += 8));
    serializeBoolean(node.isAbstract, (pos += 8));
    serializeBoolean(node.isOptional, (pos += 1));
    serializeBoolean(node.isOverride, (pos += 1));
    serializeBoolean(node.readonly, (pos += 1));
    serializeBoolean(node.declare, (pos += 1));
    serializeBoolean(node.definite, pos + 1);
    return bufferGrownByBytes;
}

function serializePrivateProperty(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePrivateName(node.key, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.value,
        (pos += 36)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isStatic, (pos += 20));
    thisBufferGrownByBytes = serializeVecDecorator(node.decorators, (pos += 4));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeOptionAccessibility(node.accessibility, (pos += 8));
    serializeBoolean(node.isOptional, (pos += 8));
    serializeBoolean(node.isOverride, (pos += 1));
    serializeBoolean(node.readonly, (pos += 1));
    serializeBoolean(node.definite, pos + 1);
    return bufferGrownByBytes;
}

function serializeStaticBlock(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBlockStatement(node.body, pos + 12);
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
    return 0;
}

function serializeFunction(node, pos) {
    let bufferGrownByBytes = serializeVecParameter(node.params, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecDecorator(
        node.decorators,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeSpan(node.span, (pos += 8));
    thisBufferGrownByBytes = serializeOptionBlockStatement(
        node.body,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.generator, (pos += 24));
    serializeBoolean(node.async, (pos += 1));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParameters,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeAnnotation(node.returnType, pos + 24) +
        bufferGrownByBytes
    );
}

function serializePattern(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeBindingIdentifier, 4);
        case "ArrayPattern":
            return serializeEnum(node, pos, 1, serializeArrayPattern, 4);
        case "RestElement":
            return serializeEnum(node, pos, 2, serializeRestElement, 4);
        case "ObjectPattern":
            return serializeEnum(node, pos, 3, serializeObjectPattern, 4);
        case "AssignmentPattern":
            return serializeEnum(node, pos, 4, serializeAssignmentPattern, 4);
        case "Invalid":
            return serializeEnum(node, pos, 5, serializeInvalid, 4);
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
            return serializeEnum(node, pos, 6, serializeBoxExpression, 4);
        default:
            throw new Error("Unexpected enum option type for Pattern");
    }
}

function serializeBindingIdentifier(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeJsWord(node.value, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.optional, (pos += 8));
    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeArrayPattern(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecOptionPattern(
        node.elements,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.optional, (pos += 8));
    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeRestElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeSpan(node.rest, (pos += 12));
    const bufferGrownByBytes = serializeBoxPattern(node.argument, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeObjectPattern(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecObjectPatternProperty(
        node.properties,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.optional, (pos += 8));
    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeObjectPatternProperty(node, pos) {
    switch (node.type) {
        case "KeyValuePatternProperty":
            return serializeEnum(
                node,
                pos,
                0,
                serializeKeyValuePatternProperty,
                8
            );
        case "AssignmentPatternProperty":
            return serializeEnum(
                node,
                pos,
                1,
                serializeAssignmentPatternProperty,
                4
            );
        case "RestElement":
            return serializeEnum(node, pos, 2, serializeRestElement, 4);
        default:
            throw new Error(
                "Unexpected enum option type for ObjectPatternProperty"
            );
    }
}

function serializeKeyValuePatternProperty(node, pos) {
    const bufferGrownByBytes = serializePropertyName(node.key, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxPattern(node.value, pos + 48) + bufferGrownByBytes;
}

function serializeAssignmentPatternProperty(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeIdentifier(node.key, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionBoxExpression(node.value, pos + 24) + bufferGrownByBytes
    );
}

function serializeAssignmentPattern(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxPattern(node.left, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBoxExpression(node.right, (pos += 4));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeExpression(node, pos) {
    switch (node.type) {
        case "ThisExpression":
            return serializeEnum(node, pos, 0, serializeThisExpression, 4);
        case "ArrayExpression":
            return serializeEnum(node, pos, 1, serializeArrayExpression, 4);
        case "ObjectExpression":
            return serializeEnum(node, pos, 2, serializeObjectExpression, 4);
        case "FunctionExpression":
            return serializeEnum(node, pos, 3, serializeFunctionExpression, 4);
        case "UnaryExpression":
            return serializeEnum(node, pos, 4, serializeUnaryExpression, 4);
        case "UpdateExpression":
            return serializeEnum(node, pos, 5, serializeUpdateExpression, 4);
        case "BinaryExpression":
            return serializeEnum(node, pos, 6, serializeBinaryExpression, 4);
        case "AssignmentExpression":
            return serializeEnum(
                node,
                pos,
                7,
                serializeAssignmentExpression,
                4
            );
        case "MemberExpression":
            return serializeEnum(node, pos, 8, serializeMemberExpression, 4);
        case "SuperPropExpression":
            return serializeEnum(node, pos, 9, serializeSuperPropExpression, 4);
        case "ConditionalExpression":
            return serializeEnum(
                node,
                pos,
                10,
                serializeConditionalExpression,
                4
            );
        case "CallExpression":
            return serializeEnum(node, pos, 11, serializeCallExpression, 4);
        case "NewExpression":
            return serializeEnum(node, pos, 12, serializeNewExpression, 4);
        case "SequenceExpression":
            return serializeEnum(node, pos, 13, serializeSequenceExpression, 4);
        case "Identifier":
            return serializeEnum(node, pos, 14, serializeIdentifier, 4);
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
            return serializeEnum(node, pos, 15, serializeLiteral, 8);
        case "TemplateLiteral":
            return serializeEnum(node, pos, 16, serializeTemplateLiteral, 4);
        case "TaggedTemplateExpression":
            return serializeEnum(
                node,
                pos,
                17,
                serializeTaggedTemplateExpression,
                4
            );
        case "ArrowFunctionExpression":
            return serializeEnum(
                node,
                pos,
                18,
                serializeArrowFunctionExpression,
                4
            );
        case "ClassExpression":
            return serializeEnum(node, pos, 19, serializeClassExpression, 4);
        case "YieldExpression":
            return serializeEnum(node, pos, 20, serializeYieldExpression, 4);
        case "MetaProperty":
            return serializeEnum(node, pos, 21, serializeMetaProperty, 4);
        case "AwaitExpression":
            return serializeEnum(node, pos, 22, serializeAwaitExpression, 4);
        case "ParenthesisExpression":
            return serializeEnum(
                node,
                pos,
                23,
                serializeParenthesisExpression,
                4
            );
        case "JSXMemberExpression":
            return serializeEnum(
                node,
                pos,
                24,
                serializeJSXMemberExpression,
                4
            );
        case "JSXNamespacedName":
            return serializeEnum(node, pos, 25, serializeJSXNamespacedName, 4);
        case "JSXEmptyExpression":
            return serializeEnum(node, pos, 26, serializeJSXEmptyExpression, 4);
        case "JSXElement":
            return serializeEnum(node, pos, 27, serializeBoxJSXElement, 4);
        case "JSXFragment":
            return serializeEnum(node, pos, 28, serializeJSXFragment, 4);
        case "TsTypeAssertion":
            return serializeEnum(node, pos, 29, serializeTsTypeAssertion, 4);
        case "TsConstAssertion":
            return serializeEnum(node, pos, 30, serializeTsConstAssertion, 4);
        case "TsNonNullExpression":
            return serializeEnum(
                node,
                pos,
                31,
                serializeTsNonNullExpression,
                4
            );
        case "TsAsExpression":
            return serializeEnum(node, pos, 32, serializeTsAsExpression, 4);
        case "TsInstantiation":
            return serializeEnum(node, pos, 33, serializeTsInstantiation, 4);
        case "PrivateName":
            return serializeEnum(node, pos, 34, serializePrivateName, 4);
        case "OptionalChainingExpression":
            return serializeEnum(
                node,
                pos,
                35,
                serializeOptionalChainingExpression,
                4
            );
        case "Invalid":
            return serializeEnum(node, pos, 36, serializeInvalid, 4);
        default:
            throw new Error("Unexpected enum option type for Expression");
    }
}

function serializeThisExpression(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeArrayExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecOptionExpressionOrSpread(node.elements, pos + 12);
}

function serializeUnaryExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeUnaryOperator(node.operator, (pos += 12));
    return serializeBoxExpression(node.argument, pos + 4);
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
    return 0;
}

function serializeUpdateExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeUpdateOperator(node.operator, (pos += 12));
    serializeBoolean(node.prefix, (pos += 4));
    return serializeBoxExpression(node.argument, pos + 4);
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
    return 0;
}

function serializeBinaryExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeBinaryOperator(node.operator, (pos += 12));
    const bufferGrownByBytes = serializeBoxExpression(node.left, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxExpression(node.right, pos + 4) + bufferGrownByBytes;
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
    return 0;
}

function serializeAssignmentExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeAssignmentOperator(node.operator, (pos += 12));
    const bufferGrownByBytes =
        node.operator === "="
            ? serializeAssignmentLeftEquals(node.left, (pos += 4))
            : serializeAssignmentLeft(node.left, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxExpression(node.right, pos + 8) + bufferGrownByBytes;
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
            return serializeEnum(node, pos, 0, serializeBoxExpression, 4);
        case "ArrayPattern":
        case "RestElement":
        case "ObjectPattern":
        case "AssignmentPattern":
            return serializeEnum(node, pos, 1, serializeBoxPattern, 4);
        default:
            throw new Error("Unexpected enum option type for AssignmentLeft");
    }
}

function serializeAssignmentLeftEquals(node, pos) {
    uint32[pos >>> 2] = 1;
    return serializeBoxPattern(node, pos + 4);
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
    return 0;
}

function serializeMemberExpression(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(node.object, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeIdentifierOrPrivateNameOrComputed(node.property, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeSuperPropExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeSuper(node.obj, (pos += 12));
    return serializeIdentifierOrComputed(node.property, pos + 12);
}

function serializeConditionalExpression(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxExpression(node.test, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBoxExpression(
        node.consequent,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeBoxExpression(node.alternate, pos + 4) + bufferGrownByBytes;
}

function serializeCallExpression(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeSuperOrImportOrBoxExpression(
        node.callee,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecExpressionOrSpread(
        node.arguments,
        (pos += 16)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 8
        ) + bufferGrownByBytes
    );
}

function serializeNewExpression(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxExpression(node.callee, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionVecExpressionOrSpread(
        node.arguments,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 12
        ) + bufferGrownByBytes
    );
}

function serializeSequenceExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecBoxExpression(node.expressions, pos + 12);
}

function serializeIdentifier(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeJsWord(node.value, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.optional, pos + 8);
    return bufferGrownByBytes;
}

function serializeTemplateLiteral(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecBoxExpression(
        node.expressions,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeVecTemplateElement(node.quasis, pos + 8) + bufferGrownByBytes
    );
}

function serializeTemplateElement(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.tail, (pos += 12));
    const bufferGrownByBytes = serializeOptionJsWord(node.cooked, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeJsWord(node.raw, pos + 12) + bufferGrownByBytes;
}

function serializeTaggedTemplateExpression(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxExpression(node.tag, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeParameterInstantiation(
        node.typeParameters,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeTemplateLiteral(node.template, pos + 24) + bufferGrownByBytes
    );
}

function serializeYieldExpression(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeOptionBoxExpression(
        node.argument,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.delegate, pos + 8);
    return bufferGrownByBytes;
}

function serializeMetaProperty(node, pos) {
    serializeSpan(node.span, pos);
    serializeMetaPropertyKind(node.kind, pos + 12);
    return 0;
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
    return 0;
}

function serializeAwaitExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.argument, pos + 12);
}

function serializeParenthesisExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializePrivateName(node, pos) {
    serializeSpan(node.span, pos);
    return serializeIdentifier(node.id, pos + 12);
}

function serializeOptionalChainingExpression(node, pos) {
    serializeSpan(node.span, pos);
    serializeSpan(node.questionDotToken, (pos += 12));
    return serializeMemberExpressionOrOptionalChainingCall(node.base, pos + 12);
}

function serializeOptionalChainingCall(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxExpression(node.callee, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecExpressionOrSpread(
        node.arguments,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 8
        ) + bufferGrownByBytes
    );
}

function serializeSuper(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeImport(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeInvalid(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeComputed(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeExpressionOrSpread(node, pos) {
    serializeOptionSpan(node.spread, pos);
    return serializeBoxExpression(node.expression, pos + 16);
}

function serializeObjectExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecSpreadElementOrBoxObjectProperty(
        node.properties,
        pos + 12
    );
}

function serializeSpreadElement(node, pos) {
    serializeSpan(node.spread, pos);
    return serializeBoxExpression(node.arguments, pos + 12);
}

function serializeObjectProperty(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "KeyValueProperty":
            return serializeEnum(node, pos, 1, serializeKeyValueProperty, 8);
        case "AssignmentProperty":
            return serializeEnum(node, pos, 2, serializeAssignmentProperty, 4);
        case "GetterProperty":
            return serializeEnum(node, pos, 3, serializeGetterProperty, 8);
        case "SetterProperty":
            return serializeEnum(node, pos, 4, serializeSetterProperty, 8);
        case "MethodProperty":
            return serializeEnum(node, pos, 5, serializeMethodProperty, 8);
        default:
            throw new Error("Unexpected enum option type for ObjectProperty");
    }
}

function serializeKeyValueProperty(node, pos) {
    const bufferGrownByBytes = serializePropertyName(node.key, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxExpression(node.value, pos + 48) + bufferGrownByBytes;
}

function serializeAssignmentProperty(node, pos) {
    const bufferGrownByBytes = serializeIdentifier(node.key, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxExpression(node.value, pos + 24) + bufferGrownByBytes;
}

function serializeGetterProperty(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePropertyName(node.key, (pos += 16));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 48)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionBlockStatement(node.body, pos + 20) + bufferGrownByBytes
    );
}

function serializeSetterProperty(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializePropertyName(node.key, (pos += 16));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializePattern(node.param, (pos += 48));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionBlockStatement(node.body, pos + 52) + bufferGrownByBytes
    );
}

function serializeMethodProperty(node, pos) {
    let bufferGrownByBytes = serializePropertyName(node.key, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecParameter(
        node.params,
        (pos += 48)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecDecorator(node.decorators, (pos += 8));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeSpan(node.span, (pos += 8));
    thisBufferGrownByBytes = serializeOptionBlockStatement(
        node.body,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.generator, (pos += 24));
    serializeBoolean(node.async, (pos += 1));
    thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParameters,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeAnnotation(node.returnType, pos + 24) +
        bufferGrownByBytes
    );
}

function serializePropertyName(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "StringLiteral":
            return serializeEnum(node, pos, 1, serializeStringLiteral, 4);
        case "NumericLiteral":
            return serializeEnum(node, pos, 2, serializeNumericLiteral, 8);
        case "Computed":
            return serializeEnum(node, pos, 3, serializeComputed, 4);
        case "BigIntLiteral":
            return serializeEnum(node, pos, 4, serializeBigIntLiteral, 4);
        default:
            throw new Error("Unexpected enum option type for PropertyName");
    }
}

function serializeLiteral(node, pos) {
    switch (node.type) {
        case "StringLiteral":
            return serializeEnum(node, pos, 0, serializeStringLiteral, 4);
        case "BooleanLiteral":
            return serializeEnum(node, pos, 1, serializeBooleanLiteral, 4);
        case "NullLiteral":
            return serializeEnum(node, pos, 2, serializeNullLiteral, 4);
        case "NumericLiteral":
            return serializeEnum(node, pos, 3, serializeNumericLiteral, 8);
        case "BigIntLiteral":
            return serializeEnum(node, pos, 4, serializeBigIntLiteral, 4);
        case "RegExpLiteral":
            return serializeEnum(node, pos, 5, serializeRegExpLiteral, 4);
        case "JSXText":
            return serializeEnum(node, pos, 6, serializeJSXText, 4);
        default:
            throw new Error("Unexpected enum option type for Literal");
    }
}

function serializeStringLiteral(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeJsWord(node.value, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeOptionJsWord(node.raw, pos + 8) + bufferGrownByBytes;
}

function serializeBooleanLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.value, pos + 12);
    return 0;
}

function serializeNullLiteral(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeNumericLiteral(node, pos) {
    serializeSpan(node.span, pos);
    serializeNumber(node.value, (pos += 16));
    return serializeOptionAsciiJsWord(node.raw, pos + 8);
}

function serializeBigIntLiteral(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBigIntValue(node.value, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeOptionAsciiJsWord(node.raw, pos + 8) + bufferGrownByBytes;
}

function serializeBigIntValue(value, pos) {
    if (value[0] === 0) return serializeAsciiJsWord("0", pos);
    const parts = value[1];
    let num = 0n;
    for (let i = parts.length - 1; i >= 0; i--) {
        num <<= 32n;
        num += BigInt(parts[i]);
    }
    let str = num.toString();
    if (value[0] === -1) str = `-${str}`;
    return serializeAsciiJsWord(str, pos);
}

function serializeRegExpLiteral(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeJsWord(node.pattern, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeAsciiJsWord(node.flags, pos + 8) + bufferGrownByBytes;
}

function serializeJSXElement(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeJSXOpeningElement(
        node.opening,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeVecJSXElementChild(
        node.children,
        (pos += 104)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionJSXClosingElement(node.closing, pos + 8) +
        bufferGrownByBytes
    );
}

function serializeJSXOpeningElement(node, pos) {
    let bufferGrownByBytes = serializeJSXElementName(node.name, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeSpan(node.span, (pos += 56));
    let thisBufferGrownByBytes = serializeVecJSXAttributeOrSpreadElement(
        node.attributes,
        (pos += 12)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.selfClosing, (pos += 8));
    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 4
        ) + bufferGrownByBytes
    );
}

function serializeJSXAttribute(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeJSXAttributeName(
        node.name,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionJSXAttributeValue(node.value, pos + 52) +
        bufferGrownByBytes
    );
}

function serializeJSXAttributeName(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "JSXNamespacedName":
            return serializeEnum(node, pos, 1, serializeJSXNamespacedName, 4);
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
            return serializeEnum(node, pos, 0, serializeLiteral, 8);
        case "JSXExpressionContainer":
            return serializeEnum(
                node,
                pos,
                1,
                serializeJSXExpressionContainer,
                4
            );
        case "JSXElement":
            return serializeEnum(node, pos, 2, serializeBoxJSXElement, 4);
        case "JSXFragment":
            return serializeEnum(node, pos, 3, serializeJSXFragment, 4);
        default:
            throw new Error(
                "Unexpected enum option type for JSXAttributeValue"
            );
    }
}

function serializeJSXClosingElement(node, pos) {
    serializeSpan(node.span, pos);
    return serializeJSXElementName(node.name, pos + 12);
}

function serializeJSXFragment(node, pos) {
    serializeSpan(node.span, pos);
    serializeJSXOpeningFragment(node.opening, (pos += 12));
    const bufferGrownByBytes = serializeVecJSXElementChild(
        node.children,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeJSXClosingFragment(node.closing, pos + 8);
    return bufferGrownByBytes;
}

function serializeJSXOpeningFragment(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeJSXClosingFragment(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeJSXMemberExpression(node, pos) {
    const bufferGrownByBytes = serializeJSXObject(node.object, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeIdentifier(node.property, pos + 28) + bufferGrownByBytes;
}

function serializeJSXObject(node, pos) {
    switch (node.type) {
        case "JSXMemberExpression":
            return serializeEnum(
                node,
                pos,
                0,
                serializeBoxJSXMemberExpression,
                4
            );
        case "Identifier":
            return serializeEnum(node, pos, 1, serializeIdentifier, 4);
        default:
            throw new Error("Unexpected enum option type for JSXObject");
    }
}

function serializeJSXNamespacedName(node, pos) {
    const bufferGrownByBytes = serializeIdentifier(node.namespace, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeIdentifier(node.name, pos + 24) + bufferGrownByBytes;
}

function serializeJSXText(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeJsWord(node.value, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeJsWord(node.raw, pos + 8) + bufferGrownByBytes;
}

function serializeJSXEmptyExpression(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeJSXElementChild(node, pos) {
    switch (node.type) {
        case "JSXText":
            return serializeEnum(node, pos, 0, serializeJSXText, 4);
        case "JSXExpressionContainer":
            return serializeEnum(
                node,
                pos,
                1,
                serializeJSXExpressionContainer,
                4
            );
        case "JSXSpreadChild":
            return serializeEnum(node, pos, 2, serializeJSXSpreadChild, 4);
        case "JSXElement":
            return serializeEnum(node, pos, 3, serializeBoxJSXElement, 4);
        case "JSXFragment":
            return serializeEnum(node, pos, 4, serializeJSXFragment, 4);
        default:
            throw new Error("Unexpected enum option type for JSXElementChild");
    }
}

function serializeJSXExpressionContainer(node, pos) {
    serializeSpan(node.span, pos);
    return serializeJSXExpression(node.expression, pos + 12);
}

function serializeJSXExpression(node, pos) {
    switch (node.type) {
        case "JSXEmptyExpression":
            return serializeEnum(node, pos, 0, serializeJSXEmptyExpression, 4);
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
            return serializeEnum(node, pos, 1, serializeBoxExpression, 4);
        default:
            throw new Error("Unexpected enum option type for JSXExpression");
    }
}

function serializeJSXSpreadChild(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeJSXElementName(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "JSXMemberExpression":
            return serializeEnum(node, pos, 1, serializeJSXMemberExpression, 4);
        case "JSXNamespacedName":
            return serializeEnum(node, pos, 2, serializeJSXNamespacedName, 4);
        default:
            throw new Error("Unexpected enum option type for JSXElementName");
    }
}

function serializeTsTypeAnnotation(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsTypeParameterDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecTsTypeParameter(node.parameters, pos + 12);
}

function serializeTsTypeParameter(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeIdentifier(node.name, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.in, (pos += 24));
    serializeBoolean(node.out, (pos += 1));
    let thisBufferGrownByBytes = serializeOptionBoxTsType(
        node.constraint,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeOptionBoxTsType(node.default, pos + 8) + bufferGrownByBytes;
}

function serializeTsTypeParameterInstantiation(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecBoxTsType(node.params, pos + 12);
}

function serializeTsParameterProperty(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecDecorator(
        node.decorators,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeOptionAccessibility(node.accessibility, (pos += 8));
    serializeBoolean(node.override, (pos += 8));
    serializeBoolean(node.readonly, (pos += 1));
    return serializeTsParamPropParam(node.param, pos + 3) + bufferGrownByBytes;
}

function serializeTsParamPropParam(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeBindingIdentifier, 4);
        case "AssignmentPattern":
            return serializeEnum(node, pos, 1, serializeAssignmentPattern, 4);
        default:
            throw new Error("Unexpected enum option type for TsParamPropParam");
    }
}

function serializeTsQualifiedName(node, pos) {
    const bufferGrownByBytes = serializeTsEntityName(node.left, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeIdentifier(node.right, pos + 28) + bufferGrownByBytes;
}

function serializeTsEntityName(node, pos) {
    switch (node.type) {
        case "TsQualifiedName":
            return serializeEnum(node, pos, 0, serializeBoxTsQualifiedName, 4);
        case "Identifier":
            return serializeEnum(node, pos, 1, serializeIdentifier, 4);
        default:
            throw new Error("Unexpected enum option type for TsEntityName");
    }
}

function serializeTsTypeElement(node, pos) {
    switch (node.type) {
        case "TsCallSignatureDeclaration":
            return serializeEnum(
                node,
                pos,
                0,
                serializeTsCallSignatureDeclaration,
                4
            );
        case "TsConstructSignatureDeclaration":
            return serializeEnum(
                node,
                pos,
                1,
                serializeTsConstructSignatureDeclaration,
                4
            );
        case "TsPropertySignature":
            return serializeEnum(node, pos, 2, serializeTsPropertySignature, 4);
        case "TsGetterSignature":
            return serializeEnum(node, pos, 3, serializeTsGetterSignature, 4);
        case "TsSetterSignature":
            return serializeEnum(node, pos, 4, serializeTsSetterSignature, 4);
        case "TsMethodSignature":
            return serializeEnum(node, pos, 5, serializeTsMethodSignature, 4);
        case "TsIndexSignature":
            return serializeEnum(node, pos, 6, serializeTsIndexSignature, 4);
        default:
            throw new Error("Unexpected enum option type for TsTypeElement");
    }
}

function serializeTsCallSignatureDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecTsFnParam(node.params, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 20) +
        bufferGrownByBytes
    );
}

function serializeTsConstructSignatureDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecTsFnParam(node.params, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 20) +
        bufferGrownByBytes
    );
}

function serializeTsPropertySignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, (pos += 12));
    let bufferGrownByBytes = serializeBoxExpression(node.key, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.computed, (pos += 4));
    serializeBoolean(node.optional, (pos += 1));
    let thisBufferGrownByBytes = serializeOptionBoxExpression(
        node.init,
        (pos += 3)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecTsFnParam(node.params, (pos += 8));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 20) +
        bufferGrownByBytes
    );
}

function serializeTsGetterSignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, (pos += 12));
    const bufferGrownByBytes = serializeBoxExpression(node.key, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.computed, (pos += 4));
    serializeBoolean(node.optional, (pos += 1));
    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 3) +
        bufferGrownByBytes
    );
}

function serializeTsSetterSignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, (pos += 12));
    const bufferGrownByBytes = serializeBoxExpression(node.key, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.computed, (pos += 4));
    serializeBoolean(node.optional, (pos += 1));
    return serializeTsFnParam(node.param, pos + 3) + bufferGrownByBytes;
}

function serializeTsMethodSignature(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, (pos += 12));
    let bufferGrownByBytes = serializeBoxExpression(node.key, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.computed, (pos += 4));
    serializeBoolean(node.optional, (pos += 1));
    let thisBufferGrownByBytes = serializeVecTsFnParam(node.params, (pos += 3));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnn,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterDeclaration(node.typeParams, pos + 20) +
        bufferGrownByBytes
    );
}

function serializeTsIndexSignature(node, pos) {
    let bufferGrownByBytes = serializeVecTsFnParam(node.params, pos);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    const thisBufferGrownByBytes = serializeOptionTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.readonly, (pos += 20));
    serializeBoolean(node.static, (pos += 1));
    serializeSpan(node.span, pos + 3);
    return bufferGrownByBytes;
}

function serializeTsType(node, pos) {
    switch (node.type) {
        case "TsKeywordType":
            return serializeEnum(node, pos, 0, serializeTsKeywordType, 4);
        case "TsThisType":
            return serializeEnum(node, pos, 1, serializeTsThisType, 4);
        case "TsFunctionType":
        case "TsConstructorType":
            return serializeEnum(
                node,
                pos,
                2,
                serializeTsFnOrConstructorType,
                4
            );
        case "TsTypeReference":
            return serializeEnum(node, pos, 3, serializeTsTypeReference, 4);
        case "TsTypeQuery":
            return serializeEnum(node, pos, 4, serializeTsTypeQuery, 4);
        case "TsTypeLiteral":
            return serializeEnum(node, pos, 5, serializeTsTypeLiteral, 4);
        case "TsArrayType":
            return serializeEnum(node, pos, 6, serializeTsArrayType, 4);
        case "TsTupleType":
            return serializeEnum(node, pos, 7, serializeTsTupleType, 4);
        case "TsOptionalType":
            return serializeEnum(node, pos, 8, serializeTsOptionalType, 4);
        case "TsRestType":
            return serializeEnum(node, pos, 9, serializeTsRestType, 4);
        case "TsUnionType":
        case "TsIntersectionType":
            return serializeEnum(
                node,
                pos,
                10,
                serializeTsUnionOrIntersectionType,
                4
            );
        case "TsConditionalType":
            return serializeEnum(node, pos, 11, serializeTsConditionalType, 4);
        case "TsInferType":
            return serializeEnum(node, pos, 12, serializeTsInferType, 4);
        case "TsParenthesizedType":
            return serializeEnum(
                node,
                pos,
                13,
                serializeTsParenthesizedType,
                4
            );
        case "TsTypeOperator":
            return serializeEnum(node, pos, 14, serializeTsTypeOperator, 4);
        case "TsIndexedAccessType":
            return serializeEnum(
                node,
                pos,
                15,
                serializeTsIndexedAccessType,
                4
            );
        case "TsMappedType":
            return serializeEnum(node, pos, 16, serializeTsMappedType, 4);
        case "TsLiteralType":
            return serializeEnum(node, pos, 17, serializeTsLiteralType, 8);
        case "TsTypePredicate":
            return serializeEnum(node, pos, 18, serializeTsTypePredicate, 4);
        case "TsImportType":
            return serializeEnum(node, pos, 19, serializeTsImportType, 4);
        default:
            throw new Error("Unexpected enum option type for TsType");
    }
}

function serializeTsFnOrConstructorType(node, pos) {
    switch (node.type) {
        case "TsFunctionType":
            return serializeEnum(node, pos, 0, serializeTsFunctionType, 4);
        case "TsConstructorType":
            return serializeEnum(node, pos, 1, serializeTsConstructorType, 4);
        default:
            throw new Error(
                "Unexpected enum option type for TsFnOrConstructorType"
            );
    }
}

function serializeTsKeywordType(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsKeywordTypeKind(node.kind, pos + 12);
    return 0;
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
    return 0;
}

function serializeTsThisType(node, pos) {
    serializeSpan(node.span, pos);
    return 0;
}

function serializeTsFnParam(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeBindingIdentifier, 4);
        case "ArrayPattern":
            return serializeEnum(node, pos, 1, serializeArrayPattern, 4);
        case "RestElement":
            return serializeEnum(node, pos, 2, serializeRestElement, 4);
        case "ObjectPattern":
            return serializeEnum(node, pos, 3, serializeObjectPattern, 4);
        default:
            throw new Error("Unexpected enum option type for TsFnParam");
    }
}

function serializeTsFunctionType(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecTsFnParam(node.params, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParams,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeTsTypeAnnotation(node.typeAnnotation, pos + 24) +
        bufferGrownByBytes
    );
}

function serializeTsConstructorType(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeVecTsFnParam(node.params, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParams,
        (pos += 8)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeTsTypeAnnotation(
        node.typeAnnotation,
        (pos += 24)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeBoolean(node.isAbstract, pos + 16);
    return bufferGrownByBytes;
}

function serializeTsTypeReference(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeTsEntityName(
        node.typeName,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionTsTypeParameterInstantiation(node.typeParams, pos + 28) +
        bufferGrownByBytes
    );
}

function serializeTsTypePredicate(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.asserts, (pos += 12));
    const bufferGrownByBytes = serializeTsThisTypeOrIdent(
        node.paramName,
        (pos += 4)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionTsTypeAnnotation(node.typeAnnotation, pos + 28) +
        bufferGrownByBytes
    );
}

function serializeTsThisTypeOrIdent(node, pos) {
    switch (node.type) {
        case "TsThisType":
            return serializeEnum(node, pos, 0, serializeTsThisType, 4);
        case "Identifier":
            return serializeEnum(node, pos, 1, serializeIdentifier, 4);
        default:
            throw new Error(
                "Unexpected enum option type for TsThisTypeOrIdent"
            );
    }
}

function serializeTsTypeQuery(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeTsTypeQueryExpr(
        node.exprName,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 104
        ) + bufferGrownByBytes
    );
}

function serializeTsTypeQueryExpr(node, pos) {
    switch (node.type) {
        case "TsQualifiedName":
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeTsEntityName, 4);
        case "TsImportType":
            return serializeEnum(node, pos, 1, serializeTsImportType, 4);
        default:
            throw new Error("Unexpected enum option type for TsTypeQueryExpr");
    }
}

function serializeTsImportType(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeStringLiteral(node.argument, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsEntityName(
        node.qualifier,
        (pos += 32)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 32
        ) + bufferGrownByBytes
    );
}

function serializeTsTypeLiteral(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecTsTypeElement(node.members, pos + 12);
}

function serializeTsArrayType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxTsType(node.elemType, pos + 12);
}

function serializeTsTupleType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecTsTupleElement(node.elemTypes, pos + 12);
}

function serializeTsTupleElement(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeOptionPattern(node.label, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeTsType(node.ty, pos + 60) + bufferGrownByBytes;
}

function serializeTsOptionalType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsRestType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsUnionOrIntersectionType(node, pos) {
    switch (node.type) {
        case "TsUnionType":
            return serializeEnum(node, pos, 0, serializeTsUnionType, 4);
        case "TsIntersectionType":
            return serializeEnum(node, pos, 1, serializeTsIntersectionType, 4);
        default:
            throw new Error(
                "Unexpected enum option type for TsUnionOrIntersectionType"
            );
    }
}

function serializeTsUnionType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecBoxTsType(node.types, pos + 12);
}

function serializeTsIntersectionType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecBoxTsType(node.types, pos + 12);
}

function serializeTsConditionalType(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeBoxTsType(node.checkType, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeBoxTsType(
        node.extendsType,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeBoxTsType(node.trueType, (pos += 4));
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeBoxTsType(node.falseType, pos + 4) + bufferGrownByBytes;
}

function serializeTsInferType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeTsTypeParameter(node.typeParam, pos + 12);
}

function serializeTsParenthesizedType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxTsType(node.typeAnnotation, pos + 12);
}

function serializeTsTypeOperator(node, pos) {
    serializeSpan(node.span, pos);
    serializeTsTypeOperatorOp(node.op, (pos += 12));
    return serializeBoxTsType(node.typeAnnotation, pos + 4);
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
    return 0;
}

function serializeTsIndexedAccessType(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.readonly, (pos += 12));
    const bufferGrownByBytes = serializeBoxTsType(node.objectType, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeBoxTsType(node.indexType, pos + 4) + bufferGrownByBytes;
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
    return 0;
}

function serializeTsMappedType(node, pos) {
    serializeSpan(node.span, pos);
    serializeOptionTruePlusMinus(node.readonly, (pos += 12));
    let bufferGrownByBytes = serializeTsTypeParameter(
        node.typeParam,
        (pos += 8)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionBoxTsType(
        node.nameType,
        (pos += 56)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    serializeOptionTruePlusMinus(node.optional, (pos += 8));
    return (
        serializeOptionBoxTsType(node.typeAnnotation, pos + 8) +
        bufferGrownByBytes
    );
}

function serializeTsLiteralType(node, pos) {
    serializeSpan(node.span, pos);
    return serializeTsLit(node.literal, pos + 16);
}

function serializeTsLit(node, pos) {
    switch (node.type) {
        case "NumericLiteral":
            return serializeEnum(node, pos, 0, serializeNumericLiteral, 8);
        case "StringLiteral":
            return serializeEnum(node, pos, 1, serializeStringLiteral, 4);
        case "BooleanLiteral":
            return serializeEnum(node, pos, 2, serializeBooleanLiteral, 4);
        case "BigIntLiteral":
            return serializeEnum(node, pos, 3, serializeBigIntLiteral, 4);
        case "TemplateLiteral":
            return serializeEnum(
                node,
                pos,
                4,
                serializeTsTemplateLiteralType,
                4
            );
        default:
            throw new Error("Unexpected enum option type for TsLit");
    }
}

function serializeTsTemplateLiteralType(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeVecBoxTsType(node.types, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeVecTemplateElement(node.quasis, pos + 8) + bufferGrownByBytes
    );
}

function serializeTsInterfaceDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    let bufferGrownByBytes = serializeIdentifier(node.id, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    serializeBoolean(node.declare, (pos += 24));
    let thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParams,
        (pos += 4)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    thisBufferGrownByBytes = serializeVecTsExpressionWithTypeArguments(
        node.extends,
        (pos += 24)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return serializeTsInterfaceBody(node.body, pos + 8) + bufferGrownByBytes;
}

function serializeTsInterfaceBody(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecTsTypeElement(node.body, pos + 12);
}

function serializeTsExpressionWithTypeArguments(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(
        node.expression,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionTsTypeParameterInstantiation(
            node.typeArguments,
            pos + 4
        ) + bufferGrownByBytes
    );
}

function serializeTsTypeAliasDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, (pos += 12));
    let bufferGrownByBytes = serializeIdentifier(node.id, (pos += 4));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    let thisBufferGrownByBytes = serializeOptionTsTypeParameterDeclaration(
        node.typeParams,
        (pos += 24)
    );
    if (thisBufferGrownByBytes > 0) {
        pos += thisBufferGrownByBytes;
        bufferGrownByBytes += thisBufferGrownByBytes;
    }

    return (
        serializeBoxTsType(node.typeAnnotation, pos + 24) + bufferGrownByBytes
    );
}

function serializeTsEnumDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, (pos += 12));
    serializeBoolean(node.isConst, (pos += 1));
    const bufferGrownByBytes = serializeIdentifier(node.id, (pos += 3));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeVecTsEnumMember(node.members, pos + 24) + bufferGrownByBytes
    );
}

function serializeTsEnumMember(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeTsModuleName(node.id, (pos += 12));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionBoxExpression(node.init, pos + 36) + bufferGrownByBytes
    );
}

function serializeTsModuleName(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "StringLiteral":
            return serializeEnum(node, pos, 1, serializeStringLiteral, 4);
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
}

function serializeTsModuleDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, (pos += 12));
    serializeBoolean(node.global, (pos += 1));
    const bufferGrownByBytes = serializeTsModuleName(node.id, (pos += 3));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeOptionTsNamespaceBody(node.body, pos + 36) + bufferGrownByBytes
    );
}

function serializeTsNamespaceBody(node, pos) {
    switch (node.type) {
        case "TsModuleBlock":
            return serializeEnum(node, pos, 0, serializeTsModuleBlock, 4);
        case "TsNamespaceDeclaration":
            return serializeEnum(
                node,
                pos,
                1,
                serializeTsNamespaceDeclaration,
                4
            );
        default:
            throw new Error("Unexpected enum option type for TsNamespaceBody");
    }
}

function serializeTsModuleBlock(node, pos) {
    serializeSpan(node.span, pos);
    return serializeVecModuleItem(node.body, pos + 12);
}

function serializeTsNamespaceDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, (pos += 12));
    serializeBoolean(node.global, (pos += 1));
    const bufferGrownByBytes = serializeIdentifier(node.id, (pos += 3));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeBoxTsNamespaceBody(node.body, pos + 24) + bufferGrownByBytes
    );
}

function serializeTsModuleName(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "StringLiteral":
            return serializeEnum(node, pos, 1, serializeStringLiteral, 4);
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
}

function serializeTsImportEqualsDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    serializeBoolean(node.declare, (pos += 12));
    serializeBoolean(node.isExport, (pos += 1));
    serializeBoolean(node.isTypeOnly, (pos += 1));
    const bufferGrownByBytes = serializeIdentifier(node.id, (pos += 2));
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return serializeTsModuleRef(node.moduleRef, pos + 24) + bufferGrownByBytes;
}

function serializeTsModuleRef(node, pos) {
    switch (node.type) {
        case "TsQualifiedName":
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeTsEntityName, 4);
        case "TsExternalModuleReference":
            return serializeEnum(
                node,
                pos,
                1,
                serializeTsExternalModuleReference,
                4
            );
        default:
            throw new Error("Unexpected enum option type for TsModuleRef");
    }
}

function serializeTsExternalModuleReference(node, pos) {
    serializeSpan(node.span, pos);
    return serializeStringLiteral(node.expression, pos + 12);
}

function serializeTsExportAssignment(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeTsNamespaceExportDeclaration(node, pos) {
    serializeSpan(node.span, pos);
    return serializeIdentifier(node.id, pos + 12);
}

function serializeTsAsExpression(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(
        node.expression,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeBoxTsType(node.typeAnnotation, pos + 4) + bufferGrownByBytes
    );
}

function serializeTsTypeAssertion(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(
        node.expression,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeBoxTsType(node.typeAnnotation, pos + 4) + bufferGrownByBytes
    );
}

function serializeTsNonNullExpression(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
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
    return 0;
}

function serializeTsConstAssertion(node, pos) {
    serializeSpan(node.span, pos);
    return serializeBoxExpression(node.expression, pos + 12);
}

function serializeTsInstantiation(node, pos) {
    serializeSpan(node.span, pos);
    const bufferGrownByBytes = serializeBoxExpression(
        node.expression,
        (pos += 12)
    );
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;

    return (
        serializeTsTypeParameterInstantiation(node.typeArguments, pos + 4) +
        bufferGrownByBytes
    );
}

function serializeJsWord(str, pos) {
    const strLen = str.length;
    if (strLen === 0) {
        buff[pos + 7] = 0;
        return 0;
    }
    let len, bufferGrownByBytes;
    if (strLen <= 7) {
        if (writeStringToBuffer(str, pos, strLen)) {
            buff[pos + 7] = strLen;
            return 0;
        }
        if (strLen <= 2) {
            buff[pos + 7] = utf8Write.call(buff, str, pos);
            return 0;
        }
        const allocBytes = strLen * 3;
        bufferGrownByBytes = alloc(allocBytes);
        if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
        len = utf8Write.call(buff, str, buffPos);
        if (len <= 7) {
            buff[pos + 7] = len;
            const endPos = pos + len;
            let charPos = buffPos;
            do {
                buff[pos++] = buff[charPos++];
            } while (pos < endPos);
            buffPos += allocBytes;
            return bufferGrownByBytes;
        }
        shiftBytesAndFree(len, allocBytes);
    } else if (strLen < 42) {
        bufferGrownByBytes = alloc(strLen);
        if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
        if (writeStringToBuffer(str, buffPos, strLen)) {
            len = strLen;
        } else {
            bufferGrownByBytes += alloc(strLen * 2);
            if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
            len = utf8Write.call(buff, str, buffPos);
            shiftBytesAndFree(len, strLen * 3);
        }
    } else {
        const allocBytes = strLen * 3;
        bufferGrownByBytes = alloc(allocBytes);
        if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
        len = utf8Write.call(buff, str, buffPos);
        shiftBytesAndFree(len, allocBytes);
    }
    const pos32 = pos >>> 2;
    uint32[pos32] = len;
    int32[pos32 + 1] = buffPos - pos;
    return bufferGrownByBytes;
}
const { utf8Write } = Buffer.prototype;

function serializeAsciiJsWord(str, pos) {
    const len = str.length;
    if (len === 0) {
        buff[pos + 7] = 0;
        return 0;
    }
    if (len <= 7) {
        buff[pos + 7] = len;
        let charIndex = 0;
        do {
            buff[pos++] = charCodeAt.call(str, charIndex);
        } while (++charIndex < len);
        return 0;
    }
    const bufferGrownByBytes = alloc(len);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
    if (len < 48) {
        writeAsciiStringToBuffer(str, buff, len, buffPos);
    } else {
        asciiWrite.call(buff, str, buffPos);
    }
    const pos32 = pos >>> 2;
    uint32[pos32] = len;
    int32[pos32 + 1] = buffPos - pos;
    return bufferGrownByBytes;
}
const { asciiWrite } = Buffer.prototype;

function serializeBoolean(value, pos) {
    buff[pos] = value ? 1 : 0;
    return 0;
}

function serializeNumber(num, pos) {
    float64[pos >>> 3] = num;
    return 0;
}

function serializeSpan(span, pos) {
    const pos32 = pos >>> 2;
    uint32[pos32] = span.start;
    uint32[pos32 + 1] = span.end;
    uint32[pos32 + 2] = span.ctxt;
    return 0;
}

function serializeVecModuleItem(values, pos) {
    return serializeVec(values, pos, serializeModuleItem, 156, 4);
}

function serializeVecImportSpecifier(values, pos) {
    return serializeVec(values, pos, serializeImportSpecifier, 84, 4);
}

function serializeOptionTsModuleName(value, pos) {
    return serializeOption(value, pos, serializeTsModuleName, 4);
}

function serializeOptionJsWord(value, pos) {
    return serializeOption(value, pos, serializeJsWord, 4);
}

function serializeOptionObjectExpression(value, pos) {
    return serializeOption(value, pos, serializeObjectExpression, 4);
}

function serializeVecSpreadElementOrBoxObjectProperty(values, pos) {
    return serializeVec(
        values,
        pos,
        serializeSpreadElementOrBoxObjectProperty,
        20,
        4
    );
}

function serializeSpreadElementOrBoxObjectProperty(node, pos) {
    switch (node.type) {
        case "SpreadElement":
            return serializeEnum(node, pos, 0, serializeSpreadElement, 4);
        case "Identifier":
        case "KeyValueProperty":
        case "AssignmentProperty":
        case "GetterProperty":
        case "SetterProperty":
        case "MethodProperty":
            return serializeEnum(node, pos, 1, serializeBoxObjectProperty, 4);
        default:
            throw new Error(
                "Unexpected enum option type for SpreadElementOrBoxObjectProperty"
            );
    }
}

function serializeBoxExpression(value, pos) {
    return serializeBox(value, pos, serializeExpression, 136, 8);
}

function serializeVecOptionExpressionOrSpread(values, pos) {
    return serializeVec(values, pos, serializeOptionExpressionOrSpread, 24, 4);
}

function serializeOptionExpressionOrSpread(value, pos) {
    return serializeOption(value, pos, serializeExpressionOrSpread, 4);
}

function serializeOptionSpan(value, pos) {
    return serializeOption(value, pos, serializeSpan, 4);
}

function serializeOptionIdentifier(value, pos) {
    return serializeOption(value, pos, serializeIdentifier, 4);
}

function serializeVecParameter(values, pos) {
    return serializeVec(values, pos, serializeParameter, 72, 4);
}

function serializeVecDecorator(values, pos) {
    return serializeVec(values, pos, serializeDecorator, 16, 4);
}

function serializeOptionTsTypeAnnotation(value, pos) {
    return serializeOption(value, pos, serializeTsTypeAnnotation, 4);
}

function serializeBoxTsType(value, pos) {
    return serializeBox(value, pos, serializeTsType, 144, 8);
}

function serializeVecTsFnParam(values, pos) {
    return serializeVec(values, pos, serializeTsFnParam, 52, 4);
}

function serializeVecOptionPattern(values, pos) {
    return serializeVec(values, pos, serializeOptionPattern, 56, 4);
}

function serializeOptionPattern(value, pos) {
    return serializeOption(value, pos, serializePattern, 4);
}

function serializeBoxPattern(value, pos) {
    return serializeBox(value, pos, serializePattern, 52, 4);
}

function serializeVecObjectPatternProperty(values, pos) {
    return serializeVec(values, pos, serializeObjectPatternProperty, 64, 8);
}

function serializeOptionAsciiJsWord(value, pos) {
    return serializeOption(value, pos, serializeAsciiJsWord, 4);
}

function serializeOptionBoxExpression(value, pos) {
    return serializeOption(value, pos, serializeBoxExpression, 4);
}

function serializeOptionTsTypeParameterDeclaration(value, pos) {
    return serializeOption(value, pos, serializeTsTypeParameterDeclaration, 4);
}

function serializeVecTsTypeParameter(values, pos) {
    return serializeVec(values, pos, serializeTsTypeParameter, 56, 4);
}

function serializeOptionBoxTsType(value, pos) {
    return serializeOption(value, pos, serializeBoxTsType, 4);
}

function serializeBoxTsQualifiedName(value, pos) {
    return serializeBox(value, pos, serializeTsQualifiedName, 52, 4);
}

function serializeOptionTsTypeParameterInstantiation(value, pos) {
    return serializeOption(
        value,
        pos,
        serializeTsTypeParameterInstantiation,
        4
    );
}

function serializeVecBoxTsType(values, pos) {
    return serializeVec(values, pos, serializeBoxTsType, 4, 4);
}

function serializeOptionTsEntityName(value, pos) {
    return serializeOption(value, pos, serializeTsEntityName, 4);
}

function serializeVecTsTypeElement(values, pos) {
    return serializeVec(values, pos, serializeTsTypeElement, 88, 4);
}

function serializeVecTsTupleElement(values, pos) {
    return serializeVec(values, pos, serializeTsTupleElement, 216, 8);
}

function serializeOptionTruePlusMinus(value, pos) {
    return serializeOption(value, pos, serializeTruePlusMinus, 4);
}

function serializeVecTemplateElement(values, pos) {
    return serializeVec(values, pos, serializeTemplateElement, 36, 4);
}

function serializeOptionBlockStatement(value, pos) {
    return serializeOption(value, pos, serializeBlockStatement, 4);
}

function serializeVecStatement(values, pos) {
    return serializeVec(values, pos, serializeStatement, 152, 4);
}

function serializeBoxStatement(value, pos) {
    return serializeBox(value, pos, serializeStatement, 152, 4);
}

function serializeOptionBoxStatement(value, pos) {
    return serializeOption(value, pos, serializeBoxStatement, 4);
}

function serializeVecSwitchCase(values, pos) {
    return serializeVec(values, pos, serializeSwitchCase, 28, 4);
}

function serializeOptionCatchClause(value, pos) {
    return serializeOption(value, pos, serializeCatchClause, 4);
}

function serializeOptionVariableDeclarationOrBoxExpression(value, pos) {
    return serializeOption(
        value,
        pos,
        serializeVariableDeclarationOrBoxExpression,
        4
    );
}

function serializeVariableDeclarationOrBoxExpression(node, pos) {
    switch (node.type) {
        case "VariableDeclaration":
            return serializeEnum(node, pos, 0, serializeVariableDeclaration, 4);
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
            return serializeEnum(node, pos, 1, serializeBoxExpression, 4);
        default:
            throw new Error(
                "Unexpected enum option type for VariableDeclarationOrBoxExpression"
            );
    }
}

function serializeVecVariableDeclarator(values, pos) {
    return serializeVec(values, pos, serializeVariableDeclarator, 76, 4);
}

function serializeVariableDeclarationOrPattern(node, pos) {
    switch (node.type) {
        case "VariableDeclaration":
            return serializeEnum(node, pos, 0, serializeVariableDeclaration, 4);
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
            return serializeEnum(node, pos, 1, serializePattern, 4);
        default:
            throw new Error(
                "Unexpected enum option type for VariableDeclarationOrPattern"
            );
    }
}

function serializeVecClassMember(values, pos) {
    return serializeVec(values, pos, serializeClassMember, 192, 8);
}

function serializeVecTsParameterPropertyOrParameter(values, pos) {
    return serializeVec(
        values,
        pos,
        serializeTsParameterPropertyOrParameter,
        84,
        4
    );
}

function serializeTsParameterPropertyOrParameter(node, pos) {
    switch (node.type) {
        case "TsParameterProperty":
            return serializeEnum(node, pos, 0, serializeTsParameterProperty, 4);
        case "Parameter":
            return serializeEnum(node, pos, 1, serializeParameter, 4);
        default:
            throw new Error(
                "Unexpected enum option type for TsParameterPropertyOrParameter"
            );
    }
}

function serializeOptionAccessibility(value, pos) {
    return serializeOption(value, pos, serializeAccessibility, 4);
}

function serializeVecTsExpressionWithTypeArguments(values, pos) {
    return serializeVec(
        values,
        pos,
        serializeTsExpressionWithTypeArguments,
        40,
        4
    );
}

function serializeVecTsEnumMember(values, pos) {
    return serializeVec(values, pos, serializeTsEnumMember, 56, 4);
}

function serializeOptionTsNamespaceBody(value, pos) {
    return serializeOption(value, pos, serializeTsNamespaceBody, 4);
}

function serializeBoxTsNamespaceBody(value, pos) {
    return serializeBox(value, pos, serializeTsNamespaceBody, 48, 4);
}

function serializeIdentifierOrPrivateNameOrComputed(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "PrivateName":
            return serializeEnum(node, pos, 1, serializePrivateName, 4);
        case "Computed":
            return serializeEnum(node, pos, 2, serializeComputed, 4);
        default:
            throw new Error(
                "Unexpected enum option type for IdentifierOrPrivateNameOrComputed"
            );
    }
}

function serializeIdentifierOrComputed(node, pos) {
    switch (node.type) {
        case "Identifier":
            return serializeEnum(node, pos, 0, serializeIdentifier, 4);
        case "Computed":
            return serializeEnum(node, pos, 1, serializeComputed, 4);
        default:
            throw new Error(
                "Unexpected enum option type for IdentifierOrComputed"
            );
    }
}

function serializeSuperOrImportOrBoxExpression(node, pos) {
    switch (node.type) {
        case "Super":
            return serializeEnum(node, pos, 0, serializeSuper, 4);
        case "Import":
            return serializeEnum(node, pos, 1, serializeImport, 4);
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
            return serializeEnum(node, pos, 2, serializeBoxExpression, 4);
        default:
            throw new Error(
                "Unexpected enum option type for SuperOrImportOrBoxExpression"
            );
    }
}

function serializeVecExpressionOrSpread(values, pos) {
    return serializeVec(values, pos, serializeExpressionOrSpread, 20, 4);
}

function serializeOptionVecExpressionOrSpread(value, pos) {
    return serializeOption(value, pos, serializeVecExpressionOrSpread, 4);
}

function serializeVecBoxExpression(values, pos) {
    return serializeVec(values, pos, serializeBoxExpression, 4, 4);
}

function serializeVecPattern(values, pos) {
    return serializeVec(values, pos, serializePattern, 52, 4);
}

function serializeBlockStatementOrBoxExpression(node, pos) {
    switch (node.type) {
        case "BlockStatement":
            return serializeEnum(node, pos, 0, serializeBlockStatement, 4);
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
            return serializeEnum(node, pos, 1, serializeBoxExpression, 4);
        default:
            throw new Error(
                "Unexpected enum option type for BlockStatementOrBoxExpression"
            );
    }
}

function serializeBoxJSXMemberExpression(value, pos) {
    return serializeBox(value, pos, serializeJSXMemberExpression, 52, 4);
}

function serializeBoxJSXElement(value, pos) {
    return serializeBox(value, pos, serializeJSXElement, 196, 4);
}

function serializeVecJSXAttributeOrSpreadElement(values, pos) {
    return serializeVec(
        values,
        pos,
        serializeJSXAttributeOrSpreadElement,
        136,
        8
    );
}

function serializeJSXAttributeOrSpreadElement(node, pos) {
    switch (node.type) {
        case "JSXAttribute":
            return serializeEnum(node, pos, 0, serializeJSXAttribute, 8);
        case "SpreadElement":
            return serializeEnum(node, pos, 1, serializeSpreadElement, 4);
        default:
            throw new Error(
                "Unexpected enum option type for JSXAttributeOrSpreadElement"
            );
    }
}

function serializeOptionJSXAttributeValue(value, pos) {
    return serializeOption(value, pos, serializeJSXAttributeValue, 8);
}

function serializeVecJSXElementChild(values, pos) {
    return serializeVec(values, pos, serializeJSXElementChild, 48, 4);
}

function serializeOptionJSXClosingElement(value, pos) {
    return serializeOption(value, pos, serializeJSXClosingElement, 4);
}

function serializeMemberExpressionOrOptionalChainingCall(node, pos) {
    switch (node.type) {
        case "MemberExpression":
            return serializeEnum(node, pos, 0, serializeMemberExpression, 4);
        case "CallExpression":
            return serializeEnum(
                node,
                pos,
                1,
                serializeOptionalChainingCall,
                4
            );
        default:
            throw new Error(
                "Unexpected enum option type for MemberExpressionOrOptionalChainingCall"
            );
    }
}

function serializeBoxObjectProperty(value, pos) {
    return serializeBox(value, pos, serializeObjectProperty, 160, 8);
}

function serializeVecExportSpecifier(values, pos) {
    return serializeVec(values, pos, serializeExportSpecifier, 96, 4);
}

function serializeOptionStringLiteral(value, pos) {
    return serializeOption(value, pos, serializeStringLiteral, 4);
}

function serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(
    node,
    pos
) {
    switch (node.type) {
        case "ClassExpression":
            return serializeEnum(node, pos, 0, serializeClassExpression, 4);
        case "FunctionExpression":
            return serializeEnum(node, pos, 1, serializeFunctionExpression, 4);
        case "TsInterfaceDeclaration":
            return serializeEnum(
                node,
                pos,
                2,
                serializeTsInterfaceDeclaration,
                4
            );
        default:
            throw new Error(
                "Unexpected enum option type for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration"
            );
    }
}

function serialize(ast) {
    buffPos = buffLen - 44;
    uint32[buffPos >>> 2] = 1;
    int32[(buffLen >>> 2) - 1] = -40;
    serializeProgram(ast, buffPos + 4);
    alignPos(8);
    return subarray.call(buff, buffPos);
}
const { subarray } = Buffer.prototype;

function serializeEnum(node, pos, id, serialize, offset) {
    uint32[pos >>> 2] = id;
    return serialize(node, pos + offset);
}

function serializeOption(value, pos, serialize, offset) {
    if (value === null) {
        buff[pos] = 0;
        return 0;
    }
    buff[pos] = 1;
    return serialize(value, pos + offset);
}

function serializeBox(value, pos, serialize, valueLength, valueAlign) {
    alignPos(valueAlign);
    const bufferGrownByBytes = alloc(valueLength);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
    int32[pos >>> 2] = buffPos - pos;
    return serialize(value, buffPos) + bufferGrownByBytes;
}

function serializeVec(values, pos, serialize, valueLength, valueAlign) {
    const numValues = values.length;
    if (numValues === 0) {
        alignPos(valueAlign);
        const pos32 = pos >>> 2;
        int32[pos32] = buffPos - pos;
        uint32[pos32 + 1] = 0;
        return 0;
    }
    alignPos(valueAlign);
    let bufferGrownByBytes = alloc(valueLength * numValues);
    if (bufferGrownByBytes > 0) pos += bufferGrownByBytes;
    const pos32 = pos >>> 2;
    int32[pos32] = buffPos - pos;
    uint32[pos32 + 1] = numValues;
    let valuePos = buffPos,
        i = 0;
    while (true) {
        const thisBufferGrownByBytes = serialize(values[i], valuePos);
        if (thisBufferGrownByBytes > 0) {
            valuePos += thisBufferGrownByBytes;
            bufferGrownByBytes += thisBufferGrownByBytes;
        }
        if (++i === numValues) break;
        valuePos += valueLength;
    }
    return bufferGrownByBytes;
}

function resetBuffer() {
    buffLen = 65536;
    initBuffer();
}

function initBuffer() {
    buff = Buffer.allocUnsafeSlow(buffLen);
    const arrayBuffer = buff.buffer;
    uint32 = new Uint32Array(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

function alignPos(align) {
    if (align !== 1) buffPos &= 4294967296 - align;
}

function alloc(bytes) {
    const bufferGrownByBytes = bytes <= buffPos ? 0 : growBuffer(bytes);
    buffPos -= bytes;
    return bufferGrownByBytes;
}

function growBuffer(minBytes) {
    let grownByBytes = 0;
    do {
        grownByBytes += buffLen;
        buffPos += buffLen;
        buffLen *= 2;
    } while (minBytes > buffPos);
    if (buffLen > 2147483648) {
        throw new Error("Exceeded maximum serialization buffer size");
    }
    const oldBuff = buff;
    initBuffer();
    setBuff.call(buff, oldBuff, grownByBytes);
    return grownByBytes;
}
const setBuff = Buffer.prototype.set;

function writeStringToBuffer(str, pos, strLen) {
    let strPos = 0;
    do {
        const c = charCodeAt.call(str, strPos);
        if (c >= 128) return false;
        buff[pos++] = c;
    } while (++strPos < strLen);
    return true;
}
const { charCodeAt } = String.prototype;

function writeAsciiStringToBuffer(str, buff, strLen, pos) {
    let strPos = 0;
    do {
        buff[pos++] = charCodeAt.call(str, strPos);
    } while (++strPos < strLen);
}

function shiftBytesAndFree(len, allocBytes) {
    const numBytesFree = allocBytes - len;
    if (numBytesFree > 0) {
        const startPos = buffPos;
        copyWithinBuffer.call(
            buff,
            (buffPos += numBytesFree),
            startPos,
            startPos + len
        );
    }
}
const copyWithinBuffer = Buffer.prototype.copyWithin;

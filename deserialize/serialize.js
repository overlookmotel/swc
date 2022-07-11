// Generated code. Do not edit.

"use strict";

module.exports = serialize;

let pos, buffLen, buff, uint16, int32, uint32, float64;

let scratchPos32,
    scratchLen32,
    scratchBuff,
    scratchUint16,
    scratchUint32,
    scratchFloat64;

resetBuffers();

function serializeProgram(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Module":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeModule(node));
            break;
        case "Script":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeScript(node));
            break;
        default:
            throw new Error("Unexpected enum option type for Program");
    }
    return storePos32;
}

function finalizeProgram(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeModule,
                4,
                36
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeScript,
                4,
                36
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for Program");
    }
}

function serializeModule(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecModuleItem(node.body));
    writeScratchUint32(storePos32 + 2, serializeOptionJsWord(node.interpreter));
    return storePos32;
}

function finalizeModule(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
}

function serializeScript(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecStatement(node.body));
    writeScratchUint32(storePos32 + 2, serializeOptionJsWord(node.interpreter));
    return storePos32;
}

function finalizeScript(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
}

function serializeModuleItem(node) {
    const storePos32 = allocScratch(2);
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
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeModuleDeclaration(node)
            );
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
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeStatement(node));
            break;
        default:
            throw new Error("Unexpected enum option type for ModuleItem");
    }
    return storePos32;
}

function finalizeModuleItem(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeModuleDeclaration,
                4,
                156
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeStatement,
                4,
                156
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for ModuleItem");
    }
}

function serializeModuleDeclaration(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "ImportDeclaration":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeImportDeclaration(node)
            );
            break;
        case "ExportDeclaration":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportDeclaration(node)
            );
            break;
        case "ExportNamedDeclaration":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportNamedDeclaration(node)
            );
            break;
        case "ExportDefaultDeclaration":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportDefaultDeclaration(node)
            );
            break;
        case "ExportDefaultExpression":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportDefaultExpression(node)
            );
            break;
        case "ExportAllDeclaration":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportAllDeclaration(node)
            );
            break;
        case "TsImportEqualsDeclaration":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsImportEqualsDeclaration(node)
            );
            break;
        case "TsExportAssignment":
            scratchBuff[storePos32 << 2] = 7;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsExportAssignment(node)
            );
            break;
        case "TsNamespaceExportDeclaration":
            scratchBuff[storePos32 << 2] = 8;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsNamespaceExportDeclaration(node)
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for ModuleDeclaration"
            );
    }
    return storePos32;
}

function finalizeModuleDeclaration(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeImportDeclaration,
                4,
                148
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeExportDeclaration,
                4,
                148
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeExportNamedDeclaration,
                4,
                148
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeExportDefaultDeclaration,
                4,
                148
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeExportDefaultExpression,
                4,
                148
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeExportAllDeclaration,
                4,
                148
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeTsImportEqualsDeclaration,
                4,
                148
            );
            break;
        case 7:
            finalizeEnum(
                7,
                scratchUint32[storePos32 + 1],
                finalizeTsExportAssignment,
                4,
                148
            );
            break;
        case 8:
            finalizeEnum(
                8,
                scratchUint32[storePos32 + 1],
                finalizeTsNamespaceExportDeclaration,
                4,
                148
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for ModuleDeclaration");
    }
}

function serializeImportDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecImportSpecifier(node.specifiers)
    );
    writeScratchUint32(storePos32 + 2, serializeStringLiteral(node.source));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.typeOnly));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionObjectExpression(node.asserts)
    );
    return storePos32;
}

function finalizeImportDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeStringLiteral(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 3;
    finalizeOptionObjectExpression(scratchUint32[storePos32 + 4]);
}

function serializeImportSpecifier(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "ImportSpecifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeImportNamedSpecifier(node)
            );
            break;
        case "ImportDefaultSpecifier":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeImportDefaultSpecifier(node)
            );
            break;
        case "ImportNamespaceSpecifier":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeImportNamespaceSpecifier(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for ImportSpecifier");
    }
    return storePos32;
}

function finalizeImportSpecifier(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeImportNamedSpecifier,
                4,
                84
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeImportDefaultSpecifier,
                4,
                84
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeImportNamespaceSpecifier,
                4,
                84
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for ImportSpecifier");
    }
}

function serializeImportNamedSpecifier(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.local));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionModuleExportName(node.imported)
    );
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.isTypeOnly));
    return storePos32;
}

function finalizeImportNamedSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeOptionModuleExportName(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 3;
}

function serializeImportDefaultSpecifier(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.local));
    return storePos32;
}

function finalizeImportDefaultSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeImportNamespaceSpecifier(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.local));
    return storePos32;
}

function finalizeImportNamespaceSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeExportDeclaration(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeDeclaration(node.declaration));
    return storePos32;
}

function finalizeExportDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeDeclaration(scratchUint32[storePos32 + 1]);
}

function serializeExportNamedDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecExportSpecifier(node.specifiers)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionStringLiteral(node.source)
    );
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.typeOnly));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionObjectExpression(node.asserts)
    );
    return storePos32;
}

function finalizeExportNamedDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionStringLiteral(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 3;
    finalizeOptionObjectExpression(scratchUint32[storePos32 + 4]);
}

function serializeExportSpecifier(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "ExportNamespaceSpecifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportNamespaceSpecifier(node)
            );
            break;
        case "ExportDefaultSpecifier":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportDefaultSpecifier(node)
            );
            break;
        case "ExportSpecifier":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeExportNamedSpecifier(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for ExportSpecifier");
    }
    return storePos32;
}

function finalizeExportSpecifier(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeExportNamespaceSpecifier,
                4,
                96
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeExportDefaultSpecifier,
                4,
                96
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeExportNamedSpecifier,
                4,
                96
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for ExportSpecifier");
    }
}

function serializeExportNamespaceSpecifier(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeModuleExportName(node.name));
    return storePos32;
}

function finalizeExportNamespaceSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeModuleExportName(scratchUint32[storePos32 + 1]);
}

function serializeExportDefaultSpecifier(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.exported));
    return storePos32;
}

function finalizeExportDefaultSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeExportNamedSpecifier(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeModuleExportName(node.orig));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionModuleExportName(node.exported)
    );
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.isTypeOnly));
    return storePos32;
}

function finalizeExportNamedSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeModuleExportName(scratchUint32[storePos32 + 1]);
    finalizeOptionModuleExportName(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 3;
}

function serializeExportDefaultDeclaration(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeDefaultDecl(node.decl));
    return storePos32;
}

function finalizeExportDefaultDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeDefaultDecl(scratchUint32[storePos32 + 1]);
}

function serializeDefaultDecl(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "ClassExpression":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeClassExpression(node));
            break;
        case "FunctionExpression":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeFunctionExpression(node)
            );
            break;
        case "TsInterfaceDeclaration":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsInterfaceDeclaration(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for DefaultDecl");
    }
    return storePos32;
}

function finalizeDefaultDecl(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeClassExpression,
                4,
                132
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeFunctionExpression,
                4,
                132
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeTsInterfaceDeclaration,
                4,
                132
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for DefaultDecl");
    }
}

function serializeExportDefaultExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeExportDefaultExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeExportAllDeclaration(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeStringLiteral(node.source));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionObjectExpression(node.asserts)
    );
    return storePos32;
}

function finalizeExportAllDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeStringLiteral(scratchUint32[storePos32 + 1]);
    finalizeOptionObjectExpression(scratchUint32[storePos32 + 2]);
}

function serializeModuleExportName(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "StringLiteral":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeStringLiteral(node));
            break;
        default:
            throw new Error("Unexpected enum option type for ModuleExportName");
    }
    return storePos32;
}

function finalizeModuleExportName(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                36
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeStringLiteral,
                4,
                36
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for ModuleExportName");
    }
}

function serializeStatement(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "BlockStatement":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeBlockStatement(node));
            break;
        case "EmptyStatement":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeEmptyStatement(node));
            break;
        case "DebuggerStatement":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeDebuggerStatement(node)
            );
            break;
        case "WithStatement":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeWithStatement(node));
            break;
        case "ReturnStatement":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeReturnStatement(node));
            break;
        case "LabeledStatement":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeLabeledStatement(node));
            break;
        case "BreakStatement":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeBreakStatement(node));
            break;
        case "ContinueStatement":
            scratchBuff[storePos32 << 2] = 7;
            writeScratchUint32(
                storePos32 + 1,
                serializeContinueStatement(node)
            );
            break;
        case "IfStatement":
            scratchBuff[storePos32 << 2] = 8;
            writeScratchUint32(storePos32 + 1, serializeIfStatement(node));
            break;
        case "SwitchStatement":
            scratchBuff[storePos32 << 2] = 9;
            writeScratchUint32(storePos32 + 1, serializeSwitchStatement(node));
            break;
        case "ThrowStatement":
            scratchBuff[storePos32 << 2] = 10;
            writeScratchUint32(storePos32 + 1, serializeThrowStatement(node));
            break;
        case "TryStatement":
            scratchBuff[storePos32 << 2] = 11;
            writeScratchUint32(storePos32 + 1, serializeTryStatement(node));
            break;
        case "WhileStatement":
            scratchBuff[storePos32 << 2] = 12;
            writeScratchUint32(storePos32 + 1, serializeWhileStatement(node));
            break;
        case "DoWhileStatement":
            scratchBuff[storePos32 << 2] = 13;
            writeScratchUint32(storePos32 + 1, serializeDoWhileStatement(node));
            break;
        case "ForStatement":
            scratchBuff[storePos32 << 2] = 14;
            writeScratchUint32(storePos32 + 1, serializeForStatement(node));
            break;
        case "ForInStatement":
            scratchBuff[storePos32 << 2] = 15;
            writeScratchUint32(storePos32 + 1, serializeForInStatement(node));
            break;
        case "ForOfStatement":
            scratchBuff[storePos32 << 2] = 16;
            writeScratchUint32(storePos32 + 1, serializeForOfStatement(node));
            break;
        case "ClassDeclaration":
        case "FunctionDeclaration":
        case "VariableDeclaration":
        case "TsInterfaceDeclaration":
        case "TsTypeAliasDeclaration":
        case "TsEnumDeclaration":
        case "TsModuleDeclaration":
            scratchBuff[storePos32 << 2] = 17;
            writeScratchUint32(storePos32 + 1, serializeDeclaration(node));
            break;
        case "ExpressionStatement":
            scratchBuff[storePos32 << 2] = 18;
            writeScratchUint32(
                storePos32 + 1,
                serializeExpressionStatement(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for Statement");
    }
    return storePos32;
}

function finalizeStatement(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeBlockStatement,
                4,
                152
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeEmptyStatement,
                4,
                152
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeDebuggerStatement,
                4,
                152
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeWithStatement,
                4,
                152
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeReturnStatement,
                4,
                152
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeLabeledStatement,
                4,
                152
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeBreakStatement,
                4,
                152
            );
            break;
        case 7:
            finalizeEnum(
                7,
                scratchUint32[storePos32 + 1],
                finalizeContinueStatement,
                4,
                152
            );
            break;
        case 8:
            finalizeEnum(
                8,
                scratchUint32[storePos32 + 1],
                finalizeIfStatement,
                4,
                152
            );
            break;
        case 9:
            finalizeEnum(
                9,
                scratchUint32[storePos32 + 1],
                finalizeSwitchStatement,
                4,
                152
            );
            break;
        case 10:
            finalizeEnum(
                10,
                scratchUint32[storePos32 + 1],
                finalizeThrowStatement,
                4,
                152
            );
            break;
        case 11:
            finalizeEnum(
                11,
                scratchUint32[storePos32 + 1],
                finalizeTryStatement,
                4,
                152
            );
            break;
        case 12:
            finalizeEnum(
                12,
                scratchUint32[storePos32 + 1],
                finalizeWhileStatement,
                4,
                152
            );
            break;
        case 13:
            finalizeEnum(
                13,
                scratchUint32[storePos32 + 1],
                finalizeDoWhileStatement,
                4,
                152
            );
            break;
        case 14:
            finalizeEnum(
                14,
                scratchUint32[storePos32 + 1],
                finalizeForStatement,
                4,
                152
            );
            break;
        case 15:
            finalizeEnum(
                15,
                scratchUint32[storePos32 + 1],
                finalizeForInStatement,
                4,
                152
            );
            break;
        case 16:
            finalizeEnum(
                16,
                scratchUint32[storePos32 + 1],
                finalizeForOfStatement,
                4,
                152
            );
            break;
        case 17:
            finalizeEnum(
                17,
                scratchUint32[storePos32 + 1],
                finalizeDeclaration,
                4,
                152
            );
            break;
        case 18:
            finalizeEnum(
                18,
                scratchUint32[storePos32 + 1],
                finalizeExpressionStatement,
                4,
                152
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for Statement");
    }
}

function serializeBlockStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecStatement(node.stmts));
    return storePos32;
}

function finalizeBlockStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeEmptyStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeEmptyStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeDebuggerStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeDebuggerStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeWithStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.object));
    writeScratchUint32(storePos32 + 2, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeWithStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeReturnStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionBoxExpression(node.argument)
    );
    return storePos32;
}

function finalizeReturnStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 1]);
}

function serializeLabeledStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.label));
    writeScratchUint32(storePos32 + 2, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeLabeledStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeBreakStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionIdentifier(node.label));
    return storePos32;
}

function finalizeBreakStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeContinueStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionIdentifier(node.label));
    return storePos32;
}

function finalizeContinueStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeIfStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.test));
    writeScratchUint32(storePos32 + 2, serializeBoxStatement(node.consequent));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionBoxStatement(node.alternate)
    );
    return storePos32;
}

function finalizeIfStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeOptionBoxStatement(scratchUint32[storePos32 + 3]);
}

function serializeSwitchStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeBoxExpression(node.discriminant)
    );
    writeScratchUint32(storePos32 + 2, serializeVecSwitchCase(node.cases));
    return storePos32;
}

function finalizeSwitchStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
}

function serializeSwitchCase(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionBoxExpression(node.test));
    writeScratchUint32(storePos32 + 2, serializeVecStatement(node.consequent));
    return storePos32;
}

function finalizeSwitchCase(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
}

function serializeThrowStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeThrowStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTryStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBlockStatement(node.block));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionCatchClause(node.handler)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionBlockStatement(node.finalizer)
    );
    return storePos32;
}

function finalizeTryStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBlockStatement(scratchUint32[storePos32 + 1]);
    finalizeOptionCatchClause(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
}

function serializeCatchClause(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionPattern(node.param));
    writeScratchUint32(storePos32 + 2, serializeBlockStatement(node.body));
    return storePos32;
}

function finalizeCatchClause(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionPattern(scratchUint32[storePos32 + 1]);
    finalizeBlockStatement(scratchUint32[storePos32 + 2]);
}

function serializeWhileStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.test));
    writeScratchUint32(storePos32 + 2, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeWhileStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeDoWhileStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.test));
    writeScratchUint32(storePos32 + 2, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeDoWhileStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeForStatement(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionVariableDeclarationOrBoxExpression(node.init)
    );
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.test));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionBoxExpression(node.update)
    );
    writeScratchUint32(storePos32 + 4, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeForStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionVariableDeclarationOrBoxExpression(
        scratchUint32[storePos32 + 1]
    );
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 3]);
    finalizeBox(scratchUint32[storePos32 + 4]);
}

function serializeForInStatement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVariableDeclarationOrPattern(node.left)
    );
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.right));
    writeScratchUint32(storePos32 + 3, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeForInStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVariableDeclarationOrPattern(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeForOfStatement(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionSpan(node.await));
    writeScratchUint32(
        storePos32 + 2,
        serializeVariableDeclarationOrPattern(node.left)
    );
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.right));
    writeScratchUint32(storePos32 + 4, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeForOfStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionSpan(scratchUint32[storePos32 + 1]);
    finalizeVariableDeclarationOrPattern(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
    finalizeBox(scratchUint32[storePos32 + 4]);
}

function serializeExpressionStatement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeExpressionStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeDeclaration(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "ClassDeclaration":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeClassDeclaration(node));
            break;
        case "FunctionDeclaration":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeFunctionDeclaration(node)
            );
            break;
        case "VariableDeclaration":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeVariableDeclaration(node)
            );
            break;
        case "TsInterfaceDeclaration":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsInterfaceDeclaration(node)
            );
            break;
        case "TsTypeAliasDeclaration":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsTypeAliasDeclaration(node)
            );
            break;
        case "TsEnumDeclaration":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsEnumDeclaration(node)
            );
            break;
        case "TsModuleDeclaration":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsModuleDeclaration(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for Declaration");
    }
    return storePos32;
}

function finalizeDeclaration(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeClassDeclaration,
                4,
                132
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeFunctionDeclaration,
                4,
                132
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeVariableDeclaration,
                4,
                132
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeTsInterfaceDeclaration,
                4,
                132
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeTsTypeAliasDeclaration,
                4,
                132
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeTsEnumDeclaration,
                4,
                132
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeTsModuleDeclaration,
                4,
                132
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for Declaration");
    }
}

function serializeVariableDeclaration(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVariableDeclarationKind(node.kind)
    );
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.declare));
    writeScratchUint32(
        storePos32 + 3,
        serializeVecVariableDeclarator(node.declarations)
    );
    return storePos32;
}

function finalizeVariableDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeVec(scratchUint32[storePos32 + 3]);
}

function serializeVariableDeclarationKind(value) {
    switch (value) {
        case "var":
            return 256;
        case "let":
            return 257;
        case "const":
            return 258;
        default:
            throw new Error(
                "Unexpected enum value for VariableDeclarationKind"
            );
    }
}

function serializeVariableDeclarator(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePattern(node.id));
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.init));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.definite));
    return storePos32;
}

function finalizeVariableDeclarator(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizePattern(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 3;
}

function serializeFunctionDeclaration(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 3, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 4, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionBlockStatement(node.body)
    );
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.async));
    writeScratchUint32(
        storePos32 + 8,
        serializeOptionTsTypeParameterDeclaration(node.typeParameters)
    );
    writeScratchUint32(
        storePos32 + 9,
        serializeOptionTsTypeAnnotation(node.returnType)
    );
    return storePos32;
}

function finalizeFunctionDeclaration(storePos32) {
    finalizeIdentifier(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeVec(scratchUint32[storePos32 + 3]);
    finalizeSpan(scratchUint32[storePos32 + 4]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 5]);
    finalizeBoolean(scratchUint32[storePos32 + 6]);
    finalizeBoolean(scratchUint32[storePos32 + 7]);
    pos += 2;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 8]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 9]);
}

function serializeFunctionExpression(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeOptionIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 1, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 2, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 3, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionBlockStatement(node.body)
    );
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.async));
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeParameterDeclaration(node.typeParameters)
    );
    writeScratchUint32(
        storePos32 + 8,
        serializeOptionTsTypeAnnotation(node.returnType)
    );
    return storePos32;
}

function finalizeFunctionExpression(storePos32) {
    finalizeOptionIdentifier(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeSpan(scratchUint32[storePos32 + 3]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 4]);
    finalizeBoolean(scratchUint32[storePos32 + 5]);
    finalizeBoolean(scratchUint32[storePos32 + 6]);
    pos += 2;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 7]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 8]);
}

function serializeFn(node) {
    const storePos32 = allocScratch(8);
    writeScratchUint32(storePos32, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 1, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 2, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionBlockStatement(node.body)
    );
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.async));
    writeScratchUint32(
        storePos32 + 6,
        serializeOptionTsTypeParameterDeclaration(node.typeParameters)
    );
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeAnnotation(node.returnType)
    );
    return storePos32;
}

function finalizeFn(storePos32) {
    finalizeVec(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeSpan(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    finalizeBoolean(scratchUint32[storePos32 + 5]);
    pos += 2;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 6]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 7]);
}

function serializeArrowFunctionExpression(node) {
    const storePos32 = allocScratch(8);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecPattern(node.params));
    writeScratchUint32(
        storePos32 + 2,
        serializeBlockStatementOrBoxExpression(node.body)
    );
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.async));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.generator));
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionTsTypeParameterDeclaration(node.typeParameters)
    );
    writeScratchUint32(
        storePos32 + 6,
        serializeOptionTsTypeAnnotation(node.returnType)
    );
    return storePos32;
}

function finalizeArrowFunctionExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeBlockStatementOrBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 2;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 5]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 6]);
}

function serializeParameter(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 2, serializePattern(node.pat));
    return storePos32;
}

function finalizeParameter(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizePattern(scratchUint32[storePos32 + 2]);
}

function serializeDecorator(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeDecorator(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeClassDeclaration(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 3, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 4, serializeVecClassMember(node.body));
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionBoxExpression(node.superClass)
    );
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.isAbstract));
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    writeScratchUint32(
        storePos32 + 8,
        serializeOptionTsTypeParameterInstantiation(node.superTypeParams)
    );
    writeScratchUint32(
        storePos32 + 9,
        serializeVecTsExpressionWithTypeArguments(node.implements)
    );
    return storePos32;
}

function finalizeClassDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeVec(scratchUint32[storePos32 + 3]);
    finalizeVec(scratchUint32[storePos32 + 4]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 5]);
    finalizeBoolean(scratchUint32[storePos32 + 6]);
    pos += 3;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 7]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 8]);
    finalizeVec(scratchUint32[storePos32 + 9]);
}

function serializeClassExpression(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionIdentifier(node.identifier)
    );
    writeScratchUint32(storePos32 + 2, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 3, serializeVecClassMember(node.body));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionBoxExpression(node.superClass)
    );
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isAbstract));
    writeScratchUint32(
        storePos32 + 6,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeParameterInstantiation(node.superTypeParams)
    );
    writeScratchUint32(
        storePos32 + 8,
        serializeVecTsExpressionWithTypeArguments(node.implements)
    );
    return storePos32;
}

function finalizeClassExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionIdentifier(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeVec(scratchUint32[storePos32 + 3]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 4]);
    finalizeBoolean(scratchUint32[storePos32 + 5]);
    pos += 3;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 6]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 7]);
    finalizeVec(scratchUint32[storePos32 + 8]);
}

function serializeClassMember(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Constructor":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeConstructor(node));
            break;
        case "ClassMethod":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeClassMethod(node));
            break;
        case "PrivateMethod":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializePrivateMethod(node));
            break;
        case "ClassProperty":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeClassProperty(node));
            break;
        case "PrivateProperty":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializePrivateProperty(node));
            break;
        case "TsIndexSignature":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeTsIndexSignature(node));
            break;
        case "EmptyStatement":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeEmptyStatement(node));
            break;
        case "StaticBlock":
            scratchBuff[storePos32 << 2] = 7;
            writeScratchUint32(storePos32 + 1, serializeStaticBlock(node));
            break;
        default:
            throw new Error("Unexpected enum option type for ClassMember");
    }
    return storePos32;
}

function finalizeClassMember(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeConstructor,
                8,
                192
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeClassMethod,
                8,
                192
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizePrivateMethod,
                4,
                192
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeClassProperty,
                8,
                192
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizePrivateProperty,
                4,
                192
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeTsIndexSignature,
                4,
                192
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeEmptyStatement,
                4,
                192
            );
            break;
        case 7:
            finalizeEnum(
                7,
                scratchUint32[storePos32 + 1],
                finalizeStaticBlock,
                4,
                192
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for ClassMember");
    }
}

function serializeConstructor(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePropertyName(node.key));
    writeScratchUint32(
        storePos32 + 2,
        serializeVecTsParameterPropertyOrParameter(node.params)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionBlockStatement(node.body)
    );
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionAccessibility(node.accessibility)
    );
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isOptional));
    return storePos32;
}

function finalizeConstructor(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    pos += 4;
    finalizePropertyName(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 4]);
    finalizeBoolean(scratchUint32[storePos32 + 5]);
    pos += 7;
}

function serializeClassMethod(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 2, serializeFn(node.function));
    writeScratchUint32(storePos32 + 3, serializeMethodKind(node.kind));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isStatic));
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionAccessibility(node.accessibility)
    );
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOverride));
    return storePos32;
}

function finalizeClassMethod(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    pos += 4;
    finalizePropertyName(scratchUint32[storePos32 + 1]);
    finalizeFn(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 3;
    finalizeOptionAccessibility(scratchUint32[storePos32 + 5]);
    finalizeBoolean(scratchUint32[storePos32 + 6]);
    finalizeBoolean(scratchUint32[storePos32 + 7]);
    finalizeBoolean(scratchUint32[storePos32 + 8]);
    pos += 1;
}

function serializePrivateMethod(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePrivateName(node.key));
    writeScratchUint32(storePos32 + 2, serializeFn(node.function));
    writeScratchUint32(storePos32 + 3, serializeMethodKind(node.kind));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isStatic));
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionAccessibility(node.accessibility)
    );
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOverride));
    return storePos32;
}

function finalizePrivateMethod(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizePrivateName(scratchUint32[storePos32 + 1]);
    finalizeFn(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 3;
    finalizeOptionAccessibility(scratchUint32[storePos32 + 5]);
    finalizeBoolean(scratchUint32[storePos32 + 6]);
    finalizeBoolean(scratchUint32[storePos32 + 7]);
    finalizeBoolean(scratchUint32[storePos32 + 8]);
    pos += 1;
}

function serializeClassProperty(node) {
    const storePos32 = allocScratch(14);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePropertyName(node.key));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionBoxExpression(node.value)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isStatic));
    writeScratchUint32(storePos32 + 5, serializeVecDecorator(node.decorators));
    writeScratchUint32(
        storePos32 + 6,
        serializeOptionAccessibility(node.accessibility)
    );
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 9, serializeBoolean(node.isOverride));
    writeScratchUint32(storePos32 + 10, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 11, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 12, serializeBoolean(node.definite));
    return storePos32;
}

function finalizeClassProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    pos += 4;
    finalizePropertyName(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 3;
    finalizeVec(scratchUint32[storePos32 + 5]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 6]);
    finalizeBoolean(scratchUint32[storePos32 + 7]);
    finalizeBoolean(scratchUint32[storePos32 + 8]);
    finalizeBoolean(scratchUint32[storePos32 + 9]);
    finalizeBoolean(scratchUint32[storePos32 + 10]);
    finalizeBoolean(scratchUint32[storePos32 + 11]);
    finalizeBoolean(scratchUint32[storePos32 + 12]);
    pos += 2;
}

function serializePrivateProperty(node) {
    const storePos32 = allocScratch(12);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePrivateName(node.key));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionBoxExpression(node.value)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isStatic));
    writeScratchUint32(storePos32 + 5, serializeVecDecorator(node.decorators));
    writeScratchUint32(
        storePos32 + 6,
        serializeOptionAccessibility(node.accessibility)
    );
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOverride));
    writeScratchUint32(storePos32 + 9, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 10, serializeBoolean(node.definite));
    return storePos32;
}

function finalizePrivateProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizePrivateName(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 3;
    finalizeVec(scratchUint32[storePos32 + 5]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 6]);
    finalizeBoolean(scratchUint32[storePos32 + 7]);
    finalizeBoolean(scratchUint32[storePos32 + 8]);
    finalizeBoolean(scratchUint32[storePos32 + 9]);
    finalizeBoolean(scratchUint32[storePos32 + 10]);
}

function serializeStaticBlock(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBlockStatement(node.body));
    return storePos32;
}

function finalizeStaticBlock(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBlockStatement(scratchUint32[storePos32 + 1]);
}

function serializeMethodKind(value) {
    switch (value) {
        case "method":
            return 256;
        case "getter":
            return 257;
        case "setter":
            return 258;
        default:
            throw new Error("Unexpected enum value for MethodKind");
    }
}

function serializePattern(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeBindingIdentifier(node)
            );
            break;
        case "ArrayPattern":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeArrayPattern(node));
            break;
        case "RestElement":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeRestElement(node));
            break;
        case "ObjectPattern":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeObjectPattern(node));
            break;
        case "AssignmentPattern":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(
                storePos32 + 1,
                serializeAssignmentPattern(node)
            );
            break;
        case "Invalid":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeInvalid(node));
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
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeBoxExpression(node));
            break;
        default:
            throw new Error("Unexpected enum option type for Pattern");
    }
    return storePos32;
}

function finalizePattern(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeBindingIdentifier,
                4,
                52
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeArrayPattern,
                4,
                52
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeRestElement,
                4,
                52
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeObjectPattern,
                4,
                52
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeAssignmentPattern,
                4,
                52
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeInvalid,
                4,
                52
            );
            break;
        case 6:
            finalizeEnum(6, scratchUint32[storePos32 + 1], finalizeBox, 4, 52);
            break;
        default:
            throw new Error("Unexpected enum option ID for Pattern");
    }
}

function serializeBindingIdentifier(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.value));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeBindingIdentifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeArrayPattern(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecOptionPattern(node.elements)
    );
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeArrayPattern(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeRestElement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.rest));
    writeScratchUint32(storePos32 + 2, serializeBoxPattern(node.argument));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeRestElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeObjectPattern(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecObjectPatternProperty(node.properties)
    );
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeObjectPattern(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeObjectPatternProperty(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "KeyValuePatternProperty":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeKeyValuePatternProperty(node)
            );
            break;
        case "AssignmentPatternProperty":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeAssignmentPatternProperty(node)
            );
            break;
        case "RestElement":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeRestElement(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for ObjectPatternProperty"
            );
    }
    return storePos32;
}

function finalizeObjectPatternProperty(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeKeyValuePatternProperty,
                8,
                64
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeAssignmentPatternProperty,
                4,
                64
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeRestElement,
                4,
                64
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for ObjectPatternProperty"
            );
    }
}

function serializeKeyValuePatternProperty(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeBoxPattern(node.value));
    return storePos32;
}

function finalizeKeyValuePatternProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    pos += 4;
}

function serializeAssignmentPatternProperty(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.key));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionBoxExpression(node.value)
    );
    return storePos32;
}

function finalizeAssignmentPatternProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
}

function serializeAssignmentPattern(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxPattern(node.left));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.right));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeAssignmentPattern(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeExpression(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "ThisExpression":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeThisExpression(node));
            break;
        case "ArrayExpression":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeArrayExpression(node));
            break;
        case "ObjectExpression":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeObjectExpression(node));
            break;
        case "FunctionExpression":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(
                storePos32 + 1,
                serializeFunctionExpression(node)
            );
            break;
        case "UnaryExpression":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeUnaryExpression(node));
            break;
        case "UpdateExpression":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeUpdateExpression(node));
            break;
        case "BinaryExpression":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeBinaryExpression(node));
            break;
        case "AssignmentExpression":
            scratchBuff[storePos32 << 2] = 7;
            writeScratchUint32(
                storePos32 + 1,
                serializeAssignmentExpression(node)
            );
            break;
        case "MemberExpression":
            scratchBuff[storePos32 << 2] = 8;
            writeScratchUint32(storePos32 + 1, serializeMemberExpression(node));
            break;
        case "SuperPropExpression":
            scratchBuff[storePos32 << 2] = 9;
            writeScratchUint32(
                storePos32 + 1,
                serializeSuperPropExpression(node)
            );
            break;
        case "ConditionalExpression":
            scratchBuff[storePos32 << 2] = 10;
            writeScratchUint32(
                storePos32 + 1,
                serializeConditionalExpression(node)
            );
            break;
        case "CallExpression":
            scratchBuff[storePos32 << 2] = 11;
            writeScratchUint32(storePos32 + 1, serializeCallExpression(node));
            break;
        case "NewExpression":
            scratchBuff[storePos32 << 2] = 12;
            writeScratchUint32(storePos32 + 1, serializeNewExpression(node));
            break;
        case "SequenceExpression":
            scratchBuff[storePos32 << 2] = 13;
            writeScratchUint32(
                storePos32 + 1,
                serializeSequenceExpression(node)
            );
            break;
        case "Identifier":
            scratchBuff[storePos32 << 2] = 14;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
            scratchBuff[storePos32 << 2] = 15;
            writeScratchUint32(storePos32 + 1, serializeLiteral(node));
            break;
        case "TemplateLiteral":
            scratchBuff[storePos32 << 2] = 16;
            writeScratchUint32(storePos32 + 1, serializeTemplateLiteral(node));
            break;
        case "TaggedTemplateExpression":
            scratchBuff[storePos32 << 2] = 17;
            writeScratchUint32(
                storePos32 + 1,
                serializeTaggedTemplateExpression(node)
            );
            break;
        case "ArrowFunctionExpression":
            scratchBuff[storePos32 << 2] = 18;
            writeScratchUint32(
                storePos32 + 1,
                serializeArrowFunctionExpression(node)
            );
            break;
        case "ClassExpression":
            scratchBuff[storePos32 << 2] = 19;
            writeScratchUint32(storePos32 + 1, serializeClassExpression(node));
            break;
        case "YieldExpression":
            scratchBuff[storePos32 << 2] = 20;
            writeScratchUint32(storePos32 + 1, serializeYieldExpression(node));
            break;
        case "MetaProperty":
            scratchBuff[storePos32 << 2] = 21;
            writeScratchUint32(storePos32 + 1, serializeMetaProperty(node));
            break;
        case "AwaitExpression":
            scratchBuff[storePos32 << 2] = 22;
            writeScratchUint32(storePos32 + 1, serializeAwaitExpression(node));
            break;
        case "ParenthesisExpression":
            scratchBuff[storePos32 << 2] = 23;
            writeScratchUint32(
                storePos32 + 1,
                serializeParenthesisExpression(node)
            );
            break;
        case "JSXMemberExpression":
            scratchBuff[storePos32 << 2] = 24;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXMemberExpression(node)
            );
            break;
        case "JSXNamespacedName":
            scratchBuff[storePos32 << 2] = 25;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXNamespacedName(node)
            );
            break;
        case "JSXEmptyExpression":
            scratchBuff[storePos32 << 2] = 26;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXEmptyExpression(node)
            );
            break;
        case "JSXElement":
            scratchBuff[storePos32 << 2] = 27;
            writeScratchUint32(storePos32 + 1, serializeBoxJSXElement(node));
            break;
        case "JSXFragment":
            scratchBuff[storePos32 << 2] = 28;
            writeScratchUint32(storePos32 + 1, serializeJSXFragment(node));
            break;
        case "TsTypeAssertion":
            scratchBuff[storePos32 << 2] = 29;
            writeScratchUint32(storePos32 + 1, serializeTsTypeAssertion(node));
            break;
        case "TsConstAssertion":
            scratchBuff[storePos32 << 2] = 30;
            writeScratchUint32(storePos32 + 1, serializeTsConstAssertion(node));
            break;
        case "TsNonNullExpression":
            scratchBuff[storePos32 << 2] = 31;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsNonNullExpression(node)
            );
            break;
        case "TsAsExpression":
            scratchBuff[storePos32 << 2] = 32;
            writeScratchUint32(storePos32 + 1, serializeTsAsExpression(node));
            break;
        case "TsInstantiation":
            scratchBuff[storePos32 << 2] = 33;
            writeScratchUint32(storePos32 + 1, serializeTsInstantiation(node));
            break;
        case "PrivateName":
            scratchBuff[storePos32 << 2] = 34;
            writeScratchUint32(storePos32 + 1, serializePrivateName(node));
            break;
        case "OptionalChainingExpression":
            scratchBuff[storePos32 << 2] = 35;
            writeScratchUint32(
                storePos32 + 1,
                serializeOptionalChainingExpression(node)
            );
            break;
        case "Invalid":
            scratchBuff[storePos32 << 2] = 36;
            writeScratchUint32(storePos32 + 1, serializeInvalid(node));
            break;
        default:
            throw new Error("Unexpected enum option type for Expression");
    }
    return storePos32;
}

function finalizeExpression(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeThisExpression,
                4,
                136
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeArrayExpression,
                4,
                136
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeObjectExpression,
                4,
                136
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeFunctionExpression,
                4,
                136
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeUnaryExpression,
                4,
                136
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeUpdateExpression,
                4,
                136
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeBinaryExpression,
                4,
                136
            );
            break;
        case 7:
            finalizeEnum(
                7,
                scratchUint32[storePos32 + 1],
                finalizeAssignmentExpression,
                4,
                136
            );
            break;
        case 8:
            finalizeEnum(
                8,
                scratchUint32[storePos32 + 1],
                finalizeMemberExpression,
                4,
                136
            );
            break;
        case 9:
            finalizeEnum(
                9,
                scratchUint32[storePos32 + 1],
                finalizeSuperPropExpression,
                4,
                136
            );
            break;
        case 10:
            finalizeEnum(
                10,
                scratchUint32[storePos32 + 1],
                finalizeConditionalExpression,
                4,
                136
            );
            break;
        case 11:
            finalizeEnum(
                11,
                scratchUint32[storePos32 + 1],
                finalizeCallExpression,
                4,
                136
            );
            break;
        case 12:
            finalizeEnum(
                12,
                scratchUint32[storePos32 + 1],
                finalizeNewExpression,
                4,
                136
            );
            break;
        case 13:
            finalizeEnum(
                13,
                scratchUint32[storePos32 + 1],
                finalizeSequenceExpression,
                4,
                136
            );
            break;
        case 14:
            finalizeEnum(
                14,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                136
            );
            break;
        case 15:
            finalizeEnum(
                15,
                scratchUint32[storePos32 + 1],
                finalizeLiteral,
                8,
                136
            );
            break;
        case 16:
            finalizeEnum(
                16,
                scratchUint32[storePos32 + 1],
                finalizeTemplateLiteral,
                4,
                136
            );
            break;
        case 17:
            finalizeEnum(
                17,
                scratchUint32[storePos32 + 1],
                finalizeTaggedTemplateExpression,
                4,
                136
            );
            break;
        case 18:
            finalizeEnum(
                18,
                scratchUint32[storePos32 + 1],
                finalizeArrowFunctionExpression,
                4,
                136
            );
            break;
        case 19:
            finalizeEnum(
                19,
                scratchUint32[storePos32 + 1],
                finalizeClassExpression,
                4,
                136
            );
            break;
        case 20:
            finalizeEnum(
                20,
                scratchUint32[storePos32 + 1],
                finalizeYieldExpression,
                4,
                136
            );
            break;
        case 21:
            finalizeEnum(
                21,
                scratchUint32[storePos32 + 1],
                finalizeMetaProperty,
                4,
                136
            );
            break;
        case 22:
            finalizeEnum(
                22,
                scratchUint32[storePos32 + 1],
                finalizeAwaitExpression,
                4,
                136
            );
            break;
        case 23:
            finalizeEnum(
                23,
                scratchUint32[storePos32 + 1],
                finalizeParenthesisExpression,
                4,
                136
            );
            break;
        case 24:
            finalizeEnum(
                24,
                scratchUint32[storePos32 + 1],
                finalizeJSXMemberExpression,
                4,
                136
            );
            break;
        case 25:
            finalizeEnum(
                25,
                scratchUint32[storePos32 + 1],
                finalizeJSXNamespacedName,
                4,
                136
            );
            break;
        case 26:
            finalizeEnum(
                26,
                scratchUint32[storePos32 + 1],
                finalizeJSXEmptyExpression,
                4,
                136
            );
            break;
        case 27:
            finalizeEnum(
                27,
                scratchUint32[storePos32 + 1],
                finalizeBox,
                4,
                136
            );
            break;
        case 28:
            finalizeEnum(
                28,
                scratchUint32[storePos32 + 1],
                finalizeJSXFragment,
                4,
                136
            );
            break;
        case 29:
            finalizeEnum(
                29,
                scratchUint32[storePos32 + 1],
                finalizeTsTypeAssertion,
                4,
                136
            );
            break;
        case 30:
            finalizeEnum(
                30,
                scratchUint32[storePos32 + 1],
                finalizeTsConstAssertion,
                4,
                136
            );
            break;
        case 31:
            finalizeEnum(
                31,
                scratchUint32[storePos32 + 1],
                finalizeTsNonNullExpression,
                4,
                136
            );
            break;
        case 32:
            finalizeEnum(
                32,
                scratchUint32[storePos32 + 1],
                finalizeTsAsExpression,
                4,
                136
            );
            break;
        case 33:
            finalizeEnum(
                33,
                scratchUint32[storePos32 + 1],
                finalizeTsInstantiation,
                4,
                136
            );
            break;
        case 34:
            finalizeEnum(
                34,
                scratchUint32[storePos32 + 1],
                finalizePrivateName,
                4,
                136
            );
            break;
        case 35:
            finalizeEnum(
                35,
                scratchUint32[storePos32 + 1],
                finalizeOptionalChainingExpression,
                4,
                136
            );
            break;
        case 36:
            finalizeEnum(
                36,
                scratchUint32[storePos32 + 1],
                finalizeInvalid,
                4,
                136
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for Expression");
    }
}

function serializeThisExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeThisExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeArrayExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecOptionExprOrSpread(node.elements)
    );
    return storePos32;
}

function finalizeArrayExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeUnaryExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeUnaryOperator(node.operator));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeUnaryExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeUnaryOperator(value) {
    switch (value) {
        case "-":
            return 256;
        case "+":
            return 257;
        case "!":
            return 258;
        case "~":
            return 259;
        case "typeof":
            return 260;
        case "void":
            return 261;
        case "delete":
            return 262;
        default:
            throw new Error("Unexpected enum value for UnaryOperator");
    }
}

function serializeUpdateExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeUpdateOperator(node.operator));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.prefix));
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeUpdateExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeUpdateOperator(value) {
    switch (value) {
        case "++":
            return 256;
        case "--":
            return 257;
        default:
            throw new Error("Unexpected enum value for UpdateOperator");
    }
}

function serializeBinaryExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBinaryOperator(node.operator));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.left));
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.right));
    return storePos32;
}

function finalizeBinaryExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeBinaryOperator(value) {
    switch (value) {
        case "==":
            return 256;
        case "!=":
            return 257;
        case "===":
            return 258;
        case "!==":
            return 259;
        case "<":
            return 260;
        case "<=":
            return 261;
        case ">":
            return 262;
        case ">=":
            return 263;
        case "<<":
            return 264;
        case ">>":
            return 265;
        case ">>>":
            return 266;
        case "+":
            return 267;
        case "-":
            return 268;
        case "*":
            return 269;
        case "/":
            return 270;
        case "%":
            return 271;
        case "|":
            return 272;
        case "^":
            return 273;
        case "&":
            return 274;
        case "||":
            return 275;
        case "&&":
            return 276;
        case "in":
            return 277;
        case "instanceof":
            return 278;
        case "**":
            return 279;
        case "??":
            return 280;
        default:
            throw new Error("Unexpected enum value for BinaryOperator");
    }
}

function serializeAssignmentExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeAssignmentOperator(node.operator)
    );
    writeScratchUint32(
        storePos32 + 2,
        node.operator === "="
            ? serializeAssignmentLeftEquals(node.left)
            : serializeAssignmentLeft(node.left)
    );
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.right));
    return storePos32;
}

function finalizeAssignmentExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeAssignmentLeft(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeAssignmentLeft(node) {
    const storePos32 = allocScratch(2);
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
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeBoxExpression(node));
            break;
        case "ArrayPattern":
        case "RestElement":
        case "ObjectPattern":
        case "AssignmentPattern":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBoxPattern(node));
            break;
        default:
            throw new Error("Unexpected enum option type for AssignmentLeft");
    }
    return storePos32;
}

function finalizeAssignmentLeft(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(0, scratchUint32[storePos32 + 1], finalizeBox, 4, 8);
            break;
        case 1:
            finalizeEnum(1, scratchUint32[storePos32 + 1], finalizeBox, 4, 8);
            break;
        default:
            throw new Error("Unexpected enum option ID for AssignmentLeft");
    }
}

function serializeAssignmentLeftEquals(node) {
    const storePos32 = allocScratch(2);
    scratchBuff[storePos32 << 2] = 1;
    writeScratchUint32(storePos32 + 1, serializeBoxPattern(node));
    return storePos32;
}

function serializeAssignmentOperator(value) {
    switch (value) {
        case "=":
            return 256;
        case "+=":
            return 257;
        case "-=":
            return 258;
        case "*=":
            return 259;
        case "/=":
            return 260;
        case "%=":
            return 261;
        case "<<=":
            return 262;
        case ">>=":
            return 263;
        case ">>>=":
            return 264;
        case "|=":
            return 265;
        case "^=":
            return 266;
        case "&=":
            return 267;
        case "**=":
            return 268;
        case "&&=":
            return 269;
        case "||=":
            return 270;
        case "??=":
            return 271;
        default:
            throw new Error("Unexpected enum value for AssignmentOperator");
    }
}

function serializeMemberExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.object));
    writeScratchUint32(
        storePos32 + 2,
        serializeIdentifierOrPrivateNameOrComputed(node.property)
    );
    return storePos32;
}

function finalizeMemberExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeIdentifierOrPrivateNameOrComputed(scratchUint32[storePos32 + 2]);
}

function serializeSuperPropExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSuper(node.obj));
    writeScratchUint32(
        storePos32 + 2,
        serializeIdentifierOrComputed(node.property)
    );
    return storePos32;
}

function finalizeSuperPropExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSuper(scratchUint32[storePos32 + 1]);
    finalizeIdentifierOrComputed(scratchUint32[storePos32 + 2]);
}

function serializeConditionalExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.test));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.consequent));
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.alternate));
    return storePos32;
}

function finalizeConditionalExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeCallExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeSuperOrImportOrBoxExpression(node.callee)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeVecExprOrSpread(node.arguments)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeCallExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSuperOrImportOrBoxExpression(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeNewExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.callee));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionVecExprOrSpread(node.arguments)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeNewExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeOptionVecExprOrSpread(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeSequenceExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecBoxExpression(node.expressions)
    );
    return storePos32;
}

function finalizeSequenceExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeIdentifier(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.value));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    return storePos32;
}

function finalizeIdentifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
}

function serializeTemplateLiteral(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecBoxExpression(node.expressions)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeVecTemplateElement(node.quasis)
    );
    return storePos32;
}

function finalizeTemplateLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
}

function serializeTemplateElement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.tail));
    writeScratchUint32(storePos32 + 2, serializeOptionJsWord(node.cooked));
    writeScratchUint32(storePos32 + 3, serializeJsWord(node.raw));
    return storePos32;
}

function finalizeTemplateElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
    finalizeJsWord(scratchUint32[storePos32 + 3]);
}

function serializeTaggedTemplateExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.tag));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeParameterInstantiation(node.typeParameters)
    );
    writeScratchUint32(storePos32 + 3, serializeTemplateLiteral(node.template));
    return storePos32;
}

function finalizeTaggedTemplateExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 2]);
    finalizeTemplateLiteral(scratchUint32[storePos32 + 3]);
}

function serializeYieldExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionBoxExpression(node.argument)
    );
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.delegate));
    return storePos32;
}

function finalizeYieldExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
}

function serializeMetaProperty(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeMetaPropertyKind(node.kind));
    return storePos32;
}

function finalizeMetaProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
}

function serializeMetaPropertyKind(value) {
    switch (value) {
        case "new.target":
            return 256;
        case "import.meta":
            return 257;
        default:
            throw new Error("Unexpected enum value for MetaPropertyKind");
    }
}

function serializeAwaitExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeAwaitExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeParenthesisExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeParenthesisExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializePrivateName(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.id));
    return storePos32;
}

function finalizePrivateName(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeOptionalChainingExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.questionDotToken));
    writeScratchUint32(
        storePos32 + 2,
        serializeMemberExpressionOrOptionalChainingCall(node.base)
    );
    return storePos32;
}

function finalizeOptionalChainingExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeMemberExpressionOrOptionalChainingCall(
        scratchUint32[storePos32 + 2]
    );
}

function serializeOptionalChainingCall(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.callee));
    writeScratchUint32(
        storePos32 + 2,
        serializeVecExprOrSpread(node.arguments)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeOptionalChainingCall(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeSuper(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeSuper(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeImport(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeImport(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeInvalid(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeInvalid(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeComputed(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeComputed(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeExprOrSpread(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeOptionSpan(node.spread));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeExprOrSpread(storePos32) {
    finalizeOptionSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeObjectExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecSpreadElementOrBoxProperty(node.properties)
    );
    return storePos32;
}

function finalizeObjectExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeSpreadElement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.spread));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.arguments));
    return storePos32;
}

function finalizeSpreadElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeProperty(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "KeyValueProperty":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeKeyValueProperty(node));
            break;
        case "AssignmentProperty":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeAssignmentProperty(node)
            );
            break;
        case "GetterProperty":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeGetterProperty(node));
            break;
        case "SetterProperty":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeSetterProperty(node));
            break;
        case "MethodProperty":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeMethodProperty(node));
            break;
        default:
            throw new Error("Unexpected enum option type for Property");
    }
    return storePos32;
}

function finalizeProperty(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                160
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeKeyValueProperty,
                8,
                160
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeAssignmentProperty,
                4,
                160
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeGetterProperty,
                8,
                160
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeSetterProperty,
                8,
                160
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeMethodProperty,
                8,
                160
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for Property");
    }
}

function serializeKeyValueProperty(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeBoxExpression(node.value));
    writeScratchUint32(storePos32 + 1, serializePropertyName(node.key));
    return storePos32;
}

function finalizeKeyValueProperty(storePos32) {
    finalizeBox(scratchUint32[storePos32]);
    pos += 4;
    finalizePropertyName(scratchUint32[storePos32 + 1]);
}

function serializeAssignmentProperty(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeIdentifier(node.key));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.value));
    return storePos32;
}

function finalizeAssignmentProperty(storePos32) {
    finalizeIdentifier(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeGetterProperty(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionBlockStatement(node.body)
    );
    writeScratchUint32(storePos32 + 3, serializePropertyName(node.key));
    return storePos32;
}

function finalizeGetterProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 1]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 2]);
    finalizePropertyName(scratchUint32[storePos32 + 3]);
}

function serializeSetterProperty(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 2, serializePattern(node.param));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionBlockStatement(node.body)
    );
    return storePos32;
}

function finalizeSetterProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    pos += 4;
    finalizePropertyName(scratchUint32[storePos32 + 1]);
    finalizePattern(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
    pos += 4;
}

function serializeMethodProperty(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 2, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 3, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionBlockStatement(node.body)
    );
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.async));
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeParameterDeclaration(node.typeParameters)
    );
    writeScratchUint32(
        storePos32 + 8,
        serializeOptionTsTypeAnnotation(node.returnType)
    );
    return storePos32;
}

function finalizeMethodProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeSpan(scratchUint32[storePos32 + 3]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 4]);
    finalizeBoolean(scratchUint32[storePos32 + 5]);
    finalizeBoolean(scratchUint32[storePos32 + 6]);
    pos += 2;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 7]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 8]);
    pos += 4;
}

function serializePropertyName(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "StringLiteral":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeStringLiteral(node));
            break;
        case "NumericLiteral":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeNumericLiteral(node));
            break;
        case "Computed":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeComputed(node));
            break;
        case "BigIntLiteral":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeBigIntLiteral(node));
            break;
        default:
            throw new Error("Unexpected enum option type for PropertyName");
    }
    return storePos32;
}

function finalizePropertyName(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeStringLiteral,
                4,
                48
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeNumericLiteral,
                8,
                48
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeComputed,
                4,
                48
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeBigIntLiteral,
                4,
                48
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for PropertyName");
    }
}

function serializeLiteral(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "StringLiteral":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeStringLiteral(node));
            break;
        case "BooleanLiteral":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBooleanLiteral(node));
            break;
        case "NullLiteral":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeNullLiteral(node));
            break;
        case "NumericLiteral":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeNumericLiteral(node));
            break;
        case "BigIntLiteral":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeBigIntLiteral(node));
            break;
        case "RegExpLiteral":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeRegExpLiteral(node));
            break;
        case "JSXText":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeJSXText(node));
            break;
        default:
            throw new Error("Unexpected enum option type for Literal");
    }
    return storePos32;
}

function finalizeLiteral(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeStringLiteral,
                4,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeBooleanLiteral,
                4,
                48
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeNullLiteral,
                4,
                48
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeNumericLiteral,
                8,
                48
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeBigIntLiteral,
                4,
                48
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeRegExpLiteral,
                4,
                48
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeJSXText,
                4,
                48
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for Literal");
    }
}

function serializeStringLiteral(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.value));
    writeScratchUint32(storePos32 + 2, serializeOptionJsWord(node.raw));
    return storePos32;
}

function finalizeStringLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
}

function serializeBooleanLiteral(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.value));
    return storePos32;
}

function finalizeBooleanLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
}

function serializeNullLiteral(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeNullLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeNumericLiteral(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeNumber(node.value));
    writeScratchUint32(storePos32 + 2, serializeOptionAsciiJsWord(node.raw));
    return storePos32;
}

function finalizeNumericLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    pos += 4;
    finalizeNumber(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
    pos += 4;
}

function serializeBigIntLiteral(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBigIntValue(node.value));
    writeScratchUint32(storePos32 + 2, serializeOptionAsciiJsWord(node.raw));
    return storePos32;
}

function finalizeBigIntLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
}

function serializeBigIntValue(value) {
    if (value[0] === 0) return serializeAsciiJsWord("0");
    const parts = value[1];
    let num = 0n;
    for (let i = parts.length - 1; i >= 0; i--) {
        num <<= 32n;
        num += BigInt(parts[i]);
    }
    let str = num.toString();
    if (value[0] === -1) str = `-${str}`;
    return serializeAsciiJsWord(str);
}

function serializeRegExpLiteral(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.pattern));
    writeScratchUint32(storePos32 + 2, serializeAsciiJsWord(node.flags));
    return storePos32;
}

function finalizeRegExpLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeJsWord(scratchUint32[storePos32 + 2]);
}

function serializeJSXElement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeJSXOpeningElement(node.opening)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeVecJSXElementChild(node.children)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionJSXClosingElement(node.closing)
    );
    return storePos32;
}

function finalizeJSXElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJSXOpeningElement(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionJSXClosingElement(scratchUint32[storePos32 + 3]);
}

function serializeJSXOpeningElement(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeJSXElementName(node.name));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 2,
        serializeVecJSXAttributeOrSpread(node.attributes)
    );
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.selfClosing));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeJSXOpeningElement(storePos32) {
    finalizeJSXElementName(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 3;
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 4]);
}

function serializeJSXAttributeOrSpread(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "JSXAttribute":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeJSXAttribute(node));
            break;
        case "SpreadElement":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeSpreadElement(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for JSXAttributeOrSpread"
            );
    }
    return storePos32;
}

function finalizeJSXAttributeOrSpread(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeJSXAttribute,
                8,
                136
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeSpreadElement,
                4,
                136
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for JSXAttributeOrSpread"
            );
    }
}

function serializeJSXAttribute(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJSXAttributeName(node.name));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionJSXAttributeValue(node.value)
    );
    return storePos32;
}

function finalizeJSXAttribute(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJSXAttributeName(scratchUint32[storePos32 + 1]);
    finalizeOptionJSXAttributeValue(scratchUint32[storePos32 + 2]);
}

function serializeJSXAttributeName(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "JSXNamespacedName":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXNamespacedName(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for JSXAttributeName");
    }
    return storePos32;
}

function finalizeJSXAttributeName(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                52
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeJSXNamespacedName,
                4,
                52
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for JSXAttributeName");
    }
}

function serializeJSXAttributeValue(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "StringLiteral":
        case "BooleanLiteral":
        case "NullLiteral":
        case "NumericLiteral":
        case "BigIntLiteral":
        case "RegExpLiteral":
        case "JSXText":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeLiteral(node));
            break;
        case "JSXExpressionContainer":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXExpressionContainer(node)
            );
            break;
        case "JSXElement":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeBoxJSXElement(node));
            break;
        case "JSXFragment":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeJSXFragment(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for JSXAttributeValue"
            );
    }
    return storePos32;
}

function finalizeJSXAttributeValue(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeLiteral,
                8,
                56
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeJSXExpressionContainer,
                4,
                56
            );
            break;
        case 2:
            finalizeEnum(2, scratchUint32[storePos32 + 1], finalizeBox, 4, 56);
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeJSXFragment,
                4,
                56
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for JSXAttributeValue");
    }
}

function serializeJSXClosingElement(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJSXElementName(node.name));
    return storePos32;
}

function finalizeJSXClosingElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJSXElementName(scratchUint32[storePos32 + 1]);
}

function serializeJSXFragment(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeJSXOpeningFragment(node.opening)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeVecJSXElementChild(node.children)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeJSXClosingFragment(node.closing)
    );
    return storePos32;
}

function finalizeJSXFragment(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJSXOpeningFragment(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeJSXClosingFragment(scratchUint32[storePos32 + 3]);
}

function serializeJSXOpeningFragment(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXOpeningFragment(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXClosingFragment(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXClosingFragment(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXMemberExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeJSXObject(node.object));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.property));
    return storePos32;
}

function finalizeJSXMemberExpression(storePos32) {
    finalizeJSXObject(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeJSXObject(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "JSXMemberExpression":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeBoxJSXMemberExpression(node)
            );
            break;
        case "Identifier":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        default:
            throw new Error("Unexpected enum option type for JSXObject");
    }
    return storePos32;
}

function finalizeJSXObject(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(0, scratchUint32[storePos32 + 1], finalizeBox, 4, 28);
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                28
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for JSXObject");
    }
}

function serializeJSXNamespacedName(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeIdentifier(node.namespace));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.name));
    return storePos32;
}

function finalizeJSXNamespacedName(storePos32) {
    finalizeIdentifier(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeJSXText(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.value));
    writeScratchUint32(storePos32 + 2, serializeJsWord(node.raw));
    return storePos32;
}

function finalizeJSXText(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeJsWord(scratchUint32[storePos32 + 2]);
}

function serializeJSXEmptyExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXEmptyExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXElementChild(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "JSXText":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeJSXText(node));
            break;
        case "JSXExpressionContainer":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXExpressionContainer(node)
            );
            break;
        case "JSXSpreadChild":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeJSXSpreadChild(node));
            break;
        case "JSXElement":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeBoxJSXElement(node));
            break;
        case "JSXFragment":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeJSXFragment(node));
            break;
        default:
            throw new Error("Unexpected enum option type for JSXElementChild");
    }
    return storePos32;
}

function finalizeJSXElementChild(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeJSXText,
                4,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeJSXExpressionContainer,
                4,
                48
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeJSXSpreadChild,
                4,
                48
            );
            break;
        case 3:
            finalizeEnum(3, scratchUint32[storePos32 + 1], finalizeBox, 4, 48);
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeJSXFragment,
                4,
                48
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for JSXElementChild");
    }
}

function serializeJSXExpressionContainer(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJSXExpression(node.expression));
    return storePos32;
}

function finalizeJSXExpressionContainer(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJSXExpression(scratchUint32[storePos32 + 1]);
}

function serializeJSXExpression(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "JSXEmptyExpression":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXEmptyExpression(node)
            );
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
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBoxExpression(node));
            break;
        default:
            throw new Error("Unexpected enum option type for JSXExpression");
    }
    return storePos32;
}

function finalizeJSXExpression(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeJSXEmptyExpression,
                4,
                16
            );
            break;
        case 1:
            finalizeEnum(1, scratchUint32[storePos32 + 1], finalizeBox, 4, 16);
            break;
        default:
            throw new Error("Unexpected enum option ID for JSXExpression");
    }
}

function serializeJSXSpreadChild(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeJSXSpreadChild(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeJSXElementName(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "JSXMemberExpression":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXMemberExpression(node)
            );
            break;
        case "JSXNamespacedName":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeJSXNamespacedName(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for JSXElementName");
    }
    return storePos32;
}

function finalizeJSXElementName(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                56
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeJSXMemberExpression,
                4,
                56
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeJSXNamespacedName,
                4,
                56
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for JSXElementName");
    }
}

function serializeTsTypeAnnotation(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsTypeAnnotation(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsTypeParameterDeclaration(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecTsTypeParameter(node.parameters)
    );
    return storePos32;
}

function finalizeTsTypeParameterDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsTypeParameter(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.name));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.in));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.out));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionBoxTsType(node.constraint)
    );
    writeScratchUint32(storePos32 + 5, serializeOptionBoxTsType(node.default));
    return storePos32;
}

function finalizeTsTypeParameter(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 2;
    finalizeOptionBoxTsType(scratchUint32[storePos32 + 4]);
    finalizeOptionBoxTsType(scratchUint32[storePos32 + 5]);
}

function serializeTsTypeParameterInstantiation(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxTsType(node.params));
    return storePos32;
}

function finalizeTsTypeParameterInstantiation(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsParameterProperty(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecDecorator(node.decorators));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionAccessibility(node.accessibility)
    );
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.override));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.readonly));
    writeScratchUint32(
        storePos32 + 5,
        serializeTsParameterPropertyParameter(node.param)
    );
    return storePos32;
}

function finalizeTsParameterProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 2;
    finalizeTsParameterPropertyParameter(scratchUint32[storePos32 + 5]);
}

function serializeTsParameterPropertyParameter(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeBindingIdentifier(node)
            );
            break;
        case "AssignmentPattern":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeAssignmentPattern(node)
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsParameterPropertyParameter"
            );
    }
    return storePos32;
}

function finalizeTsParameterPropertyParameter(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeBindingIdentifier,
                4,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeAssignmentPattern,
                4,
                48
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for TsParameterPropertyParameter"
            );
    }
}

function serializeTsQualifiedName(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeTsEntityName(node.left));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.right));
    return storePos32;
}

function finalizeTsQualifiedName(storePos32) {
    finalizeTsEntityName(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeTsEntityName(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsQualifiedName":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeBoxTsQualifiedName(node)
            );
            break;
        case "Identifier":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsEntityName");
    }
    return storePos32;
}

function finalizeTsEntityName(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(0, scratchUint32[storePos32 + 1], finalizeBox, 4, 28);
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                28
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsEntityName");
    }
}

function serializeTsTypeElement(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsCallSignatureDeclaration":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsCallSignatureDeclaration(node)
            );
            break;
        case "TsConstructSignatureDeclaration":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsConstructSignatureDeclaration(node)
            );
            break;
        case "TsPropertySignature":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsPropertySignature(node)
            );
            break;
        case "TsGetterSignature":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsGetterSignature(node)
            );
            break;
        case "TsSetterSignature":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsSetterSignature(node)
            );
            break;
        case "TsMethodSignature":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsMethodSignature(node)
            );
            break;
        case "TsIndexSignature":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeTsIndexSignature(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsTypeElement");
    }
    return storePos32;
}

function finalizeTsTypeElement(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsCallSignatureDeclaration,
                4,
                88
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsConstructSignatureDeclaration,
                4,
                88
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeTsPropertySignature,
                4,
                88
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeTsGetterSignature,
                4,
                88
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeTsSetterSignature,
                4,
                88
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeTsMethodSignature,
                4,
                88
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeTsIndexSignature,
                4,
                88
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsTypeElement");
    }
}

function serializeTsCallSignatureDeclaration(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    return storePos32;
}

function finalizeTsCallSignatureDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 3]);
}

function serializeTsConstructSignatureDeclaration(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    return storePos32;
}

function finalizeTsConstructSignatureDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 3]);
}

function serializeTsPropertySignature(node) {
    const storePos32 = allocScratch(10);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.key));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.computed));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.optional));
    writeScratchUint32(storePos32 + 5, serializeOptionBoxExpression(node.init));
    writeScratchUint32(storePos32 + 6, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(
        storePos32 + 8,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    return storePos32;
}

function finalizeTsPropertySignature(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 2;
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 5]);
    finalizeVec(scratchUint32[storePos32 + 6]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 7]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 8]);
}

function serializeTsGetterSignature(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.key));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.computed));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.optional));
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeTsGetterSignature(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 5]);
}

function serializeTsSetterSignature(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.key));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.computed));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.optional));
    writeScratchUint32(storePos32 + 5, serializeTsFnParameter(node.param));
    return storePos32;
}

function finalizeTsSetterSignature(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 2;
    finalizeTsFnParameter(scratchUint32[storePos32 + 5]);
}

function serializeTsMethodSignature(node) {
    const storePos32 = allocScratch(8);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.key));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.computed));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.optional));
    writeScratchUint32(storePos32 + 5, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 6,
        serializeOptionTsTypeAnnotation(node.typeAnn)
    );
    writeScratchUint32(
        storePos32 + 7,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    return storePos32;
}

function finalizeTsMethodSignature(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 2;
    finalizeVec(scratchUint32[storePos32 + 5]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 6]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 7]);
}

function serializeTsIndexSignature(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.static));
    writeScratchUint32(storePos32 + 4, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsIndexSignature(storePos32) {
    finalizeVec(scratchUint32[storePos32]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 2;
    finalizeSpan(scratchUint32[storePos32 + 4]);
}

function serializeTsType(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsKeywordType":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsKeywordType(node));
            break;
        case "TsThisType":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeTsThisType(node));
            break;
        case "TsFunctionType":
        case "TsConstructorType":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsFnOrConstructorType(node)
            );
            break;
        case "TsTypeReference":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeTsTypeReference(node));
            break;
        case "TsTypeQuery":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(storePos32 + 1, serializeTsTypeQuery(node));
            break;
        case "TsTypeLiteral":
            scratchBuff[storePos32 << 2] = 5;
            writeScratchUint32(storePos32 + 1, serializeTsTypeLiteral(node));
            break;
        case "TsArrayType":
            scratchBuff[storePos32 << 2] = 6;
            writeScratchUint32(storePos32 + 1, serializeTsArrayType(node));
            break;
        case "TsTupleType":
            scratchBuff[storePos32 << 2] = 7;
            writeScratchUint32(storePos32 + 1, serializeTsTupleType(node));
            break;
        case "TsOptionalType":
            scratchBuff[storePos32 << 2] = 8;
            writeScratchUint32(storePos32 + 1, serializeTsOptionalType(node));
            break;
        case "TsRestType":
            scratchBuff[storePos32 << 2] = 9;
            writeScratchUint32(storePos32 + 1, serializeTsRestType(node));
            break;
        case "TsUnionType":
        case "TsIntersectionType":
            scratchBuff[storePos32 << 2] = 10;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsUnionOrIntersectionType(node)
            );
            break;
        case "TsConditionalType":
            scratchBuff[storePos32 << 2] = 11;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsConditionalType(node)
            );
            break;
        case "TsInferType":
            scratchBuff[storePos32 << 2] = 12;
            writeScratchUint32(storePos32 + 1, serializeTsInferType(node));
            break;
        case "TsParenthesizedType":
            scratchBuff[storePos32 << 2] = 13;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsParenthesizedType(node)
            );
            break;
        case "TsTypeOperator":
            scratchBuff[storePos32 << 2] = 14;
            writeScratchUint32(storePos32 + 1, serializeTsTypeOperator(node));
            break;
        case "TsIndexedAccessType":
            scratchBuff[storePos32 << 2] = 15;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsIndexedAccessType(node)
            );
            break;
        case "TsMappedType":
            scratchBuff[storePos32 << 2] = 16;
            writeScratchUint32(storePos32 + 1, serializeTsMappedType(node));
            break;
        case "TsLiteralType":
            scratchBuff[storePos32 << 2] = 17;
            writeScratchUint32(storePos32 + 1, serializeTsLiteralType(node));
            break;
        case "TsTypePredicate":
            scratchBuff[storePos32 << 2] = 18;
            writeScratchUint32(storePos32 + 1, serializeTsTypePredicate(node));
            break;
        case "TsImportType":
            scratchBuff[storePos32 << 2] = 19;
            writeScratchUint32(storePos32 + 1, serializeTsImportType(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsType");
    }
    return storePos32;
}

function finalizeTsType(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsKeywordType,
                4,
                144
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsThisType,
                4,
                144
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeTsFnOrConstructorType,
                4,
                144
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeTsTypeReference,
                4,
                144
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeTsTypeQuery,
                4,
                144
            );
            break;
        case 5:
            finalizeEnum(
                5,
                scratchUint32[storePos32 + 1],
                finalizeTsTypeLiteral,
                4,
                144
            );
            break;
        case 6:
            finalizeEnum(
                6,
                scratchUint32[storePos32 + 1],
                finalizeTsArrayType,
                4,
                144
            );
            break;
        case 7:
            finalizeEnum(
                7,
                scratchUint32[storePos32 + 1],
                finalizeTsTupleType,
                4,
                144
            );
            break;
        case 8:
            finalizeEnum(
                8,
                scratchUint32[storePos32 + 1],
                finalizeTsOptionalType,
                4,
                144
            );
            break;
        case 9:
            finalizeEnum(
                9,
                scratchUint32[storePos32 + 1],
                finalizeTsRestType,
                4,
                144
            );
            break;
        case 10:
            finalizeEnum(
                10,
                scratchUint32[storePos32 + 1],
                finalizeTsUnionOrIntersectionType,
                4,
                144
            );
            break;
        case 11:
            finalizeEnum(
                11,
                scratchUint32[storePos32 + 1],
                finalizeTsConditionalType,
                4,
                144
            );
            break;
        case 12:
            finalizeEnum(
                12,
                scratchUint32[storePos32 + 1],
                finalizeTsInferType,
                4,
                144
            );
            break;
        case 13:
            finalizeEnum(
                13,
                scratchUint32[storePos32 + 1],
                finalizeTsParenthesizedType,
                4,
                144
            );
            break;
        case 14:
            finalizeEnum(
                14,
                scratchUint32[storePos32 + 1],
                finalizeTsTypeOperator,
                4,
                144
            );
            break;
        case 15:
            finalizeEnum(
                15,
                scratchUint32[storePos32 + 1],
                finalizeTsIndexedAccessType,
                4,
                144
            );
            break;
        case 16:
            finalizeEnum(
                16,
                scratchUint32[storePos32 + 1],
                finalizeTsMappedType,
                4,
                144
            );
            break;
        case 17:
            finalizeEnum(
                17,
                scratchUint32[storePos32 + 1],
                finalizeTsLiteralType,
                8,
                144
            );
            break;
        case 18:
            finalizeEnum(
                18,
                scratchUint32[storePos32 + 1],
                finalizeTsTypePredicate,
                4,
                144
            );
            break;
        case 19:
            finalizeEnum(
                19,
                scratchUint32[storePos32 + 1],
                finalizeTsImportType,
                4,
                144
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsType");
    }
}

function serializeTsFnOrConstructorType(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsFunctionType":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsFunctionType(node));
            break;
        case "TsConstructorType":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsConstructorType(node)
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsFnOrConstructorType"
            );
    }
    return storePos32;
}

function finalizeTsFnOrConstructorType(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsFunctionType,
                4,
                68
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsConstructorType,
                4,
                68
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for TsFnOrConstructorType"
            );
    }
}

function serializeTsKeywordType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeTsKeywordTypeKind(node.kind));
    return storePos32;
}

function finalizeTsKeywordType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
}

function serializeTsKeywordTypeKind(value) {
    switch (value) {
        case "any":
            return 256;
        case "unknown":
            return 257;
        case "number":
            return 258;
        case "object":
            return 259;
        case "boolean":
            return 260;
        case "bigint":
            return 261;
        case "string":
            return 262;
        case "symbol":
            return 263;
        case "void":
            return 264;
        case "undefined":
            return 265;
        case "null":
            return 266;
        case "never":
            return 267;
        case "intrinsic":
            return 268;
        default:
            throw new Error("Unexpected enum value for TsKeywordTypeKind");
    }
}

function serializeTsThisType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsThisType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsFnParameter(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeBindingIdentifier(node)
            );
            break;
        case "ArrayPattern":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeArrayPattern(node));
            break;
        case "RestElement":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeRestElement(node));
            break;
        case "ObjectPattern":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeObjectPattern(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsFnParameter");
    }
    return storePos32;
}

function finalizeTsFnParameter(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeBindingIdentifier,
                4,
                52
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeArrayPattern,
                4,
                52
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeRestElement,
                4,
                52
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeObjectPattern,
                4,
                52
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsFnParameter");
    }
}

function serializeTsFunctionType(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeTsFunctionType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 2]);
    finalizeTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeTsConstructorType(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsFnParameter(node.params));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeTsTypeAnnotation(node.typeAnnotation)
    );
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isAbstract));
    return storePos32;
}

function finalizeTsConstructorType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 2]);
    finalizeTsTypeAnnotation(scratchUint32[storePos32 + 3]);
    finalizeBoolean(scratchUint32[storePos32 + 4]);
    pos += 3;
}

function serializeTsTypeReference(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeTsEntityName(node.typeName));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeParameterInstantiation(node.typeParams)
    );
    return storePos32;
}

function finalizeTsTypeReference(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeTsEntityName(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 2]);
}

function serializeTsTypePredicate(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.asserts));
    writeScratchUint32(
        storePos32 + 2,
        serializeTsThisTypeOrIdent(node.paramName)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeAnnotation(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeTsTypePredicate(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeTsThisTypeOrIdent(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeTsThisTypeOrIdent(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsThisType":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsThisType(node));
            break;
        case "Identifier":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsThisTypeOrIdent"
            );
    }
    return storePos32;
}

function finalizeTsThisTypeOrIdent(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsThisType,
                4,
                28
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                28
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsThisTypeOrIdent");
    }
}

function serializeTsTypeQuery(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeTsTypeQueryExpr(node.exprName));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeTsTypeQuery(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeTsTypeQueryExpr(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 2]);
}

function serializeTsTypeQueryExpr(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsQualifiedName":
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsEntityName(node));
            break;
        case "TsImportType":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeTsImportType(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsTypeQueryExpr");
    }
    return storePos32;
}

function finalizeTsTypeQueryExpr(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsEntityName,
                4,
                104
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsImportType,
                4,
                104
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsTypeQueryExpr");
    }
}

function serializeTsImportType(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeStringLiteral(node.argument));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsEntityName(node.qualifier)
    );
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeTsImportType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeStringLiteral(scratchUint32[storePos32 + 1]);
    finalizeOptionTsEntityName(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeTsTypeLiteral(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsTypeElement(node.members));
    return storePos32;
}

function finalizeTsTypeLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsArrayType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.elemType));
    return storePos32;
}

function finalizeTsArrayType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsTupleType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeVecTsTupleElement(node.elemTypes)
    );
    return storePos32;
}

function finalizeTsTupleType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsTupleElement(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionPattern(node.label));
    writeScratchUint32(storePos32 + 2, serializeTsType(node.ty));
    return storePos32;
}

function finalizeTsTupleElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionPattern(scratchUint32[storePos32 + 1]);
    pos += 4;
    finalizeTsType(scratchUint32[storePos32 + 2]);
}

function serializeTsOptionalType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsOptionalType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsRestType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsRestType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsUnionOrIntersectionType(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsUnionType":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsUnionType(node));
            break;
        case "TsIntersectionType":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsIntersectionType(node)
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsUnionOrIntersectionType"
            );
    }
    return storePos32;
}

function finalizeTsUnionOrIntersectionType(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsUnionType,
                4,
                24
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsIntersectionType,
                4,
                24
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for TsUnionOrIntersectionType"
            );
    }
}

function serializeTsUnionType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxTsType(node.types));
    return storePos32;
}

function finalizeTsUnionType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsIntersectionType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxTsType(node.types));
    return storePos32;
}

function finalizeTsIntersectionType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsConditionalType(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.checkType));
    writeScratchUint32(storePos32 + 2, serializeBoxTsType(node.extendsType));
    writeScratchUint32(storePos32 + 3, serializeBoxTsType(node.trueType));
    writeScratchUint32(storePos32 + 4, serializeBoxTsType(node.falseType));
    return storePos32;
}

function finalizeTsConditionalType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
    finalizeBox(scratchUint32[storePos32 + 4]);
}

function serializeTsInferType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeTsTypeParameter(node.typeParam)
    );
    return storePos32;
}

function finalizeTsInferType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeTsTypeParameter(scratchUint32[storePos32 + 1]);
}

function serializeTsParenthesizedType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsParenthesizedType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsTypeOperator(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeTsTypeOperatorOp(node.op));
    writeScratchUint32(storePos32 + 2, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsTypeOperator(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeTsTypeOperatorOp(value) {
    switch (value) {
        case "keyof":
            return 256;
        case "unique":
            return 257;
        case "readonly":
            return 258;
        default:
            throw new Error("Unexpected enum value for TsTypeOperatorOp");
    }
}

function serializeTsIndexedAccessType(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 2, serializeBoxTsType(node.objectType));
    writeScratchUint32(storePos32 + 3, serializeBoxTsType(node.indexType));
    return storePos32;
}

function finalizeTsIndexedAccessType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeTruePlusMinus(value) {
    switch (value) {
        case true:
        case "true":
            return 256;
        case "+":
            return 257;
        case "-":
            return 258;
        default:
            throw new Error("Unexpected enum value for TruePlusMinus");
    }
}

function serializeTsMappedType(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(
        storePos32 + 1,
        serializeOptionTruePlusMinus(node.readonly)
    );
    writeScratchUint32(
        storePos32 + 2,
        serializeTsTypeParameter(node.typeParam)
    );
    writeScratchUint32(storePos32 + 3, serializeOptionBoxTsType(node.nameType));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionTruePlusMinus(node.optional)
    );
    writeScratchUint32(
        storePos32 + 5,
        serializeOptionBoxTsType(node.typeAnnotation)
    );
    return storePos32;
}

function finalizeTsMappedType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionTruePlusMinus(scratchUint32[storePos32 + 1]);
    finalizeTsTypeParameter(scratchUint32[storePos32 + 2]);
    finalizeOptionBoxTsType(scratchUint32[storePos32 + 3]);
    finalizeOptionTruePlusMinus(scratchUint32[storePos32 + 4]);
    finalizeOptionBoxTsType(scratchUint32[storePos32 + 5]);
}

function serializeTsLiteralType(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeTsLiteral(node.literal));
    return storePos32;
}

function finalizeTsLiteralType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    pos += 4;
    finalizeTsLiteral(scratchUint32[storePos32 + 1]);
}

function serializeTsLiteral(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "NumericLiteral":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeNumericLiteral(node));
            break;
        case "StringLiteral":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeStringLiteral(node));
            break;
        case "BooleanLiteral":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeBooleanLiteral(node));
            break;
        case "BigIntLiteral":
            scratchBuff[storePos32 << 2] = 3;
            writeScratchUint32(storePos32 + 1, serializeBigIntLiteral(node));
            break;
        case "TemplateLiteral":
            scratchBuff[storePos32 << 2] = 4;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsTemplateLiteralType(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for TsLiteral");
    }
    return storePos32;
}

function finalizeTsLiteral(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeNumericLiteral,
                8,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeStringLiteral,
                4,
                48
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeBooleanLiteral,
                4,
                48
            );
            break;
        case 3:
            finalizeEnum(
                3,
                scratchUint32[storePos32 + 1],
                finalizeBigIntLiteral,
                4,
                48
            );
            break;
        case 4:
            finalizeEnum(
                4,
                scratchUint32[storePos32 + 1],
                finalizeTsTemplateLiteralType,
                4,
                48
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsLiteral");
    }
}

function serializeTsTemplateLiteralType(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxTsType(node.types));
    writeScratchUint32(
        storePos32 + 2,
        serializeVecTemplateElement(node.quasis)
    );
    return storePos32;
}

function finalizeTsTemplateLiteralType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
}

function serializeTsInterfaceDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.id));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.declare));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    writeScratchUint32(
        storePos32 + 4,
        serializeVecTsExpressionWithTypeArguments(node.extends)
    );
    writeScratchUint32(storePos32 + 5, serializeTsInterfaceBody(node.body));
    return storePos32;
}

function finalizeTsInterfaceDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 3]);
    finalizeVec(scratchUint32[storePos32 + 4]);
    finalizeTsInterfaceBody(scratchUint32[storePos32 + 5]);
}

function serializeTsInterfaceBody(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsTypeElement(node.body));
    return storePos32;
}

function finalizeTsInterfaceBody(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsExpressionWithTypeArguments(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    writeScratchUint32(
        storePos32 + 2,
        serializeOptionTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeTsExpressionWithTypeArguments(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 2]);
}

function serializeTsTypeAliasDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeIdentifier(node.id));
    writeScratchUint32(
        storePos32 + 3,
        serializeOptionTsTypeParameterDeclaration(node.typeParams)
    );
    writeScratchUint32(storePos32 + 4, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsTypeAliasDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeIdentifier(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 3]);
    finalizeBox(scratchUint32[storePos32 + 4]);
}

function serializeTsEnumDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.isConst));
    writeScratchUint32(storePos32 + 3, serializeIdentifier(node.id));
    writeScratchUint32(storePos32 + 4, serializeVecTsEnumMember(node.members));
    return storePos32;
}

function finalizeTsEnumDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 2;
    finalizeIdentifier(scratchUint32[storePos32 + 3]);
    finalizeVec(scratchUint32[storePos32 + 4]);
}

function serializeTsEnumMember(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeTsEnumMemberId(node.id));
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.init));
    return storePos32;
}

function finalizeTsEnumMember(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeTsEnumMemberId(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
}

function serializeTsEnumMemberId(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "StringLiteral":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeStringLiteral(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsEnumMemberId");
    }
    return storePos32;
}

function finalizeTsEnumMemberId(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                36
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeStringLiteral,
                4,
                36
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsEnumMemberId");
    }
}

function serializeTsModuleDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.global));
    writeScratchUint32(storePos32 + 3, serializeTsModuleName(node.id));
    writeScratchUint32(
        storePos32 + 4,
        serializeOptionTsNamespaceBody(node.body)
    );
    return storePos32;
}

function finalizeTsModuleDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 2;
    finalizeTsModuleName(scratchUint32[storePos32 + 3]);
    finalizeOptionTsNamespaceBody(scratchUint32[storePos32 + 4]);
}

function serializeTsNamespaceBody(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsModuleBlock":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsModuleBlock(node));
            break;
        case "TsNamespaceDeclaration":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsNamespaceDeclaration(node)
            );
            break;
        default:
            throw new Error("Unexpected enum option type for TsNamespaceBody");
    }
    return storePos32;
}

function finalizeTsNamespaceBody(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsModuleBlock,
                4,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsNamespaceDeclaration,
                4,
                48
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsNamespaceBody");
    }
}

function serializeTsModuleBlock(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecModuleItem(node.body));
    return storePos32;
}

function finalizeTsModuleBlock(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsNamespaceDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.global));
    writeScratchUint32(storePos32 + 3, serializeIdentifier(node.id));
    writeScratchUint32(storePos32 + 4, serializeBoxTsNamespaceBody(node.body));
    return storePos32;
}

function finalizeTsNamespaceDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    pos += 2;
    finalizeIdentifier(scratchUint32[storePos32 + 3]);
    finalizeBox(scratchUint32[storePos32 + 4]);
}

function serializeTsModuleName(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "StringLiteral":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeStringLiteral(node));
            break;
        default:
            throw new Error("Unexpected enum option type for TsModuleName");
    }
    return storePos32;
}

function finalizeTsModuleName(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                36
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeStringLiteral,
                4,
                36
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsModuleName");
    }
}

function serializeTsImportEqualsDeclaration(node) {
    const storePos32 = allocScratch(6);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.isExport));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.isTypeOnly));
    writeScratchUint32(storePos32 + 4, serializeIdentifier(node.id));
    writeScratchUint32(
        storePos32 + 5,
        serializeTsModuleReference(node.moduleRef)
    );
    return storePos32;
}

function finalizeTsImportEqualsDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBoolean(scratchUint32[storePos32 + 1]);
    finalizeBoolean(scratchUint32[storePos32 + 2]);
    finalizeBoolean(scratchUint32[storePos32 + 3]);
    pos += 1;
    finalizeIdentifier(scratchUint32[storePos32 + 4]);
    finalizeTsModuleReference(scratchUint32[storePos32 + 5]);
}

function serializeTsModuleReference(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsQualifiedName":
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeTsEntityName(node));
            break;
        case "TsExternalModuleReference":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsExternalModuleReference(node)
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsModuleReference"
            );
    }
    return storePos32;
}

function finalizeTsModuleReference(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsEntityName,
                4,
                48
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeTsExternalModuleReference,
                4,
                48
            );
            break;
        default:
            throw new Error("Unexpected enum option ID for TsModuleReference");
    }
}

function serializeTsExternalModuleReference(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeStringLiteral(node.expression));
    return storePos32;
}

function finalizeTsExternalModuleReference(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeStringLiteral(scratchUint32[storePos32 + 1]);
}

function serializeTsExportAssignment(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeTsExportAssignment(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsNamespaceExportDeclaration(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.id));
    return storePos32;
}

function finalizeTsNamespaceExportDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeTsAsExpression(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    writeScratchUint32(storePos32 + 2, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsAsExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeTsTypeAssertion(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    writeScratchUint32(storePos32 + 2, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsTypeAssertion(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeTsNonNullExpression(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeTsNonNullExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeAccessibility(value) {
    switch (value) {
        case "public":
            return 256;
        case "protected":
            return 257;
        case "private":
            return 258;
        default:
            throw new Error("Unexpected enum value for Accessibility");
    }
}

function serializeTsConstAssertion(node) {
    const storePos32 = allocScratch(2);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeTsConstAssertion(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsInstantiation(node) {
    const storePos32 = allocScratch(4);
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    writeScratchUint32(
        storePos32 + 2,
        serializeTsTypeParameterInstantiation(node.typeArguments)
    );
    return storePos32;
}

function finalizeTsInstantiation(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeTsTypeParameterInstantiation(scratchUint32[storePos32 + 2]);
}

function serializeJsWord(str) {
    const strLen = str.length;
    if (strLen === 0) {
        const storePos32 = allocScratch(2);
        scratchUint32[storePos32] = 0;
        return storePos32;
    }
    if (strLen > 7) {
        alloc(strLen * 3);
        const len =
            strLen < 42
                ? writeStringToBuffer(str, buff, strLen, pos)
                : utf8Write.call(buff, str, pos);
        const storePos32 = allocScratch(2);
        scratchUint32[storePos32] = len;
        scratchUint32[storePos32 + 1] = pos;
        pos += len;
        return storePos32;
    }
    const storePos32 = allocScratchAligned(4 + strLen * 3);
    const len = writeStringToBuffer(
        str,
        scratchBuff,
        strLen,
        (storePos32 + 1) << 2
    );
    scratchUint32[storePos32] = len;
    if (len <= 7) {
        scratchPos32 = storePos32 + (len > 4 ? 4 : 2);
        return storePos32;
    }
    alloc(len);
    copyFromScratch(storePos32 + 1, len);
    scratchUint32[storePos32 + 1] = pos;
    scratchPos32 = storePos32 + 2;
    pos += len;
    return storePos32;
}

function finalizeJsWord(storePos32) {
    const len = scratchUint32[storePos32];
    if (len <= 7) {
        if (len > 0) {
            const pos32 = pos >> 2;
            uint32[pos32] = scratchUint32[storePos32 + 1];
            if (len > 4) uint32[pos32 + 1] = scratchUint32[storePos32 + 2];
        }
        buff[pos + 7] = len;
    } else {
        const pos32 = pos >> 2;
        uint32[pos32] = len;
        int32[pos32 + 1] = scratchUint32[storePos32 + 1] - pos;
    }
    pos += 8;
}
const { utf8Write } = Buffer.prototype;

function serializeAsciiJsWord(str) {
    const len = str.length;
    if (len === 0) {
        const storePos32 = allocScratch(2);
        scratchUint32[storePos32] = 0;
        return storePos32;
    }
    if (len > 7) {
        alloc(len);
        if (len < 48) {
            writeAsciiStringToBuffer(str, buff, len, pos);
        } else {
            asciiWrite.call(buff, str, pos);
        }
        const storePos32 = allocScratch(2);
        scratchUint32[storePos32] = len;
        scratchUint32[storePos32 + 1] = pos;
        pos += len;
        return storePos32;
    }
    const storePos32 = allocScratch(len > 4 ? 4 : 2);
    writeAsciiStringToBuffer(str, scratchBuff, len, (storePos32 + 1) << 2);
    scratchUint32[storePos32] = len;
    return storePos32;
}
const { asciiWrite } = Buffer.prototype;

function serializeOptionAsciiJsWord(value) {
    return serializeOption(value, serializeAsciiJsWord);
}

function serializeBoolean(value) {
    return value ? 1 : 0;
}

function finalizeBoolean(id) {
    buff[pos] = id;
    pos++;
}

function serializeNumber(num) {
    const storePos64 = allocScratch(2) >> 1;
    scratchFloat64[storePos64] = num;
    return storePos64;
}

function finalizeNumber(storePos64) {
    float64[pos >> 3] = scratchFloat64[storePos64];
    pos += 8;
}

function serializeSpan(span) {
    const storePos32 = allocScratch(4);
    scratchUint32[storePos32] = span.start;
    scratchUint32[storePos32 + 1] = span.end;
    scratchUint32[storePos32 + 2] = span.ctxt;
    return storePos32;
}

function finalizeSpan(storePos32) {
    const pos32 = pos >> 2;
    uint32[pos32] = scratchUint32[storePos32];
    uint32[pos32 + 1] = scratchUint32[storePos32 + 1];
    uint32[pos32 + 2] = scratchUint32[storePos32 + 2];
    pos += 12;
}

function serializeVecModuleItem(values) {
    return serializeVec(
        values,
        serializeModuleItem,
        finalizeModuleItem,
        156,
        4
    );
}

function serializeVecImportSpecifier(values) {
    return serializeVec(
        values,
        serializeImportSpecifier,
        finalizeImportSpecifier,
        84,
        4
    );
}

function serializeOptionModuleExportName(value) {
    return serializeOption(value, serializeModuleExportName);
}

function finalizeOptionModuleExportName(finalizeData) {
    return finalizeOption(finalizeData, finalizeModuleExportName, 4, 40);
}

function serializeOptionJsWord(value) {
    return serializeOption(value, serializeJsWord);
}

function finalizeOptionJsWord(finalizeData) {
    return finalizeOption(finalizeData, finalizeJsWord, 4, 12);
}

function serializeOptionObjectExpression(value) {
    return serializeOption(value, serializeObjectExpression);
}

function finalizeOptionObjectExpression(finalizeData) {
    return finalizeOption(finalizeData, finalizeObjectExpression, 4, 24);
}

function serializeVecSpreadElementOrBoxProperty(values) {
    return serializeVec(
        values,
        serializeSpreadElementOrBoxProperty,
        finalizeSpreadElementOrBoxProperty,
        20,
        4
    );
}

function serializeSpreadElementOrBoxProperty(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "SpreadElement":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeSpreadElement(node));
            break;
        case "Identifier":
        case "KeyValueProperty":
        case "AssignmentProperty":
        case "GetterProperty":
        case "SetterProperty":
        case "MethodProperty":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBoxProperty(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for SpreadElementOrBoxProperty"
            );
    }
    return storePos32;
}

function finalizeSpreadElementOrBoxProperty(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeSpreadElement,
                4,
                20
            );
            break;
        case 1:
            finalizeEnum(1, scratchUint32[storePos32 + 1], finalizeBox, 4, 20);
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for SpreadElementOrBoxProperty"
            );
    }
}

function serializeBoxExpression(value) {
    return serializeBox(value, serializeExpression, finalizeExpression, 136, 8);
}

function serializeVecOptionExprOrSpread(values) {
    return serializeVec(
        values,
        serializeOptionExprOrSpread,
        finalizeOptionExprOrSpread,
        24,
        4
    );
}

function serializeOptionExprOrSpread(value) {
    return serializeOption(value, serializeExprOrSpread);
}

function finalizeOptionExprOrSpread(finalizeData) {
    return finalizeOption(finalizeData, finalizeExprOrSpread, 4, 24);
}

function serializeOptionSpan(value) {
    return serializeOption(value, serializeSpan);
}

function finalizeOptionSpan(finalizeData) {
    return finalizeOption(finalizeData, finalizeSpan, 4, 16);
}

function serializeVecParameter(values) {
    return serializeVec(values, serializeParameter, finalizeParameter, 72, 4);
}

function serializeVecDecorator(values) {
    return serializeVec(values, serializeDecorator, finalizeDecorator, 16, 4);
}

function serializeOptionTsTypeAnnotation(value) {
    return serializeOption(value, serializeTsTypeAnnotation);
}

function finalizeOptionTsTypeAnnotation(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsTypeAnnotation, 4, 20);
}

function serializeBoxTsType(value) {
    return serializeBox(value, serializeTsType, finalizeTsType, 144, 8);
}

function serializeVecTsFnParameter(values) {
    return serializeVec(
        values,
        serializeTsFnParameter,
        finalizeTsFnParameter,
        52,
        4
    );
}

function serializeVecOptionPattern(values) {
    return serializeVec(
        values,
        serializeOptionPattern,
        finalizeOptionPattern,
        56,
        4
    );
}

function serializeOptionPattern(value) {
    return serializeOption(value, serializePattern);
}

function finalizeOptionPattern(finalizeData) {
    return finalizeOption(finalizeData, finalizePattern, 4, 56);
}

function serializeBoxPattern(value) {
    return serializeBox(value, serializePattern, finalizePattern, 52, 4);
}

function serializeVecObjectPatternProperty(values) {
    return serializeVec(
        values,
        serializeObjectPatternProperty,
        finalizeObjectPatternProperty,
        64,
        8
    );
}

function serializeOptionBoxExpression(value) {
    return serializeOption(value, serializeBoxExpression);
}

function finalizeOptionBoxExpression(finalizeData) {
    return finalizeOption(finalizeData, finalizeBox, 4, 8);
}

function serializeOptionTsTypeParameterDeclaration(value) {
    return serializeOption(value, serializeTsTypeParameterDeclaration);
}

function finalizeOptionTsTypeParameterDeclaration(finalizeData) {
    return finalizeOption(
        finalizeData,
        finalizeTsTypeParameterDeclaration,
        4,
        24
    );
}

function serializeVecTsTypeParameter(values) {
    return serializeVec(
        values,
        serializeTsTypeParameter,
        finalizeTsTypeParameter,
        56,
        4
    );
}

function serializeOptionBoxTsType(value) {
    return serializeOption(value, serializeBoxTsType);
}

function finalizeOptionBoxTsType(finalizeData) {
    return finalizeOption(finalizeData, finalizeBox, 4, 8);
}

function serializeBoxTsQualifiedName(value) {
    return serializeBox(
        value,
        serializeTsQualifiedName,
        finalizeTsQualifiedName,
        52,
        4
    );
}

function serializeOptionTsTypeParameterInstantiation(value) {
    return serializeOption(value, serializeTsTypeParameterInstantiation);
}

function finalizeOptionTsTypeParameterInstantiation(finalizeData) {
    return finalizeOption(
        finalizeData,
        finalizeTsTypeParameterInstantiation,
        4,
        24
    );
}

function serializeVecBoxTsType(values) {
    return serializeVec(values, serializeBoxTsType, finalizeBox, 4, 4);
}

function serializeOptionTsEntityName(value) {
    return serializeOption(value, serializeTsEntityName);
}

function finalizeOptionTsEntityName(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsEntityName, 4, 32);
}

function serializeVecTsTypeElement(values) {
    return serializeVec(
        values,
        serializeTsTypeElement,
        finalizeTsTypeElement,
        88,
        4
    );
}

function serializeVecTsTupleElement(values) {
    return serializeVec(
        values,
        serializeTsTupleElement,
        finalizeTsTupleElement,
        216,
        8
    );
}

function serializeOptionTruePlusMinus(value) {
    return serializeOption(value, serializeTruePlusMinus);
}

function finalizeOptionTruePlusMinus(finalizeData) {
    return finalizeOption(finalizeData, finalizeEnumValue, 4, 8);
}

function serializeVecTemplateElement(values) {
    return serializeVec(
        values,
        serializeTemplateElement,
        finalizeTemplateElement,
        36,
        4
    );
}

function serializeOptionBlockStatement(value) {
    return serializeOption(value, serializeBlockStatement);
}

function finalizeOptionBlockStatement(finalizeData) {
    return finalizeOption(finalizeData, finalizeBlockStatement, 4, 24);
}

function serializeVecStatement(values) {
    return serializeVec(values, serializeStatement, finalizeStatement, 152, 4);
}

function serializeBoxStatement(value) {
    return serializeBox(value, serializeStatement, finalizeStatement, 152, 4);
}

function serializeOptionIdentifier(value) {
    return serializeOption(value, serializeIdentifier);
}

function finalizeOptionIdentifier(finalizeData) {
    return finalizeOption(finalizeData, finalizeIdentifier, 4, 28);
}

function serializeOptionBoxStatement(value) {
    return serializeOption(value, serializeBoxStatement);
}

function finalizeOptionBoxStatement(finalizeData) {
    return finalizeOption(finalizeData, finalizeBox, 4, 8);
}

function serializeVecSwitchCase(values) {
    return serializeVec(values, serializeSwitchCase, finalizeSwitchCase, 28, 4);
}

function serializeOptionCatchClause(value) {
    return serializeOption(value, serializeCatchClause);
}

function finalizeOptionCatchClause(finalizeData) {
    return finalizeOption(finalizeData, finalizeCatchClause, 4, 92);
}

function serializeOptionVariableDeclarationOrBoxExpression(value) {
    return serializeOption(value, serializeVariableDeclarationOrBoxExpression);
}

function finalizeOptionVariableDeclarationOrBoxExpression(finalizeData) {
    return finalizeOption(
        finalizeData,
        finalizeVariableDeclarationOrBoxExpression,
        4,
        36
    );
}

function serializeVariableDeclarationOrBoxExpression(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "VariableDeclaration":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeVariableDeclaration(node)
            );
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
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBoxExpression(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for VariableDeclarationOrBoxExpression"
            );
    }
    return storePos32;
}

function finalizeVariableDeclarationOrBoxExpression(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeVariableDeclaration,
                4,
                32
            );
            break;
        case 1:
            finalizeEnum(1, scratchUint32[storePos32 + 1], finalizeBox, 4, 32);
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for VariableDeclarationOrBoxExpression"
            );
    }
}

function serializeVecVariableDeclarator(values) {
    return serializeVec(
        values,
        serializeVariableDeclarator,
        finalizeVariableDeclarator,
        76,
        4
    );
}

function serializeVariableDeclarationOrPattern(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "VariableDeclaration":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeVariableDeclaration(node)
            );
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
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializePattern(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for VariableDeclarationOrPattern"
            );
    }
    return storePos32;
}

function finalizeVariableDeclarationOrPattern(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeVariableDeclaration,
                4,
                56
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizePattern,
                4,
                56
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for VariableDeclarationOrPattern"
            );
    }
}

function serializeVecClassMember(values) {
    return serializeVec(
        values,
        serializeClassMember,
        finalizeClassMember,
        192,
        8
    );
}

function serializeVecTsParameterPropertyOrParameter(values) {
    return serializeVec(
        values,
        serializeTsParameterPropertyOrParameter,
        finalizeTsParameterPropertyOrParameter,
        84,
        4
    );
}

function serializeTsParameterPropertyOrParameter(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "TsParameterProperty":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(
                storePos32 + 1,
                serializeTsParameterProperty(node)
            );
            break;
        case "Parameter":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeParameter(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for TsParameterPropertyOrParameter"
            );
    }
    return storePos32;
}

function finalizeTsParameterPropertyOrParameter(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeTsParameterProperty,
                4,
                84
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeParameter,
                4,
                84
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for TsParameterPropertyOrParameter"
            );
    }
}

function serializeOptionAccessibility(value) {
    return serializeOption(value, serializeAccessibility);
}

function finalizeOptionAccessibility(finalizeData) {
    return finalizeOption(finalizeData, finalizeEnumValue, 4, 8);
}

function serializeVecTsExpressionWithTypeArguments(values) {
    return serializeVec(
        values,
        serializeTsExpressionWithTypeArguments,
        finalizeTsExpressionWithTypeArguments,
        40,
        4
    );
}

function serializeVecTsEnumMember(values) {
    return serializeVec(
        values,
        serializeTsEnumMember,
        finalizeTsEnumMember,
        56,
        4
    );
}

function serializeOptionTsNamespaceBody(value) {
    return serializeOption(value, serializeTsNamespaceBody);
}

function finalizeOptionTsNamespaceBody(finalizeData) {
    return finalizeOption(finalizeData, finalizeTsNamespaceBody, 4, 52);
}

function serializeBoxTsNamespaceBody(value) {
    return serializeBox(
        value,
        serializeTsNamespaceBody,
        finalizeTsNamespaceBody,
        48,
        4
    );
}

function serializeIdentifierOrPrivateNameOrComputed(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "PrivateName":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializePrivateName(node));
            break;
        case "Computed":
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeComputed(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for IdentifierOrPrivateNameOrComputed"
            );
    }
    return storePos32;
}

function finalizeIdentifierOrPrivateNameOrComputed(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                40
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizePrivateName,
                4,
                40
            );
            break;
        case 2:
            finalizeEnum(
                2,
                scratchUint32[storePos32 + 1],
                finalizeComputed,
                4,
                40
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for IdentifierOrPrivateNameOrComputed"
            );
    }
}

function serializeIdentifierOrComputed(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Identifier":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeIdentifier(node));
            break;
        case "Computed":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeComputed(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for IdentifierOrComputed"
            );
    }
    return storePos32;
}

function finalizeIdentifierOrComputed(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeIdentifier,
                4,
                28
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeComputed,
                4,
                28
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for IdentifierOrComputed"
            );
    }
}

function serializeSuperOrImportOrBoxExpression(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "Super":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeSuper(node));
            break;
        case "Import":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeImport(node));
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
            scratchBuff[storePos32 << 2] = 2;
            writeScratchUint32(storePos32 + 1, serializeBoxExpression(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for SuperOrImportOrBoxExpression"
            );
    }
    return storePos32;
}

function finalizeSuperOrImportOrBoxExpression(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeSuper,
                4,
                16
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeImport,
                4,
                16
            );
            break;
        case 2:
            finalizeEnum(2, scratchUint32[storePos32 + 1], finalizeBox, 4, 16);
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for SuperOrImportOrBoxExpression"
            );
    }
}

function serializeVecExprOrSpread(values) {
    return serializeVec(
        values,
        serializeExprOrSpread,
        finalizeExprOrSpread,
        20,
        4
    );
}

function serializeOptionVecExprOrSpread(value) {
    return serializeOption(value, serializeVecExprOrSpread);
}

function finalizeOptionVecExprOrSpread(finalizeData) {
    return finalizeOption(finalizeData, finalizeVec, 4, 12);
}

function serializeVecBoxExpression(values) {
    return serializeVec(values, serializeBoxExpression, finalizeBox, 4, 4);
}

function serializeVecPattern(values) {
    return serializeVec(values, serializePattern, finalizePattern, 52, 4);
}

function serializeBlockStatementOrBoxExpression(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "BlockStatement":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeBlockStatement(node));
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
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(storePos32 + 1, serializeBoxExpression(node));
            break;
        default:
            throw new Error(
                "Unexpected enum option type for BlockStatementOrBoxExpression"
            );
    }
    return storePos32;
}

function finalizeBlockStatementOrBoxExpression(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeBlockStatement,
                4,
                24
            );
            break;
        case 1:
            finalizeEnum(1, scratchUint32[storePos32 + 1], finalizeBox, 4, 24);
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for BlockStatementOrBoxExpression"
            );
    }
}

function serializeBoxJSXMemberExpression(value) {
    return serializeBox(
        value,
        serializeJSXMemberExpression,
        finalizeJSXMemberExpression,
        52,
        4
    );
}

function serializeBoxJSXElement(value) {
    return serializeBox(value, serializeJSXElement, finalizeJSXElement, 196, 4);
}

function serializeVecJSXAttributeOrSpread(values) {
    return serializeVec(
        values,
        serializeJSXAttributeOrSpread,
        finalizeJSXAttributeOrSpread,
        136,
        8
    );
}

function serializeOptionJSXAttributeValue(value) {
    return serializeOption(value, serializeJSXAttributeValue);
}

function finalizeOptionJSXAttributeValue(finalizeData) {
    return finalizeOption(finalizeData, finalizeJSXAttributeValue, 8, 64);
}

function serializeVecJSXElementChild(values) {
    return serializeVec(
        values,
        serializeJSXElementChild,
        finalizeJSXElementChild,
        48,
        4
    );
}

function serializeOptionJSXClosingElement(value) {
    return serializeOption(value, serializeJSXClosingElement);
}

function finalizeOptionJSXClosingElement(finalizeData) {
    return finalizeOption(finalizeData, finalizeJSXClosingElement, 4, 72);
}

function serializeMemberExpressionOrOptionalChainingCall(node) {
    const storePos32 = allocScratch(2);
    switch (node.type) {
        case "MemberExpression":
            scratchBuff[storePos32 << 2] = 0;
            writeScratchUint32(storePos32 + 1, serializeMemberExpression(node));
            break;
        case "CallExpression":
            scratchBuff[storePos32 << 2] = 1;
            writeScratchUint32(
                storePos32 + 1,
                serializeOptionalChainingCall(node)
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option type for MemberExpressionOrOptionalChainingCall"
            );
    }
    return storePos32;
}

function finalizeMemberExpressionOrOptionalChainingCall(storePos32) {
    switch (scratchBuff[storePos32 << 2]) {
        case 0:
            finalizeEnum(
                0,
                scratchUint32[storePos32 + 1],
                finalizeMemberExpression,
                4,
                60
            );
            break;
        case 1:
            finalizeEnum(
                1,
                scratchUint32[storePos32 + 1],
                finalizeOptionalChainingCall,
                4,
                60
            );
            break;
        default:
            throw new Error(
                "Unexpected enum option ID for MemberExpressionOrOptionalChainingCall"
            );
    }
}

function serializeBoxProperty(value) {
    return serializeBox(value, serializeProperty, finalizeProperty, 160, 8);
}

function serializeVecExportSpecifier(values) {
    return serializeVec(
        values,
        serializeExportSpecifier,
        finalizeExportSpecifier,
        96,
        4
    );
}

function serializeOptionStringLiteral(value) {
    return serializeOption(value, serializeStringLiteral);
}

function finalizeOptionStringLiteral(finalizeData) {
    return finalizeOption(finalizeData, finalizeStringLiteral, 4, 36);
}

function serialize(ast) {
    pos = 0;
    scratchPos32 = 2;
    const storePos32 = serializeProgram(ast);
    alignPos(4);
    alloc(44);
    uint32[pos >> 2] = 1;
    pos += 4;
    finalizeProgram(storePos32);
    int32[pos >> 2] = -40;
    return buff.subarray(0, pos + 4);
}

function serializeOption(value, serialize) {
    return value === null ? 0 : serialize(value);
}

function serializeBox(value, serialize, finalize, valueLength, valueAlign) {
    const scratchPos32Before = scratchPos32;
    const finalizeData = serialize(value);
    alignPos(valueAlign);
    alloc(valueLength);
    const valuePos = pos;
    finalize(finalizeData);
    scratchPos32 = scratchPos32Before;
    return valuePos | 0x80000000;
}

function serializeVec(values, serialize, finalize, valueLength, valueAlign) {
    const storePos32 = allocScratch(2);
    const numValues = values.length;
    scratchUint32[storePos32 + 1] = numValues;
    if (numValues === 0) {
        alignPos(valueAlign);
        scratchUint32[storePos32] = pos;
        return storePos32;
    }
    const scratchPos32Before = scratchPos32;
    const finalizeData = new Array(numValues);
    for (let i = 0; i < numValues; i++) {
        finalizeData[i] = serialize(values[i]);
    }
    alignPos(valueAlign);
    alloc(valueLength * numValues);
    scratchUint32[storePos32] = pos;
    for (let i = 0; i < numValues; i++) {
        finalize(finalizeData[i]);
    }
    scratchPos32 = scratchPos32Before;
    return storePos32;
}

function finalizeEnum(id, finalizeData, finalize, offset, length) {
    const startPos = pos;
    uint32[pos >> 2] = id;
    pos += offset;
    finalize(finalizeData);
    pos = startPos + length;
}

function finalizeEnumValue(id) {
    uint32[pos >> 2] = id & 255;
    pos += 4;
}

function finalizeOption(finalizeData, finalize, offset, length) {
    if (finalizeData === 0) {
        buff[pos] = 0;
        pos += length;
    } else {
        buff[pos] = 1;
        pos += offset;
        finalize(finalizeData);
    }
}

function finalizeBox(valuePos) {
    int32[pos >> 2] = (valuePos & 0x7fffffff) - pos;
    pos += 4;
}

function finalizeVec(storePos32) {
    const pos32 = pos >> 2;
    int32[pos32] = scratchUint32[storePos32] - pos;
    uint32[pos32 + 1] = scratchUint32[storePos32 + 1];
    pos += 8;
}

function resetBuffers() {
    buffLen = 65536;
    scratchLen32 = 2048;
    initBuffer();
    initScratch();
}

function initBuffer() {
    buff = Buffer.allocUnsafeSlow(buffLen);
    const arrayBuffer = buff.buffer;
    uint16 = new Uint16Array(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    float64 = new Float64Array(arrayBuffer);
}

function alloc(bytes) {
    const end = pos + bytes;
    if (end > buffLen) growBuffer(end);
}

function growBuffer(minLen) {
    do {
        buffLen *= 2;
    } while (buffLen < minLen);
    if (buffLen > 2147483648) {
        throw new Error("Exceeded maximum serialization buffer size");
    }
    const oldBuff = buff;
    initBuffer();
    buff.set(oldBuff);
}

function alignPos(align) {
    if (align !== 1) {
        const modulus = pos & (align - 1);
        if (modulus !== 0) pos += align - modulus;
    }
}

function initScratch() {
    scratchBuff = Buffer.allocUnsafeSlow(scratchLen32 << 2);
    const arrayBuffer = scratchBuff.buffer;
    scratchUint16 = new Uint16Array(arrayBuffer);
    scratchUint32 = new Uint32Array(arrayBuffer);
    scratchFloat64 = new Float64Array(arrayBuffer);
}

function allocScratch(bytes32) {
    const startPos32 = scratchPos32;
    scratchPos32 += bytes32;
    if (scratchPos32 > scratchLen32) growScratch();
    return startPos32;
}

function allocScratchAligned(bytes) {
    const mod = bytes & 7;
    return allocScratch(mod === 0 ? bytes : (bytes + 8 - mod) >> 2);
}

function growScratch() {
    do {
        scratchLen32 *= 2;
    } while (scratchLen32 < scratchPos32);
    if (scratchLen32 > 536870912) {
        throw new Error("Exceeded maximum scratch buffer size");
    }
    const oldScratchBuff = scratchBuff;
    initScratch();
    scratchBuff.set(oldScratchBuff);
}

function writeScratchUint32(pos32, value) {
    scratchUint32[pos32] = value;
}

function copyFromScratch(scratchPos32, len) {
    if ((pos & 3) === 0) {
        let pos32 = pos >> 2;
        const last32 = pos32 + (len >> 2) - 1;
        uint32[pos32] = scratchUint32[scratchPos32];
        uint32[++pos32] = scratchUint32[++scratchPos32];
        while (pos32 < last32) {
            uint32[++pos32] = scratchUint32[++scratchPos32];
        }
        if (len & 3) {
            if (len & 2) {
                pos32++;
                scratchPos32++;
                uint16[pos32 << 1] = scratchUint16[scratchPos32 << 1];
                if (len & 1)
                    buff[(pos32 << 2) + 2] =
                        scratchBuff[(scratchPos32 << 2) + 2];
            } else {
                buff[(pos32 + 1) << 2] = scratchBuff[(scratchPos32 + 1) << 2];
            }
        }
    } else if ((pos & 1) === 0) {
        let pos16 = pos >> 1,
            scratchPos16 = scratchPos32 << 1;
        const last16 = pos16 + (len >> 1) - 1;
        uint16[pos16] = scratchUint16[scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        while (pos16 < last16) {
            uint16[++pos16] = scratchUint16[++scratchPos16];
        }
        if (len & 1)
            buff[(pos16 + 1) << 1] = scratchBuff[(scratchPos16 + 1) << 1];
    } else {
        let pos8 = pos,
            scratchPos8 = scratchPos32 << 2;
        const last8 = pos + len - 1;
        buff[pos8] = scratchBuff[scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        buff[++pos8] = scratchBuff[++scratchPos8];
        while (pos8 < last8) {
            buff[++pos8] = scratchBuff[++scratchPos8];
        }
    }
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

serialize.resetBuffers = resetBuffers;

serialize.replaceFinalizeJsWord = () => {
    const original = finalizeJsWord;
    finalizeJsWord = function (storePos32) {
        const len = scratchUint32[storePos32];
        if (len <= 7) {
            if (len > 0) {
                const pos32 = pos >> 2;
                uint32[pos32] = scratchUint32[storePos32 + 1];
                if (len > 4) uint32[pos32 + 1] = scratchUint32[storePos32 + 2];
            }

            /* DEBUG_ONLY_START */
            // Zero out extra bytes which were copied after end of string.
            // It doesn't matter that this happens, but makes it hard to validate
            // output by comparing buffers as it introduces a random element.
            if (len !== 0 && len !== 4 && len !== 7) {
                for (
                    let emptyPos = pos + len;
                    emptyPos < pos + (len < 4 ? 4 : 7);
                    emptyPos++
                ) {
                    buff[emptyPos] = 0;
                }
            }
            /* DEBUG_ONLY_END */

            buff[pos + 7] = len;
        } else {
            const pos32 = pos >> 2;
            // Length always stored little-endian, regardless of machine architecture
            // TODO Need to alter next line to write as little-endian on big-endian systems
            uint32[pos32] = len;
            int32[pos32 + 1] = scratchUint32[storePos32 + 1] - pos;
        }
        pos += 8;
    };
    return () => {
        finalizeJsWord = original;
    };
};

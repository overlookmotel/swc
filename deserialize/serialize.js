// Generated code. Do not edit.

'use strict';

module.exports = serialize;

let pos, buffLen, buff, uint16, int32, uint32, float64;

let scratchPos, scratchLen, scratchBuff, scratchUint16, scratchUint32, scratchFloat64;

resetBuffers();

function serialize(ast) {
    pos = 0;
    scratchPos = 0;
    const storePos = serializeProgram(ast);
    alignPos(4);
    alloc(36);
    finalizeProgram(storePos);
    return buff.subarray(0, pos);
}

function resetBuffers() {
    buffLen = 8192;
    scratchLen = 8192;
    initBuffer();
    initScratch();
}

function serializeProgram(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'M':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeModule(node));
            break;
        case 'S':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeScript(node));
            break;
        default: throw new Error('Unexpected enum option type for Program');
    }
    return storePos;
}

function finalizeProgram(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeModule, 4, 36); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeScript, 4, 36); break;
        default: throw new Error('Unexpected enum option ID for Program');
    }
}

function serializeModule(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecModuleDeclarationOrStatement(node.body));
    writeScratchUint32(storePos32 + 2, serializeOptionJsWord(node.interpreter));
    return storePos32;
}

function finalizeModule(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
}

function serializeScript(node) {
    const storePos32 = allocScratch(16) >> 2;
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

function serializeModuleDeclaration(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'E':
            switch (type[6]) {
                case 'A':
                    scratchBuff[storePos] = 5;
                    writeScratchUint32((storePos >> 2) + 1, serializeExportAllDeclaration(node));
                    break;
                case 'D':
                    switch (type[8]) {
                        case 'c':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeExportDeclaration(node));
                            break;
                        case 'f':
                            switch (type[13]) {
                                case 'D':
                                    scratchBuff[storePos] = 3;
                                    writeScratchUint32((storePos >> 2) + 1, serializeExportDefaultDeclaration(node));
                                    break;
                                case 'E':
                                    scratchBuff[storePos] = 4;
                                    writeScratchUint32((storePos >> 2) + 1, serializeExportDefaultExpression(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for ModuleDeclaration');
                            }
                            break;
                        default: throw new Error('Unexpected enum option type for ModuleDeclaration');
                    }
                    break;
                case 'N':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeExportNamedDeclaration(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclaration');
            }
            break;
        case 'I':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeImportDeclaration(node));
            break;
        case 'T':
            switch (type[2]) {
                case 'E':
                    scratchBuff[storePos] = 7;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsExportAssignment(node));
                    break;
                case 'I':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsImportEqualsDeclaration(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 8;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsNamespaceExportDeclaration(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclaration');
            }
            break;
        default: throw new Error('Unexpected enum option type for ModuleDeclaration');
    }
    return storePos;
}

function finalizeModuleDeclaration(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeImportDeclaration, 4, 148); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeExportDeclaration, 4, 148); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeExportNamedDeclaration, 4, 148); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeExportDefaultDeclaration, 4, 148); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeExportDefaultExpression, 4, 148); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeExportAllDeclaration, 4, 148); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeTsImportEqualsDeclaration, 4, 148); break;
        case 7: finalizeEnum(7, scratchUint32[(storePos >> 2) + 1], finalizeTsExportAssignment, 4, 148); break;
        case 8: finalizeEnum(8, scratchUint32[(storePos >> 2) + 1], finalizeTsNamespaceExportDeclaration, 4, 148); break;
        default: throw new Error('Unexpected enum option ID for ModuleDeclaration');
    }
}

function serializeImportDeclaration(node) {
    const storePos32 = allocScratch(24) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecImportSpecifier(node.specifiers));
    writeScratchUint32(storePos32 + 2, serializeStringLiteral(node.source));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.typeOnly));
    writeScratchUint32(storePos32 + 4, serializeOptionObjectExpression(node.asserts));
    return storePos32;
}

function finalizeImportDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeStringLiteral(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    pos += 3;
    finalizeOptionObjectExpression(scratchUint32[storePos32 + 4]);
}

function serializeImportSpecifier(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[6]) {
        case 'D':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeImportDefaultSpecifier(node));
            break;
        case 'N':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeImportNamespaceSpecifier(node));
            break;
        case 'S':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeImportNamedSpecifier(node));
            break;
        default: throw new Error('Unexpected enum option type for ImportSpecifier');
    }
    return storePos;
}

function finalizeImportSpecifier(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeImportNamedSpecifier, 4, 84); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeImportDefaultSpecifier, 4, 84); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeImportNamespaceSpecifier, 4, 84); break;
        default: throw new Error('Unexpected enum option ID for ImportSpecifier');
    }
}

function serializeImportNamedSpecifier(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.local));
    writeScratchUint32(storePos32 + 2, serializeOptionModuleExportName(node.imported));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.isTypeOnly));
    return storePos32;
}

function finalizeImportNamedSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeOptionModuleExportName(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    pos += 3;
}

function serializeImportDefaultSpecifier(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.local));
    return storePos32;
}

function finalizeImportDefaultSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeImportNamespaceSpecifier(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.local));
    return storePos32;
}

function finalizeImportNamespaceSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeExportDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeDeclaration(node.declaration));
    return storePos32;
}

function finalizeExportDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeDeclaration(scratchUint32[storePos32 + 1]);
}

function serializeExportNamedDeclaration(node) {
    const storePos32 = allocScratch(24) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecExportSpecifier(node.specifiers));
    writeScratchUint32(storePos32 + 2, serializeOptionStringLiteral(node.source));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.typeOnly));
    writeScratchUint32(storePos32 + 4, serializeOptionObjectExpression(node.asserts));
    return storePos32;
}

function finalizeExportNamedDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeOptionStringLiteral(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    pos += 3;
    finalizeOptionObjectExpression(scratchUint32[storePos32 + 4]);
}

function serializeExportSpecifier(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[6]) {
        case 'D':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeExportDefaultSpecifier(node));
            break;
        case 'N':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeExportNamespaceSpecifier(node));
            break;
        case 'S':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeExportNamedSpecifier(node));
            break;
        default: throw new Error('Unexpected enum option type for ExportSpecifier');
    }
    return storePos;
}

function finalizeExportSpecifier(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeExportNamespaceSpecifier, 4, 96); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeExportDefaultSpecifier, 4, 96); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeExportNamedSpecifier, 4, 96); break;
        default: throw new Error('Unexpected enum option ID for ExportSpecifier');
    }
}

function serializeExportNamespaceSpecifier(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeModuleExportName(node.name));
    return storePos32;
}

function finalizeExportNamespaceSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeModuleExportName(scratchUint32[storePos32 + 1]);
}

function serializeExportDefaultSpecifier(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.exported));
    return storePos32;
}

function finalizeExportDefaultSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeExportNamedSpecifier(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeModuleExportName(node.orig));
    writeScratchUint32(storePos32 + 2, serializeOptionModuleExportName(node.exported));
    writeScratchUint32(storePos32 + 3, serializeBoolean(node.isTypeOnly));
    return storePos32;
}

function finalizeExportNamedSpecifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeModuleExportName(scratchUint32[storePos32 + 1]);
    finalizeOptionModuleExportName(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    pos += 3;
}

function serializeExportDefaultDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(node.decl));
    return storePos32;
}

function finalizeExportDefaultDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(scratchUint32[storePos32 + 1]);
}

function serializeExportDefaultExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeExportDefaultExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeExportAllDeclaration(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeStringLiteral(node.source));
    writeScratchUint32(storePos32 + 2, serializeOptionObjectExpression(node.asserts));
    return storePos32;
}

function finalizeExportAllDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeStringLiteral(scratchUint32[storePos32 + 1]);
    finalizeOptionObjectExpression(scratchUint32[storePos32 + 2]);
}

function serializeModuleExportName(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'I':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeIdentifier(node));
            break;
        case 'S':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeStringLiteral(node));
            break;
        default: throw new Error('Unexpected enum option type for ModuleExportName');
    }
    return storePos;
}

function finalizeModuleExportName(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeIdentifier, 4, 36); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeStringLiteral, 4, 36); break;
        default: throw new Error('Unexpected enum option ID for ModuleExportName');
    }
}

function serializeStatement(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'B':
            switch (type[1]) {
                case 'l':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBlockStatement(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBreakStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'l':
                    scratchBuff[storePos] = 17;
                    writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 7;
                    writeScratchUint32((storePos >> 2) + 1, serializeContinueStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        case 'D':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeDebuggerStatement(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 13;
                    writeScratchUint32((storePos >> 2) + 1, serializeDoWhileStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        case 'E':
            switch (type[1]) {
                case 'm':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeEmptyStatement(node));
                    break;
                case 'x':
                    scratchBuff[storePos] = 18;
                    writeScratchUint32((storePos >> 2) + 1, serializeExpressionStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        case 'F':
            switch (type[1]) {
                case 'o':
                    switch (type[3]) {
                        case 'I':
                            scratchBuff[storePos] = 15;
                            writeScratchUint32((storePos >> 2) + 1, serializeForInStatement(node));
                            break;
                        case 'O':
                            scratchBuff[storePos] = 16;
                            writeScratchUint32((storePos >> 2) + 1, serializeForOfStatement(node));
                            break;
                        case 'S':
                            scratchBuff[storePos] = 14;
                            writeScratchUint32((storePos >> 2) + 1, serializeForStatement(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Statement');
                    }
                    break;
                case 'u':
                    scratchBuff[storePos] = 17;
                    writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        case 'I':
            scratchBuff[storePos] = 8;
            writeScratchUint32((storePos >> 2) + 1, serializeIfStatement(node));
            break;
        case 'L':
            scratchBuff[storePos] = 5;
            writeScratchUint32((storePos >> 2) + 1, serializeLabeledStatement(node));
            break;
        case 'R':
            scratchBuff[storePos] = 4;
            writeScratchUint32((storePos >> 2) + 1, serializeReturnStatement(node));
            break;
        case 'S':
            scratchBuff[storePos] = 9;
            writeScratchUint32((storePos >> 2) + 1, serializeSwitchStatement(node));
            break;
        case 'T':
            switch (type[1]) {
                case 'h':
                    scratchBuff[storePos] = 10;
                    writeScratchUint32((storePos >> 2) + 1, serializeThrowStatement(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 11;
                    writeScratchUint32((storePos >> 2) + 1, serializeTryStatement(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'E':
                            scratchBuff[storePos] = 17;
                            writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 17;
                            writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
                            break;
                        case 'M':
                            scratchBuff[storePos] = 17;
                            writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 17;
                            writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Statement');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        case 'V':
            scratchBuff[storePos] = 17;
            writeScratchUint32((storePos >> 2) + 1, serializeDeclaration(node));
            break;
        case 'W':
            switch (type[1]) {
                case 'h':
                    scratchBuff[storePos] = 12;
                    writeScratchUint32((storePos >> 2) + 1, serializeWhileStatement(node));
                    break;
                case 'i':
                    scratchBuff[storePos] = 3;
                    writeScratchUint32((storePos >> 2) + 1, serializeWithStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for Statement');
            }
            break;
        default: throw new Error('Unexpected enum option type for Statement');
    }
    return storePos;
}

function finalizeStatement(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeBlockStatement, 4, 152); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeEmptyStatement, 4, 152); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeDebuggerStatement, 4, 152); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeWithStatement, 4, 152); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeReturnStatement, 4, 152); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeLabeledStatement, 4, 152); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeBreakStatement, 4, 152); break;
        case 7: finalizeEnum(7, scratchUint32[(storePos >> 2) + 1], finalizeContinueStatement, 4, 152); break;
        case 8: finalizeEnum(8, scratchUint32[(storePos >> 2) + 1], finalizeIfStatement, 4, 152); break;
        case 9: finalizeEnum(9, scratchUint32[(storePos >> 2) + 1], finalizeSwitchStatement, 4, 152); break;
        case 10: finalizeEnum(10, scratchUint32[(storePos >> 2) + 1], finalizeThrowStatement, 4, 152); break;
        case 11: finalizeEnum(11, scratchUint32[(storePos >> 2) + 1], finalizeTryStatement, 4, 152); break;
        case 12: finalizeEnum(12, scratchUint32[(storePos >> 2) + 1], finalizeWhileStatement, 4, 152); break;
        case 13: finalizeEnum(13, scratchUint32[(storePos >> 2) + 1], finalizeDoWhileStatement, 4, 152); break;
        case 14: finalizeEnum(14, scratchUint32[(storePos >> 2) + 1], finalizeForStatement, 4, 152); break;
        case 15: finalizeEnum(15, scratchUint32[(storePos >> 2) + 1], finalizeForInStatement, 4, 152); break;
        case 16: finalizeEnum(16, scratchUint32[(storePos >> 2) + 1], finalizeForOfStatement, 4, 152); break;
        case 17: finalizeEnum(17, scratchUint32[(storePos >> 2) + 1], finalizeDeclaration, 4, 152); break;
        case 18: finalizeEnum(18, scratchUint32[(storePos >> 2) + 1], finalizeExpressionStatement, 4, 152); break;
        default: throw new Error('Unexpected enum option ID for Statement');
    }
}

function serializeBlockStatement(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecStatement(node.stmts));
    return storePos32;
}

function finalizeBlockStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeEmptyStatement(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeEmptyStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeDebuggerStatement(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeDebuggerStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeWithStatement(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionBoxExpression(node.argument));
    return storePos32;
}

function finalizeReturnStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 1]);
}

function serializeLabeledStatement(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionIdentifier(node.label));
    return storePos32;
}

function finalizeBreakStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeContinueStatement(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionIdentifier(node.label));
    return storePos32;
}

function finalizeContinueStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeIfStatement(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.test));
    writeScratchUint32(storePos32 + 2, serializeBoxStatement(node.consequent));
    writeScratchUint32(storePos32 + 3, serializeOptionBoxStatement(node.alternate));
    return storePos32;
}

function finalizeIfStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeOptionBoxStatement(scratchUint32[storePos32 + 3]);
}

function serializeSwitchStatement(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.discriminant));
    writeScratchUint32(storePos32 + 2, serializeVecSwitchCase(node.cases));
    return storePos32;
}

function finalizeSwitchStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
}

function serializeSwitchCase(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeThrowStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTryStatement(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBlockStatement(node.block));
    writeScratchUint32(storePos32 + 2, serializeOptionCatchClause(node.handler));
    writeScratchUint32(storePos32 + 3, serializeOptionBlockStatement(node.finalizer));
    return storePos32;
}

function finalizeTryStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBlockStatement(scratchUint32[storePos32 + 1]);
    finalizeOptionCatchClause(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
}

function serializeCatchClause(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(24) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionVariableDeclarationOrBoxExpression(node.init));
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.test));
    writeScratchUint32(storePos32 + 3, serializeOptionBoxExpression(node.update));
    writeScratchUint32(storePos32 + 4, serializeBoxStatement(node.body));
    return storePos32;
}

function finalizeForStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionVariableDeclarationOrBoxExpression(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 3]);
    finalizeBox(scratchUint32[storePos32 + 4]);
}

function serializeForInStatement(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVariableDeclarationOrPattern(node.left));
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
    const storePos32 = allocScratch(24) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionSpan(node.await));
    writeScratchUint32(storePos32 + 2, serializeVariableDeclarationOrPattern(node.left));
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeExpressionStatement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeDeclaration(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'C':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeClassDeclaration(node));
            break;
        case 'F':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeFunctionDeclaration(node));
            break;
        case 'T':
            switch (type[2]) {
                case 'E':
                    scratchBuff[storePos] = 5;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsEnumDeclaration(node));
                    break;
                case 'I':
                    scratchBuff[storePos] = 3;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsInterfaceDeclaration(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsModuleDeclaration(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 4;
                    writeScratchUint32((storePos >> 2) + 1, serializeTsTypeAliasDeclaration(node));
                    break;
                default: throw new Error('Unexpected enum option type for Declaration');
            }
            break;
        case 'V':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeVariableDeclaration(node));
            break;
        default: throw new Error('Unexpected enum option type for Declaration');
    }
    return storePos;
}

function finalizeDeclaration(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeClassDeclaration, 4, 132); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeFunctionDeclaration, 4, 132); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeVariableDeclaration, 4, 132); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeTsInterfaceDeclaration, 4, 132); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeTsTypeAliasDeclaration, 4, 132); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeTsEnumDeclaration, 4, 132); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeTsModuleDeclaration, 4, 132); break;
        default: throw new Error('Unexpected enum option ID for Declaration');
    }
}

function serializeVariableDeclaration(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVariableDeclarationKind(node.kind));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 3, serializeVecVariableDeclarator(node.declarations));
    return storePos32;
}

function finalizeVariableDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 2;
    finalizeVec(scratchUint32[storePos32 + 3]);
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
    const storePos32 = allocScratch(16) >> 2;
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
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    pos += 3;
}

function serializeFunctionDeclaration(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializeIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 3, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 4, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 5, serializeOptionBlockStatement(node.body));
    writeScratchUint32(storePos32 + 6, serializeOptionTsTypeParameterDeclaration(node.typeParameters));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.async));
    writeScratchUint32(storePos32 + 9, serializeOptionTsTypeAnnotation(node.returnType));
    return storePos32;
}

function finalizeFunctionDeclaration(storePos32) {
    finalizeIdentifier(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeVec(scratchUint32[storePos32 + 3]);
    finalizeSpan(scratchUint32[storePos32 + 4]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 5]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 6]);
    finalizeEnumValue(scratchUint32[storePos32 + 7]);
    finalizeEnumValue(scratchUint32[storePos32 + 8]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 9]);
}

function serializeFunctionExpression(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializeOptionIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 1, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 2, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 3, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 4, serializeOptionBlockStatement(node.body));
    writeScratchUint32(storePos32 + 5, serializeOptionTsTypeParameterDeclaration(node.typeParameters));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.async));
    writeScratchUint32(storePos32 + 8, serializeOptionTsTypeAnnotation(node.returnType));
    return storePos32;
}

function finalizeFunctionExpression(storePos32) {
    finalizeOptionIdentifier(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeSpan(scratchUint32[storePos32 + 3]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 4]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 5]);
    finalizeEnumValue(scratchUint32[storePos32 + 6]);
    finalizeEnumValue(scratchUint32[storePos32 + 7]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 8]);
}

function serializeArrowFunctionExpression(node) {
    const storePos32 = allocScratch(32) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecPattern(node.params));
    writeScratchUint32(storePos32 + 2, serializeBlockStatementOrBoxExpression(node.body));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeParameterDeclaration(node.typeParameters));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.async));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 6, serializeOptionTsTypeAnnotation(node.returnType));
    return storePos32;
}

function finalizeArrowFunctionExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeBlockStatementOrBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 3]);
    finalizeEnumValue(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 6]);
}

function serializeParameter(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeDecorator(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeClassDeclaration(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializeIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 2, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 3, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 4, serializeVecClassMember(node.body));
    writeScratchUint32(storePos32 + 5, serializeOptionBoxExpression(node.superClass));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 7, serializeOptionTsTypeParamDeclaration(node.typeParams));
    writeScratchUint32(storePos32 + 8, serializeOptionTsTypeParameterInstantiation(node.superTypeParams));
    writeScratchUint32(storePos32 + 9, serializeVecTsExpressionWithTypeArg(node.implements));
    return storePos32;
}

function finalizeClassDeclaration(storePos32) {
    finalizeIdentifier(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeSpan(scratchUint32[storePos32 + 2]);
    finalizeVec(scratchUint32[storePos32 + 3]);
    finalizeVec(scratchUint32[storePos32 + 4]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 5]);
    finalizeEnumValue(scratchUint32[storePos32 + 6]);
    pos += 3;
    finalizeOptionTsTypeParamDeclaration(scratchUint32[storePos32 + 7]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 8]);
    finalizeVec(scratchUint32[storePos32 + 9]);
}

function serializeClassExpression(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializeOptionIdentifier(node.identifier));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 3, serializeVecClassMember(node.body));
    writeScratchUint32(storePos32 + 4, serializeOptionBoxExpression(node.superClass));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 6, serializeOptionTsTypeParamDeclaration(node.typeParams));
    writeScratchUint32(storePos32 + 7, serializeOptionTsTypeParameterInstantiation(node.superTypeParams));
    writeScratchUint32(storePos32 + 8, serializeVecTsExpressionWithTypeArg(node.implements));
    return storePos32;
}

function finalizeClassExpression(storePos32) {
    finalizeOptionIdentifier(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeVec(scratchUint32[storePos32 + 3]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    pos += 3;
    finalizeOptionTsTypeParamDeclaration(scratchUint32[storePos32 + 6]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 7]);
    finalizeVec(scratchUint32[storePos32 + 8]);
}

function serializeClassMember(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'C':
            switch (type[1]) {
                case 'l':
                    switch (type[5]) {
                        case 'M':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeClassMethod(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 3;
                            writeScratchUint32((storePos >> 2) + 1, serializeClassProperty(node));
                            break;
                        default: throw new Error('Unexpected enum option type for ClassMember');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeConstructor(node));
                    break;
                default: throw new Error('Unexpected enum option type for ClassMember');
            }
            break;
        case 'E':
            scratchBuff[storePos] = 6;
            writeScratchUint32((storePos >> 2) + 1, serializeEmptyStatement(node));
            break;
        case 'P':
            switch (type[7]) {
                case 'M':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializePrivateMethod(node));
                    break;
                case 'P':
                    scratchBuff[storePos] = 4;
                    writeScratchUint32((storePos >> 2) + 1, serializePrivateProperty(node));
                    break;
                default: throw new Error('Unexpected enum option type for ClassMember');
            }
            break;
        case 'S':
            scratchBuff[storePos] = 7;
            writeScratchUint32((storePos >> 2) + 1, serializeStaticBlock(node));
            break;
        case 'T':
            scratchBuff[storePos] = 5;
            writeScratchUint32((storePos >> 2) + 1, serializeTsIndexSignature(node));
            break;
        default: throw new Error('Unexpected enum option type for ClassMember');
    }
    return storePos;
}

function finalizeClassMember(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeConstructor, 8, 168); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeClassMethod, 8, 168); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizePrivateMethod, 4, 168); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeClassProperty, 8, 168); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizePrivateProperty, 4, 168); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeTsIndexSignature, 4, 168); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeEmptyStatement, 4, 168); break;
        case 7: finalizeEnum(7, scratchUint32[(storePos >> 2) + 1], finalizeStaticBlock, 4, 168); break;
        default: throw new Error('Unexpected enum option ID for ClassMember');
    }
}

function serializeConstructor(node) {
    const storePos32 = allocScratch(24) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializeVecTsParamPropOrParameter(node.params));
    writeScratchUint32(storePos32 + 3, serializeOptionBlockStatement(node.body));
    writeScratchUint32(storePos32 + 4, serializeOptionAccessibility(node.accessibility));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isOptional));
    return storePos32;
}

function finalizeConstructor(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    pos += 1;
}

function serializeClassMethod(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializeFunction(node.function));
    writeScratchUint32(storePos32 + 3, serializeMethodKind(node.kind));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isStatic));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 7, serializeOptionAccessibility(node.accessibility));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOverride));
    return storePos32;
}

function finalizeClassMethod(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeFunction(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    finalizeEnumValue(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    finalizeEnumValue(scratchUint32[storePos32 + 6]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 7]);
    finalizeEnumValue(scratchUint32[storePos32 + 8]);
    pos += 1;
}

function serializePrivateMethod(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePrivateName(node.key));
    writeScratchUint32(storePos32 + 2, serializeFunction(node.function));
    writeScratchUint32(storePos32 + 3, serializeMethodKind(node.kind));
    writeScratchUint32(storePos32 + 4, serializeBoolean(node.isStatic));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 7, serializeOptionAccessibility(node.accessibility));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOverride));
    return storePos32;
}

function finalizePrivateMethod(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizePrivateName(scratchUint32[storePos32 + 1]);
    finalizeFunction(scratchUint32[storePos32 + 2]);
    finalizeEnumValue(scratchUint32[storePos32 + 3]);
    finalizeEnumValue(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    finalizeEnumValue(scratchUint32[storePos32 + 6]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 7]);
    finalizeEnumValue(scratchUint32[storePos32 + 8]);
    pos += 1;
}

function serializeClassProperty(node) {
    const storePos32 = allocScratch(56) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.value));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    writeScratchUint32(storePos32 + 4, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isStatic));
    writeScratchUint32(storePos32 + 6, serializeOptionAccessibility(node.accessibility));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.isAbstract));
    writeScratchUint32(storePos32 + 8, serializeBoolean(node.isOptional));
    writeScratchUint32(storePos32 + 9, serializeBoolean(node.isOverride));
    writeScratchUint32(storePos32 + 10, serializeBoolean(node.readonly));
    writeScratchUint32(storePos32 + 11, serializeBoolean(node.declare));
    writeScratchUint32(storePos32 + 12, serializeBoolean(node.definite));
    return storePos32;
}

function finalizeClassProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
    finalizeVec(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 6]);
    finalizeEnumValue(scratchUint32[storePos32 + 7]);
    finalizeEnumValue(scratchUint32[storePos32 + 8]);
    finalizeEnumValue(scratchUint32[storePos32 + 9]);
    finalizeEnumValue(scratchUint32[storePos32 + 10]);
    finalizeEnumValue(scratchUint32[storePos32 + 11]);
    finalizeEnumValue(scratchUint32[storePos32 + 12]);
    pos += 7;
}

function serializePrivateProperty(node) {
    const storePos32 = allocScratch(48) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializePrivateName(node.key));
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.value));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    writeScratchUint32(storePos32 + 4, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.isStatic));
    writeScratchUint32(storePos32 + 6, serializeOptionAccessibility(node.accessibility));
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
    finalizeVec(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    finalizeOptionAccessibility(scratchUint32[storePos32 + 6]);
    finalizeEnumValue(scratchUint32[storePos32 + 7]);
    finalizeEnumValue(scratchUint32[storePos32 + 8]);
    finalizeEnumValue(scratchUint32[storePos32 + 9]);
    finalizeEnumValue(scratchUint32[storePos32 + 10]);
    pos += 1;
}

function serializeStaticBlock(node) {
    const storePos32 = allocScratch(8) >> 2;
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
        case 'method': return 0;
        case 'getter': return 1;
        case 'setter': return 2;
        default: throw new Error('Unexpected enum value for MethodKind');
    }
}

function serializeFunction(node) {
    const storePos32 = allocScratch(32) >> 2;
    writeScratchUint32(storePos32, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 1, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 2, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 3, serializeOptionBlockStatement(node.body));
    writeScratchUint32(storePos32 + 4, serializeOptionTsTypeParamDeclaration(node.typeParameters));
    writeScratchUint32(storePos32 + 5, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.async));
    writeScratchUint32(storePos32 + 7, serializeOptionTsTypeAnnotation(node.returnType));
    return storePos32;
}

function finalizeFunction(storePos32) {
    finalizeVec(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeSpan(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
    finalizeOptionTsTypeParamDeclaration(scratchUint32[storePos32 + 4]);
    finalizeEnumValue(scratchUint32[storePos32 + 5]);
    finalizeEnumValue(scratchUint32[storePos32 + 6]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 7]);
}

function serializePattern(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            switch (type[5]) {
                                case 'E':
                                    scratchBuff[storePos] = 6;
                                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                                    break;
                                case 'P':
                                    scratchBuff[storePos] = 1;
                                    writeScratchUint32((storePos >> 2) + 1, serializeArrayPattern(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for Pattern');
                            }
                            break;
                        case 'o':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                case 's':
                    switch (type[10]) {
                        case 'E':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 4;
                            writeScratchUint32((storePos >> 2) + 1, serializeAssignmentPattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                case 'w':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 6;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBindingIdentifier(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 5;
                    writeScratchUint32((storePos >> 2) + 1, serializeInvalid(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    switch (type[6]) {
                        case 'E':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 3;
                            writeScratchUint32((storePos >> 2) + 1, serializeObjectPattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                case 'p':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'R':
            switch (type[2]) {
                case 'g':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeRestElement(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Pattern');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 6;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Pattern');
            }
            break;
        case 'Y':
            scratchBuff[storePos] = 6;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for Pattern');
    }
    return storePos;
}

function finalizePattern(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeBindingIdentifier, 4, 52); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeArrayPattern, 4, 52); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeRestElement, 4, 52); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeObjectPattern, 4, 52); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeAssignmentPattern, 4, 52); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeInvalid, 4, 52); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 52); break;
        default: throw new Error('Unexpected enum option ID for Pattern');
    }
}

function serializeBindingIdentifier(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.value));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    return storePos32;
}

function finalizeBindingIdentifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeArrayPattern(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecOptionPattern(node.elements));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    return storePos32;
}

function finalizeArrayPattern(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeRestElement(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.rest));
    writeScratchUint32(storePos32 + 2, serializeBoxPattern(node.argument));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    return storePos32;
}

function finalizeRestElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeObjectPattern(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecObjectPatternProperty(node.properties));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    return storePos32;
}

function finalizeObjectPattern(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeObjectPatternProperty(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeAssignmentPatternProperty(node));
            break;
        case 'K':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeKeyValuePatternProperty(node));
            break;
        case 'R':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeRestElement(node));
            break;
        default: throw new Error('Unexpected enum option type for ObjectPatternProperty');
    }
    return storePos;
}

function finalizeObjectPatternProperty(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeKeyValuePatternProperty, 8, 56); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeAssignmentPatternProperty, 4, 56); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeRestElement, 4, 56); break;
        default: throw new Error('Unexpected enum option ID for ObjectPatternProperty');
    }
}

function serializeKeyValuePatternProperty(node) {
    const storePos32 = allocScratch(8) >> 2;
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
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.key));
    writeScratchUint32(storePos32 + 2, serializeOptionBoxExpression(node.value));
    return storePos32;
}

function finalizeAssignmentPatternProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 2]);
}

function serializeAssignmentPattern(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxPattern(node.left));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.right));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    return storePos32;
}

function finalizeAssignmentPattern(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 3]);
}

function serializeExpression(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeArrayExpression(node));
                            break;
                        case 'o':
                            scratchBuff[storePos] = 18;
                            writeScratchUint32((storePos >> 2) + 1, serializeArrowFunctionExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Expression');
                    }
                    break;
                case 's':
                    scratchBuff[storePos] = 7;
                    writeScratchUint32((storePos >> 2) + 1, serializeAssignmentExpression(node));
                    break;
                case 'w':
                    scratchBuff[storePos] = 22;
                    writeScratchUint32((storePos >> 2) + 1, serializeAwaitExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 15;
                            writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 6;
                            writeScratchUint32((storePos >> 2) + 1, serializeBinaryExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Expression');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 15;
                    writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 11;
                    writeScratchUint32((storePos >> 2) + 1, serializeCallExpression(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 19;
                    writeScratchUint32((storePos >> 2) + 1, serializeClassExpression(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 10;
                    writeScratchUint32((storePos >> 2) + 1, serializeConditionalExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 3;
            writeScratchUint32((storePos >> 2) + 1, serializeFunctionExpression(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 14;
                    writeScratchUint32((storePos >> 2) + 1, serializeIdentifier(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 36;
                    writeScratchUint32((storePos >> 2) + 1, serializeInvalid(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 27;
                            writeScratchUint32((storePos >> 2) + 1, serializeJSXElement(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 26;
                            writeScratchUint32((storePos >> 2) + 1, serializeJSXEmptyExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Expression');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 28;
                    writeScratchUint32((storePos >> 2) + 1, serializeJSXFragment(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 24;
                    writeScratchUint32((storePos >> 2) + 1, serializeJSXMemberExpression(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 25;
                    writeScratchUint32((storePos >> 2) + 1, serializeJSXNamespacedName(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 15;
                    writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 8;
                    writeScratchUint32((storePos >> 2) + 1, serializeMemberExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 21;
                    writeScratchUint32((storePos >> 2) + 1, serializeMetaProperty(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 12;
                    writeScratchUint32((storePos >> 2) + 1, serializeNewExpression(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 15;
                            writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 15;
                            writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Expression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeObjectExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 35;
                    writeScratchUint32((storePos >> 2) + 1, serializeOptionalChainingExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 23;
                    writeScratchUint32((storePos >> 2) + 1, serializeParenthesisExpression(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 34;
                    writeScratchUint32((storePos >> 2) + 1, serializePrivateName(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'R':
            scratchBuff[storePos] = 15;
            writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 13;
                    writeScratchUint32((storePos >> 2) + 1, serializeSequenceExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 15;
                    writeScratchUint32((storePos >> 2) + 1, serializeLiteral(node));
                    break;
                case 'u':
                    scratchBuff[storePos] = 9;
                    writeScratchUint32((storePos >> 2) + 1, serializeSuperPropExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 17;
                    writeScratchUint32((storePos >> 2) + 1, serializeTaggedTemplateExpression(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 16;
                    writeScratchUint32((storePos >> 2) + 1, serializeTemplateLiteral(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeThisExpression(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 32;
                            writeScratchUint32((storePos >> 2) + 1, serializeTsAsExpression(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 30;
                            writeScratchUint32((storePos >> 2) + 1, serializeTsConstAssertion(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 33;
                            writeScratchUint32((storePos >> 2) + 1, serializeTsInstantiation(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 31;
                            writeScratchUint32((storePos >> 2) + 1, serializeTsNonNullExpression(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 29;
                            writeScratchUint32((storePos >> 2) + 1, serializeTsTypeAssertion(node));
                            break;
                        default: throw new Error('Unexpected enum option type for Expression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 4;
                    writeScratchUint32((storePos >> 2) + 1, serializeUnaryExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 5;
                    writeScratchUint32((storePos >> 2) + 1, serializeUpdateExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for Expression');
            }
            break;
        case 'Y':
            scratchBuff[storePos] = 20;
            writeScratchUint32((storePos >> 2) + 1, serializeYieldExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for Expression');
    }
    return storePos;
}

function finalizeExpression(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeThisExpression, 4, 136); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeArrayExpression, 4, 136); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeObjectExpression, 4, 136); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeFunctionExpression, 4, 136); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeUnaryExpression, 4, 136); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeUpdateExpression, 4, 136); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeBinaryExpression, 4, 136); break;
        case 7: finalizeEnum(7, scratchUint32[(storePos >> 2) + 1], finalizeAssignmentExpression, 4, 136); break;
        case 8: finalizeEnum(8, scratchUint32[(storePos >> 2) + 1], finalizeMemberExpression, 4, 136); break;
        case 9: finalizeEnum(9, scratchUint32[(storePos >> 2) + 1], finalizeSuperPropExpression, 4, 136); break;
        case 10: finalizeEnum(10, scratchUint32[(storePos >> 2) + 1], finalizeConditionalExpression, 4, 136); break;
        case 11: finalizeEnum(11, scratchUint32[(storePos >> 2) + 1], finalizeCallExpression, 4, 136); break;
        case 12: finalizeEnum(12, scratchUint32[(storePos >> 2) + 1], finalizeNewExpression, 4, 136); break;
        case 13: finalizeEnum(13, scratchUint32[(storePos >> 2) + 1], finalizeSequenceExpression, 4, 136); break;
        case 14: finalizeEnum(14, scratchUint32[(storePos >> 2) + 1], finalizeIdentifier, 4, 136); break;
        case 15: finalizeEnum(15, scratchUint32[(storePos >> 2) + 1], finalizeLiteral, 8, 136); break;
        case 16: finalizeEnum(16, scratchUint32[(storePos >> 2) + 1], finalizeTemplateLiteral, 4, 136); break;
        case 17: finalizeEnum(17, scratchUint32[(storePos >> 2) + 1], finalizeTaggedTemplateExpression, 4, 136); break;
        case 18: finalizeEnum(18, scratchUint32[(storePos >> 2) + 1], finalizeArrowFunctionExpression, 4, 136); break;
        case 19: finalizeEnum(19, scratchUint32[(storePos >> 2) + 1], finalizeClassExpression, 4, 136); break;
        case 20: finalizeEnum(20, scratchUint32[(storePos >> 2) + 1], finalizeYieldExpression, 4, 136); break;
        case 21: finalizeEnum(21, scratchUint32[(storePos >> 2) + 1], finalizeMetaProperty, 4, 136); break;
        case 22: finalizeEnum(22, scratchUint32[(storePos >> 2) + 1], finalizeAwaitExpression, 4, 136); break;
        case 23: finalizeEnum(23, scratchUint32[(storePos >> 2) + 1], finalizeParenthesisExpression, 4, 136); break;
        case 24: finalizeEnum(24, scratchUint32[(storePos >> 2) + 1], finalizeJSXMemberExpression, 4, 136); break;
        case 25: finalizeEnum(25, scratchUint32[(storePos >> 2) + 1], finalizeJSXNamespacedName, 4, 136); break;
        case 26: finalizeEnum(26, scratchUint32[(storePos >> 2) + 1], finalizeJSXEmptyExpression, 4, 136); break;
        case 27: finalizeEnum(27, scratchUint32[(storePos >> 2) + 1], finalizeJSXElement, 4, 136); break;
        case 28: finalizeEnum(28, scratchUint32[(storePos >> 2) + 1], finalizeJSXFragment, 4, 136); break;
        case 29: finalizeEnum(29, scratchUint32[(storePos >> 2) + 1], finalizeTsTypeAssertion, 4, 136); break;
        case 30: finalizeEnum(30, scratchUint32[(storePos >> 2) + 1], finalizeTsConstAssertion, 4, 136); break;
        case 31: finalizeEnum(31, scratchUint32[(storePos >> 2) + 1], finalizeTsNonNullExpression, 4, 136); break;
        case 32: finalizeEnum(32, scratchUint32[(storePos >> 2) + 1], finalizeTsAsExpression, 4, 136); break;
        case 33: finalizeEnum(33, scratchUint32[(storePos >> 2) + 1], finalizeTsInstantiation, 4, 136); break;
        case 34: finalizeEnum(34, scratchUint32[(storePos >> 2) + 1], finalizePrivateName, 4, 136); break;
        case 35: finalizeEnum(35, scratchUint32[(storePos >> 2) + 1], finalizeOptionalChainingExpression, 4, 136); break;
        case 36: finalizeEnum(36, scratchUint32[(storePos >> 2) + 1], finalizeInvalid, 4, 136); break;
        default: throw new Error('Unexpected enum option ID for Expression');
    }
}

function serializeThisExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeThisExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeArrayExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecOptionExpressionOrSpread(node.elements));
    return storePos32;
}

function finalizeArrayExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeUnaryExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeUnaryOperator(node.operator));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeUnaryExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 2]);
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
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeUpdateOperator(node.operator));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.prefix));
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeUpdateExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 2;
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeUpdateOperator(value) {
    switch (value) {
        case '++': return 0;
        case '--': return 1;
        default: throw new Error('Unexpected enum value for UpdateOperator');
    }
}

function serializeBinaryExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.left));
    writeScratchUint32(storePos32 + 2, serializeBinaryOperator(node.operator));
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.right));
    return storePos32;
}

function finalizeBinaryExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 3]);
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
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, node.operator === '=' 
        ? serializeAssignmentLeftEquals(node.left)
        : serializeAssignmentLeft(node.left));
    writeScratchUint32(storePos32 + 2, serializeAssignmentOperator(node.operator));
    writeScratchUint32(storePos32 + 3, serializeBoxExpression(node.right));
    return storePos32;
}

function finalizeAssignmentExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeAssignmentLeft(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeBox(scratchUint32[storePos32 + 3]);
}

function serializeAssignmentLeft(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            switch (type[5]) {
                                case 'E':
                                    scratchBuff[storePos] = 0;
                                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                                    break;
                                case 'P':
                                    scratchBuff[storePos] = 1;
                                    writeScratchUint32((storePos >> 2) + 1, serializeBoxPattern(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for AssignmentLeft');
                            }
                            break;
                        case 'o':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                case 's':
                    switch (type[10]) {
                        case 'E':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxPattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                case 'w':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    switch (type[6]) {
                        case 'E':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxPattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                case 'p':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'R':
            switch (type[2]) {
                case 'g':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxPattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for AssignmentLeft');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for AssignmentLeft');
            }
            break;
        case 'Y':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for AssignmentLeft');
    }
    return storePos;
}

function finalizeAssignmentLeft(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 8); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 8); break;
        default: throw new Error('Unexpected enum option ID for AssignmentLeft');
    }
}

function serializeAssignmentLeftEquals(node) {
    const storePos = allocScratch(8);
    scratchBuff[storePos] = 1;
    writeScratchUint32((storePos >> 2) + 1, serializeBoxPattern(node));
    return storePos;
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
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.object));
    writeScratchUint32(storePos32 + 2, serializeIdentifierOrPrivateNameOrComputed(node.property));
    return storePos32;
}

function finalizeMemberExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeIdentifierOrPrivateNameOrComputed(scratchUint32[storePos32 + 2]);
}

function serializeSuperPropExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSuper(node.obj));
    writeScratchUint32(storePos32 + 2, serializeIdentifierOrComputed(node.property));
    return storePos32;
}

function finalizeSuperPropExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSuper(scratchUint32[storePos32 + 1]);
    finalizeIdentifierOrComputed(scratchUint32[storePos32 + 2]);
}

function serializeConditionalExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSuperOrImportOrBoxExpression(node.callee));
    writeScratchUint32(storePos32 + 2, serializeVecExpressionOrSpread(node.arguments));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeParameterInstantiation(node.typeArguments));
    return storePos32;
}

function finalizeCallExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSuperOrImportOrBoxExpression(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeNewExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.callee));
    writeScratchUint32(storePos32 + 2, serializeOptionVecExpressionOrSpread(node.arguments));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeParameterInstantiation(node.typeArguments));
    return storePos32;
}

function finalizeNewExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeOptionVecExpressionOrSpread(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeSequenceExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxExpression(node.expressions));
    return storePos32;
}

function finalizeSequenceExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeIdentifier(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeJsWord(node.value));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.optional));
    return storePos32;
}

function finalizeIdentifier(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeJsWord(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
}

function serializeTemplateLiteral(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxExpression(node.expressions));
    writeScratchUint32(storePos32 + 2, serializeVecTemplateElement(node.quasis));
    return storePos32;
}

function finalizeTemplateLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
}

function serializeTemplateElement(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionJsWord(node.cooked));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.tail));
    writeScratchUint32(storePos32 + 3, serializeJsWord(node.raw));
    return storePos32;
}

function finalizeTemplateElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
    finalizeJsWord(scratchUint32[storePos32 + 3]);
}

function serializeTaggedTemplateExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.tag));
    writeScratchUint32(storePos32 + 2, serializeOptionTsTypeParameterInstantiation(node.typeParameters));
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
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeOptionBoxExpression(node.argument));
    writeScratchUint32(storePos32 + 2, serializeBoolean(node.delegate));
    return storePos32;
}

function finalizeYieldExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeOptionBoxExpression(scratchUint32[storePos32 + 1]);
    finalizeEnumValue(scratchUint32[storePos32 + 2]);
    pos += 3;
}

function serializeMetaProperty(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeMetaPropertyKind(node.kind));
    return storePos32;
}

function finalizeMetaProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.argument));
    return storePos32;
}

function finalizeAwaitExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeParenthesisExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeParenthesisExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializePrivateName(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.id));
    return storePos32;
}

function finalizePrivateName(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
}

function serializeOptionalChainingExpression(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.questionDotToken));
    writeScratchUint32(storePos32 + 2, serializeMemberExpressionOrOptionalChainingCall(node.base));
    return storePos32;
}

function finalizeOptionalChainingExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeMemberExpressionOrOptionalChainingCall(scratchUint32[storePos32 + 2]);
}

function serializeOptionalChainingCall(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.callee));
    writeScratchUint32(storePos32 + 2, serializeVecExpressionOrSpread(node.arguments));
    writeScratchUint32(storePos32 + 3, serializeOptionTsTypeParameterInstantiation(node.typeArguments));
    return storePos32;
}

function finalizeOptionalChainingCall(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeOptionTsTypeParameterInstantiation(scratchUint32[storePos32 + 3]);
}

function serializeSuper(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeSuper(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeImport(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeImport(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeInvalid(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeInvalid(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeComputed(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeComputed(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeExpressionOrSpread(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeOptionSpan(node.spread));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.expression));
    return storePos32;
}

function finalizeExpressionOrSpread(storePos32) {
    finalizeOptionSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeObjectExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecSpreadElementOrBoxObjectProperty(node.properties));
    return storePos32;
}

function finalizeObjectExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeSpreadElement(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.spread));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.arguments));
    return storePos32;
}

function finalizeSpreadElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeObjectProperty(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeAssignmentProperty(node));
            break;
        case 'G':
            scratchBuff[storePos] = 3;
            writeScratchUint32((storePos >> 2) + 1, serializeGetterProperty(node));
            break;
        case 'I':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeIdentifier(node));
            break;
        case 'K':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeKeyValueProperty(node));
            break;
        case 'M':
            scratchBuff[storePos] = 5;
            writeScratchUint32((storePos >> 2) + 1, serializeMethodProperty(node));
            break;
        case 'S':
            scratchBuff[storePos] = 4;
            writeScratchUint32((storePos >> 2) + 1, serializeSetterProperty(node));
            break;
        default: throw new Error('Unexpected enum option type for ObjectProperty');
    }
    return storePos;
}

function finalizeObjectProperty(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeIdentifier, 4, 152); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeKeyValueProperty, 8, 152); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeAssignmentProperty, 4, 152); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeGetterProperty, 8, 152); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeSetterProperty, 8, 152); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeMethodProperty, 8, 152); break;
        default: throw new Error('Unexpected enum option ID for ObjectProperty');
    }
}

function serializeKeyValueProperty(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeBoxExpression(node.value));
    return storePos32;
}

function finalizeKeyValueProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
    pos += 4;
}

function serializeAssignmentProperty(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeIdentifier(node.key));
    writeScratchUint32(storePos32 + 2, serializeBoxExpression(node.value));
    return storePos32;
}

function finalizeAssignmentProperty(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeIdentifier(scratchUint32[storePos32 + 1]);
    finalizeBox(scratchUint32[storePos32 + 2]);
}

function serializeGetterProperty(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializeOptionTsTypeAnnotation(node.typeAnnotation));
    writeScratchUint32(storePos32 + 3, serializeOptionBlockStatement(node.body));
    return storePos32;
}

function finalizeGetterProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
}

function serializeSetterProperty(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializePattern(node.param));
    writeScratchUint32(storePos32 + 3, serializeOptionBlockStatement(node.body));
    return storePos32;
}

function finalizeSetterProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizePattern(scratchUint32[storePos32 + 2]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 3]);
}

function serializeMethodProperty(node) {
    const storePos32 = allocScratch(40) >> 2;
    writeScratchUint32(storePos32, serializePropertyName(node.key));
    writeScratchUint32(storePos32 + 1, serializeVecParameter(node.params));
    writeScratchUint32(storePos32 + 2, serializeVecDecorator(node.decorators));
    writeScratchUint32(storePos32 + 3, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 4, serializeOptionBlockStatement(node.body));
    writeScratchUint32(storePos32 + 5, serializeOptionTsTypeParameterDeclaration(node.typeParameters));
    writeScratchUint32(storePos32 + 6, serializeBoolean(node.generator));
    writeScratchUint32(storePos32 + 7, serializeBoolean(node.async));
    writeScratchUint32(storePos32 + 8, serializeOptionTsTypeAnnotation(node.returnType));
    return storePos32;
}

function finalizeMethodProperty(storePos32) {
    finalizePropertyName(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
    finalizeVec(scratchUint32[storePos32 + 2]);
    finalizeSpan(scratchUint32[storePos32 + 3]);
    finalizeOptionBlockStatement(scratchUint32[storePos32 + 4]);
    finalizeOptionTsTypeParameterDeclaration(scratchUint32[storePos32 + 5]);
    finalizeEnumValue(scratchUint32[storePos32 + 6]);
    finalizeEnumValue(scratchUint32[storePos32 + 7]);
    pos += 2;
    finalizeOptionTsTypeAnnotation(scratchUint32[storePos32 + 8]);
    pos += 4;
}

function serializePropertyName(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'B':
            scratchBuff[storePos] = 4;
            writeScratchUint32((storePos >> 2) + 1, serializeBigIntLiteral(node));
            break;
        case 'C':
            scratchBuff[storePos] = 3;
            writeScratchUint32((storePos >> 2) + 1, serializeComputed(node));
            break;
        case 'I':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeIdentifier(node));
            break;
        case 'N':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeNumericLiteral(node));
            break;
        case 'S':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeStringLiteral(node));
            break;
        default: throw new Error('Unexpected enum option type for PropertyName');
    }
    return storePos;
}

function finalizePropertyName(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeIdentifier, 4, 40); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeStringLiteral, 4, 40); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeNumericLiteral, 8, 40); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeComputed, 4, 40); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeBigIntLiteral, 4, 40); break;
        default: throw new Error('Unexpected enum option ID for PropertyName');
    }
}

function serializeLiteral(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'B':
            switch (type[1]) {
                case 'i':
                    scratchBuff[storePos] = 4;
                    writeScratchUint32((storePos >> 2) + 1, serializeBigIntLiteral(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBooleanLiteral(node));
                    break;
                default: throw new Error('Unexpected enum option type for Literal');
            }
            break;
        case 'J':
            scratchBuff[storePos] = 6;
            writeScratchUint32((storePos >> 2) + 1, serializeJSXText(node));
            break;
        case 'N':
            switch (type[2]) {
                case 'l':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeNullLiteral(node));
                    break;
                case 'm':
                    scratchBuff[storePos] = 3;
                    writeScratchUint32((storePos >> 2) + 1, serializeNumericLiteral(node));
                    break;
                default: throw new Error('Unexpected enum option type for Literal');
            }
            break;
        case 'R':
            scratchBuff[storePos] = 5;
            writeScratchUint32((storePos >> 2) + 1, serializeRegExpLiteral(node));
            break;
        case 'S':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeStringLiteral(node));
            break;
        default: throw new Error('Unexpected enum option type for Literal');
    }
    return storePos;
}

function finalizeLiteral(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeStringLiteral, 4, 40); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeBooleanLiteral, 4, 40); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeNullLiteral, 4, 40); break;
        case 3: finalizeEnum(3, scratchUint32[(storePos >> 2) + 1], finalizeNumericLiteral, 8, 40); break;
        case 4: finalizeEnum(4, scratchUint32[(storePos >> 2) + 1], finalizeBigIntLiteral, 4, 40); break;
        case 5: finalizeEnum(5, scratchUint32[(storePos >> 2) + 1], finalizeRegExpLiteral, 4, 40); break;
        case 6: finalizeEnum(6, scratchUint32[(storePos >> 2) + 1], finalizeJSXText, 4, 40); break;
        default: throw new Error('Unexpected enum option ID for Literal');
    }
}

function serializeStringLiteral(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoolean(node.value));
    return storePos32;
}

function finalizeBooleanLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeEnumValue(scratchUint32[storePos32 + 1]);
    pos += 3;
}

function serializeNullLiteral(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeNullLiteral(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeNumericLiteral(node) {
    const storePos32 = allocScratch(16) >> 2;
    writeScratchUint32(storePos32, serializeNumber(node.value));
    writeScratchUint32(storePos32 + 1, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 2, serializeOptionAsciiJsWord(node.raw));
    return storePos32;
}

function finalizeNumericLiteral(storePos32) {
    finalizeNumber(scratchUint32[storePos32]);
    finalizeSpan(scratchUint32[storePos32 + 1]);
    finalizeOptionJsWord(scratchUint32[storePos32 + 2]);
}

function serializeBigIntLiteral(node) {
    const storePos32 = allocScratch(16) >> 2;
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
    if (value[0] === 0) return serializeAsciiJsWord('0');
    const parts = value[1];
    let num = 0n;
    for (let i = parts.length - 1; i >= 0; i--) {
        num <<= 32n;
        num += BigInt(parts[i]);
    }
    return serializeAsciiJsWord(num.toString());
}

function serializeRegExpLiteral(node) {
    const storePos32 = allocScratch(16) >> 2;
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

function serializeJSXText(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXText(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXMemberExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXMemberExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXNamespacedName(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXNamespacedName(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXEmptyExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXEmptyExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXElement(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXElement(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeJSXFragment(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeJSXFragment(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsTypeAssertion(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsTypeAssertion(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsConstAssertion(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsConstAssertion(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsNonNullExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsNonNullExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsAsExpression(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsAsExpression(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsInstantiation(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsInstantiation(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsTypeAnnotation(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeBoxTsType(node.typeAnnotation));
    return storePos32;
}

function finalizeTsTypeAnnotation(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeBox(scratchUint32[storePos32 + 1]);
}

function serializeTsInterfaceDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsInterfaceDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsTypeAliasDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsTypeAliasDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsEnumDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsEnumDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsModuleDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsModuleDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsImportEqualsDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsImportEqualsDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsExportAssignment(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsExportAssignment(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsNamespaceExportDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsNamespaceExportDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsTypeParamDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsTypeParameter(node.parameters));
    return storePos32;
}

function finalizeTsTypeParamDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsTypeParameterInstantiation(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecBoxTsType(node.params));
    return storePos32;
}

function finalizeTsTypeParameterInstantiation(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsExpressionWithTypeArg(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsExpressionWithTypeArg(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsIndexSignature(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsIndexSignature(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsParamProp(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsParamProp(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsTypeParameterDeclaration(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    writeScratchUint32(storePos32 + 1, serializeVecTsTypeParameter(node.parameters));
    return storePos32;
}

function finalizeTsTypeParameterDeclaration(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
    finalizeVec(scratchUint32[storePos32 + 1]);
}

function serializeTsTypeParameter(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsTypeParameter(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
}

function serializeTsType(node) {
    const storePos32 = allocScratch(8) >> 2;
    writeScratchUint32(storePos32, serializeSpan(node.span));
    return storePos32;
}

function finalizeTsType(storePos32) {
    finalizeSpan(scratchUint32[storePos32]);
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
    const strLen = str.length;
    if (strLen === 0) {
        const storePos = allocScratch(8);
        scratchUint32[storePos >> 2] = 0;
        return storePos;
    }
    if (strLen > 7) {
        alloc(strLen * 3);
        const len = strLen < 42
            ? writeStringToBuffer(str, buff, strLen, pos)
            : utf8Write.call(buff, str, pos);
        const storePos = allocScratch(8),
            storePos32 = storePos >> 2;
        scratchUint32[storePos32] = len;
        scratchUint32[storePos32 + 1] = pos;
        pos += len;
        return storePos;
    }
    const storePos = allocScratchAligned(4 + strLen * 3),
        storePos32 = storePos >> 2;
    const len = writeStringToBuffer(str, scratchBuff, strLen, storePos + 4);
    scratchUint32[storePos32] = len;
    if (len <= 7) {
        scratchPos = storePos + (len <= 4 ? 8 : 16);
        return storePos;
    }
    alloc(len);
    copyFromScratch(storePos + 4, len);
    scratchPos = storePos + 8;
    scratchUint32[storePos32 + 1] = pos;
    pos += len;
    return storePos;
}

function finalizeJsWord(storePos) {
    const storePos32 = storePos >> 2,
        len = scratchUint32[storePos32];
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
        const storePos = allocScratch(8);
        scratchUint32[storePos >> 2] = 0;
        return storePos;
    }
    if (len > 7) {
        alloc(len);
        if (len < 48) {
            writeAsciiStringToBuffer(str, buff, len, pos);
        } else {
            asciiWrite.call(buff, str, pos);
        }
        const storePos = allocScratch(8),
            storePos32 = storePos >> 2;
        scratchUint32[storePos32] = len;
        scratchUint32[storePos32 + 1] = pos;
        pos += len;
        return storePos;
    }
    const storePos = allocScratch(len > 4 ? 16 : 8);
    writeAsciiStringToBuffer(str, scratchBuff, len, storePos + 4);
    scratchUint32[storePos >> 2] = len;
    return storePos;
}

const { asciiWrite } = Buffer.prototype;

function serializeOptionAsciiJsWord(value) {
    return serializeOption(value, serializeAsciiJsWord);
}

function serializeBoolean(value) {
    switch (value) {
        case false: return 0;
        case true: return 1;
        default: throw new Error('Unexpected enum value for Boolean');
    }
}

function serializeNumber(num) {
    const storePos64 = allocScratch(8) >> 3;
    scratchFloat64[storePos64] = num;
    return storePos64;
}

function finalizeNumber(storePos64) {
    float64[pos >> 3] = scratchFloat64[storePos64];
    pos += 8;
}

function serializeSpan(span) {
    const storePos32 = allocScratch(16) >> 2;
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

function serializeVecModuleDeclarationOrStatement(values) {
    return serializeVec(values, serializeModuleDeclarationOrStatement, finalizeModuleDeclarationOrStatement, 156, 4);
}

function serializeModuleDeclarationOrStatement(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'B':
            switch (type[1]) {
                case 'l':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'l':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'D':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'E':
            switch (type[1]) {
                case 'm':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'x':
                    switch (type[3]) {
                        case 'o':
                            switch (type[6]) {
                                case 'A':
                                    scratchBuff[storePos] = 0;
                                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                    break;
                                case 'D':
                                    switch (type[8]) {
                                        case 'c':
                                            scratchBuff[storePos] = 0;
                                            writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                            break;
                                        case 'f':
                                            switch (type[13]) {
                                                case 'D':
                                                    scratchBuff[storePos] = 0;
                                                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                                    break;
                                                case 'E':
                                                    scratchBuff[storePos] = 0;
                                                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                                    break;
                                                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                                            }
                                            break;
                                        default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                                    }
                                    break;
                                case 'N':
                                    scratchBuff[storePos] = 0;
                                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                            }
                            break;
                        case 'r':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                            break;
                        default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'F':
            switch (type[1]) {
                case 'o':
                    switch (type[3]) {
                        case 'I':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                            break;
                        case 'O':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                            break;
                        case 'S':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                            break;
                        default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                    }
                    break;
                case 'u':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'I':
            switch (type[1]) {
                case 'f':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'm':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'L':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
            break;
        case 'R':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
            break;
        case 'S':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
            break;
        case 'T':
            switch (type[1]) {
                case 'h':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'E':
                            switch (type[3]) {
                                case 'n':
                                    scratchBuff[storePos] = 1;
                                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                                    break;
                                case 'x':
                                    scratchBuff[storePos] = 0;
                                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                            }
                            break;
                        case 'I':
                            switch (type[3]) {
                                case 'm':
                                    scratchBuff[storePos] = 0;
                                    writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                                    break;
                                case 'n':
                                    scratchBuff[storePos] = 1;
                                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                            }
                            break;
                        case 'M':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeModuleDeclaration(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                            break;
                        default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        case 'V':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
            break;
        case 'W':
            switch (type[1]) {
                case 'h':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                case 'i':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeStatement(node));
                    break;
                default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
            }
            break;
        default: throw new Error('Unexpected enum option type for ModuleDeclarationOrStatement');
    }
    return storePos;
}

function finalizeModuleDeclarationOrStatement(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeModuleDeclaration, 4, 156); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeStatement, 4, 156); break;
        default: throw new Error('Unexpected enum option ID for ModuleDeclarationOrStatement');
    }
}

function serializeVecImportSpecifier(values) {
    return serializeVec(values, serializeImportSpecifier, finalizeImportSpecifier, 84, 4);
}

function serializeOptionModuleExportName(value) {
    return serializeOption(value, serializeModuleExportName);
}

function finalizeOptionModuleExportName(storePos) {
    return finalizeOption(storePos, finalizeModuleExportName, 36, 4);
}

function serializeOptionJsWord(value) {
    return serializeOption(value, serializeJsWord);
}

function finalizeOptionJsWord(storePos) {
    return finalizeOption(storePos, finalizeJsWord, 8, 4);
}

function serializeOptionObjectExpression(value) {
    return serializeOption(value, serializeObjectExpression);
}

function finalizeOptionObjectExpression(storePos) {
    return finalizeOption(storePos, finalizeObjectExpression, 20, 4);
}

function serializeVecSpreadElementOrBoxObjectProperty(values) {
    return serializeVec(values, serializeSpreadElementOrBoxObjectProperty, finalizeSpreadElementOrBoxObjectProperty, 20, 4);
}

function serializeSpreadElementOrBoxObjectProperty(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxObjectProperty(node));
            break;
        case 'G':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxObjectProperty(node));
            break;
        case 'I':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxObjectProperty(node));
            break;
        case 'K':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxObjectProperty(node));
            break;
        case 'M':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxObjectProperty(node));
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxObjectProperty(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeSpreadElement(node));
                    break;
                default: throw new Error('Unexpected enum option type for SpreadElementOrBoxObjectProperty');
            }
            break;
        default: throw new Error('Unexpected enum option type for SpreadElementOrBoxObjectProperty');
    }
    return storePos;
}

function finalizeSpreadElementOrBoxObjectProperty(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeSpreadElement, 4, 20); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 20); break;
        default: throw new Error('Unexpected enum option ID for SpreadElementOrBoxObjectProperty');
    }
}

function serializeBoxExpression(value) {
    return serializeBox(value, serializeExpression, finalizeExpression, 136, 8);
}

function serializeVecOptionExpressionOrSpread(values) {
    return serializeVec(values, serializeOptionExpressionOrSpread, finalizeOptionExpressionOrSpread, 24, 4);
}

function serializeOptionExpressionOrSpread(value) {
    return serializeOption(value, serializeExpressionOrSpread);
}

function finalizeOptionExpressionOrSpread(storePos) {
    return finalizeOption(storePos, finalizeExpressionOrSpread, 20, 4);
}

function serializeOptionSpan(value) {
    return serializeOption(value, serializeSpan);
}

function finalizeOptionSpan(storePos) {
    return finalizeOption(storePos, finalizeSpan, 12, 4);
}

function serializeOptionIdentifier(value) {
    return serializeOption(value, serializeIdentifier);
}

function finalizeOptionIdentifier(storePos) {
    return finalizeOption(storePos, finalizeIdentifier, 24, 4);
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

function finalizeOptionTsTypeAnnotation(storePos) {
    return finalizeOption(storePos, finalizeTsTypeAnnotation, 16, 4);
}

function serializeBoxTsType(value) {
    return serializeBox(value, serializeTsType, finalizeTsType, 12, 4);
}

function serializeVecOptionPattern(values) {
    return serializeVec(values, serializeOptionPattern, finalizeOptionPattern, 56, 4);
}

function serializeOptionPattern(value) {
    return serializeOption(value, serializePattern);
}

function finalizeOptionPattern(storePos) {
    return finalizeOption(storePos, finalizePattern, 52, 4);
}

function serializeBoxPattern(value) {
    return serializeBox(value, serializePattern, finalizePattern, 52, 4);
}

function serializeVecObjectPatternProperty(values) {
    return serializeVec(values, serializeObjectPatternProperty, finalizeObjectPatternProperty, 56, 8);
}

function serializeOptionBoxExpression(value) {
    return serializeOption(value, serializeBoxExpression);
}

function finalizeOptionBoxExpression(storePos) {
    return finalizeOption(storePos, finalizeBox, 4, 4);
}

function serializeOptionBlockStatement(value) {
    return serializeOption(value, serializeBlockStatement);
}

function finalizeOptionBlockStatement(storePos) {
    return finalizeOption(storePos, finalizeBlockStatement, 20, 4);
}

function serializeVecStatement(values) {
    return serializeVec(values, serializeStatement, finalizeStatement, 152, 4);
}

function serializeBoxStatement(value) {
    return serializeBox(value, serializeStatement, finalizeStatement, 152, 4);
}

function serializeOptionBoxStatement(value) {
    return serializeOption(value, serializeBoxStatement);
}

function finalizeOptionBoxStatement(storePos) {
    return finalizeOption(storePos, finalizeBox, 4, 4);
}

function serializeVecSwitchCase(values) {
    return serializeVec(values, serializeSwitchCase, finalizeSwitchCase, 28, 4);
}

function serializeOptionCatchClause(value) {
    return serializeOption(value, serializeCatchClause);
}

function finalizeOptionCatchClause(storePos) {
    return finalizeOption(storePos, finalizeCatchClause, 88, 4);
}

function serializeOptionVariableDeclarationOrBoxExpression(value) {
    return serializeOption(value, serializeVariableDeclarationOrBoxExpression);
}

function finalizeOptionVariableDeclarationOrBoxExpression(storePos) {
    return finalizeOption(storePos, finalizeVariableDeclarationOrBoxExpression, 28, 4);
}

function serializeVariableDeclarationOrBoxExpression(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'o':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
                    }
                    break;
                case 's':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'w':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'R':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
            }
            break;
        case 'V':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeVariableDeclaration(node));
            break;
        case 'Y':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for VariableDeclarationOrBoxExpression');
    }
    return storePos;
}

function finalizeVariableDeclarationOrBoxExpression(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeVariableDeclaration, 4, 28); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 28); break;
        default: throw new Error('Unexpected enum option ID for VariableDeclarationOrBoxExpression');
    }
}

function serializeVecVariableDeclarator(values) {
    return serializeVec(values, serializeVariableDeclarator, finalizeVariableDeclarator, 76, 4);
}

function serializeVariableDeclarationOrPattern(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            switch (type[5]) {
                                case 'E':
                                    scratchBuff[storePos] = 1;
                                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                                    break;
                                case 'P':
                                    scratchBuff[storePos] = 1;
                                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                                    break;
                                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                            }
                            break;
                        case 'o':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                case 's':
                    switch (type[10]) {
                        case 'E':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                case 'w':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    switch (type[6]) {
                        case 'E':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                case 'p':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'R':
            switch (type[2]) {
                case 'g':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 's':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'u':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                            break;
                        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
                    break;
                default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
            }
            break;
        case 'V':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeVariableDeclaration(node));
            break;
        case 'Y':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializePattern(node));
            break;
        default: throw new Error('Unexpected enum option type for VariableDeclarationOrPattern');
    }
    return storePos;
}

function finalizeVariableDeclarationOrPattern(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeVariableDeclaration, 4, 56); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizePattern, 4, 56); break;
        default: throw new Error('Unexpected enum option ID for VariableDeclarationOrPattern');
    }
}

function serializeVecClassMember(values) {
    return serializeVec(values, serializeClassMember, finalizeClassMember, 168, 8);
}

function serializeVecTsParamPropOrParameter(values) {
    return serializeVec(values, serializeTsParamPropOrParameter, finalizeTsParamPropOrParameter, 76, 4);
}

function serializeTsParamPropOrParameter(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'P':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeParameter(node));
            break;
        case 'T':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeTsParamProp(node));
            break;
        default: throw new Error('Unexpected enum option type for TsParamPropOrParameter');
    }
    return storePos;
}

function finalizeTsParamPropOrParameter(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeTsParamProp, 4, 76); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeParameter, 4, 76); break;
        default: throw new Error('Unexpected enum option ID for TsParamPropOrParameter');
    }
}

function serializeOptionAccessibility(value) {
    return serializeOption(value, serializeAccessibility);
}

function finalizeOptionAccessibility(storePos) {
    return finalizeOption(storePos, finalizeEnumValue, 1, 1);
}

function serializeOptionTsTypeParamDeclaration(value) {
    return serializeOption(value, serializeTsTypeParamDeclaration);
}

function finalizeOptionTsTypeParamDeclaration(storePos) {
    return finalizeOption(storePos, finalizeTsTypeParamDeclaration, 20, 4);
}

function serializeVecTsTypeParameter(values) {
    return serializeVec(values, serializeTsTypeParameter, finalizeTsTypeParameter, 12, 4);
}

function serializeOptionTsTypeParameterInstantiation(value) {
    return serializeOption(value, serializeTsTypeParameterInstantiation);
}

function finalizeOptionTsTypeParameterInstantiation(storePos) {
    return finalizeOption(storePos, finalizeTsTypeParameterInstantiation, 20, 4);
}

function serializeVecBoxTsType(values) {
    return serializeVec(values, serializeBoxTsType, finalizeBox, 4, 4);
}

function serializeVecTsExpressionWithTypeArg(values) {
    return serializeVec(values, serializeTsExpressionWithTypeArg, finalizeTsExpressionWithTypeArg, 12, 4);
}

function serializeOptionTsTypeParameterDeclaration(value) {
    return serializeOption(value, serializeTsTypeParameterDeclaration);
}

function finalizeOptionTsTypeParameterDeclaration(storePos) {
    return finalizeOption(storePos, finalizeTsTypeParameterDeclaration, 20, 4);
}

function serializeIdentifierOrPrivateNameOrComputed(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'C':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeComputed(node));
            break;
        case 'I':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeIdentifier(node));
            break;
        case 'P':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializePrivateName(node));
            break;
        default: throw new Error('Unexpected enum option type for IdentifierOrPrivateNameOrComputed');
    }
    return storePos;
}

function finalizeIdentifierOrPrivateNameOrComputed(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeIdentifier, 4, 40); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizePrivateName, 4, 40); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeComputed, 4, 40); break;
        default: throw new Error('Unexpected enum option ID for IdentifierOrPrivateNameOrComputed');
    }
}

function serializeIdentifierOrComputed(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'C':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeComputed(node));
            break;
        case 'I':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeIdentifier(node));
            break;
        default: throw new Error('Unexpected enum option type for IdentifierOrComputed');
    }
    return storePos;
}

function finalizeIdentifierOrComputed(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeIdentifier, 4, 28); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeComputed, 4, 28); break;
        default: throw new Error('Unexpected enum option ID for IdentifierOrComputed');
    }
}

function serializeSuperOrImportOrBoxExpression(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'o':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
                    }
                    break;
                case 's':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'w':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
                    }
                    break;
                case 'o':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'm':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeImport(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'R':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    switch (type[5]) {
                        case undefined:
                            scratchBuff[storePos] = 0;
                            writeScratchUint32((storePos >> 2) + 1, serializeSuper(node));
                            break;
                        case 'P':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 2;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 2;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
            }
            break;
        case 'Y':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for SuperOrImportOrBoxExpression');
    }
    return storePos;
}

function finalizeSuperOrImportOrBoxExpression(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeSuper, 4, 16); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeImport, 4, 16); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 16); break;
        default: throw new Error('Unexpected enum option ID for SuperOrImportOrBoxExpression');
    }
}

function serializeVecExpressionOrSpread(values) {
    return serializeVec(values, serializeExpressionOrSpread, finalizeExpressionOrSpread, 20, 4);
}

function serializeOptionVecExpressionOrSpread(value) {
    return serializeOption(value, serializeVecExpressionOrSpread);
}

function finalizeOptionVecExpressionOrSpread(storePos) {
    return finalizeOption(storePos, finalizeVec, 8, 4);
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
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'A':
            switch (type[1]) {
                case 'r':
                    switch (type[3]) {
                        case 'a':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'o':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
                    }
                    break;
                case 's':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'w':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'B':
            switch (type[1]) {
                case 'i':
                    switch (type[2]) {
                        case 'g':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'n':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
                    }
                    break;
                case 'l':
                    scratchBuff[storePos] = 0;
                    writeScratchUint32((storePos >> 2) + 1, serializeBlockStatement(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'C':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'l':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'o':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'F':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'I':
            switch (type[1]) {
                case 'd':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'n':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'J':
            switch (type[3]) {
                case 'E':
                    switch (type[4]) {
                        case 'l':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
                    }
                    break;
                case 'F':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'M':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'N':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'T':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'M':
            switch (type[2]) {
                case 'm':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'N':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    switch (type[2]) {
                        case 'l':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'm':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'O':
            switch (type[1]) {
                case 'b':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'P':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'r':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'R':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        case 'S':
            switch (type[1]) {
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 't':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'u':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'T':
            switch (type[1]) {
                case 'a':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'e':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'h':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 's':
                    switch (type[2]) {
                        case 'A':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'C':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'I':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'N':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        case 'T':
                            scratchBuff[storePos] = 1;
                            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                            break;
                        default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
                    }
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'U':
            switch (type[1]) {
                case 'n':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                case 'p':
                    scratchBuff[storePos] = 1;
                    writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
                    break;
                default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
            }
            break;
        case 'Y':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeBoxExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for BlockStatementOrBoxExpression');
    }
    return storePos;
}

function finalizeBlockStatementOrBoxExpression(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeBlockStatement, 4, 24); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeBox, 4, 24); break;
        default: throw new Error('Unexpected enum option ID for BlockStatementOrBoxExpression');
    }
}

function serializeMemberExpressionOrOptionalChainingCall(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'C':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeOptionalChainingCall(node));
            break;
        case 'M':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeMemberExpression(node));
            break;
        default: throw new Error('Unexpected enum option type for MemberExpressionOrOptionalChainingCall');
    }
    return storePos;
}

function finalizeMemberExpressionOrOptionalChainingCall(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeMemberExpression, 4, 60); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeOptionalChainingCall, 4, 60); break;
        default: throw new Error('Unexpected enum option ID for MemberExpressionOrOptionalChainingCall');
    }
}

function serializeBoxObjectProperty(value) {
    return serializeBox(value, serializeObjectProperty, finalizeObjectProperty, 152, 8);
}

function serializeVecExportSpecifier(values) {
    return serializeVec(values, serializeExportSpecifier, finalizeExportSpecifier, 96, 4);
}

function serializeOptionStringLiteral(value) {
    return serializeOption(value, serializeStringLiteral);
}

function finalizeOptionStringLiteral(storePos) {
    return finalizeOption(storePos, finalizeStringLiteral, 32, 4);
}

function serializeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(node) {
    const storePos = allocScratch(8),
        {type} = node;
    switch (type[0]) {
        case 'C':
            scratchBuff[storePos] = 0;
            writeScratchUint32((storePos >> 2) + 1, serializeClassExpression(node));
            break;
        case 'F':
            scratchBuff[storePos] = 1;
            writeScratchUint32((storePos >> 2) + 1, serializeFunctionExpression(node));
            break;
        case 'T':
            scratchBuff[storePos] = 2;
            writeScratchUint32((storePos >> 2) + 1, serializeTsInterfaceDeclaration(node));
            break;
        default: throw new Error('Unexpected enum option type for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration');
    }
    return storePos;
}

function finalizeClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(storePos) {
    switch (scratchBuff[storePos]) {
        case 0: finalizeEnum(0, scratchUint32[(storePos >> 2) + 1], finalizeClassExpression, 4, 132); break;
        case 1: finalizeEnum(1, scratchUint32[(storePos >> 2) + 1], finalizeFunctionExpression, 4, 132); break;
        case 2: finalizeEnum(2, scratchUint32[(storePos >> 2) + 1], finalizeTsInterfaceDeclaration, 4, 132); break;
        default: throw new Error('Unexpected enum option ID for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration');
    }
}

function serializeOption(value, serialize) {
    const storePos = allocScratch(8);
    if (value === null) {
        scratchBuff[storePos] = 0;
    } else {
        scratchBuff[storePos] = 1;
        writeScratchUint32((storePos >> 2) + 1, serialize(value));
    }
    return storePos;
}

function serializeBox(value, serialize, finalize, valueLength, valueAlign) {
    const scratchPosBefore = scratchPos;
    const finalizeData = serialize(value);
    alignPos(valueAlign);
    alloc(valueLength);
    const valuePos = pos;
    finalize(finalizeData);
    scratchPos = scratchPosBefore;
    return valuePos;
}

function serializeVec(values, serialize, finalize, valueLength, valueAlign) {
    const storePos32 = allocScratch(8) >> 2;
    const numValues = values.length;
    scratchUint32[storePos32 + 1] = numValues;
    if (numValues === 0) {
        alignPos(valueAlign);
        scratchUint32[storePos32] = pos;
        return storePos32;
    }
    const scratchPosBefore = scratchPos;
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
    scratchPos = scratchPosBefore;
    return storePos32;
}

function finalizeEnum(id, finalizeData, finalize, offset, length) {
    const startPos = pos;
    buff[pos] = id;
    pos += offset;
    finalize(finalizeData);
    pos = startPos + length;
}

function finalizeEnumValue(id) {
    buff[pos] = id;
    pos++;
}

function finalizeOption(storePos, finalize, valueLength, offset) {
    if (scratchBuff[storePos] === 0) {
        buff[pos] = 0;
        pos += offset + valueLength;
    } else {
        buff[pos] = 1;
        pos += offset;
        finalize(scratchUint32[(storePos >> 2) + 1]);
    };
}

function finalizeBox(valuePos) {
    int32[pos >> 2] = valuePos - pos;
    pos += 4;
}

function finalizeVec(storePos32) {
    const pos32 = pos >> 2;
    int32[pos32] = scratchUint32[storePos32] - pos;
    uint32[pos32 + 1] = scratchUint32[storePos32 + 1];
    pos += 8;
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
    if (end <= buffLen) return;
    do {
        buffLen *= 2;
    } while (buffLen < end);
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
    scratchBuff = Buffer.allocUnsafeSlow(scratchLen);
    const arrayBuffer = scratchBuff.buffer;
    scratchUint16 = new Uint16Array(arrayBuffer);
    scratchUint32 = new Uint32Array(arrayBuffer);
    scratchFloat64 = new Float64Array(arrayBuffer);
}

function allocScratch(bytes) {
    const startPos = scratchPos;
    scratchPos += bytes;
    if (scratchPos > scratchLen) {
        do {
            scratchLen *= 2;
        } while (scratchLen < scratchPos);
        const oldScratchBuff = scratchBuff;
        initScratch();
        scratchBuff.set(oldScratchBuff);
    }
    return startPos;
}

function allocScratchAligned(bytes) {
    return allocScratch((bytes & 4) ? bytes + 4 : bytes);
}

function writeScratchUint32(pos32, value) {
    scratchUint32[pos32] = value;
}

function copyFromScratch(scratchPos, len) {
    if ((pos & 3) === 0) {
        let pos32 = pos >> 2,
            scratchPos32 = scratchPos >> 2;
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
                if (len & 1) buff[(pos32 << 2) + 2] = scratchBuff[(scratchPos32 << 2) + 2];
            } else {
                buff[(pos32 + 1) << 2] = scratchBuff[(scratchPos32 + 1) << 2];
            }
        }
    } else if ((pos & 1) === 0) {
        let pos16 = pos >> 1,
            scratchPos16 = scratchPos >> 1;
        const last16 = pos16 + (len >> 1) - 1;
        uint16[pos16] = scratchUint16[scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        uint16[++pos16] = scratchUint16[++scratchPos16];
        while (pos16 < last16) {
            uint16[++pos16] = scratchUint16[++scratchPos16];
        }
        if (len & 1) buff[(pos16 + 1) << 1] = scratchBuff[(scratchPos16 + 1) << 1];
    } else {
        let pos8 = pos,
            scratchPos8 = scratchPos;
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
    finalizeJsWord = function(storePos) {
        const storePos32 = storePos >> 2,
            len = scratchUint32[storePos32];
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
                for (let emptyPos = pos + len; emptyPos < pos + (len < 4 ? 4 : 7); emptyPos++) {
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
}

// Generated code. Do not edit.

"use strict";

module.exports = visit;

let buff, int32, uint32;

function visitProgram(pos) {
    switch (buff[pos]) {
        case 0:
            visitModule(pos + 4);
            break;
        case 1:
            visitScript(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for Program");
    }
}

function visitModule(pos) {
    visitVecModuleDeclarationOrStatement(pos + 12);
}

function visitScript(pos) {
    visitVecStatement(pos + 12);
}

function visitModuleDeclaration(pos) {
    switch (buff[pos]) {
        case 0:
            visitImportDeclaration(pos + 4);
            break;
        case 1:
            visitExportDeclaration(pos + 4);
            break;
        case 2:
            visitExportNamedDeclaration(pos + 4);
            break;
        case 3:
            visitExportDefaultDeclaration(pos + 4);
            break;
        case 4:
            visitExportDefaultExpression(pos + 4);
            break;
        case 5:
            visitExportAllDeclaration(pos + 4);
            break;
        case 6:
            visitTsImportEqualsDeclaration(pos + 4);
            break;
        case 7:
            visitTsExportAssignment(pos + 4);
            break;
        case 8:
            visitTsNamespaceExportDeclaration(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for ModuleDeclaration");
    }
}

function visitImportDeclaration(pos) {
    visitVecImportSpecifier(pos + 12);
    visitStringLiteral(pos + 20);
    visitOptionObjectExpression(pos + 56);
}

function visitImportSpecifier(pos) {
    switch (buff[pos]) {
        case 0:
            visitImportNamedSpecifier(pos + 4);
            break;
        case 1:
            visitImportDefaultSpecifier(pos + 4);
            break;
        case 2:
            visitImportNamespaceSpecifier(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for ImportSpecifier");
    }
}

function visitImportNamedSpecifier(pos) {
    visitIdentifier(pos + 12);
    visitOptionModuleExportName(pos + 36);
}

function visitImportDefaultSpecifier(pos) {
    visitIdentifier(pos + 12);
}

function visitImportNamespaceSpecifier(pos) {
    visitIdentifier(pos + 12);
}

function visitExportDeclaration(pos) {
    visitDeclaration(pos + 12);
}

function visitExportNamedDeclaration(pos) {
    visitVecExportSpecifier(pos + 12);
    visitOptionStringLiteral(pos + 20);
    visitOptionObjectExpression(pos + 60);
}

function visitExportSpecifier(pos) {
    switch (buff[pos]) {
        case 0:
            visitExportNamespaceSpecifier(pos + 4);
            break;
        case 1:
            visitExportDefaultSpecifier(pos + 4);
            break;
        case 2:
            visitExportNamedSpecifier(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for ExportSpecifier");
    }
}

function visitExportNamespaceSpecifier(pos) {
    visitModuleExportName(pos + 12);
}

function visitExportDefaultSpecifier(pos) {
    visitIdentifier(pos + 12);
}

function visitExportNamedSpecifier(pos) {
    visitModuleExportName(pos + 12);
    visitOptionModuleExportName(pos + 48);
}

function visitExportDefaultDeclaration(pos) {
    visitClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(pos + 12);
}

function visitExportDefaultExpression(pos) {
    visitBoxExpression(pos + 12);
}

function visitExportAllDeclaration(pos) {
    visitStringLiteral(pos + 12);
    visitOptionObjectExpression(pos + 44);
}

function visitModuleExportName(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitStringLiteral(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for ModuleExportName");
    }
}

function visitStatement(pos) {
    switch (buff[pos]) {
        case 0:
            visitBlockStatement(pos + 4);
            break;
        case 1:
            visitEmptyStatement(pos + 4);
            break;
        case 2:
            visitDebuggerStatement(pos + 4);
            break;
        case 3:
            visitWithStatement(pos + 4);
            break;
        case 4:
            visitReturnStatement(pos + 4);
            break;
        case 5:
            visitLabeledStatement(pos + 4);
            break;
        case 6:
            visitBreakStatement(pos + 4);
            break;
        case 7:
            visitContinueStatement(pos + 4);
            break;
        case 8:
            visitIfStatement(pos + 4);
            break;
        case 9:
            visitSwitchStatement(pos + 4);
            break;
        case 10:
            visitThrowStatement(pos + 4);
            break;
        case 11:
            visitTryStatement(pos + 4);
            break;
        case 12:
            visitWhileStatement(pos + 4);
            break;
        case 13:
            visitDoWhileStatement(pos + 4);
            break;
        case 14:
            visitForStatement(pos + 4);
            break;
        case 15:
            visitForInStatement(pos + 4);
            break;
        case 16:
            visitForOfStatement(pos + 4);
            break;
        case 17:
            visitDeclaration(pos + 4);
            break;
        case 18:
            visitExpressionStatement(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for Statement");
    }
}

function visitBlockStatement(pos) {
    visitVecStatement(pos + 12);
}

function visitEmptyStatement(pos) {}

function visitDebuggerStatement(pos) {}

function visitWithStatement(pos) {
    visitBoxExpression(pos + 12);
    visitBoxStatement(pos + 16);
}

function visitReturnStatement(pos) {
    visitOptionBoxExpression(pos + 12);
}

function visitLabeledStatement(pos) {
    visitIdentifier(pos + 12);
    visitBoxStatement(pos + 36);
}

function visitBreakStatement(pos) {
    visitOptionIdentifier(pos + 12);
}

function visitContinueStatement(pos) {
    visitOptionIdentifier(pos + 12);
}

function visitIfStatement(pos) {
    visitBoxExpression(pos + 12);
    visitBoxStatement(pos + 16);
    visitOptionBoxStatement(pos + 20);
}

function visitSwitchStatement(pos) {
    visitBoxExpression(pos + 12);
    visitVecSwitchCase(pos + 16);
}

function visitSwitchCase(pos) {
    visitOptionBoxExpression(pos + 12);
    visitVecStatement(pos + 20);
}

function visitThrowStatement(pos) {
    visitBoxExpression(pos + 12);
}

function visitTryStatement(pos) {
    visitBlockStatement(pos + 12);
    visitOptionCatchClause(pos + 32);
    visitOptionBlockStatement(pos + 124);
}

function visitCatchClause(pos) {
    visitOptionPattern(pos + 12);
    visitBlockStatement(pos + 68);
}

function visitWhileStatement(pos) {
    visitBoxExpression(pos + 12);
    visitBoxStatement(pos + 16);
}

function visitDoWhileStatement(pos) {
    visitBoxExpression(pos + 12);
    visitBoxStatement(pos + 16);
}

function visitForStatement(pos) {
    visitOptionVariableDeclarationOrBoxExpression(pos + 12);
    visitOptionBoxExpression(pos + 48);
    visitOptionBoxExpression(pos + 56);
    visitBoxStatement(pos + 64);
}

function visitForInStatement(pos) {
    visitVariableDeclarationOrPattern(pos + 12);
    visitBoxExpression(pos + 68);
    visitBoxStatement(pos + 72);
}

function visitForOfStatement(pos) {
    visitVariableDeclarationOrPattern(pos + 28);
    visitBoxExpression(pos + 84);
    visitBoxStatement(pos + 88);
}

function visitExpressionStatement(pos) {
    visitBoxExpression(pos + 12);
}

function visitDeclaration(pos) {
    switch (buff[pos]) {
        case 0:
            visitClassDeclaration(pos + 4);
            break;
        case 1:
            visitFunctionDeclaration(pos + 4);
            break;
        case 2:
            visitVariableDeclaration(pos + 4);
            break;
        case 3:
            visitTsInterfaceDeclaration(pos + 4);
            break;
        case 4:
            visitTsTypeAliasDeclaration(pos + 4);
            break;
        case 5:
            visitTsEnumDeclaration(pos + 4);
            break;
        case 6:
            visitTsModuleDeclaration(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for Declaration");
    }
}

function visitVariableDeclaration(pos) {
    visitVecVariableDeclarator(pos + 20);
}

function visitVariableDeclarator(pos) {
    visitPattern(pos + 12);
    visitOptionBoxExpression(pos + 64);
}

function visitFunctionDeclaration(pos) {
    visitIdentifier(pos);
    visitVecParameter(pos + 28);
    visitVecDecorator(pos + 36);
    visitOptionBlockStatement(pos + 56);
    visitOptionTsTypeParameterDeclaration(pos + 84);
    visitOptionTsTypeAnnotation(pos + 108);
}

function visitFunctionExpression(pos) {
    visitOptionIdentifier(pos);
    visitVecParameter(pos + 28);
    visitVecDecorator(pos + 36);
    visitOptionBlockStatement(pos + 56);
    visitOptionTsTypeParameterDeclaration(pos + 84);
    visitOptionTsTypeAnnotation(pos + 108);
}

function visitArrowFunctionExpression(pos) {
    visitVecPattern(pos + 12);
    visitBlockStatementOrBoxExpression(pos + 20);
    visitOptionTsTypeParameterDeclaration(pos + 48);
    visitOptionTsTypeAnnotation(pos + 72);
}

function visitParameter(pos) {
    visitVecDecorator(pos + 12);
    visitPattern(pos + 20);
}

function visitDecorator(pos) {
    visitBoxExpression(pos + 12);
}

function visitClassDeclaration(pos) {
    visitIdentifier(pos);
    visitVecDecorator(pos + 40);
    visitVecClassMember(pos + 48);
    visitOptionBoxExpression(pos + 56);
    visitOptionTsTypeParamDeclaration(pos + 68);
    visitOptionTsTypeParameterInstantiation(pos + 92);
    visitVecTsExpressionWithTypeArg(pos + 116);
}

function visitClassExpression(pos) {
    visitOptionIdentifier(pos);
    visitVecDecorator(pos + 40);
    visitVecClassMember(pos + 48);
    visitOptionBoxExpression(pos + 56);
    visitOptionTsTypeParamDeclaration(pos + 68);
    visitOptionTsTypeParameterInstantiation(pos + 92);
    visitVecTsExpressionWithTypeArg(pos + 116);
}

function visitClassMember(pos) {
    switch (buff[pos]) {
        case 0:
            visitConstructor(pos + 8);
            break;
        case 1:
            visitClassMethod(pos + 8);
            break;
        case 2:
            visitPrivateMethod(pos + 4);
            break;
        case 3:
            visitClassProperty(pos + 8);
            break;
        case 4:
            visitPrivateProperty(pos + 4);
            break;
        case 5:
            visitTsIndexSignature(pos + 4);
            break;
        case 6:
            visitEmptyStatement(pos + 4);
            break;
        case 7:
            visitStaticBlock(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for ClassMember");
    }
}

function visitConstructor(pos) {
    visitPropertyName(pos + 16);
    visitVecTsParamPropOrParameter(pos + 64);
    visitOptionBlockStatement(pos + 72);
}

function visitClassMethod(pos) {
    visitPropertyName(pos + 16);
    visitFunction(pos + 64);
}

function visitPrivateMethod(pos) {
    visitPrivateName(pos + 12);
    visitFunction(pos + 48);
}

function visitClassProperty(pos) {
    visitPropertyName(pos + 16);
    visitOptionBoxExpression(pos + 64);
    visitOptionTsTypeAnnotation(pos + 72);
    visitVecDecorator(pos + 96);
}

function visitPrivateProperty(pos) {
    visitPrivateName(pos + 12);
    visitOptionBoxExpression(pos + 48);
    visitOptionTsTypeAnnotation(pos + 56);
    visitVecDecorator(pos + 80);
}

function visitStaticBlock(pos) {
    visitBlockStatement(pos + 12);
}

function visitFunction(pos) {
    visitVecParameter(pos);
    visitVecDecorator(pos + 8);
    visitOptionBlockStatement(pos + 28);
    visitOptionTsTypeParamDeclaration(pos + 56);
    visitOptionTsTypeAnnotation(pos + 80);
}

function visitPattern(pos) {
    switch (buff[pos]) {
        case 0:
            visitBindingIdentifier(pos + 4);
            break;
        case 1:
            visitArrayPattern(pos + 4);
            break;
        case 2:
            visitRestElement(pos + 4);
            break;
        case 3:
            visitObjectPattern(pos + 4);
            break;
        case 4:
            visitAssignmentPattern(pos + 4);
            break;
        case 5:
            visitInvalid(pos + 4);
            break;
        case 6:
            visitBoxExpression(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for Pattern");
    }
}

function visitBindingIdentifier(pos) {
    visitOptionTsTypeAnnotation(pos + 24);
}

function visitArrayPattern(pos) {
    visitVecOptionPattern(pos + 12);
    visitOptionTsTypeAnnotation(pos + 24);
}

function visitRestElement(pos) {
    visitBoxPattern(pos + 24);
    visitOptionTsTypeAnnotation(pos + 28);
}

function visitObjectPattern(pos) {
    visitVecObjectPatternProperty(pos + 12);
    visitOptionTsTypeAnnotation(pos + 24);
}

function visitObjectPatternProperty(pos) {
    switch (buff[pos]) {
        case 0:
            visitKeyValuePatternProperty(pos + 8);
            break;
        case 1:
            visitAssignmentPatternProperty(pos + 4);
            break;
        case 2:
            visitRestElement(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for ObjectPatternProperty");
    }
}

function visitKeyValuePatternProperty(pos) {
    visitPropertyName(pos);
    visitBoxPattern(pos + 48);
}

function visitAssignmentPatternProperty(pos) {
    visitIdentifier(pos + 12);
    visitOptionBoxExpression(pos + 36);
}

function visitAssignmentPattern(pos) {
    visitBoxPattern(pos + 12);
    visitBoxExpression(pos + 16);
    visitOptionTsTypeAnnotation(pos + 20);
}

function visitExpression(pos) {
    switch (buff[pos]) {
        case 0:
            visitThisExpression(pos + 4);
            break;
        case 1:
            visitArrayExpression(pos + 4);
            break;
        case 2:
            visitObjectExpression(pos + 4);
            break;
        case 3:
            visitFunctionExpression(pos + 4);
            break;
        case 4:
            visitUnaryExpression(pos + 4);
            break;
        case 5:
            visitUpdateExpression(pos + 4);
            break;
        case 6:
            visitBinaryExpression(pos + 4);
            break;
        case 7:
            visitAssignmentExpression(pos + 4);
            break;
        case 8:
            visitMemberExpression(pos + 4);
            break;
        case 9:
            visitSuperPropExpression(pos + 4);
            break;
        case 10:
            visitConditionalExpression(pos + 4);
            break;
        case 11:
            visitCallExpression(pos + 4);
            break;
        case 12:
            visitNewExpression(pos + 4);
            break;
        case 13:
            visitSequenceExpression(pos + 4);
            break;
        case 14:
            visitIdentifier(pos + 4);
            break;
        case 15:
            visitLiteral(pos + 8);
            break;
        case 16:
            visitTemplateLiteral(pos + 4);
            break;
        case 17:
            visitTaggedTemplateExpression(pos + 4);
            break;
        case 18:
            visitArrowFunctionExpression(pos + 4);
            break;
        case 19:
            visitClassExpression(pos + 4);
            break;
        case 20:
            visitYieldExpression(pos + 4);
            break;
        case 21:
            visitMetaProperty(pos + 4);
            break;
        case 22:
            visitAwaitExpression(pos + 4);
            break;
        case 23:
            visitParenthesisExpression(pos + 4);
            break;
        case 24:
            visitJSXMemberExpression(pos + 4);
            break;
        case 25:
            visitJSXNamespacedName(pos + 4);
            break;
        case 26:
            visitJSXEmptyExpression(pos + 4);
            break;
        case 27:
            visitBoxJSXElement(pos + 4);
            break;
        case 28:
            visitJSXFragment(pos + 4);
            break;
        case 29:
            visitTsTypeAssertion(pos + 4);
            break;
        case 30:
            visitTsConstAssertion(pos + 4);
            break;
        case 31:
            visitTsNonNullExpression(pos + 4);
            break;
        case 32:
            visitTsAsExpression(pos + 4);
            break;
        case 33:
            visitTsInstantiation(pos + 4);
            break;
        case 34:
            visitPrivateName(pos + 4);
            break;
        case 35:
            visitOptionalChainingExpression(pos + 4);
            break;
        case 36:
            visitInvalid(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for Expression");
    }
}

function visitThisExpression(pos) {}

function visitArrayExpression(pos) {
    visitVecOptionExpressionOrSpread(pos + 12);
}

function visitUnaryExpression(pos) {
    visitBoxExpression(pos + 16);
}

function visitUpdateExpression(pos) {
    visitBoxExpression(pos + 20);
}

function visitBinaryExpression(pos) {
    visitBoxExpression(pos + 16);
    visitBoxExpression(pos + 20);
}

function visitAssignmentExpression(pos) {
    visitAssignmentLeft(pos + 16);
    visitBoxExpression(pos + 24);
}

function visitAssignmentLeft(pos) {
    switch (buff[pos]) {
        case 0:
            visitBoxExpression(pos + 4);
            break;
        case 1:
            visitBoxPattern(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for AssignmentLeft");
    }
}

function visitMemberExpression(pos) {
    visitBoxExpression(pos + 12);
    visitIdentifierOrPrivateNameOrComputed(pos + 16);
}

function visitSuperPropExpression(pos) {
    visitSuper(pos + 12);
    visitIdentifierOrComputed(pos + 24);
}

function visitConditionalExpression(pos) {
    visitBoxExpression(pos + 12);
    visitBoxExpression(pos + 16);
    visitBoxExpression(pos + 20);
}

function visitCallExpression(pos) {
    visitSuperOrImportOrBoxExpression(pos + 12);
    visitVecExpressionOrSpread(pos + 28);
    visitOptionTsTypeParameterInstantiation(pos + 36);
}

function visitNewExpression(pos) {
    visitBoxExpression(pos + 12);
    visitOptionVecExpressionOrSpread(pos + 16);
    visitOptionTsTypeParameterInstantiation(pos + 28);
}

function visitSequenceExpression(pos) {
    visitVecBoxExpression(pos + 12);
}

function visitIdentifier(pos) {}

function visitTemplateLiteral(pos) {
    visitVecBoxExpression(pos + 12);
    visitVecTemplateElement(pos + 20);
}

function visitTemplateElement(pos) {}

function visitTaggedTemplateExpression(pos) {
    visitBoxExpression(pos + 12);
    visitOptionTsTypeParameterInstantiation(pos + 16);
    visitTemplateLiteral(pos + 40);
}

function visitYieldExpression(pos) {
    visitOptionBoxExpression(pos + 12);
}

function visitMetaProperty(pos) {}

function visitAwaitExpression(pos) {
    visitBoxExpression(pos + 12);
}

function visitParenthesisExpression(pos) {
    visitBoxExpression(pos + 12);
}

function visitPrivateName(pos) {
    visitIdentifier(pos + 12);
}

function visitOptionalChainingExpression(pos) {
    visitMemberExpressionOrOptionalChainingCall(pos + 24);
}

function visitOptionalChainingCall(pos) {
    visitBoxExpression(pos + 12);
    visitVecExpressionOrSpread(pos + 16);
    visitOptionTsTypeParameterInstantiation(pos + 24);
}

function visitSuper(pos) {}

function visitImport(pos) {}

function visitInvalid(pos) {}

function visitComputed(pos) {
    visitBoxExpression(pos + 12);
}

function visitExpressionOrSpread(pos) {
    visitBoxExpression(pos + 16);
}

function visitObjectExpression(pos) {
    visitVecSpreadElementOrBoxObjectProperty(pos + 12);
}

function visitSpreadElement(pos) {
    visitBoxExpression(pos + 12);
}

function visitObjectProperty(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitKeyValueProperty(pos + 8);
            break;
        case 2:
            visitAssignmentProperty(pos + 4);
            break;
        case 3:
            visitGetterProperty(pos + 8);
            break;
        case 4:
            visitSetterProperty(pos + 8);
            break;
        case 5:
            visitMethodProperty(pos + 8);
            break;
        default:
            throw new Error("Unexpected enum value for ObjectProperty");
    }
}

function visitKeyValueProperty(pos) {
    visitPropertyName(pos);
    visitBoxExpression(pos + 48);
}

function visitAssignmentProperty(pos) {
    visitIdentifier(pos + 12);
    visitBoxExpression(pos + 36);
}

function visitGetterProperty(pos) {
    visitPropertyName(pos + 16);
    visitOptionTsTypeAnnotation(pos + 64);
    visitOptionBlockStatement(pos + 84);
}

function visitSetterProperty(pos) {
    visitPropertyName(pos + 16);
    visitPattern(pos + 64);
    visitOptionBlockStatement(pos + 116);
}

function visitMethodProperty(pos) {
    visitPropertyName(pos);
    visitVecParameter(pos + 48);
    visitVecDecorator(pos + 56);
    visitOptionBlockStatement(pos + 76);
    visitOptionTsTypeParameterDeclaration(pos + 104);
    visitOptionTsTypeAnnotation(pos + 128);
}

function visitPropertyName(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitStringLiteral(pos + 4);
            break;
        case 2:
            visitNumericLiteral(pos + 8);
            break;
        case 3:
            visitComputed(pos + 4);
            break;
        case 4:
            visitBigIntLiteral(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for PropertyName");
    }
}

function visitLiteral(pos) {
    switch (buff[pos]) {
        case 0:
            visitStringLiteral(pos + 4);
            break;
        case 1:
            visitBooleanLiteral(pos + 4);
            break;
        case 2:
            visitNullLiteral(pos + 4);
            break;
        case 3:
            visitNumericLiteral(pos + 8);
            break;
        case 4:
            visitBigIntLiteral(pos + 4);
            break;
        case 5:
            visitRegExpLiteral(pos + 4);
            break;
        case 6:
            visitJSXText(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for Literal");
    }
}

function visitStringLiteral(pos) {}

function visitBooleanLiteral(pos) {}

function visitNullLiteral(pos) {}

function visitNumericLiteral(pos) {}

function visitBigIntLiteral(pos) {}

function visitRegExpLiteral(pos) {}

function visitJSXElement(pos) {
    visitJSXOpeningElement(pos + 12);
    visitVecJSXElementChild(pos + 116);
    visitOptionJSXClosingElement(pos + 124);
}

function visitJSXOpeningElement(pos) {
    visitJSXElementName(pos);
    visitVecJSXAttributeOrSpreadElement(pos + 68);
    visitOptionTsTypeParameterInstantiation(pos + 80);
}

function visitJSXAttribute(pos) {
    visitJSXAttributeName(pos + 12);
    visitOptionJSXAttributeValue(pos + 64);
}

function visitJSXAttributeName(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitJSXNamespacedName(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for JSXAttributeName");
    }
}

function visitJSXAttributeValue(pos) {
    switch (buff[pos]) {
        case 0:
            visitLiteral(pos + 8);
            break;
        case 1:
            visitJSXExpressionContainer(pos + 4);
            break;
        case 2:
            visitBoxJSXElement(pos + 4);
            break;
        case 3:
            visitJSXFragment(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for JSXAttributeValue");
    }
}

function visitJSXClosingElement(pos) {
    visitJSXElementName(pos + 12);
}

function visitJSXFragment(pos) {
    visitJSXOpeningFragment(pos + 12);
    visitVecJSXElementChild(pos + 24);
    visitJSXClosingFragment(pos + 32);
}

function visitJSXOpeningFragment(pos) {}

function visitJSXClosingFragment(pos) {}

function visitJSXMemberExpression(pos) {
    visitJSXObject(pos);
    visitIdentifier(pos + 28);
}

function visitJSXObject(pos) {
    switch (buff[pos]) {
        case 0:
            visitBoxJSXMemberExpression(pos + 4);
            break;
        case 1:
            visitIdentifier(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for JSXObject");
    }
}

function visitJSXNamespacedName(pos) {
    visitIdentifier(pos);
    visitIdentifier(pos + 24);
}

function visitJSXText(pos) {}

function visitJSXEmptyExpression(pos) {}

function visitJSXElementChild(pos) {
    switch (buff[pos]) {
        case 0:
            visitJSXText(pos + 4);
            break;
        case 1:
            visitJSXExpressionContainer(pos + 4);
            break;
        case 2:
            visitJSXSpreadChild(pos + 4);
            break;
        case 3:
            visitBoxJSXElement(pos + 4);
            break;
        case 4:
            visitJSXFragment(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for JSXElementChild");
    }
}

function visitJSXExpressionContainer(pos) {
    visitJSXExpression(pos + 12);
}

function visitJSXExpression(pos) {
    switch (buff[pos]) {
        case 0:
            visitJSXEmptyExpression(pos + 4);
            break;
        case 1:
            visitBoxExpression(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for JSXExpression");
    }
}

function visitJSXSpreadChild(pos) {
    visitBoxExpression(pos + 12);
}

function visitJSXElementName(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitJSXMemberExpression(pos + 4);
            break;
        case 2:
            visitJSXNamespacedName(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for JSXElementName");
    }
}

function visitTsTypeAssertion(pos) {}

function visitTsConstAssertion(pos) {}

function visitTsNonNullExpression(pos) {}

function visitTsAsExpression(pos) {}

function visitTsInstantiation(pos) {}

function visitTsTypeAnnotation(pos) {
    visitBoxTsType(pos + 12);
}

function visitTsInterfaceDeclaration(pos) {}

function visitTsTypeAliasDeclaration(pos) {}

function visitTsEnumDeclaration(pos) {}

function visitTsModuleDeclaration(pos) {}

function visitTsImportEqualsDeclaration(pos) {}

function visitTsExportAssignment(pos) {}

function visitTsNamespaceExportDeclaration(pos) {}

function visitTsTypeParamDeclaration(pos) {
    visitVecTsTypeParameter(pos + 12);
}

function visitTsTypeParameterInstantiation(pos) {
    visitVecBoxTsType(pos + 12);
}

function visitTsExpressionWithTypeArg(pos) {}

function visitTsIndexSignature(pos) {}

function visitTsParamProp(pos) {
    visitVecDecorator(pos + 12);
    visitTsParamPropParam(pos + 32);
}

function visitTsParamPropParam(pos) {
    switch (buff[pos]) {
        case 0:
            visitBindingIdentifier(pos + 4);
            break;
        case 1:
            visitAssignmentPattern(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for TsParamPropParam");
    }
}

function visitTsTypeParameterDeclaration(pos) {
    visitVecTsTypeParameter(pos + 12);
}

function visitTsTypeParameter(pos) {}

function visitTsType(pos) {}

function visitVecModuleDeclarationOrStatement(pos) {
    visitVec(pos, visitModuleDeclarationOrStatement, 156);
}

function visitModuleDeclarationOrStatement(pos) {
    switch (buff[pos]) {
        case 0:
            visitModuleDeclaration(pos + 4);
            break;
        case 1:
            visitStatement(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for ModuleDeclarationOrStatement"
            );
    }
}

function visitVecImportSpecifier(pos) {
    visitVec(pos, visitImportSpecifier, 84);
}

function visitOptionModuleExportName(pos) {
    visitOption(pos, visitModuleExportName, 4);
}

function visitOptionObjectExpression(pos) {
    visitOption(pos, visitObjectExpression, 4);
}

function visitVecSpreadElementOrBoxObjectProperty(pos) {
    visitVec(pos, visitSpreadElementOrBoxObjectProperty, 20);
}

function visitSpreadElementOrBoxObjectProperty(pos) {
    switch (buff[pos]) {
        case 0:
            visitSpreadElement(pos + 4);
            break;
        case 1:
            visitBoxObjectProperty(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for SpreadElementOrBoxObjectProperty"
            );
    }
}

function visitBoxExpression(pos) {
    visitBox(pos, visitExpression);
}

function visitVecOptionExpressionOrSpread(pos) {
    visitVec(pos, visitOptionExpressionOrSpread, 24);
}

function visitOptionExpressionOrSpread(pos) {
    visitOption(pos, visitExpressionOrSpread, 4);
}

function visitOptionIdentifier(pos) {
    visitOption(pos, visitIdentifier, 4);
}

function visitVecParameter(pos) {
    visitVec(pos, visitParameter, 72);
}

function visitVecDecorator(pos) {
    visitVec(pos, visitDecorator, 16);
}

function visitOptionTsTypeAnnotation(pos) {
    visitOption(pos, visitTsTypeAnnotation, 4);
}

function visitBoxTsType(pos) {
    visitBox(pos, visitTsType);
}

function visitVecOptionPattern(pos) {
    visitVec(pos, visitOptionPattern, 56);
}

function visitOptionPattern(pos) {
    visitOption(pos, visitPattern, 4);
}

function visitBoxPattern(pos) {
    visitBox(pos, visitPattern);
}

function visitVecObjectPatternProperty(pos) {
    visitVec(pos, visitObjectPatternProperty, 64);
}

function visitOptionBoxExpression(pos) {
    visitOption(pos, visitBoxExpression, 4);
}

function visitOptionBlockStatement(pos) {
    visitOption(pos, visitBlockStatement, 4);
}

function visitVecStatement(pos) {
    visitVec(pos, visitStatement, 152);
}

function visitBoxStatement(pos) {
    visitBox(pos, visitStatement);
}

function visitOptionBoxStatement(pos) {
    visitOption(pos, visitBoxStatement, 4);
}

function visitVecSwitchCase(pos) {
    visitVec(pos, visitSwitchCase, 28);
}

function visitOptionCatchClause(pos) {
    visitOption(pos, visitCatchClause, 4);
}

function visitOptionVariableDeclarationOrBoxExpression(pos) {
    visitOption(pos, visitVariableDeclarationOrBoxExpression, 4);
}

function visitVariableDeclarationOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0:
            visitVariableDeclaration(pos + 4);
            break;
        case 1:
            visitBoxExpression(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for VariableDeclarationOrBoxExpression"
            );
    }
}

function visitVecVariableDeclarator(pos) {
    visitVec(pos, visitVariableDeclarator, 76);
}

function visitVariableDeclarationOrPattern(pos) {
    switch (buff[pos]) {
        case 0:
            visitVariableDeclaration(pos + 4);
            break;
        case 1:
            visitPattern(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for VariableDeclarationOrPattern"
            );
    }
}

function visitVecClassMember(pos) {
    visitVec(pos, visitClassMember, 192);
}

function visitVecTsParamPropOrParameter(pos) {
    visitVec(pos, visitTsParamPropOrParameter, 84);
}

function visitTsParamPropOrParameter(pos) {
    switch (buff[pos]) {
        case 0:
            visitTsParamProp(pos + 4);
            break;
        case 1:
            visitParameter(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for TsParamPropOrParameter");
    }
}

function visitOptionTsTypeParamDeclaration(pos) {
    visitOption(pos, visitTsTypeParamDeclaration, 4);
}

function visitVecTsTypeParameter(pos) {
    visitVec(pos, visitTsTypeParameter, 12);
}

function visitOptionTsTypeParameterInstantiation(pos) {
    visitOption(pos, visitTsTypeParameterInstantiation, 4);
}

function visitVecBoxTsType(pos) {
    visitVec(pos, visitBoxTsType, 4);
}

function visitVecTsExpressionWithTypeArg(pos) {
    visitVec(pos, visitTsExpressionWithTypeArg, 12);
}

function visitOptionTsTypeParameterDeclaration(pos) {
    visitOption(pos, visitTsTypeParameterDeclaration, 4);
}

function visitIdentifierOrPrivateNameOrComputed(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitPrivateName(pos + 4);
            break;
        case 2:
            visitComputed(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for IdentifierOrPrivateNameOrComputed"
            );
    }
}

function visitIdentifierOrComputed(pos) {
    switch (buff[pos]) {
        case 0:
            visitIdentifier(pos + 4);
            break;
        case 1:
            visitComputed(pos + 4);
            break;
        default:
            throw new Error("Unexpected enum value for IdentifierOrComputed");
    }
}

function visitSuperOrImportOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0:
            visitSuper(pos + 4);
            break;
        case 1:
            visitImport(pos + 4);
            break;
        case 2:
            visitBoxExpression(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for SuperOrImportOrBoxExpression"
            );
    }
}

function visitVecExpressionOrSpread(pos) {
    visitVec(pos, visitExpressionOrSpread, 20);
}

function visitOptionVecExpressionOrSpread(pos) {
    visitOption(pos, visitVecExpressionOrSpread, 4);
}

function visitVecBoxExpression(pos) {
    visitVec(pos, visitBoxExpression, 4);
}

function visitVecTemplateElement(pos) {
    visitVec(pos, visitTemplateElement, 36);
}

function visitVecPattern(pos) {
    visitVec(pos, visitPattern, 52);
}

function visitBlockStatementOrBoxExpression(pos) {
    switch (buff[pos]) {
        case 0:
            visitBlockStatement(pos + 4);
            break;
        case 1:
            visitBoxExpression(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for BlockStatementOrBoxExpression"
            );
    }
}

function visitBoxJSXMemberExpression(pos) {
    visitBox(pos, visitJSXMemberExpression);
}

function visitBoxJSXElement(pos) {
    visitBox(pos, visitJSXElement);
}

function visitVecJSXAttributeOrSpreadElement(pos) {
    visitVec(pos, visitJSXAttributeOrSpreadElement, 136);
}

function visitJSXAttributeOrSpreadElement(pos) {
    switch (buff[pos]) {
        case 0:
            visitJSXAttribute(pos + 8);
            break;
        case 1:
            visitSpreadElement(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for JSXAttributeOrSpreadElement"
            );
    }
}

function visitOptionJSXAttributeValue(pos) {
    visitOption(pos, visitJSXAttributeValue, 8);
}

function visitVecJSXElementChild(pos) {
    visitVec(pos, visitJSXElementChild, 48);
}

function visitOptionJSXClosingElement(pos) {
    visitOption(pos, visitJSXClosingElement, 4);
}

function visitMemberExpressionOrOptionalChainingCall(pos) {
    switch (buff[pos]) {
        case 0:
            visitMemberExpression(pos + 4);
            break;
        case 1:
            visitOptionalChainingCall(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for MemberExpressionOrOptionalChainingCall"
            );
    }
}

function visitBoxObjectProperty(pos) {
    visitBox(pos, visitObjectProperty);
}

function visitVecExportSpecifier(pos) {
    visitVec(pos, visitExportSpecifier, 96);
}

function visitOptionStringLiteral(pos) {
    visitOption(pos, visitStringLiteral, 4);
}

function visitClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration(pos) {
    switch (buff[pos]) {
        case 0:
            visitClassExpression(pos + 4);
            break;
        case 1:
            visitFunctionExpression(pos + 4);
            break;
        case 2:
            visitTsInterfaceDeclaration(pos + 4);
            break;
        default:
            throw new Error(
                "Unexpected enum value for ClassExpressionOrFunctionExpressionOrTsInterfaceDeclaration"
            );
    }
}

function visit(buffIn) {
    const arrayBuffer = buffIn.buffer;
    buff = Buffer.from(arrayBuffer);
    int32 = new Int32Array(arrayBuffer);
    uint32 = new Uint32Array(arrayBuffer);
    visitProgram(buffIn.byteOffset + buffIn.length - 40);
}

function visitOption(pos, visit, offset) {
    switch (buff[pos]) {
        case 0:
            return;
        case 1:
            return visit(pos + offset);
        default:
            throw new Error("Unexpected option value");
    }
}

function visitBox(pos, visit) {
    return visit(pos + int32[pos >> 2]);
}

function visitVec(pos, visit, length) {
    const pos32 = pos >> 2;
    const numEntries = uint32[pos32 + 1];
    if (numEntries === 0) return;
    pos += int32[pos32];
    for (let i = 0; i < numEntries; i++) {
        visit(pos);
        pos += length;
    }
}

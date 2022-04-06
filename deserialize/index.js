// Generated code. Do not edit.

'use strict';

const assert = require('assert');

module.exports = function deserialize(buff) {
	return deserializeProgram(buff, buff.length - 36);
};

const enumOptionsProgram = [
	deserializeModule,
	deserializeScript
];

function deserializeProgram(buff, pos) {
	const deserialize = enumOptionsProgram[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeScript(buff, pos) {
	return {
		type: 'Script',
		span: deserializeSpan(buff, pos),
		body: deserializeStatements(buff, pos + 12),
		interpreter: deserializeInterpreter(buff, pos + 20)
	};
}

function deserializeModule(buff, pos) {
	return {
		type: 'Module',
		span: deserializeSpan(buff, pos),
		body: deserializeModuleBody(buff, pos + 12),
		interpreter: deserializeInterpreter(buff, pos + 20)
	};
}

function deserializeInterpreter(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeJsWord(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeModuleBody(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeModuleItem(buff, vecPos + i * 156));
	}
	return entries;
}

const enumOptionsModuleItem = [
	deserializeModuleDecl,
	deserializeStatement
];

function deserializeModuleItem(buff, pos) {
	const deserialize = enumOptionsModuleItem[buff.readUInt32LE(pos)];
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

function deserializeStatement(buff, pos) {
	const deserialize = enumOptionsStatement[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeExpressionStatement(buff, pos) {
	return {
		type: 'ExpressionStatement',
		span: deserializeSpan(buff, pos),
		expression: deserializeBoxedExpression(buff, pos + 12)
	};
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

function deserializeDeclaration(buff, pos) {
	const deserialize = enumOptionsDeclaration[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeTsModuleDeclaration(buff, pos) {
	return {
		type: 'TsModuleDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsEnumDeclaration(buff, pos) {
	return {
		type: 'TsEnumDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsTypeAliasDeclaration(buff, pos) {
	return {
		type: 'TsTypeAliasDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsInterfaceDeclaration(buff, pos) {
	return {
		type: 'TsInterfaceDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeFunctionDeclaration(buff, pos) {
	return {
		type: 'FunctionDeclaration',
		identifier: deserializeIdentifier(buff, pos),
		declare: deserializeBoolean(buff, pos + 24),
		params: deserializeParameters(buff, pos + 28),
		decorators: deserializeDecorators(buff, pos + 36),
		span: deserializeSpan(buff, pos + 44),
		body: deserializeOptionalBlockStatement(buff, pos + 56),
		generator: deserializeBooleanBit(buff, pos + 104),
		async: deserializeBooleanBitAnd2Empty(buff, pos + 105),
		typeParameters: deserializeOptionalTsTypeParameterDeclaration(buff, pos + 80),
		returnType: deserializeOptionalTsTypeAnnotation(buff, pos + 108)
	};
}

function deserializeClassDeclaration(buff, pos) {
	return {
		type: 'ClassDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeForOfStatement(buff, pos) {
	return {
		type: 'ForOfStatement',
		span: deserializeSpan(buff, pos),
		await: deserializeOptionalSpan(buff, pos + 12),
		left: deserializeVariableDeclarationOrPattern(buff, pos + 28),
		right: deserializeBoxedExpression(buff, pos + 84),
		body: deserializeBoxedStatement(buff, pos + 88)
	};
}

function deserializeOptionalSpan(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeSpan(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeForInStatement(buff, pos) {
	return {
		type: 'ForInStatement',
		span: deserializeSpan(buff, pos),
		left: deserializeVariableDeclarationOrPattern(buff, pos + 12),
		right: deserializeBoxedExpression(buff, pos + 68),
		body: deserializeBoxedStatement(buff, pos + 72)
	};
}

const enumOptionsVariableDeclarationOrPattern = [
	deserializeVariableDeclaration,
	deserializePattern
];

function deserializeVariableDeclarationOrPattern(buff, pos) {
	const deserialize = enumOptionsVariableDeclarationOrPattern[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeForStatement(buff, pos) {
	return {
		type: 'ForStatement',
		span: deserializeSpan(buff, pos),
		init: deserializeForStatementInit(buff, pos + 12),
		test: deserializeOptionalBoxedExpression(buff, pos + 44),
		update: deserializeOptionalBoxedExpression(buff, pos + 52),
		body: deserializeBoxedStatement(buff, pos + 60)
	};
}

function deserializeForStatementInit(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeVariableDeclarationOrExpression(buff, pos + 4);
	assert(opt === 0);
	return null;
}

const enumOptionsVariableDeclarationOrExpression = [
	deserializeVariableDeclaration,
	deserializeBoxedExpression
];

function deserializeVariableDeclarationOrExpression(buff, pos) {
	const deserialize = enumOptionsVariableDeclarationOrExpression[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeVariableDeclaration(buff, pos) {
	return {
		type: 'VariableDeclaration',
		span: deserializeSpan(buff, pos),
		kind: deserializeVariableDeclarationKind(buff, pos + 12),
		declare: deserializeVariableDeclarationDeclare(buff, pos + 16),
		declarations: deserializeVariableDeclarationDeclarators(buff, pos + 16)
	};
}

function deserializeVariableDeclarationDeclarators(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeVariableDeclarator(buff, vecPos + i * 76));
	}
	return entries;
}

function deserializeVariableDeclarator(buff, pos) {
	return {
		type: 'VariableDeclarator',
		span: deserializeSpan(buff, pos),
		id: deserializePattern(buff, pos + 12),
		init: deserializeOptionalBoxedExpression(buff, pos + 64),
		definite: deserializeBoolean(buff, pos + 72)
	};
}

function deserializeVariableDeclarationDeclare() { return false; }

const enumOptionsVariableDeclarationKind = ['var', 'let', 'const'];

function deserializeVariableDeclarationKind(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	const value = enumOptionsVariableDeclarationKind[opt];
	assert(value);
	return value;
}

function deserializeDoWhileStatement(buff, pos) {
	return {
		type: 'DoWhileStatement',
		span: deserializeSpan(buff, pos),
		test: deserializeBoxedExpression(buff, pos + 12),
		body: deserializeBoxedStatement(buff, pos + 16)
	};
}

function deserializeWhileStatement(buff, pos) {
	return {
		type: 'WhileStatement',
		span: deserializeSpan(buff, pos),
		test: deserializeBoxedExpression(buff, pos + 12),
		body: deserializeBoxedStatement(buff, pos + 16)
	};
}

function deserializeTryStatement(buff, pos) {
	return {
		type: 'TryStatement',
		span: deserializeSpan(buff, pos),
		block: deserializeBlockStatement(buff, pos + 12),
		handler: deserializeOptionalCatchClause(buff, pos + 32),
		finalizer: deserializeOptionalBlockStatement(buff, pos + 124)
	};
}

function deserializeOptionalCatchClause(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeCatchClause(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeCatchClause(buff, pos) {
	return {
		type: 'CatchClause',
		span: deserializeSpan(buff, pos),
		param: deserializeOptionalPattern(buff, pos + 12),
		body: deserializeBlockStatement(buff, pos + 68)
	};
}

function deserializeOptionalPattern(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializePattern(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeThrowStatement(buff, pos) {
	return {
		type: 'ThrowStatement',
		span: deserializeSpan(buff, pos),
		argument: deserializeBoxedExpression(buff, pos + 12)
	};
}

function deserializeSwitchStatement(buff, pos) {
	return {
		type: 'SwitchStatement',
		span: deserializeSpan(buff, pos),
		discriminant: deserializeBoxedExpression(buff, pos + 12),
		cases: deserializeSwitchStatementCases(buff, pos + 16)
	};
}

function deserializeSwitchStatementCases(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeSwitchCase(buff, vecPos + i * 28));
	}
	return entries;
}

function deserializeSwitchCase(buff, pos) {
	return {
		type: 'SwitchCase',
		span: deserializeSpan(buff, pos),
		test: deserializeOptionalBoxedExpression(buff, pos + 12),
		consequent: deserializeStatements(buff, pos + 20)
	};
}

function deserializeIfStatement(buff, pos) {
	return {
		type: 'IfStatement',
		span: deserializeSpan(buff, pos),
		test: deserializeBoxedExpression(buff, pos + 12),
		consequent: deserializeBoxedStatement(buff, pos + 16),
		alternate: deserializeOptionalBoxedStatement(buff, pos + 20)
	};
}

function deserializeOptionalBoxedStatement(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeBoxedStatement(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeContinueStatement(buff, pos) {
	return {
		type: 'ContinueStatement',
		span: deserializeSpan(buff, pos),
		label: deserializeOptionalIdentifier(buff, pos + 12)
	};
}

function deserializeBreakStatement(buff, pos) {
	return {
		type: 'BreakStatement',
		span: deserializeSpan(buff, pos),
		label: deserializeOptionalIdentifier(buff, pos + 12)
	};
}

function deserializeLabeledStatement(buff, pos) {
	return {
		type: 'LabeledStatement',
		span: deserializeSpan(buff, pos),
		label: deserializeIdentifier(buff, pos + 12),
		body: deserializeBoxedStatement(buff, pos + 36)
	};
}

function deserializeReturnStatement(buff, pos) {
	return {
		type: 'ReturnStatement',
		span: deserializeSpan(buff, pos),
		argument: deserializeOptionalBoxedExpression(buff, pos + 12)
	};
}

function deserializeOptionalBoxedExpression(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeBoxedExpression(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeWithStatement(buff, pos) {
	return {
		type: 'WithStatement',
		span: deserializeSpan(buff, pos),
		object: deserializeBoxedExpression(buff, pos + 12),
		body: deserializeBoxedStatement(buff, pos + 16)
	};
}

function deserializeBoxedStatement(buff, pos) {
	const ptr = getPtr(buff, pos);
	return deserializeStatement(buff, ptr);
}

function deserializeBoxedExpression(buff, pos) {
	const ptr = getPtr(buff, pos);
	return deserializeExpression(buff, ptr);
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

function deserializeExpression(buff, pos) {
	const deserialize = enumOptionsExpression[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeOptionalChainingExpression(buff, pos) {
	return {
		type: 'OptionalChainingExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializePrivateName(buff, pos) {
	return {
		type: 'PrivateName',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsInstantiation(buff, pos) {
	return {
		type: 'TsInstantiation',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsAsExpression(buff, pos) {
	return {
		type: 'TsAsExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsNonNullExpression(buff, pos) {
	return {
		type: 'TsNonNullExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsConstAssertion(buff, pos) {
	return {
		type: 'TsConstAssertion',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsTypeAssertion(buff, pos) {
	return {
		type: 'TsTypeAssertion',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeJSXFragment(buff, pos) {
	return {
		type: 'JSXFragment',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeJSXElement(buff, pos) {
	return {
		type: 'JSXElement',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeJSXEmptyExpression(buff, pos) {
	return {
		type: 'JSXEmptyExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeJSXNamespacedName(buff, pos) {
	return {
		type: 'JSXNamespacedName',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeJSXMemberExpression(buff, pos) {
	return {
		type: 'JSXMemberExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeParenthesisExpression(buff, pos) {
	return {
		type: 'ParenthesisExpression',
		span: deserializeSpan(buff, pos),
		expression: deserializeBoxedExpression(buff, pos + 12)
	};
}

function deserializeAwaitExpression(buff, pos) {
	return {
		type: 'AwaitExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeMetaProperty(buff, pos) {
	return {
		type: 'MetaProperty',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeYieldExpression(buff, pos) {
	return {
		type: 'YieldExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeClassExpression(buff, pos) {
	return {
		type: 'ClassExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeArrowFunctionExpression(buff, pos) {
	return {
		type: 'ArrowFunctionExpression',
		span: deserializeSpan(buff, pos),
		params: deserializePatterns(buff, pos + 12),
		body: deserializeBlockStatementOrExpression(buff, pos + 20),
		async: deserializeBooleanBit(buff, pos + 68),
		generator: deserializeBooleanBitAnd2Empty(buff, pos + 69),
		typeParameters: deserializeOptionalTsTypeParameterDeclaration(buff, pos + 44),
		returnType: deserializeOptionalTsTypeAnnotation(buff, pos + 72)
	};
}

const enumOptionsBlockStatementOrExpression = [
	deserializeBlockStatement,
	deserializeBoxedExpression
];

function deserializeBlockStatementOrExpression(buff, pos) {
	const deserialize = enumOptionsBlockStatementOrExpression[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializePatterns(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializePattern(buff, vecPos + i * 52));
	}
	return entries;
}

function deserializeTaggedTemplateExpression(buff, pos) {
	return {
		type: 'TaggedTemplateExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTemplateLiteral(buff, pos) {
	return {
		type: 'TemplateLiteral',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeLiteral(buff, pos) {
	return deserializeLiteralWrapped(buff, pos + 4); // TODO Not sure why +4
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

function deserializeLiteralWrapped(buff, pos) {
	const deserialize = enumOptionsLiteralWrapped[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeJSXText(buff, pos) {
	return {
		type: 'JSXText',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeRegExpLiteral(buff, pos) {
	return {
		type: 'RegExpLiteral',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeBigIntLiteral(buff, pos) {
	return {
		type: 'BigIntLiteral',
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

function deserializeNullLiteral(buff, pos) {
	return {
		type: 'NullLiteral',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeBooleanLiteral(buff, pos) {
	return {
		type: 'BooleanLiteral',
		span: deserializeSpan(buff, pos),
		value: deserializeBoolean(buff, pos + 12)
	};
}

function deserializeStringLiteral(buff, pos) {
	return {
		type: 'StringLiteral',
		span: deserializeSpan(buff, pos),
		value: deserializeJsWord(buff, pos + 12),
		raw: deserializeOptionalJsWord(buff, pos + 20)
	};
}

function deserializeOptionalJsWord(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeJsWord(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeSequenceExpression(buff, pos) {
	return {
		type: 'SequenceExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeNewExpression(buff, pos) {
	return {
		type: 'NewExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeCallExpression(buff, pos) {
	return {
		type: 'CallExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeConditionalExpression(buff, pos) {
	return {
		type: 'ConditionalExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeSuperPropExpression(buff, pos) {
	return {
		type: 'SuperPropExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeMemberExpression(buff, pos) {
	return {
		type: 'MemberExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeAssignmentExpression(buff, pos) {
	return {
		type: 'AssignmentExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeBinaryExpression(buff, pos) {
	return {
		type: 'BinaryExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeUpdateExpression(buff, pos) {
	return {
		type: 'UpdateExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeUnaryExpression(buff, pos) {
	return {
		type: 'UnaryExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeFunctionExpression(buff, pos) {
	return {
		type: 'FunctionExpression',
		identifier: deserializeOptionalIdentifier(buff, pos),
		params: deserializeParameters(buff, pos + 28),
		decorators: deserializeDecorators(buff, pos + 36),
		span: deserializeSpan(buff, pos + 44),
		body: deserializeOptionalBlockStatement(buff, pos + 56),
		generator: deserializeBooleanBit(buff, pos + 104),
		async: deserializeBooleanBitAnd2Empty(buff, pos + 105),
		typeParameters: deserializeOptionalTsTypeParameterDeclaration(buff, pos + 80),
		returnType: deserializeOptionalTsTypeAnnotation(buff, pos + 108)
	};
}

function deserializeBooleanBitAnd2Empty(buff, pos) {
	const value = buff.readUInt8(pos);
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

function deserializeOptionalTsTypeParameterDeclaration(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeTsTypeParameterDeclaration(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeTsTypeParameterDeclaration(buff, pos) {
	return {
		type: 'TsTypeParameterDeclaration',
		span: deserializeSpan(buff, pos),
		parameters: deserializeTsTypeParameters(buff, pos + 12)
	};
}

function deserializeTsTypeParameters(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeTsTypeParameter(buff, vecPos + i * 12));
	}
	return entries;
}

function deserializeTsTypeParameter(buff, pos) {
	return {
		type: 'TsTypeParameter',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeOptionalBlockStatement(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeBlockStatement(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeParameters(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeParameter(buff, vecPos + i * 72));
	}
	return entries;
}

function deserializeParameter(buff, pos) {
	return {
		type: 'Parameter',
		span: deserializeSpan(buff, pos),
		decorators: deserializeDecorators(buff, pos + 12),
		pat: deserializePattern(buff, pos + 20)
	};
}

const enumOptionsPattern = [
	deserializeBindingIdentifier,
	deserializeArrayPattern,
	deserializeRestElement,
	deserializeObjectPattern,
	deserializeAssignmentPattern,
	deserializeInvalid,
	deserializeExpressionPattern
];

function deserializePattern(buff, pos) {
	const deserialize = enumOptionsPattern[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeExpressionPattern(buff, pos) {
	return {
		type: 'ExpressionPattern',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeInvalid(buff, pos) {
	return {
		type: 'Invalid',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeAssignmentPattern(buff, pos) {
	return {
		type: 'AssignmentPattern',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeObjectPattern(buff, pos) {
	return {
		type: 'ObjectPattern',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeRestElement(buff, pos) {
	return {
		type: 'RestElement',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeArrayPattern(buff, pos) {
	return {
		type: 'ArrayPattern',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeBindingIdentifier(buff, pos) {
	return {
		type: 'Identifier',
		span: deserializeSpan(buff, pos),
		value: deserializeJsWord(buff, pos + 12),
		optional: deserializeBoolean(buff, pos + 20),
		typeAnnotation: deserializeOptionalTsTypeAnnotation(buff, pos + 24)
	};
}

function deserializeOptionalTsTypeAnnotation(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeTsTypeAnnotation(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeTsTypeAnnotation(buff, pos) {
	return {
		type: 'TsTypeAnnotation',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeDecorators(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeDecorator(buff, vecPos + i * 16));
	}
	return entries;
}

function deserializeDecorator(buff, pos) {
	return {
		type: 'Decorator',
		span: deserializeSpan(buff, pos),
		expression: deserializeBoxedExpression(buff, pos + 12)
	};
}

function deserializeOptionalIdentifier(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeIdentifier(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeIdentifier(buff, pos) {
	return {
		type: 'Identifier',
		span: deserializeSpan(buff, pos),
		value: deserializeJsWord(buff, pos + 12),
		optional: deserializeBoolean(buff, pos + 20)
	};
}

function deserializeBoolean(buff, pos) {
	const value = buff.readUInt32LE(pos);
	if (value === 0) return false;
	assert(value === 1);
	return true;
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

function deserializeObjectExpression(buff, pos) {
	return {
		type: 'ObjectExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeArrayExpression(buff, pos) {
	return {
		type: 'ArrayExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeThisExpression(buff, pos) {
	return {
		type: 'ThisExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeDebuggerStatement(buff, pos) {
	return {
		type: 'DebuggerStatement',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeEmptyStatement(buff, pos) {
	return {
		type: 'EmptyStatement',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeBlockStatement(buff, pos) {
	return {
		type: 'BlockStatement',
		span: deserializeSpan(buff, pos),
		stmts: deserializeStatements(buff, pos + 12)
	};
}

function deserializeStatements(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeStatement(buff, vecPos + i * 152));
	}
	return entries;
}

function deserializeModuleDecl(buff, pos) {
	return {
		type: 'ModuleDecl',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeSpan(buff, pos) {
	return {
		start: buff.readUInt32LE(pos),
		end: buff.readUInt32LE(pos + 4),
		ctxt: buff.readUInt32LE(pos + 8)
	};
}

function getPtr(buff, pos) {
	return pos + buff.readInt32LE(pos);
}

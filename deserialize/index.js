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
		body: deserializeModuleItems(buff, pos + 12),
		interpreter: deserializeInterpreter(buff, pos + 20)
	};
}

function deserializeInterpreter(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeJsWord(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeModuleItems(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeModuleItem(buff, vecPos + i * 156));
	}
	return entries;
}

const enumOptionsModuleItem = [
	deserializeModuleDeclaration,
	deserializeStatement
];

function deserializeModuleItem(buff, pos) {
	const deserialize = enumOptionsModuleItem[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

const enumOptionsModuleDeclaration = [
	deserializeImportDeclaration,
	deserializeExportDeclaration,
	deserializeExportNamedDeclaration,
	deserializeExportDefaultDeclaration,
	deserializeExportDefaultExpression,
	deserializeExportAllDeclaration,
	deserializeTsImportEqualsDeclaration,
	deserializeTsExportAssignment,
	deserializeTsNamespaceExportDeclaration
];

function deserializeModuleDeclaration(buff, pos) {
	const deserialize = enumOptionsModuleDeclaration[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeTsNamespaceExportDeclaration(buff, pos) {
	return {
		type: 'TsNamespaceExportDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsExportAssignment(buff, pos) {
	return {
		type: 'TsExportAssignment',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeTsImportEqualsDeclaration(buff, pos) {
	return {
		type: 'TsImportEqualsDeclaration',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeExportAllDeclaration(buff, pos) {
	return {
		type: 'ExportAllDeclaration',
		span: deserializeSpan(buff, pos),
		source: deserializeStringLiteral(buff, pos + 12),
		asserts: deserializeOptionalObjectExpression(buff, pos + 44)
	};
}

function deserializeExportDefaultExpression(buff, pos) {
	return {
		type: 'ExportDefaultExpression',
		span: deserializeSpan(buff, pos),
		expression: deserializeBoxedExpression(buff, pos + 12)
	};
}

function deserializeExportDefaultDeclaration(buff, pos) {
	return {
		type: 'ExportDefaultDeclaration',
		span: deserializeSpan(buff, pos),
		decl: deserializeDefaultDeclaration(buff, pos + 12)
	};
}

const enumOptionsDefaultDeclaration = [
	deserializeClassExpression,
	deserializeFunctionExpression,
	deserializeTsInterfaceDeclaration
];

function deserializeDefaultDeclaration(buff, pos) {
	const deserialize = enumOptionsDefaultDeclaration[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeExportNamedDeclaration(buff, pos) {
	return {
		type: 'ExportNamedDeclaration',
		span: deserializeSpan(buff, pos),
		specifiers: deserializeExportSpecifiers(buff, pos + 12),
		source: deserializeOptionalStringLiteral(buff, pos + 20),
		typeOnly: deserializeBoolean(buff, pos + 56),
		asserts: deserializeOptionalObjectExpression(buff, pos + 60)
	};
}

function deserializeOptionalStringLiteral(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeStringLiteral(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeExportSpecifiers(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeExportSpecifier(buff, vecPos + i * 96));
	}
	return entries;
}

const enumOptionsExportSpecifier = [
	deserializeExportNamespaceSpecifier,
	deserializeExportDefaultSpecifier,
	deserializeExportNamedSpecifier
];

function deserializeExportSpecifier(buff, pos) {
	const deserialize = enumOptionsExportSpecifier[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeExportNamedSpecifier(buff, pos) {
	return {
		type: 'ExportSpecifier',
		span: deserializeSpan(buff, pos),
		orig: deserializeModuleExportName(buff, pos + 12),
		exported: deserializeOptionalModuleExportName(buff, pos + 48),
		isTypeOnly: deserializeBoolean(buff, pos + 88)
	};
}

function deserializeExportDefaultSpecifier(buff, pos) {
	return {
		type: 'ExportDefaultSpecifier',
		span: deserializeSpan(buff, pos),
		exported: deserializeIdentifier(buff, pos + 12)
	};
}

function deserializeExportNamespaceSpecifier(buff, pos) {
	return {
		type: 'ExportNamespaceSpecifier',
		span: deserializeSpan(buff, pos),
		name: deserializeModuleExportName(buff, pos + 12)
	};
}

function deserializeExportDeclaration(buff, pos) {
	return {
		type: 'ExportDeclaration',
		span: deserializeSpan(buff, pos),
		declaration: deserializeDeclaration(buff, pos + 12)
	};
}

function deserializeImportDeclaration(buff, pos) {
	return {
		type: 'ImportDeclaration',
		span: deserializeSpan(buff, pos),
		specifiers: deserializeImportSpecifiers(buff, pos + 12),
		source: deserializeStringLiteral(buff, pos + 20),
		typeOnly: deserializeBoolean(buff, pos + 52),
		asserts: deserializeOptionalObjectExpression(buff, pos + 56)
	};
}

function deserializeOptionalObjectExpression(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeObjectExpression(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeObjectExpression(buff, pos) {
	return {
		type: 'ObjectExpression',
		span: deserializeSpan(buff, pos),
		properties: deserializeSpreadElementOrBoxedObjectProperties(buff, pos + 12)
	};
}

function deserializeSpreadElementOrBoxedObjectProperties(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeSpreadElementOrBoxedObjectProperty(buff, vecPos + i * 20));
	}
	return entries;
}

const enumOptionsSpreadElementOrBoxedObjectProperty = [
	deserializeSpreadElement,
	deserializeBoxedObjectProperty
];

function deserializeSpreadElementOrBoxedObjectProperty(buff, pos) {
	const deserialize = enumOptionsSpreadElementOrBoxedObjectProperty[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeBoxedObjectProperty(buff, pos) {
	const ptr = getPtr(buff, pos);
	return deserializeObjectProperty(buff, ptr);
}

const enumOptionsObjectProperty = [
	deserializeIdentifier,
	deserializeKeyValueProperty,
	deserializeAssignmentProperty,
	deserializeGetterProperty,
	deserializeSetterProperty,
	deserializeMethodProperty
];

function deserializeObjectProperty(buff, pos) {
	const deserialize = enumOptionsObjectProperty[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeMethodProperty(buff, pos) {
	return {
		type: 'MethodProperty',
		key: deserializePropertyName(buff, pos),
		params: deserializeParameters(buff, pos + 44),
		decorators: deserializeDecorators(buff, pos + 52),
		span: deserializeSpan(buff, pos + 60),
		body: deserializeOptionalBlockStatement(buff, pos + 72),
		generator: deserializeBooleanBit(buff, pos + 120),
		async: deserializeBooleanBitAnd2Empty(buff, pos + 121),
		typeParameters: deserializeOptionalTsTypeParameterDeclaration(buff, pos + 96),
		returnType: deserializeOptionalTsTypeAnnotation(buff, pos + 124)
	};
}

function deserializeSetterProperty(buff, pos) {
	return {
		type: 'SetterProperty',
		span: deserializeSpan(buff, pos + 44),
		key: deserializePropertyName(buff, pos),
		param: deserializePattern(buff, pos + 56),
		body: deserializeOptionalBlockStatement(buff, pos + 108)
	};
}

function deserializeGetterProperty(buff, pos) {
	return {
		type: 'GetterProperty',
		span: deserializeSpan(buff, pos + 44),
		key: deserializePropertyName(buff, pos),
		typeAnnotation: deserializeOptionalTsTypeAnnotation(buff, pos + 56),
		body: deserializeOptionalBlockStatement(buff, pos + 76)
	};
}

function deserializeAssignmentProperty(buff, pos) {
	return {
		type: 'AssignmentProperty',
		span: deserializeSpan(buff, pos),
		key: deserializeIdentifier(buff, pos + 12),
		value: deserializeBoxedExpression(buff, pos + 36)
	};
}

function deserializeKeyValueProperty(buff, pos) {
	return {
		type: 'KeyValueProperty',
		key: deserializePropertyName(buff, pos),
		value: deserializeBoxedExpression(buff, pos + 44)
	};
}

function deserializeSpreadElement(buff, pos) {
	return {
		type: 'SpreadElement',
		spread: deserializeSpan(buff, pos),
		arguments: deserializeBoxedExpression(buff, pos + 12)
	};
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
		span: deserializeSpan(buff, pos),
		questionDotToken: deserializeSpan(buff, pos + 12),
		base: deserializeOptionalChainingBase(buff, pos + 24)
	};
}

const enumOptionsOptionalChainingBase = [
	deserializeMemberExpression,
	deserializeOptionalChainingCall
];

function deserializeOptionalChainingBase(buff, pos) {
	const deserialize = enumOptionsOptionalChainingBase[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeOptionalChainingCall(buff, pos) {
	return {
		type: 'CallExpression',
		span: deserializeSpan(buff, pos),
		callee: deserializeBoxedExpression(buff, pos + 12),
		arguments: deserializeExpressionOrSpreads(buff, pos + 16),
		typeArguments: deserializeOptionalTsTypeParameterInstantiation(buff, pos + 24)
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
		span: deserializeSpan(buff, pos),
		argument: deserializeBoxedExpression(buff, pos + 12)
	};
}

function deserializeMetaProperty(buff, pos) {
	return {
		type: 'MetaProperty',
		span: deserializeSpan(buff, pos),
		kind: deserializeMetaPropertyKind(buff, pos + 12)
	};
}

const enumOptionsMetaPropertyKind = ['new.target', 'import.meta'];

function deserializeMetaPropertyKind(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	const value = enumOptionsMetaPropertyKind[opt];
	assert(value);
	return value;
}

function deserializeYieldExpression(buff, pos) {
	return {
		type: 'YieldExpression',
		span: deserializeSpan(buff, pos),
		argument: deserializeOptionalBoxedExpression(buff, pos + 12),
		delegate: deserializeBoolean(buff, pos + 20)
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
		body: deserializeBlockStatementOrBoxedExpression(buff, pos + 20),
		async: deserializeBooleanBit(buff, pos + 68),
		generator: deserializeBooleanBitAnd2Empty(buff, pos + 69),
		typeParameters: deserializeOptionalTsTypeParameterDeclaration(buff, pos + 44),
		returnType: deserializeOptionalTsTypeAnnotation(buff, pos + 72)
	};
}

const enumOptionsBlockStatementOrBoxedExpression = [
	deserializeBlockStatement,
	deserializeBoxedExpression
];

function deserializeBlockStatementOrBoxedExpression(buff, pos) {
	const deserialize = enumOptionsBlockStatementOrBoxedExpression[buff.readUInt32LE(pos)];
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
		span: deserializeSpan(buff, pos),
		tag: deserializeBoxedExpression(buff, pos + 12),
		typeParameters: deserializeOptionalTsTypeParameterInstantiation(buff, pos + 16),
		template: deserializeTemplateLiteral(buff, pos + 40)
	};
}

function deserializeTemplateLiteral(buff, pos) {
	return {
		type: 'TemplateLiteral',
		span: deserializeSpan(buff, pos),
		expressions: deserializeBoxedExpressions(buff, pos + 12),
		quasis: deserializeTemplateElements(buff, pos + 20)
	};
}

function deserializeTemplateElements(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeTemplateElement(buff, vecPos + i * 36));
	}
	return entries;
}

function deserializeTemplateElement(buff, pos) {
	return {
		type: 'TemplateElement',
		span: deserializeSpan(buff, pos),
		tail: deserializeBoolean(buff, pos + 24),
		cooked: deserializeOptionalJsWord(buff, pos + 12),
		raw: deserializeJsWord(buff, pos + 28)
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
		span: deserializeSpan(buff, pos),
		pattern: deserializeJsWord(buff, pos + 12),
		flags: deserializeJsWord(buff, pos + 20)
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

function deserializeSequenceExpression(buff, pos) {
	return {
		type: 'SequenceExpression',
		span: deserializeSpan(buff, pos),
		expressions: deserializeBoxedExpressions(buff, pos + 12)
	};
}

function deserializeBoxedExpressions(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeBoxedExpression(buff, vecPos + i * 4));
	}
	return entries;
}

function deserializeNewExpression(buff, pos) {
	return {
		type: 'NewExpression',
		span: deserializeSpan(buff, pos),
		callee: deserializeBoxedExpression(buff, pos + 12),
		arguments: deserializeOptionalExpressionOrSpreadsOptionFirst(buff, pos + 16),
		typeArguments: deserializeOptionalTsTypeParameterInstantiation(buff, pos + 28)
	};
}

function deserializeOptionalExpressionOrSpreadsOptionFirst(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeExpressionOrSpreads(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeCallExpression(buff, pos) {
	return {
		type: 'CallExpression',
		span: deserializeSpan(buff, pos),
		callee: deserializeCallee(buff, pos + 12),
		arguments: deserializeExpressionOrSpreads(buff, pos + 28),
		typeArguments: deserializeOptionalTsTypeParameterInstantiation(buff, pos + 36)
	};
}

function deserializeOptionalTsTypeParameterInstantiation(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeTsTypeParameterInstantiation(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeTsTypeParameterInstantiation(buff, pos) {
	return {
		type: 'TsTypeParameterInstantiation',
		span: deserializeSpan(buff, pos),
		params: deserializeBoxedTsTypes(buff, pos + 12)
	};
}

function deserializeBoxedTsTypes(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeBoxedTsType(buff, vecPos + i * 4));
	}
	return entries;
}

function deserializeExpressionOrSpreads(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeExpressionOrSpread(buff, vecPos + i * 20));
	}
	return entries;
}

const enumOptionsCallee = [
	deserializeSuper,
	deserializeImport,
	deserializeBoxedExpression
];

function deserializeCallee(buff, pos) {
	const deserialize = enumOptionsCallee[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeImport(buff, pos) {
	return {
		type: 'Import',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeConditionalExpression(buff, pos) {
	return {
		type: 'ConditionalExpression',
		span: deserializeSpan(buff, pos),
		test: deserializeBoxedExpression(buff, pos + 12),
		consequent: deserializeBoxedExpression(buff, pos + 16),
		alternate: deserializeBoxedExpression(buff, pos + 20)
	};
}

function deserializeSuperPropExpression(buff, pos) {
	return {
		type: 'SuperPropExpression',
		span: deserializeSpan(buff, pos),
		obj: deserializeSuper(buff, pos + 12),
		property: deserializeSuperProp(buff, pos + 24)
	};
}

const enumOptionsSuperProp = [
	deserializeIdentifier,
	deserializeComputed
];

function deserializeSuperProp(buff, pos) {
	const deserialize = enumOptionsSuperProp[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeSuper(buff, pos) {
	return {
		type: 'Super',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeMemberExpression(buff, pos) {
	return {
		type: 'MemberExpression',
		span: deserializeSpan(buff, pos),
		object: deserializeBoxedExpression(buff, pos + 12),
		property: deserializeMemberExpressionProperty(buff, pos + 16)
	};
}

const enumOptionsMemberExpressionProperty = [
	deserializeIdentifier,
	deserializePrivateName,
	deserializeComputed
];

function deserializeMemberExpressionProperty(buff, pos) {
	const deserialize = enumOptionsMemberExpressionProperty[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializePrivateName(buff, pos) {
	return {
		type: 'PrivateName',
		span: deserializeSpan(buff, pos),
		id: deserializeIdentifier(buff, pos + 12)
	};
}

function deserializeAssignmentExpression(buff, pos) {
	return {
		type: 'AssignmentExpression',
		span: deserializeSpan(buff, pos),
		operator: deserializeAssignmentOperator(buff, pos + 20),
		left: deserializeBoxedExpressionOrBoxedPattern(buff, pos + 12),
		right: deserializeBoxedExpression(buff, pos + 24)
	};
}

const enumOptionsAssignmentOperator = ['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&=', '**=', '&&=', '||=', '??='];

function deserializeAssignmentOperator(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	const value = enumOptionsAssignmentOperator[opt];
	assert(value);
	return value;
}

const enumOptionsBoxedExpressionOrBoxedPattern = [
	deserializeBoxedExpression,
	deserializeBoxedPattern
];

function deserializeBoxedExpressionOrBoxedPattern(buff, pos) {
	const deserialize = enumOptionsBoxedExpressionOrBoxedPattern[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeBinaryExpression(buff, pos) {
	return {
		type: 'BinaryExpression',
		span: deserializeSpan(buff, pos),
		operator: deserializeBinaryOperator(buff, pos + 16),
		left: deserializeBoxedExpression(buff, pos + 12),
		right: deserializeBoxedExpression(buff, pos + 20)
	};
}

const enumOptionsBinaryOperator = ['==', '!=', '===', '!==', '<', '<=', '>', '>=', '<<', '>>', '>>>', '+', '-', '*', '/', '%', '|', '^', '&', '||', '&&', 'in', 'instanceof', '**', '??'];

function deserializeBinaryOperator(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	const value = enumOptionsBinaryOperator[opt];
	assert(value);
	return value;
}

function deserializeUpdateExpression(buff, pos) {
	return {
		type: 'UpdateExpression',
		span: deserializeSpan(buff, pos),
		operator: deserializeUpdateOperator(buff, pos + 12),
		prefix: deserializeBooleanBitAnd2Empty(buff, pos + 13),
		argument: deserializeBoxedExpression(buff, pos + 16)
	};
}

const enumOptionsUpdateOperator = ['++', '--'];

function deserializeUpdateOperator(buff, pos) {
	const opt = buff.readUInt8(pos);
	const value = enumOptionsUpdateOperator[opt];
	assert(value);
	return value;
}

function deserializeUnaryExpression(buff, pos) {
	return {
		type: 'UnaryExpression',
		span: deserializeSpan(buff, pos),
		operator: deserializeUnaryOperator(buff, pos + 12),
		argument: deserializeBoxedExpression(buff, pos + 16)
	};
}

const enumOptionsUnaryOperator = ['-', '+', '!', '~', 'typeof', 'void', 'delete'];

function deserializeUnaryOperator(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	const value = enumOptionsUnaryOperator[opt];
	assert(value);
	return value;
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

function deserializeOptionalBlockStatement(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeBlockStatement(buff, pos + 4);
	assert(opt === 0);
	return null;
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
	if (opt === 1) return deserializeVariableDeclarationOrBoxedExpression(buff, pos + 4);
	assert(opt === 0);
	return null;
}

const enumOptionsVariableDeclarationOrBoxedExpression = [
	deserializeVariableDeclaration,
	deserializeBoxedExpression
];

function deserializeVariableDeclarationOrBoxedExpression(buff, pos) {
	const deserialize = enumOptionsVariableDeclarationOrBoxedExpression[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeVariableDeclaration(buff, pos) {
	return {
		type: 'VariableDeclaration',
		span: deserializeSpan(buff, pos),
		kind: deserializeVariableDeclarationKind(buff, pos + 12),
		declare: deserializeBooleanBitAnd2Empty(buff, pos + 13),
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

function deserializeBooleanBitAnd2Empty(buff, pos) {
	const value = buff.readUInt8(pos);
	if (value === 0) return false;
	assert(value === 1);
	return true;
}

const enumOptionsVariableDeclarationKind = ['var', 'let', 'const'];

function deserializeVariableDeclarationKind(buff, pos) {
	const opt = buff.readUInt8(pos);
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
	deserializeBoxedExpression
];

function deserializePattern(buff, pos) {
	const deserialize = enumOptionsPattern[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
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
		span: deserializeSpan(buff, pos),
		left: deserializeBoxedPattern(buff, pos + 12),
		right: deserializeBoxedExpression(buff, pos + 16),
		typeAnnotation: deserializeOptionalTsTypeAnnotation(buff, pos + 20)
	};
}

function deserializeObjectPattern(buff, pos) {
	return {
		type: 'ObjectPattern',
		span: deserializeSpan(buff, pos),
		properties: deserializeObjectPatternProperties(buff, pos + 12),
		optional: deserializeBoolean(buff, pos + 20),
		typeAnnotation: deserializeOptionalTsTypeAnnotation(buff, pos + 24)
	};
}

function deserializeObjectPatternProperties(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeObjectPatternProperty(buff, vecPos + i * 56));
	}
	return entries;
}

const enumOptionsObjectPatternProperty = [
	deserializeKeyValuePatternProperty,
	deserializeAssignmentPatternProperty,
	deserializeRestElement
];

function deserializeObjectPatternProperty(buff, pos) {
	const deserialize = enumOptionsObjectPatternProperty[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeAssignmentPatternProperty(buff, pos) {
	return {
		type: 'AssignmentPatternProperty',
		span: deserializeSpan(buff, pos),
		key: deserializeIdentifier(buff, pos + 12),
		value: deserializeOptionalBoxedExpression(buff, pos + 36)
	};
}

function deserializeOptionalBoxedExpression(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeBoxedExpression(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeKeyValuePatternProperty(buff, pos) {
	return {
		type: 'KeyValuePatternProperty',
		key: deserializePropertyName(buff, pos),
		value: deserializeBoxedPattern(buff, pos + 44)
	};
}

function deserializePropertyName(buff, pos) {
	return deserializePropertyNameWrapped(buff, pos + 4);
}

const enumOptionsPropertyNameWrapped = [
	deserializeIdentifier,
	deserializeStringLiteral,
	deserializeNumericLiteral,
	deserializeComputed,
	deserializeBigIntLiteral
];

function deserializePropertyNameWrapped(buff, pos) {
	const deserialize = enumOptionsPropertyNameWrapped[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
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

function deserializeComputed(buff, pos) {
	return {
		type: 'Computed',
		span: deserializeSpan(buff, pos),
		expression: deserializeBoxedExpression(buff, pos + 12)
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

function deserializeRestElement(buff, pos) {
	return {
		type: 'RestElement',
		span: deserializeSpan(buff, pos),
		rest: deserializeSpan(buff, pos + 12),
		argument: deserializeBoxedPattern(buff, pos + 24),
		typeAnnotation: deserializeOptionalTsTypeAnnotation(buff, pos + 28)
	};
}

function deserializeBoxedPattern(buff, pos) {
	const ptr = getPtr(buff, pos);
	return deserializePattern(buff, ptr);
}

function deserializeArrayPattern(buff, pos) {
	return {
		type: 'ArrayPattern',
		span: deserializeSpan(buff, pos),
		elements: deserializeOptionalPatterns(buff, pos + 12),
		optional: deserializeBoolean(buff, pos + 20),
		typeAnnotation: deserializeOptionalTsTypeAnnotation(buff, pos + 24)
	};
}

function deserializeOptionalPatterns(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeOptionalPattern(buff, vecPos + i * 56));
	}
	return entries;
}

function deserializeOptionalPattern(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializePattern(buff, pos + 4);
	assert(opt === 0);
	return null;
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
		span: deserializeSpan(buff, pos),
		typeAnnotation: deserializeBoxedTsType(buff, pos + 12)
	};
}

function deserializeBoxedTsType(buff, pos) {
	const ptr = getPtr(buff, pos);
	return deserializeTsType(buff, ptr);
}

function deserializeTsType(buff, pos) {
	return {
		type: 'TsType',
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

function deserializeArrayExpression(buff, pos) {
	return {
		type: 'ArrayExpression',
		span: deserializeSpan(buff, pos),
		elements: deserializeOptionalExpressionOrSpreads(buff, pos + 12)
	};
}

function deserializeOptionalExpressionOrSpreads(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeOptionalExpressionOrSpread(buff, vecPos + i * 24));
	}
	return entries;
}

function deserializeOptionalExpressionOrSpread(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeExpressionOrSpread(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeExpressionOrSpread(buff, pos) {
	return {
		spread: deserializeOptionalSpan(buff, pos),
		expression: deserializeBoxedExpression(buff, pos + 16)
	};
}

function deserializeOptionalSpan(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeSpan(buff, pos + 4);
	assert(opt === 0);
	return null;
}

function deserializeThisExpression(buff, pos) {
	return {
		type: 'ThisExpression',
		span: deserializeSpan(buff, pos)
	};
}

function deserializeImportSpecifiers(buff, pos) {
	const vecPos = getPtr(buff, pos),
		numEntries = buff.readUInt32LE(pos + 4);
	const entries = [];
	for (let i = 0; i < numEntries; i++) {
		entries.push(deserializeImportSpecifier(buff, vecPos + i * 84));
	}
	return entries;
}

const enumOptionsImportSpecifier = [
	deserializeImportNamedSpecifier,
	deserializeImportDefaultSpecifier,
	deserializeImportNamespaceSpecifier
];

function deserializeImportSpecifier(buff, pos) {
	const deserialize = enumOptionsImportSpecifier[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
}

function deserializeImportNamespaceSpecifier(buff, pos) {
	return {
		type: 'ImportNamespaceSpecifier',
		span: deserializeSpan(buff, pos),
		local: deserializeIdentifier(buff, pos + 12)
	};
}

function deserializeImportDefaultSpecifier(buff, pos) {
	return {
		type: 'ImportDefaultSpecifier',
		span: deserializeSpan(buff, pos),
		local: deserializeIdentifier(buff, pos + 12)
	};
}

function deserializeImportNamedSpecifier(buff, pos) {
	return {
		type: 'ImportSpecifier',
		span: deserializeSpan(buff, pos),
		local: deserializeIdentifier(buff, pos + 12),
		imported: deserializeOptionalModuleExportName(buff, pos + 36),
		isTypeOnly: deserializeBoolean(buff, pos + 76)
	};
}

function deserializeOptionalModuleExportName(buff, pos) {
	const opt = buff.readUInt32LE(pos);
	if (opt === 1) return deserializeModuleExportName(buff, pos + 4);
	assert(opt === 0);
	return null;
}

const enumOptionsModuleExportName = [
	deserializeIdentifier,
	deserializeStringLiteral
];

function deserializeModuleExportName(buff, pos) {
	const deserialize = enumOptionsModuleExportName[buff.readUInt32LE(pos)];
	assert(deserialize);
	return deserialize(buff, pos + 4);
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

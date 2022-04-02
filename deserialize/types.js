'use strict';

// Exports

/*
 * Type kinds
 */

const NODE = 1,
	ENUM = 2,
	ENUM_VALUE = 3,
	OPTION = 4,
	VEC = 5,
	CUSTOM = 6;

/*
 * Type definitions
 */

const types = {
	// Program
	Program: [ENUM, ['Module', 'Script']],
	Module: [NODE, { body: 'ModuleBody', interpreter: 'Interpreter' }],
	Script: [NODE, { body: 'ScriptBody', interpreter: 'Interpreter' }],
	ModuleBody: [VEC, 'ModuleItem'],
	ModuleItem: [ENUM, ['ModuleDecl', 'Statement']],
	ModuleDecl: [NODE, {}], // TODO
	ScriptBody: [VEC, 'Statement'],
	Interpreter: [OPTION, 'JsWord'],

	// Statements
	Statement: [
		ENUM,
		[
			'BlockStatement', 'EmptyStatement', 'DebuggerStatement', 'WithStatement',
			'ReturnStatement', 'LabeledStatement', 'BreakStatement', 'ContinueStatement',
			'IfStatement', 'SwitchStatement', 'ThrowStatement', 'TryStatement',
			'WhileStatement', 'DoWhileStatement', 'ForStatement', 'ForInStatement',
			'ForOfStatement', 'Declaration', 'ExpressionStatement'
		],
		{ length: 152 }
	],
	BlockStatement: [NODE, {}], // TODO
	EmptyStatement: [NODE, {}], // TODO
	DebuggerStatement: [NODE, {}], // TODO
	WithStatement: [NODE, {}], // TODO
	ReturnStatement: [NODE, {}], // TODO
	LabeledStatement: [NODE, {}], // TODO
	BreakStatement: [NODE, {}], // TODO
	ContinueStatement: [NODE, {}], // TODO
	IfStatement: [NODE, {}], // TODO
	SwitchStatement: [NODE, {}], // TODO
	ThrowStatement: [NODE, {}], // TODO
	TryStatement: [NODE, {}], // TODO
	WhileStatement: [NODE, {}], // TODO
	DoWhileStatement: [NODE, {}], // TODO
	ForStatement: [NODE, {}], // TODO
	ForInStatement: [NODE, {}], // TODO
	ForOfStatement: [NODE, {}], // TODO
	ExpressionStatement: [NODE, {}], // TODO

	// Declarations
	Declaration: [
		ENUM,
		[
			'ClassDeclaration', 'FunctionDeclaration', 'VariableDeclaration', 'TsInterfaceDeclaration',
			'TsTypeAliasDeclaration', 'TsEnumDeclaration', 'TsModuleDeclaration'
		]
	], // TODO
	ClassDeclaration: [NODE, {}], // TODO
	FunctionDeclaration: [NODE, {}], // TODO
	TsInterfaceDeclaration: [NODE, {}], // TODO
	TsTypeAliasDeclaration: [NODE, {}], // TODO
	TsEnumDeclaration: [NODE, {}], // TODO
	TsModuleDeclaration: [NODE, {}], // TODO

	// Variable declaration
	VariableDeclaration: [NODE, {
		kind: 'VariableDeclarationKind',
		declare: 'VariableDeclarationDeclare',
		declarations: 'VariableDeclarationDeclarators'
	}],
	VariableDeclarationKind: [ENUM_VALUE, ['var', 'let', 'const']],
	VariableDeclarationDeclare: {
		deserialize() { return false; }, // TODO
		length: 0
	},
	VariableDeclarationDeclarators: [VEC, 'VariableDeclarator'],
	VariableDeclarator: [NODE, {
		id: 'Pattern',
		init: 'VariableDeclaratorInit',
		definite: 'VariableDeclaratorDefinite'
	}],
	VariableDeclaratorInit: [OPTION, 'BoxedExpression'],
	VariableDeclaratorDefinite: {
		deserialize() { return false; }, // TODO
		length: 4
	},
	BoxedExpression: {
		deserialize(buff, pos) {
			const ptr = getPtr(buff, pos);
			const deserialize = enumOptionsExpression[buff.readUInt32LE(ptr)];
			assert(deserialize);
			return deserialize(buff, ptr + 8); // TODO Don't know why +8 instead of +4
		},
		dependencies: ['Expression'],
		length: 4
	},

	// Patterns
	Pattern: [
		ENUM,
		[
			'BindingIdentifier', 'ArrayPattern', 'RestElement', 'ObjectPattern',
			'AssignmentPattern', 'Invalid', 'ExpressionPattern'
		],
		{ length: 52 }
	],
	BindingIdentifier: [
		NODE,
		{
			value: 'JsWord',
			optional: 'IdentifierOptional',
			typeAnnotation: 'BindingIdentifierTypeAnnotation'
		},
		{ name: 'Identifier' }
	],
	BindingIdentifierTypeAnnotation: {
		deserialize() { return null; }, // TODO
		length: 0
	},
	ArrayPattern: [NODE, {}], // TODO
	RestElement: [NODE, {}], // TODO
	ObjectPattern: [NODE, {}], // TODO
	AssignmentPattern: [NODE, {}], // TODO
	Invalid: [NODE, {}], // TODO
	ExpressionPattern: [NODE, {}], // TODO

	// Identifier
	Identifier: [NODE, { value: 'JsWord', optional: 'IdentifierOptional' }],
	IdentifierOptional: {
		deserialize() { return false; }, // TODO
		length: 0
	},

	// Expressions
	Expression: [
		ENUM,
		[
			'ThisExpression', 'ArrayExpression', 'ObjectExpression', 'FunctionExpression',
			'UnaryExpression', 'UpdateExpression', 'BinaryExpression', 'AssignmentExpression',
			'MemberExpression', 'SuperPropExpression', 'ConditionalExpression', 'CallExpression',
			'NewExpression', 'SequenceExpression', 'Identifier', 'Literal',
			'TemplateLiteral', 'TaggedTemplateExpression', 'ArrowFunctionExpression', 'ClassExpression',
			'YieldExpression', 'MetaProperty', 'AwaitExpression', 'ParenthesisExpression',
			'JSXMemberExpression', 'JSXNamespacedName', 'JSXEmptyExpression', 'JSXElement',
			'JSXFragment', 'TsTypeAssertion', 'TsConstAssertion', 'TsNonNullExpression',
			'TsAsExpression', 'TsInstantiation', 'PrivateName', 'OptionalChainingExpression',
			'Invalid'
		],
		{ length: 0 } // TODO
	],
	ThisExpression: [NODE, {}], // TODO
	ArrayExpression: [NODE, {}], // TODO
	ObjectExpression: [NODE, {}], // TODO
	FunctionExpression: [NODE, {}], // TODO
	UnaryExpression: [NODE, {}], // TODO
	UpdateExpression: [NODE, {}], // TODO
	BinaryExpression: [NODE, {}], // TODO
	AssignmentExpression: [NODE, {}], // TODO
	MemberExpression: [NODE, {}], // TODO
	SuperPropExpression: [NODE, {}], // TODO
	ConditionalExpression: [NODE, {}], // TODO
	CallExpression: [NODE, {}], // TODO
	NewExpression: [NODE, {}], // TODO
	SequenceExpression: [NODE, {}], // TODO
	TemplateLiteral: [NODE, {}], // TODO
	TaggedTemplateExpression: [NODE, {}], // TODO
	ArrowFunctionExpression: [NODE, {}], // TODO
	ClassExpression: [NODE, {}], // TODO
	YieldExpression: [NODE, {}], // TODO
	MetaProperty: [NODE, {}], // TODO
	AwaitExpression: [NODE, {}], // TODO
	ParenthesisExpression: [NODE, {}], // TODO
	JSXMemberExpression: [NODE, {}], // TODO
	JSXNamespacedName: [NODE, {}], // TODO
	JSXEmptyExpression: [NODE, {}], // TODO
	JSXElement: [NODE, {}], // TODO
	JSXFragment: [NODE, {}], // TODO
	TsTypeAssertion: [NODE, {}], // TODO
	TsConstAssertion: [NODE, {}], // TODO
	TsNonNullExpression: [NODE, {}], // TODO
	TsAsExpression: [NODE, {}], // TODO
	TsInstantiation: [NODE, {}], // TODO
	PrivateName: [NODE, {}], // TODO
	OptionalChainingExpression: [NODE, {}], // TODO

	// Literals
	Literal: [ENUM, [
		'StringLiteral', 'BooleanLiteral', 'NullLiteral', 'NumericLiteral',
		'BigIntLiteral', 'RegExpLiteral', 'JSXText'
	]],
	StringLiteral: [NODE, { value: 'JsWord', raw: 'JsWord' }],
	BooleanLiteral: [NODE, { value: 'BooleanLiteralValue' }],
	BooleanLiteralValue: {
		deserialize(buff, pos) {
			const value = buff.readUInt32LE(pos);
			assert(value === 0 || value === 1);
			return !!value;
		},
		length: 4
	},
	NullLiteral: [NODE, {}],
	NumericLiteral: {
		deserialize(buff, pos) {
			return {
				type: 'NumericLiteral',
				span: deserializeSpan(buff, pos + 4), // TODO Not sure why +4
				// TODO Not sure why +4 after span
				value: new Float64Array(buff.buffer, buff.byteOffset + pos + 20, 1)[0]
			};
		},
		length: 28
	},
	BigIntLiteral: [NODE, {}], // TODO
	RegExpLiteral: [NODE, {}], // TODO
	JSXText: [NODE, {}], // TODO

	// Primitives
	JsWord: {
		deserialize(buff, pos) {
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
		},
		length: 8
	}
};

/*
 * Utility functions
 */

function deserialize(buff) {
	return deserializeProgram(buff, buff.length - 36);
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

/*
 * Exports
 */

module.exports = {
	kinds: { NODE, ENUM, ENUM_VALUE, OPTION, VEC, CUSTOM },
	types,
	utilities: {
		deserialize,
		deserializeSpan,
		getPtr
	}
};

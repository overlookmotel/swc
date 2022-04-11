'use strict';

// Exports

/*
 * Type kinds
 */

const NODE = 1,
	STRUCT = 2,
	ENUM = 3,
	ENUM_VALUE = 4,
	OPTION = 5,
	BOX = 6,
	VEC = 7,
	CUSTOM = 8;

/*
 * Type definitions
 */

const types = {
	// Program
	Program: [ENUM, ['Module', 'Script']],
	Module: [NODE, { body: 'ModuleBody', interpreter: 'Interpreter' }],
	Script: [NODE, { body: 'Statements', interpreter: 'Interpreter' }],
	ModuleBody: [VEC, 'ModuleItem'],
	ModuleItem: [ENUM, ['ModuleDecl', 'Statement']],
	ModuleDecl: [NODE, {}], // TODO
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
	BoxedStatement: [BOX, 'Statement'],
	OptionalBoxedStatement: [OPTION, 'BoxedStatement'],
	Statements: [VEC, 'Statement'],

	BlockStatement: [NODE, { stmts: 'Statements' }],
	OptionalBlockStatement: [OPTION, 'BlockStatement'],
	EmptyStatement: [NODE, {}],
	DebuggerStatement: [NODE, {}],
	WithStatement: [NODE, { object: 'BoxedExpression', body: 'BoxedStatement' }],
	ReturnStatement: [NODE, { argument: 'OptionalBoxedExpression' }],
	LabeledStatement: [NODE, { label: 'Identifier', body: 'BoxedStatement' }],
	BreakStatement: [NODE, { label: 'OptionalIdentifier' }],
	ContinueStatement: [NODE, { label: 'OptionalIdentifier' }],
	IfStatement: [NODE, {
		test: 'BoxedExpression',
		consequent: 'BoxedStatement',
		alternate: 'OptionalBoxedStatement'
	}],
	SwitchStatement: [NODE, {
		discriminant: 'BoxedExpression',
		cases: 'SwitchStatementCases'
	}],
	SwitchStatementCases: [VEC, 'SwitchCase'],
	SwitchCase: [NODE, {
		test: 'OptionalBoxedExpression',
		consequent: 'Statements'
	}],
	ThrowStatement: [NODE, { argument: 'BoxedExpression' }],
	TryStatement: [NODE, {
		block: 'BlockStatement',
		handler: 'OptionalCatchClause',
		finalizer: 'OptionalBlockStatement'
	}],
	CatchClause: [NODE, { param: 'OptionalPattern', body: 'BlockStatement' }],
	OptionalCatchClause: [OPTION, 'CatchClause'],
	WhileStatement: [NODE, { test: 'BoxedExpression', body: 'BoxedStatement' }],
	DoWhileStatement: [NODE, { test: 'BoxedExpression', body: 'BoxedStatement' }],
	ForStatement: [NODE, {
		init: 'ForStatementInit',
		test: 'OptionalBoxedExpression',
		update: 'OptionalBoxedExpression',
		body: 'BoxedStatement'
	}],
	ForStatementInit: [OPTION, 'VariableDeclarationOrBoxedExpression'],
	VariableDeclarationOrBoxedExpression: [ENUM, ['VariableDeclaration', 'BoxedExpression']],
	ForInStatement: [NODE, {
		left: 'VariableDeclarationOrPattern',
		right: 'BoxedExpression',
		body: 'BoxedStatement'
	}],
	ForOfStatement: [NODE, {
		await: 'OptionalSpan',
		left: 'VariableDeclarationOrPattern',
		right: 'BoxedExpression',
		body: 'BoxedStatement'
	}],
	VariableDeclarationOrPattern: [ENUM, ['VariableDeclaration', 'Pattern']],
	ExpressionStatement: [NODE, { expression: 'BoxedExpression' }],

	// Declarations
	Declaration: [
		ENUM,
		[
			'ClassDeclaration', 'FunctionDeclaration', 'VariableDeclaration', 'TsInterfaceDeclaration',
			'TsTypeAliasDeclaration', 'TsEnumDeclaration', 'TsModuleDeclaration'
		]
	],

	// Variable declarations
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
		init: 'OptionalBoxedExpression',
		definite: 'Boolean'
	}],

	// Functions
	FunctionDeclaration: [
		NODE,
		{
			identifier: 'Identifier',
			declare: 'Boolean',
			params: 'Parameters',
			decorators: 'Decorators',
			span: 'Span',
			body: 'OptionalBlockStatement',
			typeParameters: 'OptionalTsTypeParameterDeclaration',
			generator: 'BooleanBit',
			async: 'BooleanBitAnd2Empty',
			returnType: 'OptionalTsTypeAnnotation'
		},
		{
			keys: [
				'identifier', 'declare', 'params', 'decorators',
				'span', 'body', 'generator', 'async',
				'typeParameters', 'returnType'
			]
		}
	],
	FunctionExpression: [
		NODE, {
			// Same as `FunctionDeclaration` except `identifier` is optional and no `declare` property
			identifier: 'OptionalIdentifier',
			params: 'Parameters',
			decorators: 'Decorators',
			span: 'Span',
			body: 'OptionalBlockStatement',
			typeParameters: 'OptionalTsTypeParameterDeclaration',
			generator: 'BooleanBit',
			async: 'BooleanBitAnd2Empty',
			returnType: 'OptionalTsTypeAnnotation'
		},
		{
			keys: [
				'identifier', 'params', 'decorators', 'span',
				'body', 'generator', 'async', 'typeParameters',
				'returnType'
			]
		}
	],
	ArrowFunctionExpression: [
		NODE,
		{
			params: 'Patterns',
			body: 'BlockStatementOrBoxedExpression',
			typeParameters: 'OptionalTsTypeParameterDeclaration',
			async: 'BooleanBit',
			generator: 'BooleanBitAnd2Empty', // TODO Needs test. Do generator arrow functions exist?
			returnType: 'OptionalTsTypeAnnotation'
		},
		{
			keys: [
				'span', 'params', 'body', 'async',
				'generator', 'typeParameters', 'returnType'
			]
		}
	],

	Parameter: [NODE, { decorators: 'Decorators', pat: 'Pattern' }],
	Parameters: [VEC, 'Parameter'],

	Decorator: [NODE, { expression: 'BoxedExpression' }], // TODO Needs tests
	Decorators: [VEC, 'Decorator'],

	BlockStatementOrBoxedExpression: [ENUM, ['BlockStatement', 'BoxedExpression']],

	// Classes
	ClassDeclaration: [NODE, {}], // TODO
	ClassExpression: [NODE, {}], // TODO

	// Patterns
	Pattern: [
		ENUM,
		[
			'BindingIdentifier', 'ArrayPattern', 'RestElement', 'ObjectPattern',
			'AssignmentPattern', 'Invalid', 'BoxedExpression'
		],
		{ length: 52 }
	],
	BoxedPattern: [BOX, 'Pattern'],
	Patterns: [VEC, 'Pattern'],
	OptionalPattern: [OPTION, 'Pattern'],
	OptionalPatterns: [VEC, 'OptionalPattern'],

	BindingIdentifier: [
		NODE,
		{
			value: 'JsWord',
			optional: 'Boolean', // TODO Needs test
			typeAnnotation: 'OptionalTsTypeAnnotation'
		},
		{ name: 'Identifier' }
	],
	ArrayPattern: [NODE, {
		elements: 'OptionalPatterns',
		optional: 'Boolean', // TODO Needs test
		typeAnnotation: 'OptionalTsTypeAnnotation'
	}],
	RestElement: [NODE, {
		rest: 'Span',
		argument: 'BoxedPattern',
		typeAnnotation: 'OptionalTsTypeAnnotation'
	}],
	ObjectPattern: [NODE, {
		properties: 'ObjectPatternProperties',
		optional: 'Boolean', // TODO Needs test
		typeAnnotation: 'OptionalTsTypeAnnotation'
	}],
	ObjectPatternProperty: [
		ENUM,
		['KeyValuePatternProperty', 'AssignmentPatternProperty', 'RestElement'],
		{ length: 56 } // TODO Should be able to deduce this
	],
	ObjectPatternProperties: [VEC, 'ObjectPatternProperty'],
	KeyValuePatternProperty: [
		NODE,
		{ key: 'PropertyName', value: 'BoxedPattern' },
		{ keys: ['key', 'value'] } // No span
	],
	AssignmentPatternProperty: [NODE, { key: 'Identifier', value: 'OptionalBoxedExpression' }],
	AssignmentPattern: [NODE, {
		left: 'BoxedPattern',
		right: 'BoxedExpression',
		typeAnnotation: 'OptionalTsTypeAnnotation'
	}],

	Invalid: [NODE, {}], // TODO Needs tests. Not sure in what circumstances this is used.

	// Identifier
	Identifier: [NODE, { value: 'JsWord', optional: 'Boolean' }], // TODO Needs tests
	OptionalIdentifier: [OPTION, 'Identifier'],

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
	BoxedExpression: [BOX, 'Expression'],
	OptionalBoxedExpression: [OPTION, 'BoxedExpression'],
	BoxedExpressions: [VEC, 'BoxedExpression'],

	ThisExpression: [NODE, {}],
	ArrayExpression: [NODE, { elements: 'OptionalExpressionOrSpreads' }],

	ObjectExpression: [NODE, { properties: 'SpreadElementOrBoxedObjectProperties' }],
	SpreadElementOrBoxedObjectProperty: [ENUM, ['SpreadElement', 'BoxedObjectProperty']],
	SpreadElementOrBoxedObjectProperties: [VEC, 'SpreadElementOrBoxedObjectProperty'],
	SpreadElement: [
		NODE,
		{ spread: 'Span', arguments: 'BoxedExpression' },
		{ keys: ['spread', 'arguments'] } // No span
	],
	ObjectProperty: [ENUM, [
		'Identifier', 'KeyValueProperty', 'AssignmentProperty', 'GetterProperty',
		'SetterProperty', 'MethodProperty'
	]],
	BoxedObjectProperty: [BOX, 'ObjectProperty'],
	KeyValueProperty: [
		NODE,
		{ key: 'PropertyName', value: 'BoxedExpression' },
		{ keys: ['key', 'value'] } // No span
	],
	AssignmentProperty: [NODE, { key: 'Identifier', value: 'BoxedExpression' }],
	GetterProperty: [
		NODE,
		{
			key: 'PropertyName',
			span: 'Span',
			typeAnnotation: 'OptionalTsTypeAnnotation',
			body: 'OptionalBlockStatement'
		},
		{ keys: ['span', 'key', 'typeAnnotation', 'body'] }
	],
	SetterProperty: [
		NODE,
		{
			key: 'PropertyName',
			span: 'Span',
			param: 'Pattern',
			body: 'OptionalBlockStatement'
		},
		{ keys: ['span', 'key', 'param', 'body'] }
	],
	MethodProperty: [
		NODE,
		{
			key: 'PropertyName',
			params: 'Parameters',
			decorators: 'Decorators',
			span: 'Span',
			body: 'OptionalBlockStatement',
			typeParameters: 'OptionalTsTypeParameterDeclaration',
			generator: 'BooleanBit',
			async: 'BooleanBitAnd2Empty',
			returnType: 'OptionalTsTypeAnnotation'
		},
		{
			keys: [
				'key', 'params', 'decorators', 'span',
				'body', 'generator', 'async', 'typeParameters',
				'returnType'
			]
		}
	],
	PropertyName: {
		// `PropertyNameWrapped` is 36 bytes length.
		// 4 empty bytes before and after `PropertyNameWrapped`.
		// TODO Not sure why
		deserialize(buff, pos) {
			return deserializePropertyNameWrapped(buff, pos + 4);
		},
		dependencies: ['PropertyNameWrapped'],
		length: 44
	},
	PropertyNameWrapped: [ENUM, [
		'Identifier', 'StringLiteral', 'NumericLiteral', 'Computed',
		'BigIntLiteral'
	]],

	UnaryExpression: [NODE, { operator: 'UnaryOperator', argument: 'BoxedExpression' }],
	UnaryOperator: [ENUM_VALUE, ['-', '+', '!', '~', 'typeof', 'void', 'delete']],
	UpdateExpression: [NODE, {
		operator: 'UpdateOperator',
		prefix: 'BooleanBitAnd2Empty',
		argument: 'BoxedExpression'
	}],
	UpdateOperator: [ENUM_VALUE, ['++', '--'], { length: 1 }],
	BinaryExpression: [
		NODE,
		{
			left: 'BoxedExpression',
			operator: 'BinaryOperator',
			right: 'BoxedExpression'
		},
		{
			keys: ['span', 'operator', 'left', 'right']
		}
	],
	BinaryOperator: [ENUM_VALUE, [
		'==', '!=', '===', '!==',
		'<', '<=', '>', '>=',
		'<<', '>>', '>>>', '+',
		'-', '*', '/', '%',
		'|', '^', '&', '||',
		'&&', 'in', 'instanceof', '**',
		'??'
	]],
	AssignmentExpression: [
		NODE,
		{
			left: 'BoxedExpressionOrBoxedPattern',
			operator: 'AssignmentOperator',
			right: 'BoxedExpression'
		},
		{
			keys: ['span', 'operator', 'left', 'right']
		}
	],
	AssignmentOperator: [ENUM_VALUE, [
		'=', '+=', '-=', '*=',
		'/=', '%=', '<<=', '>>=',
		'>>>=', '|=', '^=', '&=',
		'**=', '&&=', '||=', '??='
	]],
	BoxedExpressionOrBoxedPattern: [ENUM, ['BoxedExpression', 'BoxedPattern']],
	MemberExpression: [NODE, { object: 'BoxedExpression', property: 'MemberExpressionProperty' }],
	MemberExpressionProperty: [ENUM, ['Identifier', 'PrivateName', 'Computed']],
	SuperPropExpression: [NODE, { obj: 'Super', property: 'SuperProp' }],
	SuperProp: [ENUM, ['Identifier', 'Computed']],
	ConditionalExpression: [NODE, {
		test: 'BoxedExpression',
		consequent: 'BoxedExpression',
		alternate: 'BoxedExpression'
	}],
	CallExpression: [NODE, {
		callee: 'Callee',
		arguments: 'ExpressionOrSpreads',
		typeArguments: 'OptionalTsTypeParameterInstantiation'
	}],
	Callee: [ENUM, ['Super', 'Import', 'BoxedExpression']],
	NewExpression: [NODE, {
		callee: 'BoxedExpression',
		arguments: 'OptionalExpressionOrSpreadsOptionFirst',
		typeArguments: 'OptionalTsTypeParameterInstantiation'
	}],
	SequenceExpression: [NODE, { expressions: 'BoxedExpressions' }],
	TemplateLiteral: [NODE, { expressions: 'BoxedExpressions', quasis: 'TemplateElements' }],
	TemplateElement: [
		NODE,
		{
			cooked: 'OptionalJsWord',
			tail: 'Boolean',
			raw: 'JsWord'
		},
		{
			keys: ['span', 'tail', 'cooked', 'raw']
		}
	],
	TemplateElements: [VEC, 'TemplateElement'],
	TaggedTemplateExpression: [NODE, {
		tag: 'BoxedExpression',
		typeParameters: 'OptionalTsTypeParameterInstantiation',
		template: 'TemplateLiteral'
	}],
	YieldExpression: [NODE, { argument: 'OptionalBoxedExpression', delegate: 'Boolean' }],
	MetaProperty: [NODE, { kind: 'MetaPropertyKind' }],
	MetaPropertyKind: [ENUM_VALUE, ['new.target', 'import.meta']],
	AwaitExpression: [NODE, { argument: 'BoxedExpression' }],
	ParenthesisExpression: [NODE, { expression: 'BoxedExpression' }],
	PrivateName: [NODE, { id: 'Identifier' }],
	OptionalChainingExpression: [NODE, {
		questionDotToken: 'Span',
		base: 'OptionalChainingBase'
	}],
	OptionalChainingBase: [ENUM, ['MemberExpression', 'OptionalChainingCall']],
	OptionalChainingCall: [
		NODE,
		{
			callee: 'BoxedExpression',
			arguments: 'ExpressionOrSpreads',
			typeArguments: 'OptionalTsTypeParameterInstantiation'
		},
		{ name: 'CallExpression' }
	],

	Computed: [NODE, { expression: 'BoxedExpression' }],

	Super: [NODE, {}], // TODO Needs tests for `super()` call
	Import: [NODE, {}],

	ExpressionOrSpread: [STRUCT, {
		spread: 'OptionalSpan',
		expression: 'BoxedExpression'
	}],
	ExpressionOrSpreads: [VEC, 'ExpressionOrSpread'],
	OptionalExpressionOrSpread: [OPTION, 'ExpressionOrSpread'],
	OptionalExpressionOrSpreads: [VEC, 'OptionalExpressionOrSpread'],
	OptionalExpressionOrSpreadsOptionFirst: [OPTION, 'ExpressionOrSpreads'],

	// Literals
	Literal: {
		deserialize(buff, pos) {
			return deserializeLiteralWrapped(buff, pos + 4); // TODO Not sure why +4
		},
		dependencies: ['LiteralWrapped'],
		length: 40 // `LiteralWrapped` length = 36
	},
	LiteralWrapped: [ENUM, [
		'StringLiteral', 'BooleanLiteral', 'NullLiteral', 'NumericLiteral',
		'BigIntLiteral', 'RegExpLiteral', 'JSXText'
	]],
	StringLiteral: [NODE, { value: 'JsWord', raw: 'OptionalJsWord' }],
	BooleanLiteral: [NODE, { value: 'Boolean' }],
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
		dependencies: ['Span'],
		length: 28
	},
	BigIntLiteral: [NODE, { value: 'BigIntValue' }],
	BigIntValue: {
		deserialize(buff, pos) {
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
		},
		dependencies: ['JsWord'],
		length: 8
	},
	RegExpLiteral: [NODE, { pattern: 'JsWord', flags: 'JsWord' }],

	// JSX
	JSXText: [NODE, {}], // TODO
	JSXMemberExpression: [NODE, {}], // TODO
	JSXNamespacedName: [NODE, {}], // TODO
	JSXEmptyExpression: [NODE, {}], // TODO
	JSXElement: [NODE, {}], // TODO
	JSXFragment: [NODE, {}], // TODO

	// TypeScript
	TsTypeAssertion: [NODE, {}], // TODO
	TsConstAssertion: [NODE, {}], // TODO
	TsNonNullExpression: [NODE, {}], // TODO
	TsAsExpression: [NODE, {}], // TODO
	TsInstantiation: [NODE, {}], // TODO

	TsTypeAnnotation: [NODE, { typeAnnotation: 'BoxedTsType' }], // TODO Needs tests
	OptionalTsTypeAnnotation: [OPTION, 'TsTypeAnnotation'],

	TsInterfaceDeclaration: [NODE, {}], // TODO
	TsTypeAliasDeclaration: [NODE, {}], // TODO
	TsEnumDeclaration: [NODE, {}], // TODO
	TsModuleDeclaration: [NODE, {}], // TODO

	TsTypeParamDeclaration: [NODE, { parameters: 'TsTypeParams' }],
	OptionalTsTypeParamDeclaration: [OPTION, 'TsTypeParamDeclaration'],

	TsTypeParameterInstantiation: [NODE, { params: 'BoxedTsTypes' }],
	OptionalTsTypeParameterInstantiation: [OPTION, 'TsTypeParameterInstantiation'],

	TsTypeParam: [NODE, {}], // TODO
	TsTypeParams: [VEC, 'TsTypeParam'],
	TsTypeParameterDeclaration: [NODE, { parameters: 'TsTypeParameters' }],
	OptionalTsTypeParameterDeclaration: [OPTION, 'TsTypeParameterDeclaration'],

	TsTypeParameterInstantiation: [NODE, { params: 'BoxedTsTypes' }],
	OptionalTsTypeParameterInstantiation: [OPTION, 'TsTypeParameterInstantiation'],

	TsTypeParameter: [NODE, {}], // TODO
	TsTypeParameters: [VEC, 'TsTypeParameter'],

	TsType: [NODE, {}], // TODO
	BoxedTsType: [BOX, 'TsType'],
	BoxedTsTypes: [VEC, 'BoxedTsType'],

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
	},
	OptionalJsWord: [OPTION, 'JsWord'],
	Boolean: {
		deserialize(buff, pos) {
			const value = buff.readUInt32LE(pos);
			if (value === 0) return false;
			assert(value === 1);
			return true;
		},
		length: 4
	},
	BooleanBit: {
		deserialize(buff, pos) {
			const value = buff.readUInt8(pos);
			if (value === 0) return false;
			assert(value === 1);
			return true;
		},
		length: 1
	},
	BooleanBitAnd2Empty: {
		deserialize(buff, pos) {
			const value = buff.readUInt8(pos);
			if (value === 0) return false;
			assert(value === 1);
			return true;
		},
		length: 3
	},

	// Span
	Span: {
		deserialize(buff, pos) {
			return {
				start: buff.readUInt32LE(pos),
				end: buff.readUInt32LE(pos + 4),
				ctxt: buff.readUInt32LE(pos + 8)
			};
		},
		length: 12
	},
	OptionalSpan: [OPTION, 'Span']
};

/*
 * Utility functions
 */

function deserialize(buff) {
	return deserializeProgram(buff, buff.length - 36);
}

function getPtr(buff, pos) {
	return pos + buff.readInt32LE(pos);
}

function debugBuff(typeName, buff, pos, length) {
	console.log(`${typeName}:`, pos, pos % 16);

	if (length === undefined) length = 128;
	const str = buff.slice(pos, pos + length).toString('hex');
	const mod = (pos % 16) * 2;
	let out = ' '.repeat(mod + Math.floor(mod / 8));
	for (let offset = 0; offset < str.length; offset += 2) {
		out += str.slice(offset, offset + 2);
		if ((offset + mod) % 32 === 30) {
			out += '\n';
		} else if ((offset + mod) % 8 === 6) {
			out += ' ';
		}
	}
	console.log(out);
}

/*
 * Exports
 */

module.exports = {
	kinds: { NODE, STRUCT, ENUM, ENUM_VALUE, OPTION, BOX, VEC, CUSTOM },
	types,
	utilities: {
		deserialize,
		getPtr,
		debugBuff
	}
};

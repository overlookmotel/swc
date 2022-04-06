'use strict';

// Modules
const { writeFileSync } = require('fs'),
	pathJoin = require('path').join,
	assert = require('assert');

// Imports
const { kinds, types, utilities } = require('./types.js'),
	{ NODE, STRUCT, ENUM, ENUM_VALUE, OPTION, BOX, VEC, CUSTOM } = kinds;

// Generate deserialization code

const DEBUG = !!process.env.DEBUG;

let generatedCode = '';

const generatedTypes = {};
function generateType(typeName) {
	// If already generated, return type definition
	let generatedTypeDef = generatedTypes[typeName];
	if (generatedTypeDef) return generatedTypeDef;

	// Get options
	const deserializerName = `deserialize${typeName}`,
		typeDef = types[typeName];
	let kind, options;
	if (Array.isArray(typeDef)) {
		kind = typeDef[0];
		options = typeDef[2] || {}
	} else {
		kind = CUSTOM;
		options = typeDef;
	}

	// Generate type def.
	// Store in `generatedTypes` before `length` is definitively known to avoid circularity
	// for e.g. `Statement` and `Expression`.
	// `NODE`, `ENUM`, `OPTION` and `CUSTOM` types which are referred to in cycle
	// must define `length` manually.
	let { length } = options;
	if (length === undefined) {
		if (kind === ENUM_VALUE || kind === BOX) {
			length = 4;
		} else if (kind === VEC) {
			length = 8;
		}
	}

	generatedTypeDef = { kind, deserializerName, length };
	generatedTypes[typeName] = generatedTypeDef;

	switch (kind) {
		case NODE:
			length = generateNode(typeName, deserializerName, typeDef[1], options);
			break;
		case STRUCT:
			length = generateStruct(typeName, deserializerName, typeDef[1], options);
			break;
		case ENUM:
			length = generateEnum(typeName, deserializerName, typeDef[1], options);
			break;
		case ENUM_VALUE:
			generateEnumValue(typeName, deserializerName, typeDef[1], options);
			break;
		case OPTION:
			length = generateOption(typeName, deserializerName, typeDef[1]);
			break;
		case BOX:
			generateBox(typeName, deserializerName, typeDef[1]);
			break;
		case VEC:
			generateVec(typeName, deserializerName, typeDef[1]);
			break;
		case CUSTOM:
			length = generateCustom(typeName, deserializerName, typeDef);
			break;
		default:
			throw new Error('Unexpected type kind');
	}

	generatedTypeDef.length = length;

	// Return type def
	return generatedTypeDef;
}

function generateNode(typeName, deserializerName, props, options = {}) {
	// Add `span` as first property if not already included in properties.
	// `FunctionDeclaration`s and a few other nodes don't have `.span` as first property.
	// In those cases a `span` is included explicitly in `props`.
	if (!props.span) props = { span: 'Span', ...props };

	const { length, propsCodes } = getPropsCodes(props, options);

	outputCode(typeName, length, `
		function ${deserializerName}(buff, pos) {
			return {
				type: '${options.name || typeName}',
				${propsCodes.join(',\n\t\t\t\t')}
			};
		}
	`);

	return length;
}

function generateStruct(typeName, deserializerName, props, options) {
	const { length, propsCodes } = getPropsCodes(props, options);

	outputCode(typeName, length, `
		function ${deserializerName}(buff, pos) {
			return {
				${propsCodes.join(',\n\t\t\t\t')}
			};
		}
	`);

	return length;
}

function getPropsCodes(props, options) {
	let length = 0;
	const propsCodesMap = {};
	for (const [key, propTypeName] of Object.entries(props)) {
		const propTypeDef = generateType(propTypeName);
		const posStr = 'pos' + (length ? ` + ${length}` : '');
		length += propTypeDef.length;
		propsCodesMap[key] = `${key}: ${propTypeDef.deserializerName}(buff, ${posStr})`;
	}

	if (options.length != null) length = options.length;

	const keys = options.keys || Object.keys(propsCodesMap),
		propsCodes = keys.map(key => propsCodesMap[key]);
	return { length, propsCodes };
}

function generateEnum(typeName, deserializerName, enumOptions, options = {}) {
	let length = 0;
	const enumDeserializerNames = enumOptions.map(typeName => {
		const typeDef = generateType(typeName);
		if (typeDef.length > length) length = typeDef.length;
		return typeDef.deserializerName;
	});

	length = options.length ?? length + 4;

	outputCode(typeName, length, `
		const enumOptions${typeName} = [
			${enumDeserializerNames.join(',\n\t\t\t')}
		];

		function ${deserializerName}(buff, pos) {
			const deserialize = enumOptions${typeName}[buff.readUInt32LE(pos)];
			assert(deserialize);
			return deserialize(buff, pos + 4);
		}
	`);

	return length;
}

function generateEnumValue(typeName, deserializerName, enumOptions, options) {
	const enumOptionCodes = enumOptions.map(opt => typeof opt === 'string' ? `'${opt}'` : opt + '');

	let length = options.length ?? 4;
	assert(length === 1 || length === 4);

	outputCode(typeName, length, `
		const enumOptions${typeName} = [${enumOptionCodes.join(', ')}];

		function ${deserializerName}(buff, pos) {
			const opt = buff.${length === 1 ? 'readUInt8' : 'readUInt32LE'}(pos);
			const value = enumOptions${typeName}[opt];
			assert(value);
			return value;
		}
	`);
}

function generateOption(typeName, deserializerName, optionalTypeName) {
	const optionalTypeDef = generateType(optionalTypeName);

	const length = optionalTypeDef.length + 4;

	outputCode(typeName, length, `
		function ${deserializerName}(buff, pos) {
			const opt = buff.readUInt32LE(pos);
			if (opt === 1) return ${optionalTypeDef.deserializerName}(buff, pos + 4);
			assert(opt === 0);
			return null;
		}
	`);

	return length;
}

function generateBox(typeName, deserializerName, boxedTypeName) {
	const boxedTypeDef = generateType(boxedTypeName);

	outputCode(typeName, 4, `
		function ${deserializerName}(buff, pos) {
			const ptr = getPtr(buff, pos);
			return ${boxedTypeDef.deserializerName}(buff, ptr);
		}
	`);
}

function generateVec(typeName, deserializerName, childTypeName) {
	const childTypeDef = generateType(childTypeName);

	// TODO Initialize `entries` with size `const entries = Array(numEntries);`
	// TODO Optimize for empty vector - common with e.g. decorators.
	// Determine `numEntries` first and return `[]` immediately if zero.

	outputCode(typeName, 8, `
		function ${deserializerName}(buff, pos) {
			const vecPos = getPtr(buff, pos),
				numEntries = buff.readUInt32LE(pos + 4);
			const entries = [];
			for (let i = 0; i < numEntries; i++) {
				entries.push(${childTypeDef.deserializerName}(buff, vecPos + i * ${childTypeDef.length}));
			}
			return entries;
		}
	`);
}

function generateCustom(typeName, deserializerName, typeDef) {
	assert(typeDef.length != null);

	if (typeDef.dependencies) typeDef.dependencies.forEach(depTypeName => generateType(depTypeName));

	assert(typeof typeDef.deserialize === 'function');
	let deserializerCode = typeDef.deserialize.toString();
	assert(deserializerCode.startsWith('deserialize('));
	deserializerCode = removeFunctionIndent(
		`function ${deserializerName}${deserializerCode.slice('deserialize'.length)}`
	);

	deserializerCode = insertDebugger(deserializerCode, typeName, typeDef.length);

	generatedCode = deserializerCode + '\n\n' + generatedCode;

	return typeDef.length;
}

function removeFunctionIndent(code) {
	const lines = code.toString().split('\n');
	if (lines.length === 1) return code;

	const indent = (lines[1].match(/^\t+/) || [' '])[0].length - 1;
	if (indent === 0) return code;

	return [lines[0], ...lines.slice(1).map(line => line.slice(indent))].join('\n');
}

function outputCode(typeName, length, code) {
	const lines = code.split('\n').slice(1, -1);
	const indent = lines[0].match(/^\t*/)[0].length;
	code = lines.map(line => line.slice(indent)).join('\n');
	code = insertDebugger(code, typeName, length);
	generatedCode = code + '\n\n' + generatedCode;
}

function insertDebugger(code, typeName, length) {
	if (!DEBUG || !typeName) return code;

	return code.replace(
		/function deserialize.+\n/,
		line => line + `\tdebugBuff('${typeName}', buff, pos, ${length});\n`
	);
}

const programTypeDef = generateType('Program');
assert(programTypeDef.length === 36);

outputCode(null, 0, `
// Generated code. Do not edit.

'use strict';

const assert = require('assert');

module.exports = ${utilities.deserialize.toString()};
`);

for (const [name, fn] of Object.entries(utilities)) {
	if (name === 'deserialize') continue;
	if (name === 'debugBuff' && !DEBUG) continue;
	generatedCode += fn.toString() + '\n\n';
}

generatedCode = generatedCode.slice(0, -1);

writeFileSync(pathJoin(__dirname, 'index.js'), generatedCode);

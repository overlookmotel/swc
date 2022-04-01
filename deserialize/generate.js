'use strict';

// Modules
const { writeFileSync } = require('fs'),
	pathJoin = require('path').join,
	assert = require('assert');

// Imports
const { kinds, types, utilities } = require('./types.js'),
	{ NODE, ENUM, ENUM_VALUE, OPTION, CUSTOM } = kinds;

// Generate deserialization code

let generatedCode = '';

const generatedTypes = {};
function generateType(typeName) {
	const generatedTypeDef = generatedTypes[typeName];
	if (generatedTypeDef) return generatedTypeDef;

	let typeDef = types[typeName],
		kind,
		length;
	const deserializerName = `deserialize${typeName}`;
	if (Array.isArray(typeDef)) {
		kind = typeDef[0];
		if (kind === NODE) {
			length = generateNode(typeName, deserializerName, typeDef[1], typeDef[2]);
		} else if (kind === ENUM) {
			length = generateEnum(typeName, deserializerName, typeDef[1], typeDef[2]);
		} else if (kind === ENUM_VALUE) {
			length = generateEnumValue(typeName, deserializerName, typeDef[1]);
		} else if (kind === OPTION) {
			length = generateOption(deserializerName, typeDef[1]);
		} else { // VEC
			length = generateVec(deserializerName, typeDef[1]);
		}
	} else {
		length = generateCustom(deserializerName, typeDef);
		kind = CUSTOM;
	}

	return generatedTypes[typeName] = { kind, deserializerName, length };
}

function generateNode(typeName, deserializerName, props, options = {}) {
	let length = 12; // Span length
	const propsCode = [
		`type: '${options.name || typeName}'`,
		`span: deserializeSpan(buff, pos)`,
		...Object.entries(props).map(([key, propTypeName]) => {
			const propTypeDef = generateType(propTypeName);
			const relPos = length;
			length += propTypeDef.length;
			return `${key}: ${propTypeDef.deserializerName}(buff, pos + ${relPos})`;
		})
	].join(',\n\t\t\t\t');

	outputCode(`
		function ${deserializerName}(buff, pos) {
			return {
				${propsCode}
			};
		}
	`);

	return options.length ?? length;
}

function generateEnum(typeName, deserializerName, enumOptions, options = {}) {
	let length = 0;
	const enumDeserializerNames = enumOptions.map(typeName => {
		const typeDef = generateType(typeName);
		if (typeDef.length > length) length = typeDef.length;
		return typeDef.deserializerName;
	});

	outputCode(`
		const enumOptions${typeName} = [
			${enumDeserializerNames.join(',\n\t\t\t')}
		];

		function ${deserializerName}(buff, pos) {
			const deserialize = enumOptions${typeName}[buff.readUInt32LE(pos)];
			assert(deserialize);
			return deserialize(buff, pos + 4);
		}
	`);

	return options.length ?? length + 4;
}

function generateEnumValue(typeName, deserializerName, enumOptions) {
	const enumOptionCodes = enumOptions.map(opt => typeof opt === 'string' ? `'${opt}'` : opt + '');

	outputCode(`
		const enumOptions${typeName} = [${enumOptionCodes.join(', ')}];

		function ${deserializerName}(buff, pos) {
			const opt = buff.readUInt32LE(pos);
			const value = enumOptions${typeName}[opt];
			assert(value);
			return value;
		}
	`);
	return 4;
}

function generateOption(deserializerName, optionalTypeName) {
	const optionalTypeDef = generateType(optionalTypeName);
	outputCode(`
		function ${deserializerName}(buff, pos) {
			const opt = buff.readUInt32LE(pos);
			if (opt === 1) return ${optionalTypeDef.deserializerName}(buff, pos + 4);
			assert(opt === 0);
			return null;
		}
	`);
	return optionalTypeDef.length + 4;
}

function generateVec(deserializerName, childTypeName) {
	const childTypeDef = generateType(childTypeName);
	outputCode(`
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
	return 8;
}

function generateCustom(deserializerName, typeDef) {
	assert(typeof typeDef.deserialize === 'function');
	assert(typeDef.deserialize.name === deserializerName);
	assert(typeDef.length != null);

	if (typeDef.dependencies) typeDef.dependencies.forEach(depTypeName => generateType(depTypeName));

	outputFunction(typeDef.deserialize);

	return typeDef.length;
}

function outputFunction(fn) {
	let code = fn.toString();
	const lines = code.toString().split('\n');
	if (lines.length > 1) {
		const indent = (lines[1].match(/^\t+/) || [' '])[0].length - 1;
		if (indent > 0) code = [lines[0], ...lines.slice(1).map(line => line.slice(indent))].join('\n');
	}
	generatedCode += code + '\n\n';
}

function outputCode(code) {
	const lines = code.split('\n').slice(1, -1);
	const indent = lines[0].match(/^\t*/)[0].length;
	code = lines.map(line => line.slice(indent)).join('\n');
	generatedCode = code + '\n\n' + generatedCode;
}

generateType('Program');
for (const fn of [utilities.deserializeSpan, utilities.getPtr]) {
	generatedCode += fn.toString() + '\n\n';
}

outputCode(`
// Generated code. Do not edit.

'use strict';

const assert = require('assert');

module.exports = ${utilities.deserialize.toString()};
`);

generatedCode = generatedCode.slice(0, -1);

writeFileSync(pathJoin(__dirname, 'index.js'), generatedCode);

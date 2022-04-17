'use strict';

// Modules
const assert = require("assert");

// Exports

const DEBUG = !!process.env.DEBUG;

let types; // Will be injected later by `init()`

/**
 * Base class
 */
class Kind {
    name = null;
    length = null;
    isInitialized = false;

    getName() {
        return this.name;
    }

    init() { }
}

/**
 * AST node class
 */
class Node extends Kind {
    props = null;
    nodeName = null;
    keys = null;
    noSpan = false;
    noType = false;

    constructor(props, options = {}) {
        super();
        Object.assign(this, options);

        // Add `span` as first property if not already included in properties.
        // `FunctionDeclaration`s and a few other nodes don't have `.span` as first property.
        // In those cases a `span` is included explicitly in `props`.
        if (!props.span && !options.noSpan) props = { span: 'Span', ...props };
        this.props = props;

        if (!this.keys) this.keys = Object.keys(props);
    }

    init() {
        const { props } = this;
        let length = 0;
        for (let [key, prop] of Object.entries(props)) {
            prop = initType(prop);
            props[key] = prop;
            length += prop.length;
        }
        if (!this.length) this.length = length;
        if (!this.nodeName) this.nodeName = this.name;
    }

    generateDeserializer() {
        let pos = 0;
        const propsCodesMap = Object.create(null);
        for (const [key, prop] of Object.entries(this.props)) {
            const posStr = 'pos' + (pos ? ` + ${pos}` : '');
            pos += prop.length;
            propsCodesMap[key] = `${key}: deserialize${prop.name}(buff, ${posStr})`;
        }

        const propsCodes = this.keys.map(key => propsCodesMap[key]);
        if (!this.noType) propsCodes.unshift(`type: '${this.nodeName}'`);

        return `function deserialize${this.name}(buff, pos) {
            return {
                ${propsCodes.join(`,\n${' '.repeat(16)}`)}
            };
        }`;
    }
}

/**
 * Enum class
 */
class Enum extends Kind {
    enumOptions = null;

    constructor(enumOptions, options) {
        const enumObj = enums.get(JSON.stringify(enumOptions));
        if (enumObj) return enumObj;

        super();
        Object.assign(this, options);

        enums.set(JSON.stringify(enumOptions), this);

        this.enumOptions = enumOptions;
    }

    getName() {
        return this.enumOptions.map(getTypeName).join('Or');
    }

    init() {
        let length = 0;
        this.enumOptions = this.enumOptions.map((enumOption) => {
            enumOption = initType(enumOption);
            if (enumOption.length > length) length = enumOption.length;
            return enumOption;
        });
        if (!this.length) this.length = length + 4;
    }

    generateDeserializer() {
        return `function deserialize${this.name}(buff, pos) {
            const deserialize = enumOptions${this.name}[buff.readUInt32LE(pos)];
            assert(deserialize);
            return deserialize(buff, pos + 4);
        }

        const enumOptions${this.name} = [
            ${this.enumOptions.map(({ name }) => `deserialize${name}`).join(`,\n${' '.repeat(12)}`)}
        ];`;
    }
}

const enums = new Map();

/**
 * Enum value class
 */
class EnumValue extends Kind {
    length = 4;
    enumOptions = null;

    constructor(enumOptions, options) {
        const enumValue = enumValues.get(JSON.stringify(enumOptions));
        if (enumValue) return enumValue;

        super();
        Object.assign(this, options);
        assert(this.length === 1 || this.length === 4);

        enumValues.set(JSON.stringify(enumOptions), this);

        this.enumOptions = enumOptions;
    }

    getName() {
        return this.enumOptions.join('Or');
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map(
            value => typeof value === 'string' ? `'${value}'` : value + ''
        );

        return `function deserialize${this.name}(buff, pos) {
            const opt = buff.${this.length === 1 ? 'readUInt8' : 'readUInt32LE'}(pos);
            const value = enumOptions${this.name}[opt];
            assert(value);
            return value;
        }
        
        const enumOptions${this.name} = [${enumOptionCodes.join(', ')}];`;
    }
}

const enumValues = new Map();

/**
 * Option class
 */
class Option extends Kind {
    childType = null;

    constructor(childType, options) {
        const optional = optionals.get(childType);
        if (optional) return optional;

        super();
        Object.assign(this, options);

        this.childType = childType;

        optionals.set(childType, this);
    }

    getName() {
        return `Option${getTypeName(this.childType)}`;
    }

    init() {
        this.childType = initType(this.childType);
        this.length = this.childType.length + 4;
    }

    generateDeserializer() {
        return `function deserialize${this.name}(buff, pos) {
            const opt = buff.readUInt32LE(pos);
            if (opt === 1) return deserialize${this.childType.name}(buff, pos + 4);
            assert(opt === 0);
            return null;
        }`;
    }
}

const optionals = new Map();

/**
 * Box class
 */
class Box extends Kind {
    length = 4;
    childType = null;

    constructor(childType, options) {
        const box = boxes.get(childType);
        if (box) return box;

        super();
        Object.assign(this, options);

        this.childType = childType;

        boxes.set(childType, this);
    }

    getName() {
        return `Box${getTypeName(this.childType)}`;
    }

    init() {
        this.childType = initType(this.childType);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(buff, pos) {
            const ptr = getPtr(buff, pos);
            return deserialize${this.childType.name}(buff, ptr);
        }`;
    }
}

const boxes = new Map();

/**
 * Vec class
 */
class Vec extends Kind {
    length = 8;
    childType = null;

    constructor(childType, options) {
        const vec = vecs.get(childType);
        if (vec) return vec;

        super();
        Object.assign(this, options);

        this.childType = childType;

        vecs.set(childType, this);
    }

    getName() {
        return `Vec${getTypeName(this.childType)}`;
    }

    init() {
        this.childType = initType(this.childType);
    }

    generateDeserializer() {
        const { childType } = this;
        return `function deserialize${this.name}(buff, pos) {
            const numEntries = buff.readUInt32LE(pos + 4);
            if (numEntries === 0) return [];
            const vecPos = getPtr(buff, pos),
                entries = new Array(numEntries);
            for (let i = 0; i < numEntries; i++) {
                entries[i] = deserialize${childType.name}(buff, vecPos + i * ${childType.length});
            }
            return entries;
        }`;
    }
}

const vecs = new Map();

/**
 * Custom type class
 */
class Custom extends Kind {
    deserialize = null;
    dependencies = [];

    constructor(options) {
        super();
        Object.assign(this, options);
    }

    init() {
        this.dependencies = this.dependencies.map(name => initType(name));

        assert(typeof this.deserialize === 'function', `Custom type ${this.name} has no deserializer`);
    }

    generateDeserializer() {
        let code = this.deserialize.toString();
        assert(
            code.startsWith('deserialize('),
            `Custom type ${this.name} malformed deserializer function`
        );
        return `function deserialize${this.name}${code.slice('deserialize'.length)}`;
    }
}

/**
 * Initialize types.
 * @param {Object} allTypes - Map of types, keys by type name
 * @returns {undefined}
 */
function init(allTypes) {
    types = allTypes;

    for (const [name, type] of Object.entries(types)) {
        type.name = name;
    }

    types.Program.init();
}

/**
 * Get name of type. Calls `type.getName()` to get name.
 * @param {string|Object} type - Type name or type object
 * @returns {string} - Type name
 */
function getTypeName(type) {
    if (typeof type === 'string') return type;
    if (!type.name) type.name = type.getName();
    return type.name;
}

/**
 * Initialize type.
 * If string provided, looks up type object by name in `types`.
 * @param {string|Object} type - Type name or type object
 * @returns {Object} - Type object
 */
function initType(type) {
    if (typeof type === 'string') {
        assert(types[type], `Type not found: ${type}`);
        type = types[type];
    }

    if (!type.isInitialized) {
        type.isInitialized = true;
        getTypeName(type);
        type.init();
        assert(typeof type.name === 'string', 'No type name');
        assert(typeof type.length === 'number', `${type.name} type has no length`);
        types[type.name] = type;
    }

    return type;
}

/**
 * Generate code for deserializer.
 * @param {Object} utils - Utility functions
 * @returns {string} - Code for deserializer
 */
function generateDeserializer(utils) {
    let code = [
        '// Generated code. Do not edit.',
        "'use strict';",
        "const assert = require('assert');",
        "module.exports = deserialialize;",
        removeIndent(`function deserialialize(buff) {
            return deserializeProgram(buff, buff.length - ${types.Program.length});
        }`),
        ''
    ].join('\n\n');

    for (const type of Object.values(types)) {
        let deserializerCode = removeIndent(type.generateDeserializer());
        if (DEBUG) {
            deserializerCode = deserializerCode.replace(
                /function deserialize.+\n/,
                line => line + `\tdebugBuff('${type.name}', buff, pos, ${type.length});\n`
            );
        }
        code += deserializerCode + '\n\n';
    }

    code += utils.getPtr.toString() + '\n\n';
    if (DEBUG) code += utils.debugBuff.toString() + '\n\n';

    return code.slice(0, -1);
}

/**
 * Remove indentation from function code.
 * Expects to receive a code for a function with opening on first line.
 * @param {string} code 
 * @returns {string} - Code with indentation removed
 */
function removeIndent(code) {
    const lines = code.split('\n');
    if (lines.length === 1) return code;

    const indentDepth = lines[1].match(/^\s+/)[0].length - 4;
    return [lines[0], ...lines.slice(1).map(line => line.slice(indentDepth))].join('\n');
}

/**
 * Wrap class in Proxy to make it callable to instantiate.
 * i.e. can call `Klass()` in place of `new Klass()`.
 * @param {Function} Class - Class
 * @returns {Proxy<Function>} - Class wrapped in proxy
 */
function callableClass(Class) {
    return new Proxy(Class, {
        apply(Class, _thisArg, args) {
            return new Class(...args);
        }
    });
}

// Export classes, `init()` and `generateDeserializer()`
module.exports = {
    Node: callableClass(Node),
    Enum: callableClass(Enum),
    EnumValue: callableClass(EnumValue),
    Option: callableClass(Option),
    Box: callableClass(Box),
    Vec: callableClass(Vec),
    Custom: callableClass(Custom),
    init,
    generateDeserializer
};

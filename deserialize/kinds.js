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
    align = null;
    emptyBefore = 0;
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
    align = 4;
    props = null;
    nodeName = null;
    keys = null;
    noSpan = false;
    noType = false;
    propsWithPos = null;

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
        const propsWithPosMap = {};
        let pos = this.emptyBefore;
        for (let [key, prop] of Object.entries(this.props)) {
            prop = initType(prop);
            pos = getAligned(pos, prop.align);
            propsWithPosMap[key] = { key, prop, pos };
            pos += prop.length;
        }

        this.propsWithPos = this.keys.map(key => propsWithPosMap[key]);

        if (!this.length) this.length = getAligned(pos, this.align);
        if (!this.nodeName) this.nodeName = this.name;
    }

    generateDeserializer() {
        const propsCodes = this.propsWithPos.map(({ key, prop, pos }) => {
            return `${key}: deserialize${prop.name}(buff, int32, uint32, ${posStr(pos)})`;
        });

        if (!this.noType) propsCodes.unshift(`type: '${this.nodeName}'`);

        return `function deserialize${this.name}(buff, int32, uint32, pos) {
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
    align = 4;
    enumOptions = null;
    childOffset = null;

    constructor(enumOptions, options) {
        const enumObj = enums.get(JSON.stringify(enumOptions));
        if (enumObj) return enumObj;

        assert(enumOptions.length < 256);

        super();
        Object.assign(this, options);

        this.enumOptions = enumOptions;

        enums.set(JSON.stringify(enumOptions), this);
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
        if (!this.childOffset) this.childOffset = this.emptyBefore + 4;
        if (!this.length) this.length = length + this.childOffset;
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map(({ name }, index) => (
            `case ${index}: return deserialize${name}(buff, int32, uint32, pos + ${this.childOffset});`
        ));

        return `function deserialize${this.name}(buff, int32, uint32, pos) {
            switch (buff[${posStr(this.emptyBefore)}]) {
                ${enumOptionCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
        }`;
    }
}

const enums = new Map();

/**
 * Enum value class
 */
class EnumValue extends Kind {
    align = 1;
    enumOptions = null;

    constructor(enumOptions, options) {
        const cacheKey = JSON.stringify([enumOptions, options?.length ?? 4]);
        const enumValue = enumValues.get(cacheKey);
        if (enumValue) return enumValue;

        assert(enumOptions.length < 256);

        super();
        Object.assign(this, options);

        this.enumOptions = enumOptions;
        if (!this.length) this.length = 1 + this.emptyBefore;

        enumValues.set(cacheKey, this);
    }

    getName() {
        return this.enumOptions.join('Or');
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map((value, index) => (
            `case ${index}: return ${typeof value === 'string' ? `'${value}'` : value};`
        ));

        return `function deserialize${this.name}(buff, int32, uint32, pos) {
            switch (buff[${posStr(this.emptyBefore)}]) {
                ${enumOptionCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
        }`;
    }
}

const enumValues = new Map();

/**
 * Option class
 */
class Option extends Kind {
    childType = null;
    childOffset = null;

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
        if (!this.childOffset) this.childOffset = this.emptyBefore + this.childType.align;
        if (!this.length) this.length = this.childOffset + this.childType.length;
        if (!this.align) this.align = this.childType.align;
    }

    generateDeserializer() {
        const pos = posStr(this.emptyBefore),
            childName = this.childType.name;
        return `function deserialize${this.name}(buff, int32, uint32, pos) {
            return deserializeOption(buff, int32, uint32, ${pos}, deserialize${childName}, ${this.childOffset});
        }`;
    }
}

const optionals = new Map();

/**
 * Box class
 */
class Box extends Kind {
    align = 4;
    childType = null;

    constructor(childType, options) {
        const box = boxes.get(childType);
        if (box) return box;

        super();
        Object.assign(this, options);

        this.childType = childType;
        if (!this.length) this.length = 4 + this.emptyBefore;

        boxes.set(childType, this);
    }

    getName() {
        return `Box${getTypeName(this.childType)}`;
    }

    init() {
        this.childType = initType(this.childType);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(buff, int32, uint32, pos) {
            return deserializeBox(buff, int32, uint32, ${posStr(this.emptyBefore)}, deserialize${this.childType.name});
        }`;
    }
}

const boxes = new Map();

/**
 * Vec class
 */
class Vec extends Kind {
    align = 4;
    childType = null;
    childLength = null;

    constructor(childType, options) {
        const vec = vecs.get(childType);
        if (vec) return vec;

        super();
        Object.assign(this, options);

        this.childType = childType;
        if (!this.length) this.length = 8 + this.emptyBefore;

        vecs.set(childType, this);
    }

    getName() {
        return `Vec${getTypeName(this.childType)}`;
    }

    init() {
        this.childType = initType(this.childType);
        this.childLength = getAligned(this.childType.length, this.childType.align);
    }

    generateDeserializer() {
        const pos = posStr(this.emptyBefore);
        return `function deserialize${this.name}(buff, int32, uint32, pos) {
            return deserializeVec(buff, int32, uint32, ${pos}, deserialize${this.childType.name}, ${this.childLength});
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
        assert(isPositiveInteger(type.length), `${type.name} type has no length`);
        assert(isPositiveInteger(type.align), `${type.name} type has no align`);
        types[type.name] = type;
    }

    return type;
}

/**
 * Check if input is a positive integer.
 * @param {*} num - Input
 * @returns {boolean} - `true` if input is a positive integer
 */
function isPositiveInteger(num) {
    return typeof num === 'number' && num !== 0 && !isNaN(num) && num % 1 === 0;
}

/**
 * Round up position to specified alignment.
 * e.g. `getAligned(12, 4) === 12`, `getAligned(10, 4) === 12`, `getAligned(11, 2) === 12`
 * @param {number} pos - Position
 * @param {number} align - Alignment
 * @returns {number} - Aligned position
 */
function getAligned(pos, align) {
    const modulus = pos % align;
    if (modulus === 0) return pos;
    return pos + align - modulus;
}

/**
 * Create position string with offset.
 * @param {number} offset - Offset
 * @returns {number} - Position string
 */
function posStr(offset) {
    return offset === 0 ? 'pos' : `pos + ${offset}`;
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
        "module.exports = deserialize;",
        removeIndent(`function deserialize(buff) {
            const { buffer } = buff;
            return deserializeProgram(
                Buffer.from(buffer),
                new Int32Array(buffer),
                new Uint32Array(buffer),
                buff.byteOffset + buff.length - ${types.Program.length}
            );
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

    for (const utilName of ['deserializeOption', 'deserializeBox', 'deserializeVec', 'getPtr']) {
        code += utils[utilName].toString() + '\n\n';
    }

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

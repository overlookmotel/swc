'use strict';

// Modules
const assert = require("assert");

// Imports
const { initType, getTypeName } = require('./types/index.js');

// Exports

/**
 * Base class
 */
class Kind {
    name = null;
    length = null;
    align = null;
    isInitialized = false;

    getName() {
        return this.name;
    }

    init() { }

    setLength(length) {
        assert(isPositiveInteger(length), `Type ${this.name} has invalid length`);
        if (this.length) {
            assert(
                length === this.length,
                `Type ${this.name} specified length does not match calculated length`
            );
        } else {
            this.length = length;
        }
    }

    setAlign(align) {
        assert(isPositiveInteger(align), `Type ${this.name} has invalid align`);
        if (this.align) {
            assert(
                align === this.align,
                `Type ${this.name} specified align does not match calculated align`
            );
        } else {
            this.align = align;
        }
    }
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
        let pos = 0,
            align = 0;
        for (let [key, prop] of Object.entries(this.props)) {
            prop = initType(prop);
            pos = getAligned(pos, prop.align);
            if (prop.align > align) align = prop.align;
            propsWithPosMap[key] = { key, prop, pos };
            pos += prop.length;
        }

        this.propsWithPos = this.keys.map(key => propsWithPosMap[key]);

        this.setLength(getAligned(pos, align));
        this.setAlign(align);
        if (!this.nodeName) this.nodeName = this.name;
    }

    generateDeserializer() {
        const propsCodes = this.propsWithPos.map(({ key, prop, pos }) => {
            return `${key}: deserialize${prop.name}(${posStr(pos)})`;
        });

        if (!this.noType) propsCodes.unshift(`type: '${this.nodeName}'`);

        return `function deserialize${this.name}(pos) {
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
        let length = 0,
            align = 0;
        this.enumOptions = this.enumOptions.map((enumOption) => {
            enumOption = initType(enumOption);
            const optionLength = enumOption.length + enumOption.align;
            if (optionLength > length) length = optionLength;
            if (enumOption.align > align) align = enumOption.align;
            return enumOption;
        });

        this.setLength(length);
        this.setAlign(align);
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map(({ name, align }, index) => (
            `case ${index}: return deserialize${name}(pos + ${align});`
        ));

        return `function deserialize${this.name}(pos) {
            switch (buff[pos]) {
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
    length = 1;
    align = 1;
    enumOptions = null;

    constructor(enumOptions, options) {
        const enumValue = enumValues.get(JSON.stringify(enumOptions));
        if (enumValue) return enumValue;

        assert(enumOptions.length < 256);

        super();
        Object.assign(this, options);

        this.enumOptions = enumOptions;

        enumValues.set(JSON.stringify(enumOptions), this);
    }

    getName() {
        return this.enumOptions.join('Or');
    }

    init() {
        this.setLength(1);
        this.setAlign(1);
    }

    generateDeserializer() {
        const enumOptionCodes = this.enumOptions.map((value, index) => (
            `case ${index}: return ${typeof value === 'string' ? `'${value}'` : value};`
        ));

        return `function deserialize${this.name}(pos) {
            switch (buff[pos]) {
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
        this.setLength(this.childType.align + this.childType.length);
        this.setAlign(this.childType.align);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(pos) {
            return deserializeOption(pos, deserialize${this.childType.name}, ${this.childType.align});
        }`;
    }
}

const optionals = new Map();

/**
 * Box class
 */
class Box extends Kind {
    length = 4;
    align = 4;
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
        this.setLength(4);
        this.setAlign(4);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(pos) {
            return deserializeBox(pos, deserialize${this.childType.name});
        }`;
    }
}

const boxes = new Map();

/**
 * Vec class
 */
class Vec extends Kind {
    length = 8;
    align = 4;
    childType = null;
    childLength = null;

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
        this.childLength = getAligned(this.childType.length, this.childType.align);
        this.setLength(8);
        this.setAlign(4);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(pos) {
            return deserializeVec(pos, deserialize${this.childType.name}, ${this.childLength});
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

        assert(isPositiveInteger(this.length), `Custom type ${this.name} has invalid length`);
        assert(isPositiveInteger(this.align), `Custom type ${this.name} has invalid align`);
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

// Export classes

module.exports = {
    Node: callableClass(Node),
    Enum: callableClass(Enum),
    EnumValue: callableClass(EnumValue),
    Option: callableClass(Option),
    Box: callableClass(Box),
    Vec: callableClass(Vec),
    Custom: callableClass(Custom)
};

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
 * Check if input is a positive integer.
 * @param {*} num - Input
 * @returns {boolean} - `true` if input is a positive integer
 */
function isPositiveInteger(num) {
    return typeof num === 'number' && num !== 0 && !isNaN(num) && num % 1 === 0;
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

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

    get serializerName() {
        return `serialize${this.name}`;
    }
    set serializerName(name) {
        Object.defineProperty(this, 'serializerName', { value: name, writable: true });
    }

    get finalizerName() {
        return `finalize${this.name}`;
    }
    set finalizerName(name) {
        Object.defineProperty(this, 'finalizerName', { value: name, writable: true });
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

    generateSerializer() {
        const propsOrdered = [...this.propsWithPos].sort(
            (prop1, prop2) => prop1.pos < prop2.pos ? -1 : 1
        );

        const serializeCodes = [],
            finalizeCodes = [];
        let endPos = 0;
        propsOrdered.forEach(({ key, prop, pos }, index) => {
            const storePosStr = `storePos32${index > 0 ? ` + ${index}` : ''}`;
            // Need to use `writeScratchUint32()` - reason explained in that function's definition
            serializeCodes.push(
                `writeScratchUint32(${storePosStr}, ${prop.serializerName}(node.${key}));`
            );

            if (pos > endPos) {
                finalizeCodes.push(`pos += ${pos - endPos};`);
            } else if (pos < endPos) {
                finalizeCodes.push(`pos -= ${endPos - pos};`);
            }
            finalizeCodes.push(`${prop.finalizerName}(scratchUint32[${storePosStr}]);`);

            endPos = pos + prop.length;
        });

        if (endPos !== this.length) finalizeCodes.push(`pos += ${this.length - endPos};`);

        return `function serialize${this.name}(node) {
            const storePos32 = allocScratch(${propsOrdered.length * 4}) >> 2;
            ${serializeCodes.join(`\n${' '.repeat(12)}`)}
            return storePos32;
        }
        
        function finalize${this.name}(storePos32) {
            ${finalizeCodes.join(`\n${' '.repeat(12)}`)}
        }`;
    }
}

/**
 * Enum class
 */
class Enum extends Kind {
    enumOptions = null;
    order = null;

    constructor(enumOptions, options) {
        const enumObj = enums.get(JSON.stringify({ enumOptions, options }));
        if (enumObj) return enumObj;

        assert(enumOptions.length < 256);

        super();
        Object.assign(this, options);

        this.enumOptions = enumOptions;
        if (!this.order) this.order = enumOptions.map((_, index) => index);

        enums.set(JSON.stringify({ enumOptions, options }), this);
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

        this.setLength(getAligned(length, align));
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

    generateSerializer() {
        // TODO For nested Enums, does `switch (node.type) {}` more than once - inefficient
        const optionSerializeCodes = [],
            optionFinalizeCodes = [],
            usedNodeNames = new Set();
        for (const index of this.order) {
            const type = this.enumOptions[index];

            const addCode = (nodeName) => {
                if (usedNodeNames.has(nodeName)) return;
                usedNodeNames.add(nodeName);

                optionSerializeCodes.push(`case '${nodeName}':`);
            };
            (function resolve(thisType) {
                if (thisType instanceof Node) return addCode(thisType.nodeName);
                if (thisType instanceof Enum) return thisType.enumOptions.forEach(resolve);
                if (thisType instanceof Box) return resolve(thisType.childType);
                if (thisType instanceof Custom) return addCode(thisType.name);
                throw new Error(`Unexpected enum option type for ${this.name}, option ${index}`);
            })(type);

            optionSerializeCodes.push(...[
                `scratchBuff[storePos] = ${index};`,
                // Need to use `writeScratchUint32()` - reason explained in that function's definition
                `writeScratchUint32((storePos >> 2) + 1, ${type.serializerName}(node));`,
                'break;'
            ].map(line => `${' '.repeat(4)}${line}`));

            optionFinalizeCodes.push(
                `case ${index}: finalizeEnum(`
                + `${index}, scratchUint32[(storePos >> 2) + 1], ${type.finalizerName}, `
                + `${type.align}, ${this.length}`
                + '); '
                + 'break;'
            );
        }

        return `function serialize${this.name}(node) {
            const storePos = allocScratch(8);
            switch (node.type) {
                ${optionSerializeCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
            return storePos;
        }

        function finalize${this.name}(storePos) {
            switch (scratchBuff[storePos]) {
                ${optionFinalizeCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum ID for ${this.name}');
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

    generateSerializer() {
        const enumOptionCodes = this.enumOptions.map((value, index) => (
            `case ${typeof value === 'string' ? `'${value}'` : value}: return ${index};`
        ));

        return `function serialize${this.name}(value) {
            switch (value) {
                ${enumOptionCodes.join(`\n${' '.repeat(16)}`)}
                default: throw new Error('Unexpected enum value for ${this.name}');
            }
        }`;
    }

    get finalizerName() {
        return 'finalizeEnumValue';
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
        this.setLength(this.childType.align + this.childType.length);
        this.setAlign(this.childType.align);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(pos) {
            return deserializeOption(pos, deserialize${this.childType.name}, ${this.childType.align});
        }`;
    }

    generateSerializer() {
        const { childType } = this,
            { finalizerName, length: childLength, align: childAlign } = childType;
        return `function serialize${this.name}(value) {
            return serializeOption(value, ${childType.serializerName});
        }
        
        function finalize${this.name}(storePos) {
            return finalizeOption(storePos, ${finalizerName}, ${childLength}, ${childAlign});
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

    generateSerializer() {
        const {
            serializerName, finalizerName, length: childLength, align: childAlign
        } = this.childType;
        return `function serialize${this.name}(value) {
            return serializeBox(value, ${serializerName}, ${finalizerName}, ${childLength}, ${childAlign});
        }`;
    }

    get finalizerName() {
        return 'finalizeBox';
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
        this.setLength(8);
        this.setAlign(4);
    }

    generateDeserializer() {
        return `function deserialize${this.name}(pos) {
            return deserializeVec(pos, deserialize${this.childType.name}, ${this.childType.length});
        }`;
    }

    generateSerializer() {
        const {
            serializerName, finalizerName, length: childLength, align: childAlign
        } = this.childType;
        return `function serialize${this.name}(values) {
            return serializeVec(values, ${serializerName}, ${finalizerName}, ${childLength}, ${childAlign});
        }`;
    }

    get finalizerName() {
        return 'finalizeVec';
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
        assert(typeof this.serialize === 'function', `Custom type ${this.name} has no serializer`);
        assert(
            typeof this.finalize === 'function' || this.finalize === false,
            `Custom type ${this.name} has no finalizer`
        );
    }

    generateDeserializer() {
        let code = this.deserialize.toString();
        assert(
            code.startsWith('deserialize('),
            `Custom type ${this.name} malformed deserializer function`
        );
        return `function deserialize${this.name}${code.slice('deserialize'.length)}`;
    }

    generateSerializer() {
        const serializeCode = this.serialize.toString();
        assert(
            serializeCode.startsWith('serialize('),
            `Custom type ${this.name} malformed serializer function`
        );
        let code = `function serialize${this.name}${serializeCode.slice('serialize'.length)}`;

        if (this.finalize) {
            const finalizeCode = this.finalize.toString();
            assert(
                finalizeCode.startsWith('finalize('),
                `Custom type ${this.name} malformed finalizer function`
            );
            code += `\n\n${' '.repeat(8)}function finalize${this.name}${finalizeCode.slice('finalize'.length)}`;
        }

        return code;
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

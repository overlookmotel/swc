"use strict";

// Imports
const Node = require("./node.js"),
    { Enum } = require("./enum.js"),
    EnumValue = require("./enumValue.js"),
    { Option } = require("./option.js"),
    { Box } = require("./box.js"),
    { Vec } = require("./vec.js"),
    Custom = require("./custom.js");

// Exports

module.exports = {
    Node: callableClass(Node),
    Enum: callableClass(Enum),
    EnumValue: callableClass(EnumValue),
    Option: callableClass(Option),
    Box: callableClass(Box),
    Vec: callableClass(Vec),
    Custom: callableClass(Custom),
};

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
        },
    });
}

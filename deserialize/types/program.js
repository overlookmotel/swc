"use strict";

// Imports
const { Node, Enum, Option, Vec } = require("../kinds/index.js");

// Exports

module.exports = {
    Program: Enum(["Module", "Script"]),

    Module: Node({
        body: Vec(Enum(["ModuleDeclaration", "Statement"])),
        interpreter: Option("JsWord"),
    }),

    Script: Node({
        body: Vec("Statement"),
        interpreter: Option("JsWord"),
    }),
};

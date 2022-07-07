"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Functions", () => {
    itParsesAndPrints("Function declarations", [
        "function f() {}",
        "function func_name_longer_than_7_chars() {}",
        "function f(x) {}",
        "function f(x, y, z) {}",
        `function f(
            param_name_longer_than_7_chars,
            y, z
        ) {}`,
        `function f(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        ) {}`,
        `function func_name_longer_than_7_chars(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        ) {}`,
        "function f() { let x = 1; }",
        "function f() { let x = 1; let y = 2; }",
        `function f(x, y) {
            if (x) return 1;
            if (y) return 2;
            return 3;
        }`,
        "function* f() {}",
        "async function f() {}",
        "async function* f() {}",
    ]);

    itParsesAndPrints("Function expressions", [
        "(function f() {})",
        "(function func_name_longer_than_7_chars() {})",
        "(function f(x) {})",
        "(function f(x, y, z) {})",
        `(function f(
            param_name_longer_than_7_chars,
            y, z
        ) {})`,
        `(function f(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        ) {})`,
        `(function func_name_longer_than_7_chars(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        ) {})`,
        "(function f() { let x = 1; })",
        "(function f() { let x = 1; let y = 2; })",
        `(function f(x, y) {
            if (x) return 1;
            if (y) return 2;
            return 3;
        })`,
        "(function* f() {})",
        "(async function f() {})",
        "(async function* f() {})",
    ]);

    itParsesAndPrints("Arrow function expressions", [
        "() => {}",
        "() => 1",
        "x => x",
        "(x, y, z) => x",
        "param_name_longer_than_7_chars => param_name_longer_than_7_chars",
        "(param_name_longer_than_7_chars, y, z) => param_name_longer_than_7_chars",
        `(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        ) => param_name_longer_than_7_chars`,
        `(x, y, z) => {
            if (x) return 1;
            if (y) return 2;
            if (z) return 3;
            return;
        }`,
        "async () => {}",
        "async () => 1",
        "async (x, y, z) => x",
        `async (x, y, z) => {
            if (x) return 1;
            if (y) return 2;
            if (z) return 3;
            return;
        }`,
    ]);
});

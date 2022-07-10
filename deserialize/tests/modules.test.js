"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Module declarations", () => {
    itParsesAndPrints("Import declarations", [
        "import x from 'm'",
        "import var_name_longer_than_7_chars from 'string_longer_than_7_chars'",

        "import {x} from 'm'",
        "import {x as y} from 'm'",
        "import {'x x' as y} from 'm'",
        "import {var_name_longer_than_7_chars} from 'm'",
        "import {var_name_longer_than_7_chars as var_name_longer_than_7_chars2} from 'm'",
        "import {'string_longer_than_7_chars' as var_name_longer_than_7_chars} from 'm'",
        "import {x, y, z} from 'm'",
        "import {xx as x, yy as y, zz as z} from 'm'",
        "import {'x x' as x, 'y y' as y, 'z z' as z} from 'm'",
        "import {x, yy as y, 'z z' as z} from 'm'",

        "import * as x from 'm'",
        "import * as var_name_longer_than_7_chars from 'string_longer_than_7_chars'",

        "import x, {y, zz as z} from 'm'",

        `
            import x from 'm';
            import {y} from 'n';
            import * as z from 'o';
        `,
    ]);

    itParsesAndPrints("Export declarations", [
        "export const x = 1",
        "export const x = 1, y = 2, z = 3",
        "export let x = 1",
        "export let x = 1, y = 2, z = 3",
        "export var x = 1",
        "export var x = 1, y = 2, z = 3",
        "export function f() {}",
        "export class C {}",
        `
                export const x = 1;
                export let y = 2;
                export var z = 3;
                export function f() {}
                export class C {}
            `,
    ]);

    describe("Export named declarations", () => {
        itParsesAndPrints("named specifiers", [
            "export {x}",
            "export {x as y}",
            "export {x as 'y y'}",
            "export {var_name_longer_than_7_chars}",
            "export {var_name_longer_than_7_chars as var_name_longer_than_7_chars2}",
            "export {var_name_longer_than_7_chars as 'string_longer_than_7_chars'}",
            "export {x, y, z}",
            "export {xx as x, yy as y, zz as z}",
            "export {x as 'x x', y as 'y y', z as 'z z'}",
            "export {x, yy as y, z as 'z z'}",

            "export {x} from 'm'",
            "export {x} from 'string_longer_than_7_chars'",
            "export {x as y} from 'm'",
            "export {x as 'y y'} from 'm'",
            "export {var_name_longer_than_7_chars} from 'm'",
            "export {var_name_longer_than_7_chars as var_name_longer_than_7_chars2} from 'm'",
            "export {var_name_longer_than_7_chars as 'string_longer_than_7_chars'} from 'm'",
            "export {x, y, z} from 'm'",
            "export {xx as x, yy as y, zz as z} from 'm'",
            "export {x as 'x x', y as 'y y', z as 'z z'} from 'm'",
            "export {x, yy as y, z as 'z z'} from 'm'",
        ]);

        itParsesAndPrints("default specifiers", [
            // TODO What code creates this? TS only?
        ]);

        describe("namespace specifiers", () => {
            itParsesAndPrints("named exports", [
                "export * as x from 'm'",
                "export * as var_name_longer_than_7_chars from 'm'",
                "export * as x from 'string_longer_than_7_chars'",
            ]);

            itParsesAndPrints("string exports", { noTransform: true }, [
                // String exports not supported by `transform()`
                "export * as 'x x' from 'm'",
                "export * as 'string_longer_than_7_chars' from 'm'"
            ]);
        })
    });

    itParsesAndPrints("Export default declarations", [
        "export default function() {}",
        "export default function f() {}",
        "export default function func_name_longer_than_7_chars() {}",
        "export default class {}",
        "export default class C {}",
        "export default class Class_name_longer_than_7_chars {}",
    ]);

    itParsesAndPrints("Export default expression", [
        "export default x",
        "export default 1",
        "export default 'x'",
    ]);

    itParsesAndPrints("Export all declaration", [
        "export * from 'm'",
        "export * from 'string_longer_than_7_chars'",
    ]);
});

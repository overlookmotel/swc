"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Statements", () => {
    itParsesAndPrints("Variable declarations", [
        "var x",
        "let x",
        "const x = 1",
        "var x = 1",
        "let x = 1",

        "let x, y, z",
        "let x = 1, y, z",
        "let x, y = 1, z",
        "let x, y, z = 1",
        "let x = 1, y = 2, z = 3",

        "let x; let y; let z;",
        "let x = 1; let y = 2; let z = 3;",
    ]);

    itParsesAndPrints("Block statements", [
        "{}",
        "{ let x; }",
        "{ let x; let y; }",
    ]);

    itParsesAndPrints("Empty statements", [
        ";",
        ";;;"
    ]);

    itParsesAndPrints("`debugger` statements", [
        "debugger",
        "debugger; debugger; debugger",
    ]);

    itParsesAndPrints("`with` statements", { isModule: false }, [
        "with (1) {}",
        "with (1) ;",
        "with (1) {}; with (2) ; with (3) {}",
    ]);

    itParsesAndPrints("`return` statements", [
        "function f() { return; }",
        "function f() { return 1; }",
        "function f() { return; return; return; }",
        "function f() { return 1; return 2; return 3; }",
    ]);

    itParsesAndPrints("Labeled statements", [
        "a: ;",
        "a: {}",
        "a: { let x; let y; }",
        "label_name_longer_than_7_chars: { let x; }",
        "a: b: c: ;",
        "a: label_name_longer_than_7_chars: c: ;",
        "a: label_name_longer_than_7_chars: c: { let x; let y; }",
    ]);

    itParsesAndPrints("`break` statements", [
        "a: break;",
        "a: break a;",
        "label_name_longer_than_7_chars: break;",
        "label_name_longer_than_7_chars: break label_name_longer_than_7_chars;",
        "a: b: c: break a;",
    ]);

    itParsesAndPrints("`continue` statements", [
        "while (1) { continue; }",
        "a: while (1) { continue a; }",
        "label_name_longer_than_7_chars: while (1) { continue label_name_longer_than_7_chars; }",
        "a: b: c: while (1) { continue a; continue b; continue c; }",
    ]);

    itParsesAndPrints("`if` statements", [
        "if (1) ;",
        "if (1) {}",
        "if (1) { let x = 2; }",
        "if (1) ; else ;",
        "if (1) { let x = 2; } else { let y = 3; }",
    ]);

    itParsesAndPrints("`switch` statements", [
        "switch (x) {}",
        "switch (x) { case 1: let x = 1; }",
        "switch (x) { default: let x = 1; }",
        `switch (x) {
            case 1:
                let x = 1;
            case 2:
                let y = 2;
                break;
            default:
                let z = 3;
        }`,
    ]);

    itParsesAndPrints("`throw` statements", [
        "throw 1",
        "throw 1; throw 2; throw 3;",
    ]);

    itParsesAndPrints("`try` statements", [
        "try {} catch {}",
        "try {} catch (e) {}",
        "try {} finally {}",
        `try {
            throw 1;
        } catch (e) {
            let x = e;
        } finally {
            let y = 2;
        }`,
    ]);

    itParsesAndPrints("`while` statements", [
        "while (1) ;",
        "while (1) {}",
        `while (1) {
            if (1) break;
            continue;
        }`,
    ]);

    itParsesAndPrints("`do ... while` statements", [
        "do ; while (1)",
        "do {} while (1)",
        `do {
            if (1) break;
            continue;
        } while (1);`,
    ]);

    itParsesAndPrints("`for` statements", [
        "for (;;) ;",
        "for (x; y; z) ;",
        "for (let x = 1; x; x) ;",
        `for (let x = 1; x; x) {
            if (x) break;
            continue;
        }`,
    ]);

    itParsesAndPrints("`for (... in ...)` statements", [
        "for (x in y) ;",
        "for (let x in y) ;",
        `for (let x in y) {
            if (x) break;
            continue;
        }`,
    ]);

    itParsesAndPrints("`for (... of ...)` statements", [
        "for (x of y) ;",
        "for (let x of y) ;",
        `for (let x of y) {
            if (x) break;
            continue;
        }`,
        `for await (let x of y) ;`,
        `for await (let x of y) {}`,
    ]);

    itParsesAndPrints("Expression statements", [
        "x",
        "1"
    ]);
});

"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Expressions", () => {
    itParsesAndPrints("`this` expressions", [
        "this",
        "this; this; this;"
    ]);

    itParsesAndPrints("Array expressions", [
        "[]",
        "[1]",
        "[1, 2, 3]",
        "[x, y, z]",
        "[, , ,]",
        "[x, , z]",
        "[, , x, , , , y, , , z, , ]",
        "[...x]",
        "[x, y, ...z]",
        "[, , x, , , y, , , ...z]",
    ]);

    describe("Object expressions", () => {
        itParsesAndPrints("Shortcut notation", [
            "({})",
            "({x})",
            "({x, y, z})",
            "({prop_name_longer_than_7_chars})",
            `({
                prop_name_longer_than_7_chars,
                prop_name_longer_than_7_chars2,
                prop_name_longer_than_7_chars3
            })`,
        ]);

        itParsesAndPrints("Properties", [
            "({x: xx})",
            "({x: xx, y: yy, z: zz})",
            "({x: 1})",
            "({x: 1, y: 2, z: 3})",
            "({'x x': 1})",
            "({'x x': 1, 'y y': 2, 'z z': 3})",
            "({1: 2})",
            "({1: 2, 3: 4, 5: 6})",
            "({1n: 2})",
            "({1n: 2, 3n: 4, 5n: 6})",
            "({ [x]: 1 })",
            "({ [x]: 1, [y]: 2, [z]: 3 })",
            "({ [1]: 2 })",
            "({ [1]: 2, [3]: 4, [5]: 6 })",
        ]);

        itParsesAndPrints("Spread", [
            "({ ...x })",
            "({ ...x, ...y, ...z })",
            "({ ...1 })",
            "({ ...1, ...2, ...3 })",
            "({ x, ...y, z })",
            "({ x: xx, ...y, z: zz })",
            "({ ...x, y, ...z })",
            "({ ...x, y: yy, ...z })",
        ]);

        itParsesAndPrints("Getter properties", [
            "({ get x() {} })",
            "({ get x() {}, get y() {}, get z() {} })",
            "({ get x() { return 1; } })",
            `({
                get x() { return 1; },
                get y() { return 2; },
                get z() { return 3; }
            })`,
            "({ get 'x x'() {} })",
            `({
                get 'x x'() { return 1; },
                get 'y y'() { return 2; },
                get 'z z'() { return 3; }
            })`,
            "({ get 1() {} })",
            `({
                get 1() { return 2; },
                get 3() { return 4; },
                get 5() { return 6; }
            })`,
            "({ get 1n() {} })",
            `({
                get 1n() { return 2; },
                get 3n() { return 4; },
                get 5n() { return 6; }
            })`,
            "({ get [x]() { return 1; } })",
            `({
                get [x]() { return 1; },
                get [y]() { return 2; },
                get [z]() { return 3; }
            })`,
            `({
                get [1]() { return 2; },
                get [3]() { return 4; },
                get [5]() { return 6; }
            })`,
        ]);

        itParsesAndPrints("Setter properties", [
            "({ set x(v) {} })",
            "({ set x(v) {}, set y(v2) {}, set z(v3) {} })",
            "({ set x(v) { this.xx += v; } })",
            `({
                set x(v) { this.xx += v; },
                set y(v2) { this.yy += v2; },
                set z(v3) { this.zz += v3; }
            })`,
            "({ set 'x x'(v) {} })",
            `({
                set 'x x'(v) { this.xx += v; },
                set 'y y'(v2) { this.yy += v2; },
                set 'z z'(v3) { this.zz += v3; }
            })`,
            "({ set 1(v) {} })",
            `({
                set 1(v) { this.xx += v; },
                set 3(v2) { this.yy += v2; },
                set 5(v3) { this.zz += v3; }
            })`,
            "({ set 1n(v) {} })",
            `({
                set 1n(v) { this.xx += v; },
                set 3n(v2) { this.yy += v2; },
                set 5n(v3) { this.zz += v3; }
            })`,
            "({ set [x](v) {} })",
            `({
                set [x](v) { this.xx += v; },
                set [y](v2) { this.yy += v2; },
                set [z](v3) { this.zz += v3; }
            })`,
            `({
                set [1](v) { this.xx += v; },
                set [3](v2) { this.yy += v2; },
                set [5](v3) { this.zz += v3; }
            })`,
        ]);

        itParsesAndPrints("Methods", [
            "({ m() {} })",
            "({ method_name_longer_than_7_chars() {} })",
            "({ m() {}, n() {}, o() {} })",
            `({
                method_name_longer_than_7_chars() {},
                method_name_longer_than_7_chars2() {},
                method_name_longer_than_7_chars3() {}
            })`,
            "({ m() { let x = 1; return x; } })",

            "({ m(x) {} })",
            "({ m(x, y, z) {} })",
            `({
                m(
                    param_name_longer_than_7_chars,
                    y, z
                ) {}
            })`,
            `({
                m(
                    param_name_longer_than_7_chars,
                    param_name_longer_than_7_chars2,
                    param_name_longer_than_7_chars3
                ) {}
            })`,
            `({
                method_name_longer_than_7_chars(
                    param_name_longer_than_7_chars,
                    param_name_longer_than_7_chars2,
                    param_name_longer_than_7_chars3
                ) {}
            })`,
            "({ m() { let x = 1; } })",
            "({ m() { let x = 1; let y = 2; } })",
            `({
                m(x, y) {
                    if (x) return 1;
                    if (y) return 2;
                    return 3;
                }
            })`,

            "({ *m() {} })",
            "({ async m() {} })",
            "({ async *m() {} })",
        ]);
    });

    itParsesAndPrints("Unary expressions", [
        "+1",
        "-1",
        "!1",
        "~1",
        "typeof 1",
        "void 1",
        "delete 1",
        "+1; -1; !1; ~1; typeof 1; void 1; delete 1;",
    ]);

    itParsesAndPrints("Update expressions", [
        "x++",
        "x--",
        "++x",
        "--x",
        "x++; x--; ++x; --x;",
    ]);

    itParsesAndPrints("Binary expressions", [
        "x == y",
        "x != y",
        "x === y",
        "x !== y",
        "x < y",
        "x <= y",
        "x > y",
        "x >= y",
        "x << y",
        "x >> y",
        "x >>> y",
        "x + y",
        "x - y",
        "x * y",
        "x / y",
        "x % y",
        "x | y",
        "x ^ y",
        "x & y",
        "x || y",
        "x && y",
        "x in y",
        "x instanceof y",
        "x ** y",
        "x ?? y",
        `x == y; x != y; x === y; x !== y;
        x < y; x <= y; x > y; x >= y; x << y; x >> y; x >>> y;
        x + y; x - y; x * y; x / y; x % y; x | y; x ^ y; x & y;
        x || y; x && y; x in y; x instanceof y; x ** y; x ?? y`,
    ]);

    itParsesAndPrints("Assignment expressions", [
        "x = 1",
        "x += 1",
        "x -= 1",
        "x *= 1",
        "x /= 1",
        "x %= 1",
        "x <<= 1",
        "x >>= 1",
        "x >>>= 1",
        "x |= 1",
        "x ^= 1",
        "x &= 1",
        "x **= 1",
        "x &&= 1",
        "x ||= 1",
        "x ??= 1",

        "[x] = 1",
        "({x} = 1)",

        "x.y = 1",
        "x.y += 1",
        "x.y -= 1",
        "x.y *= 1",
        "x.y /= 1",
        "x.y %= 1",
        "x.y <<= 1",
        "x.y >>= 1",
        "x.y >>>= 1",
        "x.y |= 1",
        "x.y ^= 1",
        "x.y &= 1",
        "x.y **= 1",
        "x.y &&= 1",
        "x.y ||= 1",
        "x.y ??= 1",

        "({ m() { super.x = 1; } })",
        "({ m() { super.x += 1; } })",
        "({ m() { super.x -= 1; } })",
        "({ m() { super.x *= 1; } })",
        "({ m() { super.x /= 1; } })",
        "({ m() { super.x %= 1; } })",
        "({ m() { super.x <<= 1; } })",
        "({ m() { super.x >>= 1; } })",
        "({ m() { super.x >>>= 1; } })",
        "({ m() { super.x |= 1; } })",
        "({ m() { super.x ^= 1; } })",
        "({ m() { super.x &= 1; } })",
        "({ m() { super.x **= 1; } })",
        "({ m() { super.x &&= 1; } })",
        "({ m() { super.x ||= 1; } })",
        "({ m() { super.x ??= 1; } })",

        `x = 1; x += 1; x -= 1; x *= 1; x /= 1; x %= 1;
        x <<= 1; x >>= 1; x >>>= 1; x |= 1; x ^= 1; x &= 1;
        x **= 1; x &&= 1; x ||= 1; x ??= 1`,
        `x.y = 1; x.y += 1; x.y -= 1; x.y *= 1; x.y /= 1; x.y %= 1;
        x.y <<= 1; x.y >>= 1; x.y >>>= 1; x.y |= 1; x.y ^= 1; x.y &= 1;
        x.y **= 1; x.y &&= 1; x.y ||= 1; x.y ??= 1`,
    ]);

    itParsesAndPrints("Member expressions", [
        "x.y",
        "x.#y",
        "x[y]",
        "x[1]",
        "x[y + z]",
        "x['foo bar']",
        "x['foo bar qux']",
        "x.y.z",
        "x.#y.z",
        "x.#y[1][2][3].z['foo']['bar qux'][a + 3]",
    ]);

    itParsesAndPrints("Conditional expressions", [
        "x ? y : z",
        "1 ? 2 : 3",
        "x ? 1 : y ? 2 : z ? 3 : 4",
    ]);

    itParsesAndPrints("`super` prop expressions", [
        "({ m() { return super.x; } })",
        "({ m() { return super.x(); } })",
        "({ m() { super.x = 1; } })",
        "({ m() { return super[x]; } })",
        "({ m() { return super[x](); } })",
        "({ m() { super[x] = 1; } })",
        "({ m() { return super.x(y, ...z); } })",
        "({ m() { return super[x](y, ...z); } })",
    ]);

    itParsesAndPrints("Call expressions", [
        "f()",
        "func_name_longer_than_7_chars()",
        "f(1)",
        "f(x)",
        "f(x, y, z)",
        "f(param_name_longer_than_7_chars)",
        "f(param_name_longer_than_7_chars, x, y)",
        `func_name_longer_than_7_chars(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        )`,
        "f(...x)",
        "f(...param_name_longer_than_7_chars)",
        "f(x, y, ...z)",
        "f(x, y, ...param_name_longer_than_7_chars)",
        `func_name_longer_than_7_chars(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            ...param_name_longer_than_7_chars3
        )`,

        "import(x)",
        "import(param_name_longer_than_7_chars)",
        "import('foo')",
        "import('foo/bar/qux.js')",
        "import(x, y, z)",
        "import(...x)",
        "import(x, y, ...z)",

        "class C extends S { constructor() { super(); } }",
        "class C extends S { constructor() { super(x); } }",
        "class C extends S { constructor() { super(param_name_longer_than_7_chars); } }",
        "class C extends S { constructor() { super(x, y, z); } }",
        "class C extends S { constructor() { super(x, y, ...z); } }",
    ]);

    itParsesAndPrints("`new` expressions", [
        "new C()",
        "new Class_name_longer_than_7_chars()",
        "new C(x)",
        "new C(x, y, z)",
        "new C(param_name_longer_than_7_chars)",
        "new C(param_name_longer_than_7_chars, x, y)",
        `new Class_name_longer_than_7_chars(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        )`,
        "new C(...x)",
        "new C(...param_name_longer_than_7_chars)",
        "new C(x, y, ...z)",
        "new C(x, y, ...param_name_longer_than_7_chars)",
        `new Class_name_longer_than_7_chars(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            ...param_name_longer_than_7_chars3
        )`,
    ]);

    itParsesAndPrints("Sequence expressions", [
        "x, x",
        "x, x, x",
        "1, 1",
        "1, 1, 1",
    ]);

    itParsesAndPrints("Template literals", [
        "``",
        "`a`",
        "`str_longer_than_7_chars`",
        "`${x}`",
        "`${x}${y}${z}`",
        "`${x}a${y}b${z}`",
        "`a${x}b${y}c${z}d`",
        "`str_longer_than_7_chars${x}str_longer_than_7_chars2${y}str_longer_than_7_chars3${z}str_longer_than_7_chars4`",
        // Multi-line
        ["`", "a", "${x}", "b", "${y}", "c", "${z}", "d", "`"].join("\n"),
    ]);

    itParsesAndPrints("Tagged template expressions", [
        "f``",
        "f`a`",
        "f`str_longer_than_7_chars`",
        "f`${x}`",
        "f`${x}${y}${z}`",
        "f`${x}a${y}b${z}`",
        "f`a${x}b${y}c${z}d`",
        "f`str_longer_than_7_chars${x}str_longer_than_7_chars2${y}str_longer_than_7_chars3${z}str_longer_than_7_chars4`",
        // Multi-line
        ["f`", "a", "${x}", "b", "${y}", "c", "${z}", "d", "`"].join("\n"),
    ]);

    itParsesAndPrints("`yield` expressions", [
        "function *f() { yield; }",
        "function *f() { yield x; }",
        "function *f() { yield var_name_longer_than_7_chars; }",
        "function *f() { yield 1; }",
        "function *f() { yield 1; yield 2; yield 3; }",
        "function *f() { yield* x; }",
        "function *f() { yield* var_name_longer_than_7_chars; }",
        "function *f() { yield* 1; }",
        "function *f() { yield* x; yield* y; yield* z; }",
    ]);

    describe("Meta properties", () => {
        itParsesAndPrints("new.target", [
            "function f() { return new.target; }",
        ]);

        itParsesAndPrints("import.meta", [
            "import.meta",
            "import.meta.url",
            "import.meta.resolve",
            "import.meta[x]",
        ]);
    });

    describe("`await` expressions", () => {
        itParsesAndPrints(
            "top level",
            { target: "es2017", topLevelAwait: true },
            ["await 1;", "await x;", "await var_name_longer_than_7_chars;"]
        );

        itParsesAndPrints("in functions", [
            "async function f() { await x; await y; await z; }",
            "async function *f() { await x; await y; await z; }",
        ]);
    });

    itParsesAndPrints("Parenthesis expressions", [
        "(x)",
        "(1)"
    ]);

    itParsesAndPrints("Optional chaining expressions", [
        "x?.y",
        "x?.[y]",
        "x?.[1]",
        "x?.y?.z",
        "x?.[y]?.[z]",
        "x?.[1]?.[2]",
        "var_name_longer_than_7_chars?.prop_name_longer_than_7_chars?.prop_name_longer_than_7_chars2",
        "var_name_longer_than_7_chars?.[var_name_longer_than_7_chars2]?.[var_name_longer_than_7_chars3]",

        "f?.()",
        "func_name_longer_than_7_chars?.()",
        "f?.(1)",
        "f?.(x)",
        "f?.(x, y, z)",
        "f?.(param_name_longer_than_7_chars)",
        "f?.(param_name_longer_than_7_chars, x, y)",
        `func_name_longer_than_7_chars?.(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            param_name_longer_than_7_chars3
        )`,
        "f?.(...x)",
        "f?.(...param_name_longer_than_7_chars)",
        "f?.(x, y, ...z)",
        "f?.(x, y, ...param_name_longer_than_7_chars)",
        `func_name_longer_than_7_chars?.(
            param_name_longer_than_7_chars,
            param_name_longer_than_7_chars2,
            ...param_name_longer_than_7_chars3
        )`,

        "x.y?.()",
        "var_name_longer_than_7_chars.prop_name_longer_than_7_chars?.()",
    ]);
});

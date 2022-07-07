"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Classes", () => {
    describe("Class declarations", () => {
        itParsesAndPrints("empty", [
            "class C {}",
            "class Class_name_longer_than_7_chars {}",

            "class C extends S {}",
        ]);

        itParsesAndPrints("Constructors", [
            "class C { constructor() {} }",
            "class C { constructor(x) {} }",
            "class C { constructor(x, y, z) {} }",
            "class C { constructor(x, y) { this.x = x; this.y = y;} }",
        ]);

        itParsesAndPrints("Methods", [
            "class C { m() {} }",
            "class C { method_name_longer_than_7_chars() {} }",
            "class C { 'm m'() {} }",
            "class C { 1() {} }",
            "class C { 1n() {} }",
            "class C { [m]() {} }",

            "class C { m(x) {} }",
            "class C { m(x, y, z) {} }",
            "class C { m(x, y) { this.x = x; this.y = y;} }",

            "class C { static m() {} }",
            "class C { *m() {} }",
            "class C { async m() {} }",
            "class C { async *m() {} }",
            "class C { get x() {} }",
            "class C { set x(v) {} }",
            "class C { static get x() {} }",
            "class C { static set x(v) {} }",

            `class C {
                m() {}
                static 1() {}
                *n() {}
                async o() {}
                async *p() {}
                get q() {}
                set r(v) {}
            }`,
        ]);

        itParsesAndPrints("Private methods", [
            "class C { #m() {} }",
            "class C { #method_name_longer_than_7_chars() {} }",

            "class C { #m(x) {} }",
            "class C { #m(x, y, z) {} }",
            "class C { #m(x, y) { this.x = x; this.y = y;} }",

            "class C { static #m() {} }",
            "class C { *#m() {} }",
            "class C { async #m() {} }",
            "class C { async *#m() {} }",
            "class C { get #x() {} }",
            "class C { set #x(v) {} }",
            "class C { static get #x() {} }",
            "class C { static set #x(v) {} }",

            `class C {
                #m() {}
                static #n() {}
                *#o() {}
                async #p() {}
                async *#q() {}
                get #r() {}
                set #s(v) {}
            }`,
        ]);

        itParsesAndPrints("Properties", [
            "class C { x; }",
            "class C { prop_name_longer_than_7_chars; }",
            "class C { 'm m'; }",
            "class C { 1; }",
            "class C { 1n; }",
            "class C { [m]; }",

            "class C { static x; }",
            "class C { static prop_name_longer_than_7_chars; }",
            "class C { static 'm m'; }",
            "class C { static 1; }",
            "class C { static 1n; }",
            "class C { static [m]; }",

            "class C { x = y; }",
            "class C { x = 1; }",
            "class C { static x = y; }",
            "class C { static x = 1; }",

            `class C {
                a;
                static b;
                c = 1;
                d = x;
                static e = 1;
                static f = x;
                'g g';
                'h h' = 1;
                2;
                3 = 4;
                5n;
                6n = 7;
                [y];
                [z] = 8;
            }`,
        ]);

        itParsesAndPrints("Private properties", [
            "class C { #x; }",
            "class C { #prop_name_longer_than_7_chars; }",

            "class C { static #x; }",
            "class C { static #prop_name_longer_than_7_chars; }",

            "class C { #x = y; }",
            "class C { #x = 1; }",
            "class C { static #x = y; }",
            "class C { static #x = 1; }",

            `class C {
                #a;
                static #b;
                #c = 1;
                #d = x;
                static #e = 1;
                static #f = x;
            }`,
        ]);

        itParsesAndPrints("Static blocks", { staticBlocks: true }, [
            "class C { static {} }",
            "class C { static { this.x = 1; this.y = 2; } }",

            `class C {
                static {
                    this.x = 1;
                }
                static {
                    this.y = 2;
                }
                static {
                    this.z = 3;
                }
            }`,
        ]);

        itParsesAndPrints("multiple", { staticBlocks: true }, [
            "class C {}; class D {}; class E {}",

            `
            class C {
                constructor() {}
                a;
                b = 1;
                static c;
                static d = 2;
                #e;
                #f = 3;
                static #g;
                static #h = 4;
                i() {}
                *j() {}
            }
            class D {
                constructor() {}
                static k() {}
                static async l() {}
                #m() {}
                async #n() {}
                static #o() {}
                static *#p() {}
            }
            class E {
                constructor() {}
                get q() {}
                get #h() {}
                set i(v) {}
                set #j(v) {}
                static {}
                static {}
            }
            `,
        ]);
    });

    describe("Class expressions", () => {
        itParsesAndPrints("empty", [
            "(class {})",
            "(class C {})",
            "(class Class_name_longer_than_7_chars {})",

            "(class extends S {})",
        ]);

        itParsesAndPrints("Constructors", [
            "(class { constructor() {} })",
            "(class { constructor(x) {} })",
            "(class { constructor(x, y, z) {} })",
            "(class { constructor(x, y) { this.x = x; this.y = y;} })",
        ]);

        itParsesAndPrints("Methods", [
            "(class { m() {} })",
            "(class { method_name_longer_than_7_chars() {} })",
            "(class { 'm m'() {} })",
            "(class { 1() {} })",
            "(class { 1n() {} })",
            "(class { [m]() {} })",

            "(class { m(x) {} })",
            "(class { m(x, y, z) {} })",
            "(class { m(x, y) { this.x = x; this.y = y;} })",

            "(class { static m() {} })",
            "(class { *m() {} })",
            "(class { async m() {} })",
            "(class { async *m() {} })",
            "(class { get x() {} })",
            "(class { set x(v) {} })",
            "(class { static get x() {} })",
            "(class { static set x(v) {} })",

            `(class {
                m() {}
                static 1() {}
                *n() {}
                async o() {}
                async *p() {}
                get q() {}
                set r(v) {}
            })`,
        ]);

        itParsesAndPrints("Private methods", [
            "(class { #m() {} })",
            "(class { #method_name_longer_than_7_chars() {} })",

            "(class { #m(x) {} })",
            "(class { #m(x, y, z) {} })",
            "(class { #m(x, y) { this.x = x; this.y = y;} })",

            "(class { static #m() {} })",
            "(class { *#m() {} })",
            "(class { async #m() {} })",
            "(class { async *#m() {} })",
            "(class { get #x() {} })",
            "(class { set #x(v) {} })",
            "(class { static get #x() {} })",
            "(class { static set #x(v) {} })",

            `(class {
                #m() {}
                static #n() {}
                *#o() {}
                async #p() {}
                async *#q() {}
                get #r() {}
                set #s(v) {}
            })`,
        ]);

        itParsesAndPrints("Properties", [
            "(class { x; })",
            "(class { prop_name_longer_than_7_chars; })",
            "(class { 'm m'; })",
            "(class { 1; })",
            "(class { 1n; })",
            "(class { [m]; })",

            "(class { static x; })",
            "(class { static prop_name_longer_than_7_chars; })",
            "(class { static 'm m'; })",
            "(class { static 1; })",
            "(class { static 1n; })",
            "(class { static [m]; })",

            "(class { x = y; })",
            "(class { x = 1; })",
            "(class { static x = y; })",
            "(class { static x = 1; })",

            `(class {
                a;
                static b;
                c = 1;
                d = x;
                static e = 1;
                static f = x;
                'g g';
                'h h' = 1;
                2;
                3 = 4;
                5n;
                6n = 7;
                [y];
                [z] = 8;
            })`,
        ]);

        itParsesAndPrints("Private properties", [
            "(class { #x; })",
            "(class { #prop_name_longer_than_7_chars; })",

            "(class { static #x; })",
            "(class { static #prop_name_longer_than_7_chars; })",

            "(class { #x = y; })",
            "(class { #x = 1; })",
            "(class { static #x = y; })",
            "(class { static #x = 1; })",

            `(class {
                #a;
                static #b;
                #c = 1;
                #d = x;
                static #e = 1;
                static #f = x;
            })`,
        ]);

        itParsesAndPrints("Static blocks", { staticBlocks: true }, [
            "(class { static {} })",
            "(class { static { this.x = 1; this.y = 2; } })",

            `(class {
                static {
                    this.x = 1;
                }
                static {
                    this.y = 2;
                }
                static {
                    this.z = 3;
                }
            })`,
        ]);

        itParsesAndPrints("multiple", { staticBlocks: true }, [
            "(class {}, class {}, class {})",
            "(class C {}, class D {}, class E {})",

            `(
                class C {
                    constructor() {}
                    a;
                    b = 1;
                    static c;
                    static d = 2;
                    #e;
                    #f = 3;
                    static #g;
                    static #h = 4;
                    i() {}
                    *j() {}
                },
                class {
                    constructor() {}
                    static k() {}
                    static async l() {}
                    #m() {}
                    async #n() {}
                    static #o() {}
                    static *#p() {}
                },
                class {
                    constructor() {}
                    get q() {}
                    get #h() {}
                    set i(v) {}
                    set #j(v) {}
                    static {}
                    static {}
                }
            )`,
        ]);
    });
});

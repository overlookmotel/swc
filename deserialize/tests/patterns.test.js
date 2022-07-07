"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Patterns", () => {
    itParsesAndPrints("Binding identifiers", [
        "let x;",
        "let var_name_longer_than_7_chars;",
    ]);

    describe("Array patterns", () => {
        itParsesAndPrints("simple", [
            "[] = a",
            "[x] = a",
            "[x, y, z] = a",
            "[, , x, , , y, , , z, , ,] = a",
        ]);

        itParsesAndPrints("Rest elements", [
            "[...x] = a",
            "[x, y, ...z] = a",
            "[, , ...z] = a",
            "[, , x, , , y, , , ...z] = a",
        ]);

        itParsesAndPrints("Assignment patterns", [
            "[x = 1] = a",
            "[x = 1, y = 2, z = 3] = a",
            "[, , x = 1] = a",
            "[, , x = 1, , , y = 2, , , z = 3, , ,] = a",
            "[, , x = 1, , , y = 2, , , ...z] = a",
        ]);

        itParsesAndPrints("Expression patterns", [
            "[x.b] = a",
            "[x.b.c.d] = a",
            "[x.b = 1, y.c = 2, z.d = 3] = a",
            "[, , x.b = 1] = a",
            "[, , x.b = 1, , , y.c = 2, , , z.d = 3, , ,] = a",
            "[, , x.b = 1, , , y.c = 2, , , ...z.d] = a",
        ]);
    });

    describe("Object patterns", () => {
        itParsesAndPrints("empty", [
            "({} = a)"
        ]);

        itParsesAndPrints("Shortcuts", [
            "({x} = a)",
            "({x, y, z} = a)"
        ]);

        itParsesAndPrints("Key value patterns", [
            "({b: x} = a)",
            "({b: x, c: y, d: z} = a)",
            "({'x x': x} = a)",
            "({'x x': x, 'y y': y, 'z z': z} = a)",
            "({1: x} = a)",
            "({1: x, 2: y, 3: z} = a)",
            "({1n: x} = a)",
            "({1n: x, 2n: y, 3n: z} = a)",
            "({ [xx]: x } = a)",
            "({ [xx]: x, [yy]: y, [zz]: z} = a)",
            "({ [1]: x } = a)",
            "({ [1]: x, [2]: y, [3]: z} = a)",
        ]);

        itParsesAndPrints("Assignment pattern properties", [
            "({x = xx} = a)",
            "({x = xx, y = yy, z = zz} = a)",
            "({x = 1} = a)",
            "({x = 1, y = 2, z = 3} = a)",
        ]);

        itParsesAndPrints("Rest elements", [
            "({...x} = a)",
            "({x, y, ...z} = a)",
            "({b: x, c: y, ...z} = a)",
            "({x = 1, y = 2, ...z} = a)",
        ]);

        itParsesAndPrints("Assignment patterns", [
            "({b: x = 1} = a)",
            "({b: x = 1, c: y = 2, d: z = 3} = a)",
            "({'x x': x = 1} = a)",
            "({'x x': x = 1, 'y y': y = 2, 'z z': z = 3} = a)",
            "({1: x = 2} = a)",
            "({1: x = 2, 3: y = 4, 5: z = 6} = a)",
            "({1n: x = 2} = a)",
            "({1n: x = 2, 3n: y = 4, 5n: z = 6} = a)",
            "({ [xx]: x = 1 } = a)",
            "({ [xx]: x = 1, [yy]: y = 2, [zz]: z = 3 } = a)",
            "({ [1]: x = 2 } = a)",
            "({ [1]: x = 2, [3]: y = 4, [5]: z = 6} = a)",
            "({b: x = 1, c: y = 2, ...z} = a)",
        ]);

        itParsesAndPrints("Expression patterns", [
            "({b: x.c} = a)",
            "({b: x.c.d.e} = a)",
            "({b: x.c, d: y.e, f: z.g} = a)",
            "({b: x.c, d: y.e, ...z.g} = a)",
            "({'x x': x.b} = a)",
            "({'x x': x.b, 'y y': y.c, 'z z': z.d} = a)",
            "({1: x.b} = a)",
            "({1: x.b, 2: y.c, 3: z.d} = a)",
            "({1n: x.b} = a)",
            "({1n: x.b, 2n: y.c, 3n: z.d} = a)",
            "({ [xx]: x.b } = a)",
            "({ [xx]: x.b, [yy]: y.c, [zz]: z.d} = a)",
            "({ [1]: x.b } = a)",
            "({ [1]: x.b, [2]: y.c, [3]: z.d} = a)",
        ]);
    });

    itParsesAndPrints("combination of patterns", [
        `[
            {
                b,
                c: d,
                e: [
                    , ,
                    {f, g: h.i = 1},
                    ,
                    ...{j, k: l.m.n, o: p = 2}
                ],
                ...{q, r: s, ...t}
            },
            [u],
            [
                v,
                , ,
                w = 3,
                , ,
                {x: {y}},
                , ,
                ...z
            ]
        ] = a`,
    ]);
});

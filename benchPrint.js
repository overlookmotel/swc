"use strict";

const b = require("benny"),
    { readFile } = require("fs/promises"),
    pathJoin = require("path").join,
    expect = require("expect"),
    filesize = require("filesize");

const { parseSync, printSync, printSyncFromBuffer } = require("./index.js"),
    serialize = require("./deserialize/serialize.js"),
    babelParse = require("@babel/parser").parse,
    babelGenerate = require("@babel/generator").default;

function printSyncViaBuffer(ast, options) {
    const buff = serialize(ast);
    return printSyncFromBuffer(buff, options);
}

async function run() {
    // Get input code
    // const filename = 'react-jsx-runtime.production.min.js';
    // const filename = 'react.development.js';
    const filename = "react.production.min.js";

    const sourceMaps = false;
    const parseOptions = { isModule: false };
    const printOptions = { sourceMaps };

    const code = await readFile(
        pathJoin(__dirname, "node_modules/react/cjs", filename),
        "utf8"
    );

    // Check print via buffer produces same result as `printSync()`
    const ast = parseSync(code, parseOptions),
        printedOrig = printSync(ast, printOptions),
        printedViaBuffer = printSyncViaBuffer(ast, printOptions);
    assertEqual(printedViaBuffer, printedOrig);

    // Get Babel AST
    const astBabel = babelParse(code);

    // Run benchmark
    await b.suite(
        `${filename} (${filesize(code.length)}) (${
            sourceMaps ? "with" : "without"
        } sourcemaps)`,

        b.add("SWC print", () => {
            printSync(ast, printOptions);
        }),

        b.add("SWC print via buffer", () => {
            printSyncViaBuffer(ast, printOptions);
        }),

        b.add("Babel print", () => {
            babelGenerate(astBabel, { sourceMaps, sourceFileName: "foo.js" });
        }),

        b.cycle(),
        b.complete(),

        b.save({
            file: "reactPrint",
            folder: __dirname,
            details: true,
            format: "chart.html",
        })
    );
}

run().catch((e) => {
    console.log("ERROR:", e); // eslint-disable-line no-console
});

// Strip extra properties off Jest's error object for comprehensible output
function assertEqual(val1, val2) {
    try {
        expect(val1).toStrictEqual(val2);
        expect(JSON.stringify(val1)).toBe(JSON.stringify(val2));
    } catch (err) {
        throw new Error(err.message);
    }
}

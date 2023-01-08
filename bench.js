"use strict";

const b = require("benny"),
    { readFile } = require("fs/promises"),
    pathJoin = require("path").join,
    expect = require("expect"),
    filesize = require("filesize");

const {
        parseSync,
        parseSyncToBuffer,
        parseSyncNoReturn,
        parseSyncToBufferNoReturn,
        parseSyncRkyvNoBuffer,
        parseSyncNoSerialization,
    } = require("./index.js"),
    parseSyncBinding = require("./binding.js").parseSync,
    deserialize = require("./deserialize/deserialize.js"),
    babelParse = require("@babel/parser").parse,
    acornParse = require("acorn").parse;

function parseSyncViaBuffer(code, options) {
    const buff = parseSyncToBuffer(code, options);
    return deserialize(buff);
}

function parseSyncRawJson(code, options, filename) {
    options = options || { syntax: "ecmascript" };
    options.syntax = options.syntax || "ecmascript";
    return parseSyncBinding(
        code,
        Buffer.from(JSON.stringify(options)),
        filename
    );
}

async function run() {
    // Get input code
    // const filename = 'react-jsx-runtime.production.min.js';
    // const filename = 'react.development.js';
    const filename = "react.production.min.js";

    const parseOptions = { isModule: false };

    const code = await readFile(
        pathJoin(__dirname, "node_modules/react/cjs", filename),
        "utf8"
    );

    // Check buffer parser produces same result as `parseSync()`
    const astOrig = conformSpans(parseSync(code, parseOptions)),
        astViaBuffer = conformSpans(parseSyncViaBuffer(code, parseOptions));
    assertEqual(astViaBuffer, astOrig);

    // Run benchmark
    await b.suite(
        `${filename} (${filesize(code.length)})`,

        // Parse
        b.add("SWC", () => {
            parseSync(code, parseOptions);
        }),

        b.add("SWC with buffer serialization and deserialization", () => {
            parseSyncViaBuffer(code, parseOptions);
        }),

        b.add("SWC with buffer serialization but no deserialization", () => {
            parseSyncToBuffer(code, parseOptions);
        }),

        b.add(
            "SWC with buffer serialization but buffer not returned to JS",
            () => {
                parseSyncToBufferNoReturn(code, parseOptions);
            }
        ),

        b.add("SWC with RKYV serialization but not converted to buffer", () => {
            parseSyncRkyvNoBuffer(code, parseOptions);
        }),

        b.add("SWC with no serialization or deserialization", () => {
            parseSyncNoSerialization(code, parseOptions);
        }),

        b.add("SWC with JSON serialization but no deserialization", () => {
            parseSyncRawJson(code, parseOptions);
        }),

        b.add("SWC with JSON serialization but JSON not returned to JS", () => {
            parseSyncNoReturn(code, parseOptions);
        }),

        b.add("Babel", () => {
            babelParse(code);
        }),

        b.add("Acorn", () => {
            acornParse(code, { ecmaVersion: 2022 });
        }),

        b.cycle(),
        b.complete(),

        // Setting `async` to `true` inserts a pause between cycles.
        // Without this, every run comes straight after the last synchronously
        // which prevents any garbage collection at all. The increased memory usage
        // produces slower performance, so the benchmark is unrealistic.
        // A "cycle" is not a single execution of a bench function, but a batch of
        // a few hundred. This is how benchmark.js works.
        // So it's still using more memory than is realistic. In an async program,
        // memory would likely get freed earlier.
        b.configure({
            cases: {
                async: true,
            },
        }),

        b.save({
            file: "react",
            folder: __dirname,
            details: true,
            format: "chart.html",
        })
    );
}

run().catch((e) => {
    console.log("ERROR:", e); // eslint-disable-line no-console
});

// Make all spans relative to zero = start of file
function conformSpans(ast) {
    const offset = ast.span.start;
    function conformNode(node) {
        if (node.span) {
            node.span.start -= offset;
            node.span.end -= offset;
        }
        for (const [key, child] of Object.entries(node)) {
            if (key === "span") continue;
            if (!child || typeof child !== "object") continue;
            if (Array.isArray(child)) {
                child.forEach(conformNode);
            } else if (
                (key === "await" && node.type === "ForOfStatement") ||
                (key === "questionDotToken" &&
                    node.type === "OptionalChainingExpression") ||
                (key === "rest" && node.type === "RestElement") ||
                (key === "spread" &&
                    (node.type === "SpreadElement" ||
                        (Object.keys(node).length === 2 && node.expression)))
            ) {
                // Special cases for:
                // - `ForOfStatement` which has an additional span under `await` key
                // - `OptionalChainingExpression` which has an additional span under `questionDotToken` key
                // - `RestElement` which has an additional span under `rest` key
                // - `SpreadElement` which has an additional span under `spread` key
                // - `ExpressionOrSpread` which may have a span under `spread` key
                child.start -= offset;
                child.end -= offset;
            } else {
                conformNode(child);
            }
        }
    }
    conformNode(ast);
    return ast;
}

// Strip extra properties off Jest's error object for comprehensible output
function assertEqual(val1, val2) {
    try {
        expect(val1).toStrictEqual(val2);
        expect(JSON.stringify(val1)).toBe(JSON.stringify(val2));
    } catch (err) {
        throw new Error(err.message);
    }
}

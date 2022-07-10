"use strict";

// Fill buffers with zeros to allow comparison of buffers
// without failure due to random uninitialized bytes
const { allocUnsafeSlow } = Buffer;
Buffer.allocUnsafeSlow = (...args) => allocUnsafeSlow(...args).fill(0);

// Imports
const {
    parseSync,
    parseSyncToBuffer,
    printSync,
    printSyncFromBuffer,
    transformSync,
    transformSyncFromBuffer,
} = require("../../index.js"),
    deserialize = require("../deserialize.js"),
    serialize = require("../serialize.js");

// Replace `finalizeJsWord()` with a version of function which zeros out unallocated bytes.
// This allows comparison of buffers without failure due to random uninitialized bytes.
serialize.replaceFinalizeJsWord();

// Create `itParsesAndPrints()` + `itParsesAndPrintsOne()` test functions
module.exports = {
    itParsesAndPrints: wrapTestFunction(itParsesAndPrints),
    itParsesAndPrintsOne: wrapTestFunction(itParsesAndPrintsOne),
    getOptions
};

/**
 * Test that group of code samples can be parsed and printed successfully.
 * @param {Function} describeWrapped - Jest `describe` function
 * @param {string} groupName - Test group name
 * @param {Object} [options] - Options object
 * @param {Array<string>} codes - Array of input code samples
 * @returns {undefined}
 */
function itParsesAndPrints(describeWrapped, groupName, options, codes) {
    if (Array.isArray(options)) {
        codes = options;
        options = undefined;
    }

    describeWrapped(groupName, () => {
        for (const code of codes) {
            const testName = code.replace(/\s+/g, " ");
            itParsesAndPrintsOne(describe, testName, code, options);
        }
    });
}

/**
 * Test that code sample can be parsed and printed successfully.
 * @param {Function} describeWrapped - Jest `describe` function
 * @param {string} testName - Test name
 * @param {string} code - Input code sample
 * @param {Object} [options] - Options object
 * @returns {undefined}
 */
function itParsesAndPrintsOne(describeWrapped, testName, code, options) {
    if (options) testName += ` (${JSON.stringify(options).replace(/"/g, "")})`;

    const { noPrint, noTransform, parseOptions, transformOptions } = getOptions(options);

    describeWrapped(testName, () => {
        // Test `deserialize(parseSyncToBuffer())` produces identical AST
        // to what original SWC `parseSync()` produces
        it("parses", () => {
            const astOld = parseSync(code, parseOptions),
                ast = deserialize(parseSyncToBuffer(code, parseOptions));

            expect(conformSpans(ast)).toStrictEqual(conformSpans(astOld));
            expect(JSON.stringify(ast)).toBe(JSON.stringify(astOld));
        });

        // Test `serialize()` produces identical buffer to what `parseSyncToBuffer()` produced
        it("serializes", () => {
            const buff = parseSyncToBuffer(code, parseOptions),
                ast = deserialize(buff);

            serialize.resetBuffers();
            const buff2 = serialize(ast);
            expect(buffToString(buff2)).toEqual(buffToString(buff));
        });

        // Test `printSyncFromBuffer()` produces same output as original SWC `printSync()`
        (noPrint ? it.skip : it)("prints", () => {
            const printOptions = { sourceMaps: true };

            const astOld = parseSync(code, parseOptions),
                printedOld = printSync(astOld, printOptions);

            const ast = deserialize(parseSyncToBuffer(code, parseOptions)),
                printed = printSyncFromBuffer(serialize(ast), printOptions);

            expect(printed).toStrictEqual(printedOld);
        });

        // Test transform via buffer produces same result as `transformSync()`
        (noTransform ? it.skip : it)("transforms", () => {
            const transformedOld = transformSync(code, { ...transformOptions, plugin: ast => ast });

            const ast = deserialize(parseSyncToBuffer(code, options)),
                transformed = transformSyncFromBuffer(serialize(ast), transformOptions);

            expect(transformed).toStrictEqual(transformedOld);
            expect(JSON.stringify(transformed)).toBe(JSON.stringify(transformedOld));
        });
    });
}

/**
 * Get parse and transform options from test function options.
 * @param {Object} options - Options object
 * @returns {Object} - Parse and transform options
 */
function getOptions(options) {
    let { noPrint, noTransform, transform: transformOptions, ...parseOptions } = options || {};

    transformOptions = {
        sourceMaps: true,
        isModule: parseOptions.isModule,
        ...transformOptions,
        jsc: {
            parser: parseOptions,
            target: parseOptions.target,
            ...transformOptions?.jsc
        }
    };

    return { noPrint, noTransform, parseOptions, transformOptions };
}

/**
 * Wrap test function to add `.only` and `.skip` methods (like Jest's `describe`).
 * @param {Function} test - Test function
 * @returns {Function} - Wrapped test function
 */
function wrapTestFunction(test) {
    const wrapped = (...args) => test(describe, ...args);
    wrapped.only = (...args) => test(describe.only, ...args);
    wrapped.skip = (...args) => test(describe.skip, ...args);
    return wrapped;
}

/**
 * Stringify buffer.
 * Pretty-print content as hex, with lines 16 bytes long,
 * and with position at start of each line.
 * @param {Buffer} buff - Buffer
 * @returns {string}
 */
function buffToString(buff) {
    const str = buff.toString("hex");
    let out = "";
    for (let pos = 0; pos < str.length; pos += 8) {
        if (pos % 32 === 0) {
            if (pos !== 0) out += "\n";
            out += `[${`${pos / 2}`.padStart(5, "0")}]`;
        }
        out += " " + str.slice(pos, pos + 8);
    }
    return out;
}

/**
 * Conform all spans to be relative to zero = start of file.
 * Mutates the input AST.
 * @param {Object} ast - AST
 * @returns {Object} - Input AST mutated
 */
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
                for (const childNode of child) {
                    if (childNode) conformNode(childNode);
                }
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

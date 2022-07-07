"use strict";

// Modules
const { readFileSync } = require("fs"),
    pathJoin = require("path").join;

// Imports
const { itParsesAndPrintsOne } = require("./utils.js");

// Tests

describe("example files", () => {
    for (const filename of [
        "react/cjs/react.production.min.js",
        "react/cjs/react.development.js",
        "react/cjs/react-jsx-runtime.production.min.js",
    ]) {
        const code = readFileSync(
            pathJoin(__dirname, "../../node_modules", filename),
            "utf8"
        );
        itParsesAndPrintsOne(filename, code, { isModule: false });
    }
});

"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("Program", () => {
    itParsesAndPrints("Module", { isModule: true }, [
        "",
        "const x = 1",
        "#!node\nconst x = 1",
        "#!/usr/bin/env node\nconst x = 1",
    ]);

    itParsesAndPrints("Script", { isModule: false }, [
        "",
        "const x = 1",
        "#!node\nconst x = 1",
        "#!/usr/bin/env node\nconst x = 1",
    ]);
});

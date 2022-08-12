"use strict";

// Modules
const { readdirSync, readFileSync } = require("fs"),
    { join: pathJoin, extname } = require("path");

// Imports
const { itParsesAndPrintsOne, getOptions } = require("./utils.js"),
    { parseSync, transformSync } = require("../../index.js");

// Tests

const describeIfNotSkipped = process.env.SKIP_FIXTURES ? describe.skip : describe;

const rootPath = pathJoin(__dirname, "../..");
const fixturePaths = [];
getFixtures("");

function getFixtures(dirPath) {
    const files = readdirSync(pathJoin(rootPath, dirPath), { withFileTypes: true });
    for (const file of files) {
        if (file.name.startsWith(".")) continue;

        const path = pathJoin(dirPath, file.name);
        if (file.isDirectory()) {
            // Skip fixtures - they've tested in `fixtures.test.js`
            if (file.name === "node_modules" || /^fixtures?/.test(file.name)) continue;
            getFixtures(path);
        } else if (
            file.isFile()
            && [".ts", ".tsx"].includes(extname(path))
            && ![
                // Fails to parse with error "not implemented: JSXNamespacedName -> JSXObject"
                // TODO Remove this exclusion once implemented
                "crates/swc_ecma_parser/tests/tsc/checkJsxNamespaceNamesQuestionableForms.tsx",
                // Numeric literals equivalent to Infinity
                // https://github.com/swc-project/swc/issues/5167
                // TODO Remove this exclusion once fixed
                "crates/swc_ecma_parser/tests/tsc/binaryIntegerLiteral.ts",
                "crates/swc_ecma_parser/tests/tsc/binaryIntegerLiteralES6.ts",
                "crates/swc_ecma_parser/tests/tsc/octalIntegerLiteral.ts",
                "crates/swc_ecma_parser/tests/tsc/octalIntegerLiteralES6.ts",
                // Floating point inaccuracy in current SWC
                // TODO Remove this exclusion once fixed
                "crates/swc_ecma_parser/tests/typescript/stc/0001/input.ts"
            ].includes(path)
        ) {
            fixturePaths.push(path);
        }
    }
}

describeIfNotSkipped("TypeScript example files", () => {
    for (const path of fixturePaths) {
        const code = readFileSync(pathJoin(rootPath, path), "utf8");

        let options;
        try {
            const transformOptions = JSON.parse(readFileSync(pathJoin(dirname(path), ".swcrc"), "utf8"));
            if (Array.isArray(transformOptions)) throw new Error("Bad options");

            options = {
                ...transformOptions?.jsc?.parser,
                transform: transformOptions
            };
            if (transformOptions.jsc?.target) options.target = transformOptions.jsc.target;
        } catch (e) { }

        if (!options) {
            options = {
                syntax: "typescript",
                tsx: extname(path) === ".tsx"
                    || path === "crates/swc_ecma_parser/tests/typescript/type-arguments/tsx/input.ts"
                    || path.startsWith("crates/swc_ecma_parser/tests/typescript/tsx/"),
                decorators: true,
                target: "es2022"
            };
        }

        if ([
            // Skip print on files which fail with error "not implemented: emit_ts_ns_decl"
            // TODO Remove this exclusion once TS Namespace Declarations are implemented
            "crates/swc_ecma_parser/tests/tsc/ClassAndModuleWithSameNameAndCommonRoot.ts",
            "crates/swc_ecma_parser/tests/tsc/ClassAndModuleWithSameNameAndCommonRootES6.ts",
            "crates/swc_ecma_parser/tests/tsc/ModuleAndClassWithSameNameAndCommonRoot.ts",
            "crates/swc_ecma_parser/tests/tsc/TwoInternalModulesThatMergeEachWithExportedAndNonExportedClassesOfTheSameName.ts",
            "crates/swc_ecma_parser/tests/tsc/TwoInternalModulesThatMergeEachWithExportedAndNonExportedInterfacesOfTheSameName.ts",
            "crates/swc_ecma_parser/tests/tsc/TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.ts",
            "crates/swc_ecma_parser/tests/tsc/TwoInternalModulesThatMergeEachWithExportedInterfacesOfTheSameName.ts",
            "crates/swc_ecma_parser/tests/tsc/TwoInternalModulesThatMergeEachWithExportedModulesOfTheSameName.ts",
            "crates/swc_ecma_parser/tests/tsc/asiPreventsParsingAsNamespace05.ts",
            "crates/swc_ecma_parser/tests/tsc/enumMerging.ts",
            "crates/swc_ecma_parser/tests/tsc/invalidNestedModules.ts",
            "crates/swc_ecma_parser/tests/tsc/nameCollision.ts",
            "crates/swc_ecma_parser/tests/tsc/nestedModules.ts",
            "crates/swc_ecma_parser/tests/tsc/parserModuleDeclaration12.ts",
            "crates/swc_ecma_parser/tests/tsc/parserModuleDeclaration7.ts",
            "crates/swc_ecma_parser/tests/tsc/parserModuleDeclaration8.ts",
            "crates/swc_ecma_parser/tests/tsc/parserModuleDeclaration9.ts",
            "crates/swc_ecma_parser/tests/tsc/parserRealSource13.ts",
            "crates/swc_ecma_parser/tests/tsc/parserSuperExpression1.ts",
            "crates/swc_ecma_parser/tests/tsc/parserSuperExpression4.ts",
            "crates/swc_ecma_parser/tests/tsc/tsxOpeningClosingNames.tsx",
            "crates/swc_ecma_parser/tests/tsc/typeGuardsInFunctionAndModuleBlock.ts",
            "crates/swc_ecma_parser/tests/tsc/typeGuardsInModule.ts",
            "crates/swc_ecma_parser/tests/typescript/module-namespace/head/input.ts",
            "crates/swc_ecma_parser/tests/typescript/module-namespace/head-declare/input.ts",
            "crates/swc_ecma_parser/tests/typescript/module-namespace/head-export/input.ts",
            // Skip print on file which fails with error
            // "not implemented: JSXNamespacedName -> JSXObject"
            // TODO Remove this exclusion once implemented
            "crates/swc_ecma_parser/tests/tsc/checkJsxIntersectionElementPropsType.tsx"
        ].includes(path)) options.noPrint = true;

        // Skip any files which existing SWC parser cannot parse.
        // Some TS files contain intentionally invalid code.
        try {
            parseSync(code, options);
        } catch (e) {
            continue;
        }

        // Skip transform of any files which existing SWC cannot transform.
        // Some TS files contain intentionally invalid code.
        const { transformOptions } = getOptions(options);
        try {
            transformSync(code, transformOptions);
        } catch (e) {
            options.noTransform = true;
        }

        itParsesAndPrintsOne(path, code, options);
    }
});

"use strict";

// Modules
const { readdirSync, readFileSync } = require("fs"),
    { join: pathJoin, extname, dirname } = require("path");

// Imports
const { itParsesAndPrintsOne } = require("./utils.js");

// Tests

const describeIfNotSkipped = process.env.SKIP_FIXTURES ? describe.skip : describe;

const rootPath = pathJoin(__dirname, '../..');
const fixturePaths = [];
getFixtures('', false);

function getFixtures(dirPath, inFixtures) {
    const files = readdirSync(pathJoin(rootPath, dirPath), { withFileTypes: true });
    for (const file of files) {
        if (file.name.startsWith('.')) continue;

        const path = pathJoin(dirPath, file.name);
        if (file.isDirectory()) {
            if (['node_modules', 'output'].includes(file.name)) continue;
            getFixtures(path, inFixtures || /^fixtures?$/.test(file.name));
        } else if (
            inFixtures
            && file.isFile()
            && ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs'].includes(extname(path))
            && !/^output(\.[a-z]+)?\.[mc]?js$/.test(file.name)
            // Not possible to parse as uses `import` (ESM only = strict mode)
            // and also legacy octal escape string (sloppy mode only)
            && path !== 'crates/swc_ecma_codegen/tests/fixture/string/input.js'
            // Not possible to parse due to illegal `const` syntax
            && path !== 'crates/swc/tests/fixture/issues-3xxx/3882/input/types.d.ts'
        ) {
            fixturePaths.push(path);
        }
    }
}

describeIfNotSkipped("Fixtures", () => {
    for (const path of fixturePaths) {
        const ext = extname(path);
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
            const isTs = ['.ts', '.tsx'].includes(ext)
                && dirname(path) !== 'crates/swc_bundler/tests/fixture/deno-8584/input'
                && path !== 'crates/swc_bundler/tests/fixture/deno-8545/simplified-1/input/entry.ts';

            options = {
                isModule: ['.mjs', '.ts', '.tsx'].includes(ext)
                    || /(^|\n)(import|export|await) /.test(code)
                    || /import\.meta/.test(code),
                syntax: isTs ? "typescript" : "ecmascript",
                jsx: ['.jsx', '.tsx'].includes(ext)
                    || path === 'crates/jsdoc/tests/fixtures/jsx.js'
                    || path.startsWith('crates/swc_ecma_transforms_react/tests/'),
                ...(
                    isTs
                        ? { tsx: ext === '.tsx', decorators: true }
                        : { target: 'es2022', importAssertions: true }
                )
            };
        }

        // Skip print on this file as fails with error "not implemented: emit_ts_ns_decl"
        // TODO Remove this exclusion once TS Namespace Declarations are implemented
        if (path === 'crates/swc_ecma_transforms_typescript/tests/fixture/issue-3454/1/input.ts') {
            options.noPrint = true;
        }

        // Skip transform on files where it doesn't work
        if ([
            "crates/swc/tests/fixture/issues-1xxx/1441/input/index.ts",
            "crates/swc/tests/fixture/issues-1xxx/1713/case1/input/index.js",
            "crates/swc/tests/fixture/issues-2xxx/2037/case1/input/index.js",
            "crates/swc/tests/fixture/issues-2xxx/2225/case1/input/index.js",
            "crates/swc/tests/fixture/module/ignore-dynamic/1/input/index.js",
            "crates/swc_ecma_codegen/tests/fixture/template-literal/input.js",
            "crates/swc_ecma_transforms_module/tests/fixture/common/ignore-dynamic/1/input.js",
            "crates/swc_ecma_transforms_module/tests/fixture/common/issue-2549/input.js",
            "crates/swc_ecma_transforms_module/tests/fixture/common/misc/import-const-throw/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react/should-disallow-spread-children/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react-automatic/should-disallow-spread-children/input.js",
            // https://github.com/swc-project/swc/issues/5168
            // TODO Remove this exclusion once fixed
            "crates/swc/tests/fixture/issues-1xxx/1812/case1/input/input.js",
            "crates/swc/tests/fixture/issues-5xxx/5102/input/index.js",
            "crates/swc_bundler/tests/fixture/deno-8627/input/entry.ts"
        ].includes(path)) {
            options.noTransform = true;
        }

        // Disable throwing errors for JSX namespaces
        if ([
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react/should-disallow-xml-namespacing/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react/should-support-xml-namespaces-if-flag/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react/should-throw-error-namespaces-if-not-flag/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react-automatic/should-disallow-xml-namespacing/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react-automatic/should-support-xml-namespaces-if-flag/input.js",
            "crates/swc_ecma_transforms_react/tests/jsx/fixture/react-automatic/should-throw-error-namespaces-if-not-flag/input.js"
        ].includes(path)) {
            options.transform = { jsc: { transform: { react: { throwIfNamespace: false } } } };
        }

        itParsesAndPrintsOne(path, code, options);
    }
});

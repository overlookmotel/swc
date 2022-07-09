"use strict";

// Modules
const { readdirSync, readFileSync } = require("fs"),
    { join: pathJoin, extname, dirname } = require("path");

// Imports
const { itParsesAndPrintsOne } = require("./utils.js");

// Tests

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

describe("Fixtures", () => {
    for (const path of fixturePaths) {
        const ext = extname(path);
        const code = readFileSync(pathJoin(rootPath, path), "utf8");

        let options;
        if (dirname(path).endsWith('/input')) {
            try {
                const { jsc } = JSON.parse(readFileSync(pathJoin(dirname(path), '.swcrc'), 'utf8'));
                options = jsc.parser;
                if (options && jsc.target) options.target = jsc.target;
            } catch (e) { }
        }

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

        itParsesAndPrintsOne(path, code, options);
    }
});

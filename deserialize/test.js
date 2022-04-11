'use strict';

// Imports
const { parseSync, parseSyncToBuffer } = require('../index.js'),
	deserializeBuffer = require('./index.js');

// Tests

describe('Parses correctly', () => {
	describe('Program', () => {
		itParses('Module', { isModule: true }, [
			// TODO Tests for `interpreter`
			'',
			'const x = 1'
		]);

		itParses('Script', { isModule: false }, [
			// TODO Tests for `interpreter`
			'',
			'const x = 1'
		]);
	});

	describe('Statements', () => {
		itParses('Variable declarations', [
			'var x',
			'let x',
			'const x = 1',
			'var x = 1',
			'let x = 1',

			'let x, y, z',
			'let x = 1, y, z',
			'let x, y = 1, z',
			'let x, y, z = 1',
			'let x = 1, y = 2, z = 3',

			'let x; let y; let z;',
			'let x = 1; let y = 2; let z = 3;'
		]);

		itParses('Block statements', [
			'{}',
			'{ let x; }',
			'{ let x; let y; }'
		]);

		itParses('Empty statements', [
			';',
			';;;'
		]);

		itParses('`debugger` statements', [
			'debugger',
			'debugger; debugger; debugger'
		]);

		itParses('`with` statements', { isModule: false }, [
			'with (1) {}',
			'with (1) ;',
			'with (1) {}; with (2) ; with (3) {}'
		]);

		itParses('`return` statements', [
			'function f() { return; }',
			'function f() { return 1; }',
			'function f() { return; return; return; }',
			'function f() { return 1; return 2; return 3; }'
		]);

		itParses('Labeled statements', [
			'a: ;',
			'a: {}',
			'a: { let x; let y; }',
			'label_name_longer_than_7_chars: { let x; }',
			'a: b: c: ;',
			'a: label_name_longer_than_7_chars: c: ;',
			'a: label_name_longer_than_7_chars: c: { let x; let y; }'
		]);

		itParses('`break` statements', [
			'a: break;',
			'a: break a;',
			'label_name_longer_than_7_chars: break;',
			'label_name_longer_than_7_chars: break label_name_longer_than_7_chars;',
			'a: b: c: break a;'
		]);

		itParses('`continue` statements', [
			'while (1) { continue; }',
			'a: while (1) { continue a; }',
			'label_name_longer_than_7_chars: while (1) { continue label_name_longer_than_7_chars; }',
			'a: b: c: while (1) { continue a; continue b; continue c; }'
		]);

		itParses('`if` statements', [
			'if (1) ;',
			'if (1) {}',
			'if (1) { let x = 2; }',
			'if (1) ; else ;',
			'if (1) { let x = 2; } else { let y = 3; }'
		]);

		itParses('`switch` statements', [
			'switch (x) {}',
			'switch (x) { case 1: let x = 1; }',
			'switch (x) { default: let x = 1; }',
			`switch (x) {
				case 1:
					let x = 1;
				case 2:
					let y = 2;
					break;
				default:
					let z = 3;
			}`
		]);

		itParses('`throw` statements', [
			'throw 1',
			'throw 1; throw 2; throw 3;'
		]);

		itParses('`try` statements', [
			'try {} catch {}',
			'try {} catch (e) {}',
			'try {} finally {}',
			`try {
				throw 1;
			} catch (e) {
				let x = e;
			} finally {
				let y = 2;
			}`
		]);

		itParses('`while` statements', [
			'while (1) ;',
			'while (1) {}',
			`while (1) {
				if (1) break;
				continue;
			}`
		]);

		itParses('`do ... while` statements', [
			'do ; while (1)',
			'do {} while (1)',
			`do {
				if (1) break;
				continue;
			} while (1);`
		]);

		itParses('`for` statements', [
			'for (;;) ;',
			'for (x; y; z) ;',
			'for (let x = 1; x; x) ;',
			`for (let x = 1; x; x) {
				if (x) break;
				continue;
			}`
		]);

		itParses('`for (... in ...)` statements', [
			'for (x in y) ;',
			'for (let x in y) ;',
			`for (let x in y) {
				if (x) break;
				continue;
			}`
		]);

		itParses('`for (... of ...)` statements', [
			'for (x of y) ;',
			'for (let x of y) ;',
			`for (let x of y) {
				if (x) break;
				continue;
			}`,
			`for await (let x of y) ;`,
			`for await (let x of y) {}`
		]);

		itParses('Expression statements', [
			'x',
			'1'
		]);
	});

	describe('Expressions', () => {
		itParses('`this` expressions', [
			'this',
			'this; this; this;'
		]);

		itParses('Array expressions', [
			'[]',
			'[1]',
			'[1, 2, 3]',
			'[x, y, z]',
			'[, , ,]',
			'[x, , z]',
			'[, , x, , , , y, , , z, , ]',
			'[...x]',
			'[x, y, ...z]',
			'[, , x, , , y, , , ...z]'
		]);

		describe('Object expressions', () => {
			itParses('Shortcut notation', [
				'({})',
				'({x})',
				'({x, y, z})',
				'({prop_name_longer_than_7_chars})',
				`({
					prop_name_longer_than_7_chars,
					prop_name_longer_than_7_chars2,
					prop_name_longer_than_7_chars3
				})`
			]);

			itParses('Properties', [
				'({x: xx})',
				'({x: xx, y: yy, z: zz})',
				'({x: 1})',
				'({x: 1, y: 2, z: 3})',
				"({'x x': 1})",
				"({'x x': 1, 'y y': 2, 'z z': 3})",
				'({1: 2})',
				'({1: 2, 3: 4, 5: 6})',
				// TODO Tests for BigInt keys
				'({ [x]: 1 })',
				'({ [x]: 1, [y]: 2, [z]: 3 })',
				'({ [1]: 2 })',
				'({ [1]: 2, [3]: 4, [5]: 6 })'
			]);

			itParses('Spread', [
				'({ ...x })',
				'({ ...x, ...y, ...z })',
				'({ ...1 })',
				'({ ...1, ...2, ...3 })',
				'({ x, ...y, z })',
				'({ x: xx, ...y, z: zz })',
				'({ ...x, y, ...z })',
				'({ ...x, y: yy, ...z })'
			]);

			itParses('Getter properties', [
				'({ get x() {} })',
				'({ get x() {}, get y() {}, get z() {} })',
				'({ get x() { return 1; } })',
				`({
					get x() { return 1; },
					get y() { return 2; },
					get z() { return 3; }
				})`,
				"({ get 'x x'() {} })",
				`({
					get 'x x'() { return 1; },
					get 'y y'() { return 2; },
					get 'z z'() { return 3; }
				})`,
				'({ get 1() {} })',
				`({
					get 1() { return 2; },
					get 3() { return 4; },
					get 5() { return 6; }
				})`,
				// TODO Tests for BigInt keys
				'({ get [x]() { return 1; } })',
				`({
					get [x]() { return 1; },
					get [y]() { return 2; },
					get [z]() { return 3; }
				})`,
				`({
					get [1]() { return 2; },
					get [3]() { return 4; },
					get [5]() { return 6; }
				})`
			]);

			itParses('Setter properties', [
				'({ set x(v) {} })',
				'({ set x(v) {}, set y(v2) {}, set z(v3) {} })',
				'({ set x(v) { this.xx += v; } })',
				`({
					set x(v) { this.xx += v; },
					set y(v2) { this.yy += v2; },
					set z(v3) { this.zz += v3; }
				})`,
				"({ set 'x x'(v) {} })",
				`({
					set 'x x'(v) { this.xx += v; },
					set 'y y'(v2) { this.yy += v2; },
					set 'z z'(v3) { this.zz += v3; }
				})`,
				'({ set 1(v) {} })',
				`({
					set 1(v) { this.xx += v; },
					set 3(v2) { this.yy += v2; },
					set 5(v3) { this.zz += v3; }
				})`,
				// TODO Tests for BigInt keys
				'({ set [x](v) {} })',
				`({
					set [x](v) { this.xx += v; },
					set [y](v2) { this.yy += v2; },
					set [z](v3) { this.zz += v3; }
				})`,
				`({
					set [1](v) { this.xx += v; },
					set [3](v2) { this.yy += v2; },
					set [5](v3) { this.zz += v3; }
				})`
			]);

			itParses('Methods', [
				'({ m() {} })',
				'({ method_name_longer_than_7_chars() {} })',
				'({ m() {}, n() {}, o() {} })',
				`({
					method_name_longer_than_7_chars() {},
					method_name_longer_than_7_chars2() {},
					method_name_longer_than_7_chars3() {}
				})`,
				'({ m() { let x = 1; return x; } })',

				'({ m(x) {} })',
				'({ m(x, y, z) {} })',
				`({
					m(
						param_name_longer_than_7_chars,
						y, z
					) {}
				})`,
				`({
					m(
						param_name_longer_than_7_chars,
						param_name_longer_than_7_chars2,
						param_name_longer_than_7_chars3
					) {}
				})`,
				`({
					method_name_longer_than_7_chars(
						param_name_longer_than_7_chars,
						param_name_longer_than_7_chars2,
						param_name_longer_than_7_chars3
					) {}
				})`,
				'({ m() { let x = 1; } })',
				'({ m() { let x = 1; let y = 2; } })',
				`({
					m(x, y) {
						if (x) return 1;
						if (y) return 2;
						return 3;
					}
				})`,

				'({ *m() {} })',
				'({ async m() {} })',
				'({ async *m() {} })'
			]);
		});

		itParses('Unary expressions', [
			'+1',
			'-1',
			'!1',
			'~1',
			'typeof 1',
			'void 1',
			'delete 1',
			'+1; -1; !1; ~1; typeof 1; void 1; delete 1;'
		]);

		itParses('Update expressions', [
			'x++',
			'x--',
			'++x',
			'--x',
			'x++; x--; ++x; --x;'
		]);

		itParses('Binary expressions', [
			'x == y',
			'x != y',
			'x === y',
			'x !== y',
			'x < y',
			'x <= y',
			'x > y',
			'x >= y',
			'x << y',
			'x >> y',
			'x >>> y',
			'x + y',
			'x - y',
			'x * y',
			'x / y',
			'x % y',
			'x | y',
			'x ^ y',
			'x & y',
			'x || y',
			'x && y',
			'x in y',
			'x instanceof y',
			'x ** y',
			'x ?? y',
			`x == y; x != y; x === y; x !== y;
			x < y; x <= y; x > y; x >= y; x << y; x >> y; x >>> y;
			x + y; x - y; x * y; x / y; x % y; x | y; x ^ y; x & y;
			x || y; x && y; x in y; x instanceof y; x ** y; x ?? y`
		]);

		itParses('Assignment expressions', [
			// TODO Add test cases for where left side is a pattern e.g. `[x] = y`
			'x = 1',
			'x += 1',
			'x -= 1',
			'x *= 1',
			'x /= 1',
			'x %= 1',
			'x <<= 1',
			'x >>= 1',
			'x >>>= 1',
			'x |= 1',
			'x ^= 1',
			'x &= 1',
			'x **= 1',
			'x &&= 1',
			'x ||= 1',
			'x ??= 1',
			`x = 1; x += 1; x -= 1; x *= 1; x /= 1; x %= 1;
			x <<= 1; x >>= 1; x >>>= 1; x |= 1; x ^= 1; x &= 1;
			x **= 1; x &&= 1; x ||= 1; x ??= 1`
		]);

		itParses('Member expressions', [
			'x.y',
			'x.#y',
			'x[y]',
			'x[1]',
			'x[y + z]',
			"x['foo bar']",
			"x['foo bar qux']",
			'x.y.z',
			'x.#y.z',
			"x.#y[1][2][3].z['foo']['bar qux'][a + 3]"
		]);

		itParses('Conditional expressions', [
			'x ? y : z',
			'1 ? 2 : 3',
			'x ? 1 : y ? 2 : z ? 3 : 4'
		]);

		itParses('`super` prop expressions', [
			'({ m() { return super.x; } })',
			'({ m() { return super.x(); } })',
			'({ m() { super.x = 1; } })',
			'({ m() { return super[x]; } })',
			'({ m() { return super[x](); } })',
			'({ m() { super[x] = 1; } })',
			'({ m() { return super.x(y, ...z); } })',
			'({ m() { return super[x](y, ...z); } })'
		]);

		itParses('Call expressions', [
			// TODO Tests for `super()` call
			'f()',
			'func_name_longer_than_7_chars()',
			'f(1)',
			'f(x)',
			'f(x, y, z)',
			'f(param_name_longer_than_7_chars)',
			'f(param_name_longer_than_7_chars, x, y)',
			`func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			)`,
			'f(...x)',
			'f(...param_name_longer_than_7_chars)',
			'f(x, y, ...z)',
			'f(x, y, ...param_name_longer_than_7_chars)',
			`func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				...param_name_longer_than_7_chars3
			)`,

			"import(x)",
			"import(param_name_longer_than_7_chars)",
			"import('foo')",
			"import('foo/bar/qux.js')",
			'import(x, y, z)',
			'import(...x)',
			'import(x, y, ...z)'
		]);

		itParses('`new` expressions', [
			'new C()',
			'new Class_name_longer_than_7_chars()',
			'new C(x)',
			'new C(x, y, z)',
			'new C(param_name_longer_than_7_chars)',
			'new C(param_name_longer_than_7_chars, x, y)',
			`new Class_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			)`,
			'new C(...x)',
			'new C(...param_name_longer_than_7_chars)',
			'new C(x, y, ...z)',
			'new C(x, y, ...param_name_longer_than_7_chars)',
			`new Class_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				...param_name_longer_than_7_chars3
			)`
		]);

		itParses('Sequence expressions', [
			'x, x',
			'x, x, x',
			'1, 1',
			'1, 1, 1'
		]);

		itParses('Template literals', [
			'``',
			'`a`',
			'`str_longer_than_7_chars`',
			'`${x}`',
			'`${x}${y}${z}`',
			'`${x}a${y}b${z}`',
			'`a${x}b${y}c${z}d`',
			'`str_longer_than_7_chars${x}str_longer_than_7_chars2${y}str_longer_than_7_chars3${z}str_longer_than_7_chars4`',
			// Multi-line
			['`', 'a', '${x}', 'b', '${y}', 'c', '${z}', 'd', '`'].join('\n')
		]);

		itParses('Tagged template expressions', [
			'f``',
			'f`a`',
			'f`str_longer_than_7_chars`',
			'f`${x}`',
			'f`${x}${y}${z}`',
			'f`${x}a${y}b${z}`',
			'f`a${x}b${y}c${z}d`',
			'f`str_longer_than_7_chars${x}str_longer_than_7_chars2${y}str_longer_than_7_chars3${z}str_longer_than_7_chars4`',
			// Multi-line
			['f`', 'a', '${x}', 'b', '${y}', 'c', '${z}', 'd', '`'].join('\n')
		]);

		itParses('`yield` expressions', [
			'function *f() { yield; }',
			'function *f() { yield x; }',
			'function *f() { yield var_name_longer_than_7_chars; }',
			'function *f() { yield 1; }',
			'function *f() { yield 1; yield 2; yield 3; }',
			'function *f() { yield* x; }',
			'function *f() { yield* var_name_longer_than_7_chars; }',
			'function *f() { yield* 1; }',
			'function *f() { yield* x; yield* y; yield* z; }'
		]);

		describe('Meta properties', () => {
			itParses('new.target', [
				'new.target',
				'function f() { return new.target; }'
			]);

			itParses('import.meta', [
				'import.meta',
				'import.meta.url',
				'import.meta.resolve',
				'import.meta[x]'
			]);
		});

		describe('`await` expressions', () => {
			itParses('top level', { target: 'es2017', topLevelAwait: true }, [
				'await 1;',
				'await x;',
				'await var_name_longer_than_7_chars;'
			]);

			itParses('in functions', [
				'async function f() { await x; await y; await z; }',
				'async function *f() { await x; await y; await z; }'
			]);
		});

		itParses('Parenthesis expressions', [
			'(x)',
			'(1)'
		]);

		itParses('Optional chaining expressions', [
			'x?.y',
			'x?.[y]',
			'x?.[1]',
			'x?.y?.z',
			'x?.[y]?.[z]',
			'x?.[1]?.[2]',
			'var_name_longer_than_7_chars?.prop_name_longer_than_7_chars?.prop_name_longer_than_7_chars2',
			'var_name_longer_than_7_chars?.[var_name_longer_than_7_chars2]?.[var_name_longer_than_7_chars3]',

			'f?.()',
			'func_name_longer_than_7_chars?.()',
			'f?.(1)',
			'f?.(x)',
			'f?.(x, y, z)',
			'f?.(param_name_longer_than_7_chars)',
			'f?.(param_name_longer_than_7_chars, x, y)',
			`func_name_longer_than_7_chars?.(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			)`,
			'f?.(...x)',
			'f?.(...param_name_longer_than_7_chars)',
			'f?.(x, y, ...z)',
			'f?.(x, y, ...param_name_longer_than_7_chars)',
			`func_name_longer_than_7_chars?.(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				...param_name_longer_than_7_chars3
			)`,

			'x.y?.()',
			'var_name_longer_than_7_chars.prop_name_longer_than_7_chars?.()'
		]);
	});

	describe('Patterns', () => {
		itParses('Binding identifiers', [
			'let x;',
			'let var_name_longer_than_7_chars;'
		]);

		describe('Array patterns', () => {
			itParses('simple', [
				'[] = a',
				'[x] = a',
				'[x, y, z] = a',
				'[, , x, , , y, , , z, , ,] = a'
			]);

			itParses('Rest elements', [
				'[...x] = a',
				'[x, y, ...z] = a',
				'[, , ...z] = a',
				'[, , x, , , y, , , ...z] = a'
			]);

			itParses('Assignment patterns', [
				'[x = 1] = a',
				'[x = 1, y = 2, z = 3] = a',
				'[, , x = 1] = a',
				'[, , x = 1, , , y = 2, , , z = 3, , ,] = a',
				'[, , x = 1, , , y = 2, , , ...z] = a'
			]);

			itParses('Expression patterns', [
				'[x.b] = a',
				'[x.b.c.d] = a',
				'[x.b = 1, y.c = 2, z.d = 3] = a',
				'[, , x.b = 1] = a',
				'[, , x.b = 1, , , y.c = 2, , , z.d = 3, , ,] = a',
				'[, , x.b = 1, , , y.c = 2, , , ...z.d] = a'
			]);
		});

		describe('Object patterns', () => {
			itParses('empty', [
				'({} = a)'
			]);

			itParses('Shortcuts', [
				'({x} = a)',
				'({x, y, z} = a)'
			]);

			itParses('Key value patterns', [
				'({b: x} = a)',
				'({b: x, c: y, d: z} = a)',
				"({'x x': x} = a)",
				"({'x x': x, 'y y': y, 'z z': z} = a)",
				'({1: x} = a)',
				'({1: x, 2: y, 3: z} = a)',
				// TODO Tests for BigInt keys
				'({ [xx]: x } = a)',
				'({ [xx]: x, [yy]: y, [zz]: z} = a)',
				'({ [1]: x } = a)',
				'({ [1]: x, [2]: y, [3]: z} = a)'
			]);

			itParses('Assignment pattern properties', [
				'({x = xx} = a)',
				'({x = xx, y = yy, z = zz} = a)',
				'({x = 1} = a)',
				'({x = 1, y = 2, z = 3} = a)'
			]);

			itParses('Rest elements', [
				'({...x} = a)',
				'({x, y, ...z} = a)',
				'({b: x, c: y, ...z} = a)',
				'({x = 1, y = 2, ...z} = a)'
			]);

			itParses('Assignment patterns', [
				'({b: x = 1} = a)',
				'({b: x = 1, c: y = 2, d: z = 3} = a)',
				"({'x x': x = 1} = a)",
				"({'x x': x = 1, 'y y': y = 2, 'z z': z = 3} = a)",
				'({1: x = 2} = a)',
				'({1: x = 2, 3: y = 4, 5: z = 6} = a)',
				// TODO Tests for BigInt keys
				'({ [xx]: x = 1 } = a)',
				'({ [xx]: x = 1, [yy]: y = 2, [zz]: z = 3 } = a)',
				'({ [1]: x = 2 } = a)',
				'({ [1]: x = 2, [3]: y = 4, [5]: z = 6} = a)',
				'({b: x = 1, c: y = 2, ...z} = a)'
			]);

			itParses('Expression patterns', [
				'({b: x.c} = a)',
				'({b: x.c.d.e} = a)',
				'({b: x.c, d: y.e, f: z.g} = a)',
				'({b: x.c, d: y.e, ...z.g} = a)',
				"({'x x': x.b} = a)",
				"({'x x': x.b, 'y y': y.c, 'z z': z.d} = a)",
				// TODO Tests for BigInt keys
				'({ [xx]: x.b } = a)',
				'({ [xx]: x.b, [yy]: y.c, [zz]: z.d} = a)',
				'({ [1]: x.b } = a)',
				'({ [1]: x.b, [2]: y.c, [3]: z.d} = a)'
			]);
		});

		itParses('combination of patterns', [
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
			] = a`
		]);
	});

	describe('Functions', () => {
		itParses('Function declarations', [
			'function f() {}',
			'function func_name_longer_than_7_chars() {}',
			'function f(x) {}',
			'function f(x, y, z) {}',
			`function f(
				param_name_longer_than_7_chars,
				y, z
			) {}`,
			`function f(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {}`,
			`function func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {}`,
			'function f() { let x = 1; }',
			'function f() { let x = 1; let y = 2; }',
			`function f(x, y) {
				if (x) return 1;
				if (y) return 2;
				return 3;
			}`,
			'function* f() {}',
			'async function f() {}',
			'async function* f() {}'
		]);

		itParses('Function expressions', [
			'(function f() {})',
			'(function func_name_longer_than_7_chars() {})',
			'(function f(x) {})',
			'(function f(x, y, z) {})',
			`(function f(
				param_name_longer_than_7_chars,
				y, z
			) {})`,
			`(function f(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {})`,
			`(function func_name_longer_than_7_chars(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) {})`,
			'(function f() { let x = 1; })',
			'(function f() { let x = 1; let y = 2; })',
			`(function f(x, y) {
				if (x) return 1;
				if (y) return 2;
				return 3;
			})`,
			'(function* f() {})',
			'(async function f() {})',
			'(async function* f() {})'
		]);

		itParses('Arrow function expressions', [
			'() => {}',
			'() => 1',
			'x => x',
			'(x, y, z) => x',
			'param_name_longer_than_7_chars => param_name_longer_than_7_chars',
			'(param_name_longer_than_7_chars, y, z) => param_name_longer_than_7_chars',
			`(
				param_name_longer_than_7_chars,
				param_name_longer_than_7_chars2,
				param_name_longer_than_7_chars3
			) => param_name_longer_than_7_chars`,
			`(x, y, z) => {
				if (x) return 1;
				if (y) return 2;
				if (z) return 3;
				return;
			}`,
			'async () => {}',
			'async () => 1',
			'async (x, y, z) => x',
			`async (x, y, z) => {
				if (x) return 1;
				if (y) return 2;
				if (z) return 3;
				return;
			}`
		]);
	});
});

// Utils

function parseSyncViaBuffer(code, options) {
	const buff = parseSyncToBuffer(code, options);
	return deserializeBuffer(buff);
}

function itParses(name, options, codes) {
	if (Array.isArray(options)) {
		codes = options;
		options = undefined;
	}

	describe(name, () => {
		for (const code of codes) {
			let testName = code.replace(/\s+/g, ' ');
			if (options) testName += ` (${JSON.stringify(options).replace(/"/g, '')})`;
			it(testName, () => {
				const ast = conformSpans(parseSync(code, options)),
					astViaBuffer = conformSpans(parseSyncViaBuffer(code, options));
				expect(astViaBuffer).toStrictEqual(ast);
				expect(JSON.stringify(astViaBuffer)).toBe(JSON.stringify(ast));
			});
		}
	})
}

// Make all spans relative to zero = start of file
function conformSpans(ast) {
	const offset = ast.span.start;
	function conformNode(node) {
		if (node.span) {
			node.span.start -= offset;
			node.span.end -= offset;
		}
		for (const [key, child] of Object.entries(node)) {
			if (key === 'span') continue;
			if (!child || typeof child !== 'object') continue;
			if (Array.isArray(child)) {
				for (const childNode of child) {
					if (childNode) conformNode(childNode);
				}
			} else if (
				(key === 'await' && node.type === 'ForOfStatement')
				|| (key === 'questionDotToken' && node.type === 'OptionalChainingExpression')
				|| (key === 'rest' && node.type === 'RestElement')
				|| (
					key === 'spread'
					&& (
						node.type === 'SpreadElement'
						|| (Object.keys(node).length === 2 && node.expression)
					)
				)
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

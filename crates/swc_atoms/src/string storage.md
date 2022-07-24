# `JsWord` storage

## Storage

`JsWord` is represented as single `u64`.

The `u64` contains the following information:

* Type (inline, static, dynamic, or homeless)
* Whether string is prefixed with `"_"`
* Whether string is postfixed with a number
* Other type-specific data

### Prefix and postfix

#### Purpose

Purpose of prefix and postfix is to allow common changes made to identifers in `transform` or `minify` without creating a new backing string for the `JsWord`.

#### Prefix

Flag indicating a string has `_` prepended on the start.

Prefix flag is 1 bit (boolean).

Strings which have `_` prefix in source code should have the `_` at start of string included in string body, and not set the prefix flag. This allows an additional `_` to be added later with the prefix flag if required.

#### Numerical postfix

Indicates a string has a numerical postfix e.g. `foo123`.

Numerical postfix is 20 bits = max ~1 million.

If no postfix = all postfix bits set as 1 (to distinguish from numerical postfix present but zero e.g. `foo0`).

Strings which have a numerical postfix in source code should include the postfix in string body, and have `postfix` set to `NO_POSTFIX`.

Special postfix values could also be used to indicate string in quotes e.g. `"foo"`, `'foo'`, to reduce memory usage for common case of string literal AST node where value of `raw` is same as value of `value` except `raw` is wrapped with quotes.

## Representations

### Static

Static set is produced from common words at compile time.

Static set must include the empty string `""`.

Stored as:

* Byte 0
  * Bit 0-2 = 6
  * Bit 3 = `_` prefix?
  * Bit 4-7 = Bottom 4 bits of numerical postfix
* Byte 1-2 = Top 16 bits of numerical postfix
* Byte 3 = (unused)
* Byte 4-7 = Index in static set (u32)

### Inline

Used if string is not in static set and has byte length less than or equal to 5.

Length cannot be 0 as empty string `""` is included in static set.

Stored as:

* Byte 0
  * Bit 0-2 = String length (1 to 5)
  * Bit 3 = `_` prefix?
  * Bit 4-7 = Bottom 4 bits of numerical postfix
* Byte 1-2 = Top 16 bits of numerical postfix
* Byte 3-7 = String bytes

### Dynamic

Used for `JsWord`s created in parser. If string is not static, or inline-able, string is stored in a hash set. Multiple uses of the same string are de-duplicated.

The set of dynamic strings is read-only after parsing so can be shared across threads without `Mutex`. It will not be altered until the very end of the transform/minify operation. At that point, it's dropped in its entirety.

Stored as:

* Byte 0
  * Bit 0-2 = 7
  * Bit 3 = `_` prefix?
  * Bit 4-7 = Bottom 4 bits of numerical postfix
* Byte 1-2 = Top 16 bits of numerical postfix
* Byte 3-7 = Pointer to `DynamicEntry` (40 bits)

Bits 2 - 41 of pointer to `DynamicEntry` are stored. Bottom 2 bits can be ignored as they'll always be zero (pointers are aligned on 4 bytes). So bottom 42 bits of pointer address are retained. This allows for max 4 TiB address space.

### Homeless

Used in place of dynamic when created in a thread which has no dynamic set. Does not de-duplicate strings, but most operations should be able to use `prefix` or `postfix` instead of creating a homeless `JsWord`, or be creating strings which are short enough to be stored inline.

Will drop the contained `HomelessEntry` (which is just a wrapper for a boxed string) when the `JsWord` is dropped.

The string is boxed, and the box put on the heap. The purpose of this is to keep the pointer short enough to store within a `u64` with room for the other flags. Pointer to string itself would be `usize` * 2.

This introduces an extra pointer indirection, but usage of homeless `JsWord`s should be very uncommon.

Stored as:

* Byte 0
  * Bit 0-2 = 0
  * Bit 3 = `_` prefix?
  * Bit 4-7 = Bottom 4 bits of numerical postfix
* Byte 1-2 = Top 16 bits of numerical postfix
* Byte 3-7 = Pointer to `HomelessEntry` (40 bits)

Bits 2 - 41 of pointer to `HomelessEntry` are stored. See above.

#### `DynamicEntry` struct

TODO

#### `HomelessEntry` struct

TODO

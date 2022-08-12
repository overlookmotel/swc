"use strict";

// Modules
const assert = require("assert");

// Exports

const SERIALIZE_INITIAL_BUFFER_SIZE = 64 * 1024, // 64 KiB
    SCRATCH_INITIAL_BUFFER_SIZE = 8 * 1024, // 8 KiB
    SERIALIZE_MAX_BUFFER_SIZE = 2 * 1024 * 1024 * 1024, // 2 GiB
    SCRATCH_MAX_BUFFER_SIZE = 2 * 1024 * 1024 * 1024; // 2 GiB

// Buffers must be sized in chunks of 8 bytes, to allow access as Float64Array
assert(SERIALIZE_INITIAL_BUFFER_SIZE % 8 === 0);
assert(SCRATCH_INITIAL_BUFFER_SIZE % 8 === 0);

// Buffers cannot be larger than 2 GiB so address is always expressable in 31 bit unsigned int.
// Buffer addresses are used as finalize data. 32nd bit of finalize data is sometimes used as a flag.
// Additionally, addresses need to be manipulated with bitwise operators e.g. `>>>`.
// JavaScript bitwise operators only operate on 32 bit values so `1 << 32` is treated as `0`,
// so `1 << 31` is largest value that can be safely used.
assert(SERIALIZE_MAX_BUFFER_SIZE <= 2 * 1024 * 1024 * 1024);
assert(SCRATCH_MAX_BUFFER_SIZE <= 2 * 1024 * 1024 * 1024);

module.exports = {
    SERIALIZE_INITIAL_BUFFER_SIZE,
    SCRATCH_INITIAL_BUFFER_SIZE32: SCRATCH_INITIAL_BUFFER_SIZE / 4,
    SERIALIZE_MAX_BUFFER_SIZE,
    SCRATCH_MAX_BUFFER_SIZE32: SCRATCH_MAX_BUFFER_SIZE / 4,
    // `AST_VERSION` from `VersionedSerializable((1, value))`
    // https://github.com/swc-project/swc/blob/main/crates/swc_common/src/plugin.rs#L186
    AST_VERSION: 1,
    PROGRAM_LENGTH_PLUS_4: 0, // Will be set based on types
    PROGRAM_LENGTH_PLUS_8: 0, // Will be set based on types
    PROGRAM_ALIGN: 0, // Will be set based on types
};

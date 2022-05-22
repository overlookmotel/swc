'use strict';

// Modules
const assert = require('assert');

// Exports

const SERIALIZE_INITIAL_BUFFER_SIZE = 8 * 1024, // 8 KiB
    SCRATCH_INITIAL_BUFFER_SIZE = 8 * 1024; // 8 KiB

// Buffers must be sized in chunks of 8 bytes, to allow access as Float64Array
assert(SERIALIZE_INITIAL_BUFFER_SIZE % 8 === 0);
assert(SCRATCH_INITIAL_BUFFER_SIZE % 8 === 0);

module.exports = {
    SERIALIZE_INITIAL_BUFFER_SIZE,
    SCRATCH_INITIAL_BUFFER_SIZE,
    PROGRAM_LENGTH: 0, // Will be set based on types
    PROGRAM_ALIGN: 0 // Will be set based on types
};

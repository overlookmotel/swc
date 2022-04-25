'use strict';

// Exports

module.exports = {
    getAligned,
    isPositiveInteger
};

/**
 * Round up position to specified alignment.
 * e.g. `getAligned(12, 4) === 12`, `getAligned(10, 4) === 12`, `getAligned(11, 2) === 12`
 * @param {number} pos - Position
 * @param {number} align - Alignment
 * @returns {number} - Aligned position
 */
function getAligned(pos, align) {
    const modulus = pos % align;
    if (modulus === 0) return pos;
    return pos + align - modulus;
}

/**
 * Check if input is a positive integer.
 * @param {*} num - Input
 * @returns {boolean} - `true` if input is a positive integer
 */
function isPositiveInteger(num) {
    return typeof num === 'number' && num !== 0 && !isNaN(num) && num % 1 === 0;
}

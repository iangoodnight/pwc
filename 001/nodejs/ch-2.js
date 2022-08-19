#!/usr/bin/env node
// 001/nodejs/ch-2.js

/**
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-001/
 *
 * Challenge #2
 * ============
 *
 * Write a one-liner to solve the *FizzBuzz* problem and print the numbers 1
 * through 20.  However, any number divisible by *3* should be replaced by the
 * word 'fizz' and any number divisible by *5* by the word 'buzz'.  Those
 * numbers that are both divisible by *3* and *5* become 'fizzbuzz'.
 *
 **/

'use strict';

// turn off some eslint-rules to allow for a good one-liner (non-readable)
/* eslint-disable no-param-reassign, no-plusplus, no-nested-ternary */

/** return a 'fizzbuzz' string comprised of numbers 1 through 20
 * @function
 * @param {number} [l=20] - input range limit
 */
const fizzBuzz = (l = 20) =>
  [...Array(parseInt(l, 10)).keys()]
    .map((x) =>
      ++x % 15 === 0
        ? 'fizzbuzz'
        : x % 5 === 0
        ? 'buzz'
        : x % 3 === 0
        ? 'fizz'
        : x,
    )
    .join(' ');

(function main() {
  // wrapped in main to allow for arguments
  const [, , length] = process.argv;

  console.log(fizzBuzz(length));
})();

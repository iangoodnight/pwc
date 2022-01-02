#!/usr/bin/env node
// ch-1.js

/********************************************************************************
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-141
 *
 * Task 1 > Number Divisors
 * ========================
 *
 * Write a script to find `lowest 10 positive integers` having exactly `8
 * divisors`.
 *
 * **Example**
 * ```
 * 24 is the first such number having exactly 8 divisors.
 * 1, 2, 3, 4, 6, 8, 12, and 24.
 * ```
 * *****************************************************************************/

'use strict';

function findDivisors(n) {
  const int = parseInt(n, 10);

  const divisors = [];

  if (int === NaN) throw 'findDivisors expects an integer as an argument';

  let i = 1;
  while (i <= Math.sqrt(int)) {
    if (int % i === 0) {
      divisors.push(i);
      if (int / i !== i) divisors.push(int / i);
    }
    i++;
  }
  return divisors.sort((a, b) => a - b);
}

(function main() {
  let passed = 0;

  let num = 24;
  console.log(
    '\x1b[33m%s\x1b[0m',
    'Find the lowest 10 positive integers having exactly 8 divisors.',
  );
  while (passed < 8) {
    const divisors = findDivisors(num);

    if (divisors.length === 8) {
      const formatted = divisors.map((n) => String(n).padStart(2, ' '));

      console.log(`\x1b[32m${num}\x1b[0m: ${formatted.join(', ')}`);
      passed++;
    }
    num++;
  }
})();

#!/usr/bin/env node
// ch-2.js

/********************************************************************************
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-140
 *
 * Task 2 > Multiplication Table
 * =============================
 *
 * You are given 3 positive integers, `$i`, `$j`, and `$k`.
 * Write a script to print the `$k`th element in the sorted multiplication table
 * of `$i` and `$j`.
 *
 * **Example 1**
 *
 * ```
 * Input: $i = 2; $j = 3; $k = 4
 * Output: 3
 *
 * Since the multiplication of 2 x 3 is as below:
 *
 *  1 2 3
 *  2 4 6
 *
 * The sorted multiplication table:
 *
 *  1 2 2 3 4 6
 *
 * Now the 4th element in the table is "3".
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: $i = 3; $j = 3; $k = 6
 * Output: 4
 *
 * Since the multiplication of 3 x 3 is as below:
 *
 *  1 2 3
 *  2 4 6
 *  3 6 9
 *
 * The sorted multiplication table:
 *
 *  1 2 2 3 3 4 6 6 9
 *
 * Now the 6th element in the table is "4".
 * ```
 *******************************************************************************/

'use strict';

function pwcMultiplicationTable(i, j, k) {
  return sortedMultiplicationTable(i, j)[k - 1];
}

function sortedMultiplicationTable(x, y) {
  const xFactors = range(x);

  const yFactors = range(y);

  return xFactors.reduce((sums, factor) => {
    yFactors.forEach((y) => {
      sums.push(y * factor);
    });
    return sums;
  }, []).sort((a, b) => a - b);
}

function range(length, start = 1) {
  return [...Array(length).keys()].map(i => i + start);
}

(function main() {
  console.log('Input: $i = 2; $j = 3; $k = 4');
  console.log(`Output: ${pwcMultiplicationTable(2, 3, 4)}`);
  console.log('Input: $i = 3; $j = 3; $k = 6');
  console.log(`Output: ${pwcMultiplicationTable(3, 3, 6)}`);
})();

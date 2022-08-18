#!/usr/bin/env node
// ch-1.js

/*******************************************************************************
 * > https://theweeklychallenge.org/blog/perl-weekly-challenge-159/
 *
 * ## Task 1 > Farey Sequence
 *
 * You are given a positive number, `$n`.
 *
 * Write a script to compute `Farey Sequence` of the order `$n`.
 *
 * **Example 1:**
 *
 * ```
 * Input: $n = 5
 * Output: 0/1, 1/5, 1/4, 1/3, 2/5, 1/2, 3/5, 2/3, 3/4, 4/5, 1/1.
 * ```
 *
 * **Example 2:**
 *
 * ```
 * Input: $n = 7
 * Output: 0/1, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 2/5, 3/7, 1/2, 4/7, 3/5, 2/3, 5/7,
 * 3/4, 4/5, 5/6, 6/7, 1/1.
 * ```
 *
 * **Example 3:**
 *
 * ```
 * Input: $n = 4
 * Output: 0/1, 1/4, 1/3, 1/2, 2/3, 3/4, 1/1.
 * ```
 *
 ******************************************************************************/

'use strict';

function fareySequence(n) {
  const boundary = Number(n);

  if (boundary < 1 || isNaN(boundary)) return 0;

  const numerators = [...Array(boundary).keys()].map((x) => x + 1);

  const denominators = [...numerators].reverse();
  return denominators.reduce((fractions, denominator) => {}, []);
}

/*******************************************************************************
 * MAIN ************************************************************************
 ******************************************************************************/

(function main() {
  const boundary = process.argv[2];

  const sequence = fareySequence(boundary);

  const prompt = 'fareySequence takes a positive integer as an argument.';

  if (sequence === 0) return console.log(prompt);
  return console.log(sequence);
})();

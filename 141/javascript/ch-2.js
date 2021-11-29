#!/usr/bin/env node
// ch-2.js

/********************************************************************************
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-141
 *
 * Task 2 > Like Numbers
 * =====================
 *
 * You are given positive integers, `$m` and `$n`.
 *
 * Write a script to find total count of integers created using the digits of
 * `$m` which are also divisible by `$n`.
 *
 * Repeating of digits are not allowed.  Order/Sequence of digits can't be
 * altered.  You are only allowed to use (n - 1) digits at the most.  For
 * example, 432 is not an acceptable integer created using the digits of 1234.
 * Also for 1234, you can only have integers having no more than three digits.
 *
 * **Example 1:**
 * ```
 * Input: $m = 1234, $n = 2
 * Output: 9
 *
 * Possible integers created using the digits of 1234 are:
 * 1, 2, 3, 4, 12, 13, 14, 23, 24, 34, 123, 124, 134, and 234.
 *
 * There are 9 integers divisible by 2 such as:
 * 2, 4, 12, 14, 24, 34, 124, 134, and 234.
 * ```
 *
 * **Example 2:**
 * ```
 * Input: $m = 768, $n = 4
 * Ouptut: 3
 *
 * Possible integers created using the digits of 768 are:
 * 7, 6, 8, 76, 78, and 68.
 *
 * There are 3 integers divisble by 4 such as:
 * 8, 76, and 68.
 * ```
 *******************************************************************************/

'use strict';

function likeNumbers(num) {
  const digits = String(num).split('');

  const like = [];

  let i = 0;

  // moving splice
}

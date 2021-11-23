#!/usr/bin/env node
// ch-1.js

/********************************************************************************
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-140
 *
 * Task 1 > Add Binary
 * ===================
 *
 * You are given two decimal-coded binary numbers, `$a` and `$b`.
 * Write a script to simulate the addition of the given binary numbers.
 *
 * > The script should simulate something like `$a + $b` (operator overloading).
 *
 * **Example 1**
 *
 * ```
 * Input: $a = 11; $b = 1;
 * Output: 100
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: $a = 101; $b = 1;
 * Output: 110
 * ```
 *
 * **Example 3**
 *
 * ```
 * Input: $a = 100; $b = 11;
 * Output: 111
 * ```
 *******************************************************************************/

'use strict';

class Binary {
  constructor(num) {
    this.num = num;
  }

  #toDecimal(bin) {
    const digits = [...('' + bin)];

    let sum = 0;
    let multiplier = 1;

    while(digits.length > 0) {
      let digit = digits.pop();

      sum += (digit * multiplier);
      multiplier *= 2;
    }
    return sum;
  }

  #toBinary(decimal) {

  }

  valueOf() {

  }
}

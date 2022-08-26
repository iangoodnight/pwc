#!/usr/bin/env node
// 179/nodejs/ch-1.js

/**
 * ## [Task 1: Ordinal Number Spelling][1]
 *
 * > You are given a a positive number `$n`.
 * > Write a script to spell the ordinal number.
 *
 * ### Example
 *
 * ```
 * 11 => eleventh
 * 62 => sixty-second
 * 99 => ninety-ninth
 * ```
 *
 * [1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-179/> "PWC"
 **/

'use strict';

/** return a string representing the ordinal of the input number
 * @param {number} input - input number
 **/
function toOrdinalString(input) {
  const inputNumber = Number(input);

  if (Number.isNaN(inputNumber)) throw Error(`${input} is not a number`);

  const key = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'sixth',
    7: 'seventh',
    8: 'eighth',
    9: 'ninth',
    10: 'tenth',
    11: 'eleventh',
    12: 'twelfth',
    13: 'thirteenth',
    14: 'fouteenth',
    15: 'fifteenth',
    16: 'sixteenth',
    17: 'seventeenth',
    18: 'eighteenth',
    19: 'nineteenth',
    20: 'twentieth',
  };
}

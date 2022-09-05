#!/usr/bin/env node
// 180/nodejs/ch-1.js

/**
 * ## [Task 1: First Unique Character][1]
 *
 * > You are given a string, `$s`.
 * > Write a script to find out the first unique character in the given string
 * > and print its index (0-based).
 *
 * **Example 1**
 *
 * ```
 * Input: $s = "Perl Weekly Challenge"
 * Output: 0 as 'P' is the first unique character
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: $s = "Long Live Perl"
 * Output: 1 as 'o' is the first unique character
 * ```
 *
 * [1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-179/> "PWC"
 */

'use strict';

/** Returns index and value of first unique character from a string.
 * @param {string} inputString - Input string
 * @returns {[number, string]} [index, firstUniqueChar] - Index and value of
 * first unique
 */
function findFirstUniqueChar(inputString = '') {
  // check arg
  if (inputString === '') throw new Error('Empty string');
  if (!(typeof inputString === 'string' || inputString instanceof String)) {
    throw new Error(`Expected string, received ${typeof inputString}`);
  }
  /** @type {boolean} */
  const isUniqueInString = (char) => {
    const re = new RegExp(`${char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}{2}`);

    if (re.test(inputString)) return false;
    return inputString.split(char).length > 1;
  };

  let cursor = 0;

  while (cursor < inputString.length) {
    const char = inputString[cursor];

    if (isUniqueInString(char)) {
      return [cursor, char];
    }
    cursor += 1;
  }
  return [-1, null];
}

(function main() {
  const inputString = process.argv[2] || null;

  if (!inputString) console.log('Usage: ./ch-1.js <inputString>');

  try {
    const [firstIndex, firstUnique] = findFirstUniqueChar(inputString);

    if (firstIndex === -1) {
      console.log('-1 as their are no unique characters');
    } else {
      console.log(
        `${firstIndex} as '${firstUnique}' is the first unique character`,
      );
    }
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

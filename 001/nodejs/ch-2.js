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

function fizzBuzz(l = 20) {
  return [...Array(parseInt(l, 10))]
    .map((_, i) => i + 1)
    .map((x) =>
      x % 15 === 0
        ? 'fizzbuzz'
        : x % 5 === 0
        ? 'buzz'
        : x % 3 === 0
        ? 'fizz'
        : x,
    );
}

(function main() {
  const [, , length] = process.argv;

  console.log(fizzBuzz(length).join(' '));
})();

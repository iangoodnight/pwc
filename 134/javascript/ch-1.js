#!/usr/bin/env node
// ch-1.js

/**
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-134/
 *
 * Task 1 > Pandigital Numbers
 * ===========================
 *
 * Write a script to generate the first 5 `Pandigital Numbers` in base 10.
 *
 * As per the wikipedia, it says:
 *
 * > A pandigital number is an integer that in a given base has among its
 * > significant digits each digit used in the base at least once.
 *
 **/

'use strict';

function isPandigital(num, base = 10) {
  // Guard against improperly validated input
  if (typeof num !== 'number' || !Number.isInteger(num)) return false;
  return (
    new Set( // `Set` filters out duplicates
      num
        .toString() // Convert input to string so we can split by digits
        .split(''),
    ).size === base
  );
}

function generatePandigitals(limit = 5, base = 10) {
  const pandigitals = [];

  let test = parseInt('1'.padEnd(base - 1, '0'));
  // let test = 1023456789;
  while (pandigitals.length < limit) {
    if (isPandigital(test)) pandigitals.push(test);
    console.log(test);
    test += 1;
  }
  return pandigitals;
}

console.log(generatePandigitals());

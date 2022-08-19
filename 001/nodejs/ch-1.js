#!/usr/bin/env node
// 001/nodejs/ch-1.js

/**
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-001/
 *
 * Challenge #1
 * ============
 *
 * Write a script to replace the 'e' with 'E' in the string 'Perl Weekly
 * Challenge'.  Also, print the number of times the character 'e' is found in
 * the string.
 *
 **/

'use strict';

function count(string = 'Perl Weekly Challenge', letter = 'e') {
  const sanitized = sanitize(letter);

  return string.match(new RegExp(sanitized, 'g'))?.length;
}

function print(string) {
  console.log(`\x1b[94m${string}\x1b[0m`);
}

function replace(string = 'Perl Weekly Challenge', letter = 'e') {
  const sanitized = sanitize(letter);

  return string.replace(new RegExp(sanitized, 'g'), letter.toUpperCase());
}

function sanitize(string = '') {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

(function main() {
  const [, , string, toReplace] = process.argv;

  const replacedString = replace(string, toReplace);

  print(replacedString);
  print(`Count: ${count(string, toReplace)}`);
})();

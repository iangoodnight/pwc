#!/usr/bin/env node
// ch-1.js

/**
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-132/
 *
 * Task 1 > Mirror Dates
 * =====================
 *
 * You are given a date (yyyy/mm/dd).
 *
 * Assuming the given date is the date of your birth, write a script to find the
 * mirror dates of the given date.
 *
 * Assuming today is 2021/09/22
 *
 * Example 1
 * ---------
 *
 * Input: 2021/09/18
 * Output: 2021/09/14, 2021/09/26
 *
 * On the date you were born, someone who was your current age would have been
 * born on 2021/09/14.
 * Someone born today will be your current age on 2021/09/26.
 *
 * Example 2
 * ---------
 *
 * Input: 1975/10/10
 * Output: 1929/10/27, 2067/09/05
 *
 * On the date you were born, someone who was your current age would have been
 * born on 1929/10/27.
 * Someone born today will be your current age on 2067/09/05.
 *
 * Example 3
 * ---------
 *
 * Input: 1967/02/14
 * Output: 1912/07/08, 2076/04/30
 *
 * On the date you were born, someone who was your current age would have been
 * born on 1912/07/08.
 * Someone born today will be your current age on 2076/04/30.
 *
 **/

'use strict';

/**
 * Node built-in dependencies
 **/
const readline = require('readline');

/**
 * Our PWC solution
 **/
function returnMirrorDates(
  birthday,          // Input (birthdate)
  today = new Date() // Optional 'today' arg to match example inputs for testing
) {
  const inputRe = new RegExp('^\d{4}/\d{2}/\d{2}');
  // Validate input
  if (!inputRe.test(birthday)) {
    throw new Error('Input must be in the format "yyyy-MM-dd"');
  }
  // Convert input to 'Date' object
  const birthDate = new Date(birthday);
  // Covert today to 'Date' object
  const toDate = new Date(today);
  // Find difference in milliseconds
  const difference = Math.abs(toDate.valueOf() - birthDate.valueOf());
  // Date of someone your current age on the day you were born
  const prevDate = new Date(birthDate.valueOf() - difference);
  // Date someone born today will be your age
  const nextDate = new Date(toDate.valueOf() + difference);
  // Return dates as a tuple
  return [
    [
      // Stringify and format
      prevDate.getFullYear(),
      String(prevDate.getMonth() + 1).padStart(2, '0'),
      String(prevDate.getDate()).padStart(2, '0')
    ].join('/'),
    [
      nextDate.getFullYear(),
      String(nextDate.getMonth() + 1).padStart(2, '0'),
      String(nextDate.getDate()).padStart(2, '0')
    ].join('/')
  ];
}

/**
 * Followed by some utilities to test our solution
 **/
function printResults([prev, next] = []) {
  console.log(
    'On the date you were born, someone who was your current age would have ' +
    'been born on ' + prev + '.\n' + 'Someone born today will be your '       +
    'current age on ' + next + '.'
  );
}
/**
 * And our test runner
 **/
(function main() {
  console.log(returnMirrorDates());
})();

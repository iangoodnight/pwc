#!/usr/bin/env node
// ch-1.js

/********************************************************************************
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-139
 *
 * Task 1 > JortSort
 * =================
 *
 * You are given a list of numbers.
 *
 * Write a script to implement JortSort.  It should return true/false depending
 * on whether or not the given list of numbers is already sorted.
 *
 * Example 1:
 * ----------
 *
 * const input = [1, 2, 3, 4, 5];
 *
 * output === true;
 *
 * // Since the array is sorted, it prints `true`.
 *
 * Example 2:
 * ----------
 *
 * const input = [1, 3, 2, 4, 5];
 *
 * output === false;
 *
 * // Since the array is NOT sorted, it prints `false`.
 *
 *******************************************************************************/

'use strict';

const test1 = [1, 2, 3, 4, 5];

const test2 = [1, 3, 2, 4, 5];

function jortSort(array = []) {
  return array.every(
    (element, idx) => element < array[idx + 1] || idx === array.length - 1,
  );
}

console.log(jortSort(test1));
console.log(jortSort(test2));

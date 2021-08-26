#!/usr/bin/env node

/**
 * Task #1 > Disjoint Sets
 * =======================
 *
 * You are given two sets with unique integers.
 * Write a script to figure out if they are disjoint.
 *
 * The two sets are disjoint if they don't have any common members
 *
 * EXAMPLE
 * Input: const s1 = [1, 2, 5, 3, 4];
 *        const s2 = [4, 6, 7, 8, 9];
 * Output: false as the given sets have common member 4.
 *
 * Input: const s1 = [1, 3, 5, 7, 9];
 *        const s2 = [0, 2, 4, 6, 8];
 * Output: true as the given two sets do no have a common member
 **/

'use strict';

/**
 * General housekeeping, reading test cases from test directory, etc.
 **/

const fs = require('fs');

const path = require('path');

const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const isDirectory = (filePath) => fs.lstatSync(filePath).isDirectory();

function parseTestCase(filePath = '') {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data.split('\n');

    if (!lines.length) throw new Error('Test cases improperly formatted');

    const testData = lines.filter((line) => {
      return line.length !== 0 && line.charAt(0) !== '#';
    });

    const [ firstLine, secondLine, result ] = testData;

    const set1 = listToArray(firstLine);

    const set2 = listToArray(secondLine);

    const test = parseInt(result.trim()) === 1 ? true: false;

    return [set1, set2, test];
  } catch (err) {
    console.log('Problems parsing test files: ', err);
  }
}

function listToArray(str) {
  return str.split(',').map(el => el.trim());
}

function assertDisjoint([set1, set2, test]) {
  console.log(set1);
  console.log(set2);
  console.log(test);
  console.log(isDisjoint(set1, set2));
  if (isDisjoint(set1, set2) === test) {
    return console.log('\x1b[32m%s\x1b[0m', 'Passed \u2690');
  }
  console.log('\x1b[31m%s\x1b[0m', 'Failed \u274c');
}

(function main() {
  const testPath = process.argv[2] || './task1_test_cases';

  const tests = [];

  try {
    if (isFile(testPath)) {
      const test = parseTestCase(data);

      tests.push(test);
    }
    if (isDirectory(testPath)) {
      fs.readdirSync(testPath).map(fileName => {
        const filePath = path.join(testPath, fileName);

        const test = parseTestCase(filePath);

        tests.push(test);
      });
    }
    if (tests.length === 0) return console.log('No tests found');
    for (const test of tests) {
      assertDisjoint(test);
    }
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
})();
/**
 * Here, the function to test our sets
 **/

function isDisjoint(set1 = [], set2 = []) {
  let disjoint = true;
  while (disjoint && set1.length) {
    const test = set1.pop();
    if (set2.includes(test)) disjoint = false;
  }
  return disjoint;
}

#!/usr/bin/env node

/**
 * Task #1 > Maximum Sub-Matrix
 * ============================
 *
 * You are given an m x n binary matrix of 0s and 1s.
 * Write a script to return the maximum sub-matrix containing only 0s.
 *
 * Example 1
 *
 * const input = [
 *   [1, 0, 0, 0, 1, 0],
 *   [1, 1, 0, 0, 0, 1],
 *   [1, 0, 0, 0, 0, 0]
 * ];
 *
 * const output = [
 *  [0, 0, 0],
 *  [0, 0, 0]
 * ];
 *
 * Example 2
 *
 * const input = [
 *   [0, 0, 1, 1],
 *   [0, 0, 0, 1],
 *   [0, 0, 1, 0]
 * ];
 *
 * const output = [
 *   [0, 0],
 *   [0, 0],
 *   [0, 0]
 * ];
 **/

'use strict';

/**
 * Built-in Node dependencies
 **/

const fs = require('fs');

const path = require('path');

/**
 * Here, the function to test our matrixes (PWC Solution)
 **/
const input = [
  [1, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0]
];

const output = [
 [0, 0, 0],
 [0, 0, 0]
];

function findSubMatrix(matrix = [[]]) {
  let optimal = [0, 0];
  let tests = [];
  const area = ([x, y]) => x * y;
  let contenders = [];

  for (let i = 0; i < matrix.length; i++) {
    let test = matrix.slice(i);

    for (let j = 0; j < matrix.length; j++) {
      let testSlice = test.map(x => x.slice(j));
      // console.log('test slice: ');
      /*(() => {
        testSlice.forEach(row => console.log(row, "\n"));
        // console.log('=======');
      })();*/
      let champion = reduceToArea(reduceToX(testSlice));
      // console.log('champion: ', champion, '\n\n');
      contenders.push(champion);
    }
  }

  const kingOfTheHill = contenders.reduce((king, kid) => {
    // console.log(king, ' vs ', kid);
    if (area(king) > area(kid)) {
      // console.log('Winner: ', king);
      return king;
    }
    if (area(king) === area(kid)) {
      if (king[0] < kid[0]) {
        // console.log('Close one! ', kid);
        return kid;
      }
      // console.log('Close one!', king);
    }
    // console.log('Winner: ', kid);
    return kid;
  }, [0, 0]);

  // console.log(kingOfTheHill);
  return fillZeroes(kingOfTheHill);
}

function fillZeroes([length, count]) {
  const container = [];
  while (count > 0) {
    const row = Array(length).fill(0);
    container.push(row);
    count--;
  }
  return container;
}

const test = [
  [ 0, 0, 1 ],
  [ 0, 0, 0 ],
  [ 0, 1, 1 ],
];

function reduceToLeft (list = [], match = 0) {
  const test = [...list];

  let matched = 0;
  while (test.length > 0) {
    if (test.shift() !== match) return matched;
    matched++;
  }
  return matched;
}

function reduceToX (list = [[]], match = 0) {
  return list.reduce((reduced, record) => {
    reduced.push(reduceToLeft(record, match));
    return reduced;
  }, []);
}

function reduceToArea (reducedX = []) {
  const xVals = [...reducedX];

  // console.log('xVals: ', xVals);

  let highWaterMark = xVals.shift();
  if (highWaterMark < 1) return [0, 0];
  let y = 1;

  let optimal = [highWaterMark, y];
  y++

  while (xVals.length > 0 && xVals[0] > 0) {
    // console.log('highWaterMark: ', highWaterMark);
    let x = xVals.shift();
    // console.log('x y: ', x, y);

    if (x >= highWaterMark) {
      optimal = [highWaterMark, y];
    }
    if ((x * y) > (optimal[0] * optimal[1])) {
      optimal = [highWaterMark, y];
    }
    y++;
  }
  return optimal;
}

function creep(swamp = [[]]) {
  const area = [0, 0];

  let xBound = 0;
  let yBound = 0;

  if (swamp[xBound][yBound] === 0) {
    let [x ,y] = area;
    x++;
    y++;
    xBound++;
    yBound++;

  }
}

function find0Range(row = []) {
  let range = 0;
  while (row[range] === 0) {
    range++;
  }
  return range;
}

function is2dArray (input) {
  if (!Array.isArray(input)) return false;
  return input.reduce((pass, test) => {
    if (pass === false || !Array.isArray(test)) pass = false;
    return pass;
  }, true);
}

/**
 * Followed by some utilities to test our solution
 **/

function parseTestCase(filePath = '') {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const { input, output } = JSON.parse(data);

    return { input, output };
  } catch (error) {
    console.log(
      'Problems parsing test files.  Is the JSON properly formatted?\n',
      error
    );
  }
}

function isMatrix(matrix = [[]]) {
  if (!Array.isArray(matrix)) return false;
  return matrix.reduce((pass, row) => {
    if (!Array.isArray(row)) return false;
    return pass;
  }, true);
}

function compareMatrixes(matrix1 = [[]], matrix2 = [[]]) {
  if (!isMatrix(matrix1) || !isMatrix(matrix2)) return false;
  if (matrix1.length !== matrix2.length) return false;
  return matrix1.reduce((pass, row, idx) => {
    const compareRow = matrix2[idx];
    if (row.length !== compareRow.length) return false;
    const match = row.reduce((pass, el, i) => {
      if (el !== compareRow[i]) return false;
      return pass;
    }, true);
    if (!match) return false;
    return pass;
  }, true);
}

function assertMatchingMatrixes(input = [[]], output = [[]]) {
  const test = findSubMatrix(input);

  console.log('Input:');
  input.forEach((row) => {
    console.log(row);
  });
  console.log('Output:');
  output.forEach((row) => {
    console.log(row);
  });
  console.log('Received:');
  test.forEach((row) => {
    console.log(row);
  });

  if (compareMatrixes(output, test)) {
    return console.log('\x1b[32m%s\x1b[0m', 'Passed \u2690');
  }
  return console.log('\x1b[31m%s\x1b[0m', 'Failed \u2715');
}

const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const isDirectory = (filePath) => fs.lstatSync(filePath).isDirectory();

/**
 * And our test runner
 **/

(function main() {
  const testPath = process.argv[2] || '../test_cases/ch-1';

  try {
    if (isFile(testPath)) {
      const { input, output } = parseTestCase(testPath);

      console.log(testPath);

      return assertMatchingMatrixes(input, output);
    }
    if (isDirectory(testPath)) {
      fs.readdirSync(testPath).map((fileName) => {
        const filePath = path.join(testPath, fileName);

        const { input, output } = parseTestCase(filePath);

        console.log(filePath);

        assertMatchingMatrixes(input, output);
      });
      return;
    }
    return 'No tests found';
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
})();

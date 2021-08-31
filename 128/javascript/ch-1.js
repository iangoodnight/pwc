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
  const matrixes = [];

  matrix.forEach((row) => {

  })
}

findSubMatrix(input);

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
    if (isDirectory()) {
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
})/*()*/;

#!/usr/bin/env node
// ch-1.js

/*******************************************************************************
 * > https://theweeklychallenge.org/blog/perl-weekly-challenge-152/#TASK1
 *
 * ## Task 1 > Triangle Sum Path
 *
 * You are given a triangle array.
 *
 * Write a script to find the minimum sum path from top to bottom.
 *
 * ### Example 1:
 *
 * ```
 * Input: $triangle = [ [1], [5,3], [2,3,4], [7,1,0,2], [6,4,5,2,8] ]
 *
 *                 1
 *                5 3
 *               2 3 4
 *              7 1 0 2
 *             6 4 5 2 8
 *
 * Output: 8
 *
 *  Minimum Sum Path = 1 + 3 + 2 + 0 + 2 => 8
 * ```
 *
 * ### Example 2:
 *
 * ```
 * Input: $triangle = [ [5], [2,3], [4,1,5], [0,1,2,3], [7,2,4,1,9] ]
 *
 *                 5
 *                2 3
 *               4 1 5
 *              0 1 2 3
 *             7 2 4 1 9
 *
 * Output: 9
 *
 *  Minimum Sum Path = 5 + 2 + 1 + 0 + 1 => 9
 * ```
 ******************************************************************************/

'use strict';

class Triangle {
  constructor(triangle = []) {
    if (!this.validate(triangle)) {
      throw new Error(`Triangle: ${triangle} is not valid`);
    }
    this.triangle = triangle;
  }

  minPathSum() {
    return this.triangle.reduce((sum, row) => {
      const lowest = row.reduce((mininum, value) =>
        value < mininum ? value : mininum,
      );
      return sum + lowest;
    }, 0);
  }

  prettyPrint() {
    const [lastRow] = this.triangle.slice(-1);

    const { length: maxEntries } = lastRow;

    if (maxEntries === 0) console.log('[ Empty ]');

    const maxChars = this.triangle.reduce((max, row) => {
      const maxRowChars = row.reduce((rowMax, entry) => {
        const charLength = entry.toString().length;

        return charLength > rowMax ? charLength : rowMax;
      }, 0);
      return maxRowChars > max ? maxRowChars : max;
    }, 0);

    const maxLength = maxChars * maxEntries + maxChars * (maxEntries - 1);

    this.triangle.forEach((row) => {
      const pad = ' '.repeat(maxChars);

      const padded = row
        .map((value) => value.toString().padStart(maxChars, '0'))
        .join(pad);

      const margin = ' '.repeat(Math.floor((maxLength - padded.length) / 2));
      console.log(margin + padded);
    });
  }

  minSumPath() {
    const mins = this.triangle.map((row) =>
      row.reduce((mininum, value) => (value < mininum ? value : mininum)),
    );
    const minPathSum = this.minPathSum();

    return `${mins.join(' + ')} => ${minPathSum}`;
  }

  printProblemStatement() {
    console.log(`Input: $triangle = ${this.toString()}\n`);
    this.prettyPrint();
    console.log(`\nOutput: ${this.minPathSum()}\n`);
    console.log(`Minimum Sum Path: = ${this.minSumPath()}\n`);
  }

  toString() {
    const arrays = this.triangle.map((row) => `[${row.join(',')}]`);

    return `[ ${arrays.join(', ')} ]`;
  }

  validate(triangle) {
    const { isArray } = Array;

    if (!isArray(triangle)) return false;
    return triangle.reduce((isTriangle, row, idx, array) => {
      if (isTriangle === false || !isArray(row)) return false;
      const previousLength = idx === 0 ? 0 : array[idx - 1].length;

      const { length } = row;

      return length === previousLength + 1;
    }, true);
  }

  static valid(triangle) {
    const { validate } = new Triangle();

    return validate(triangle);
  }
}

const triangle = [[5], [2, 3], [4, 1, 5], [0, 1, 2, 3], [7, 2, 4, 1, 9]];

const tri = new Triangle(triangle);

const triangle2 = [
  [5],
  [12, 3],
  [4, 1, 512],
  [0, 1, 2, 3],
  [7, 2, 4, 1, 9],
  [7, 2, 4, 1, 9002, 10],
];

const tri2 = new Triangle(triangle2);

tri.printProblemStatement();
tri2.printProblemStatement();

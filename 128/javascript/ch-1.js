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
  const area = (range = [[]]) {
    const rise = range.length || 0;

    const run = range[0]?.length || 0;

    return rise * run;
  };

  return matrix.reduce((submatrix, row, idx, matrix) => {
    const vals = [...row];

    while(vals.length) {
      const [start, ] = vals;

      if (start === 0) {

      }
    }
  }, []);
}

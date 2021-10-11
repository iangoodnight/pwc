#!/usr/bin/env node
// ch-2.js

/**
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-134/
 *
 * Task 2 > Distinct Terms Count
 * =============================
 *
 * You are given 2 positive numbers, `$m` and `$n`.
 *
 * Write a script to generate a multiplication table and display a count of the
 * distinct terms.
 *
 * Example 1
 * =========
 *
 * Input: $m = 3, $n = 3
 * Output:
 *         x | 1 2 3
 *         --+------
 *         1 | 1 2 3
 *         2 | 2 4 6
 *         3 | 3 6 9
 *
 * Distinct Terms: 1, 2, 3, 4, 6, 9
 * Count: 6
 *
 * Example 2
 * =========
 *
 * Input: $m = 3, $n = 5
 * Output:
 *        x | 1  2  3  4  5
 *        --+--------------
 *        1 | 1  2  3  4  5
 *        2 | 2  4  6  8 10
 *        3 | 3  6  9 12 15
 *
 * Distinct Terms: 1, 2, 3, 4, 5, 6, 9, 10, 12, 15
 * Count: 11
 *
 **/

'use strict';

function buildTimesTable(x, y) {
  const columnPadding = y.toString().length;

  const tablePadding = (x * y).toString().length;

  return [
    `${'x'.padStart(columnPadding)} |${[...Array(x).keys()]
      .map((digit) => (digit + 1).toString().padStart(tablePadding + 1))
      .join('')}`,
    `${'-'.repeat(columnPadding)}-+${'-'.repeat(x + x * tablePadding)}`,
    ...[...Array(y).keys()].map(
      (row, idx) =>
        `${(idx + 1).toString().padStart(columnPadding)} |\x1b[33m${[
          ...Array(x).keys(),
        ]
          .map((digit) =>
            ((digit + 1) * (idx + 1)).toString().padStart(tablePadding + 1),
          )
          .join('')} \x1b[0m`,
    ),
  ].join('\n');
}

function listUnique(table) {
  return [
    ...new Set(
      table
        .split('\n')
        .map((row) => [
          ...row
            .split(/\s+/)
            .filter(
              (char) =>
                !char.includes('+') &&
                !char.includes('-') &&
                !char.includes('|') &&
                !char.includes('x') &&
                !char.includes('\x1b[0m'),
            ),
        ])
        .flat(),
    ),
  ]
    .map((distinct) => parseInt(distinct, 10))
    .sort((a, b) => a - b);
}

function distinctTermsCountAndPrint(x, y) {
  const table = buildTimesTable(x, y);

  const distinct = listUnique(table);

  console.log(
    `${table}\n\nDistinct Terms: ${distinct.join(', ')}\nCount: ${
      distinct.length
    }`,
  );
}

distinctTermsCountAndPrint(21, 211);

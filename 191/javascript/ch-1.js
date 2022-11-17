#!/usr/bin/env node
/** @format */

// 191/javascript/ch-1.js

/**
 * ## [Task 1: Twice Largest][1]
 *
 * > You are given a list of integers `@list`.
 * > Write a script to find out whether the largest item in the list is at least
 * > twice as large as each of the other items.
 *
 * **Example 1**
 * ```
 * Input: @list = (1,2,3,4)
 * Output: -1
 *
 * The largest in the given list is 4.  However, 4 is not greater than twice of
 * every remaining element.
 * 1 x 2 <= 4
 * 2 x 2 <= 4
 * 2 x 3 > 4
 * ```
 *
 * **Example 2**
 * ```
 * Input: @list = (1,2,0,5)
 * Output: 1
 *
 * The largest in the given list is 5.  Also, 5 is greater than twice of every
 * remaining element.
 * 1 x 2 <= 5
 * 2 x 2 <= 5
 * 0 x 2 <= 5
 * ```
 *
 * **Example 3**
 * ```
 * Input: @list = (2,6,3,1)
 * Output: 1
 *
 * The largest in the given list is 6.  Also, 6 is greater than twice of every
 * remaining element.
 * 2 x 2 <= 6
 * 3 x 2 <= 6
 * 1 x 2 <= 6
 * ```
 *
 * **Example 4**
 * ```
 * Input: @list = (4,5,2,3)
 * Output: -1
 *
 * The largest in the given list is 5.  However, 5 is not greater than twice of
 * every remaining element.
 * 4 x 2 > 5
 * 2 x 2 <= 5
 * 3 x 2 > 5
 * ```
 *
 * [1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-191/> "PWC"
 */

// Pragmas /////////////////////////////////////////////////////////////////////

'use strict';

// Modules /////////////////////////////////////////////////////////////////////

const fs = require('fs');

// Globals and Constants ///////////////////////////////////////////////////////

const VERSION = 'v0.0.1';

// PWC SOLUTION ////////////////////////////////////////////////////////////////

/** Returns boolean indicating if the largest element in the list is at least
 * twice as large as the remaining elements.
 * @param {Object[]} list - An array of numbers or number strings
 * @returns {boolean} - True if the largest element is at least twice as large
 * as the remaining elements
 */
function hasTwiceLargest(list = []) {
  // check `list` arg and fail fast
  if (!Array.isArray(list)) {
    throw new Error(
      `function 'hasTwiceLargest' expects an array. Received ${typeof list}`,
    );
  }
  /** @type {[number, number]} */
  const [highestNumber, secondHighestNumber] = list
    // check for bad list elements
    .map((element) => {
      const number = Number(element);

      if (Number.isNaN(number)) {
        // the prompt describes a list of integers, but it doesn't hurt to check
        throw new Error(
          [
            `function 'hasTwiceLargest' expects an array of integers.`,
            `${element} is not a number.`,
          ].join(' '),
        );
      }
      return number;
    })
    // sort the list to compare the largest number against the second largest
    .sort((a, b) => b - a);
  // there is an edge case where you might have a list with only one element
  return list.length === 1 || highestNumber >= secondHighestNumber * 2;
}

// Utility functions ///////////////////////////////////////////////////////////

/** Checks for piped input
 * @returns {Promise} Promise object resolves to True if input is being piped
 * in, else False
 */
function checkForPipedInputAsync() {
  return new Promise((resolve, reject) => {
    fs.fstat(0, (error, stats) => {
      if (error) reject(error);
      resolve(stats.isFIFO());
    });
  });
}

/** Parses args into inputs and options
 * @param {Object[]} args - CLI arguments
 * @returns {[Object[], Object[]]} [inputs, options] - An array of inputs and an
 * array of CLI options
 */
function parseCLIArgs(args = []) {
  const optionsRe = new RegExp(/^--?\w+$/);

  return args.reduce(
    ([inputs, options], arg) => {
      if (optionsRe.test(arg)) return [inputs, [...options, arg]];

      return [[...inputs, ...arg.split(/\w+/)], options];
    },
    [[], []],
  );
}

/** Prints help CLI help message */
function printHelp() {
  /** type {string} */
  const helpMessage = [
    '\nTwice Largest\n',
    '=============\n',
    '  Find out whether the largest item in a list is at least twice as large',
    ' as each of the remaining elements individually.\n\n',
    'Usage:\n',
    '  ./ch-1.js 1 2 3 4\n',
    '  ./ch-1.js "1 2 0 5"\n',
    '  echo "1 2 3 4" | ./ch-1.js\n',
    '  ./ch-1.js --help\n',
    '  ./ch-1.js --version\n',
    'Options:\n',
    '  -h, --help     Show this screen\n',
    '  -v, --version  Show version\n',
  ].join('');
  console.log(helpMessage);
}

/** Prints version number */
function printVersion() {
  console.log(VERSION);
}

/** Read piped data from stdin
 * @returns {Promise} Promise object resolves to string from piped data
 */
function readPipedInputAsync() {
  const { stdin } = process;

  const data = [];

  stdin.on('readable', () => {
    let chunk = stdin.read();

    while (chunk !== null) {
      data.push(chunk);
      chunk = stdin.read();
    }
  });
  return new Promise((resolve, reject) => {
    stdin.on('end', () => resolve(data.join('').trim()));
    stdin.on('error', () => reject(Error('error reading stdin')));
    stdin.on('timeout', () => reject(Error('timeout reading stdin')));
  });
}

// MAIN ////////////////////////////////////////////////////////////////////////

(async function main() {
  // Remove first two args (node, program)
  const args = process.argv.slice(2);
  // parse inputs
  const [inputs, options] = parseCLIArgs(args);
  // handle options
  if (options.includes('-h') || options.includes('--help')) {
    printHelp();
    process.exit(0);
  }
  if (options.includes('-v') || options.includes('--version')) {
    printVersion();
    process.exit(0);
  }
  // if necessary, prompt users to check help
  if (inputs.length === 0) {
    console.log('No args provided.  Run `--help` for usage');
  }
  // Check for any other input and print results
  try {
    // check for piped input
    const isPipedInput = await checkForPipedInputAsync();
    // combine piped input with cli inputs if found
    if (isPipedInput) {
      const pipedInput = await readPipedInputAsync();

      console.log(hasTwiceLargest([...pipedInput.split(/\s+/), ...inputs]));
      process.exit(0);
    }
    console.log(hasTwiceLargest(inputs));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

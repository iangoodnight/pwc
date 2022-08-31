#!/usr/bin/env node
// 179/nodejs/ch-2.js

/**
 * @author Ian Goodnight
 * @version 0.0.1
 *
 * ## [Task 2: Unicode Sparkline][1]
 *
 * > You are given a list of positive numbers, `@n`.  Write  ascript to print
 * > sparkline in Unicode for the given list of numbers.
 *
 * [1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-179/> "PWC"
 */

'use strict';

const fs = require('fs');

/** Generates a sparkline graph from Unicode characters U+2581 through U+2588
 * given a list of numbers as input.
 * @param {Object[]} input - A list of numbers used to generate a sparkline
 * @param {boolean} [printColor=true] - Colors output with ANSI escape sequences
 */
function printSparkline(input = [], printColor = true) {
  const inputNumbers = input.map(Number);

  const max = Math.max(...inputNumbers);

  if (Number.isNaN(max)) throw new Error('Bad input: NaN');

  const min = Math.min(...inputNumbers);

  const range = Math.abs(max - min);

  const step = range / 8;

  const buckets = [...Array(7).keys()].map((idx) => (idx + 1) * step + min);

  const numberToBar = (number) => {
    const codePoint = buckets.reduce((point, bucket) => {
      if (number > bucket) return point + 1;
      return point;
    }, 9601 /* first unicode char of our sparkline */);
    return String.fromCodePoint(codePoint);
  };
  const sparkline = inputNumbers.map(numberToBar).join('');

  const { blue, green, yellow, reset } = {
    blue: printColor ? '\x1b[36m' : '',
    green: printColor ? '\x1b[32m' : '',
    yellow: printColor ? '\x1b[33m' : '',
    reset: printColor ? '\x1b[0m' : '',
  };
  console.log(green + sparkline + reset);
  console.log(
    `${yellow}Min: ${blue}${min}${yellow} Max: ${blue}${max}${reset}`,
  );
}

/** Prints help message */
function printHelp() {
  const helpMessage =
    'Sparkline Generator\n' +
    '  Generates a unicode sparkline chart from a list of numbers.\n\n' +
    'Usage:\n' +
    '  ./ch-2.js 1 2 3 4 5 6\n' +
    '  ./ch-2.js --no-color 1 2 3 4 5 6\n' +
    '  ./ch-2.js "2 3 4 5 6 7"\n' +
    '  ./ch-2.js "10, 12, 14, 16, 18"\n' +
    '  echo "8 6 4 2 0" | ./ch-2.js\n' +
    '  ./ch-2.js --help\n' +
    '  ./ch-2.js --version\n\n' +
    'Options:\n' +
    '  -h --help      Show this screen\n' +
    '  -n --no-color  Print output without color\n' +
    '  -v --version   Show version\n';
  console.log(helpMessage);
}

/** Prints a version number */
function printVersion() {
  console.log('v0.0.1');
}

/** Utilizes file descriptors to check for piped input
 * @returns {boolean} True if input is being piped in, else false
 */
function checkForPipedInput() {
  return new Promise((resolve, reject) => {
    // process.stdin.isTTY reports false if run as part of a child process
    // fs.fstat gives us a reliable indicator we have data being piped in
    fs.fstat(0, (error, stats) => {
      if (error) reject(error);
      resolve(stats.isFIFO());
    });
  });
}

/** Reads piped input from stdin
 * @returns {string} data piped in to the process as a string
 */
function readPipedInput() {
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

/** Checks for CLI input and prints sparkline graph, version, or help message */
async function main() {
  const args = process.argv.slice(2);

  const flagRe = new RegExp(/^--?\w+$/);

  // reduce args to inputs and flags
  const [flags, inputs] = args.reduce(
    ([inputFlags, inputData], arg) => {
      if (flagRe.test(arg)) {
        inputFlags.push(arg);
      } else {
        inputData.push(arg);
      }
      return [inputFlags, inputData];
    },
    [[], []],
  );
  // check for 'version' flag
  if (flags.includes('-v') || flags.includes('--version')) {
    printVersion();
    // exit
    process.exit(0);
  }
  // check for ANSI escape support on output
  const supportsColor =
    Boolean(process.stdout.isTTY) &&
    !flags.includes('-n') &&
    !flags.includes('--no-color');

  try {
    // check for piped input
    const isPipedInput = await checkForPipedInput();

    if (isPipedInput) {
      const pipedInput = await readPipedInput();

      // combine piped input with out inputs
      inputs.unshift(pipedInput);
    }
    // flatten any nested lists
    const input = inputs.reduce((values, arg) => {
      const unpacked = arg.split(/,? /);

      return [...values, ...unpacked];
    }, []);
    // check for input or 'help' flag
    if (
      input.length === 0 ||
      flags.includes('-h') ||
      flags.includes('--help')
    ) {
      printHelp();
      process.exit(0);
    }
    // print graph
    printSparkline(input, supportsColor);
  } catch (error) {
    const { red, reset } = {
      red: supportsColor ? '\x1b[31m' : '',
      reset: supportsColor ? '\x1b[0m' : '',
    };
    console.log(`${red}${error.message}${reset}`);
  }
}

// Main
main();

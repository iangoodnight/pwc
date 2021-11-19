#!/usr/bin/env node

/**
 * Task #2 > Minimum Platforms
 * ===========================
 *
 * You are given two arrays of arrival and departure times of trains at a
 * railway station.
 * Write a script to find out the minimum number of platforms needed so that no
 * train needs to wait.
 *
 * Example 1
 *
 * const arrivals = ['11:20', '14:30'];
 *
 * const departures = ['11:50', '15:00'];
 *
 * Output: 1
 *
 *  > The 1st train arrival is at 11:20 and this is the only train at the
 *  > station, so you need 1 platform.  Before the second arrival at 14:30, the
 *  > first train left the station at 11:50, so you will only need 1 platform.
 *
 * Example 2
 *
 * const arrivals = ['10:20', '11:00', '11:10', '12:20', '16:20', '19:00'];
 *
 * const departures = ['10:30', '13:20', '12:40', '12:50', '20:20', '21:20'];
 *
 * Output: 3
 *
 *  > Between 11:00 and 12:20, there would be at least 3 trains at the station,
 *  > so we need a minimum of 3 platforms.
 **/

'use strict';

/**
 * Built-in Node dependencies
 **/

const fs = require('fs');

const path = require('path');

/**
 * Here, the function to identify how many platforms are required (PWC Solution)
 * along with a helper function, parseTime, to make our solution a little more
 * flexible when dealing with different types of input.
 **/

function platformsNeeded(arrivals = [], departures = []) {
  if (!Array.isArray(arrivals) || !Array.isArray(departures)) {
    return '`platformsNeeded` takes two arrays of time strings as arguments.';
  }
  return [
    // First, combine the arrays along with a key
    ...arrivals.map((time) => ['arrived', parseTime(time)]),
    ...departures.map((time) => ['departed', parseTime(time)]),
  ]
    .sort(([, a], [, b]) => {
      // Sort by time
      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    })
    .reduce(
      ([current, highWaterMark], [type, time]) => {
        // find and return
        if (type === 'arrived') current++; // highWaterMark
        if (type === 'departed') current--;
        if (current > highWaterMark) highWaterMark = current;
        return [current, highWaterMark];
      },
      [0, 0],
    )
    .pop();
}

function parseTime(time = '') {
  const re = /^(\d{1,2}):?(\d{0,2}) ?([ap]m)?$/i;

  const test = time.trim().match(re);

  const [, hours, minutes = 0, meridian = null] = test;

  const pad =
    meridian && meridian.toLowerCase() === 'pm'
      ? parseInt(hours) === 12
        ? 0
        : 12
      : meridian && meridian.toLowerCase() === 'am'
      ? parseInt(hours) === 12
        ? -12
        : 0
      : 0;

  return parseInt(hours) + minutes / 60 + pad;
}

/**
 * Followed by some utilities to test our solution
 **/

function listToArray(str = '') {
  return str.split(',').map((el) => el.trim());
}

function parseTestCase(filePath = '') {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data.split('\n');

    if (!lines.length) throw new Error('Test cases improperly formatted');
    const testData = lines.filter(
      (line) => line.length !== 0 && line.charAt(0) !== '#',
    );
    const [arrivalsString, departuresString, resultString] = testData;

    const arrivals = listToArray(arrivalsString);

    const departures = listToArray(departuresString);

    const result = parseInt(resultString.trim());

    return [arrivals, departures, result];
  } catch (error) {
    console.log('Problems parsing text files: ', error);
    process.exit(1);
  }
}

function assertCorrectPlatforms(arrivals, departures, result) {
  const test = platformsNeeded(arrivals, departures);

  console.log(`Arrivals: ${arrivals}`);
  console.log(`Departures: ${departures}`);
  console.log(`Expected: ${result}`);
  if (result !== test) return console.log('\x1b[31m%s\x1b[0m', 'Failed \u2715');
  return console.log('\x1b[32m%s\x1b[0m', 'Passed \u2690');
}

const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const isDirectory = (filePath) => fs.lstatSync(filePath).isDirectory();

/**
 * And our test runner
 **/

(function main() {
  const testPath = process.argv[2] || '../test_cases/ch-2';

  try {
    if (isFile(testPath)) {
      const [arrivals, departures, result] = parseTestCase(testPath);

      console.log(testPath);
      return assertCorrectPlatforms(arrivals, departures, result);
    }
    if (isDirectory(testPath)) {
      fs.readdirSync(testPath).map((fileName) => {
        const filePath = path.join(testPath, fileName);

        const [arrivals, departures, result] = parseTestCase(filePath);

        console.log(filePath);
        assertCorrectPlatforms(arrivals, departures, result);
      });
      return;
    }
    return 'No tests found';
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
})();

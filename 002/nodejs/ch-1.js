#!/usr/bin/env node
// 002/nodejs/ch-1.js

/**
 * ## Challenge 1
 *
 * > Write a script or one-liner to remove leading zeros from positive numbers.
 */

'use strict';

const input = process.argv[2];

if (!input) {
  console.log("You must provide a number string (i.e: '000001' or '00.002')");
  process.exit(1);
}

console.log(Number(input));

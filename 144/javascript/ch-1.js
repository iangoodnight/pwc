#!/usr/bin/env node
// ch-1.js

/*******************************************************************************
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-144
 *
 * Task 1 > Semiprime
 * ==================
 *
 * Write a script to generate all Semiprime number <= 100.
 *
 * For more information about Semiprime, please checkout the wikipedia page.
 *
 * > In mathematics, a semiprime is a natural number that is the product of
 * > exactly two prime numbers. The two primes in the product may equal each
 * > other, so the semiprimes include the squares of prime numbers.
 *
 * **Example**
 * ```
 * 10 is Semiprime as 10 = 2 x 5
 * 15 is Semiprime as 15 = 3 x 5
 * ```
 ******************************************************************************/

'use strict';

function isPrime(input) {
  const num = parseInt(input, 10);

  if (num === 2) return true;
  if (num === 'NaN' || num <= 1 || num % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(num));
  let divisor = 3;

  while (divisor <= limit) {
    if (num % divisor === 0) return false;
    divisor += 2;
  }
  return true;
}

function* generatePrimes(start = 2, limit = 100) {
  let num = start;

  while (num <= limit) {
    if (isPrime(num)) yield num;
    num++;
  }
}

function* generateSemiPrimes(limit = 100) {
  let primes = [...generatePrimes(2, Math.floor(limit / 2))];

  while (primes.length > 1) {
    const [multiplier, ...rest] = primes;

    for (const prime of primes) {
      const product = prime * multiplier;

      if (product < limit) yield product;
    }
    primes = [...rest];
  }
}

function getSemiPrimes(limit = 100) {
  return [...generateSemiPrimes(limit)].sort((a, b) => a - b);
}

(function main() {
  const limit = process.argv[2] || 100;

  const semiprimes = getSemiPrimes(parseInt(limit, 10));

  console.log(`Semiprime numbers between 4 and ${limit}:`, semiprimes);
})();

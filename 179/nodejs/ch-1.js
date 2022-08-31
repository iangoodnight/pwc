#!/usr/bin/env node
// 179/nodejs/ch-1.js

/**
 * ## [Task 1: Ordinal Number Spelling][1]
 *
 * > You are given a a positive number `$n`.
 * > Write a script to spell the ordinal number.
 *
 * ### Example
 *
 * ```
 * 11 => eleventh
 * 62 => sixty-second
 * 99 => ninety-ninth
 * ```
 *
 * [1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-179/> "PWC"
 **/

'use strict';

/** return a string representing the ordinal of the input number
 * @param {number} input - input number
 **/
function toOrdinalString(input) {
  const inputNumber = parseInt(input, 10);

  if (Number.isNaN(inputNumber)) throw Error(`${input} is not a number`);
  if (inputNumber < 1) {
    throw Error(`Expected a positive integer, recieved ${input}`);
  }

  const units = [
    '',
    ['one', 'first'],
    ['two', 'second'],
    ['three', 'third'],
    ['four'],
    ['five', 'fifth'],
    ['six'],
    ['seven'],
    ['eight'],
    ['nine', 'ninth'],
    ['ten'],
    ['eleven'],
    ['twelve', 'twelfth'],
    ['thirteen'],
    ['fourteen'],
    ['fifteen'],
    ['sixteen'],
    ['seventeen'],
    ['eighteen'],
    ['nineteen'],
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const scales = [
    'hundred',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',
    'undecillion',
    'duodecillion',
    'tredecillion',
    'quatttuor-decillion',
    'quindecillion',
    'sexdecillion',
    'septen-decillion',
    'octodecillion',
    'novemdecillion',
    'vigintillion',
    'centillion',
  ];

  const tensToString = (num, ordinal = false) => {
    if (num > 99) throw Error`${num} more than two digits`;
    if (num < 20) {
      return units[num][1] || `${units[num][0]}${ordinal ? 'th' : ''}`;
    }
    const [tenSpot, oneSpot] = num.toString().split('');

    if (parseInt(oneSpot, 10) === 0) {
      return tens[tenSpot].replace(/y$/, 'th');
    }
    return `${tens[tenSpot]}-${units[oneSpot][1] || units[oneSpot][0]}th`;
  };

  if (inputNumber < 100) return tensToString(inputNumber, true);

  return [...inputNumber.toString().split('')]
    .reverse()
    .reduce((grouped, digit, idx) => {
      if (idx % 3 === 0) {
        grouped.push([digit]);
      } else {
        grouped[grouped.length - 1].unshift(digit);
      }
      return grouped;
    }, [])
    .reduce((ordinalString, group, idx, arr) => {
      // console.log(arr);
      console.log(group);
      console.log(ordinalString);
      const scale = scales[idx];

      const hundred = group.length === 3 && group[0];

      const remainder = group.join('') % 100;
      console.log('remainder', remainder);
      const hundredString =
        hundred && parseInt(hundred, 10) !== 0
          ? `${units[hundred][0]}`
          : '';
      console.log('hundreStr', hundredString);
      const remainderString = tensToString(remainder);
      console.log(remainderString);
      const tail =
        ordinalString === ''
          ? ordinalString
          : ` ${ordinalString}`;
      return `${hundredString} ${scale} ${remainderString + tail}`;
    }, '')
}

// console.log(toOrdinalString(110));
//console.log(toOrdinalString(9));
//console.log(toOrdinalString(19));
// console.log(toOrdinalString(119));
console.log(toOrdinalString(1119));
//console.log(toOrdinalString(41119));
//console.log(toOrdinalString(341119));
//console.log(toOrdinalString(2341119));
//console.log(toOrdinalString(667));
//console.log(toOrdinalString(99));
//console.log(toOrdinalString(924));
//console.log(toOrdinalString(356));
//console.log(toOrdinalString(2101));

#!/usr/bin/env node
// ch-2.js

/**
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-131/
 *
 * Task 2 > Find Pairs
 * ===================
 *
 * You are given a string of delimiter pairs and a string to search.
 *
 * Write a script to return two strings the first with any characters matching
 * the "opening character" set, the second with any matching the "closing
 * character" set.
 *
 * Example 1:
 *
 * Input:
 *
 *  Delimiter pairs: ""[]()
 *
 *  Search String: "I like (parens) and the Apple ][+" they said.
 *
 * Output:
 *
 *  "(["
 *
 *  "])"
 *
 * Example 2:
 *
 * Input:
 *
 *  Delimiter pairs: ** //<>
 *
 *  Search String: /* This is a comment (in some languages) * / <could be a tag>
 *
 *  Output:
 *   /** /<
 *   /** />
 **/

'use strict';

/**
 * Find Pairs
 **/

function findPairs(delimiters = '', string = '') {
  console.log([...delimiters]);
  const [openings, closings] = [...delimiters]
    .reduce(([open, close], el, idx) => {
      if (idx % 2) return open.push(el);
      return close.push(el);
    }, [[], []]);

  console.log(openings);
  console.log(closings);
}

findPairs('somestring');

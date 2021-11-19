#!/usr/bin/env node

/**
 * Task 2 > Add Linked Lists
 * =========================
 *
 * Given two linked lists consisting only of single-digit positive
 * numbers, write a script to add the two linked lists and create a new linked
 * list representing the sum of the two linked list numbers.  The two linked
 * lists may or may not have the same number of elements.
 *
 * HINT: Just a suggestion, feel free to develop a unique way to deal with the
 * task.  The expectation is  a class representing linked list.  It should have
 * methods to create a new linked list from a list of single-digit positive
 * numbers and a method to add a new member.  Also, have a method that takes two
 * linked list objects and returns a new linked list--finally, a method to print
 * the linked list object in a user-friendly format.
 *
 * Example 1
 * =========
 *
 * Input:  L1 = 1 -> 2 -> 3
 *         L2 = 3 -> 2 -> 1
 * Output: 4 -> 4 -> 4
 *
 * Operation: Pick the first rightmost element of L1, i.e., 3, and adds to the
 * first rightmost element of L2, i.e., 1. Finally, store the result, i.e., 3,
 * in the new linked list. Then, move to the next one of both linked lists L1
 * and L2, perform the same operation. If the sum >= 10, apply the same rule as
 * one would do to the regular addition problem, i.e., divide the sum by 10,
 * keep the remainder, and push to the new linked list. Do not forget to carry 1
 * to the next operation. If one linked list is smaller than the other, it can
 * be safely assumed that it is 0.
 *
 * Example 2
 * =========
 *
 * Input: L1 = 1 -> 2 -> 3 -> 4 -> 5
 *        L2 =           6 -> 5 -> 5
 * Output:     1 -> 3 -> 0 -> 0 -> 0
 *
 * Operations:
 *   a) 1st member of L1 = 5 and 1st member of L2 = 5
 *   b) 5 + 5 = 10
 *   c) 0 pushed to the new linked list.
 *   d) carry forward 1.
 *   e) 2nd member of L1 = 4 and 2nd member of L2 = 5
 *   f) 4 + 5 + 1 (carry) = 10
 *   h) 0 again pushed to the new linked list.
 *   i) carry forward 1.
 *   j) 3rd member of L1 = 3 and 3rd member of L2 = 6
 *   k) 3 + 6 + 1 (carry) = 10
 *   l) 0 pushed to the new linked list.
 *   m) carry forward 1.
 *   n) 4th member of L1 = 2 and assume 0 as the 4th member of L2 since there
 *      are only 3 members.
 *   o) 2 + 1 (carry) = 3
 *   p) 3 pushed to the new linked list.
 *   q) 5th member of L1 = 1 and assume 0 as the 5th member of L2 since there
 *      are only 3 members.
 *   r) 1 + 0 = 1
 *   s) 1 pushed to the new linked list.
 *
 * So the new linked list now has: 1 -> 3 -> 0 -> 0 -> 0.
 *
 * The above suggestion is one way, not necessarily the best way to deal with
 * it.
 **/

'use strict';

/**
 * Node built-in dependencies
 **/

const fs = require('fs');

const path = require('path');

/**
 * Here, our linked list class (PWC Solution)
 **/

class LinkedList {
  constructor(listElems = []) {
    const [headVal, ...rest] = listElems;

    if (headVal) {
      this.head = { next: null, previous: null, value: headVal };
      rest.forEach((value) => {
        this.push(value);
      });
    }
  }

  // Public Methods
  pop() {
    const lastNode = this.getLast();
    const { previous, value } = lastNode;

    if (previous) {
      previous.next = null;
    } else {
      delete this.head;
      return value;
    }
    return value;
  }

  // For building our list
  push(value) {
    const tail = this.getLast();

    if (!tail) {
      this.head = { next: null, previous: null, value };
      return this;
    }
    tail.next = { next: null, previous: tail, value };
    return this;
  }

  // To find the tail
  getLast() {
    let lastNode = this.head || {};
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  // To rebuild our new list
  unshift(value) {
    const newHead = { next: this.head || null, previous: null, value };

    if (this.head) this.head.previous = newHead;
    this.head = newHead;
    return this;
  }

  // Just for fun
  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  // Our PWC Solution
  sumLists(linkedList) {
    const summedList = new LinkedList();

    let carried = 0;
    while (this.head || linkedList.head) {
      // This is desctructive, and maybe not the best approach
      // might be worth refactoring later
      const thisVal = this.pop() || 0;
      const thatVal = linkedList.pop() || 0;
      const summed = thisVal + thatVal + carried;

      if (summed >= 10) {
        const val = summed - 10;

        summedList.unshift(val);
        carried = 1;
      } else {
        summedList.unshift(summed);
        carried = 0;
      }
    }
    return summedList;
  }

  // To print our lists like in the example
  toString() {
    let node = this.head;
    const values = [];

    while (node) {
      values.push(node.value);
      node = node.next;
    }
    return values.join(' -> ');
  }
}

/**
 * Followed by some utilities to test our solution
 **/

function parseTestCase(filePath = '') {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data
      .split('\n')
      .filter((line) => line.length !== 0 && line.charAt(0) !== '#');

    if (!lines.length) throw new Error('Test case unreadable at: ', filePath);

    const [first, second, test] = lines;

    const firstList = first.split(' -> ').map((el) => parseInt(el));

    const secondList = second.split(' -> ').map((el) => parseInt(el));

    if (!firstList.length || !secondList.length) {
      throw new Error('Problems parsing test cases at: ', filePath);
    }
    const firstLinkedList = new LinkedList(firstList);

    const secondLinkedList = new LinkedList(secondList);

    return [firstLinkedList, secondLinkedList, test];
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

function assertMatch(firstList, secondList, expected) {
  console.log('First List: ', firstList.toString());
  console.log('Second List: ', secondList.toString());
  console.log('Expected: ', expected);
  const test = firstList.sumLists(secondList);

  console.log('Results: ', test.toString());
  if (expected !== test.toString()) {
    return console.log('\x1b[31m%s\x1b[0m', 'Failed \u2715');
  }
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
      const [firstList, secondList, expected] = parseTestCase(testPath);
      console.log(firstList.toString());
      console.log(secondList.toString());

      console.log(testPath);
      return assertMatch(firstList, secondList, expected);
    }
    if (isDirectory(testPath)) {
      fs.readdirSync(testPath).map((fileName) => {
        const filePath = path.join(testPath, fileName);

        const [firstList, secondList, expected] = parseTestCase(filePath);

        console.log(filePath);
        assertMatch(firstList, secondList, expected);
      });
      return;
    }
    return 'No tests found';
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
})();

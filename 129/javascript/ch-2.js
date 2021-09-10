#!/usr/bin/env node

/**
 * Given two linked lists consisting only of single-digit positive
 * numbers, write a script to add the two linked lists and create a new linked
 * list representing the sum of the two linked list numbers.  The two linked
 * lists may or may not have the same number of elements.
 *
 * HINT: Just a suggestion, feel free to develop a unique way to deal with the
 * task.  The expectataion is  a class representing linked list.  It should have
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

const testList = [5, 4, 3, 2, 1];

class LinkedList {
  constructor(listElems) {
    const [headVal, ...rest] = listElems;

    this.head = { next: null, previous: null, value: headVal };
    rest.forEach((value) => {
      this.appendNode(value);
    });
  }
  // Private Methods
  #sumAndCarryOver(value1, value2) {

  }
  // Public Methods
  appendNode(value) {
    const tail = this.getLast();

    tail.next = { value, next: null, previous: tail };
  }
  getLast() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }
  printList() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        process.stdout.write(`${lastNode.value} -> `);
        lastNode = lastNode.next;
      }
      console.log(`${lastNode.value}`);
    }
  }
  size() {
    let count = 0;
    let node = this.head;
    while(node) {
      count++;
      node = node.next;
    }
    return count;
  }
  sumLists(linkedList) {
    const bigList = this.size() > linkedList.size() ? this: linkedList;

    const littleList = this.size() < linkedList.size() ? this: linkedList;

    const valueArray = [];

    let bigListNode = bigList.getLast();
    let littleListNode = littleList.getLast();
    let carried = 0;

    if (bigListNode && littleListNode) {
      let sum = bigListNode.value + littleListNode.value;
      if (sum >= 10) {
        valueArray.push(0);
        carried = sum - 10;
      }
      if (sum < 10) valueArray.push(sum);

      while (bigListNode.previous) {
        const { previous: {  value: bigVal = 0 } = {}} = bigListNode;

        const { previous: {  value: littleVal = 0 } = {}} = littleListNode;
      }
    }
  }
}

let list = new LinkedList(testList);

list.printList();

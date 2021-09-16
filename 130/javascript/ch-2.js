#!/usr/bin/env node

/**
 * ch-2.js
 *
 * Task 2 > Binary Search Tree
 * ===========================
 *
 * You are given a tree.  Write a script to find out if the given tree is a
 * `Binary Seach Tree (BST)`.  According to wikipedia, the definition of BST:
 *
 * > A binary search tree is a rooted binary tree, whose internal nodes each
 * > store a key (and optionally, an associated value), and each had two
 * > distinguished sub-trees, commonly denoted left and right.  The tree
 * > additionally satisfies the binary seach property: the key in each node is
 * > greater than or equal to any key stored in the left sub-tree, and less than
 * > or equal to any key stored in the right sub-tree.  The leaves (final nodes)
 * > of the tree contain no key and have no structure to distinguish them from
 * > one another.
 *
 * Example 1
 * =========
 *
 * Input:
 *
 *     8
 *    / \
 *   5   9
 *  / \
 * 4   6
 *
 * Output: 1 as the given tree is a BST.
 *
 * Example 2
 * =========
 *
 * Input:
 *
 *     5
 *    / \
 *   4   7
 *  / \
 * 3   6
 *
 * Output: 0 as the given tree is not a BST.
 **/

'use strict';

/**
 * Node built-in dependencies
 **/

const fs = require('fs');

const path = require('path');

/**
 * Here, our BinarySearchTree class (PWC solution)
 **/

function isBST(binaryTree = {}) {
  // Guard against obviously bad input
  if (typeof binaryTree !== 'object' || !binaryTree.root) return false;
  // This is our actual solution, `isBST` is just a wrapper for it
  const recurse = ((node, min = null, max = null) => {
    // if no node, we've reached the end of the tree without failing.  Pass.
    if (!node) return true;
    // if we've exceed our max, fail
    if (max !== null && node.data >= max) return false;
    // if we find a value less than our min, fail
    if (min !== null && node.data <= min) return false;
    // Recurse through the rest of the nodes.
    return (
      recurse(node.left, min, node.data) &&
      recurse(node.right, node.data, max)
    );
  });
  // Start recursing at the validated root
  return recurse(binaryTree.root);
 }

/**
 * Followed by some utilities to test our solution
 **/

class BinaryNode {
  constructor(data) {
    this.data = data;
  }
  // addRight and addLeft methods to keep our nodes binary and our leaves clear
  addRight(data) {
    if (this.right) return false;
    this.right = new BinaryNode(data);
    return this;
  }

  addLeft(data) {
    if (this.left) return false;
    this.left = new BinaryNode(data);
    return this;
  }
}

class BinaryTree {
  constructor(data = null) {
    if (data !== null) {
      this.root = new BinaryNode(data);
    } else {
      this.root = data;
    }
  }
  // In the case where Binary tree is initialized without a root or when
  // over-writing an existing tree.
  addRoot(data) {
    if (!data) return false;
    this.root = new BinaryNode(data);
  }
  // Private crawl method
  #crawl(callback) {
    const recurse = (node) => {
      callback(node);
      if (node.left) recurse(node.left);
      if (node.right) recurse(node.right);
    }
    recurse(this.root);
  }
  // Find and return a node by data value to assist in building our tree
  findNode(data) {
    let found = false;
    this.#crawl((node) => {
      if (node.data === data) {
        found = node;
        return;
      }
    });
    return found;
  }
}

function buildTreeFromStringArr(stringArr = []) {
  const binaryTree = new BinaryTree();

  const root = parseInt([...stringArr].shift().trim());

  if (root === NaN) return binaryTree;
  const lines = [...stringArr];

  binaryTree.addRoot(root);

  while (lines.length > 0) {
    const valueString = lines.shift();

    const values = valueString.trim().split(/\s+/)
      .map((val) => {
        return { value: parseInt(val), idx: valueString.indexOf(val) };
      });

    const connections = lines.shift();

    const leaves = lines[0];

    if (connections) {
      for (let i = 0; i < values.length; i++) {
        const node = binaryTree.findNode(values[i].value);

        const leftBound = i === 0 ? 0: values[i - 1].idx + 1;

        const rightBound = i === values.length - 1 ?
          leaves.length :
          values[i + 1]?.idx + 1;
        const connectionRange = connections.slice(leftBound, rightBound);

        const leftIdx = connectionRange.indexOf('/');

        const rightIdx = connectionRange.indexOf('\\');

        const left = leftIdx !== -1 && leftIdx < values[i].idx;

        const right = rightIdx !== -1 && rightIdx > values[i].idx;

        if (left) {
          const range = leaves.slice(leftBound, values[i].idx);

          const leaf = parseInt(range.trim());

          node.addLeft(leaf);
        }

        if (right) {
          const range = leaves.slice(values[i].idx + 1, rightBound);

          const leaf = parseInt(range.trim());

          node.addRight(leaf);
        }
      }
    }
  }
  return binaryTree;
}

function parseTestCase(filePath = '') {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const lines = data.split('\n')
      .filter(line => {
        return line.trim().charAt(0) !== '#' && line.trim().length !== 0;
      }
    );
    const [treeData, outputs] = lines.reduce(([data, tests], line) => {
      if (tests.length > data.length) data.push([]);
      if (line.indexOf('Output') !== -1) {
        tests.push(line.trim());
        return [data, tests];
      }
      data[tests.length].push(line);
      return [data, tests];
    },[[[]], []]);

    const trees = treeData.map(treeArr => buildTreeFromStringArr(treeArr));

    console.log(trees);
    // TO Do, parse OUtput;

  } catch (error) {
    console.log('Problems parsing test cases: ', error);
  }
}


parseTestCase('../test_cases/ch-2/case-1.txt');

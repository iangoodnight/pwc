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
 * > distinguished sub-trees, commonly denotes left and right.  The tree
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

class BinarySearchTree {
  constructor(data = null) {
    if (data !== null) {
      this.root = { data };
    } else {
      this.root = data;
    }
  }

  add(data) {
    if (this.root === null) {
      this.root = { data, left: null, right: null };
      return this;
    }
    return this.#insertNode(this.root, data);
  }

  #insertNode(node, data) {
    const { data: compareData, left = null, right = null } = node;
    if (data < compareData) {
      if (left !== null) return this.#insertNode(left, data);
      node.left = { data };
      return this;
    }
    if (right !== null) return this.#insertNode(right, data);
    node.right = { data };
    return this;
  }

  toString() {
    const rows = [];

    let nodes = [this.root];
    let depth = 0;

    while (nodes.length > 0) {
      let children = []
      const branches = [];

      const values = [];

      nodes.forEach(node => {
        if (node.data) {
          values.push(node.data);
          depth++;
        }
        if (node.left) {
          children.push(node.left);
          branches.push('/');
        }
        if (node.right) {
          children.push(node.right);
          branches.push('\\');
        }
        if (node.right || node.left) depth++;
      });

      rows.push(values);
      if (branches.length > 0) rows.push(branches);

      nodes = children;
    }
    console.log(rows);
  }
}

const test = new BinarySearchTree(15);

test.add(25);
test.add(10);
test.add(7);
test.add(22);
test.add(17);
test.add(13);
test.add(5);
test.add(9);
test.add(27);

console.log(test);
test.toString();

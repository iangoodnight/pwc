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
}

function isBST(binaryTree = {}) {
  if (typeof binaryTree !== 'object' || !binaryTree.root) return false;

  const recurse = ((node, min = null, max = null) => {
    console.log(node);
    console.log('min: ', min, 'max: ', max);
    if (!node) return true;
    if (max !== null && node.data >= max) return false;
    if (min !== null && node.data <= max) return false;

    return (
      recurse(node.left, min, node.data) &&
      recurse(node.right, node.data, max)
    );
  });

  return recurse(binaryTree.root);
 }

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
  // over-writing an exisiting tree.
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
  // Find and return a node by data value
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

/**
 * Followed by some utilities to test our solution
 **/



const test = new BinaryTree(8);

test.findNode(8).addLeft(5).addRight(9);
test.findNode(5).addLeft(4).addRight(6);

const test2 = new BinaryTree(5);

test2.findNode(5).addLeft(4).addRight(7);
test2.findNode(4).addLeft(3).addRight(6);

console.log(isBST(test));
console.log(isBST(test2));

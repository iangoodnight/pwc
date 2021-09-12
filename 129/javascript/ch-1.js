#!/usr/bin/env node

/**
 * Task 1 > Root Distance
 * ======================
 *
 * Given a tree and a node of a given tree, write a script to find out the
 * distance of the node from the root.
 *
 * Example 1
 * =========
 *
 * Tree:
 *       1
 *      / \
 *     2   3
 *          \
 *           4
 *          / \
 *         5   6
 *
 * Node: 6
 * Output: 3 as the distance of given node 6 from the root (1).
 *
 * Node: 5
 * Output: 3
 *
 * Node: 2
 * Output: 1
 *
 * Node: 4
 * Output: 2
 *
 * Example 2
 * =========
 *
 * Tree:
 *       1
 *      / \
 *     2   3
 *    /     \
 *   4       5
 *    \     /
 *     6   7
 *    / \
 *   8   9
 *
 * Node: 7
 * Output: 3 as the distance of given node 6 from the root (1).
 *
 * Node: 8
 * Output: 4
 *
 * Node: 6
 * Output: 3
 **/

'use strict';

/**
 * Node built-in dependencies
 **/

const fs = require('fs');

const path = require('path');

/**
 * Here, our Tree class with the method to find distance from root (PWC
 * Solution)
 **/

class Tree {
  constructor(root) {
    this.root = root || null;
  }
  // For building out tree
  addNode(value, parentValue) {
    if (!value) return null;
    const newNode = { children: [], value };

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.#crawl((node) => {
      if (node.value === parentValue) {
        newNode.parent = node;
        node.children.push(newNode);
        return this;
      }
    });
  }
  // Private method to traverse node
  #crawl(callback) {
    const recurse = (node) => {
      callback(node);
      node.children.forEach((child) => {
        recurse(child);
      });
    }
    recurse(this.root);
  }
  // This method provides our solution
  distanceFromRoot(value) {
    let distance = 0;
    let node = this.find(value);

    if (!node.parent) return distance;

    while (node.parent) {
      distance += 1;
      node = node.parent;
    }
    return distance;
  }
  // To find our target node
  find(value) {
    let found = false;
    this.#crawl((node) => {
      if (node.value === value) {
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

function parseTestCase(filePath = '') {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    const [lines, tests] = data.split('\n')
      .reduce(([tmpLines, tmpTests], line) => {
        if (line.charAt(0) === '#' || line.length === 0) {
          return [tmpLines, tmpTests];
        }

        if (line.split('').indexOf(',') !== -1) {
          const test = line.trim().split(',')
            .map(char => parseInt(char.trim()));

          tmpTests.push(test);
          return [tmpLines, tmpTests];
        }

        tmpLines.push(line);
        return [tmpLines, tmpTests];
      }, [[], []]
    );

    const tree = new Tree();

    lines.forEach((line, idx) => {
      if (tree.root === null) {
        const value = parseInt(line.trim());

        tree.addNode(value);
        return;
      }

      let connections = /\\|\//;
      if (line.match(connections)) return;

      const parents = lines[idx - 2].split('').filter(char => {
        if (char !== ' ') return char;
      }).map(val => {
        return tree.find(parseInt(val));
      });

      const children = line.split('').reduce((matched, char, i) => {
        if (char !== ' ') {
          matched.push([parseInt(char), i]);
        }
        return matched;
      }, []);

      children.forEach(child => {
        const [ value, i ] = child;

        const connector = lines[idx - 1]
          .split('')
          .slice(i - 1 < 0 ? 0: i - 1, i + 2)
          .reduce((parentIdx, char) => {
            if (char.match(connections)) {
              return char === '/' ? i + 2: char === '\\' ? i - 2: null;
            }
            return parentIdx;
          }, null
        );
        const parentVal = parseInt(lines[idx - 2].split('')[connector]);

        const parent = parents.reduce((match, node) => {
          if (node.value === parentVal) return node;
          return match;
        }, null);

        const newNode = { children: [], parent, value };

        parent.children.push(newNode);
      });
    });
    const display = lines.join('\n');

    return { tree, tests, display };
  } catch (error) {
    console.log('Problems parsing test case at path ', filePath, '\n', error);
  }
}

function assertMatch(tree, tests) {
  tests.forEach(test => {
    const [ value, expected ] = test;

    const result = tree.distanceFromRoot(value);

    console.log(`Distance from ${value} to root`);
    console.log(`Expected: ${expected}`);
    console.log(`Result: ${result}`);

    if (expected === result) {
      console.log('\x1b[32m%s\x1b[0m', 'Passed \u2690');
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'Failed \u2715');
    }
  });
}

const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const isDirectory = (filePath) => fs.lstatSync(filePath).isDirectory();

/**
 * And our test runner
 **/

(function main() {
  const testPath = process.argv[2] || '../test_cases/ch-1';

  try {
    if (isFile(testPath)) {
      const { tree, tests, display } = parseTestCase(testPath);

      console.log('Case: ', testPath);
      console.log('\n' + display + '\n');

      return assertMatch(tree, tests);
      console.log('\n\n');
    }

    if (isDirectory(testPath)) {
      fs.readdirSync(testPath).map(fileName => {
        const filePath = path.join(testPath, fileName);

        const { tree, tests, display } = parseTestCase(filePath);

        console.log('Case: ', filePath);
        console.log('\n' + display + '\n');

        assertMatch(tree, tests);
        console.log('\n\n');
      });
      return;
    }

    return 'No tests found';
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
})();

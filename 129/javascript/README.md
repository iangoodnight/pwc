# Perl Weekly Challenge Club - 129

I've been spending the last year or so focusing more on functional JavaScript,
so this week's OOP challenges were a good refresher on some design patterns I
haven't utilized for some time.  Additionally, the data structures referenced 
are ones that I've worked with, but never really programmed myself.
Unfortunately, I ran out of time to implement my solutions in Perl, but I'm
hoping to finish up those solutions at a later date.

## Task 1 > Root Distance

> Given a tree and a node of a given tree, write a script to find out the
> distance of the node from the root.

### Example 1

**Tree:**

```
  1
 / \
2   3
     \
      4
     / \
    5   6
```

Node: 6

Output: 3 as the distance of given node 6 from the root (1).

Node: 5

Output: 3

Node: 2

Output: 1

Node: 4

Output: 2

### Example 2

**Tree:**

```
    1
   / \
  2   3
 /     \
4       5
 \     /
  6   7
 / \
8   9
```

Node: 7

Output: 3 as the distance of given node 6 from the root (1).

Node: 8

Output: 4

Node: 6

Output: 3

### SOLUTION

```javascript

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

```

### ch-1.js

Running `./ch-1.js` tests our solution against the test cases found at:
  `../test_cases/ch-1`

#### Output

```
Case:  ../test_cases/ch-1/case-1.txt

  1
 / \
2   3
     \
      4
     / \
    5   6

Distance from 6 to root
Expected: 3
Result: 3
Passed ⚐
Distance from 5 to root
Expected: 3
Result: 3
Passed ⚐
Distance from 2 to root
Expected: 1
Result: 1
Passed ⚐
Distance from 4 to root
Expected: 2
Result: 2
Passed ⚐



Case:  ../test_cases/ch-1/case-2.txt

    1
   / \
  2   3
 /     \
4       5
 \     /
  6   7
 / \
8   9

Distance from 7 to root
Expected: 3
Result: 3
Passed ⚐
Distance from 8 to root
Expected: 4
Result: 4
Passed ⚐
Distance from 6 to root
Expected: 3
Result: 3
Passed ⚐
```

#### Custom tests

`./ch-1.js` will optionally accept a path to test a file or directory of test
files (ie: `$ ./ch-1.js ./local_test.txt`).  Test files must be formatted as 
shown in the `../test_cases/ch-1` directory.  Lines beginning with `#` will be
ignored.

## Task 2 > Add Linked Lists

> Given two linked lists consisting only of single-digit positive numbers, write
> a script to add the two linked lists and create a new linked list representing
> the sum of the two linked list numbers.  The two linked lists may or may not
> have the same number of elements.

> **HINT:** Just a suggestion, feel free to develop a unique way to deal with
> the task.  The expectation is  a class representing linked list.  It should
> have methods to create a new linked list from a list of single-digit positive
> numbers and a method to add a new member.  Also, have a method that takes two
> linked list objects and returns a new linked list--finally, a method to print
> the linked list object in a user-friendly format.

### Example 1

Input:  L1 = 1 -> 2 -> 3

        L2 = 3 -> 2 -> 1
        
Output: 4 -> 4 -> 4

Operation: Pick the first rightmost element of L1, i.e., 3, and adds to the
first rightmost element of L2, i.e., 1. Finally, store the result, i.e., 3,
in the new linked list. Then, move to the next one of both linked lists L1 and
L2, perform the same operation. If the sum >= 10, apply the same rule as one
would do to the regular addition problem, i.e., divide the sum by 10, keep the
remainder, and push to the new linked list. Do not forget to carry 1 to the next
operation. If one linked list is smaller than the other, it can be safely
assumed that it is 0.

###Example 2

Input: L1 = 1 -> 2 -> 3 -> 4 -> 5

       L2 =           6 -> 5 -> 5
       
Output:     1 -> 3 -> 0 -> 0 -> 0

Operations:
  a) 1st member of L1 = 5 and 1st member of L2 = 5
  b) 5 + 5 = 10
  c) 0 pushed to the new linked list.
  d) carry forward 1.
  e) 2nd member of L1 = 4 and 2nd member of L2 = 5
  f) 4 + 5 + 1 (carry) = 10
  h) 0 again pushed to the new linked list.
  i) carry forward 1.
  j) 3rd member of L1 = 3 and 3rd member of L2 = 6
  k) 3 + 6 + 1 (carry) = 10
  l) 0 pushed to the new linked list.
  m) carry forward 1.
  n) 4th member of L1 = 2 and assume 0 as the 4th member of L2 since there
     are only 3 members.
  o) 2 + 1 (carry) = 3
  p) 3 pushed to the new linked list.
  q) 5th member of L1 = 1 and assume 0 as the 5th member of L2 since there
     are only 3 members.
  r) 1 + 0 = 1
  s) 1 pushed to the new linked list.

So the new linked list now has: 1 -> 3 -> 0 -> 0 -> 0.

The above suggestion is one way, not necessarily the best way to deal with it.

### SOLUTION

```javascript
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
    let lastNode = this.getLast();
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
    while(node) {
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
      const thisVal = this.pop() || 0,
            thatVal = linkedList.pop() || 0;
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
```

### ch-2.js

Running `./ch-2.js` tests our solution against the test cases found at:
  `../test_cases/ch-2`

#### Output

```
../test_cases/ch-2/case-1.txt
First List:  1 -> 2 -> 3
Second List:  3 -> 2 -> 1
Expected:  4 -> 4 -> 4
Results:  4 -> 4 -> 4
Passed ⚐
../test_cases/ch-2/case-2.txt
First List:  1 -> 2 -> 3 -> 4 -> 5
Second List:  6 -> 5 -> 5
Expected:  1 -> 3 -> 0 -> 0 -> 0
Results:  1 -> 3 -> 0 -> 0 -> 0
Passed ⚐
```

#### Custom tests

`./ch-2.js` will optionally accept a path to test a file or directory of test
files (ie: `$ ./ch-2.js ./local_test.txt`).  Test files must be formatted as 
shown in the `../test_cases/ch-2` directory.  Lines beginning with `#` will be
ignored.

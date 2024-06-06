# Perl Weekly Challenge - 272

Typescript solutions to [Perl Weekly Challenge - 272][1].

## Task 1: Defang IP Address

**Submitted by:** [Mohammad Sajid Anwar][2]

You are given a valid `IPv4` address.

Write a script to return the defanged version of the given IP address.

A defanged IP address replaces every period “.” with “[.]".

**Example 1**

```
Input: $ip = "1.1.1.1"
Output: "1[.]1[.]1[.]1"
```

**Example 2**

```
Input: $ip = "255.101.1.0"
Output: "255[.]101[.]1[.]0"
```

### Solution

Nothing too earth-shattering [here][3]. Just a simple string replacement.
Running `npm install` will install the necessary dependencies to run the tests.

```typescript
function defangIpAddr(address: string): string {
  return address.replace(/\./g, '[.]');
}
```

Run `npm test task1` to verify.

## Task 2: String Score

**Submitted by:** [Mohammad Sajid Anwar][2]

You are given a string, `$str`.

Write a script to return the score of the given string.

> The score of a string is defined as the sum of the absolute difference between
> the ASCII values of adjacent characters.

**Example 1**

```
Input: $str = "hello"
Output: 13

ASCII values of characters:
h = 104
e = 101
l = 108
l = 108
o = 111

Score => |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111|
      => 3 + 7 + 0 + 3
      => 13
```

**Example 2**

```
Input: "perl"
Output: 30

ASCII values of characters:
p = 112
e = 101
r = 114
l = 108

Score => |112 - 101| + |101 - 114| + |114 - 108|
      => 11 + 13 + 6
      => 30
```

**Example 3**

```
Input: "raku"
Output: 37

ASCII values of characters:
r = 114
a = 97
k = 107
u = 117

Score => |114 - 97| + |97 - 107| + |107 - 117|
      => 17 + 10 + 10
      => 37
```

### Solution

The [solution][4] is pretty straightforward. Just iterate over the string and
calculate the absolute difference between the ASCII values of adjacent
characters. The sum of these differences is the score.

```typescript
function stringScore(str: string): number {
  const characters: string[] = str.split('');
  // We could use a for loop, but I like the reduce pattern.
  return characters.reduce(
    (score: number, character: string, index: number, characters: string[]) => {
      if (index === 0) return score;
      const charCode: number = character.charCodeAt(0);
      const previousIndex: number = index - 1;
      const previousCharacter: string = characters[previousIndex] || '';
      const previousCharCode: number = previousCharacter.charCodeAt(0);
      const newScore: number = Math.abs(charCode - previousCharCode);
      return score + newScore;
    },
    0,
  );
}
```

Run `npm test task2` to verify.

[1]: https://perlweeklychallenge.org/blog/perl-weekly-challenge-272/
[2]: https://manwar.org/
[3]: ./task1.ts
[4]: ./task2.ts

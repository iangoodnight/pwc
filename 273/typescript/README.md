# Perl Weekly Challenge - 273

Solutions to the [Perl Weekly Challenge - 273][1].

- [Task 1: Percentage of Character](#task-1-percentage-of-character)
- [Task 2: B After A](#task-2-b-after-a)

## Task 1: Percentage of Character

**Submitted by:** [Mohammad Sajid Anwar][2]

You are given a string, `$str` and a character `$char`.

Write a script to return the percentage, nearest whole, of given character in
the given string.

**Example 1**

```
Input: $str = "perl", $char = "e"
Output: 25
```

**Example 2**

```
Input: $str = "java", $char = "a"
Output: 50
```

**Example 3**

```
Input: $str = "python", $char = "m"
Output: 0
```

**Example 4**

```
Input: $str = "ada", $char = "a"
Output: 67
```

**Example 5**

```
Input: $str = "ballerina", $char = "l"
Output: 22
```

**Example 6**

```
Input: $str = "analitik", $char = "k"
Output: 13
```

### Solution

The [solution][3] is pretty straightforward. We just need to take the number of
characters in the string and the number of occurrences of the character in the
string. We then calculate the percentage of the character in the string.

```typescript
function percentageOfCharacter(str: string, char: string): number {
  const length: number = str.length;
  const count: number = str.split('').filter((c: string) => c === char).length;
  // multiply by 100 to get percentage as whole number
  const HUNDRED: number = 100;
  const percentage: number = (count / length) * HUNDRED;

  return Math.round(percentage);
}
```

## Task 2: B After A

**Submitted by:** [Mohammad Sajid Anwar][2]

You are given a string, `$str`.

Write a script to return `true` if there is at least one `b`, and no `a` appears
after the first `b`.

**Example 1**

```
Input: $str = "aabb"
Output: true
```

**Example 2**

```
Input: $str = "abab"
Output: false
```

**Example 3**

```
Input: $str = "aaa"
Output: false
```

**Example 4**

```
Input: $str = "bbb"
Output: true
```

### Solution

We _could_ iterate over the characters in the string and keep track of the
occurrence of `a` and `b`. If we find a `b` we set a flag to indicate that we
have seen a `b`. If we find an `a` after the flag is set, we return `false`. It
ends up being a little simpler to use a regular expression to match the pattern.

```typescript
function bAfterA(str: string): boolean {
  return str.match(/^[^b]*b[^a]*$/) !== null;
}
```

[1]: https://perlweeklychallenge.org/blog/perl-weekly-challenge-272/
[2]: https://manwar.org/
[3]: ./task1.ts
[4]: ./task2.ts

# [Perl Weekly Challenge Club][1]

I had been looking for an excuse to brush up on some languages I don't get the
chance to use often (ruby, python, maybe more to come), and I figured I might as
well see if I can catch up on some of the first **Weekly Challenges** hosted by
the [Perl Weekly Challenge Club][1].  So without further ado, here are my
`nodejs` solutions for **Week 1** of the PWC.

## [Challenge 1][1]

> Write a script to replace the `e` with `E` in the string `Perl Weekly
> Challenge`. Also, print the number of times the character `e` is found in the
> string.

### Solution 1

Starting with a simple find and replace function.  No real need to use Regex
here (especially with all the regex characters replaced), but no harm in it
either.  I chose to break this into some smaller simple functions, and add some
terminal colors for kicks.

```javascript
// it would be a shorter solution to combine `count` and `replace` into one
// function, and it would save me sanitizing input twice, but I'm sure there
// will be more opportunities to replace strings in the future.
function count(string = 'Perl Weekly Challenge', letter = 'e') {
  const sanitized = sanitize(letter);

  return string.match(new RegExp(sanitized, 'g'))?.length;
}
// Add some terminal color to the output via ansi escapes
function print(string) {
  console.log(`\x1b[94m${string}\x1b[0m`);
}
// This will return our answer string
function replace(string = 'Perl Weekly Challenge', letter = 'e') {
  const sanitized = sanitize(letter);

  return string.replace(new RegExp(sanitized, 'g'), letter.toUpperCase());
}
// Might be better _not_ to sanitize input and allow for full regex searches
function sanitize(string = '') {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// Wrap it in main to allow for terminal input arguments when running our
// script.  Prints the answer described in the challenge by default
(function main() {
  const [, , string, toReplace] = process.argv;

  const replacedString = replace(string, toReplace);

  print(replacedString);
  print(`Count: ${count(string, toReplace)}`);
})();
```

#### Result

No colors in the README, but we ended up with our solution and some snazzy
colors to boot.

```
PErl WEEkly ChallEngE
Count: 5
```

## [Challenge 2][1]

> Write a one-liner to solve the *FizzBuzz* problem and print the numbers 1
> through 20.  However, any number divisible by *3* should be replaced by the
> word 'fizz' and any number divisible by *5* by the word 'buzz'.  Those numbers
> that are both divisible by *3* and *5* become 'fizzbuzz'.

### Solution 2

Ah, the classic **FizzBuzz**.  At this point, I feel like I've solved this more
ways than there are flavors of ice cream, but one more can't hurt.  The prompt
is to write a one-liner, but golf isn't my sport so we'll wriggle the rules a
bit.

```javascript
// wrapping it in a function adds length to our "one-liner" but it makes the
// code more reusable
const fizzBuzz = (l = 20) =>
  // this is our actual one-liner (just wrap it in a console.log)
  [...Array(parseInt(l, 10)).keys()]
    .map((x) =>
      ++x % 15 === 0
        ? 'fizzbuzz'
        : x % 5 === 0
        ? 'buzz'
        : x % 3 === 0
        ? 'fizz'
        : x,
    )
    .join(' ');

(function main() {
  // wrapped in main to allow for CLI arguments
  const [, , length] = process.argv;

  console.log(fizzBuzz(length));
})();
```

### Result

No funny colors this time (in deference to brevity).  We get what you would
expect.

```
1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16 17 fizz 19 buzz
```


[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

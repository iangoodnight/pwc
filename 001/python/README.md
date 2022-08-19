# [Perl Weekly Challenge Club][1]

I had been looking for an excuse to brush up on some languages I don't get the
chance to use often (ruby, python, maybe more to come), and I figured I might as
well see if I can catch up on some of the first **Weekly Challenges** hosted by
the [Perl Weekly Challenge Club][1].  So without further ado, here are my
`python` solutions for **Week 1** of the PWC.

## [Challenge 1][1]

> Write a script to replace the `e` with `E` in the string `Perl Weekly
> Challenge`. Also, print the number of times the character `e` is found in the
> string.

### Solution 1

Starting with a simple find and replace function.  To mix it up an leep it 
pythonic, I opted for an object-oriented solution with some extra terminal 
colors for kicks.

```python
import re
import sys


class Replacer:
    """Replacer handles both string replacement and replacement count

    Attributes:
        string: str, default 'Perl Weekly Challenge'
            The source string
        replace: str, default 'e'
            The text to replace and count
    """
    def __init__(self, string=None, match=None):
        """Inits Replacer with defaults if no args provided"""
        self.string = string if string is not None else 'Perl Weekly Challenge'
        self.match = match if match is not None else 'e'

    def count(self):
        """Counts matches

        return int: Returns count of matches
        """
        escaped = re.escape(self.match)
        return len(re.findall(escaped, self.string))

    def pretty_print(self):
        """Prints replaced string and count with terminal colors"""
        count = self.count()
        replaced = self.replaced()

        print(f"\u001b[32m{replaced}\u001b[0m")
        print(f"\u001b[33m{count}\u001b[0m")

    def replaced(self):
        """Performs string replacement

        return str: Returns replaced string
        """
        return self.string.replace(self.match, self.match.upper())


try:
    INPUT_STRING = sys.argv[1]
except IndexError:
    INPUT_STRING = None

try:
    INPUT_MATCH = sys.argv[2]
except IndexError:
    INPUT_MATCH = None

def count(string, match)
  string.count(match)
end

def replace(string, replace)
  string.gsub(replace, replace.upcase)
end

def print_result(string, match)
  puts "\e[32m#{replace(string, match)}\e[0m"
  puts "\e[33m#{count(string, match)}\e[0m"
end

# Optionally, take `string` and `match` arguments from the CLI
string = ARGV[0] || 'Perl Weekly Challenge'
match = ARGV[1] || 'e'

print_result(string, match)
```

#### Result

No colors in the README, but we ended up with our solution and some snazzy
colors to boot.

```
PErl WEEkly ChallEngE
Count: 5
```

## [Challenge 2][1]

> Write a one-liner to solve the **FizzBuzz** problem and print the numbers`1` 
> through `20`.  However, any number divisible by **3** should be replaced by
> the word **fizz** and any number divisible by **5** by the word **buzz**.
> Those numbers that are both divisible by **3** and **5** become **fizzbuzz**.

### Solution 2

Ah, the classic **FizzBuzz**.  At this point, I feel like I've solved this more
ways than there are flavors of ice cream, but this is my first one in python.
The prompt is to write a one-liner, but golf isn't my sport so we'll wriggle the
rules a bit and wrap our solution in a subroutine with some terminal colors to
boot.

```python
import sys


def fizzbuzz(length=20):
    """
    Return a fizzbuzz string from 1 to length

    :param int length: Optional length argument, default 20
    :return str: FizzBuzz
    """
    if length is None:
        length = 20

    transformed = []

    for i in range(1, length + 1):
        if i % 15 == 0:
            transformed.append("\u001b[32mfizzbuzz \u001b[0")
        elif i % 5 == 0:
            transformed.append("\u001b[32mbuzz \u001b[0")
        elif i % 3 == 0:
            transformed.append("\u001b[32mfizz \u001b[0")
        else:
            transformed.append(f"\u001b[33m{str(i)} \u001b[0")

    return ''.join(transformed)


try:
    INPUT_LENGTH = int(sys.argv[1])
except IndexError:
    INPUT_LENGTH = None

print(fizzbuzz(INPUT_LENGTH))
```

### Result

Our solution allows for an optional length argument from the CLI.  Without a
length argument, we get output as described in the challenge description above.

```
1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16 17 fizz 19 buzz
```

[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

# [Perl Weekly Challenge Club][1]

I had been looking for an excuse to brush up on some languages I don't get the
chance to use often (ruby, python, maybe more to come), and I figured I might as
well see if I can catch up on some of the first **Weekly Challenges** hosted by
the [Perl Weekly Challenge Club][1].  So without further ado, here are my
`ruby` solutions for **Week 1** of the PWC.

## [Challenge 1][1]

> Write a script to replace the `e` with `E` in the string `Perl Weekly
> Challenge`. Also, print the number of times the character `e` is found in the
> string.

### Solution 1

Starting with a simple find and replace function.  I chose to break it into a 
few smaller subroutines and to add some terminal colors just for kicks.  Still,
even with the extra bits, this is probably my shortest solution (so short that
breaking up the functions seems a little silly in retrospect).

```ruby
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
ways than there are flavors of ice cream, but this is my first one in ruby.  The
prompt is to write a one-liner, but golf isn't my sport so we'll wriggle the
rules a bit and wrap our solution in a subroutine with some terminal colors to
boot.

```ruby
length = ARGV[0] || 20

fizzbuzz = (1..length.to_i).map do |n|
  if (n % 15).zero?
    "\e[32mfizzbuzz\e[0m"
  elsif (n % 5).zero?
    "\e[32mbuzz\e[0m"
  elsif (n % 3).zero?
    "\e[32mfizz\e[0m"
  else
    "\e[33m#{n}\e[0m"
  end
end.join ' '

# Could have added this to the one-liner above, but it ain't hurting anyone
puts fizzbuzz
```

### Result

Our solution allows for an optional length argument from the CLI.  Without a
length argument, we get output as described in the challenge description above.

```
1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16 17 fizz 19 buzz
```

[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

# [Perl Weekly Challenge Club][1]

I had been looking for an excuse to brush up on some languages I don't get the
chance to use often (ruby, python, maybe more to come), and I figured I might as
well see if I can catch up on some of the first **Weekly Challenges** hosted by
the [Perl Weekly Challenge Club][1].  So without further ado, here are my
`perl` solutions for **Week 1** of the PWC.

## [Challenge 1][1]

> Write a script to replace the `e` with `E` in the string `Perl Weekly
> Challenge`. Also, print the number of times the character `e` is found in the
> string.

### Solution 1

Starting with a simple find and replace function.  I chose to break it into a 
few smaller subroutines and to add some terminal colors just for kicks.

```perl
use strict;
use warnings;
use Term::ANSIColor;

# This provides us with our new "replaced" string
sub replace {
  my ( $string, $to_replace ) = @_;

  $string =~ s/(\Q$to_replace\E)/uc($1)/eg;

  return $string;
}

# Could have done this as part of the "replace" function, but breaking it up
# makes our code more reusable in the future.
sub count {
  my ( $string, $match ) = @_;

  my @count = $string =~ m/(\Q$match\E)/g;

  return scalar @count;
}

# Adding some color for fun and formatting our results for printing.
sub replace_count_print {
  my ( $string, $match ) = @_;
  my $count    = count( $string, $match );
  my $replaced = replace( $string, $match );

  return print color('blue') . $replaced . color('reset'), "\n",
    color('green') . $count . color('reset'), "\n";
}

# wrap the solution in `main` and look for CLI args
sub main {
  my $input = shift @ARGV // 'Perl Weekly Challenge';
  my $match = shift @ARGV // 'e';

  return replace_count_print( $input, $match );
}

main();
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
ways than there are flavors of ice cream, but one more can't hurt.  The prompt
is to write a one-liner, but golf isn't my sport so we'll wriggle the rules a
bit and wrap our solution in a subroutine with some terminal colors to boot.

```perl
use strict;
use warnings;
use Readonly;
use Term::ANSIColor;

Readonly my $DEFAULT => 20;

sub fizz_buzz {
  my $length = shift // $DEFAULT;    # optional length argument

  Readonly my $BUZZ     => 5;        # Skip Readonly for brevity
  Readonly my $FIZZ     => 3;        # Probably not great naming here
  Readonly my $FIZZBUZZ => 15;

  # The one-liner (minus the print statement)
  return join q{ }, map {            # colors added for fun
        $_ % $FIZZBUZZ == 0 ? color('green') . 'fizzbuzz' . color('reset')
      : $_ % $BUZZ == 0     ? color('green') . 'buzz' . color('reset')
      : $_ % $FIZZ == 0     ? color('green') . 'fizz' . color('reset')
      : color('yellow')
      . $_
      . color('reset')
  } ( 1 .. $length );
}

sub main {
  my $length = shift @ARGV // $DEFAULT;

  return print fizz_buzz($length), "\n";
}

main();
```

### Result

Our solution allows for an optional length argument from the CLI.  Without a
length argument, we get output as described in the challenge description above.

```
1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16 17 fizz 19 buzz
```

[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

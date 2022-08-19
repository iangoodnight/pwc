#!/usr/bin/perl
# 001/perl/ch-2.js

=begin comment

## [Challenge 2][1]

Write a one-liner to solve the *FizzBuzz* problem and print the numbers 1
through 20.  However, any number divisible by `3` should be replaced by the word
`'fizz'` and any number divisible by `5` by the word `'buzz'`.  Those numbers
that are both divisible `3` and `5` become `'fizzbuzz'`.

[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

=end comment
=cut

use strict;
use warnings;
use Readonly;
use Term::ANSIColor;

Readonly my $DEFAULT => 20;

sub fizz_buzz {
  my $length = shift // $DEFAULT;    # optional length argument

  Readonly my $BUZZ     => 5;        # Skip Readonly for brevity
  Readonly my $FIZZ     => 3;
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

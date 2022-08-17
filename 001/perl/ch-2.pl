#!/usr/bin/perl
# 001/perl/ch-2.js

=begin comment

## [Challenge 2][1]

Write a one-liner to solve the *FizzBuzz* problem and print the numbers 1 through
20.  However, any number divisible by `3` should be replaced by the word `'fizz'`
and any number divisible by `5` by the word `'buzz'`.  Those numbers that are
both divisible `3` and `5` become `'fizzbuzz'`.

[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

=end comment
=cut

use strict;
use warnings;
use Term::ANSIColor;

sub fizz_buzz {
  my $length = shift // 20;   # optional length argument
                              # The actual one-liner (minus the print statement)
  return join ' ', map {
        $_ % 15 == 0 ? color('green') . 'fizzbuzz' . color('reset')
      : $_ % 5 == 0  ? color('green') . 'buzz' . color('reset')
      : $_ % 3 == 0  ? color('green') . 'fizz' . color('reset')
      : color('yellow')
      . $_
      . color('reset')
  } ( 1 .. $length );         # colors added for fun
}

sub main {
  my $length = shift @ARGV // 20;

  print fizz_buzz($length), "\n";
}

main();

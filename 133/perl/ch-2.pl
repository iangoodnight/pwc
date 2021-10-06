#!/usr/bin/perl
# ch-2.pl

=begin comment

 * https://theweeklychallenge.org/blog/perl-weekly-challenge-133/
 *
 * Task 2 > Smith Numbers
 * ======================
 *
 * Write a script to generate the first 10 `Smith Numbers` in base 10.
 *
 * According to Wikipedia:
 *
 * > In number theory, a Smith number is a composite number for which, in a
 * > given number base, the sum of its digits is equal to the sum of the digits
 * > in its prime factorization in the given number base.

=end comment
=cut

use strict;
use warnings;
use utf8;

################################################################################
# Our PWC solution, along with some help subroutines
################################################################################

# First, we need a utility function to find and return our prime factors
sub prime_factors {
  my $number = shift;

  $number =~ s{ # Trim whitespace, probably unnecessary, but it won't hurt
    \A          # Start of the line
    \s+         # Leading whitespace
    |           # Alternating with
    \s+         # Trailing whitespace
    \z          # End of line
  }{}gx
  # Validate our input is an integer
  if (!$number =~ m/\A\d+\z/) {
    # Bail
    return 0;
  }
  my @factors;
  my $divisor = 2  # Starting with 2, we'll divide and check for modulo
}

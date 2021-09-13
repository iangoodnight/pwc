#!/usr/bin/perl

=begin comment

 * Task 1 > Odd Number
 * ===================
 *
 * You are given an array of positive integers, such that all the numbers appear
 * an even number of times except one number.
 *
 * Write a script to find that integer.
 *
 * Example 1
 * =========
 *
 * @input = (2, 5, 4, 4, 5, 5, 2);
 *
 * $output = 5; # as it appears 3 times in the array whereas all other numbers 2
 *              # and 4 appear exactly twice
 *
 * Example 2
 * =========
 *
 * @input = (1, 2, 3, 4, 3, 2, 1, 4, 4);
 *
 * $output = 4;

=end comment
=cut

use strict;
use warnings;
use utf8;
use open ':std', ':encoding(UTF-8)';
use Term::ANSIColor;
use Data::Dumper;

# Here, our input reducer (PWC solution)

my @input = (1, 2, 3, 4, 3, 2, 1, 4, 4);

sub reduce_to_odd {
  my $input_ref = shift;
  my %mapped;

  foreach my $input (@$input_ref) {
    if (exists $mapped{$input}) {
      $mapped{$input}++;
      next;
    }
    $mapped{$input} = 1;
  }
  print Dumper %mapped;
}

reduce_to_odd(\@input);

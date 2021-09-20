#!/usr/bin/perl
# ch-1.pl

=begin summary

 * https://theweeklychallenge.org/blog/perl-weekly-challenge-131/
 *
 * Task 1 > Consecutive Arrays
 * ===========================
 *
 * You are given a sorted list of unique positive integers.
 *
 * Write a scipt to return lists of arrays where the arrays are consecutive
 * integers.
 *
 * Example 1:
 *
 * my @input = (1, 2, 3, 6, 7, 8, 9);
 *
 * my @output = ([1, 2, 3], [6, 7, 8, 9]);
 *
 * Example 2:
 *
 * my @input = (11, 12, 14, 17, 18, 19);
 *
 * my @output = ([2], [4], [6], [8]);
 *
 * Example 3:
 *
 * my @input = (2, 4, 6, 8);
 *
 * my @output = ([2], [4], [6], [8]);
 *
 * Example 4:
 *
 * my @input = (1, 2, 3, 4, 5);
 *
 * my @output = ([1, 2, 3, 4, 5]);

=end summary
=cut

use strict;
use warnings;
use utf8;
use open ":std", ":encoding(UTF-8)";
use Term::ANSIColor;
use Data::Dumper;

###################################################
# Here our Consecutive Array reducer (PWC Solution)
###################################################

sub reduce_to_consecutive {
  my @input = @{ +shift };
  my @reduced;
 
  foreach my $element (@input) {
    # if `@reduced` is empty, push the first element as part of an anonymous
    # list to start our comparisons 
    if (not (scalar @reduced)) {
      push(@reduced, [$element]);
      next;
    }
    # grab a copy of the last element checked to test if consecutive
    my $last_element = $reduced[-1]->[-1];
    # increment $last_element and compare to current element 
    if (++$last_element eq $element) {
      # if matched, push the current element to the last set
      push @{ $reduced[-1] }, $element;
      next;
    }
    # Else, push it as part of a new set.
    push(@reduced, [$element]);
  }
  return \@reduced;
}

###################################################
###################################################

# Followed by some utilities to test our solution

sub eval_input {
  my $input = shift;
  # If no inner sets, return the split string as an array reference
  if (not ($input =~ /\[/)) {
    # Strip outer parenthesis
    $input =~ s/\(|\)//g;
    # split by comma and optional spaces
    return [split /\s*,\s*/, $input];
  }
  # Else, return a reference to an array of sets
}

my $input = '(1, 2, 3, 4, 5)';


my $test = eval_input $input;

print Dumper $test;
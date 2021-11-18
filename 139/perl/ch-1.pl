#!/usr/bin/perl
# ch-1.pl

=begin comment
 * https://theweeklychallenge.org/blog/perl-weekly-challenge-139
 *
 * Task 1 > JortSort
 * =================
 *
 * You are given a list of numbers.
 *
 * Write a script to implement JortSort.  It should return true/false depending
 * on whether or not the given list of numbers is already sorted.
 *
 * Example 1:
 * ----------
 *
 * Input: @n = (1, 2, 3, 4, 5);
 *
 * Output: 1
 *
 * # Since the array is sorted, it prints `1`.
 *
 * Example 2:
 * ----------
 *
 * Input: @n = (1, 3, 2, 4, 5);
 *
 * Output: 0;
 *
 * # Since the array is NOT sorted, it prints `0`.
 *
=end comment
=cut

use strict;
use warnings;
use Data::Dumper;

my @test1 = (1, 2, 3, 4, 5);

my @test2 = (1, 3, 2, 4, 5);

sub jort_sort {
  my @list = @{ +shift };
  print Dumper @list;

#  foreach my $idx (0 .. $#list) {
#    print $list[$idx], "\n";
#    if ($idx == $#list) {
#      return 1;
#    }
#    if ($list[$idx] > $list[$idx + 1]) {
#      return 0;
#    }
#  }
}

print Dumper \@test1;

print jort_sort(\@test1), "\n";
print jort_sort(\@test2), "\n";

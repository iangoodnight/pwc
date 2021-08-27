#!/usr/bin/perl

=begin comment

 Task #1 > Disjoint Sets
 =======================

 You are given two sets with unique integers.
 Write a script to figure out if they are disjoint.

 The two sets are disjoint if they don't have any common members

 EXAMPLE
 Input: @s1 = (1, 2, 5, 3, 4);
        @s2 = (4, 6, 7, 8, 9);
 Output: 0 as the given sets have common member 4.

 Input: @s1 = (1, 3, 5, 7, 9);
        @s2 = (0, 2, 4, 6, 8);
 Output: 1 as the given two sets do no have a common member

=end comment
=cut

use strict;
use warnings;
use utf8;

# Here, our subroutine to test our sets (PWC solution)

sub is_disjoint {
  my ($set1_ref, $set2_ref) = @_;
  my @test_set = @$set1_ref;
  my %haystack = map { $_ => 1 } @$set2_ref;
  my $disjoint = 1;
  while ($disjoint and scalar @test_set) {
    my $needle = pop(@test_set);
    $disjoint = 0 if exists($haystack{$needle});
  }
  return $disjoint;
}

# Followed by some utilities to test our solution

sub parse_test_case {
  my $filename = shift;
  my $first_line = "";
  my $second_line = "";
  my $test = "";

  open my $fh, "<", $filename
    or die "Could not open '$filename' - $!";

  while (my $line = <$fh>) {
    chomp $line;
    next if $line =~ /^#/;
    unless (length $first_line) {
      $first_line = $line;
      next;
    }
    unless (length $second_line) {
      $second_line = $line;
      next;
    }
    if ($line eq "1" || $line eq "0") {
      $test = $line;
      last;
    }
  }
  my @first_set = split /\s*,\s*/, $first_line;
  my @second_set = split /\s*,\s*/, $second_line;

  return (\@first_set, \@second_set, $test);
}

sub assert_disjoint {
  my ($set1_ref, $set2_ref, $test);

}

my @tests = ();

my $target = shift @ARGV;

my @set1 = (1, 2, 3, 4, 5);
my @set2 = (4, 7, 8, 9);
my @set3 = (1, 2, 3);

print is_disjoint(\@set1, \@set1), "\n";
print is_disjoint(\@set2, \@set3), "\n";

my ($set1_ref, $set2_ref, $test1) =
  parse_test_case('./task1_test_cases/case1.txt');

my ($set3_ref, $set4_ref, $test2) =
  parse_test_case('./task1_test_cases/case2.txt');

print @$set1_ref, "\n";
print @$set2_ref, "\n";
print $test1, "\n";
print @$set3_ref, "\n";
print @$set4_ref, "\n";
print $test2, "\n";

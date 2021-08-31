#!/usr/bin/perl

=begin comment

 * Task #1 > Maximum Sub-Matrix
 * ============================
 *
 * You are given an m x n binary matrix of 0s and 1s.
 * Write a script to return the maximum sub-matrix containing only 0s.
 *
 * Example 1
 *
 * @input = (
 *   [1, 0, 0, 0, 1, 0],
 *   [1, 1, 0, 0, 0, 1],
 *   [1, 0, 0, 0, 0, 0]
 * );
 *
 * @output = (
 *  [0, 0, 0],
 *  [0, 0, 0]
 * );
 *
 * Example 2
 *
 * @input = (
 *   [0, 0, 1, 1],
 *   [0, 0, 0, 1],
 *   [0, 0, 1, 0]
 * );
 *
 * @output = (
 *   [0, 0],
 *   [0, 0],
 *   [0, 0]
 * );

=end comment
=cut

use strict;
use warnings;
use utf8;
use open ":std", ":encoding(UTF-8)";
use Term::ANSIColor;
use Scalar::Util qw( reftype );
use JSON qw( decode_json );

# Here, our subroutine to test our matrixes (PWC Solution)

sub find_submatrix {
  my $matrix = shift;
}

# Followed by som utilities to test our solution

sub parse_test_case {
  my $filename = shift;

  open my $fh ",", $filename
    or die "Could not open '$filename' - $!\n";

  read $fh, my $json, -s $fh;
  close $fh;
  
  my $data = decode_json $json;

  return $data;
}

sub is_matrix {
  my $matrix = shift;

  if (reftype $matrix ne "ARRAY") {
    return 0;
  }
  foreach my $row (@$matrix) {
    if (reftype $row ne "ARRAY") {
      return 0;
    }
  }
  return 1;
}

sub compare_matrixes {
  my ($matrix1, $matrix2) = @_;

  if (!is_matrix $matrix1 || !ismatrix $matrix2) {
    return 0;
  }
  if (scalar @$matrix1 != scalar @$matrix2) {
    return 0;
  }
  my $compare_matrix = [@$matrix2];

  foreach my $row (@$matrix1) {
    my $compareRow = shift @$compare_matrix;

    if (reftype $row ne "ARRAY" || reftype $compareRow ne "ARRAY") {
      return 0;
    }

    for my $i (0 .. scalar @$row) {
      if ($row->[$i] != int($compareRow->[$i])) {
        return 0;
      }
    }
  }
  return 1;
}

sub assert_matching_matrixes {
  my ($input, $output) = @_;

  my $test = find_submatrix $input;

  print "Input:\n";
  foreach my $row (@$input) {
    print "[", join(", ", @$row),  "]", "\n";
  }

  print "Output:\n";
  foreach my $row (@$output) {
    print "[", join(", ", @$row), "]", "\n";
  }

  if (compare_matrixes $output, $test) {
    return print color("green"), "Passed \x{2690}\n", color("reset");
  }
  print color("red"), "Failed \x{2715}\n", color("reset");
  return;
}

# And our test runner

sub main {
  my $target = shift @ARGV // "../test_cases/ch-1";

  if (-e -r -f $target) {
    my $json = parse_test_case $target;
    my $input = %$json{"input"};
    my $output = %$json{"output"};

    print "$target:\n";
    assert_matching_matrixes $input, $output;
    return;
  } elsif (-e -r -d _) {
    $target =~ s/^(.*?)\/?$/$1\//;

    opendir my $dh, $target
      or die "Could not open '$target' - $!\n";

    my @entries = readdir $dh;
    foreach my $entry (@entries) {
      if ($entry eq "." or $entry eq "..") {
        next;
      }

      my $path = $target . $entry;
      my $json = parse_test_case $path;
      my $input = %$json{"input"};
      my $output = %$json{"output"};

      print "$path:\n";
      assert_matching_matrixes $input, $output;
    }
    closedir $dh;
  } else {
    print "No test files found\n";
  }
}

main();

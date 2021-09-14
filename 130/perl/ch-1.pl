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
use open ":std", ":encoding(UTF-8)";
use Term::ANSIColor;
use Data::Dumper;

# Here, our input reducer (PWC solution)

my @input = (1, 2, 3, 4, 3, 2, 1, 4, 4);

sub reduce_to_odd {
  my $input_ref = shift;
  my %mapped;
  # First, we reduce our input to a hash of values and counts
  foreach my $entry (@$input_ref) {
    if (exists $mapped{$entry}) {
      $mapped{$entry}++;
      next;
    }
    $mapped{$entry} = 1;
  }
  # Technically, our challenge states that there will only ever be one odd input
  # count, but, just for fun, we'll design it to return all odd counts in case
  # we get improperly validated input.
  my @odd;
  foreach my $key (keys %mapped) {
    # Iterate through, pushing values with odd counts to our `odd` array
    if ($mapped{$key} % 2 != 0) {
      push(@odd, $key);
    }
  }
  my $result_count = scalar @odd;
  # Handle our possible results:
  if ($result_count == 0) {
    # Tricky input, no correct answer.
    return 'No odd counts found';
  }
  if ($result_count == 1) {
    # Input as expected, return correct answer
    return $odd[0];
  }
  # Incorrectly validated input.  Be the bigger person and just return all
  # correct answer as a reference to our `odd` array.
  return \@odd;
}

# Followed by some utilities to test our solution

sub parse_test_case {
  my $file_path = shift;
  my @inputs;
  my @answers;

  open my $fh, '<', $file_path
    or die "Could not open '$file_path' - $!\n";

  while (my $line = <$fh>) {
    chomp $line;
    # Skip comments
    next if $line =~ /^\s*#/;
    # Trim whitespace
    $line =~ s/^\s+|\s+$//g;
    # Push answers
    if (scalar @inputs > scalar @answers) {
      push(@answers, $line);
      next;
    }
    # Split and trim input line
    my @input_arr = map {
      my $value = $_;
      $value =~ s/^\s+|\s+$//g;
      $value;
    } split /\s*,\s*/, $line;
    # Push to our `inputs` array
    push @inputs, \@input_arr;
  }
  return (\@inputs, \@answers);
}

sub assert_match {
  my ($inputs_ref, $expected) = @_;
  my $result = reduce_to_odd($inputs_ref);

  print "\nInput: ", join(", ", @$inputs_ref), "\n";

  # Handle single answer
  if (!ref $result) {

    print "Expected: ", $expected, "\n";
    print "Result: ", $result, "\n";

    if ($result eq $expected) {
      print color("green"), "Passed \x{2690}\n", color("reset");
      return;
    }
    print color("red"), "Failed \x{2715}\n", color("reset");
    return;
  }
  # Handle multiple answers
  if (ref $result eq "ARRAY") {
    my @expected_results = sort {$a cmp $b} map {
      my $entry = $_;
      $entry =~ s/^\s+|\s+$//g;
      $entry;
    } split /\s*,\s*/, $expected;

    my @sorted_results = sort {$a cmp $b} @$result;

    print "Expected: ", join(", ", @expected_results), "\n";
    print "Result: ", join(", ", @sorted_results), "\n";

    my $passed = 1;

    foreach my $idx (0 .. $#expected_results) {
      unless ($sorted_results[$idx] eq $expected_results[$idx]) {
        $passed = 0;
      }
    }
    # Double check
    my $matching_lengths = scalar @expected_results == scalar @sorted_results;

    if ($passed and $matching_lengths) {
      print color("green"), "Passed \x{2690}\n", color("reset");
      return;
    }
    print color("red"), "Failed \x{2715}\n", color("reset");
  }
}

# And our test runner

sub main {
  my $target = shift @ARGV // "../test_cases/ch-1";

  if (-e -r -f $target) {
    my ($inputs_ref, $answers_ref) = parse_test_case $target;

    print $target, "\n";
    print "=====================================\n";

    if (scalar $answers_ref > 1) {
      foreach my $idx (0 .. $#$answers_ref) {
        assert_match($inputs_ref->[$idx], $answers_ref->[$idx]);
      }
      return;
    }
    assert_match($inputs_ref->[0], $answers_ref);
    return;
  } elsif (-e -r -d _) {
    $target =~ s/^(.*?)\/?$/$1\//;

    opendir my $dh, $target
      or die "Could not open '$target' - $!\n";

    my @entries = readdir $dh;

    closedir $dh;

    foreach my $entry (@entries) {
      if ($entry eq "." or $entry eq "..") {
        next;
      }

      my $path = $target . $entry;
      my ($inputs_ref, $answers_ref) = parse_test_case $path;

      print $path, "\n";
      print "=====================================\n";

      if (scalar $answers_ref > 1) {
        foreach my $idx (0 .. $#$answers_ref) {
          assert_match($inputs_ref->[$idx], $answers_ref->[$idx]);
        }
      } else {
        assert_match($inputs_ref->[0], $answers_ref);
      }
      print "\n";
    }
  } else {
    print "No test files found at $target\n";
  }
}

main();

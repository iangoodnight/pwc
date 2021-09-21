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
#
###################################################
# Followed by some utilities to test our solution
###################################################

sub eval_input {
  my $input = shift;
  # If no inner sets, return the split string as an array reference
  if (not ($input =~ /\[/)) {
    # Strip outer parenthesis
    $input =~ s/\(|\)//g;
<<<<<<< HEAD
    # split by comma and optional spaces
    return [ map int, split /\s*,\s*/, $input];
  }
  # Else, return a reference to an array of sets
  return [
    map {
      [ map int, split /\s*,\s*/ ]
    } $input =~ /\[([^\]]*)\]/g
  ];
}

sub parse_test_case {
  # Parse file into arrays of inputs and answers
  my $file_path = shift;
  my @inputs;
  my @answers;

  open my $fh, "<", $file_path
=======
    # split by comma and optional spaces, map values to int (just to take the
    # challenge literally), return reference to anonymous list
    return [ map int, split /\s*,\s*/, $input ];
  }
  # Else, return a reference to an array of lists
  my @inputs;
  while ($input =~ /\[([^\]]*)\]/g) {
    push @inputs, [ map int, split /\s*,\s*/, $1 ];
  }
  return \@inputs;
}

sub parse_test_case {
   my $file_path = shift;
   my @inputs;
   my @answers;

   open my $fh, "<", $file_path
>>>>>>> c8dd1c6ea3275a1720568c049b13f34fa622b832
    or die "Could not open '$file_path' - $!\n";

  while (my $line = <$fh>) {
    chomp $line;
    # Skip comments
<<<<<<< HEAD
    next if $line =~ /^\s*#|^\s*$/;
    # Trim whitespace
    $line =~ s/^\s+|\s+$//g;
    # Parse line into list reference
    my $parsed = eval_input $line;
    # If there are more inputs than answers, assume line is an answer
=======
    next if $line =~ /^(\s*|\s*#.*)$/;
    # Trim whitespace
    $line =~ s/^\s+|\s+$//g;
    my $parsed = eval_input $line;
    # If inputs greater than answers, assume line is an answer
>>>>>>> c8dd1c6ea3275a1720568c049b13f34fa622b832
    if (scalar @inputs > scalar @answers) {
      push @answers, $parsed;
      next;
    }
<<<<<<< HEAD
    # Else, assume it an input
    push @inputs, $parsed;
  }
  return (\@inputs, \@answers);
}

sub assert_deep_match {
  my @first = @{ +shift };
  my @second = @{ +shift };
  my $match = 1;
  # If lengths don't match, fail
  if (scalar @first != scalar @second) {
    return 0;
  }
  # Check each element
  foreach my $idx (0 .. $#first) {
    my $ref = ref $first[$idx];
    # if element is a scalar check for match
    if ($ref ne "ARRAY" && $first[$idx] ne $second[$idx]) {
      $match = 0;
    }
    # if element is an array recurse
    if ($ref eq "ARRAY") {
      my $recursed = assert_deep_match($first[$idx], $second[$idx]);
      $match = $recursed;
    }
    # Quit early
    last if not $match;
  }
  return $match;
}

sub deep_print {
  my @input = @{ +shift };

  foreach my $idx (0 .. $#input) {
    my $el = $input[$idx];
    my $ref = ref $el;

    if ($ref eq "ARRAY") {
      print "[";
      deep_print($el);
      print "]";
    } else {
      print $el;
    }
    print ", " unless $idx == $#input;
  }
}

sub print_results {
  my $test_path = shift;
  my @inputs = @{ +shift };
  my @answers = @{ +shift };

  print $test_path, "\n";
  print "=" x length($test_path), "\n\n";

  foreach my $idx (0 .. $#inputs) {
    my $input = $inputs[$idx];
    # Check for empty array (just to be safe)
    next unless scalar @{ $input };

    my $answer = $answers[$idx];
    my $result = reduce_to_consecutive $input;

    print "Input: (", join(", ", @{ $input }), ")\n";
    print "Expected: (";
    deep_print($answer);
    print ")\n";
    print "Result: (";
    deep_print($result);
    print ")\n";

    if (assert_deep_match($answer, $result)) {
      print color("green"), "Passed \x{2690}\n", color("reset");
    } else {
      print color("red"), "Failed \x{2715}\n", color("reset");
    }
    print "\n";
  }
  print "\n";
}

###################################################
###################################################
#
###################################################
# And our test runner
###################################################

sub main {
  my $target = shift @ARGV // "../test_cases/ch-1";
  # Handle single file target
  if (-e -r -f $target) {
    my ($inputs_array, $answers_array) = parse_test_case $target;
    print_results $target, $inputs_array, $answers_array;
    return;
  }
  # Handle directory target
  if (-e -r -d _) {
    # Check for trailing slash
    $target =~ s/^(.*?)\/?$/$1\//;

    opendir my $dh, $target
      or die "Could not open '$target' - $!\n";

    my @entries = readdir $dh;
    closedir $dh;

    foreach my $entry (sort @entries) {
      # Skip the garbage
      next if $entry eq "." or $entry eq "..";
      my $path = $target . $entry;
      my ($inputs_array, $answers_array) = parse_test_case $path;
      print_results $path, $inputs_array, $answers_array;
    }
    return;
  } else {
    print "No tests found at $target\n";
  }
}

main();
=======
    # else, push to inputs
    push @inputs, $parsed;
  }
  return [\@inputs, \@answers];
}

sub assert_match {
  my (@set_1, @set_2, $flag) = ( @{ @_[0, 1] }, $_[2] );
  my $match = 1;
  print Dumper @set_1;
  print Dumper @set_2;
  print Dumper $flag;
}

my $input = '([1, 2], [3, 4], 5)';
my @arr1 = qw(1 2 3 4);
my @arr2 = qw(7 8 9);

assert_match \@arr1, \@arr2, 0;

# my $test = parse_test_case "../test_cases/ch-1/case-1.txt";

# print Dumper $test;
>>>>>>> c8dd1c6ea3275a1720568c049b13f34fa622b832

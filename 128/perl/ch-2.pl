#!/usr/bin/perl

=begin comment

 * Task #2 > Minimum Platforms
 * ===========================
 *
 * You are given two arrays of arrival and departure times of trains at a
 * railway station.
 * Write a script to find out the minimum number of platforms needed so that no
 * train needs to wait.
 *
 * Example 1
 *
 * @arrivals = ('11:20', '14:30');
 *
 * @departures = ('11:50', '15:00');
 *
 * Output: 1
 *
 *  > The 1st train arrival is at 11:20 and this is the only train at the
 *  > station, so you need 1 platform.  Before the second arrival at 14:30, the
 *  > first train left the station at 11:50, so you will only need 1 platform.
 *
 * Example 2
 *
 * @arrivals = ('10:20', '11:00', '11:10', '12:20', '16:20', '19:00');
 *
 * @departures = ('10:30', '13:20', '12:40', '12:50', '20:20', '21:20');
 *
 * Output: 3
 *
 *  > Between 11:00 and 12:20, there would be at least 3 trains at the station,
 *  > so we need a minimum of 3 platforms.

=end comment
=cut

use strict;
use warnings;
use utf8;
use open ":std", ":encoding(UTF-8)";
use Term::ANSIColor;

# Here, the subroutine to identify how many platforms are required (PWC
# Solution) along with a helper subroutine, parseTime, to make our solution a 
# little more flexible when dealing with different types of input.

sub parse_time {
  my $time = shift;

  $time =~ /^\s*(\d+):?(\d*) ?([ap]m)?\s*$/i; 

  my $hours = int($1) // 0;

  my $minutes = 0;
  if ($2 ne "") {
    $minutes = int($2) // 0;
  }

  my $meridian = $3 // 0;

  my $pad = 0;

  if ($meridian =~ /am/i && $hours == 12) {
    $pad = -12;
  }
  if ($meridian =~ /pm/i) {
    $pad += 12 if $hours != 12;
  }

  return $hours + ($minutes/60)*1 + $pad;
}

sub platforms_needed {
  my ($arrivals, $departures) = @_;

  my @arrival_key = map { ['arrived', parse_time $_] } @$arrivals;
  my @departure_key = map { ['departed', parse_time $_] } @$departures;

  my @sorted_keys = sort { $a->[1] <=> $b->[1] } (@arrival_key, @departure_key);

  my $current = 0;
  my $high_water_mark = 0;

  map {
    my $key = $_->[0];
    my $time = $_->[1];

    $current++ if $key eq 'arrived';
    $current-- if $key eq 'departed';

    $high_water_mark = $current if $current > $high_water_mark;

  } @sorted_keys;

  return $high_water_mark;
}

# Followed by some utilities to test our solution

sub parse_test_case {
  my $filename = shift;

  my @arrivals = ();
  my @departures = ();
  my $platforms = "";

  open my $fh, "<", $filename
    or die "Could not open '$filename' - $!\n";

  while (my $line = <$fh>) {
    chomp $line;

    next if $line =~ /^#/;

    unless (scalar @arrivals) {
      push @arrivals, split /\s*,\s*/, $line;
      next;
    }

    unless (scalar @departures) {
      push @departures, split /\s*,\s*/, $line;
      next;
    }

    if ($line =~ /(\d{1,3})/) {
      $platforms = $1;
      last;
    }
  }
  close $fh;

  return (\@arrivals, \@departures, $platforms);
}

sub assert_correct_platforms {
  my ($arrivals, $departures, $platforms) = @_;
  my $test = platforms_needed $arrivals, $departures;

  print "Arrivals: ", join(", ", @$arrivals), "\n";
  print "Departures: ", join(", ", @$departures), "\n";
  print "Expected: ", $platforms, "\n";

  if ($test == $platforms) {
    return print color("green"), "Passed \x{2690}\n", color("reset");
  }
  print color("red"), "Failed \x{2715}\n", color("reset");
  return;
}

# And out test runner

sub main {
  my $target = shift @ARGV // "../test_cases/ch-2";

  if (-e -r -f $target) {
    my (
      $arrivals,
      $departures,
      $platforms
    ) = parse_test_case $target;

    print $target, ": \n";

    assert_correct_platforms $arrivals, $departures, $platforms;

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
      my (
        $arrivals,
        $departures,
        $platforms
      ) = parse_test_case $path;

      print $path, ": \n";

      assert_correct_platforms $arrivals, $departures, $platforms;
    }
    closedir $dh;
    return;
  } else {
    print "No test files found\n";
  }
}

main();

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
# Solution) along with a helper subrouting, parseTime, to make our solution a 
# little more flexible when dealing with different types of input.

sub platforms_needed {

}

sub parse_time {
  my $time = shift;

  $time =~ /^\w*(\d{1,2}):?(\d{0,2}) ?([ap]m)?\w*$/i;

  my $hours = int($1);
  my $minutes = int($2);
  my $meridian = $3 // 0;
  my $pad = 0;

  print $hours, ":", $minutes, " ", $meridian, "\n";
}

parse_time("12:13");

#!/usr/bin/perl
# ch-1.pl

=begin comment

 * https://theweeklychallenge.org/blog/perl-weekly-challenge-132/
 *
 * Task 1 > Mirror Dates
 * =====================
 *
 * You are given a date (yyyy/mm/dd).
 *
 * Assuming the given date is the date of your birth, write a script to find the
 * mirror dates of the given date.
 *
 * Assuming today is 2021/09/22
 *
 * Example 1
 * ---------
 *
 * Input: 2021/09/18
 * Output: 2021/09/14, 2021/09/26
 *
 * On the date you were born, someone who was your current age would have been
 * born on 2021/09/14.
 * Someone born today will be your current age on 2021/09/26.
 *
 * Example 2
 * ---------
 *
 * Input: 1975/10/10
 * Output: 1929/10/27, 2067/09/05
 *
 * On the date you were born, someone who was your current age would have been
 * born on 1929/10/27.
 * Someone born today will be your current age on 2067/09/05.
 *
 * Example 3
 * ---------
 *
 * Input: 1967/02/14
 * Output: 1912/07/08, 2076/04/30
 *
 * On the date you were born, someone who was your current age would have been
 * born on 1912/07/08.
 * Someone born today will be your current age on 2076/04/30.

=end comment
=cut

use strict;
use warnings;
use utf8;
use Time::Piece;
use POSIX qw(strftime);
use Data::Dumper;

# Our PWC Solution

sub return_mirror_dates {
  my $birthday = shift;
  my $today = shift // time();

  if (not $birthday =~ m{^\d{4}/[0-1][0-9]/[0-3][0-9]}m) {
    return 0;
  }
  
  my $birthdate = Time::Piece->strptime($birthday, "%Y/%m/%d");
  my $offset = abs($today - $birthdate);
  
  my @prev_date = gmtime($birthdate - $offset);
  my @next_date = gmtime($today + $offset);
  print Dumper @next_date;

  return [
    POSIX::strftime("%Y/%m/%d", @prev_date),
    POSIX::strftime("%Y/%m/%d", @next_date)
  ]

}

main {
  while (<>) {
    chomp;
    print Dumper return_mirror_dates($_);
  }
}

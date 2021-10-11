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
use Data::Dumper;

################################################################################
# Our PWC Solution
################################################################################

sub return_mirror_dates {
  my $birthday = shift;
  my $today    = shift // gmtime;

  if ( not $birthday =~ m{ \A \s* \d{4} / [0-1]\d / [0-3]\d \s* \z }x ) {
    return 0;
  }

  my $birthdate = Time::Piece->strptime( $birthday, '%Y/%m/%d' );
  my $offset    = abs $today - $birthdate;
  my $prev_date = gmtime( $birthdate - $offset );
  my $next_date = gmtime( $today + $offset );

  return [ $prev_date->ymd(q{/}), $next_date->ymd(q{/}) ];

}

################################################################################
# Utilities
################################################################################

sub print_results {
  my ( $prev_date, $next_date ) = @{ +shift };
  print 'On the date you were born, someone who was your current age would have'
    . ' been born on '
    . $prev_date . ".\n"
    . 'Someone born today will be your current age on '
    . $next_date . ".\n";
  return;
}

################################################################################
# Main
################################################################################

my $help = qq{Enter your birthdate (yyyy/MM/dd) or type "exit" to quit.\n/> };

print $help;

while ( my $input = <> ) {
  chomp $input;

  if ( $input =~ m/ \A \s* ( exit | quit | [qn] ) \s* \z /ix ) {
    print "Goodbye.\n";
    exit;
  }

  if ( $input =~ m/ \A \s* y \s* \z /ix ) {
    print $help;
  }

  if ( $input =~ m{ \A \s* \d{4} / \d{2} / \d{2} \s* \z }ix ) {
    my $dates = return_mirror_dates $input;
    print_results $dates;
    print "Go again? (y/n)\n/> ";
  }
  else {
    print "I don't recognize $input\n$help";
  }
}

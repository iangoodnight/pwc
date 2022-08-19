#!/usr/bin/perl
# 001/perl/ch-1.pl

=begin comment

## [Challenge 1][1]

Write a script to replace all of the instances of `e` with `E` in the string
`Perl Weekly Challenge`.  Also, print the number of times the character `e` is
found in the string.

[1]: <https://theweeklychallenge.org/blog/perl-weekly-challenge-001/> "PWC Club"

=end comment
=cut

use strict;
use warnings;
use Term::ANSIColor;

sub replace {
  my ( $string, $to_replace ) = @_;

  $string =~ s/(\Q$to_replace\E)/uc($1)/eg;

  return $string;
}

sub count {
  my ( $string, $match ) = @_;

  my @count = $string =~ m/(\Q$match\E)/g;

  return scalar @count;
}

sub replace_count_print {
  my ( $string, $match ) = @_;
  my $count    = count( $string, $match );
  my $replaced = replace( $string, $match );

  return print color('blue') . $replaced . color('reset'), "\n",
    color('green') . $count . color('reset'), "\n";
}

sub main {
  my $input = shift @ARGV // 'Perl Weekly Challenge';
  my $match = shift @ARGV // 'e';

  return replace_count_print( $input, $match );
}

main();

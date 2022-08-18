#!/usr/bin/ruby -w
# 001/ruby/ch-1.rb

# ## [Challenge 1][1]
#
# Write a script to replace all of the instances of `e` with `E` in the string
# `Perl Weekly Challenge`.  Also, print the number of times the character `e` is
# found in the string.
#
# [1]: https://theweeklychallenge.org/blog/perl-weekly-challenge-001/ "PWC Club"

def count(string, match)
  string.count(match)
end

def replace(string, replace)
  string.gsub(replace, replace.upcase)
end

def print_result(string, match)
  puts "\e[32m#{replace(string, match)}\e[0m"
  puts "\e[33m#{count(string, match)}\e[0m"
end

string = ARGV[0] || 'Perl Weekly Challenge'
match = ARGV[1] || 'e'

print_result(string, match)

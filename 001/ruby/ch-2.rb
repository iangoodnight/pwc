#!/usr/bin/ruby -w
# 001/ruby/ch-2.rb

# ## [Challenge 2][1]
#
# Write a one-liner to solve the *FizzBuzz* problem and print the numbers 1
# through 20.  However, any number divisible by `3` should be replaced by the
# word `'fizz'` and any number divisible by `5` by the word `'buzz'`.  Those
# numbers that are both divisible `3` and `5` become `'fizzbuzz'`.
#
# [1]: https://theweeklychallenge.org/blog/perl-weekly-challenge-001/ "PWC Club"

length = ARGV[0] || 20

fizzbuzz = (1..length.to_i).map do |n|
  if (n % 15).zero?
    "\e[32mfizzbuzz\e[0m"
  elsif (n % 5).zero?
    "\e[32mbuzz\e[0m"
  elsif (n % 3).zero?
    "\e[32mfizz\e[0m"
  else
    "\e[33m#{n}\e[0m"
  end
end.join ' '

puts fizzbuzz

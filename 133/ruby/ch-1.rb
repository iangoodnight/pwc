#!/usr/bin/ruby -w
# frozen_string_literal: false

# ch-1.rb

# https://theweeklychallenge.org/blog/perl-weekly-challenge-133/
#
# Task 1 > Integer Square Root
# ============================
#
# You are given a positive integer `$N`.
#
# Write a script to calculate the integer square root of the given number.
#
# Please avoid using built-in function.  Find out more about it here
# (https://en.wikipedia.org/wiki/Integer_square_root).
#
# Examples
# --------
#
# Input: $N = 10
# Output: 3
#
# Input: $N = 27
# Output: 5
#
# Input: $N = 85
# Output: 9
#
# Input: $N = 101
# Output: 10

def int_sqr_root(input)
  if !input.integer? || !input.positive?
    puts 'Input must be a positive integer'
    return
  end
  puts 'Pass!'
end

int_sqr_root(21)
int_sqr_root(1)
int_sqr_root(-21)
int_sqr_root(2.1)

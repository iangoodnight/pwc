#!/usr/bin/ruby -w
# ch-1.rb

# https://theweeklychallenge.org/blog/perl-weekly-challenge-132/
#
# Task 1 > Mirror Dates
# =====================
#
# You are given a date (yyyy/mm/dd).
#
# Assuming the given date is the date of your birth, write a script to find the
# mirror dates of the given date.
#
# Assuming today is 2021/09/22
#
# Example 1
# ---------
#
# Input: 2021/09/18
# Output: 2021/09/14, 2021/09/26
#
# On the date you were born, someone who was your current age would have been
# born on 2021/09/14.
# Someone born today will be your current age on 2021/09/26.
#
# Example 2
# ---------
#
# Input: 1975/10/10
# Output: 1929/10/27, 2067/09/05
#
# On the date you were born, someone who was your current age would have been
# born on 1929/10/27.
# Someone born today will be your current age on 2067/09/05.
#
# Example 3
# ---------
#
# Input: 1967/02/14
# Output: 1912/07/08, 2076/04/30
#
# On the date you were born, someone who was your current age would have been
# born on 1912/07/08.
# Someone born today will be your current age on 2076/04/30.

require 'date'

def mirror_dates(input)
  input = Date.parse(input)
  today = Date.today
  offset = today - input
  prev_date = input - offset
  next_date = input + offset
  [prev_date.strftime('%Y/%m/%d'), next_date.strftime('%Y/%m/%d')]
end

test = mirror_dates '1986/07/18'

puts test

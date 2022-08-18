#!/usr/bin/python3
"""001/perl/ch-2.py"""

# ## [Challenge 2][1]
#
# Write a one-liner to solve the *FizzBuzz* problem and print the numbers 1
# through 20.  However, any number divisible by `3` should be replaced by the
# word `'fizz'` and any number divisible by `5` by the word `'buzz'`.  Those
# numbers that are both divisible `3` and `5` become `'fizzbuzz'`.
#
# [1]: https://theweeklychallenge.org/blog/perl-weekly-challenge-001/ "PWC"

import sys


def fizzbuzz(length=20):
    """
    Return a fizzbuzz string from 1 to length

    :param int length: Optional length argument, default 20
    :return str: FizzBuzz
    """
    if length is None:
        length = 20

    transformed = []

    for i in range(1, length + 1):
        if i % 15 == 0:
            transformed.append("\u001b[32mfizzbuzz \u001b[0")
        elif i % 5 == 0:
            transformed.append("\u001b[32mbuzz \u001b[0")
        elif i % 3 == 0:
            transformed.append("\u001b[32mfizz \u001b[0")
        else:
            transformed.append(f"\u001b[33m{str(i)} \u001b[0")

    return ''.join(transformed)


try:
    INPUT_LENGTH = int(sys.argv[1])
except IndexError:
    INPUT_LENGTH = None

print(fizzbuzz(INPUT_LENGTH))

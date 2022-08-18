#!/usr/bin/python3
"""001/python/ch-1.py"""

# ## [Challenge 1][1]
#
# Write a script to replace all of the instances of `e` with `E` in the string
# `Perl Weekly Challenge`.  Also, print the number of times the character `e`
# is found in the string.
#
# [1]: https://theweeklychallenge.org/blog/perl-weekly-challenge-001/ "PWC"

import re
import sys


class Replacer:
    """Replacer handles both string replacement and replacement count

    Attributes:
        string: str, default 'Perl Weekly Challenge'
            The source string
        replace: str, default 'e'
            The text to replace and count
    """
    def __init__(self, string=None, match=None):
        """Inits Replacer with defaults if no args provided"""
        self.string = string if string is not None else 'Perl Weekly Challenge'
        self.match = match if match is not None else 'e'

    def count(self):
        """Counts matches

        return int: Returns count of matches
        """
        escaped = re.escape(self.match)
        return len(re.findall(escaped, self.string))

    def pretty_print(self):
        """Prints replaced string and count with terminal colors"""
        count = self.count()
        replaced = self.replaced()

        print(f"\u001b[32m{replaced}\u001b[0m")
        print(f"\u001b[33m{count}\u001b[0m")

    def replaced(self):
        """Performs string replacement

        return str: Returns replaced string
        """
        return self.string.replace(self.match, self.match.upper())


try:
    INPUT_STRING = sys.argv[1]
except IndexError:
    INPUT_STRING = None

try:
    INPUT_MATCH = sys.argv[2]
except IndexError:
    INPUT_MATCH = None

Replacer(INPUT_STRING, INPUT_MATCH).pretty_print()

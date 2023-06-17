#!/usr/bin/perl
# 221/perl/ch-1.pl

=begin comment

## [Task 1: Good Strings][1]

You are given a list of `@words` and a string `$chars`.

> A string is good if it can be formed by characters form `$chars`, each
> character can be used **only once**.

Write a script to return the sum of lengths of all good strings in `@words`.

**Example 1**

```
Input: @words = ("cat", "bt", "hat", "tree")
       $chars = "atach"
Output: 6

The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
```

**Example 2**

```
Input: @words = ("hello", "world", "challenge")
       $chars = "welldonehopper"
Output: 10

The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.
```

[1]: https://perlweeklychallenge.org/blog/perl-weekly-challenge-221/#TASK1

=end comment
=cut

use strict;
use warnings;
use Data::Dumper;

sub is_word_good {
  my ($word, $chars) = @_;

  my @chars = split(//, $chars);
}

sub good_strings {
  my @words = @{ +shift };
  my $chars = shift;

  print Dumper(\@words);
}

sub main {
  my @words = ("cat", "bt", "hat", "tree");
  my $chars = "atach";

  good_strings(\@words, $chars);
}

main();

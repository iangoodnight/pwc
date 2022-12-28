#!/usr/bin/perl

# /197/perl/ch-1.pl

=begin comment

## Task 1: Move Zero

You are given a list of integers, `@list`.

Write a script to move all zero, if exists, to the end while maintaining the
relative order of `non-zero` elements.

**Example 1**

```
Input: @list = (1, 0, 3, 0, 0, 5)
Output: (1, 3, 5, 0, 0, 0)
```

**Example 2**

```
Input: @list = (1, 6, 4)
Output: (1, 6, 4)
```

**Example 3**

```
Input: @list = (0, 1, 0, 2, 0)
Output: (1, 2, 0, 0, 0)
```

=end comment
=cut

use strict;
use warnings;
use List::Util qw( reduce );
use Data::Dumper;

sub shift_zeroes {
  my @list = @{ +shift };

  return map { @$_ } reduce {
    my ($integer_list_ref, $zeroes_ref) = @{ $a };

    if ($b != 0) {
      push @$integer_list_ref, $b;
    } else {
      push @$zeroes_ref, $b;
    }
    return [$integer_list_ref, $zeroes_ref];
  } [[], []], @list;
}

sub main {
  my @list = (1, 0, 3, 0, 0, 5);

  my @transformed = shift_zeroes(\@list);

  print Dumper \@transformed;
}

main();

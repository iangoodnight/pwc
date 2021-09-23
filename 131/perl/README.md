# [Perl Weekly Challenge - 131]

Pretty straightforward challenges this week.  I haven't been coding in Perl for
all that long and I still have a lot of woodshedding to do to be able to take
advantage of all the perlisms available to me.  Challenges like the array 
transformations in Task 1 and the substring matches in Task 2 are nice 
opportunities to practice.

## Task 1 > Consecutive Arrays

You are given a sorted list of unique positive integers.

Write a scipt to return lists of arrays where the arrays are consecutive 
integers.

**Example 1:**

```perl
my @input = (1, 2, 3, 6, 7, 8, 9);

my @output = ([1, 2, 3], [6, 7, 8, 9]);

```

**Example 2:**

```perl
my @input = (11, 12, 14, 17, 18, 19);

my @output = ([2], [4], [6], [8]);

```

**Example 3:**

```perl
my @input = (2, 4, 6, 8);

my @output = ([2], [4], [6], [8]);

```

**Example 4:**

```perl
my @input = (1, 2, 3, 4, 5);

my @output = ([1, 2, 3, 4, 5]);

```

### Solution

```perl

sub reduce_to_consecutive {
  my @input = @{ +shift };
  my @reduced;
 
  foreach my $element (@input) {
    # if `@reduced` is empty, push the first element as part of an anonymous
    # list to start our comparisons 
    if (not (scalar @reduced)) {
      push(@reduced, [$element]);
      next;
    }
    # grab a copy of the last element checked to test if consecutive
    my $last_element = $reduced[-1]->[-1];
    # increment $last_element and compare to current element 
    if (++$last_element eq $element) {
      # if matched, push the current element to the last set
      push @{ $reduced[-1] }, $element;
      next;
    }
    # Else, push it as part of a new set.
    push(@reduced, [$element]);
  }
  return \@reduced;
}

```

## Task 2 > Find Pairs

You are given a string of delimiter pairs and a string to search.

Write a script to return two strings the first with any characters matching
the "opening character" set, the second with any matching the "closing 
character" set.

**Example 1:**

```
Input:

Delimiter pairs: ""[]()
Search String: "I like (parens) and the Apple ][+" they said.

Output:

  "(["
  "])"

```

**Example 2:**

```
Input:

Delimiter pairs: **//<>
Search String: /* This is a comment (in some languages) * / <could be a tag>

Output:

/**/<
/**/>

```

### Solution

```perl
sub find_delims {
  my ($delim_string, $search_string) = @_;
  my @delims = split //, $delim_string;
  my @open_set;
  my @close_set;
  # Partion delimiters into openings and closings
  foreach my $idx (0 .. $#delims) {
    my $char = $delims[$idx];
    if ($idx % 2) {
      push @close_set, $char;
    } else {
      push @open_set, $char;
    }
  }

  my @search = split //, $search_string;
  my @found_open;
  my @found_close;

  foreach my $char (@search) {
    if (grep $_ eq $char, @open_set) {
      push @found_open, $char;
    }
    if (grep $_ eq $char, @close_set) {
      push @found_close, $char;
    }
  }

  return (\@found_open, \@found_close);
}

```
[Perl Weekly Challenge - 131]: https://theweeklychallenge.org/blog/perl-weekly-challenge-131/

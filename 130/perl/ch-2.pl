#!/usr/bin/perl

=begin comment

 * ch-2.pl
 *
 * Task 2 > Binary Search Tree
 * ===========================
 *
 * You are given a tree.  Write a script to find out if the given tree is a
 * `Binary Seach Tree (BST)`.  According to wikipedia, the definition of BST:
 *
 * > A binary search tree is a rooted binary tree, whose internal nodes each
 * > store a key (and optionally, an associated value), and each had two
 * > distinguished sub-trees, commonly denoted left and right.  The tree
 * > additionally satisfies the binary seach property: the key in each node is
 * > greater than or equal to any key stored in the left sub-tree, and less than
 * > or equal to any key stored in the right sub-tree.  The leaves (final nodes)
 * > of the tree contain no key and have no structure to distinguish them from
 * > one another.
 *
 * Example 1
 * =========
 *
 * Input:
 *
 *     8
 *    / \
 *   5   9
 *  / \
 * 4   6
 *
 * Output: 1 as the given tree is a BST.
 *
 * Example 2
 * =========
 *
 * Input:
 *
 *     5
 *    / \
 *   4   7
 *  / \
 * 3   6
 *
 * Output: 0 as the given tree is not a BST.

=end comment
=cut

use strict;
use warnings;
use utf8;
use open ":std", ":encoding(UTF-8)";
use Term::ANSIColor;

# Here, our BinarySearchTree validator (PWC Solution)

sub is_BST {
  my ($tree, $node, $min, $max) = @_;
  # catch invalid input, reset at root
  if (not ($node || $min || $max)) {
    return 0 unless $tree->{'root'};
    return is_BST($tree, $tree->{'root'});
  }
  # if no node, we've reached the end of the tree.  pass
  if (($min || $max) and not (defined $node)) {
    return 1;
  }
  my $test = $node->{'data'};
  my $num = $test =~ /^-?\d*\.?\d+$/;
  # exceeds $max.  fail
  if (defined $max) {
    if ($num and $test >= $max) {
      return 0;
    }
    if (not($num) and $test ge $max) {
      return 0;
    }
  }
  # less then $min.  fail
  if (defined $min) {
    if ($num and $test <= $min) {
      return 0;
    }
    if (not($num) and $test le $min) {
      return 0;
    }
  }
  # recurse
  if (
    is_BST($tree, $node->{'left'}, $min, $node->{'data'}) &&
    is_BST($tree, $node->{'right'}, $node->{'data'}, $max)
  ) {
    return 1;
  }
  return 0;
}


# Followed by some utilities to test our solution

{
  package Binary_node;
  # constructor
  sub new {
    my $class = shift;
    my $self = {
      data => shift
    };
    bless $self, $class;
    return $self;
  }

  sub add_left {
    my ($self, $data) = @_; 

    if (exists $self->{'left'}) {
      return 0;
    }
    $self->{'left'} = Binary_node->new($data);
    return $self;
  }

  sub add_right {
    my ($self, $data) = @_;

    if (exists $self->{'right'}) {
      return 0;
    }
    $self->{'right'} = Binary_node->new($data);
    return $self;
  }
}

{
  package Binary_tree;
  # constructor
  sub new {
    my $class = shift;
    my $data = shift;
    my $self = {
      root => undef
    };
    if (defined $data) {
      $self->{'root'} = Binary_node->new($data);
    }
    bless $self, $class;
    return $self;
  }
  # In the case where the Binary_tree is initialized without a root
  sub add_root {
    my ($self, $data) = @_;

    if (defined $data) {
      $self->{'root'} = Binary_node->new($data);
      return $self;
    }
    return 0;
  }
  # Find and return a node to assist in building our tree
  sub find_node {
    my ($self, $match, $tree) = @_;
    unless (defined $tree) {
      $tree = $self->{'root'};
    }
    if ($tree->{'data'} eq $match) {
      return $tree;
    }
    unless ($tree->{'left'} || $tree->{'right'}) {
      return 0;
    }
    return find_node($self, $match, $tree->{'left'}) ||
           find_node($self, $match, $tree->{'right'});
  }
}

sub tree_from_strings {
  my $tree_data = shift;
  my $binary_tree = Binary_tree->new();

  if (not defined $tree_data) {
    return 0;
  }

  if (scalar(@$tree_data) > 0 && not defined $binary_tree->{'root'}) {
    my $root = $tree_data->[0];
    $root =~ s/^\s+|\s+$//g;

    $binary_tree->add_root($root);
    unless ($#$tree_data) {
      return $binary_tree;
    }
  }

  my @data = @$tree_data[0 .. $#$tree_data];

  while (scalar(@data) != 0) {
    my $tmp_values = $data[0];
    my $value_str = shift @data;

    $tmp_values =~ s/^\s+|\s+$//g;
    my @values = map {
      my $value = $_;
      {
        value => $value,
        idx => index($value_str, $value)
      }
    } split(/\s+/, $tmp_values);

    my $connections = shift @data;
    my $leaves = $data[0];

    if (defined $connections) {
      foreach my $idx (0 .. $#values) {
        my $node = $binary_tree->find_node($values[$idx]->{'value'});

        my $l_bound = $idx == 0 ? 0: $values[$idx - 1]->{'idx'} + 1;
        # Probably a problem in that last ternary condition. 
        my $r_bound = $idx == $#values ?
          length($leaves) - 1 : $values[$idx + 1]->{'idx'} + 1;

        my @connection_split = split('', $connections);
        my @connection_range = @connection_split[$l_bound .. $r_bound];
        my $connections_joined = join'', grep { defined $_ } @connection_range;

        my $l_idx = index($connections_joined, "/");
        my $r_idx = index($connections_joined, "\\");
        
        my $left = $l_idx != -1 && $l_idx < $values[$idx]->{'idx'};
        my $right = $r_idx != -1 && $r_idx > $values[$idx]->{'idx'};

        if ($left) {
          my $range_length = $values[$idx]->{'idx'} - $l_bound + 1;

          my $l_val = substr $leaves, $l_bound, $range_length;
          $l_val =~ s/^\s+|\s+$//g;

          $node->add_left($l_val);
        }

        if ($right) {
          my $offset = $values[$idx]->{'idx'} + 1;
          my $range_length = $r_bound - $offset + 1;

          my $r_val = substr $leaves, $offset, $range_length;
          $r_val =~ s/^\s+|\s+$//g;

          $node->add_right($r_val);
        }
      }
    }
  }
  return $binary_tree;
}

sub parse_test_case {
  my $file_path = shift;
  my @displays;
  my @tree_data;
  my @outputs;
  my @tmp;

  open my $fh, "<", $file_path
    or die "Could not open '$file_path' - $!\n";

  while (my $line = <$fh>) {
    chomp $line;
    # Skip comments and blank lines
    next if $line =~ /^\s*#/ or $line =~ /^\s*$/;
    if ($line =~ /Output/) {
      my @data = @tmp;
      my $display = join "\n", @tmp;
      $line =~ s/.*(\d)$/$1/;
      push @displays, $display;
      push(@tree_data, \@data);
      push @outputs, int($line);
      @tmp = ();
      next;
    }
    push @tmp, $line;
  }
  my @trees = map {
    my $raw_tree = $_;
    tree_from_strings $raw_tree;
  } @tree_data;

  return (\@displays, \@trees, \@outputs);
}

sub assert_match {
  my ($tree, $output) = @_;
  my $result = is_BST $tree;

  print "Expected: $output\n";

  if ($result) {
    print "Result: 1 as the given tree is a BST.\n";
  } else {
    print "Result: 0 as the given tree is not a BST\n";
  }
  if ($output == $result) {
    print color("green"), "Passed \x{2690}\n", color("reset");
    return;
  }
  print color("red"), "Failed \x{2715}\n", color("reset");
}

# And our test runner

sub main {
  my $target = shift @ARGV // "../test_cases/ch-2";

  if (-e -r -f $target) {
    my ($displays, $trees, $outputs) = parse_test_case $target;

    print $target, "\n";
    print "===============================================\n\n";

    foreach my $idx (0 .. $#$displays) {
      print "Input:\n";
      print $displays->[$idx], "\n";
      assert_match $trees->[$idx], $outputs->[$idx];
      print "\n";
    }
    return;
  } elsif (-e -r -d _) {
    $target =~ s/^(.*?)\/?$/$1\//;

    opendir my $dh, $target
      or die "Could not open '$target' - $!\n";

    my @entries = readdir $dh;

    closedir $dh;

    foreach my $entry (sort @entries) {
      if ($entry eq "." or $entry eq "..") {
        next;
      }
      my $path = $target . $entry;
      my ($displays, $trees, $outputs) = parse_test_case $path;

      print $path, "\n";
      print "===============================================\n\n";

      foreach my $idx (0 .. $#$displays) {
        print "Input:\n";
        print $displays->[$idx], "\n";
        assert_match $trees->[$idx], $outputs->[$idx];
        print "\n";
      }
    }
    return;
  }
  print "No tests found at $target\n";
}

main();

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
use Term::ANSIColor;
use Data::Dumper;

# Here, our BinarySearchTree validator (PWC Solution)



# Followed by some utilities to test our solution

{
  package Binary_node;

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
  # Private recurse method
  sub _recurse {
    my ($node, $callback) = @_;

    $callback->($node);
    if ($node->{'right'}) {
      _recurse($node->{'right'}, $callback);
    }
    if ($node->{'left'}) {
      _recurse($node->{'left'}, $callback);
    }
  }
  # Private crawl method
  sub _crawl {
    my ($self, $callback) = @_;

    _recurse($self->{'root'}, $callback);
  }
  # Private match method
  sub _match {
    my $check = shift;
    print $check, "\n";
  }
  # Find and return a node to assist in building our tree
  sub find_node {
    my ($tree, $match) = @_;
    return unless $tree;
    if (exists $tree->{'root'} and $tree->{'root'}{'data'} == $match) {
      return $tree;
    }
    if ($tree->{'data'} == $match) {
      return $tree;
    }
    find_node $tree->{'left'}, find_node $tree->{'right'};
  }
}

my $test = Binary_tree->new(3);

my $node = $test->find_node(3);

print Dumper $node;

$node->add_right(4);
$node->add_left(7);
# print Dumper $test;

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
    build_tree $raw_tree;
  } @tree_data;

  return (\@displays, \@trees, \@outputs);
}

sub assert_match {
  my ($tree, $output) = @_;
  my $result = isBST $tree;

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

    foreach my $entry (@entries) {
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

# main();

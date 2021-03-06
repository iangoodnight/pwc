#!/usr/bin/perl

=begin comment
 * Given two linked lists consisting only of single-digit positive
 * numbers, write a script to add the two linked lists and create a new linked
 * list representing the sum of the two linked list numbers.  The two linked
 * lists may or may not have the same number of elements.
 *
 * HINT: Just a suggestion, feel free to develop a unique way to deal with the
 * task.  The expectation is  a class representing linked list.  It should have
 * methods to create a new linked list from a list of single-digit positive
 * numbers and a method to add a new member.  Also, have a method that takes two
 * linked list objects and returns a new linked list--finally, a method to print
 * the linked list object in a user-friendly format.
 *
 * Example 1
 * =========
 *
 * Input:  L1 = 1 -> 2 -> 3
 *         L2 = 3 -> 2 -> 1
 * Output: 4 -> 4 -> 4
 *
 * Operation: Pick the first rightmost element of L1, i.e., 3, and adds to the
 * first rightmost element of L2, i.e., 1. Finally, store the result, i.e., 3,
 * in the new linked list. Then, move to the next one of both linked lists L1
 * and L2, perform the same operation. If the sum >= 10, apply the same rule as
 * one would do to the regular addition problem, i.e., divide the sum by 10,
 * keep the remainder, and push to the new linked list. Do not forget to carry 1
 * to the next operation. If one linked list is smaller than the other, it can
 * be safely assumed that it is 0.
 *
 * Example 2
 * =========
 *
 * Input: L1 = 1 -> 2 -> 3 -> 4 -> 5
 *        L2 =           6 -> 5 -> 5
 * Output:     1 -> 3 -> 0 -> 0 -> 0
 *
 * Operations:
 *   a) 1st member of L1 = 5 and 1st member of L2 = 5
 *   b) 5 + 5 = 10
 *   c) 0 pushed to the new linked list.
 *   d) carry forward 1.
 *   e) 2nd member of L1 = 4 and 2nd member of L2 = 5
 *   f) 4 + 5 + 1 (carry) = 10
 *   h) 0 again pushed to the new linked list.
 *   i) carry forward 1.
 *   j) 3rd member of L1 = 3 and 3rd member of L2 = 6
 *   k) 3 + 6 + 1 (carry) = 10
 *   l) 0 pushed to the new linked list.
 *   m) carry forward 1.
 *   n) 4th member of L1 = 2 and assume 0 as the 4th member of L2 since there
 *      are only 3 members.
 *   o) 2 + 1 (carry) = 3
 *   p) 3 pushed to the new linked list.
 *   q) 5th member of L1 = 1 and assume 0 as the 5th member of L2 since there
 *      are only 3 members.
 *   r) 1 + 0 = 1
 *   s) 1 pushed to the new linked list.
 *
 * So the new linked list now has: 1 -> 3 -> 0 -> 0 -> 0.
 *
 * The above suggestion is one way, not necessarily the best way to deal with
 * it.
=end comment
=cut

use strict;
use warnings;
use utf8;
use Term::ANSIColor;

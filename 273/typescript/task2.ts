/* ************************************************************************** **
 * ## Task 2: B After A
 *
 * **Submitted by:** [Mohammad Sajid Anwar][2]
 *
 * You are given a string, `$str`.
 *
 * Write a script to return `true` if there is at least one `b`, and no `a`
 * appears after the first `b`.
 *
 * **Example 1**
 *
 * ```
 * Input: $str = "aabb"
 * Output: true
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: $str = "abab"
 * Output: false
 * ```
 *
 * **Example 3**
 *
 * ```
 * Input: $str = "aaa"
 * Output: false
 * ```
 *
 * **Example 4**
 *
 * ```
 * Input: $str = "bbb"
 * Output: true
 * ```
 *
 * [2]: https://manwar.org/
 * ************************************************************************** */

function bAfterA(str: string): boolean {
  return str.match(/^[^b]*b[^a]*$/) !== null;
}

export default bAfterA;

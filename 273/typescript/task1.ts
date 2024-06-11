/** ************************************************************************* **
 * ## Task 1: Percentage of Character
 *
 * **Submitted by:** [Mohammad Sajid Anwar][2]
 *
 * You are given a string, `$str` and a character `$char`.
 *
 * Write a script to return the percentage, nearest whole, of given character in
 * the given string.
 *
 * **Example 1**
 *
 * ```
 * Input: $str = "perl", $char = "e"
 * Output: 25
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: $str = "java", $char = "a"
 * Output: 50
 * ```
 *
 * **Example 3**
 *
 * ```
 * Input: $str = "python", $char = "m"
 * Output: 0
 * ```
 *
 * **Example 4**
 *
 * ```
 * Input: $str = "ada", $char = "a"
 * Output: 67
 * ```
 *
 * **Example 5**
 *
 * ```
 * Input: $str = "ballerina", $char = "l"
 * Output: 22
 * ```
 *
 * **Example 6**
 *
 * ```
 * Input: $str = "analitik", $char = "k"
 * Output: 13
 * ```
 *
 * [2]: https://manwar.org/
 * ************************************************************************** */

function percentageOfCharacter(str: string, char: string): number {
  const length: number = str.length;
  const count: number = str.split('').filter((c: string) => c === char).length;
  // multiply by 100 to get percentage as whole number
  const HUNDRED: number = 100;
  const percentage: number = (count / length) * HUNDRED;

  return Math.round(percentage);
}

export default percentageOfCharacter;

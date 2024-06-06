/** ************************************************************************* **
 * ## Task 2: String Score
 *
 * **Submitted by:** [Mohammad Sajid Anwar][2]
 *
 * You are given a string, `$str`.
 *
 * Write a script to return the score of the given string.
 *
 * > The score of a string is defined as the sum of the absolute difference
 * > between the ASCII values of adjacent characters.
 *
 * **Example 1**
 *
 * ```
 * Input: $str = "hello"
 * Output: 13
 *
 * ASCII values of characters:
 * h = 104
 * e = 101
 * l = 108
 * l = 108
 * o = 111
 *
 * Score => |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111|
 *       => 3 + 7 + 0 + 3
 *       => 13
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: "perl"
 * Output: 30
 *
 * ASCII values of characters:
 * p = 112
 * e = 101
 * r = 114
 * l = 108
 *
 * Score => |112 - 101| + |101 - 114| + |114 - 108|
 *       => 11 + 13 + 6
 *       => 30
 * ```
 *
 * **Example 3**
 *
 * ```
 * Input: "raku"
 * Output: 37
 *
 * ASCII values of characters:
 * r = 114
 * a = 97
 * k = 107
 * u = 117
 *
 * Score => |114 - 97| + |97 - 107| + |107 - 117|
 *       => 17 + 10 + 10
 *       => 37
 * ```
 *
 * [2]: https://manwar.org/
 ** ************************************************************************* */

function stringScore(str: string): number {
  const characters: string[] = str.split('');
  return characters.reduce(
    (score: number, character: string, index: number, characters: string[]) => {
      if (index === 0) return score;
      const charCode: number = character.charCodeAt(0);
      const previousIndex: number = index - 1;
      const previousCharacter: string = characters[previousIndex] || '';
      const previousCharCode: number = previousCharacter.charCodeAt(0);
      const newScore: number = Math.abs(charCode - previousCharCode);
      return score + newScore;
    },
    0,
  );
}

export default stringScore;

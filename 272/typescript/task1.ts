/** ************************************************************************* **
 * ## Task 1: Defang IP Address
 *
 * **Submitted by:** [Mohammad Sajid Anwar][2]
 *
 * You are given a valid `IPv4` address.
 *
 * Write a script to return the defanged version of the given IP address.
 *
 * A defanged IP address replaces every period “.” with “[.]".
 *
 * **Example 1**
 *
 * ```
 * Input: $ip = "1.1.1.1"
 * Output: "1[.]1[.]1[.]1"
 * ```
 *
 * **Example 2**
 *
 * ```
 * Input: $ip = "255.101.1.0"
 * Output: "255[.]101[.]1[.]0"
 * ```
 *
 * [2]: https://manwar.org/
 ** ************************************************************************* */

function defangIpAddr(address: string): string {
  return address.replace(/\./g, '[.]');
}

export default defangIpAddr;

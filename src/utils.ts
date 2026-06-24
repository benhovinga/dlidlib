/**
 * Returns `str` with everything before `char` removed. If `char` is not found
 * it will return `str` untouched.
 *
 * @example
 * ```js
 * trimBefore("@", "hello@world"); // "@world"
 * ```
 */
export function trimBefore(char: string, str: string): string {
  if (typeof char !== "string" || typeof str !== "string")
    throw new TypeError("Inputs must be string type");
  const index = str.indexOf(char);
  return str.slice(index >= 0 ? index : 0);
}

import { type CountryCode } from "./authority";
import { type AAMVAVersion } from "./barcode";

export interface DateParts {
  year: number;
  month: number;
  day: number;
}

export type DateParserFn = (dateStr: string) => DateParts;

export type ISOCountry = "CAN" | "MEX";

/**
 * List of country codes for countries that use ISO formatted date fields.
 *
 * ISO formats were introduces in AAMVA Version 3
 */
export const ISO_COUNTRIES: readonly ISOCountry[] = Object.freeze([
  "CAN",
  "MEX", // Unsure as the standard only mentions Canada and USA.
]);

/**
 * Validates the date string can be parsed into its parts. Is void on success,
 * otherwise throws error with message indicating the failure type.
 *
 * @param dateStr {string} - An 8 digit date string, such as `"20260217"` or `"02172026"`
 * @throws TypeError("Argument 'dateStr' must be a string.")
 * @throws RangeError("Argument 'dateStr' must be exactly 8 digits.")
 * @throws TypeError("Argument 'dateStr' must only contain numbers.")
 */
function validateDateStr(dateStr: unknown): void {
  if (typeof dateStr !== "string")
    throw new TypeError("Argument 'dateStr' must be a string.");
  else if (dateStr.length !== 8)
    throw new RangeError("Argument 'dateStr' must be exactly 8 digits.");
  for (let i = 0; i < dateStr.length; i++)
    if (Number.isNaN(Number.parseInt(dateStr[i])))
      throw new TypeError("Argument 'dateStr' must only contain numbers.");
}

/**
 * Parse a date string that is in ISO format YYYYMMDD
 * @param dateStr {string} - An 8 digit date string formatted YYYYMMDD
 * @returns {DateParts} Object with the date split into its year, month, day parts
 * @throws Validation errors
 */
export function isoFormat(dateStr: string): DateParts {
  validateDateStr(dateStr);
  return {
    year: Number.parseInt(dateStr.slice(0, 4)),
    month: Number.parseInt(dateStr.slice(4, 6)),
    day: Number.parseInt(dateStr.slice(6, 8)),
  };
}

/**
 * Parse a date string that is in USA format MMDDYYYY
 * @param dateStr {string} - An 8 digit date string formatted MMDDYYYY
 * @returns {DateParts} Object with the date split into its year, month, day parts
 * @throws Validation errors
 */
export function usaFormat(dateStr: string): DateParts {
  validateDateStr(dateStr);
  return {
    month: Number.parseInt(dateStr.slice(0, 2)),
    day: Number.parseInt(dateStr.slice(2, 4)),
    year: Number.parseInt(dateStr.slice(4, 8)),
  };
}

/**
 * Returns a parsing function for either ISO or USA formatted dates.
 * @param aamvaVersion {number} - The AAMVA barcode file version
 * @param countryCode {string} - The country code
 * @returns {DateParserFn} Function to parse either ISO or USA formatted dates.
 */
export function getDateParser(
  aamvaVersion: AAMVAVersion,
  countryCode: CountryCode,
): DateParserFn {
  return aamvaVersion > 2 &&
    ISO_COUNTRIES.includes(countryCode.toUpperCase() as ISOCountry)
    ? isoFormat
    : usaFormat;
}

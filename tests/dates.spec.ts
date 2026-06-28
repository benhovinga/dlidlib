import { describe, test, expect, vi } from "vitest";
import { type AAMVAVersion } from "../src/barcode";
import { type CountryCode } from "../src/authority";

import { getDateParser, isoFormat, usaFormat } from "../src/dates";

vi.mock("../src/dates", { spy: true });

const isoDateSrt = "20260217";
const usaDateStr = "02172026";
const commonDateObj = {
  year: 2026,
  month: 2,
  day: 17,
};

describe.each(["isoFormat", "usaFormat"])(
  "Test the %s() function",
  (fnName) => {
    const format = fnName === "isoFormat" ? "ISO" : "USA";
    const altFormat = fnName === "isoFormat" ? "USA" : "ISO";
    const formatter = fnName === "isoFormat" ? isoFormat : usaFormat;
    const dateStr = fnName === "isoFormat" ? isoDateSrt : usaDateStr;
    const altDateStr = fnName === "isoFormat" ? usaDateStr : isoDateSrt;

    test(`can parse ${format} formatted date`, () => {
      expect(formatter(dateStr)).toEqual(commonDateObj);
    });

    test(`can not parse ${altFormat} formatted date`, () => {
      expect(formatter(altDateStr)).not.toEqual(commonDateObj);
    });

    test("throws error when dateStr is not string", () => {
      const errMessage = "Argument 'dateStr' must be a string.";
      // @ts-expect-error Missing argument
      expect(() => formatter()).toThrow(errMessage);
      // @ts-expect-error Argument type is not assignable to parameter type
      expect(() => formatter(undefined)).toThrow(errMessage);
      // @ts-expect-error Argument type is not assignable to parameter type
      expect(() => formatter(2)).toThrow(errMessage);
      // @ts-expect-error Argument type is not assignable to parameter type
      expect(() => formatter([])).toThrow(errMessage);
      // @ts-expect-error Argument type is not assignable to parameter type
      expect(() => formatter({})).toThrow(errMessage);
      // @ts-expect-error Argument type is not assignable to parameter type
      expect(() => formatter(null)).toThrow(errMessage);
    });

    test("throws error when dateStr is not 8 digits long", () => {
      const errMessage = "Argument 'dateStr' must be exactly 8 digits.";
      expect(() => formatter("1234567")).toThrow(errMessage);
      expect(() => formatter("123456789")).toThrow(errMessage);
    });

    test("throws error when dateStr is not all numbers", () => {
      const errMessage = "Argument 'dateStr' must only contain numbers.";
      expect(() => formatter("12C45678")).toThrow(errMessage);
    });
  },
);

describe("Test the getDateParser() function", () => {
  const parserTests = [
    ["USA", 1, "USA", usaDateStr, usaFormat],
    ["USA", 2, "USA", usaDateStr, usaFormat],
    ["ISO", 3, "CAN", isoDateSrt, isoFormat],
    ["USA", 3, "USA", usaDateStr, usaFormat],
    ["ISO", 4, "CAN", isoDateSrt, isoFormat],
    ["USA", 4, "USA", usaDateStr, usaFormat],
    ["ISO", 5, "CAN", isoDateSrt, isoFormat],
    ["USA", 5, "USA", usaDateStr, usaFormat],
    ["ISO", 6, "CAN", isoDateSrt, isoFormat],
    ["USA", 6, "USA", usaDateStr, usaFormat],
    ["ISO", 7, "CAN", isoDateSrt, isoFormat],
    ["USA", 7, "USA", usaDateStr, usaFormat],
    ["ISO", 8, "CAN", isoDateSrt, isoFormat],
    ["USA", 8, "USA", usaDateStr, usaFormat],
    ["ISO", 9, "CAN", isoDateSrt, isoFormat],
    ["USA", 9, "USA", usaDateStr, usaFormat],
    ["ISO", 10, "CAN", isoDateSrt, isoFormat],
    ["USA", 10, "USA", usaDateStr, usaFormat],
    ["ISO", 11, "CAN", isoDateSrt, isoFormat],
    ["USA", 11, "USA", usaDateStr, usaFormat],
  ];

  test.each(parserTests)(
    "can get the %s parser (version: %i, country: %s)",
    (_, version, country, dateStr, formatter) => {
      const parser = getDateParser(
        version as AAMVAVersion,
        country as CountryCode,
      );
      expect(parser).toBeTypeOf("function");
      expect(parser(dateStr as string)).toEqual(commonDateObj);
      expect(formatter).toHaveBeenCalledWith(dateStr);
    },
  );
});

import { describe, test, expect, vi } from "vitest";

import { getDateParser, isoFormat, usaFormat } from "../src/dates";

const isoDateSrt = "20260217";
const usaDateStr = "02172026";
const commonDateObj = {
  year: 2026,
  month: 2,
  day: 17,
};

const parserTests = [
  ["USA", 1, "any", usaDateStr, usaFormat],
  ["USA", 2, "any", usaDateStr, usaFormat],
  ["ISO", 3, "any", isoDateSrt, isoFormat],
  ["USA", 3, "usa", usaDateStr, usaFormat],
  ["ISO", 4, "any", isoDateSrt, isoFormat],
  ["USA", 4, "usa", usaDateStr, usaFormat],
  ["ISO", 5, "any", isoDateSrt, isoFormat],
  ["USA", 5, "usa", usaDateStr, usaFormat],
  ["ISO", 6, "any", isoDateSrt, isoFormat],
  ["USA", 6, "usa", usaDateStr, usaFormat],
  ["ISO", 7, "any", isoDateSrt, isoFormat],
  ["USA", 7, "usa", usaDateStr, usaFormat],
  ["ISO", 8, "any", isoDateSrt, isoFormat],
  ["USA", 8, "usa", usaDateStr, usaFormat],
  ["ISO", 9, "any", isoDateSrt, isoFormat],
  ["USA", 9, "usa", usaDateStr, usaFormat],
  ["ISO", 10, "any", isoDateSrt, isoFormat],
  ["USA", 10, "usa", usaDateStr, usaFormat],
  ["ISO", 11, "any", isoDateSrt, isoFormat],
  ["USA", 11, "usa", usaDateStr, usaFormat],
];

describe("Test the isoFormat() function", () => {
  test("can parse ISO formatted date", () => {
    expect(isoFormat(isoDateSrt)).toEqual(commonDateObj);
  });
});

describe("Test the usaFormat() function", () => {
  test("can parse USA formatted date", () => {
    expect(usaFormat(usaDateStr)).toEqual(commonDateObj);
  });
});

describe("Test the getDateParser() function", () => {
  test.each(parserTests)(
    "can get the %s parser (version: %i, country: %s)",
    (_, version, country, dateStr, formatter) => {
      vi.mock("../src/dates", { spy: true });
      const parser = getDateParser(version as number, country as string);
      expect(parser).toBeTypeOf("function");
      expect(parser(dateStr as string)).toEqual(commonDateObj);
      expect(formatter).toHaveBeenCalledExactlyOnceWith(dateStr);
    },
  );

  test("parser throws error when string is not 8 characters long", () => {
    const errMessage = "dateStr must be exactly 8 characters long.";
    const parser = getDateParser(10, "USA");
    expect(() => parser("1234567")).toThrow(errMessage);
    expect(() => parser("123456789")).toThrow(errMessage);
  });
});

import { describe, test, expect } from "vitest";

import {
  ISSUING_AUTHORITIES,
  getAuthorityById,
} from "../src/issuing-authority";

describe("Test the ISSUING_AUTHORITIES constant", () => {
  test("matches snapshot", () => {
    expect(ISSUING_AUTHORITIES).toMatchSnapshot();
  });
});

describe("Test the getAuthorityById() function", () => {
  test("can return a valid authority", () => {
    expect(getAuthorityById(604426)).toEqual({
      abbr: "PE",
      country: "Canada",
      issuerId: 604426,
      jurisdiction: "Prince Edward Island",
    });
  });
  test("can return undefined when issuer id was not found", () => {
    expect(getAuthorityById(0)).toBe(undefined);
  });
});

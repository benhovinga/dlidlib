import { describe, test, expect } from "vitest";

import IssuingAuthority from "../src/issuing-authority";

describe("Test the AUTHORITIES static property", () => {
  test("matches snapshot", () => {
    expect(IssuingAuthority.AUTHORITIES).toMatchSnapshot();
  });
  test("expect frozen authorities", () => {
    expect(Object.isFrozen(IssuingAuthority.AUTHORITIES)).toBe(true);
  });
  test("expect frozen authority", () => {
    expect(Object.isFrozen(IssuingAuthority.AUTHORITIES[0])).toBe(true);
  });
});

describe("Test the getAuthorityById() static method", () => {
  test("can return a valid authority", () => {
    expect(IssuingAuthority.getAuthorityById(604426)).toEqual({
      abbr: "PE",
      country: "Canada",
      issuerId: 604426,
      jurisdiction: "Prince Edward Island",
    });
  });
  test("can return undefined when issuer id was not found", () => {
    expect(IssuingAuthority.getAuthorityById(0)).toBe(undefined);
  });
});

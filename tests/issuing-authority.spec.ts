import { describe, test, expect } from "vitest";

import IssuingAuthority from "../src/issuing-authority";

describe("Test the AUTHORITIES static property", () => {
  test("matches snapshot", () => {
    expect(IssuingAuthority.AUTHORITIES).toMatchSnapshot();
  });
  test("is frozen", () => {
    expect(Object.isFrozen(IssuingAuthority.AUTHORITIES)).toBe(true);
  });
  test("item is frozen", () => {
    expect(Object.isFrozen(IssuingAuthority.AUTHORITIES[0])).toBe(true);
  });
});

describe("Test the getAuthorityById() static method", () => {
  const issuerIds = IssuingAuthority.AUTHORITIES.map(
    (authority) => authority.issuerId,
  );
  test.each(issuerIds)("matches snapshot for issuerId '%i'", (issuerId) => {
    expect(IssuingAuthority.getAuthorityById(issuerId)).toMatchSnapshot();
  });
  test("can return undefined when issuer id was not found", () => {
    expect(IssuingAuthority.getAuthorityById(0)).toBe(undefined);
  });
});

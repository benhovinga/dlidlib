import { describe, test, expect } from "vitest";

import { trimBefore } from "../src/utils";

describe("Test the trim_before() utility function", () => {
  test("can return the string unchanged when char is first", () => {
    expect(trimBefore("@", "@banana")).toBe("@banana");
    expect(trimBefore("@", "@banana")).not.toBe("banana");
  });

  test("can trim the string when char is found later", () => {
    expect(trimBefore("@", "laughing@cucumber")).toBe("@cucumber");
    expect(trimBefore("@", "laughing@cucumber")).not.toBe("cucumber");
  });

  test("can return the string unchanged when char is missing", () => {
    expect(trimBefore("@", "where's Waldo")).toBe("where's Waldo");
    expect(trimBefore("@", "where's Waldo")).not.toBe("@where's Waldo");
  });

  test("throws an error when given improper input types", () => {
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => trimBefore(3, "hard drive disk")).toThrow(
      "Inputs must be string type",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => trimBefore("@", 99)).toThrow("Inputs must be string type");
  });
});

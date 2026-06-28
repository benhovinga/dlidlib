import { describe, test, expect } from "vitest";

import Profile from "../src/profile";

test("Module default export is a class Profile", () => {
  expect(Profile).toBeTypeOf("function");
  expect(Profile.name).toBe("Profile");
});

describe("Testing the Profile class constructor", () => {
  describe("throws TypeError if file argument is not an object", () => {
    test.each([
      undefined,
      true,
      false,
      '"string"',
      42,
      BigInt(9007199254740991),
      () => {},
      Symbol(),
    ])("when first argument is `%s`", (testFn) => {
      const errMsg = "Argument 'file' must be an object.";
      // @ts-expect-error Argument type is invalid
      expect(() => new Profile(testFn)).toThrow(TypeError);
      // @ts-expect-error Argument type is invalid
      expect(() => new Profile(testFn)).toThrow(errMsg);
    });
  });
  test("throws Error when aamvaVersion is 1 (not implemented)", () => {
    // @ts-expect-error header property is missing properties
    expect(() => new Profile({ header: { aamvaVersion: 1 } })).toThrow(
      "Not Implemented.",
    );
  });
});

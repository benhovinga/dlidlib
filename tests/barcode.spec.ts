import { describe, test, expect } from "vitest";

import BarcodeFile, { type SubfileDesignator } from "../src/barcode";

const CURRENT_VERSION = 11;

const testBarcodeStrings: [number, string][] = [
  [
    1,
    "@\n\x1e\rANSI 6360000102DL00390187ZV02260032DLDAQ0123456789ABC\n" +
      "DAAPUBLIC,JOHN,Q\nDAG123 MAIN STREET\nDAIANYTOWN\nDAJVA\n" +
      "DAK123459999  \nDARDM  \nDAS          \nDAT     \nDAU509\nDAW175\n" +
      "DAYBL \nDAZBR \nDBA20011201\nDBB19761123\nDBCM\nDBD19961201\r" +
      "ZVZVAJURISDICTIONDEFINEDELEMENT\r",
  ],
  [
    4,
    "@\n\x1e\rANSI 636000040002DL00410278ZV03190008DLDAQT64235789\n" +
      "DCSSAMPLE\nDDEN\nDACMICHAEL\nDDFN\nDADJOHN\nDDGN\nDCUJR\nDCAD\n" +
      "DCBK\nDCDPH\nDBD06062008\nDBB06061986\nDBA12102012\nDBC1\n" +
      "DAU068 in\nDAYBRO\nDAG2300 WEST BROAD STREET\nDAIRICHMOND\n" +
      "DAJVA\nDAK232690000  \nDCF2424244747474786102204\nDCGUSA\n" +
      "DCK123456789\nDDAM\nDDB06062008\nDDC06062009\nDDD1\rZVZVA01\r",
  ],
  [
    10,
    "@\n\x1e\rANSI 636000100102DL00410278ZV03190008DLDAQT64235789\n" +
      "DCSSAMPLE\nDDEN\nDACMICHAEL\nDDFN\nDADJOHN\nDDGN\nDCUJR\nDCAD\n" +
      "DCBK\nDCDPH\nDBD06062019\nDBB06061986\nDBA12102024\nDBC1\n" +
      "DAU068 in\nDAYBRO\nDAG2300 WEST BROAD STREET\nDAIRICHMOND\nDAJVA\n" +
      "DAK232690000  \nDCF2424244747474786102204\nDCGUSA\nDCK123456789\n" +
      "DDAF\nDDB06062018\nDDC06062020\nDDD1\rZVZVA01\r",
  ],
];

class BarcodeFileTestable extends BarcodeFile {
  public static testHeaderLength(aamvaVersion: number) {
    return this.headerLength(aamvaVersion);
  }
  public static testParseFileHeader(barcodeString: string) {
    return this.parseFileHeader(barcodeString);
  }
  public static testParseSubfileDesignator(
    barcodeString: string,
    aamvaVersion: number,
    designatorIndex: number,
  ) {
    return this.parseSubfileDesignator(
      barcodeString,
      aamvaVersion,
      designatorIndex,
    );
  }
  public static testParseSubfile(
    barcodeString: string,
    designator: SubfileDesignator,
  ) {
    return this.parseSubfile(barcodeString, designator);
  }
}

describe("Test the headerLength() static method", () => {
  test("can return 19 for version 1", () => {
    expect(BarcodeFileTestable.testHeaderLength(1)).toBe(19);
    expect(BarcodeFileTestable.testHeaderLength(1)).not.toBe(21);
  });

  test.each([...Array(CURRENT_VERSION + 1).keys()].filter((i) => i > 1))(
    "can return 21 for version %i",
    (aamvaVersion) => {
      expect(BarcodeFileTestable.testHeaderLength(aamvaVersion)).toBe(21);
      expect(BarcodeFileTestable.testHeaderLength(aamvaVersion)).not.toBe(19);
    },
  );

  test("throws an error when version is not a integer", () => {
    expect(() => BarcodeFileTestable.testHeaderLength(1.1)).toThrow(
      "Argument 'aamvaVersion' must be an integer.",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => BarcodeFileTestable.testHeaderLength("1")).toThrow(
      "Argument 'aamvaVersion' must be an integer.",
    );
  });

  test("throws an error when version is out of range", () => {
    expect(() => BarcodeFileTestable.testHeaderLength(0)).toThrow(
      "Argument 'aamvaVersion' must is out of range (1-99).",
    );
    expect(() => BarcodeFileTestable.testHeaderLength(100)).toThrow(
      "Argument 'aamvaVersion' must is out of range (1-99).",
    );
  });
});

describe("Test the parseFileHeader() static method", () => {
  test("throws an error when header length is too short", () => {
    expect(() =>
      BarcodeFileTestable.testParseFileHeader("@\n\x1e\rANSI 6360000"),
    ).toThrow("Header length is too short");
  });

  test("throws an error when header is missing compliance indicator", () => {
    expect(() =>
      BarcodeFileTestable.testParseFileHeader("\n\x1e\rANSI 6360000102"),
    ).toThrow("Header is missing compliance indicator");
  });

  test("throws an error when header is missing data element separator", () => {
    expect(() =>
      BarcodeFileTestable.testParseFileHeader("@\x1e\rANSI 6360000102"),
    ).toThrow("Header is missing data element separator");
  });

  test("throws an error when header is missing record separator", () => {
    expect(() =>
      BarcodeFileTestable.testParseFileHeader("@\n\rANSI 6360000102"),
    ).toThrow("Header is missing record separator");
  });

  test("throws an error when header is missing segment terminator", () => {
    expect(() =>
      BarcodeFileTestable.testParseFileHeader("@\n\x1eANSI 6360000102"),
    ).toThrow("Header is missing segment terminator");
  });

  test("throws an error when header is missing file type", () => {
    expect(() =>
      BarcodeFileTestable.testParseFileHeader("@\n\x1e\r6360000102DL0"),
    ).toThrow("Header is missing file type");
  });

  test.each([
    [1, "@\n\x1e\rANSI 636000010"],
    [2, "@\n\x1e\rANSI 63600002010"],
    [3, "@\n\x1e\rANSI 63600003010"],
    [4, "@\n\x1e\rANSI 63600004010"],
    [5, "@\n\x1e\rANSI 63600005010"],
    [6, "@\n\x1e\rANSI 63600006010"],
    [7, "@\n\x1e\rANSI 63600007010"],
    [8, "@\n\x1e\rANSI 63600008010"],
    [9, "@\n\x1e\rANSI 63600009010"],
    [10, "@\n\x1e\rANSI 63600010010"],
    [11, "@\n\x1e\rANSI 63600011010"],
  ])(
    "throws an error when header length is too short (version: %i)",
    (_, badString) => {
      expect(() => BarcodeFileTestable.testParseFileHeader(badString)).toThrow(
        "Header length is too short for version",
      );
    },
  );

  test.each(testBarcodeStrings)(
    "can parse header (version %i)",
    (_, barcodeString) => {
      expect(
        BarcodeFileTestable.testParseFileHeader(barcodeString),
      ).toMatchSnapshot();
    },
  );
});

describe("Test the parseSubfileDesignator() static method", () => {
  test.each([
    [1, 0, "@\n\x1e\rANSI 6360000102DL0039018"],
    [1, 1, "@\n\x1e\rANSI 6360000102DL00390187ZV0226003"],
    [10, 0, "@\n\x1e\rANSI 636000100102DL0041027"],
    [10, 1, "@\n\x1e\rANSI 636000100102DL00410278ZV0319000"],
  ])(
    "throws an error when subfile designator is too short (version: %i, index: %i)",
    (aamvaVersion, designatorIndex, barcodeString) => {
      expect(() =>
        BarcodeFileTestable.testParseSubfileDesignator(
          barcodeString,
          aamvaVersion,
          designatorIndex,
        ),
      ).toThrow("Subfile designator is too short");
    },
  );

  test.each(
    testBarcodeStrings.flatMap((row) => {
      return [
        [row[0], 0, row[1]],
        [row[0], 1, row[1]],
      ];
    }),
  )(
    "can parse subfile designator (version: %i, index: %i)",
    (aamvaVersion, index, barcodeString) => {
      expect(
        BarcodeFileTestable.testParseSubfileDesignator(
          barcodeString,
          aamvaVersion,
          index,
        ),
      ).toMatchSnapshot();
    },
  );
});

describe("Test the parseSubfile() static method", () => {
  test("throws an error when subfile length is too short", () => {
    expect(() =>
      BarcodeFileTestable.testParseSubfile(
        "@\n\x1e\rANSI 6360000102DL00390187ZV02260032DLDAQ0123456789ABC\n" +
          "DAAPUBLIC,JOHN,Q\nDAG123 MAIN STREET\nDAIANYTOWN\nDAJVA\n" +
          "DAK123459999  \nDARDM  \nDAS          \nDAT     \nDAU509\nDAW175\n" +
          "DAYBL \nDAZBR \nDBA20011201\nDBB19761123\nDBCM\nDBD19961201", // <-- Removed last character
        {
          subfileType: "DL",
          offset: 39,
          length: 187,
        },
      ),
    ).toThrow("Subfile length is too short");
  });

  test("throws an error when subfile is missing subfile type", () => {
    expect(() =>
      BarcodeFileTestable.testParseSubfile(
        "@\n\x1e\rANSI 6360000102DL00390187ZV02260032##DAQ0123456789ABC\n" + // <-- Changed subfile type to `##`
          "DAAPUBLIC,JOHN,Q\nDAG123 MAIN STREET\nDAIANYTOWN\nDAJVA\n" +
          "DAK123459999  \nDARDM  \nDAS          \nDAT     \nDAU509\nDAW175\n" +
          "DAYBL \nDAZBR \nDBA20011201\nDBB19761123\nDBCM\nDBD19961201\r",
        {
          subfileType: "DL",
          offset: 39,
          length: 187,
        },
      ),
    ).toThrow("Subfile is missing subfile type");
  });

  test("throws an error when subfile is missing segment terminator", () => {
    expect(() =>
      BarcodeFileTestable.testParseSubfile(
        "@\n\x1e\rANSI 6360000102DL00390187ZV02260032DLDAQ0123456789ABC\n" +
          "DAAPUBLIC,JOHN,Q\nDAG123 MAIN STREET\nDAIANYTOWN\nDAJVA\n" +
          "DAK123459999  \nDARDM  \nDAS          \nDAT     \nDAU509\nDAW175\n" +
          "DAYBL \nDAZBR \nDBA20011201\nDBB19761123\nDBCM\nDBD19961201#", // <-- Changed segment terminator to `#`
        {
          subfileType: "DL",
          offset: 39,
          length: 187,
        },
      ),
    ).toThrow("Subfile is missing segment terminator");
  });

  test.each(
    testBarcodeStrings.flatMap((row) => {
      return [
        [row[0], 0, row[1]],
        [row[0], 1, row[1]],
      ];
    }),
  )(
    "can parse subfile (version: %i, index: %i)",
    (aamvaVersion, index, barcodeString) => {
      const designator = BarcodeFileTestable.testParseSubfileDesignator(
        barcodeString,
        aamvaVersion,
        index,
      );
      expect(
        BarcodeFileTestable.testParseSubfile(barcodeString, designator),
      ).toMatchSnapshot();
    },
  );
});

describe("Test the parse() static method", () => {
  test("throws an error when barcodeString is not a string", () => {
    const errMsg = "Argument 'barcodeString' must be of type 'string'.";
    // @ts-expect-error Missing argument
    expect(() => BarcodeFile.parse()).toThrow(errMsg);
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => BarcodeFile.parse(undefined)).toThrow(errMsg);
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => BarcodeFile.parse(2)).toThrow(errMsg);
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => BarcodeFile.parse([])).toThrow(errMsg);
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => BarcodeFile.parse({})).toThrow(errMsg);
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => BarcodeFile.parse(null)).toThrow(errMsg);
  });

  test("throws an error when number of entries is less than 1", () => {
    // Version 1
    expect(() => BarcodeFile.parse("@\n\x1e\rANSI 6360000100")).toThrow(
      "Number of entries cannot be less than 1",
    );
    // Version 10
    expect(() => BarcodeFile.parse("@\n\x1e\rANSI 636000100100")).toThrow(
      "Number of entries cannot be less than 1",
    );
  });

  test.each(testBarcodeStrings)(
    "can parse barcodeString (version: %i)",
    (_, barcodeString) => {
      expect(BarcodeFile.parse(barcodeString)).toMatchSnapshot();
    },
  );
});

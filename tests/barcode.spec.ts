import { describe, test, expect } from "vitest";

import {
  headerLength,
  parseFileHeader,
  parseSubfileDesignator,
  parseSubfile,
  parseBarcodeString,
  type FileHeader,
  type SubfileDesignator,
  type Subfile,
  type BarcodeFile,
} from "../src/barcode";

interface TestDataItem {
  aamvaVersion: number;
  barcodeString: string;
  header: FileHeader;
  designators: SubfileDesignator[];
  subfiles: Subfile[];
}

const CURRENT_VERSION = 11;

const testData: TestDataItem[] = [
  // Version 1
  {
    aamvaVersion: 1,
    barcodeString:
      "@\n\x1e\rANSI 6360000102DL00390187ZV02260032DLDAQ0123456789ABC\n" +
      "DAAPUBLIC,JOHN,Q\nDAG123 MAIN STREET\nDAIANYTOWN\nDAJVA\n" +
      "DAK123459999  \nDARDM  \nDAS          \nDAT     \nDAU509\nDAW175\n" +
      "DAYBL \nDAZBR \nDBA20011201\nDBB19761123\nDBCM\nDBD19961201\r" +
      "ZVZVAJURISDICTIONDEFINEDELEMENT\r",
    header: {
      issuerId: 636000,
      aamvaVersion: 1,
      jurisdictionVersion: 0,
      numberOfEntries: 2,
    },
    designators: [
      {
        subfileType: "DL",
        offset: 39,
        length: 187,
      },
      {
        subfileType: "ZV",
        offset: 226,
        length: 32,
      },
    ],
    subfiles: [
      {
        subfileType: "DL",
        elements: {
          DAQ: "0123456789ABC",
          DAA: "PUBLIC,JOHN,Q",
          DAG: "123 MAIN STREET",
          DAI: "ANYTOWN",
          DAJ: "VA",
          DAK: "123459999  ",
          DAR: "DM  ",
          DAS: "          ",
          DAT: "     ",
          DAU: "509",
          DAW: "175",
          DAY: "BL ",
          DAZ: "BR ",
          DBA: "20011201",
          DBB: "19761123",
          DBC: "M",
          DBD: "19961201",
        },
      },
      {
        subfileType: "ZV",
        elements: { ZVA: "JURISDICTIONDEFINEDELEMENT" },
      },
    ],
  },
  // Version 4
  {
    aamvaVersion: 4,
    barcodeString:
      "@\n\x1e\rANSI 636000040002DL00410278ZV03190008DLDAQT64235789\n" +
      "DCSSAMPLE\nDDEN\nDACMICHAEL\nDDFN\nDADJOHN\nDDGN\nDCUJR\nDCAD\n" +
      "DCBK\nDCDPH\nDBD06062008\nDBB06061986\nDBA12102012\nDBC1\n" +
      "DAU068 in\nDAYBRO\nDAG2300 WEST BROAD STREET\nDAIRICHMOND\n" +
      "DAJVA\nDAK232690000  \nDCF2424244747474786102204\nDCGUSA\n" +
      "DCK123456789\nDDAM\nDDB06062008\nDDC06062009\nDDD1\rZVZVA01\r",
    header: {
      issuerId: 636000,
      aamvaVersion: 4,
      jurisdictionVersion: 0,
      numberOfEntries: 2,
    },
    designators: [
      {
        subfileType: "DL",
        offset: 41,
        length: 278,
      },
      {
        subfileType: "ZV",
        offset: 319,
        length: 8,
      },
    ],
    subfiles: [
      {
        subfileType: "DL",
        elements: {
          DAQ: "T64235789",
          DCS: "SAMPLE",
          DDE: "N",
          DAC: "MICHAEL",
          DDF: "N",
          DAD: "JOHN",
          DDG: "N",
          DCU: "JR",
          DCA: "D",
          DCB: "K",
          DCD: "PH",
          DBD: "06062008",
          DBB: "06061986",
          DBA: "12102012",
          DBC: "1",
          DAU: "068 in",
          DAY: "BRO",
          DAG: "2300 WEST BROAD STREET",
          DAI: "RICHMOND",
          DAJ: "VA",
          DAK: "232690000  ",
          DCF: "2424244747474786102204",
          DCG: "USA",
          DCK: "123456789",
          DDA: "M",
          DDB: "06062008",
          DDC: "06062009",
          DDD: "1",
        },
      },
      {
        subfileType: "ZV",
        elements: { ZVA: "01" },
      },
    ],
  },
  // Version 10
  {
    aamvaVersion: 10,
    barcodeString:
      "@\n\x1e\rANSI 636000100102DL00410278ZV03190008DLDAQT64235789\n" +
      "DCSSAMPLE\nDDEN\nDACMICHAEL\nDDFN\nDADJOHN\nDDGN\nDCUJR\nDCAD\n" +
      "DCBK\nDCDPH\nDBD06062019\nDBB06061986\nDBA12102024\nDBC1\n" +
      "DAU068 in\nDAYBRO\nDAG2300 WEST BROAD STREET\nDAIRICHMOND\nDAJVA\n" +
      "DAK232690000  \nDCF2424244747474786102204\nDCGUSA\nDCK123456789\n" +
      "DDAF\nDDB06062018\nDDC06062020\nDDD1\rZVZVA01\r",
    header: {
      issuerId: 636000,
      aamvaVersion: 10,
      jurisdictionVersion: 1,
      numberOfEntries: 2,
    },
    designators: [
      {
        subfileType: "DL",
        offset: 41,
        length: 278,
      },
      {
        subfileType: "ZV",
        offset: 319,
        length: 8,
      },
    ],
    subfiles: [
      {
        subfileType: "DL",
        elements: {
          DAQ: "T64235789",
          DCS: "SAMPLE",
          DDE: "N",
          DAC: "MICHAEL",
          DDF: "N",
          DAD: "JOHN",
          DDG: "N",
          DCU: "JR",
          DCA: "D",
          DCB: "K",
          DCD: "PH",
          DBD: "06062019",
          DBB: "06061986",
          DBA: "12102024",
          DBC: "1",
          DAU: "068 in",
          DAY: "BRO",
          DAG: "2300 WEST BROAD STREET",
          DAI: "RICHMOND",
          DAJ: "VA",
          DAK: "232690000  ",
          DCF: "2424244747474786102204",
          DCG: "USA",
          DCK: "123456789",
          DDA: "F",
          DDB: "06062018",
          DDC: "06062020",
          DDD: "1",
        },
      },
      {
        subfileType: "ZV",
        elements: { ZVA: "01" },
      },
    ],
  },
];

describe("Test the headerLength() function", () => {
  test("can return 19 for version 1", () => {
    expect(headerLength(1)).toBe(19);
    expect(headerLength(1)).not.toBe(21);
  });

  test.each([...Array(CURRENT_VERSION + 1).keys()].filter((i) => i > 1))(
    "can return 21 for version %i",
    (aamvaVersion) => {
      expect(headerLength(aamvaVersion)).toBe(21);
      expect(headerLength(aamvaVersion)).not.toBe(19);
    },
  );

  test("throws an error when version is not a integer", () => {
    expect(() => headerLength(1.1)).toThrow("aamvaVersion must be an integer");
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => headerLength("1")).toThrow("aamvaVersion must be an integer");
  });

  test("throws an error when version is out of range", () => {
    expect(() => headerLength(0)).toThrow(
      "aamvaVersion is out of range (1-99)",
    );
    expect(() => headerLength(100)).toThrow(
      "aamvaVersion is out of range (1-99)",
    );
  });
});

describe("Test the parseFileHeader() function", () => {
  test("throws an error when header length is too short", () => {
    expect(() => parseFileHeader("@\n\x1e\rANSI 6360000")).toThrow(
      "Header length is too short",
    );
  });

  test("throws an error when header is missing compliance indicator", () => {
    expect(() => parseFileHeader("\n\x1e\rANSI 6360000102")).toThrow(
      "Header is missing compliance indicator",
    );
  });

  test("throws an error when header is missing data element separator", () => {
    expect(() => parseFileHeader("@\x1e\rANSI 6360000102")).toThrow(
      "Header is missing data element separator",
    );
  });

  test("throws an error when header is missing record separator", () => {
    expect(() => parseFileHeader("@\n\rANSI 6360000102")).toThrow(
      "Header is missing record separator",
    );
  });

  test("throws an error when header is missing segment terminator", () => {
    expect(() => parseFileHeader("@\n\x1eANSI 6360000102")).toThrow(
      "Header is missing segment terminator",
    );
  });

  test("throws an error when header is missing file type", () => {
    expect(() => parseFileHeader("@\n\x1e\r6360000102DL0")).toThrow(
      "Header is missing file type",
    );
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
      expect(() => parseFileHeader(badString)).toThrow(
        "Header length is too short for version",
      );
    },
  );

  test.each(testData)(
    "can parse a version $aamvaVersion header",
    ({ barcodeString, header }) => {
      expect(parseFileHeader(barcodeString)).toEqual(header);
    },
  );
});

describe("Test the parseSubfileDesignator() function", () => {
  test.each([
    [1, 0, "@\n\x1e\rANSI 6360000102DL0039018"],
    [1, 1, "@\n\x1e\rANSI 6360000102DL00390187ZV0226003"],
    [10, 0, "@\n\x1e\rANSI 636000100102DL0041027"],
    [10, 1, "@\n\x1e\rANSI 636000100102DL00410278ZV0319000"],
  ])(
    "throws an error when subfile designator is too short (version: %i, index: %i)",
    (aamvaVersion, designatorIndex, barcodeString) => {
      expect(() =>
        parseSubfileDesignator(barcodeString, aamvaVersion, designatorIndex),
      ).toThrow("Subfile designator is too short");
    },
  );

  test.each(
    testData.flatMap((testItem) => {
      return testItem.designators.map((designator, index) => {
        return [
          testItem.aamvaVersion,
          index,
          testItem.barcodeString,
          designator,
        ];
      });
    }),
  )(
    "can parse subfile designator (version: %i, index: %i)",
    (aamvaVersion, index, barcodeString, designator) => {
      expect(
        parseSubfileDesignator(
          barcodeString as string,
          aamvaVersion as number,
          index as number,
        ),
      ).toEqual(designator);
    },
  );
});

describe("Test the parseSubfile() function", () => {
  test("throws an error when subfile length is too short", () => {
    expect(() =>
      parseSubfile(
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
      parseSubfile(
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
      parseSubfile(
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
    testData.flatMap((testItem) => {
      return testItem.subfiles.map((subfile, index) => {
        return [
          testItem.aamvaVersion,
          index,
          testItem.barcodeString,
          testItem.designators[index],
          subfile,
        ];
      });
    }),
  )(
    "can parse subfile (version: %i, index: %i)",
    (_, __, barcodeString, designator, subfile) => {
      expect(
        parseSubfile(barcodeString as string, designator as SubfileDesignator),
      ).toEqual(subfile);
    },
  );
});

describe("Test the parseBarcodeString() function", () => {
  test("throws an error when barcodeString is not a string", () => {
    // @ts-expect-error Missing argument
    expect(() => parseBarcodeString()).toThrow(
      "barcodeString must be a string",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => parseBarcodeString(undefined)).toThrow(
      "barcodeString must be a string",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => parseBarcodeString(2)).toThrow(
      "barcodeString must be a string",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => parseBarcodeString([])).toThrow(
      "barcodeString must be a string",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => parseBarcodeString({})).toThrow(
      "barcodeString must be a string",
    );
    // @ts-expect-error Argument type is not assignable to parameter type
    expect(() => parseBarcodeString(null)).toThrow(
      "barcodeString must be a string",
    );
  });

  test("throws an error when number of entries is less than 1", () => {
    // Version 1
    expect(() => parseBarcodeString("@\n\x1e\rANSI 6360000100")).toThrow(
      "Number of entries cannot be less than 1",
    );
    // Version 10
    expect(() => parseBarcodeString("@\n\x1e\rANSI 636000100100")).toThrow(
      "Number of entries cannot be less than 1",
    );
  });

  test.each(testData)(
    "can parse barcodeString (version: $aamvaVersion)",
    ({ barcodeString, header, subfiles }) => {
      expect(parseBarcodeString(barcodeString)).toEqual({
        header,
        subfiles,
      } as BarcodeFile);
    },
  );
});

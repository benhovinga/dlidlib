export type AAMVAVersion = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface FileHeader {
  issuerId: number;
  aamvaVersion: AAMVAVersion;
  jurisdictionVersion: number;
  numberOfEntries: number;
}

export interface SubfileDesignator {
  subfileType: string;
  offset: number;
  length: number;
}

export interface Subfile {
  subfileType: string;
  elements: Record<string, string>;
}

class BarcodeFile {
  public static readonly CURRENT_AAMVA_VERSION = 11;

  protected static readonly _COMPLIANCE_INDICATOR = "\x40"; // Commercial At Sign (“@”) (ASCII/ISO 646 Decimal “64”) (ASCII/ISO 646 Hex “40”)
  protected static readonly _DATA_ELEMENT_SEPARATOR = "\x0a"; // Line Feed character (“LF” ASCII/ISO 646 Decimal “10”) (ASCII/ISO 646 Hex “0A”)
  protected static readonly _RECORD_SEPARATOR = "\x1e"; // Record Separator character (“RS” ASCII/ISO 646 Decimal “30”) (ASCII/ISO 646 Hex “1E”)
  protected static readonly _SEGMENT_TERMINATOR = "\x0D"; // Carriage Return character (“CR” ASCII/ISO 646 Decimal “13”) (ASCII/ISO 646 Hex “0D”)
  protected static readonly _FILE_TYPE = "ANSI "; // AAMVA compliant format

  public header: FileHeader;
  public subfiles: Subfile[];

  public constructor({ header, subfiles }: BarcodeFile) {
    this.header = header;
    this.subfiles = subfiles;
  }

  /**
   * Parses a barcode byte string message into a BarcodeFile object.
   *
   * @param barcodeStr - A byte string style message from a barcode scanner
   * @returns a new BarcodeFile object
   */
  public static parse(barcodeStr: string): BarcodeFile {
    if (typeof barcodeStr !== "string")
      throw new TypeError("Argument 'barcodeString' must be of type 'string'.");

    const header = BarcodeFile._parseFileHeader(barcodeStr);

    if (header.numberOfEntries < 1)
      throw new Error("Number of entries cannot be less than 1");

    const subfiles = [];
    for (let i = 0; i < header.numberOfEntries; i++) {
      const designator = BarcodeFile._parseSubfileDesignator(
        barcodeStr,
        header.aamvaVersion,
        i,
      );
      const subfile = BarcodeFile._parseSubfile(barcodeStr, designator);
      subfiles.push(subfile);
    }

    return new BarcodeFile({ header, subfiles });
  }

  protected static _headerLength(aamvaVersion: AAMVAVersion): 19 | 21 {
    if (typeof aamvaVersion !== "number" || !Number.isInteger(aamvaVersion))
      throw new TypeError("Argument 'aamvaVersion' must be an integer.");
    else if (
      aamvaVersion < 1 ||
      aamvaVersion > BarcodeFile.CURRENT_AAMVA_VERSION
    )
      throw new RangeError(
        `Argument 'aamvaVersion' must is out of range (1-${BarcodeFile.CURRENT_AAMVA_VERSION}).`,
      );
    return aamvaVersion === 1 ? 19 : 21;
  }

  protected static _parseFileHeader(barcodeStr: string): FileHeader {
    const MIN_LENGTH = 17;

    if (barcodeStr.length < MIN_LENGTH)
      throw new Error("Header length is too short");
    else if (barcodeStr[0] !== BarcodeFile._COMPLIANCE_INDICATOR)
      throw new Error("Header is missing compliance indicator");
    else if (barcodeStr[1] !== BarcodeFile._DATA_ELEMENT_SEPARATOR)
      throw new Error("Header is missing data element separator");
    else if (barcodeStr[2] !== BarcodeFile._RECORD_SEPARATOR)
      throw new Error("Header is missing record separator");
    else if (barcodeStr[3] !== BarcodeFile._SEGMENT_TERMINATOR)
      throw new Error("Header is missing segment terminator");
    else if (barcodeStr.slice(4, 9) !== BarcodeFile._FILE_TYPE)
      throw new Error("Header is missing file type");

    const aamvaVersion = Number.parseInt(
      barcodeStr.slice(15, 17),
    ) as AAMVAVersion;

    if (barcodeStr.length < BarcodeFile._headerLength(aamvaVersion))
      throw new Error("Header length is too short for version");

    const issuerId = Number.parseInt(barcodeStr.slice(9, 15));
    const numberOfEntries = Number.parseInt(
      aamvaVersion < 2 ? barcodeStr.slice(17, 19) : barcodeStr.slice(19, 21),
    );
    const jurisdictionVersion =
      aamvaVersion < 2 ? 0 : Number.parseInt(barcodeStr.slice(17, 19));

    return {
      issuerId,
      aamvaVersion,
      numberOfEntries,
      jurisdictionVersion,
    } as FileHeader;
  }

  protected static _parseSubfileDesignator(
    barcodeStr: string,
    aamvaVersion: AAMVAVersion,
    designatorIndex: number,
  ): SubfileDesignator {
    const DESIGNATOR_LENGTH = 10;

    const cursor =
      designatorIndex * DESIGNATOR_LENGTH +
      BarcodeFile._headerLength(aamvaVersion);

    if (barcodeStr.length < cursor + DESIGNATOR_LENGTH)
      throw new Error("Subfile designator is too short");

    const subfileType = barcodeStr.slice(cursor, cursor + 2);
    const offset = Number.parseInt(barcodeStr.slice(cursor + 2, cursor + 6));
    const length = Number.parseInt(barcodeStr.slice(cursor + 6, cursor + 10));

    return {
      subfileType,
      offset,
      length,
    } as SubfileDesignator;
  }

  protected static _parseSubfile(
    barcodeStr: string,
    designator: SubfileDesignator,
  ): Subfile {
    const { subfileType, offset, length } = designator;
    const endOffset = offset + length;

    if (barcodeStr.length < endOffset)
      throw new Error("Subfile length is too short");
    else if (barcodeStr.slice(offset, offset + 2) != subfileType)
      throw new Error("Subfile is missing subfile type");
    else if (barcodeStr[endOffset - 1] != BarcodeFile._SEGMENT_TERMINATOR) {
      throw new Error("Subfile is missing segment terminator");
    }

    const items = barcodeStr
      .slice(offset + 2, endOffset - 1)
      .split(BarcodeFile._DATA_ELEMENT_SEPARATOR);

    const elements = items.reduce(
      (obj, item) => {
        const key = item.slice(0, 3);
        const value = item.slice(3);
        return {
          ...obj,
          [key]: value,
        };
      },
      {} as Record<string, string>,
    );

    return {
      subfileType,
      elements,
    } as Subfile;
  }
}

export default BarcodeFile;

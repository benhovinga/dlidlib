export interface FileHeader {
  issuerId: number;
  aamvaVersion: number;
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

export interface BarcodeFile {
  header: FileHeader;
  subfiles: Subfile[];
}

const COMPLIANCE_INDICATOR = "@";
const DATA_ELEMENT_SEPARATOR = "\n";
const RECORD_SEPARATOR = "\x1e";
const SEGMENT_TERMINATOR = "\r";
const FILE_TYPE = "ANSI ";

export function trimBefore(char: string, str: string): string {
  if (typeof char !== "string" || typeof str !== "string")
    throw new TypeError("Inputs must be string type");
  const index = str.indexOf(char);
  return str.slice(index >= 0 ? index : 0);
}

export function headerLength(aamvaVersion: number): 19 | 21 {
  if (typeof aamvaVersion !== "number" || !Number.isInteger(aamvaVersion))
    throw new TypeError("aamvaVersion must be an integer");
  else if (aamvaVersion < 1 || aamvaVersion > 99)
    throw new RangeError("aamvaVersion is out of range (1-99)");
  return aamvaVersion === 1 ? 19 : 21;
}

export function parseFileHeader(barcodeString: string): FileHeader {
  const MIN_LENGTH = 17;

  if (barcodeString.length < MIN_LENGTH)
    throw new Error("Header length is too short");
  else if (barcodeString[0] !== COMPLIANCE_INDICATOR)
    throw new Error("Header is missing compliance indicator");
  else if (barcodeString[1] !== DATA_ELEMENT_SEPARATOR)
    throw new Error("Header is missing data element separator");
  else if (barcodeString[2] !== RECORD_SEPARATOR)
    throw new Error("Header is missing record separator");
  else if (barcodeString[3] !== SEGMENT_TERMINATOR)
    throw new Error("Header is missing segment terminator");
  else if (barcodeString.slice(4, 9) !== FILE_TYPE)
    throw new Error("Header is missing file type");

  const aamvaVersion = Number.parseInt(barcodeString.slice(15, 17));

  if (barcodeString.length < headerLength(aamvaVersion))
    throw new Error("Header length is too short for version");

  const issuerId = Number.parseInt(barcodeString.slice(9, 15));
  const numberOfEntries = Number.parseInt(
    aamvaVersion < 2
      ? barcodeString.slice(17, 19)
      : barcodeString.slice(19, 21),
  );
  const jurisdictionVersion =
    aamvaVersion < 2 ? 0 : Number.parseInt(barcodeString.slice(17, 19));

  return {
    issuerId,
    aamvaVersion,
    numberOfEntries,
    jurisdictionVersion,
  } as FileHeader;
}

export function parseSubfileDesignator(
  barcodeString: string,
  aamvaVersion: number,
  designatorIndex: number,
): SubfileDesignator {
  const DESIGNATOR_LENGTH = 10;

  const cursor =
    designatorIndex * DESIGNATOR_LENGTH + headerLength(aamvaVersion);

  if (barcodeString.length < cursor + DESIGNATOR_LENGTH)
    throw new Error("Subfile designator is too short");

  const subfileType = barcodeString.slice(cursor, cursor + 2);
  const offset = Number.parseInt(barcodeString.slice(cursor + 2, cursor + 6));
  const length = Number.parseInt(barcodeString.slice(cursor + 6, cursor + 10));

  return {
    subfileType,
    offset,
    length,
  } as SubfileDesignator;
}

export function parseSubfile(
  barcodeString: string,
  designator: SubfileDesignator,
): Subfile {
  const { subfileType, offset, length } = designator;
  const endOffset = offset + length;

  if (barcodeString.length < endOffset)
    throw new Error("Subfile length is too short");
  else if (barcodeString.slice(offset, offset + 2) != subfileType)
    throw new Error("Subfile is missing subfile type");
  else if (barcodeString[endOffset - 1] != SEGMENT_TERMINATOR) {
    throw new Error("Subfile is missing segment terminator");
  }

  const items = barcodeString
    .slice(offset + 2, endOffset - 1)
    .split(DATA_ELEMENT_SEPARATOR);

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

export function parseBarcodeString(barcodeString: string): BarcodeFile {
  if (typeof barcodeString !== "string")
    throw new TypeError("barcodeString must be a string");

  barcodeString = trimBefore(COMPLIANCE_INDICATOR, barcodeString);

  const header: FileHeader = parseFileHeader(barcodeString);
  if (header.numberOfEntries < 1)
    throw new Error("Number of entries cannot be less than 1");

  const subfiles: Subfile[] = [];
  for (let i = 0; i < header.numberOfEntries; i++) {
    const designator = parseSubfileDesignator(
      barcodeString,
      header.aamvaVersion,
      i,
    );
    const subfile = parseSubfile(barcodeString, designator);
    subfiles.push(subfile);
  }

  return { header, subfiles } as BarcodeFile;
}

import type BarcodeFile from "./barcode";

type CardType = "DL" | "ID";

interface Address {
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  jurisdictionCode: string;
  postalCode: string;
}

class Profile {
  protected static _CARD_TYPES: CardType[] = ["DL", "ID"];
  protected _cardType: CardType;

  firstName: string;
  middleNames?: string;
  lastName: string;
  address: Address;

  constructor(file: BarcodeFile) {
    if (typeof file !== "object")
      throw new TypeError("Argument 'file' must be an object.");

    const batchErrors = [];
    if (!Object.hasOwn(file, "header"))
      batchErrors.push(
        new TypeError("Argument 'file' is missing property 'header'"),
      );
    if (!Object.hasOwn(file, "subfiles"))
      batchErrors.push(
        new TypeError("Argument 'file' is missing property 'subfiles'"),
      );
    if (batchErrors.length > 0)
      throw new AggregateError(batchErrors, "Invalid file format");

    if (
      !file.subfiles.some((subfile) =>
        Profile._CARD_TYPES.includes(subfile.subfileType as CardType),
      )
    )
      throw new Error("No valid subfiles found.");
  }
}

export default Profile;

import IssuingAuthority from "./issuing-authority";

import type BarcodeFile from "./barcode";
import { type Subfile } from "./barcode";
import { getDateParser, type DateParserFn } from "./dates";

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
  protected _aamvaVersion: number;
  protected _issuingAuthority?: IssuingAuthority;
  protected _cardType: CardType;
  protected _dateParser: DateParserFn;

  firstName: string;
  middleNames?: string;
  lastName: string;
  address: Address;
  country: string;

  constructor(file: BarcodeFile) {
    if (typeof file !== "object")
      throw new TypeError("Argument 'file' must be an object.");

    this._aamvaVersion = file.header.aamvaVersion;
    if (this._aamvaVersion < 2) throw new Error("Not Implemented."); // Version 1 currently not supported

    this._issuingAuthority = IssuingAuthority.getAuthorityById(
      file.header.issuerId,
    );

    // Require at least one subfile with the subfile type of DL or ID.
    const primarySubfile: Subfile = file.subfiles.filter((subfile) =>
      Profile._CARD_TYPES.includes(subfile.subfileType as CardType),
    )[0];
    if (typeof primarySubfile === "undefined")
      throw new Error("No valid subfiles found.");

    this._cardType = primarySubfile.subfileType as CardType;

    if (primarySubfile.elements["DCG"]) {
      this.country = primarySubfile.elements["DCG"];
      delete primarySubfile.elements["DCG"];
    } else if (this._issuingAuthority?.country) {
      this.country = this._issuingAuthority?.country;
    } else {
      throw new Error("Unable to determine country.");
    }

    this._dateParser = getDateParser(this._aamvaVersion, this.country);
  }
}

export default Profile;

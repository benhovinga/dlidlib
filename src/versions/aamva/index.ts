import { type CountryCode } from "@/authority";
import { getDateParser, type DateParts, type DateParserFn } from "@/dates";

export type AAMVAVersion = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const CURRENT_AAMVA_VERSION: AAMVAVersion = 11;

export interface Field<T = string | number | boolean | DateParts> {
  /** Field Name */
  name: string;
  /** Field Description */
  description: string;
  /** Is this field required to be present on the card */
  isRequired?: boolean;
  /** Does this field only apply to DL cards */
  isDriver?: boolean;
  /** Parse the field value */
  parse(value: string): T;
}

export type CardType = "DL" | "ID";

export abstract class BaseAAMVAVersion {
  protected _version: AAMVAVersion;
  protected _country: CountryCode;
  protected _cardType: CardType;
  protected _dateParser: DateParserFn;

  constructor(version: AAMVAVersion, cardType: CardType, country: CountryCode) {
    this._version = version;
    this._cardType = cardType;
    this._country = country;
    this._dateParser = getDateParser(this._version, this._country);
  }

  protected _parseString(value: string): string {
    return value.trim();
  }

  protected _parseNumber(value: string): number {
    return Number.parseInt(value);
  }

  protected _parseDate(value: string): DateParts {
    return this._dateParser(value);
  }

  protected _parseBoolean(value: string): boolean {
    if (value === "1") return true;
    else if (value === "0") return false;
    else throw Error("Unknown boolean value");
  }
}

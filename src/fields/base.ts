import { type CountryCode } from "@/authority";
import { getDateParser, type DateParts, type DateParserFn } from "@/dates";
import { type AAMVAVersion } from "@/config";

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

export abstract class FieldsBase {
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

  protected _parseString = (value: string): string => {
    return value.trim();
  };

  protected _parseNumber = (value: string): number => {
    return Number.parseInt(value);
  };

  protected _parseDate = (value: string): DateParts => {
    return this._dateParser(value);
  };

  protected _parseBoolean = (value: string): boolean => {
    if (value === "1") return true;
    else if (value === "0") return false;
    else throw Error("Unknown boolean value");
  };

  getElements(): string[] {
    return Object.keys(this).filter((key) => key[0] !== "_");
  }

  getRequiredElements(): string[] {
    return (Object.entries(this) as [string, Field][])
      .filter((entry) => entry[1].isRequired)
      .map((entry) => entry[0]);
  }

  getOptionalElements(): string[] {
    const required = this.getRequiredElements();
    return this.getElements().filter((element) => !required.includes(element));
  }
}

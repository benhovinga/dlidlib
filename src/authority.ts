export type CountryCode = "CAN" | "MEX" | "USA";

export type JurisdictionCode =
  | "AB"
  | "AK"
  | "AL"
  | "AR"
  | "AS"
  | "AZ"
  | "BC"
  | "CA"
  | "CT"
  | "CU"
  | "DC"
  | "DE"
  | "FL"
  | "GA"
  | "GM"
  | "GU"
  | "HI"
  | "HL"
  | "IA"
  | "ID"
  | "IL"
  | "IN"
  | "KS"
  | "KY"
  | "LA"
  | "MA"
  | "MB"
  | "MD"
  | "ME"
  | "MI"
  | "MN"
  | "MO"
  | "MP"
  | "MS"
  | "MT"
  | "NB"
  | "NC"
  | "ND"
  | "NE"
  | "NF"
  | "NH"
  | "NJ"
  | "NM"
  | "NS"
  | "NT"
  | "NU"
  | "NV"
  | "NY"
  | "OH"
  | "OK"
  | "ON"
  | "OR"
  | "PA"
  | "PE"
  | "PR"
  | "QC"
  | "RI"
  | "SC"
  | "SD"
  | "SK"
  | "TN"
  | "TX"
  | "UT"
  | "VA"
  | "VI"
  | "VT"
  | "WA"
  | "WI"
  | "WV"
  | "WY"
  | "YT";

class IssuingAuthority {
  // Countries have been shortened to 3 characters in order to match subfile element DCG: Country Identification
  static readonly COUNTRIES: readonly CountryCode[] = Object.freeze([
    "CAN",
    "MEX",
    "USA",
  ]);

  static readonly AUTHORITIES: readonly IssuingAuthority[] = Object.freeze([
    new IssuingAuthority(604426, "Prince Edward Island", "PE", "CAN"),
    new IssuingAuthority(604427, "American Samoa", "AS", "USA"),
    new IssuingAuthority(604428, "Quebec", "QC", "CAN"),
    new IssuingAuthority(604429, "Yukon", "YT", "CAN"),
    new IssuingAuthority(604430, "Norther Marianna Islands", "MP", "USA"),
    new IssuingAuthority(604431, "Puerto Rico", "PR", "USA"),
    new IssuingAuthority(604432, "Alberta", "AB", "CAN"),
    new IssuingAuthority(604433, "Nunavut", "NU", "CAN"),
    new IssuingAuthority(604434, "Northwest Territories", "NT", "CAN"),
    new IssuingAuthority(636000, "Virginia", "VA", "USA"),
    new IssuingAuthority(636001, "New York", "NY", "USA"),
    new IssuingAuthority(636002, "Massachusetts", "MA", "USA"),
    new IssuingAuthority(636003, "Maryland", "MD", "USA"),
    new IssuingAuthority(636004, "North Carolina", "NC", "USA"),
    new IssuingAuthority(636005, "South Carolina", "SC", "USA"),
    new IssuingAuthority(636006, "Connecticut", "CT", "USA"),
    new IssuingAuthority(636007, "Louisiana", "LA", "USA"),
    new IssuingAuthority(636008, "Montana", "MT", "USA"),
    new IssuingAuthority(636009, "New Mexico", "NM", "USA"),
    new IssuingAuthority(636010, "Florida", "FL", "USA"),
    new IssuingAuthority(636011, "Delaware", "DE", "USA"),
    new IssuingAuthority(636012, "Ontario", "ON", "CAN"),
    new IssuingAuthority(636013, "Nova Scotia", "NS", "CAN"),
    new IssuingAuthority(636014, "California", "CA", "USA"),
    new IssuingAuthority(636015, "Texas", "TX", "USA"),
    new IssuingAuthority(636016, "Newfoundland", "NF", "CAN"),
    new IssuingAuthority(636017, "New Brunswick", "NB", "CAN"),
    new IssuingAuthority(636018, "Iowa", "IA", "USA"),
    new IssuingAuthority(636019, "Guam", "GU", "USA"),
    new IssuingAuthority(636020, "Colorado", "GM", "USA"),
    new IssuingAuthority(636021, "Arkansas", "AR", "USA"),
    new IssuingAuthority(636022, "Kansas", "KS", "USA"),
    new IssuingAuthority(636023, "Ohio", "OH", "USA"),
    new IssuingAuthority(636024, "Vermont", "VT", "USA"),
    new IssuingAuthority(636025, "Pennsylvania", "PA", "USA"),
    new IssuingAuthority(636026, "Arizona", "AZ", "USA"),
    new IssuingAuthority(636027, "State Dept. (Diplomatic)", null, "USA"),
    new IssuingAuthority(636028, "British Columbia", "BC", "CAN"),
    new IssuingAuthority(636029, "Oregon", "OR", "USA"),
    new IssuingAuthority(636030, "Missouri", "MO", "USA"),
    new IssuingAuthority(636031, "Wisconsin", "WI", "USA"),
    new IssuingAuthority(636032, "Michigan", "MI", "USA"),
    new IssuingAuthority(636033, "Alabama", "AL", "USA"),
    new IssuingAuthority(636034, "North Dakota", "ND", "USA"),
    new IssuingAuthority(636035, "Illinois", "IL", "USA"),
    new IssuingAuthority(636036, "New Jersey", "NJ", "USA"),
    new IssuingAuthority(636037, "Indiana", "IN", "USA"),
    new IssuingAuthority(636038, "Minnesota", "MN", "USA"),
    new IssuingAuthority(636039, "New Hampshire", "NH", "USA"),
    new IssuingAuthority(636040, "Utah", "UT", "USA"),
    new IssuingAuthority(636041, "Maine", "ME", "USA"),
    new IssuingAuthority(636042, "South Dakota", "SD", "USA"),
    new IssuingAuthority(636043, "District of Columbia", "DC", "USA"),
    new IssuingAuthority(636044, "Saskatchewan", "SK", "CAN"),
    new IssuingAuthority(636045, "Washington", "WA", "USA"),
    new IssuingAuthority(636046, "Kentucky", "KY", "USA"),
    new IssuingAuthority(636047, "Hawaii", "HI", "USA"),
    new IssuingAuthority(636048, "Manitoba", "MB", "CAN"),
    new IssuingAuthority(636049, "Nevada", "NV", "USA"),
    new IssuingAuthority(636050, "Idaho", "ID", "USA"),
    new IssuingAuthority(636051, "Mississippi", "MS", "USA"),
    new IssuingAuthority(636052, "Rhode Island", "RI", "USA"),
    new IssuingAuthority(636053, "Tennessee", "TN", "USA"),
    new IssuingAuthority(636054, "Nebraska", "NE", "USA"),
    new IssuingAuthority(636055, "Georgia", "GA", "USA"),
    new IssuingAuthority(636056, "Coahuila", "CU", "MEX"),
    new IssuingAuthority(636057, "Hidalgo", "HL", "MEX"),
    new IssuingAuthority(636058, "Oklahoma", "OK", "USA"),
    new IssuingAuthority(636059, "Alaska", "AK", "USA"),
    new IssuingAuthority(636060, "Wyoming", "WY", "USA"),
    new IssuingAuthority(636061, "West Virginia", "WV", "USA"),
    new IssuingAuthority(636062, "Virgin Islands", "VI", "USA"),
  ]);

  readonly issuerId: number;
  readonly jurisdiction: string;
  readonly jurisdictionCode: JurisdictionCode | null;
  readonly countryCode: CountryCode;

  constructor(
    issuerId: number,
    jurisdiction: string,
    jurisdictionCode: JurisdictionCode | null,
    countryCode: CountryCode,
  ) {
    this.issuerId = issuerId;
    this.jurisdiction = jurisdiction;
    this.jurisdictionCode = jurisdictionCode;
    this.countryCode = countryCode;
    Object.freeze(this);
  }

  static getAuthorityById(issuerId: number): IssuingAuthority | undefined {
    return this.AUTHORITIES.filter(
      (authority) => authority.issuerId === issuerId,
    )[0];
  }
}

export default IssuingAuthority;

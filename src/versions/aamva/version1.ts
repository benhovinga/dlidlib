import { BaseAAMVAVersion, type CardType, type Field } from ".";
import { type CountryCode } from "@/authority";
import { type DateParts } from "@/dates";

/** AAMVA DL/ID Version 1 Fields */
class AAMVAVersion1 extends BaseAAMVAVersion {
  constructor(
    cardType: Extract<CardType, "DL"> = "DL",
    country: Extract<CountryCode, "USA"> = "USA",
  ) {
    if (cardType !== "DL") throw new Error("Version 1 cardType must be 'DL'.");
    if (country !== "USA") throw new Error("Version 1 country must be 'USA'.");
    super(1, cardType, country);
  }

  DAA: Field<string> = {
    name: "driverLicenseName",
    description: "Driver License Name",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAB: Field<string> = {
    name: "driverLastName",
    description: "Driver Last Name",
    isDriver: true,
    parse: this._parseString,
  };

  DAC: Field<string> = {
    name: "driverFirstName",
    description: "Driver First Name",
    isDriver: true,
    parse: this._parseString,
  };

  DAD: Field<string> = {
    name: "driverMiddleName",
    description: "Driver Middle Name or Initial",
    isDriver: true,
    parse: this._parseString,
  };

  DAE: Field<string> = {
    name: "driverNameSuffix",
    description: "Driver Name Suffix",
    isDriver: true,
    parse: this._parseString,
  };

  DAF: Field<string> = {
    name: "driverNamePrefix",
    description: "Driver Name Prefix",
    isDriver: true,
    parse: this._parseString,
  };

  DAG: Field<string> = {
    name: "driverMailingStreetAddress1",
    description: "Driver Mailing Street Address 1",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAH: Field<string> = {
    name: "driverMailingStreetAddress2",
    description: "Driver Mailing Street Address 2",
    isDriver: true,
    parse: this._parseString,
  };

  DAI: Field<string> = {
    name: "driverMailingCity",
    description: "Driver Mailing City",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAJ: Field<string> = {
    name: "driverMailingJurisdictionCode",
    description: "Driver Mailing Jurisdiction Code",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAK: Field<string> = {
    name: "driverMailingPostalCode",
    description: "Driver Mailing Postal Code",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAL: Field<string> = {
    name: "driverResidenceStreetAddress1",
    description: "Driver Residence Street Address 1",
    isDriver: true,
    parse: this._parseString,
  };

  DAM: Field<string> = {
    name: "driverResidenceStreetAddress2",
    description: "Driver Residence Street Address 2",
    isDriver: true,
    parse: this._parseString,
  };

  DAN: Field<string> = {
    name: "driverResidenceCity",
    description: "Driver Residence City",
    isDriver: true,
    parse: this._parseString,
  };

  DAO: Field<string> = {
    name: "driverResidenceJurisdictionCode",
    description: "Driver Residence Jurisdiction Code",
    isDriver: true,
    parse: this._parseString,
  };

  DAP: Field<string> = {
    name: "driverResidencePostalCode",
    description: "Driver Residence Postal Code",
    isDriver: true,
    parse: this._parseString,
  };

  DAQ: Field<string> = {
    name: "driverLicenseIdNumber",
    description: "Driver License/ID Number",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAR: Field<string> = {
    name: "driverLicenseClassificationCode",
    description: "Driver License Classification Code",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAS: Field<string> = {
    name: "driverLicenseRestrictionCode",
    description: "Driver License Restriction Code",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAT: Field<string> = {
    name: "driverLicenseEndorsementsCode",
    description: "Driver License Endorsements Code",
    isRequired: true,
    isDriver: true,
    parse: this._parseString,
  };

  DAU: Field<string> = {
    name: "heightFtIn",
    description: "Height (FT/IN)",
    isDriver: true,
    parse: this._parseString,
  };

  DAV: Field<string> = {
    name: "heightCm",
    description: "Height (CM)",
    isDriver: true,
    parse: this._parseString,
  };

  DAW: Field<string> = {
    name: "weightLbs",
    description: "Weight (LBS)",
    isDriver: true,
    parse: this._parseString,
  };

  DAX: Field<string> = {
    name: "weightKg",
    description: "Weight (KG)",
    isDriver: true,
    parse: this._parseString,
  };

  DAY: Field<string> = {
    name: "eyeColor",
    description: "Eye Color",
    isDriver: true,
    parse: this._parseString, // TODO: Parse ANSI D-20 codes
  };

  DAZ: Field<string> = {
    name: "hairColor",
    description: "Hair Color",
    isDriver: true,
    parse: this._parseString, // TODO: Parse ANSI D-20 codes
  };

  DBA: Field<DateParts> = {
    name: "driverLicenseExpirationDate",
    description: "Driver License Expiration Date",
    isRequired: true,
    isDriver: true,
    parse: this._parseDate,
  };

  DBB: Field<DateParts> = {
    name: "dateOfBirth",
    description: "Date of Birth",
    isRequired: true,
    isDriver: true,
    parse: this._parseDate,
  };

  DBC: Field<string> = {
    name: "driverSex",
    description: "Driver Sex",
    isRequired: true,
    isDriver: true,
    parse: this._parseString, // TODO: Parse sex
  };

  DBD: Field<DateParts> = {
    name: "driverLicenseOrIdDocumentIssueDate",
    description: "Driver License or ID Document Issue Date",
    isRequired: true,
    isDriver: true,
    parse: this._parseDate,
  };

  DBE: Field<string> = {
    name: "issueTimestamp",
    description: "Issue Timestamp",
    isDriver: true,
    parse: this._parseString,
  };

  DBF: Field<number> = {
    name: "numberOfDuplicates",
    description: "Number of Duplicates",
    isDriver: true,
    parse: this._parseNumber,
  };

  // TODO: Unsure of type, defaulting to string
  DBG: Field<string> = {
    name: "medicalIndicatorCodes",
    description: "Medical Indicator/Codes",
    isDriver: true,
    parse: this._parseString,
  };

  // TODO: Unsure of type, defaulting to string
  DBH: Field<string> = {
    name: "organDonor",
    description: "Organ Donor",
    isDriver: true,
    parse: this._parseString,
  };

  // TODO: Unsure of type, defaulting to string
  DBI: Field<string> = {
    name: "nonResidentIndicator",
    description: "Non-Resident Indicator",
    isDriver: true,
    parse: this._parseString,
  };

  DBJ: Field<string> = {
    name: "uniqueCustomerIdentifier",
    description: "Unique Customer Identifier",
    isDriver: true,
    parse: this._parseString,
  };

  DBK: Field<string> = {
    name: "socialSecurityNumber",
    description: "Social Security Number",
    isDriver: true,
    parse: this._parseString,
  };

  DBL: Field<DateParts> = {
    name: "driverAkaDateOfBirth",
    description: 'Driver "AKA" Date Of Birth',
    isDriver: true,
    parse: this._parseDate,
  };

  DBM: Field<DateParts> = {
    name: "driverAkaSocialSecurityNumber",
    description: 'Driver "AKA" Social Security Number',
    isDriver: true,
    parse: this._parseDate,
  };

  DBN: Field<string> = {
    name: "driverAkaName",
    description: 'Driver "AKA" Name',
    isDriver: true,
    parse: this._parseString,
  };

  DBO: Field<string> = {
    name: "driverAkaLastName",
    description: 'Driver "AKA" Last Name',
    isDriver: true,
    parse: this._parseString,
  };

  DBP: Field<string> = {
    name: "driverAkaFirstName",
    description: 'Driver "AKA" First Name',
    isDriver: true,
    parse: this._parseString,
  };

  DBQ: Field<string> = {
    name: "driverAkaMiddleName",
    description: 'Driver "AKA" Middle Name',
    isDriver: true,
    parse: this._parseString,
  };

  DBR: Field<string> = {
    name: "driverAkaSuffix",
    description: 'Driver "AKA" Suffix',
    isDriver: true,
    parse: this._parseString,
  };

  DBS: Field<string> = {
    name: "driverAkaPrefix",
    description: 'Driver "AKA" Prefix',
    isDriver: true,
    parse: this._parseString,
  };

  PAA: Field<string> = {
    name: "driverPermitClassificationCode",
    description: "Driver Permit Classification Code",
    isDriver: true,
    parse: this._parseString,
  };

  PAB: Field<DateParts> = {
    name: "driverPermitExpirationDate",
    description: "Driver Permit Expiration Date",
    isDriver: true,
    parse: this._parseDate,
  };

  PAC: Field<string> = {
    name: "permitIdentifier",
    description: "Permit Identifier",
    isDriver: true,
    parse: this._parseString,
  };

  PAD: Field<DateParts> = {
    name: "driverPermitIssueDate",
    description: "Driver Permit Issue Date",
    isDriver: true,
    parse: this._parseDate,
  };

  PAE: Field<string> = {
    name: "driverPermitRestrictionCode",
    description: "Driver Permit Restriction Code",
    isDriver: true,
    parse: this._parseString,
  };

  PAF: Field<string> = {
    name: "driverPermitEndorsementCode",
    description: "Driver Permit Endorsement Code",
    isDriver: true,
    parse: this._parseString,
  };
}

export default AAMVAVersion1;

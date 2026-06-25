# Glossary

## AAMVA (American Association of Motor Vehicle Administrators)

The AAMVA is the organization who publishes the DL/ID Card Design Standard.

Home page: https://www.aamva.org/

## AAMVA DL/ID Card Design Standard

Often referred to as the "DL/ID Standard"

This is the technical standards that jurisdictions follow when issuing a
Driver License or Identification Card. Annex D outlines the data encoding
schema used within the PDF417 Bar Code. There are several versions of the
standard and this library aims to support all of them.

Resource:
https://www.aamva.org/topics/driver-license-and-identification-standards

## Barcode File

The Barcode File is the result after the library parses the byte string received
from the scanner. The parser takes in the string and outputs the Barcode File.
This is an object containing the File Header and one or more Subfiles.

```ts
// Barcode File type definition
interface BarcodeFile {
  header: FileHeader;
  subfiles: Subfile[];
}
```

## Data Element

Each element has a field and it's value. To keep the encoded size of the
barcode small, each field is represented with a 3 character code called the
Element ID. The DL/ID Standard has a table to match the Element Id to it's
field and how that field is encoded. Data Elements can be booleans, numbers,
strings, and dates.

In the barcode string, the field `"DAYBRO\n"` would be parsed into the data
element `{ "DAY": "BRO" }`. After the data elements are evaluated this field
would become `{"physicalDescription": {"eyeColor": "brown"}}` in the profile.

```ts
// Data Element type
{
  [elementId: string]: string
}
```

## DLID Library

This library, silly.

## File Header

This is the portion of the barcode that tells us how to read the rest of the
file.

```ts
// File Header type definition
interface FileHeader {
  issuerId: number;
  aamvaVersion: number;
  jurisdictionVersion: number;
  numberOfEntries: number;
}
```

## PDF417 Bar Code

This is the barcode format that is required on the back of the card. It stores
all of the information printed on the card in a machine-readable form. The
PDF417 Bar Code can be scanned using most 2D scanners or smartphone cameras.

A separate library is used to scan the barcode. The scanning library should
return a byte string. The DLID Library will parse the string into a Barcode File
and then into a Profile containing the all of the information normalized.

## Subfiles

A conforming barcode must have at least 1 subfile. Each subfile contains a
subfile type and 1 or more elements. The primary subfiles are `"DL"` for a
Driver License, and `"ID"` for an Identification Card.

Jurisdictions may add additional subfiles to the barcode. These subfiles must
start with the letter `"Z"`, such as `"ZV"` or `"ZA"`.

```ts
// Subfile type definition
interface Subfile {
  subfileType: string;
  elements: Record<string, string>; // Data Elements
}
```

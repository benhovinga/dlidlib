export interface DateObject {
  year: number;
  month: number;
  day: number;
}

export type DateParserFn = (dateStr: string) => DateObject;

// Exported for testing only
export function isoFormat(dateSrt: string): DateObject {
  // YYYYMMDD
  return {
    year: Number.parseInt(dateSrt.slice(0, 4)),
    month: Number.parseInt(dateSrt.slice(4, 6)),
    day: Number.parseInt(dateSrt.slice(6, 8)),
  };
}

// Exported for testing only
export function usaFormat(dateSrt: string): DateObject {
  // MMDDYYYY
  return {
    month: Number.parseInt(dateSrt.slice(0, 2)),
    day: Number.parseInt(dateSrt.slice(2, 4)),
    year: Number.parseInt(dateSrt.slice(4, 8)),
  };
}

export function getDateParser(
  aamvaVersion: number,
  country: string,
): DateParserFn {
  country = country.toUpperCase();

  const formatter =
    aamvaVersion < 3 || country === "USA" ? usaFormat : isoFormat;

  return (dateStr: string): DateObject => {
    if (dateStr.length !== 8)
      throw new Error("dateStr must be exactly 8 characters long.");
    return formatter(dateStr);
  };
}

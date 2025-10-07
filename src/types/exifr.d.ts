declare module 'exifr' {
  export interface ExifTags {
    [key: string]: any;
  }

  export interface ExifData {
    Make?: string;
    Model?: string;
    DateTime?: string;
    DateTimeOriginal?: string;
    DateTimeDigitized?: string;
    ExposureTime?: string;
    FNumber?: string;
    ISOSpeedRatings?: string;
    FocalLength?: string;
    Flash?: string;
    Orientation?: number;
    XResolution?: number;
    YResolution?: number;
    ResolutionUnit?: number;
    GPSLatitude?: number[];
    GPSLongitude?: number[];
    GPSAltitude?: number;
    GPSDateStamp?: string;
    GPSTimeStamp?: number[];
    Software?: string;
    Artist?: string;
    Copyright?: string;
    ExifImageWidth?: number;
    ExifImageHeight?: number;
    [key: string]: any;
  }

  export function parse(file: File | string): Promise<ExifData>;
  export function parse(file: File | string, options: { [key: string]: any }): Promise<ExifData>;
  export function parseBuffer(buffer: ArrayBuffer): Promise<ExifData>;
  export function parseBuffer(buffer: ArrayBuffer, options: { [key: string]: any }): Promise<ExifData>;
  export function pick(file: File | string, tags: string[]): Promise<Partial<ExifData>>;
  export function pick(file: File | string, tags: string[], options: { [key: string]: any }): Promise<Partial<ExifData>>;

  const exifr: {
    parse: typeof parse;
    parseBuffer: typeof parseBuffer;
    pick: typeof pick;
  };

  export default exifr;
}

declare module 'exif-js' {
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

  export function getData(img: HTMLElement, callback: (this: HTMLElement) => void): void;
  export function getTag(img: HTMLElement, tag: string): any;
  export function getAllTags(img: HTMLElement): ExifTags;
  export function pretty(img: HTMLElement): string;

  const EXIF: {
    getData: typeof getData;
    getTag: typeof getTag;
    getAllTags: typeof getAllTags;
    pretty: typeof pretty;
  };

  export default EXIF;
}

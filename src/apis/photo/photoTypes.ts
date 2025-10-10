
export interface PhotoVO {
  photoId: number;
  photoName: string;
  photoUrl: string;
  thumbnailUrl: string;
  lat: string;
  lng: string;
  spotName: string;
  createDateTime: string;
  maker: string;
}

export interface ResultListPhotoVO {
  code: number;
  message: string;
  data: PhotoVO[];
}

export interface PhotoDTO {
  photoId: number;
  photoName: string;
  photoUrl: string;
  thumbnailName: string;
  thumbnailUrl: string;
  exif: string;
  maker: string;
  lat: string;
  lng: string;
  spotName: string;
  createDateTime: string;
  updateDateTime: string;
}

export interface ResultPhotoDTO {
  code: number;
  message: string;
  data: PhotoDTO;
}

export interface ResultString {
  code: number;
  message: string;
  data: string;
}

export interface PhotoPO {
  photoName: string;
  photoUrl: string;
  thumbnailName: string;
  thumbnailUrl: string;
  exif: string;
  maker: string;
  lat: string;
  lng: string;
  spotName: string;
  createDateTime: string;
}

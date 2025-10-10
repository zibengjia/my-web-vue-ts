export interface Photo {
  photoId: string
  photoName: string
  photoUrl: string
  thumbnailName: string
  thumbnailUrl: string
  exif: string
  maker: string
  lat: string
  lng: string
  createDateTime: string
  updateDateTime: string
}

export interface PhotoListParams {
  pageNum?: number
  pageSize?: number
  keyword?: string
}

export interface PhotoListResponse {
  records: Photo[]
  total: number
  size: number
  current: number
  pages: number
}
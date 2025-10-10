// 照片视图对象类型
export interface PhotoVO {
  photoId: string
  photoUrl: string
  thumbnailUrl: string
  lat: string
  lng: string
  createDateTime: string
  maker: string
}

// 照片详情类型
export interface PhotoDetail {
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

// 照片分页参数类型
export interface PhotoPageParams {
  page: number
  pageSize: number
}

// API响应结果类型
export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

// 照片列表响应类型
export type PhotoListResult = ApiResult<PhotoVO[]>

// 照片详情响应类型
export type PhotoDetailResult = ApiResult<PhotoDetail>

// 操作结果响应类型
export type OperationResult = ApiResult<string>

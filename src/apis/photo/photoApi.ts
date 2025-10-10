import request from '@/utils/request/request'
import type { PhotoVO, ResultListPhotoVO, PhotoDTO, ResultPhotoDTO, PhotoPO, ResultString } from './photoTypes'

// 获取所有照片
export function getAllPhotos() {
  return request.get<ResultListPhotoVO>('/photos/all')
}

// 获取照片列表（分页）
export function getPhotoList(page: number, pageSize: number) {
  return request.get<ResultListPhotoVO>('/photos', {
    params: {
      page,
      pageSize,
    },
  })
}

// 添加照片
export function addPhoto(data: PhotoPO) {
  return request.post<ResultString>('/photos', data)
}

// 根据ID获取照片详情
export function getPhotoById(photoId: number) {
  return request.get<ResultPhotoDTO>(`/photos/${photoId}`)
}

// 更新照片信息
export function updatePhoto(photoId: number, data: PhotoPO) {
  return request.put<ResultString>(`/photos/${photoId}`, data)
}

// 删除照片
export function deletePhoto(photoId: number) {
  return request.delete<ResultString>(`/photos/${photoId}`)
}

// 根据景点名称获取照片列表
export function getPhotosBySpotName(spotName: string) {
  return request.get<ResultListPhotoVO>(`/photos/spot/${spotName}`)
}

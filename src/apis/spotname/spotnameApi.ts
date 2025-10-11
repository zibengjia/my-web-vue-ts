import request from '@/utils/request/request'
import type { SpotListResult, SpotResult, OperationResult, Spot } from './spotnameTypes'

/**
 * 获取所有景点
 * @returns 所有景点列表
 */
export const getAllSpots = () => {
  return request.get<SpotListResult>('/spots/all')
}

/**
 * 获取景点列表（分页）
 * @param page 页码
 * @param pageSize 每页数量
 * @returns 景点分页列表
 */
export const getSpots = (page: number, pageSize: number) => {
  return request.get<SpotListResult>('/spots', {
    params: {
      page,
      pageSize
    }
  })
}

/**
 * 添加景点
 * @param spot 景点信息
 * @returns 操作结果
 */
export const addSpot = (spot: Omit<Spot, 'spotId'>) => {
  return request.post<OperationResult>('/spots', spot)
}

/**
 * 根据ID获取景点详情
 * @param spotId 景点ID
 * @returns 景点详情
 */
export const getSpotById = (spotId: number) => {
  return request.get<SpotResult>(`/spots/${spotId}`)
}

/**
 * 更新景点信息
 * @param spotId 景点ID
 * @param spot 景点信息
 * @returns 操作结果
 */
export const updateSpot = (spotId: number, spot: Spot) => {
  return request.put<OperationResult>(`/spots/${spotId}`, spot)
}

/**
 * 删除景点
 * @param spotId 景点ID
 * @returns 操作结果
 */
export const deleteSpot = (spotId: number) => {
  return request.delete<OperationResult>(`/spots/${spotId}`)
}

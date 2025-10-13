// 景点DTO类型（包含ID）
export interface SpotDTO {
  spotId: number
  spotName: string
  spotDesc: string
  spotPic: string
  travelTime: string
}

// 景点PO类型（不包含ID，用于添加和更新）
export interface SpotPO {
  spotName: string
  spotDesc: string
  spotPic: string
  travelTime: string
}

// API响应结果类型
export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

// 景点列表响应类型
export type SpotListResult = ApiResult<SpotDTO[]>

// 单个景点响应类型
export type SpotResult = ApiResult<SpotDTO>

// 操作结果响应类型
export type OperationResult = ApiResult<string>

// 为了向后兼容，保留Spot类型别名
export type Spot = SpotDTO

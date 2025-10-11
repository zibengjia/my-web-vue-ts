// 景点类型
export interface Spot {
  spotId: number
  spotName: string
  spotDesc: string
}

// API响应结果类型
export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

// 景点列表响应类型
export type SpotListResult = ApiResult<Spot[]>

// 单个景点响应类型
export type SpotResult = ApiResult<Spot>

// 操作结果响应类型
export type OperationResult = ApiResult<string>

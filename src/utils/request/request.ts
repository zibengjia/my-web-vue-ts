import axios from 'axios'
import type { AxiosResponse } from 'axios'

// 根据环境变量设置 baseURL
const getBaseURL = () => {
  if (import.meta.env.MODE === 'production') {
    // 生产环境使用完整的 API 地址
    return import.meta.env.VITE_BASE_URL || 'http://117.72.187.152:80'
  } else {
    // 开发环境使用代理前缀
    return import.meta.env.VITE_API_URL || '/api'
  }
}

const request = axios.create({
  baseURL: getBaseURL(),
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 记录请求详细信息
    console.log('发送请求:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      params: config.params
    })
    
    // 可以在这里添加认证 token 等逻辑
    // 例如:
    // const token = localStorage.getItem('token')
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 定义 API 响应格式接口
interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    // 根据 API 规范处理响应数据
    const { code, message } = response.data

    if (code === 0) {
      // 成功响应，返回 data 部分
      return response
    } else {
      // 业务错误处理
      console.error('API Error:', message)
      console.error('API Response Data:', response.data)
      // 添加更多错误信息
      const errorMessage = `${message || '请求失败'} (错误代码: ${code})`
      return Promise.reject(new Error(errorMessage))
    }
  },
  (error) => {
    // HTTP 错误处理
    console.error('HTTP Error:', error.message)
    return Promise.reject(error)
  },
)

export default request

// R2 存储桶上传工具
export interface R2UploadOptions {
  key: string // 对象在存储桶中的唯一键名
  file: File // 要上传的文件
  overwrite?: boolean // 是否覆盖已存在的对象
  onProgress?: (progress: number) => void // 上传进度回调
}

export interface R2DeleteOptions {
  key: string // 要删除的对象键名
}

export interface R2GetOptions {
  key: string // 要获取的对象键名
}

// R2 API 配置
const R2_API_BASE_URL = 'https://zbj235.dpdns.org'
const AUTH_KEY = import.meta.env.VITE_R2_AUTH_KEY || ''

// 上传文件到 R2 存储桶
export async function uploadToR2(options: R2UploadOptions): Promise<{ success: boolean; message?: string; key?: string }> {
  const { key, file, overwrite = false, onProgress } = options

  try {
    // 创建 XMLHttpRequest 以支持上传进度
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      // 监听上传进度
      if (onProgress && xhr.upload) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100)
            onProgress(progress)
          }
        })
      }

      // 请求完成处理
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ success: true, key })
        } else if (xhr.status === 409) {
          resolve({ success: false, message: '对象已存在，且未提供 Overwrite: true 请求头' })
        } else if (xhr.status === 403) {
          resolve({ success: false, message: '认证失败，缺少或无效的 X-Custom-Auth-Key 头' })
        } else {
          resolve({ success: false, message: `上传失败: ${xhr.status} ${xhr.statusText}` })
        }
      })

      // 请求错误处理
      xhr.addEventListener('error', () => {
        resolve({ success: false, message: '网络错误，上传失败' })
      })

      // 设置请求头
      xhr.open('PUT', `${R2_API_BASE_URL}/${encodeURIComponent(key)}`)
      xhr.setRequestHeader('X-Custom-Auth-Key', AUTH_KEY)
      if (overwrite) {
        xhr.setRequestHeader('Overwrite', 'true')
      }

      // 添加withCredentials以支持跨域cookie
      xhr.withCredentials = true

      // 发送请求
      xhr.send(file)
    })
  } catch (error) {
    console.error('上传到R2失败:', error)
    return { success: false, message: `上传失败: ${(error as Error).message}` }
  }
}

// 从 R2 存储桶删除对象
export async function deleteFromR2(options: R2DeleteOptions): Promise<{ success: boolean; message?: string }> {
  const { key } = options

  try {
    const response = await fetch(`${R2_API_BASE_URL}/${encodeURIComponent(key)}`, {
      method: 'DELETE',
      headers: {
        'X-Custom-Auth-Key': AUTH_KEY,
      },
    })

    if (response.ok) {
      return { success: true }
    } else if (response.status === 403) {
      return { success: false, message: '认证失败，缺少或无效的 X-Custom-Auth-Key 头' }
    } else {
      return { success: false, message: `删除失败: ${response.status} ${response.statusText}` }
    }
  } catch (error) {
    console.error('从R2删除失败:', error)
    return { success: false, message: `删除失败: ${(error as Error).message}` }
  }
}

// 从 R2 存储桶获取对象
export async function getFromR2(options: R2GetOptions): Promise<{ success: boolean; data?: Blob; message?: string; contentType?: string }> {
  const { key } = options

  try {
    const response = await fetch(`${R2_API_BASE_URL}/${encodeURIComponent(key)}`)

    if (response.ok) {
      const data = await response.blob()
      const contentType = response.headers.get('Content-Type') || ''
      return { success: true, data, contentType }
    } else if (response.status === 404) {
      return { success: false, message: '对象未找到' }
    } else {
      return { success: false, message: `获取失败: ${response.status} ${response.statusText}` }
    }
  } catch (error) {
    console.error('从R2获取失败:', error)
    return { success: false, message: `获取失败: ${(error as Error).message}` }
  }
}

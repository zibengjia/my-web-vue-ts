/**
 * EXIF 信息读取器
 * 使用 exifr 库读取图片的 EXIF 信息
 */

import exifr from 'exifr'

export interface ExifData {
  // 相机基本信息
  Make?: string // 相机制造商
  Model?: string // 相机型号
  DateTime?: string // 拍摄时间
  DateTimeOriginal?: string // 原始拍摄时间
  DateTimeDigitized?: string // 数字化时间

  // 拍摄参数
  ExposureTime?: string // 曝光时间
  FNumber?: string // 光圈值
  ISOSpeedRatings?: string // ISO 感光度
  FocalLength?: string // 焦距
  Flash?: string // 闪光灯状态

  // 图像信息
  Orientation?: number // 图像方向
  XResolution?: number // X方向分辨率
  YResolution?: number // Y方向分辨率
  ResolutionUnit?: number // 分辨率单位

  // GPS 信息
  GPSLatitude?: number[] // 纬度
  GPSLatitudeRef?: string // 纬度方向参考 (N/S)
  GPSLongitude?: number[] // 经度
  GPSLongitudeRef?: string // 经度方向参考 (E/W)
  GPSAltitude?: number // 海拔高度
  GPSDateStamp?: string // GPS 日期
  GPSTimeStamp?: number[] // GPS 时间

  // 其他信息
  Software?: string // 软件
  Artist?: string // 作者
  Copyright?: string // 版权信息
  ExifImageWidth?: number // EXIF 图像宽度
  ExifImageHeight?: number // EXIF 图像高度

  // 批量处理相关属性
  error?: string // 错误信息
  fileName?: string // 文件名
}

/**
 * 从图片文件中读取 EXIF 信息
 * @param file 图片文件对象
 * @returns Promise<ExifData> EXIF 数据
 */
export function readExifFromFile(file: File): Promise<ExifData> {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject(new Error('文件不能为空'))
      return
    }

    // 检查文件类型是否为图片
    if (!file.type.startsWith('image/')) {
      reject(new Error('只支持图片文件'))
      return
    }

    try {
      // 使用 exifr 获取 EXIF 数据
      const exifData = await exifr.parse(file)
      resolve(exifData as ExifData)
    } catch (error) {
      reject(new Error(`读取 EXIF 信息失败: ${error}`))
    }
  })
}

/**
 * 从图片 URL 中读取 EXIF 信息
 * @param imageUrl 图片 URL
 * @returns Promise<ExifData> EXIF 数据
 */
export function readExifFromUrl(imageUrl: string): Promise<ExifData> {
  return new Promise(async (resolve, reject) => {
    if (!imageUrl) {
      reject(new Error('图片 URL 不能为空'))
      return
    }

    try {
      // 使用 exifr 获取 EXIF 数据
      const exifData = await exifr.parse(imageUrl)
      resolve(exifData as ExifData)
    } catch (error) {
      reject(new Error(`读取 EXIF 信息失败: ${error}`))
    }
  })
}

/**
 * 将 GPS 坐标转换为十进制格式
 * @param gpsDMS GPS 度分秒格式坐标 [度, 分, 秒]
 * @param ref 方向参考 (N, S, E, W)
 * @returns 十进制坐标
 */
export function convertGPSToDecimal(gpsDMS: number[], ref?: string): number {
  if (!gpsDMS || gpsDMS.length !== 3) {
    return 0
  }

  const [degrees, minutes, seconds] = gpsDMS
  let decimal = degrees + minutes / 60 + seconds / 3600

  // 根据方向调整符号
  if (ref === 'S' || ref === 'W') {
    decimal = -decimal
  }

  return decimal
}

/**
 * 格式化曝光时间
 * @param exposureTime 曝光时间值
 * @returns 格式化后的曝光时间字符串
 */
export function formatExposureTime(exposureTime: string | number): string {
  if (!exposureTime) return ''

  const time = typeof exposureTime === 'string' ? parseFloat(exposureTime) : exposureTime

  if (time >= 1) {
    return `${time}秒`
  } else {
    // 计算分数形式
    const denominator = Math.round(1 / time)
    return `1/${denominator}秒`
  }
}

/**
 * 格式化光圈值
 * @param fNumber 光圈值
 * @returns 格式化后的光圈值字符串
 */
export function formatFNumber(fNumber: string | number): string {
  if (!fNumber) return ''

  const value = typeof fNumber === 'string' ? parseFloat(fNumber) : fNumber
  return `f/${value}`
}

/**
 * 格式化焦距
 * @param focalLength 焦距值
 * @returns 格式化后的焦距字符串
 */
export function formatFocalLength(focalLength: string | number): string {
  if (!focalLength) return ''

  const value = typeof focalLength === 'string' ? parseFloat(focalLength) : focalLength
  return `${value}mm`
}

/**
 * 格式化 ISO 值
 * @param iso ISO 值
 * @returns 格式化后的 ISO 字符串
 */
export function formatISO(iso: string | number): string {
  if (!iso) return ''

  return `ISO ${iso}`
}

/**
 * 格式化 GPS 位置为字符串
 * @param exifData EXIF 数据
 * @returns 格式化后的 GPS 位置字符串
 */
export function formatGPSLocation(exifData: ExifData): string {
  if (!exifData.GPSLatitude || !exifData.GPSLongitude) {
    return '无 GPS 信息'
  }

  const lat = convertGPSToDecimal(exifData.GPSLatitude, exifData.GPSLatitudeRef)
  const lng = convertGPSToDecimal(exifData.GPSLongitude, exifData.GPSLongitudeRef)

  return `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`
}

/**
 * 格式化 EXIF 数据为更友好的显示格式
 * @param exifData 原始 EXIF 数据
 * @returns 格式化后的 EXIF 数据
 */
export function formatExifData(exifData: ExifData): Record<string, string> {
  const result: Record<string, string> = {}

  // 相机信息
  if (exifData.Make) result['相机制造商'] = exifData.Make
  if (exifData.Model) result['相机型号'] = exifData.Model
  if (exifData.Software) result['软件'] = exifData.Software

  // 拍摄时间
  if (exifData.DateTimeOriginal) {
    result['拍摄时间'] = exifData.DateTimeOriginal
  } else if (exifData.DateTime) {
    result['拍摄时间'] = exifData.DateTime
  }

  // 拍摄参数
  if (exifData.ExposureTime) {
    result['曝光时间'] = formatExposureTime(exifData.ExposureTime)
  }
  if (exifData.FNumber) {
    result['光圈'] = formatFNumber(exifData.FNumber)
  }
  if (exifData.ISOSpeedRatings) {
    result['ISO'] = formatISO(exifData.ISOSpeedRatings)
  }
  if (exifData.FocalLength) {
    result['焦距'] = formatFocalLength(exifData.FocalLength)
  }
  if (exifData.Flash !== undefined) {
    result['闪光灯'] = exifData.Flash ? '开启' : '关闭'
  }

  // GPS 信息
  if (exifData.GPSLatitude && exifData.GPSLongitude) {
    result['GPS 位置'] = formatGPSLocation(exifData)
    if (exifData.GPSAltitude) {
      result['GPS 海拔'] = `${exifData.GPSAltitude}米`
    }
  }

  // 图像尺寸
  if (exifData.ExifImageWidth && exifData.ExifImageHeight) {
    result['图像尺寸'] = `${exifData.ExifImageWidth} × ${exifData.ExifImageHeight}`
  }

  return result
}

/**
 * 批量处理多个照片文件
 * @param files 图片文件数组
 * @param onProgress 处理进度回调函数 (completed, total)
 * @returns Promise<ExifData[]> EXIF 数据数组
 */
export function processMultipleFiles(files: File[], onProgress?: (completed: number, total: number) => void): Promise<ExifData[]> {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0) {
      reject(new Error('文件列表不能为空'))
      return
    }

    const results: ExifData[] = []
    let completed = 0
    const total = files.length

    // 过滤出图片文件
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      reject(new Error('没有找到有效的图片文件'))
      return
    }

    // 处理每个文件
    const promises = imageFiles.map((file) => {
      return readExifFromFile(file)
        .then((exifData) => {
          results.push(exifData)
          completed++

          // 调用进度回调
          if (onProgress) {
            onProgress(completed, total)
          }

          return exifData
        })
        .catch((error) => {
          completed++

          // 调用进度回调
          if (onProgress) {
            onProgress(completed, total)
          }

          // 添加错误信息但不中断处理
          console.error(`处理文件 ${file.name} 时出错:`, error)

          // 返回一个包含错误信息的对象
          return {
            fileName: file.name,
            error: error.message || '未知错误',
          } as any
        })
    })

    // 等待所有处理完成
    Promise.all(promises)
      .then(() => resolve(results))
      .catch((error) => reject(error))
  })
}

export default {
  readExifFromFile,
  readExifFromUrl,
  processMultipleFiles,
  convertGPSToDecimal,
  formatExposureTime,
  formatFNumber,
  formatFocalLength,
  formatISO,
  formatGPSLocation,
  formatExifData,
}

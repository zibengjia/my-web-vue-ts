<template>
  <div class="photo-update-container">
    <div class="mode-selector">
      <button class="mode-btn" :class="{ active: mode === 'single' }" @click="switchMode('single')">单张照片</button>
      <button class="mode-btn" :class="{ active: mode === 'batch' }" @click="switchMode('batch')">批量处理</button>
    </div>

    <!-- 单张照片模式 -->
    <div v-if="mode === 'single'">
      <div class="upload-area" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
        <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileChange" />
        <div v-if="!imageUrl" class="upload-placeholder">
          <div class="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <p>点击或拖拽上传图片</p>
          <p class="upload-hint">支持 JPG, PNG, GIF 等格式</p>
        </div>
        <div v-else class="image-preview">
          <img :src="imageUrl" alt="上传的图片" />
          <div class="image-info">
            <div class="file-name">{{ selectedFile?.name }}</div>
            <div class="file-size">{{ formatFileSize(selectedFile?.size || 0) }}</div>
          </div>
          <div class="image-actions">
            <button @click.stop="triggerFileInput" class="action-btn replace-btn">更换图片</button>
            <button @click.stop="clearImage" class="action-btn clear-btn">清除</button>
          </div>
        </div>
      </div>

      <div v-if="exifData" class="exif-info">
        <h3>EXIF 信息</h3>
        <div class="exif-grid">
          <div class="exif-item" v-for="(value, key) in displayExifData" :key="key">
            <span class="exif-label">{{ key }}:</span>
            <span class="exif-value">{{ value }}</span>
          </div>
        </div>

        <!-- 景区名字输入 -->
        <div class="scenic-input-section">
          <h3>景区信息</h3>
          <div class="input-group">
            <label for="scenic-name">景区名称:</label>
            <input id="scenic-name" type="text" v-model="scenicName" placeholder="请输入景区名称" class="scenic-input" />
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="submit-section">
          <button @click="uploadSinglePhoto" class="action-btn submit-btn" :disabled="isUploading">
            {{ isUploading ? '上传中...' : '上传到R2存储桶' }}
          </button>

          <!-- 上传状态 -->
          <div v-if="uploadStatus !== 'idle'" class="submit-status" :class="uploadStatus">
            <div class="status-message">{{ uploadMessage }}</div>

            <!-- 进度条 -->
            <div v-if="uploadStatus === 'uploading' && uploadProgress > 0" class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
              </div>
              <div class="progress-info">
                <div class="progress-text">{{ uploadProgress }}%</div>
                <div v-if="uploadSpeed > 0" class="upload-speed">{{ formatSpeed(uploadSpeed) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 批量处理模式 -->
    <div v-if="mode === 'batch'">
      <div class="batch-upload-area" @click="triggerBatchFileInput" @dragover.prevent @drop.prevent="handleBatchDrop">
        <input ref="batchFileInput" type="file" accept="image/*" multiple style="display: none" @change="handleBatchFileChange" />
        <div v-if="batchFiles.length === 0" class="upload-placeholder">
          <div class="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <p>点击或拖拽上传多张图片</p>
          <p class="upload-hint">支持 JPG, PNG, GIF 等格式，可同时选择多张</p>
        </div>
        <div v-else class="batch-files-preview">
          <div class="batch-files-header">
            <h4>已选择 {{ batchFiles.length }} 张图片</h4>
            <button @click.stop="clearBatchFiles" class="action-btn clear-btn">清除全部</button>
          </div>
          <div class="batch-files-list">
            <div v-for="(file, index) in batchFiles" :key="index" class="batch-file-item">
              <div class="file-thumbnail">
                <img :src="file.thumbnail" :alt="file.name" />
              </div>
              <div class="file-info">
                <div class="file-name">{{ file.name }}</div>
                <div class="file-size">{{ formatFileSize(file.size) }}</div>
              </div>
              <div class="file-status">
                <span v-if="file.status === 'pending'" class="status-pending">等待解析</span>
                <span v-else-if="file.status === 'parsed'" class="status-parsed">已解析</span>
                <span v-else-if="file.status === 'uploading'" class="status-processing">上传中...</span>
                <span v-else-if="file.status === 'completed'" class="status-completed">已完成</span>
                <span v-else-if="file.status === 'error'" class="status-error">上传失败</span>
              </div>
              <button @click.stop="removeFile(index)" class="remove-file-btn">✕</button>
            </div>
          </div>
          <div class="batch-actions">
            <button @click.stop="parseBatchFiles" class="action-btn parse-btn" :disabled="isParsing || batchFiles.length === 0">
              {{ isParsing ? '解析中...' : '解析图片信息' }}
            </button>
            <button @click.stop="uploadBatchFiles" class="action-btn process-btn" :disabled="isUploading || batchFiles.length === 0 || !allFilesParsed">
              {{ isUploading ? `上传中 (${completedCount}/${batchFiles.length})` : '开始批量上传' }}
            </button>
            <button @click.stop="triggerBatchFileInput" class="action-btn add-more-btn">添加更多</button>
          </div>

          <!-- 进度条 -->
          <div v-if="isUploading" class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
            </div>
            <div class="progress-text">{{ completedCount }} / {{ batchFiles.length }}</div>
          </div>
        </div>
      </div>

      <!-- 解析信息显示 -->
      <div v-if="hasParsedFiles" class="batch-exif-section">
        <h3>图片解析信息</h3>
        <div class="batch-exif-grid">
          <div v-for="(file, index) in parsedFiles" :key="index" class="exif-card">
            <div class="exif-card-header">
              <h4>{{ file.name }}</h4>
              <button @click="toggleExifDetail(index)" class="toggle-btn">
                {{ showExifDetail[index] ? '收起' : '展开' }}
              </button>
            </div>
            <div v-if="showExifDetail[index]" class="exif-card-body">
              <div v-if="file.exifData" class="exif-grid">
                <div class="exif-item" v-for="(value, key) in formatExifData(file.exifData)" :key="key">
                  <span class="exif-label">{{ key }}:</span>
                  <span class="exif-value">{{ value }}</span>
                </div>
              </div>
              <div v-else class="no-exif">无EXIF数据</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 批量上传结果 -->
      <div v-if="batchResults.length > 0" class="batch-results">
        <h3>批量上传结果</h3>

        <div class="batch-results-grid">
          <div v-for="(result, index) in batchResults" :key="index" class="result-card">
            <div class="result-header">
              <h4>{{ result.fileName || `图片 ${index + 1}` }}</h4>
              <span v-if="result.error" class="error-badge">错误</span>
              <span v-else class="success-badge">成功</span>
            </div>
            <div v-if="result.error" class="error-message">
              {{ result.error }}
            </div>
            <div v-else>
              <div class="file-url">
                <span class="exif-label">原图链接:</span>
                <a :href="result.url" target="_blank" class="file-link">{{ result.url }}</a>
              </div>
              <div v-if="result.thumbnailUrl" class="file-url">
                <span class="exif-label">缩略图链接:</span>
                <a :href="result.thumbnailUrl" target="_blank" class="file-link">{{ result.thumbnailUrl }}</a>
              </div>
              <div v-if="result.photoId" class="file-url">
                <span class="exif-label">照片ID:</span>
                <span class="file-link">{{ result.photoId }}</span>
              </div>
              <div v-if="result.exifData" class="exif-grid">
                <div class="exif-item" v-for="(value, key) in formatExifData(result.exifData)" :key="key">
                  <span class="exif-label">{{ key }}:</span>
                  <span class="exif-value">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { readExifFromFile, formatExifData, convertGPSToDecimal } from '@/utils/exifr/exifr'
import { uploadToR2 } from '@/utils/Update/r2Upload'
import type { PhotoPO } from '@/apis/photo/photoTypes'

// 定义EXIF数据类型
interface ExifData {
  [key: string]: any
  error?: string | undefined
  fileName?: string | undefined
  latitude?: number // 添加latitude属性，兼容旧代码
  longitude?: number // 添加longitude属性，兼容旧代码
  GPSLatitude?: number[] // 纬度（度分秒格式）
  GPSLatitudeRef?: string // 纬度方向参考 (N/S)
  GPSLongitude?: number[] // 经度（度分秒格式）
  GPSLongitudeRef?: string // 经度方向参考 (E/W)
}

// 上传结果接口
interface UploadResult {
  fileName?: string
  url?: string
  thumbnailUrl?: string
  exifData?: ExifData
  photoId?: string
  error?: string
}

// 批量处理文件接口
interface BatchFile {
  file: File
  name: string
  size: number
  thumbnail: string
  status: 'pending' | 'uploading' | 'completed' | 'error' | 'parsed'
  result?: UploadResult
  error?: string
  exifData?: ExifData
}

// 模式：单张或批量
const mode = ref<'single' | 'batch'>('single')

// 单张照片相关
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const imageUrl = ref<string>('')
const thumbnailUrl = ref<string>('')
const exifData = ref<ExifData | null>(null)

// 批量处理相关
const batchFileInput = ref<HTMLInputElement | null>(null)
const batchFiles = ref<BatchFile[]>([])
const batchResults = ref<UploadResult[]>([])
const isUploading = ref(false)
const completedCount = ref(0)

// 解析相关
const isParsing = ref(false)
const showExifDetail = ref<Record<number, boolean>>({})

// 上传相关
const uploadProgress = ref(0)
const uploadStatus = ref<'idle' | 'uploading' | 'success' | 'error'>('idle')
const uploadMessage = ref('')

// 景区名字
const scenicName = ref('')

// 上传网速相关
const uploadSpeed = ref(0) // 上传速度，单位KB/s
const lastUploadTime = ref(0) // 上次计算时间戳
const lastUploadedBytes = ref(0) // 上次上传字节数

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

// 处理拖放
const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

// 处理文件
const processFile = (file: File) => {
  // 检查文件类型
  if (!file.type.match('image.*')) {
    alert('请选择图片文件！')
    return
  }

  // 保存文件引用
  selectedFile.value = file

  // 创建图片URL
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string

    // 获取EXIF数据
    readExifFromFile(file)
      .then((output) => {
        console.log('EXIF数据:', output) //添加调试日志
        exifData.value = output
      })
      .catch((error) => {
        console.error('读取EXIF数据失败:', error)
      })
  }
  reader.readAsDataURL(file)
}

// 清除图片
const clearImage = () => {
  imageUrl.value = ''
  exifData.value = null
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 格式化日期
const formatDate = (date: Date) => {
  return new Date(date).toLocaleString()
}

// 过滤并格式化EXIF数据以供显示
const displayExifData = computed(() => {
  if (!exifData.value) return {}

  // 使用工具函数格式化EXIF数据
  return formatExifData(exifData.value)
})

// 将度分秒(DMS)转换为十进制度(DD)
const convertDMSToDD = (dms: number[]) => {
  const degrees = dms[0]
  const minutes = dms[1]
  const seconds = dms[2]
  return degrees + minutes / 60 + seconds / 3600
}

// 切换模式
const switchMode = (newMode: 'single' | 'batch') => {
  mode.value = newMode
}

// 触发批量文件选择
const triggerBatchFileInput = () => {
  batchFileInput.value?.click()
}

// 处理批量文件选择
const handleBatchFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    addFilesToBatch(Array.from(target.files))
  }
}

// 处理批量拖放
const handleBatchDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    addFilesToBatch(Array.from(event.dataTransfer.files))
  }
}

// 添加文件到批量处理列表
const addFilesToBatch = (files: File[]) => {
  // 过滤出图片文件
  const imageFiles = files.filter((file) => file.type.match('image.*'))

  if (imageFiles.length === 0) {
    alert('没有找到有效的图片文件！')
    return
  }

  // 为每个文件创建缩略图并添加到列表
  imageFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      batchFiles.value.push({
        file,
        name: file.name,
        size: file.size,
        thumbnail: e.target?.result as string,
        status: 'pending',
      })
    }
    reader.readAsDataURL(file)
  })
}

// 移除文件
const removeFile = (index: number) => {
  batchFiles.value.splice(index, 1)
}

// 清除批量文件
const clearBatchFiles = () => {
  batchFiles.value = []
  batchResults.value = []
  showExifDetail.value = {}
  if (batchFileInput.value) {
    batchFileInput.value.value = ''
  }
}

// 解析批量文件的EXIF信息
const parseBatchFiles = async () => {
  if (batchFiles.value.length === 0) return

  isParsing.value = true

  try {
    // 重置所有文件状态
    batchFiles.value.forEach((file, index) => {
      if (file.status !== 'completed' && file.status !== 'error') {
        file.status = 'pending'
      }
    })

    // 逐个解析文件
    for (let i = 0; i < batchFiles.value.length; i++) {
      const batchFile = batchFiles.value[i]

      // 如果已经完成或错误，跳过
      if (batchFile.status === 'completed' || batchFile.status === 'error') {
        continue
      }

      try {
        // 读取EXIF数据
        const exifData = await readExifFromFile(batchFile.file)

        // 更新文件状态
        batchFile.status = 'parsed'
        batchFile.exifData = exifData

        // 初始化展开状态为false
        showExifDetail.value[i] = false
      } catch (error) {
        console.error(`解析 ${batchFile.name} 的EXIF数据失败:`, error)
        // 即使解析失败，也标记为已解析状态，但记录错误
        batchFile.status = 'parsed'
        batchFile.error = `解析失败: ${(error as any)?.message || '未知错误'}`
        showExifDetail.value[i] = false
      }
    }
  } catch (error) {
    console.error('批量解析失败:', error)
    alert('批量解析失败: ' + error)
  } finally {
    isParsing.value = false
  }
}

// 切换EXIF详情显示
const toggleExifDetail = (index: number) => {
  showExifDetail.value[index] = !showExifDetail.value[index]
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 计算上传速度
const calculateUploadSpeed = (uploadedBytes: number): void => {
  const currentTime = Date.now()

  // 如果是第一次调用，只记录当前状态
  if (lastUploadTime.value === 0) {
    lastUploadTime.value = currentTime
    lastUploadedBytes.value = uploadedBytes
    return
  }

  // 计算时间差（秒）和字节数差
  const timeDiff = (currentTime - lastUploadTime.value) / 1000 // 转换为秒
  const bytesDiff = uploadedBytes - lastUploadedBytes.value

  // 避免除以零和时间间隔太小的情况
  if (timeDiff > 0 && bytesDiff > 0) {
    // 计算速度（KB/s）
    const speedInKBs = bytesDiff / timeDiff / 1024
    uploadSpeed.value = Math.round(speedInKBs)

    // 更新上次状态
    lastUploadTime.value = currentTime
    lastUploadedBytes.value = uploadedBytes
  }
}

// 格式化网速显示
const formatSpeed = (speedInKBs: number): string => {
  if (speedInKBs < 1024) {
    return `${speedInKBs} KB/s`
  } else {
    return `${(speedInKBs / 1024).toFixed(2)} MB/s`
  }
}

// 进度百分比
const progressPercentage = computed(() => {
  if (batchFiles.value.length === 0) return 0
  return Math.round((completedCount.value / batchFiles.value.length) * 100)
})

// 检查是否所有文件都已解析
const allFilesParsed = computed(() => {
  return batchFiles.value.length > 0 && batchFiles.value.every((file) => file.status === 'parsed')
})

// 获取已解析的文件
const parsedFiles = computed(() => {
  return batchFiles.value.filter((file) => file.status === 'parsed')
})

// 检查是否有已解析的文件
const hasParsedFiles = computed(() => {
  return parsedFiles.value.length > 0
})

// 上传批量文件
const uploadBatchFiles = async () => {
  if (batchFiles.value.length === 0) return

  // 检查是否所有文件都已解析
  const unparsedFiles = batchFiles.value.filter((file) => file.status !== 'parsed')
  if (unparsedFiles.length > 0) {
    alert(`请先解析所有图片的EXIF信息，还有 ${unparsedFiles.length} 张图片未解析`)
    return
  }

  isUploading.value = true
  completedCount.value = 0
  batchResults.value = []

  // 重置网速相关状态
  uploadSpeed.value = 0
  lastUploadTime.value = 0
  lastUploadedBytes.value = 0

  // 重置所有文件状态
  batchFiles.value.forEach((file) => {
    file.status = 'pending'
    file.result = undefined
    file.error = undefined
  })

  try {
    // 逐个上传文件
    for (let i = 0; i < batchFiles.value.length; i++) {
      const batchFile = batchFiles.value[i]

      // 设置当前文件为上传中状态
      batchFile.status = 'uploading'

      // 生成唯一键名
      const key = batchFile.file.name

      // 生成缩略图
      const thumbnailFile = await generateThumbnail(batchFile.file)

      // 上传原图到R2
      const originalResult = await uploadToR2({
        key,
        file: batchFile.file,
        overwrite: true,
        onProgress: (progress) => {
          // 对于批量上传，我们不显示每个文件的详细进度，只显示整体进度
          // 可以在这里添加单个文件的进度显示逻辑
        },
      })

      if (!originalResult.success) {
        throw new Error(originalResult.message || '原图上传失败')
      }

      // 上传缩略图到R2
      const thumbKey = thumbnailFile.name
      const thumbResult = await uploadToR2({
        key: thumbKey,
        file: thumbnailFile,
        overwrite: true,
        onProgress: (progress) => {
          // 对于批量上传，我们不显示每个文件的详细进度，只显示整体进度
          // 可以在这里添加单个文件的进度显示逻辑
        },
      })

      // 增加完成计数
      completedCount.value++

      if (thumbResult.success) {
        // 上传成功，更新状态
        batchFile.status = 'completed'

        // 使用已解析的EXIF数据
        const exifData = batchFile.exifData || null

        // 上传照片数据到后端API
        try {
          // 导入API函数
          const { addPhoto } = await import('@/apis/photo/photoApi')

          // 准备照片数据
          const photoData: PhotoPO = {
            photoName: batchFile.name,
            photoUrl: `https://zbj235.dpdns.org/${originalResult.key}`,
            thumbnailName: thumbnailFile.name,
            thumbnailUrl: `https://zbj235.dpdns.org/${thumbResult.key}`,
            exif: JSON.stringify(exifData || {}),
            maker: exifData?.Make || '',
            lat: exifData?.GPSLatitude ? String(convertGPSToDecimal(exifData.GPSLatitude, exifData.GPSLatitudeRef)) : '',
            lng: exifData?.GPSLongitude ? String(convertGPSToDecimal(exifData.GPSLongitude, exifData.GPSLongitudeRef)) : '',
            createDateTime: exifData?.DateTimeOriginal || new Date().toISOString().replace('Z', ''),
            spotName: scenicName.value, // 添加景区名称
          }

          // 调用API保存照片数据
          console.log('正在保存照片数据到API:', JSON.stringify(photoData, null, 2))
          try {
            const apiResult = await addPhoto(photoData)
            console.log('API响应:', apiResult)

            if (apiResult.data.code === 0) {
              // 添加到结果列表，包含照片ID
              batchResults.value.push({
                fileName: batchFile.name,
                url: `https://zbj235.dpdns.org/${originalResult.key}`,
                thumbnailUrl: `https://zbj235.dpdns.org/${thumbResult.key}`,
                exifData: exifData || undefined,
                photoId: apiResult.data.data, // 添加照片ID
              })
            } else {
              throw new Error(apiResult.data.message || '保存照片信息失败')
            }
          } catch (apiError) {
            console.error('API调用错误详情:', apiError)
            // 检查是否是响应拦截器处理过的错误
            if (apiError instanceof Error) {
              throw apiError
            } else {
              throw new Error('保存照片信息时发生未知错误')
            }
          }
        } catch (apiError) {
          console.error(`保存 ${batchFile.name} 的照片信息失败:`, apiError)
          // 即使API调用失败，也添加到结果列表，但标记错误
          batchResults.value.push({
            fileName: batchFile.name,
            url: `https://zbj235.dpdns.org/${originalResult.key}`,
            thumbnailUrl: `https://zbj235.dpdns.org/${thumbResult.key}`,
            exifData: exifData || undefined,
            error: `图片上传成功，但保存照片信息失败: ${(apiError as any)?.message || '未知错误'}`,
          })
        }
      } else {
        // 上传失败，更新状态
        batchFile.status = 'error'
        batchFile.error = thumbResult.message || '缩略图上传失败'

        // 添加到结果列表
        batchResults.value.push({
          fileName: batchFile.name,
          error: batchFile.error,
        })
      }
    }

    // 完成上传
    isUploading.value = false
  } catch (error) {
    console.error('批量上传失败:', error)
    isUploading.value = false
    alert('批量上传失败: ' + error)
  }
}

// 生成缩略图
const generateThumbnail = (file: File, maxWidth = 300, maxHeight = 300): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // 计算缩略图尺寸，保持宽高比
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // 绘制缩略图
      ctx?.drawImage(img, 0, 0, width, height)

      // 转换为Blob并创建File对象
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // 创建缩略图文件名，添加"_thumb"后缀
            const fileName = file.name.substring(0, file.name.lastIndexOf('.')) + '_thumb' + file.name.substring(file.name.lastIndexOf('.'))
            const thumbnailFile = new File([blob], fileName, { type: file.type })
            resolve(thumbnailFile)
          } else {
            resolve(file) // 如果生成失败，返回原文件
          }
        },
        file.type,
        0.8,
      ) // 0.8质量
    }

    img.src = URL.createObjectURL(file)
  })
}

// 上传单张图片到R2存储桶
const uploadSinglePhoto = async () => {
  if (!selectedFile.value) {
    alert('请先选择图片')
    return
  }

  isUploading.value = true
  uploadStatus.value = 'uploading'
  uploadMessage.value = '正在生成缩略图...'
  uploadProgress.value = 0

  // 重置网速相关状态
  uploadSpeed.value = 0
  lastUploadTime.value = 0
  lastUploadedBytes.value = 0

  try {
    // 生成缩略图
    const thumbnailFile = await generateThumbnail(selectedFile.value)

    // 上传原图
    uploadMessage.value = '正在上传原图...'
    const originalKey = selectedFile.value.name
    const originalResult = await uploadToR2({
      key: originalKey,
      file: selectedFile.value,
      overwrite: true,
      onProgress: (progress) => {
        uploadProgress.value = Math.round(progress / 2) // 原图占50%进度
        // 计算上传速度
        const uploadedBytes = (selectedFile.value?.size || 0) * (progress / 100)
        calculateUploadSpeed(uploadedBytes)
      },
    })

    if (!originalResult.success) {
      throw new Error(originalResult.message || '原图上传失败')
    }

    // 上传缩略图
    uploadMessage.value = '正在上传缩略图...'
    const thumbKey = thumbnailFile.name
    const thumbResult = await uploadToR2({
      key: thumbKey,
      file: thumbnailFile,
      overwrite: true,
      onProgress: (progress) => {
        uploadProgress.value = 50 + Math.round(progress / 2) // 缩略图占50%进度
        // 计算上传速度
        const totalOriginalSize = selectedFile.value?.size || 0
        const thumbnailSize = thumbnailFile.size
        const uploadedBytes = totalOriginalSize + thumbnailSize * (progress / 100)
        calculateUploadSpeed(uploadedBytes)
      },
    })

    if (thumbResult.success) {
      // 上传照片数据到后端API
      uploadMessage.value = '正在保存照片信息...'
      uploadProgress.value = 90

      // 导入API函数
      const { addPhoto } = await import('@/apis/photo/photoApi')

      // 准备照片数据
      const photoData: PhotoPO = {
        photoName: selectedFile.value.name,
        photoUrl: `https://zbj235.dpdns.org/${originalResult.key}`,
        thumbnailName: thumbnailFile.name,
        thumbnailUrl: `https://zbj235.dpdns.org/${thumbResult.key}`,
        exif: JSON.stringify(exifData.value || {}),
        maker: exifData.value?.Make || '',
        lat: exifData.value?.GPSLatitude ? String(convertGPSToDecimal(exifData.value.GPSLatitude, exifData.value.GPSLatitudeRef)) : '',
        lng: exifData.value?.GPSLongitude ? String(convertGPSToDecimal(exifData.value.GPSLongitude, exifData.value.GPSLongitudeRef)) : '',
        createDateTime: exifData.value?.DateTimeOriginal || new Date().toISOString().replace('Z', ''),
        spotName: scenicName.value, // 添加景区名称
      }

      // 调用API保存照片数据
      console.log('正在保存单张照片数据到API:', JSON.stringify(photoData, null, 2))
      try {
        const apiResult = await addPhoto(photoData)
        console.log('API响应:', apiResult)

        if (apiResult.data.code === 0) {
          uploadStatus.value = 'success'
          uploadMessage.value = `图片和缩略图上传成功! 照片ID: ${apiResult.data.data}`
          uploadProgress.value = 100

          // 3秒后重置状态
          setTimeout(() => {
            uploadStatus.value = 'idle'
            uploadMessage.value = ''
            uploadProgress.value = 0
          }, 3000)
        } else {
          throw new Error(apiResult.data.message || '保存照片信息失败')
        }
      } catch (apiError) {
        console.error('API调用错误详情:', apiError)
        // 检查是否是响应拦截器处理过的错误
        if (apiError instanceof Error) {
          throw apiError
        } else {
          throw new Error('保存照片信息时发生未知错误')
        }
      }
    } else {
      throw new Error(thumbResult.message || '缩略图上传失败')
    }
  } catch (error) {
    console.error('上传图片失败:', error)
    uploadStatus.value = 'error'
    uploadMessage.value = `上传失败: ${(error as any)?.message || '未知错误'}`
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.photo-update-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.upload-area:hover {
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.05);
}

.upload-placeholder {
  color: #606266;
}

.upload-icon {
  margin-bottom: 15px;
  color: #909399;
}

.upload-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.image-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
}

.image-info {
  margin: 10px 0;
  text-align: center;
  width: 100%;
}

.file-name {
  font-weight: 500;
  color: #303133;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 14px;
  color: #909399;
}

.image-actions {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.replace-btn {
  background-color: rgba(64, 158, 255, 0.8);
  color: white;
}

.replace-btn:hover {
  background-color: rgba(64, 158, 255, 1);
}

.clear-btn {
  background-color: rgba(245, 108, 108, 0.8);
  color: white;
}

.clear-btn:hover {
  background-color: rgba(245, 108, 108, 1);
}

.exif-info {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.exif-info h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.exif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.exif-item {
  display: flex;
  flex-direction: column;
}

.exif-label {
  font-weight: bold;
  color: #606266;
  margin-bottom: 5px;
}

.exif-value {
  color: #303133;
}

.file-url {
  margin-bottom: 10px;
}

.file-link {
  color: #409eff;
  word-break: break-all;
}

/* 批量处理相关样式 */
.mode-selector {
  display: flex;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.mode-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background-color: #f5f7fa;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
  font-weight: 500;
}

.mode-btn:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.mode-btn.active {
  background-color: #409eff;
  color: white;
}

.batch-upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.batch-upload-area:hover {
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.05);
}

.batch-files-preview {
  text-align: left;
}

.batch-files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.batch-files-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.batch-file-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
  position: relative;
}

.file-thumbnail {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  overflow: hidden;
  border-radius: 4px;
}

.file-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 12px;
  color: #909399;
}

.file-status {
  margin-right: 10px;
}

.status-pending {
  color: #909399;
}

.status-processing {
  color: #409eff;
}

.status-completed {
  color: #67c23a;
}

.status-error {
  color: #f56c6c;
}

.status-parsed {
  color: #67c23a;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #909399;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;
}

.remove-file-btn:hover {
  background-color: #f5f7fa;
  color: #f56c6c;
}

.batch-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.process-btn {
  background-color: #409eff;
  color: white;
}

.process-btn:hover:not(:disabled) {
  background-color: #66b1ff;
}

.process-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.add-more-btn {
  background-color: #67c23a;
  color: white;
}

.add-more-btn:hover {
  background-color: #85ce61;
}

.parse-btn {
  background-color: #e6a23c;
  color: white;
}

.parse-btn:hover:not(:disabled) {
  background-color: #ebb563;
}

.parse-btn:disabled {
  background-color: #f5dab1;
  cursor: not-allowed;
}

.progress-container {
  margin-top: 15px;
}

.progress-bar {
  height: 10px;
  background-color: #ebeef5;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background-color: #409eff;
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-text {
  font-size: 14px;
  color: #606266;
}

.upload-speed {
  font-size: 14px;
  color: #409eff;
  font-weight: 500;
}

.batch-results {
  margin-top: 30px;
}

.batch-exif-section {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.batch-exif-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.batch-exif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.exif-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.exif-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #ecf5ff;
  border-bottom: 1px solid #ebeef5;
}

.exif-card-header h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.toggle-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.toggle-btn:hover {
  background-color: #66b1ff;
}

.exif-card-body {
  padding: 15px;
}

.no-exif {
  color: #909399;
  font-style: italic;
}

.batch-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.result-card {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.result-header h4 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.error-badge {
  background-color: #f56c6c;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.success-badge {
  background-color: #67c23a;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  margin-bottom: 10px;
}

/* 提交相关样式 */
.submit-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

.submit-btn {
  background-color: #e6a23c;
  color: white;
  margin-bottom: 15px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #ebb563;
}

.submit-btn:disabled {
  background-color: #f5dab1;
  cursor: not-allowed;
}

.batch-submit-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.batch-submit-btn {
  background-color: #67c23a;
  color: white;
  margin-bottom: 15px;
}

.batch-submit-btn:hover:not(:disabled) {
  background-color: #85ce61;
}

.batch-submit-btn:disabled {
  background-color: #b3e19d;
  cursor: not-allowed;
}

.submit-status {
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 10px;
}

.submit-status.submitting {
  background-color: #ecf5ff;
  border: 1px solid #b3d8ff;
  color: #409eff;
}

.submit-status.success {
  background-color: #f0f9ff;
  border: 1px solid #b3e19d;
  color: #67c23a;
}

.submit-status.error {
  background-color: #fef0f0;
  border: 1px solid #fbc4c4;
  color: #f56c6c;
}

.status-message {
  font-weight: 500;
  margin-bottom: 10px;
}

/* 景区名字输入相关样式 */
.scenic-input-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.scenic-input-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 500;
  color: #606266;
}

.scenic-input {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.scenic-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
</style>

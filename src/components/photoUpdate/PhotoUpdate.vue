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

        <!-- 提交按钮 -->
        <div class="submit-section">
          <button @click="submitSinglePhoto" class="action-btn submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '提交中...' : '提交到服务器' }}
          </button>

          <!-- 提交状态 -->
          <div v-if="submitStatus !== 'idle'" class="submit-status" :class="submitStatus">
            <div class="status-message">{{ submitMessage }}</div>

            <!-- 进度条 -->
            <div v-if="submitStatus === 'submitting' && submitProgress > 0" class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${submitProgress}%` }"></div>
              </div>
              <div class="progress-text">{{ submitProgress }}%</div>
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
                <span v-if="file.status === 'pending'" class="status-pending">等待处理</span>
                <span v-else-if="file.status === 'processing'" class="status-processing">处理中...</span>
                <span v-else-if="file.status === 'completed'" class="status-completed">已完成</span>
                <span v-else-if="file.status === 'error'" class="status-error">处理失败</span>
              </div>
              <button @click.stop="removeFile(index)" class="remove-file-btn">✕</button>
            </div>
          </div>
          <div class="batch-actions">
            <button @click.stop="processBatchFiles" class="action-btn process-btn" :disabled="isProcessing || batchFiles.length === 0">
              {{ isProcessing ? `处理中 (${completedCount}/${batchFiles.length})` : '开始批量处理' }}
            </button>
            <button @click.stop="triggerBatchFileInput" class="action-btn add-more-btn">添加更多</button>
          </div>

          <!-- 进度条 -->
          <div v-if="isProcessing" class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
            </div>
            <div class="progress-text">{{ completedCount }} / {{ batchFiles.length }}</div>
          </div>
        </div>
      </div>

      <!-- 批量处理结果 -->
      <div v-if="batchResults.length > 0" class="batch-results">
        <h3>批量处理结果</h3>

        <!-- 批量提交按钮 -->
        <div class="batch-submit-section">
          <button @click="submitBatchPhotos" class="action-btn batch-submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '批量提交中...' : '批量提交到服务器' }}
          </button>

          <!-- 批量提交状态 -->
          <div v-if="submitStatus !== 'idle'" class="submit-status" :class="submitStatus">
            <div class="status-message">{{ submitMessage }}</div>

            <!-- 进度条 -->
            <div v-if="submitStatus === 'submitting'" class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${submitProgress}%` }"></div>
              </div>
              <div class="progress-text">{{ submitProgress }}%</div>
            </div>
          </div>
        </div>

        <div class="batch-results-grid">
          <div v-for="(result, index) in batchResults" :key="index" class="result-card">
            <div class="result-header">
              <h4>{{ result.fileName || `图片 ${index + 1}` }}</h4>
              <span v-if="result.error" class="error-badge">错误</span>
            </div>
            <div v-if="result.error" class="error-message">
              {{ result.error }}
            </div>
            <div v-else class="exif-grid">
              <div class="exif-item" v-for="(value, key) in formatExifData(result)" :key="key">
                <span class="exif-label">{{ key }}:</span>
                <span class="exif-value">{{ value }}</span>
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
import { readExifFromFile, formatExifData, processMultipleFiles } from '@/utils/exifr/exifr'

// 定义EXIF数据类型
interface ExifData {
  [key: string]: any
  error?: string | undefined
  fileName?: string | undefined
}

// 批量处理文件接口
interface BatchFile {
  file: File
  name: string
  size: number
  thumbnail: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  exifData?: ExifData
  error?: string
}

// 模式：单张或批量
const mode = ref<'single' | 'batch'>('single')

// 单张照片相关
const fileInput = ref<HTMLInputElement | null>(null)
const imageUrl = ref<string>('')
const exifData = ref<ExifData | null>(null)

// 批量处理相关
const batchFileInput = ref<HTMLInputElement | null>(null)
const batchFiles = ref<BatchFile[]>([])
const batchResults = ref<ExifData[]>([])
const isProcessing = ref(false)
const completedCount = ref(0)

// 提交相关
const isSubmitting = ref(false)
const submitProgress = ref(0)
const submitStatus = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const submitMessage = ref('')
const serverUrl = ref('http://localhost:3000/api/photos') // 服务器API地址

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

  // 创建图片URL
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string

    // 获取EXIF数据
    readExifFromFile(file)
      .then((output) => {
        console.log('EXIF数据:', output) // 添加调试日志
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
  if (batchFileInput.value) {
    batchFileInput.value.value = ''
  }
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 进度百分比
const progressPercentage = computed(() => {
  if (batchFiles.value.length === 0) return 0
  return Math.round((completedCount.value / batchFiles.value.length) * 100)
})

// 处理批量文件
const processBatchFiles = async () => {
  if (batchFiles.value.length === 0) return

  isProcessing.value = true
  completedCount.value = 0
  batchResults.value = []

  // 重置所有文件状态
  batchFiles.value.forEach((file) => {
    file.status = 'pending'
    file.exifData = undefined
    file.error = undefined
  })

  // 获取所有文件对象
  const files = batchFiles.value.map((item) => item.file)

  try {
    // 使用批量处理函数
    const results = await processMultipleFiles(files, (completed, total) => {
      completedCount.value = completed

      // 更新文件状态
      if (completed <= batchFiles.value.length) {
        batchFiles.value[completed - 1].status = 'completed'
      }

      // 如果还有文件在等待，设置下一个文件为处理中
      if (completed < total) {
        batchFiles.value[completed].status = 'processing'
      }
    })

    // 保存结果
    batchResults.value = results

    // 更新文件状态
    results.forEach((result, index) => {
      if (result.error) {
        batchFiles.value[index].status = 'error'
        batchFiles.value[index].error = result.error
      } else {
        batchFiles.value[index].exifData = result
      }
    })

    // 完成处理
    isProcessing.value = false
  } catch (error) {
    console.error('批量处理失败:', error)
    isProcessing.value = false
    alert('批量处理失败: ' + error)
  }
}

// 提交单张图片和EXIF信息到服务器
const submitSinglePhoto = async () => {
  if (!fileInput.value?.files || fileInput.value.files.length === 0) {
    alert('请先选择图片')
    return
  }

  const file = fileInput.value.files[0]

  if (!exifData.value) {
    alert('EXIF数据尚未加载完成')
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'submitting'
  submitMessage.value = '正在提交图片...'

  try {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('exifData', JSON.stringify(exifData.value))

    const response = await fetch(serverUrl.value, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`服务器响应错误: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()

    submitStatus.value = 'success'
    submitMessage.value = `图片提交成功! ID: ${result.id || '未知'}`

    // 3秒后重置状态
    setTimeout(() => {
      submitStatus.value = 'idle'
      submitMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('提交图片失败:', error)
    submitStatus.value = 'error'
    submitMessage.value = `提交失败: ${(error as any)?.message || '未知错误'}`
  } finally {
    isSubmitting.value = false
  }
}

// 提交批量图片和EXIF信息到服务器
const submitBatchPhotos = async () => {
  if (batchResults.value.length === 0) {
    alert('没有可提交的结果')
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'submitting'
  submitMessage.value = '正在批量提交图片...'
  submitProgress.value = 0

  try {
    const total = batchResults.value.length
    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    // 逐个提交图片
    for (let i = 0; i < total; i++) {
      const result = batchResults.value[i]

      // 跳过有错误的结果
      if (result.error) {
        errorCount++
        errors.push(`${result.fileName || `图片 ${i + 1}`}: ${result.error}`)
        continue
      }

      // 找到对应的文件
      const batchFile = batchFiles.value.find((f) => f.name === result.fileName)
      if (!batchFile) {
        errorCount++
        errors.push(`找不到文件: ${result.fileName || `图片 ${i + 1}`}`)
        continue
      }

      try {
        const formData = new FormData()
        formData.append('image', batchFile.file)
        formData.append('exifData', JSON.stringify(result))

        const response = await fetch(serverUrl.value, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`服务器响应错误: ${response.status} ${response.statusText}`)
        }

        successCount++
      } catch (error) {
        errorCount++
        errors.push(`${result.fileName || `图片 ${i + 1}`}: ${(error as any).message || '未知错误'}`)
      }

      // 更新进度
      submitProgress.value = Math.round(((i + 1) / total) * 100)
    }

    // 设置最终状态
    if (errorCount === 0) {
      submitStatus.value = 'success'
      submitMessage.value = `所有图片提交成功! 共 ${successCount} 张`
    } else {
      submitStatus.value = 'error'
      submitMessage.value = `部分图片提交失败: 成功 ${successCount} 张, 失败 ${errorCount} 张`
      console.error('提交错误:', errors)
    }

    // 5秒后重置状态
    setTimeout(() => {
      submitStatus.value = 'idle'
      submitMessage.value = ''
      submitProgress.value = 0
    }, 5000)
  } catch (error) {
    console.error('批量提交失败:', error)
    submitStatus.value = 'error'
    submitMessage.value = `批量提交失败: ${(error as any).message || '未知错误'}`
  } finally {
    isSubmitting.value = false
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
}

.image-preview img {
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
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

.progress-text {
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.batch-results {
  margin-top: 30px;
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
</style>

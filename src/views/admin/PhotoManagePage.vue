<template>
  <div class="photo-manage-container">
    <div class="filter-card">
      <form class="filter-form" @submit.prevent="handleSearch">
        <div class="form-group">
          <label for="spotName">景点名称</label>
          <select id="spotName" v-model="filterForm.spotName" class="form-input">
            <option value="">全部景点</option>
            <option v-for="spot in spotList" :key="spot.spotId" :value="spot.spotName">
              {{ spot.spotName }}
            </option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">查询</button>
          <button type="button" class="btn btn-default" @click="resetFilter">重置</button>
        </div>
      </form>
    </div>

    <div class="table-card">
      <div class="table-header">
        <button class="btn btn-primary" @click="showUploadDialog">上传照片</button>
        <button class="btn btn-primary" @click="showAddSpotDialog">添加景点</button>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <table v-else class="data-table" style="width: 100%">
        <thead>
          <tr>
            <th width="80">ID</th>
            <th>照片名称</th>
            <th width="120">照片</th>
            <th>景点名称</th>
            <th>拍摄者</th>
            <th width="180">拍摄时间</th>
            <th width="200">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in photoList" :key="item.photoId">
            <td>{{ item.photoId }}</td>
            <td>{{ item.photoName }}</td>
            <td>
              <div class="thumbnail-container">
                <img :src="item.thumbnailUrl" :alt="item.photoName" class="thumbnail-image" @click="previewImage(item.photoUrl)" @error="handleImageError" />
                <div v-if="!item.thumbnailUrl" class="image-error">
                  <span>无图片</span>
                </div>
              </div>
            </td>
            <td>{{ item.spotName }}</td>
            <td>{{ item.maker }}</td>
            <td>{{ item.createDateTime }}</td>
            <td>
              <button class="btn-link btn-link-primary" @click="handleEdit(item)">编辑</button>
              <button class="btn-link btn-link-primary" @click="handleView(item)">查看</button>
              <button class="btn-link btn-link-danger" @click="confirmDelete(item.photoId)">删除</button>
            </td>
          </tr>
          <tr v-if="photoList.length === 0">
            <td colspan="7" class="no-data">暂无数据</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-container">
        <div class="pagination-info">共 {{ pagination.total }} 条记录</div>
        <div class="pagination-controls">
          <select v-model="pagination.pageSize" class="page-size-select" @change="handleSizeChange">
            <option :value="10">10条/页</option>
            <option :value="20">20条/页</option>
            <option :value="30">30条/页</option>
            <option :value="50">50条/页</option>
          </select>

          <button class="page-btn" :disabled="pagination.page <= 1" @click="handleCurrentChange(pagination.page - 1)">上一页</button>

          <span class="page-numbers">
            <button v-for="pageNum in getPageNumbers()" :key="pageNum" class="page-number-btn" :class="{ active: pageNum === pagination.page }" @click="typeof pageNum === 'number' && handleCurrentChange(pageNum)">
              {{ pageNum }}
            </button>
          </span>

          <button class="page-btn" :disabled="pagination.page * pagination.pageSize >= pagination.total" @click="handleCurrentChange(pagination.page + 1)">下一页</button>

          <div class="page-jump">
            <span>前往</span>
            <input type="number" v-model.number="jumpPage" min="1" :max="Math.ceil(pagination.total / pagination.pageSize)" class="page-jump-input" />
            <span>页</span>
            <button class="page-btn" @click="jumpToPage">确定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加/编辑照片对话框 -->
    <div v-if="dialogVisible" class="modal-overlay" @click.self="dialogVisible = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ dialogType === 'add' ? '添加照片' : '编辑照片' }}</h3>
          <button class="close-btn" @click="dialogVisible = false">&times;</button>
        </div>

        <form class="photo-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="photoName">照片名称 <span class="required">*</span></label>
            <input type="text" id="photoName" v-model="photoForm.photoName" placeholder="请输入照片名称" class="form-input" required />
          </div>

          <div class="form-group">
            <label for="spotNameForm">景点名称 <span class="required">*</span></label>
            <select id="spotNameForm" v-model="photoForm.spotName" class="form-input" required>
              <option value="" disabled>请选择景点名称</option>
              <option v-for="spot in spotList" :key="spot.spotId" :value="spot.spotName">
                {{ spot.spotName }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="maker">拍摄者</label>
            <input type="text" id="maker" v-model="photoForm.maker" placeholder="请输入拍摄者" class="form-input" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="lat">纬度</label>
              <input type="text" id="lat" v-model="photoForm.lat" placeholder="纬度" class="form-input" />
            </div>
            <div class="form-separator">-</div>
            <div class="form-group">
              <label for="lng">经度</label>
              <input type="text" id="lng" v-model="photoForm.lng" placeholder="经度" class="form-input" />
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-default" @click="dialogVisible = false">取消</button>
            <button type="submit" class="btn btn-primary">确定</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 查看照片详情对话框 -->
    <div v-if="viewDialogVisible" class="modal-overlay" @click.self="viewDialogVisible = false">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h3>照片详情</h3>
          <button class="close-btn" @click="viewDialogVisible = false">&times;</button>
        </div>

        <div v-if="currentPhoto" class="photo-detail">
          <div class="photo-image">
            <img :src="currentPhoto.photoUrl" :alt="currentPhoto.photoName" class="detail-image" @error="handleDetailImageError" />
            <div v-if="!currentPhoto.photoUrl" class="image-error-large">
              <span>无法加载图片</span>
            </div>
          </div>

          <div class="photo-info">
            <div class="info-row">
              <div class="info-item">
                <span class="info-label">照片ID:</span>
                <span class="info-value">{{ currentPhoto.photoId }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">照片名称:</span>
                <span class="info-value">{{ currentPhoto.photoName }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">景点名称:</span>
                <span class="info-value">{{ currentPhoto.spotName }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">拍摄者:</span>
                <span class="info-value">{{ currentPhoto.maker }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">拍摄时间:</span>
                <span class="info-value">{{ currentPhoto.createDateTime }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">更新时间:</span>
                <span class="info-value">{{ currentPhoto.updateDateTime || '无' }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">经纬度:</span>
                <span class="info-value">{{ currentPhoto.lat || '无' }}, {{ currentPhoto.lng || '无' }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item full-width">
                <span class="info-label">照片URL:</span>
                <a :href="currentPhoto.photoUrl" target="_blank" class="info-link">{{ currentPhoto.photoUrl }}</a>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item full-width">
                <span class="info-label">缩略图URL:</span>
                <a :href="currentPhoto.thumbnailUrl" target="_blank" class="info-link">{{ currentPhoto.thumbnailUrl }}</a>
              </div>
            </div>

            <div class="info-row" v-if="currentPhoto.exif">
              <div class="info-item full-width">
                <span class="info-label">EXIF信息:</span>
                <div class="exif-container">
                  <pre>{{ formatExif(currentPhoto.exif) }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传照片对话框 -->
    <div v-if="uploadDialogVisible" class="modal-overlay" @click.self="uploadDialogVisible = false">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h3>上传照片</h3>
          <button class="close-btn" @click="uploadDialogVisible = false">&times;</button>
        </div>

        <div class="upload-content">
          <PhotoUpdate @upload-success="handleUploadSuccess" />
        </div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <div v-if="previewVisible" class="modal-overlay" @click.self="previewVisible = false">
      <div class="modal-content modal-preview">
        <div class="modal-header">
          <h3>图片预览</h3>
          <button class="close-btn" @click="previewVisible = false">&times;</button>
        </div>

        <div class="preview-content">
          <img :src="previewUrl" alt="预览图片" @error="handlePreviewError" />
          <div v-if="!previewUrl" class="image-error-large">
            <span>无法加载图片</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加景点对话框 -->
    <div v-if="addSpotDialogVisible" class="modal-overlay" @click.self="addSpotDialogVisible = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>添加景点</h3>
          <button class="close-btn" @click="addSpotDialogVisible = false">&times;</button>
        </div>

        <form class="spot-form" @submit.prevent="submitSpotForm">
          <div class="form-group">
            <label for="newSpotName">景点名称 <span class="required">*</span></label>
            <input type="text" id="newSpotName" v-model="spotForm.spotName" placeholder="请输入景点名称" class="form-input" required />
            <div class="input-hint">请输入准确的景点名称，该名称将用于照片分类</div>
          </div>

          <div class="form-group">
            <label for="newSpotDesc">景点描述</label>
            <textarea id="newSpotDesc" v-model="spotForm.spotDesc" placeholder="请输入景点描述，如景点特色、位置等信息" class="form-textarea" rows="4"></textarea>
            <div class="input-hint">景点描述有助于更好地管理和识别景点</div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-default" @click="addSpotDialogVisible = false">
              <i class="btn-icon-cancel"></i> 取消
            </button>
            <button type="submit" class="btn btn-primary">
              <i class="btn-icon-confirm"></i> 确定添加
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PhotoUpdate from '@/components/photoUpdate/PhotoUpdate.vue'
import { getPhotoList, getPhotosBySpotName, getPhotoById, updatePhoto, deletePhoto } from '@/apis/photo/photoApi'
import { getAllSpots, addSpot } from '@/apis/spotName/spotNameApi'
import type { PhotoVO, PhotoPO, PhotoDTO } from '@/apis/photo/photoTypes'
import type { Spot } from '@/apis/spotName/spotNameTypes'

// 筛选表单
const filterForm = reactive({
  spotName: '',
})

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

// 确保分页参数有效
if (pagination.page < 1) pagination.page = 1
if (pagination.pageSize < 1) pagination.pageSize = 10

// 跳转页码
const jumpPage = ref(1)

// 照片列表
const photoList = ref<PhotoVO[]>([])

// 景点列表
const spotList = ref<Spot[]>([])

// 加载状态
const loading = ref(false)

// 对话框控制
const dialogVisible = ref(false)
const viewDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
const previewVisible = ref(false)
const addSpotDialogVisible = ref(false)

// 对话框类型
const dialogType = ref<'add' | 'edit'>('add')

// 照片表单
const photoForm = reactive<PhotoPO>({
  photoName: '',
  photoUrl: '',
  thumbnailName: '',
  thumbnailUrl: '',
  exif: '',
  maker: '',
  lat: '',
  lng: '',
  spotName: '',
  createDateTime: '',
})

// 当前查看的照片
const currentPhoto = ref<PhotoDTO | null>(null)

// 预览图片URL
const previewUrl = ref('')

// 景点表单
const spotForm = reactive({
  spotName: '',
  spotDesc: ''
})

// 格式化后的日期时间（用于input[type="datetime-local"]）
const formattedDateTime = computed({
  get() {
    if (!photoForm.createDateTime) return ''
    // 将ISO格式转换为datetime-local需要的格式
    return photoForm.createDateTime.replace('Z', '')
  },
  set(value) {
    photoForm.createDateTime = value
  },
})

// 初始化加载数据
onMounted(() => {
  fetchPhotoList()
  fetchSpotList()
})

// 获取照片列表
const fetchPhotoList = async () => {
  loading.value = true
  try {
    // 确保分页参数有效
    if (pagination.page < 1) pagination.page = 1
    if (pagination.pageSize < 1) pagination.pageSize = 10

    console.log('开始获取照片列表，分页参数:', { page: pagination.page, pageSize: pagination.pageSize })

    let response
    if (filterForm.spotName) {
      console.log('根据景点名称查询:', filterForm.spotName)
      response = await getPhotosBySpotName(filterForm.spotName)
    } else {
      console.log('发送分页请求:', { page: pagination.page, pageSize: pagination.pageSize })
      response = await getPhotoList(pagination.page, pagination.pageSize)
    }

    console.log('API响应:', response)

    if (response && response.data && response.data.code === 0) {
      photoList.value = response.data.data || []
      pagination.total = response.data.data?.length || 0
      console.log('照片列表数据:', photoList.value)
      console.log('分页信息:', { total: pagination.total, page: pagination.page, pageSize: pagination.pageSize })
    } else {
      console.error('获取照片列表失败:', response?.data?.message || '未知错误')
      alert('获取照片列表失败: ' + (response?.data?.message || '未知错误'))
    }
  } catch (error) {
    console.error('获取照片列表异常:', error)
    alert('获取照片列表时发生异常: ' + (error instanceof Error ? error.message : '未知错误'))
  } finally {
    loading.value = false
  }
}

// 获取景点列表
const fetchSpotList = async () => {
  try {
    const response = await getAllSpots()
    if (response && response.data && response.data.code === 0) {
      spotList.value = response.data.data || []
      console.log('景点列表数据:', spotList.value)
    } else {
      console.error('获取景点列表失败:', response?.data?.message || '未知错误')
    }
  } catch (error) {
    console.error('获取景点列表异常:', error)
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  fetchPhotoList()
}

// 重置筛选条件
const resetFilter = () => {
  filterForm.spotName = ''
  handleSearch()
}

// 分页大小改变
const handleSizeChange = () => {
  pagination.page = 1
  fetchPhotoList()
}

// 页码改变
const handleCurrentChange = (page: number) => {
  pagination.page = page
  fetchPhotoList()
}

// 跳转到指定页
const jumpToPage = () => {
  if (jumpPage.value < 1) {
    jumpPage.value = 1
  } else if (jumpPage.value > Math.ceil(pagination.total / pagination.pageSize)) {
    jumpPage.value = Math.ceil(pagination.total / pagination.pageSize)
  }

  if (jumpPage.value !== pagination.page) {
    handleCurrentChange(jumpPage.value)
  }
}

// 获取页码数组
const getPageNumbers = () => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize)
  const current = pagination.page
  const delta = 2 // 当前页前后显示的页码数
  const range = []
  const rangeWithDots: (string | number)[] = []
  let l: number | null = null

  range.push(1)
  for (let i = current - delta; i <= current + delta; i++) {
    if (i > 1 && i < totalPages) {
      range.push(i)
    }
  }
  range.push(totalPages)

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
}

// 显示上传对话框
const showUploadDialog = () => {
  uploadDialogVisible.value = true
}

// 显示添加景点对话框
const showAddSpotDialog = () => {
  // 重置表单
  spotForm.spotName = ''
  spotForm.spotDesc = ''
  addSpotDialogVisible.value = true
}

// 处理上传成功
const handleUploadSuccess = () => {
  uploadDialogVisible.value = false
  fetchPhotoList() // 刷新列表
}

// 显示编辑对话框
const handleEdit = async (photo: PhotoVO) => {
  dialogType.value = 'edit'

  try {
    // 获取照片详细信息
    const response = await getPhotoById(photo.photoId)
    if (response.data.code === 0 && response.data.data) {
      const detail = response.data.data

      // 设置当前照片
      currentPhoto.value = detail

      // 填充表单
      photoForm.photoName = detail.photoName
      photoForm.maker = detail.maker
      photoForm.spotName = detail.spotName
      photoForm.lat = detail.lat
      photoForm.lng = detail.lng

      dialogVisible.value = true
    } else {
      console.error('获取照片详情失败:', response.data.message)
      alert('获取照片详情失败: ' + response.data.message)
    }
  } catch (error) {
    console.error('获取照片详情异常:', error)
    alert('获取照片详情时发生异常')
  }
}

// 显示查看对话框
const handleView = async (photo: PhotoVO) => {
  try {
    // 获取照片详细信息
    const response = await getPhotoById(photo.photoId)
    if (response.data.code === 0 && response.data.data) {
      currentPhoto.value = response.data.data
      viewDialogVisible.value = true
    } else {
      console.error('获取照片详情失败:', response.data.message)
    }
  } catch (error) {
    console.error('获取照片详情异常:', error)
  }
}

// 确认删除
const confirmDelete = (photoId: number) => {
  if (confirm('确定要删除这张照片吗？此操作不可撤销。')) {
    handleDelete(photoId)
  }
}

// 处理删除
const handleDelete = async (photoId: number) => {
  try {
    const response = await deletePhoto(photoId)
    if (response.data.code === 0) {
      // 删除成功，刷新列表
      if (photoList.value.length === 1 && pagination.page > 1) {
        pagination.page--
      }
      fetchPhotoList()
    } else {
      console.error('删除照片失败:', response.data.message)
      alert('删除照片失败: ' + response.data.message)
    }
  } catch (error) {
    console.error('删除照片异常:', error)
    alert('删除照片时发生异常')
  }
}

// 提交表单（添加/编辑）
const submitForm = async () => {
  try {
    if (dialogType.value === 'edit') {
      // 编辑模式
      const photoId = currentPhoto.value?.photoId
      if (!photoId) {
        alert('无法获取照片ID')
        return
      }

      // 只更新需要的字段
      const updateData = {
        photoName: photoForm.photoName,
        maker: photoForm.maker,
        spotName: photoForm.spotName,
        lat: photoForm.lat,
        lng: photoForm.lng,
        // 保留原有数据
        photoUrl: currentPhoto.value?.photoUrl || '',
        thumbnailName: currentPhoto.value?.thumbnailName || '',
        thumbnailUrl: currentPhoto.value?.thumbnailUrl || '',
        exif: currentPhoto.value?.exif || '',
        createDateTime: currentPhoto.value?.createDateTime || '',
      }

      const response = await updatePhoto(photoId, updateData)
      if (response.data.code === 0) {
        dialogVisible.value = false
        fetchPhotoList() // 刷新列表
      } else {
        console.error('更新照片失败:', response.data.message)
        alert('更新照片失败: ' + response.data.message)
      }
    }
  } catch (error) {
    console.error('提交表单异常:', error)
    alert('操作时发生异常')
  }
}

// 预览图片
const previewImage = (url: string) => {
  previewUrl.value = url
  previewVisible.value = true
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  const container = img.closest('.thumbnail-container')
  const errorDiv = container?.querySelector('.image-error') as HTMLElement
  if (errorDiv) {
    errorDiv.style.display = 'flex'
  }
}

// 处理详情图片加载错误
const handleDetailImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  const container = img.closest('.photo-image')
  const errorDiv = container?.querySelector('.image-error-large') as HTMLElement
  if (errorDiv) {
    errorDiv.style.display = 'flex'
  }
}

// 处理预览图片加载错误
const handlePreviewError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  const container = img.closest('.preview-content')
  const errorDiv = container?.querySelector('.image-error-large') as HTMLElement
  if (errorDiv) {
    errorDiv.style.display = 'flex'
  }
}

// 格式化EXIF信息
const formatExif = (exifString: string) => {
  try {
    const exifObj = JSON.parse(exifString)
    return JSON.stringify(exifObj, null, 2)
  } catch (error) {
    return exifString
  }
}

// 提交景点表单
const submitSpotForm = async () => {
  try {
    // 验证表单
    if (!spotForm.spotName.trim()) {
      alert('请输入景点名称')
      return
    }

    // 调用添加景点API
    const response = await addSpot({
      spotName: spotForm.spotName.trim(),
      spotDesc: spotForm.spotDesc.trim()
    })

    if (response && response.data && response.data.code === 0) {
      // 添加成功
      alert('添加景点成功')
      addSpotDialogVisible.value = false
      // 刷新景点列表
      fetchSpotList()
    } else {
      console.error('添加景点失败:', response?.data?.message || '未知错误')
      alert('添加景点失败: ' + (response?.data?.message || '未知错误'))
    }
  } catch (error) {
    console.error('添加景点异常:', error)
    alert('添加景点时发生异常: ' + (error instanceof Error ? error.message : '未知错误'))
  }
}
</script>

<style scoped>
.photo-manage-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.form-group label {
  font-weight: 500;
  color: #606266;
  font-size: 14px;
}

.form-input {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover {
  background-color: #66b1ff;
}

.btn-default {
  background-color: #f5f7fa;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.btn-default:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.btn-link {
  background: none;
  border: none;
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
  padding: 0 5px;
  text-decoration: none;
  margin-right: 10px;
}

.btn-link-primary {
  color: #409eff;
}

.btn-link-primary:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.btn-link-danger {
  color: #f56c6c;
}

.btn-link-danger:hover {
  color: #f78989;
  text-decoration: underline;
}

.table-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.data-table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

.data-table th,
.data-table td {
  border: 1px solid #ebeef5;
  padding: 12px;
  text-align: left;
}

.data-table th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 500;
}

.data-table tr:hover {
  background-color: #f5f7fa;
}

.no-data {
  text-align: center;
  color: #909399;
  padding: 20px;
}

.thumbnail-container {
  position: relative;
  width: 80px;
  height: 60px;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
}

.image-error {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 12px;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-info {
  color: #606266;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-size-select {
  padding: 5px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.page-btn {
  padding: 5px 10px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  color: #409eff;
  border-color: #409eff;
}

.page-btn:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-number-btn {
  min-width: 30px;
  height: 30px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.page-number-btn:hover {
  color: #409eff;
  border-color: #409eff;
}

.page-number-btn.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-jump-input {
  width: 50px;
  padding: 5px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-large {
  max-width: 900px;
}

.modal-preview {
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #909399;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.close-btn:hover {
  background-color: #f5f7fa;
  color: #606266;
}

.photo-form {
  padding: 20px;
}

.form-textarea {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.form-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.form-separator {
  margin-bottom: 8px;
  color: #606266;
}

.required {
  color: #f56c6c;
}

.photo-detail {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.photo-image {
  flex: 1;
  max-width: 50%;
}

.detail-image {
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.image-error-large {
  display: none;
  width: 100%;
  height: 300px;
  background-color: #f5f7fa;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  color: #909399;
}

.photo-info {
  flex: 1;
}

.info-row {
  display: flex;
  margin-bottom: 15px;
  gap: 20px;
}

.info-item {
  flex: 1;
}

.info-item.full-width {
  flex: 100%;
}

.info-label {
  font-weight: 500;
  color: #606266;
  margin-right: 10px;
  min-width: 100px;
  display: inline-block;
}

.info-value {
  color: #303133;
}

.info-link {
  color: #409eff;
  word-break: break-all;
}

.exif-container {
  margin-top: 10px;
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.exif-container pre {
  margin: 0;
  white-space: pre-wrap;
  font-size: 12px;
  color: #606266;
}

.upload-content {
  padding: 20px;
}

.preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.preview-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 添加景点对话框样式优化 */
.spot-form {
  padding: 20px;
}

.input-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
  line-height: 1.4;
}

.btn-icon-cancel::before {
  content: "✕";
  margin-right: 5px;
}

.btn-icon-confirm::before {
  content: "✓";
  margin-right: 5px;
}

.spot-form .form-actions {
  margin-top: 25px;
  justify-content: flex-end;
}
</style>

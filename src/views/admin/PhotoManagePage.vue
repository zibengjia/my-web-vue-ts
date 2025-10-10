<template>
  <div class="photo-manage-container">
    <div class="filter-card">
      <form class="filter-form" @submit.prevent="handleSearch">
        <div class="form-group">
          <label for="spotName">景点名称</label>
          <input 
            type="text" 
            id="spotName" 
            v-model="filterForm.spotName" 
            placeholder="请输入景点名称" 
            class="form-input"
          />
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
                <img 
                  :src="item.thumbnailUrl" 
                  :alt="item.photoName"
                  class="thumbnail-image"
                  @click="previewImage(item.photoUrl)"
                  @error="handleImageError"
                />
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
        <div class="pagination-info">
          共 {{ pagination.total }} 条记录
        </div>
        <div class="pagination-controls">
          <select 
            v-model="pagination.pageSize" 
            class="page-size-select"
            @change="handleSizeChange"
          >
            <option :value="10">10条/页</option>
            <option :value="20">20条/页</option>
            <option :value="30">30条/页</option>
            <option :value="50">50条/页</option>
          </select>

          <button 
            class="page-btn" 
            :disabled="pagination.page <= 1"
            @click="handleCurrentChange(pagination.page - 1)"
          >
            上一页
          </button>

          <span class="page-numbers">
            <button 
              v-for="pageNum in getPageNumbers()" 
              :key="pageNum"
              class="page-number-btn"
              :class="{ active: pageNum === pagination.page }"
              @click="handleCurrentChange(pageNum)"
            >
              {{ pageNum }}
            </button>
          </span>

          <button 
            class="page-btn" 
            :disabled="pagination.page * pagination.pageSize >= pagination.total"
            @click="handleCurrentChange(pagination.page + 1)"
          >
            下一页
          </button>

          <div class="page-jump">
            <span>前往</span>
            <input 
              type="number" 
              v-model.number="jumpPage" 
              min="1" 
              :max="Math.ceil(pagination.total / pagination.pageSize)"
              class="page-jump-input"
            />
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

            <input 
              type="text" 
              id="photoName" 
              v-model="photoForm.photoName" 
              placeholder="请输入照片名称" 
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="photoUrl">照片URL <span class="required">*</span></label>
            <input 
              type="text" 
              id="photoUrl" 
              v-model="photoForm.photoUrl" 
              placeholder="请输入照片URL" 
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="thumbnailUrl">缩略图URL <span class="required">*</span></label>
            <input 
              type="text" 
              id="thumbnailUrl" 
              v-model="photoForm.thumbnailUrl" 
              placeholder="请输入缩略图URL" 
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="spotNameForm">景点名称 <span class="required">*</span></label>
            <input 
              type="text" 
              id="spotNameForm" 
              v-model="photoForm.spotName" 
              placeholder="请输入景点名称" 
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="maker">拍摄者</label>
            <input 
              type="text" 
              id="maker" 
              v-model="photoForm.maker" 
              placeholder="请输入拍摄者" 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="createDateTime">拍摄时间</label>
            <input 
              type="datetime-local" 
              id="createDateTime" 
              v-model="formattedDateTime" 
              class="form-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="lat">纬度</label>
              <input 
                type="text" 
                id="lat" 
                v-model="photoForm.lat" 
                placeholder="纬度" 
                class="form-input"
              />
            </div>
            <div class="form-separator">-</div>
            <div class="form-group">
              <label for="lng">经度</label>
              <input 
                type="text" 
                id="lng" 
                v-model="photoForm.lng" 
                placeholder="经度" 
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="exif">EXIF信息</label>
            <textarea 
              id="exif" 
              v-model="photoForm.exif" 
              rows="3" 
              placeholder="请输入EXIF信息" 
              class="form-textarea"
            ></textarea>
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
            <img 
              :src="currentPhoto.photoUrl" 
              :alt="currentPhoto.photoName"
              class="detail-image"
              @error="handleDetailImageError"
            />
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
                <span class="info-value">{{ currentPhoto.updateDateTime }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">经纬度:</span>
                <span class="info-value">{{ currentPhoto.lat }}, {{ currentPhoto.lng }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">缩略图名称:</span>
                <span class="info-value">{{ currentPhoto.thumbnailName }}</span>
              </div>
            </div>

            <div class="info-row full-width">
              <div class="info-item">
                <span class="info-label">EXIF信息:</span>
                <span class="info-value">{{ currentPhoto.exif || '无' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-default" @click="viewDialogVisible = false">关闭</button>
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
        
        <div class="upload-dialog-body">
          <PhotoUpdate @upload-complete="handleUploadComplete" />
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
    <div v-if="previewVisible" class="image-preview-overlay" @click.self="previewVisible = false">
      <div class="image-preview-container">
        <img :src="previewImageUrl" alt="图片预览" class="preview-image" />
        <button class="preview-close-btn" @click="previewVisible = false">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import PhotoUpdate from '@/components/photoUpdate/PhotoUpdate.vue';
import { 
  getPhotoList, 
  addPhoto, 
  updatePhoto, 
  deletePhoto, 
  getPhotoById,
  getPhotosBySpotName
} from '@/apis/photo/photoApi';
import type { PhotoVO, PhotoPO, PhotoDTO } from '@/apis/photo/photoTypes';

// 筛选表单
const filterForm = reactive({
  spotName: ''
});

// 分页参数
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
});

// 照片列表
const photoList = ref<PhotoVO[]>([]);
const loading = ref(false);

// 对话框相关
const dialogVisible = ref(false);
const dialogType = ref<'add' | 'edit'>('add');

// 上传对话框相关
const uploadDialogVisible = ref(false);
const photoForm = reactive<Partial<PhotoPO> & { photoId?: number }>({
  maker: '',
  lat: '',
  lng: '',
  spotName: ''
});

// 格式化日期时间，用于datetime-local输入
const formattedDateTime = computed({
  get: () => {
    if (!photoForm.createDateTime) return '';
    // 将 "YYYY-MM-DD HH:mm:ss" 格式转换为 "YYYY-MM-DDTHH:mm" 格式
    return photoForm.createDateTime.replace(' ', 'T');
  },
  set: (value) => {
    // 将 "YYYY-MM-DDTHH:mm" 格式转换为 "YYYY-MM-DD HH:mm:ss" 格式
    photoForm.createDateTime = value.replace('T', ' ') + ':00';
  }
});

// 查看详情对话框
const viewDialogVisible = ref(false);
const currentPhoto = ref<PhotoDTO | null>(null);

// 图片预览相关
const previewVisible = ref(false);
const previewImageUrl = ref('');

// 页面跳转相关
const jumpPage = ref(1);

// 获取照片列表
const fetchPhotoList = async () => {
  loading.value = true;
  try {
    const res = await getPhotoList(pagination.page, pagination.pageSize);
    if (res.data.code === 0) {
      photoList.value = res.data.data || [];
      pagination.total = res.data.data?.length || 0;
    } else {
      alert(res.data.message || '获取照片列表失败');
    }
  } catch (error) {
    console.error('获取照片列表失败:', error);
    alert('获取照片列表失败');
  } finally {
    loading.value = false;
  }
};

// 根据景点名称查询照片
const searchBySpotName = async () => {
  if (!filterForm.spotName) {
    fetchPhotoList();
    return;
  }

  loading.value = true;
  try {
    const res = await getPhotosBySpotName(filterForm.spotName);
    if (res.data.code === 0) {
      photoList.value = res.data.data || [];
      pagination.total = res.data.data?.length || 0;
    } else {
      alert(res.data.message || '查询失败');
    }
  } catch (error) {
    console.error('查询失败:', error);
    alert('查询失败');
  } finally {
    loading.value = false;
  }
};

// 查询
const handleSearch = () => {
  pagination.page = 1;
  searchBySpotName();
};

// 重置筛选条件
const resetFilter = () => {
  filterForm.spotName = '';
  pagination.page = 1;
  fetchPhotoList();
};

// 分页大小变化
const handleSizeChange = () => {
  pagination.page = 1;
  fetchPhotoList();
};

// 当前页变化
const handleCurrentChange = (page: number) => {
  pagination.page = page;
  fetchPhotoList();
};

// 获取页码列表
const getPageNumbers = () => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const currentPage = pagination.page;
  const pages = [];

  // 最多显示5个页码
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

// 跳转到指定页
const jumpToPage = () => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  if (jumpPage.value >= 1 && jumpPage.value <= totalPages) {
    handleCurrentChange(jumpPage.value);
  } else {
    jumpPage.value = pagination.page;
  }
};

// 添加照片
const handleAdd = () => {
  dialogType.value = 'add';
  resetForm();
  dialogVisible.value = true;
};

// 显示上传对话框
const showUploadDialog = () => {
  uploadDialogVisible.value = true;
};

// 处理上传完成
const handleUploadComplete = () => {
  uploadDialogVisible.value = false;
  // 刷新照片列表
  fetchPhotoList();
};

// 编辑照片
const handleEdit = async (row: PhotoVO) => {
  dialogType.value = 'edit';

  // 获取照片详情
  try {
    const res = await getPhotoById(row.photoId);
    if (res.data.code === 0 && res.data.data) {
      const photoData = res.data.data;
      Object.assign(photoForm, {
        maker: photoData.maker,
        lat: photoData.lat,
        lng: photoData.lng,
        spotName: photoData.spotName
      });
      // 保存当前编辑的照片ID
      photoForm.photoId = photoData.photoId;
      dialogVisible.value = true;
    } else {
      alert(res.data.message || '获取照片详情失败');
    }
  } catch (error) {
    console.error('获取照片详情失败:', error);
    alert('获取照片详情失败');
  }
};

// 查看照片详情
const handleView = async (row: PhotoVO) => {
  try {
    const res = await getPhotoById(row.photoId);
    if (res.data.code === 0) {
      currentPhoto.value = res.data.data;
      viewDialogVisible.value = true;
    } else {
      alert(res.data.message || '获取照片详情失败');
    }
  } catch (error) {
    console.error('获取照片详情失败:', error);
    alert('获取照片详情失败');
  }
};

// 确认删除
const confirmDelete = (photoId: number) => {
  if (confirm('确定删除这张照片吗？')) {
    handleDelete(photoId);
  }
};

// 删除照片
const handleDelete = async (photoId: number) => {
  try {
    const res = await deletePhoto(photoId);
    if (res.data.code === 0) {
      alert('删除成功');
      fetchPhotoList();
    } else {
      alert(res.data.message || '删除失败');
    }
  } catch (error) {
    console.error('删除失败:', error);
    alert('删除失败');
  }
};

// 提交表单
const submitForm = async () => {
  // 表单验证
  if (!photoForm.spotName) {
    alert('请输入景点名称');
    return;
  }

  try {
    let res;
    if (dialogType.value === 'add') {
      // 创建符合PhotoPO类型的数据对象
      const photoData: PhotoPO = {
        photoName: photoForm.photoName,
        photoUrl: photoForm.photoUrl,
        thumbnailName: photoForm.thumbnailName,
        thumbnailUrl: photoForm.thumbnailUrl,
        exif: photoForm.exif,
        maker: photoForm.maker,
        lat: photoForm.lat,
        lng: photoForm.lng,
        spotName: photoForm.spotName,
        createDateTime: photoForm.createDateTime
      };
      res = await addPhoto(photoData);
    } else {
      // 编辑时需要photoId
      if (!photoForm.photoId) {
        alert('缺少照片ID');
        return;
      }
      // 只更新部分字段：maker, lat, lng, spotName
      const photoData: Partial<PhotoPO> = {
        maker: photoForm.maker,
        lat: photoForm.lat,
        lng: photoForm.lng,
        spotName: photoForm.spotName
      };
      res = await updatePhoto(photoForm.photoId, photoData as PhotoPO);
    }

    if (res.data.code === 0) {
      alert(dialogType.value === 'add' ? '添加成功' : '更新成功');
      dialogVisible.value = false;
      fetchPhotoList();
    } else {
      alert(res.data.message || (dialogType.value === 'add' ? '添加失败' : '更新失败'));
    }
  } catch (error) {
    console.error(dialogType.value === 'add' ? '添加失败:' : '更新失败:', error);
    alert(dialogType.value === 'add' ? '添加失败' : '更新失败');
  }
};

// 重置表单
const resetForm = () => {
  Object.assign(photoForm, {
    maker: '',
    lat: '',
    lng: '',
    spotName: ''
  });
  // 移除photoId属性
  if ('photoId' in photoForm) {
    delete photoForm.photoId;
  }
};

// 图片预览
const previewImage = (url: string) => {
  previewImageUrl.value = url;
  previewVisible.value = true;
};

// 处理图片加载错误
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
  const parent = target.parentElement;
  if (parent) {
    const errorDiv = parent.querySelector('.image-error');
    if (errorDiv) {
      errorDiv.style.display = 'flex';
    }
  }
};

// 处理详情图片加载错误
const handleDetailImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
  const parent = target.parentElement;
  if (parent) {
    const errorDiv = parent.querySelector('.image-error-large');
    if (errorDiv) {
      errorDiv.style.display = 'flex';
    }
  }
};

// 初始化
onMounted(() => {
  fetchPhotoList();
});
</script>

<style scoped>
.photo-manage-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.filter-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  align-items: center;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
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
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
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
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.btn-default:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.btn-link {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.btn-link-primary {
  color: #409eff;
}

.btn-link-primary:hover {
  color: #66b1ff;
}

.btn-link-danger {
  color: #f56c6c;
}

.btn-link-danger:hover {
  color: #f78989;
}

.table-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.table-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-table {
  border-collapse: collapse;
  width: 100%;
}

.data-table th, .data-table td {
  border: 1px solid #ebeef5;
  padding: 12px;
  text-align: left;
}

.data-table th {
  background-color: #f5f7fa;
  font-weight: 500;
  color: #909399;
}

.data-table tr:nth-child(even) {
  background-color: #fafafa;
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
  height: 80px;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  color: #909399;
  border-radius: 4px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 6px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
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
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number-btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
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
  padding: 6px;
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
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #409eff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 模态框样式 */
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
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-large {
  width: 700px;
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
  font-weight: 500;
  color: #303133;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #909399;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #606266;
}

.photo-form {
  padding: 20px;
}

.form-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.form-row .form-group {
  flex: 1;
}

.form-separator {
  padding-bottom: 8px;
  color: #606266;
}

.required {
  color: #f56c6c;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: flex-end;
}

.photo-detail {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.photo-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  min-height: 200px;
  position: relative;
}

.detail-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.image-error-large {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: #f5f7fa;
  color: #909399;
}

.photo-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  gap: 20px;
}

.info-row.full-width .info-item {
  flex: 1;
}

.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-label {
  font-size: 14px;
  color: #909399;
}

.info-value {
  font-size: 14px;
  color: #303133;
  word-break: break-word;
}

/* 上传对话框样式 */
.upload-dialog-body {
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

/* 图片预览样式 */
.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.image-preview-container {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.preview-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.preview-close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
  transition: color 0.3s;
}

.preview-close-btn:hover {
  color: #409eff;
}
</style>

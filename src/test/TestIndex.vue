<template>
  <MdPreview :id="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'
import { getArticleDetail } from '@/apis/article/articleApi'

const id = 'preview-only'
const text = ref('# Hello Editor/Viewer\n\n## Hello World')
const scrollElement = document.documentElement

//获取文章详情
const fetchArticleDetail = async () => {
  try {
    text.value = (await getArticleDetail(7)).data.data.contentMd
    console.log('文章md内容', text.value)
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}
onMounted(() => {
  fetchArticleDetail()
})
</script>

<template>
  <div class="article-wrapper">
    <ArticleCard v-for="article in articles" :key="article.articleId" :articlePre="article" :expandedArticleId="expandedArticleId" @cardClick="handleClick(article.articleId)" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
const ArticleCard = defineAsyncComponent(() => import('@/components/articleCard/ArticleCard.vue'))
import { type ArticlePageItem } from '@/apis/article/articleTypes'
import { getArticles } from '@/apis/article/articleApi'

const articles = ref<ArticlePageItem[]>([])
const expandedArticleId = ref<number>(0)
const fetchArticles = async () => {
  try {
    articles.value = (await getArticles(1, 4)).data.data
  } catch (error) {
    console.error('获取文章列表失败', error)
  }
}

const handleClick = (articleId: number) => {
  console.log('点击了文章', articleId)
  expandedArticleId.value = expandedArticleId.value === articleId ? 0 : articleId
}

onMounted(() => {
  fetchArticles()
})
</script>
<style scoped lang="scss">
.article-wrapper {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
}
.collapsed {
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
  margin: 0 !important;
  padding: 0 !important;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
</style>

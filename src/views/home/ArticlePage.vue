<template>
  <div class="article-wrapper">
    <ArticleCard />
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/articleCard/ArticleCard.vue'
</script>
<style scoped lang="scss">
.article-wrapper {
  background-color: #f6f6f6;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}
</style>

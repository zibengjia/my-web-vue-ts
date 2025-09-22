<template>
  <div class="article-wrapper">
    <ArticleCard />
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/articleCard/articleCard.vue'
</script>
<style scoped lang="scss">
.article-wrapper {
  position: relative;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f6f6f6;
  font-family: Helvetica;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>

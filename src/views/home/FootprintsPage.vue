<template>
  <div class="footprints-page">
    <AMap />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUIStore } from '@/stores/uiStore'
import AMap from '@/components/BaiduMap/AMap.vue'

// 使用Pinia store控制TopNavBar显示/隐藏
const uiStore = useUIStore()

// 在组件挂载时隐藏TopNavBar
onMounted(() => {
  uiStore.toggleTopNav(false)
})

// 在组件卸载时显示TopNavBar
onUnmounted(() => {
  uiStore.toggleTopNav(true)
})
</script>

<style scoped></style>

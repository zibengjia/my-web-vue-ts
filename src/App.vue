<template>
  <div id="app">
    <div id="teleport-target"></div>
    <router-view />
    <DynamicIslandNotification />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const DynamicIslandNotification = defineAsyncComponent(() => import('@/components/DynamicIslandNotification.vue'))
</script>

<style lang="scss" scoped>
/* 样式内容 */
</style>

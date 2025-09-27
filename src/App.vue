<template>
  <div id="app">
    <router-view />
    <DynamicIslandNotification />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const DynamicIslandNotification = defineAsyncComponent(() => import('@/components/DynamicIslandNotification.vue'))
</script>

<style lang="scss" scoped>
@use '@/styles/index.scss';
</style>
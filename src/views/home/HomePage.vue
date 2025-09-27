<template>
  <IntroductionPart />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const IntroductionPart = defineAsyncComponent(() => import('@/components/introduction/IntroductionPart.vue'))
</script>
<style scoped></style>
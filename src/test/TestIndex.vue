<template>
  <div class="background"></div>
  <IntroductionText />
</template>

<script setup lang="ts">
import IntroductionText from '@/components/introduction/IntroductionText.vue'
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background1.png') no-repeat fixed;
  background-size: cover;
  filter: blur(5px);
}
</style>

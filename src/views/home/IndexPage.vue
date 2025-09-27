<template>
  <header>
    <TopNavBar />
  </header>
  <main>
    <div class="background"></div>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const TopNavBar = defineAsyncComponent(() => import('@/components/TopNavBar.vue'))
</script>
<style scoped lang="scss">
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background1.png') no-repeat fixed;
  background-size: cover;
  filter: blur(5px);
}
</style>
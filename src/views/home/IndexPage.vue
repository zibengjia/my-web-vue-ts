<template>
  <header>
    <TopBanner />
    <TopNavBar />
  </header>

  <main>
    <div class="background"></div>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import TopNavBar from '@/components/TopNavBar.vue'
import TopBanner from '@/components/TopBanner.vue'
</script>
<style scoped lang="scss">
.background {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/image copy.png') no-repeat fixed;
  background-size: cover;
  filter: blur(5px);
}
</style>

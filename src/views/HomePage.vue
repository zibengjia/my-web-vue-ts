<template>
  <header>
    <TopBanner />
    <TopNavBar />
  </header>

  <main>
    <h1>home</h1>
    <button @click="handleClick">灵动岛</button>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import TopNavBar from '@/components/TopNavBar.vue'
import TopBanner from '@/components/TopBanner.vue'
const handleClick = () => {
  window.$dynamicIsland?.info('hello', 'test')
}
</script>

<style scoped lang="scss"></style>

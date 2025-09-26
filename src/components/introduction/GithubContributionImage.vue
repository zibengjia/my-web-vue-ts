<template>
  <div class="githubChart">
    <img src="https://ghchart.rshah.org/zibengjia" alt="zibengjia's githubChart" />
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
//FIXME:用img做权宜之计，以后再优化
.githubChart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>

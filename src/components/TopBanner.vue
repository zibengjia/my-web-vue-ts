<template>
  <div class="banner" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter" @mouseout="handleMouseOut">
    <div><img src="@/assets/bilibili-autumn/bilibili-autumn-1.png" /></div>
    <div><img src="@/assets/bilibili-autumn/bilibili-autumn-2.png" /></div>
    <div><img src="@/assets/bilibili-autumn/bilibili-autumn-3.png" /></div>
    <div><img src="@/assets/bilibili-autumn/bilibili-autumn-4.png" /></div>
    <div><img src="@/assets/bilibili-autumn/bilibili-autumn-5.png" /></div>
    <div><img src="@/assets/bilibili-autumn/bilibili-autumn-6.png" /></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
const images = ref<HTMLImageElement[]>([])
const startingX = ref<number>(0)
const movingPercentage = ref<number>(0)
const windowWidth = ref<number>(0)
const handleMouseMove = (e: MouseEvent) => {
  movingPercentage.value = (e.clientX - startingX.value) / window.outerWidth
  let offset = movingPercentage.value * (windowWidth.value * 0.04) //最大偏移量（px）
  const blur = 16 //最大模糊值（px）

  images.value.forEach((image, index) => {
    offset *= 1.3
    const blurValue = Math.pow(index / images.value.length - (movingPercentage.value + 0.5), 2) * blur

    image.style.setProperty('--offset', `${offset}px`)
    image.style.setProperty('--blur', `${blurValue}px`)
  })
}

const handleMouseEnter = (e: MouseEvent) => {
  startingX.value = e.clientX
  images.value.forEach((image) => {
    image.classList.add('moving')
  })
}

const handleMouseOut = () => {
  images.value.forEach((image) => {
    image.style.setProperty('--offset', '0px')
    image.style.setProperty('--blur', '2px')
    image.classList.remove('moving')
  })
}
onMounted(() => {
  // 获取所有图片元素
  images.value = Array.from(document.querySelectorAll('div.banner > div > img')) as HTMLImageElement[]

  windowWidth.value = window.innerWidth
})
onUnmounted(() => {})
</script>

<style scoped lang="scss">
.banner {
  height: 200px;
  position: relative;
  overflow: hidden;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 108%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;
    --offset: 0px;
    --blur: 2px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s ease-in;
      transform: translatex(var(--offset));
      filter: blur(var(--blur));
    }
    & .moving {
      transition: none;
    }
  }
}
</style>

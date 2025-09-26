<template>
  <!--svg滤镜-->
  <svg style="display: none">
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
      <!-- Seeds: 14, 17,  -->

      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>

      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

      <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lighting-color="white" result="specLight">
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>

      <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />

      <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>

  <div class="wrapper" :class="{ scrolledBefore: ScrolledBefore, loading: isLoading }">
    <div class="liquidGlass-wrapper">
      <div class="liquidGlass-effect"></div>
      <div class="liquidGlass-tint"></div>
      <div class="liquidGlass-shine"></div>
      <div class="liquidGlass-text navbar">
        <!-- 左侧logo-->
        <div class="navbar-logo">
          <svg id="logo" width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink">
            <path d="M79.8 3H18.2C10.9098 3 5 8.90984 5 16.2V77.8C5 85.0902 10.9098 91 18.2 91H79.8C87.0902 91 93 85.0902 93 77.8V16.2C93 8.90984 87.0902 3 79.8 3Z" fill="#FF6B6B" />
            <path d="M19.5833 27.4167H31.3333H43.0833L19.5833 66.5833H43.0833" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
            <path
              d="M48.5667 27.4167V66.5833ZM48.5667 27.4167C57.9667 27.4167 62.6667 30.0278 62.6667 35.25C62.6667 40.4722 57.9667 43.0833 48.5667 43.0833M48.5667 43.0833C57.9667 43.0833 62.6667 45.6944 62.6667 50.9167C62.6667 61.3611 57.9667 66.5833 48.5667 66.5833"
              stroke="white"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path d="M66.5833 27.4167H77.55V50.9167C77.55 61.3611 73.8945 66.5833 66.5833 66.5833" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <!--中间导航内容-->
        <nav class="navbar-item">
          <li v-for="(navItem, index) in navItems" :key="index">
            <RouterLink :to="navItem.path" ref="link">{{ navItem.name }}</RouterLink>
          </li>
        </nav>

        <!-- 右侧操作按钮 -->
        <div class="navbar-right">right</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { homeRoutes } from '@/router/routes/homeRoutes'

const routes = reactive([...(homeRoutes.children || [])])
const navItems = routes.map((route) => ({
  name: route.meta?.title,
  path: route.path,
}))
const link = ref<HTMLElement[]>([])
const ScrolledBefore = ref(true)
const isLoading = ref(true)
const handleScroll = () => {
  ScrolledBefore.value = window.scrollY < 200
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  position: fixed;
  margin: auto;
  top: 10px;
  left: 0;
  right: 0;
  padding: 0 1rem;
  z-index: 1000;
  transition: all 0.6s ease;

  //BUG: 3d动画会使svg滤镜失效
  &.loading {
    .liquidGlass-wrapper {
      opacity: 0;
      animation: scaleIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  }
}
/* Liquid Glass 效果相关样式 */
//NOTE:可以参考apple的官网效果
.liquidGlass-wrapper {
  width: 100%;
  max-width: 80rem;
  height: 4.5rem;
  margin: 0 auto;
  padding: 0.1rem 0.4rem;
  position: relative;
  display: flex;
  font-weight: 600;
  overflow: hidden;
  border-radius: 50px;
  box-shadow:
    0 6px 6px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(0, 0, 0, 0.05);

  transition:
    all 0.6s cubic-bezier(0.175, 0.885, 0.32, 2.2),
    padding 0.6s ease,
    border-radius 0.6s ease;

  &:hover {
    padding: 0 0rem;
    border-radius: 36px;
  }
  .liquidGlass-effect {
    position: absolute;
    z-index: 0;
    inset: 0;
    filter: url(#glass-distortion);
    backdrop-filter: blur(10px);
    overflow: hidden;
  }

  .liquidGlass-tint {
    z-index: 1;
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
  }

  .liquidGlass-shine {
    position: absolute;
    inset: 0;
    z-index: 2;
    overflow: hidden;
    box-shadow:
      inset 2px 4px 4px rgba(255, 255, 255, 0.2),
      inset 5px 5px 11px -14px rgba(255, 255, 255, 0.2),
      inset -1px -2px 4px rgba(255, 255, 255, 0.25),
      inset -5px -7px 20px -7px rgba(255, 255, 255, 0.2),
      inset -2px -4px 88px 0px rgba(255, 255, 255, 0.1),
      inset 1.67px 3.33px 88px 0px rgba(0, 0, 0, 0.1);
  }

  .liquidGlass-text {
    z-index: 3;
    font-size: 2rem;
  }
}

.scrolledBefore {
  pointer-events: none;
  border-radius: 1rem;
  padding-top: 1rem;

  .liquidGlass-wrapper {
    pointer-events: none;
    box-shadow: none;

    padding: 2rem 0.4rem;

    // 初始状态
    .liquidGlass-effect,
    .liquidGlass-tint,
    .liquidGlass-shine {
      opacity: 0;
      transition: opacity 0.6s ease;
    }
  }
  .liquidGlass-text {
    pointer-events: none;
    .navbar-item {
      pointer-events: none;

      li {
        a {
          pointer-events: auto;
        }
      }
    }
  }
}

/* 导航栏布局样式 */
.navbar {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.4rem;
  padding-right: 1rem;
}

/* Logo 样式 */
.navbar-logo {
  height: 60px;
}

#logo {
  height: 100%;
}

/* 导航项样式 */
.navbar-item {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  li {
    list-style: none;

    a {
      width: 4rem;
      text-decoration: none;
      color: black;
    }
  }
}

/* 右侧操作区域样式 */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: transparent;
  border-radius: 0;
}

/* Logo 动画样式 */
#logo path:nth-child(1) {
  fill: rgb(255, 107, 107, 0);
  animation: fill-animation 2s ease forwards;
  animation-delay: 3s;
}

#logo path:nth-child(2) {
  stroke-dasharray: 93;
  stroke-dashoffset: 93;
  animation: line-animation 2s ease forwards;
  animation-delay: 0.6s;
}

#logo path:nth-child(3) {
  stroke-dasharray: 157;
  stroke-dashoffset: 157;
  animation: line-animation 6s ease forwards;
  animation-delay: 1.8s;
}

#logo path:nth-child(4) {
  stroke-dasharray: 57;
  stroke-dashoffset: 57;
  animation: line-animation 2s ease forwards;
  animation-delay: 2.4s;
}

/* 动画定义 */
@keyframes fill-animation {
  to {
    fill: rgb(255, 107, 107, 1);
  }
}

@keyframes line-animation {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale3d(0.8, 0.8, 0.8) rotateX(10deg);
    opacity: 0;
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05) rotateX(-5deg);
  }

  100% {
    transform: scale3d(1, 1, 1) rotateX(0);
    opacity: 1;
  }
}
</style>

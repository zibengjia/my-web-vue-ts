<template>
  <div class="avatar-wrapper">
    <div class="box" :class="{ open: isShow }" ref="box">
      <SvgIcon class="icon" v-for="(icon, index) in icons" :name="icon.icon" :key="index" />
    </div>
    <div class="photo" :class="{ open: isShow }" @click="isShow = !isShow">
      <img ref="avatar" src="@/assets/images/avatar.jpg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
import { useResizeObserver } from '@vueuse/core'
const isShow = ref<boolean>(false)
const icons = reactive([
  { icon: 'github', name: 'github' },
  { icon: 'gitee', name: 'gitee' },
  { icon: 'QQ', name: 'QQ' },
  { icon: 'WeChat', name: 'WeChat' },
  { icon: 'gmail', name: 'email' },
])
const avatar = ref<HTMLElement | null>(null)
const box = ref<HTMLElement | null>(null)
const avatarWidth = ref(0)
const boxWidth = ref(0)
useResizeObserver(avatar, (entries) => {
  const entry = entries[0]
  if (entry) {
    avatarWidth.value = entry.contentRect.width
  }
})
useResizeObserver(box, (entries) => {
  const entry = entries[0]
  if (entry) {
    boxWidth.value = entry.contentRect.width
  }
})
const rotationRadius = computed(() => {
  if (avatarWidth.value && boxWidth.value) {
    return `${avatarWidth.value / 2 + boxWidth.value}px`
  }
  return '220px' // 默认值
})
</script>

<style scoped lang="scss">
@use 'sass:math';
$startAngle: 0.4turn; //开始角度
$endAngle: 0.9turn; //结束角度
$rotationRadius: v-bind(rotationRadius); //旋转半径
.avatar-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: show-shell 0.5s forwards ease-in-out;
  perspective: 1000px;
}

.photo {
  width: min(360px, 30vw);
  height: min(360px, 30vw);
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(245, 253, 220, 0.85);
  box-shadow:
    0 2px 10px rgba(72, 187, 120, 0.5),
    0 5px 15px rgba(245, 158, 11, 0.45),
    0 10px 25px rgba(16, 185, 129, 0.4),
    0 0 0 2px rgba(255, 255, 255, 0.6) inset;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  animation: rotate-photo 1s forwards ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow:
      0 5px 15px rgba(72, 187, 120, 0.7),
      0 10px 25px rgba(245, 158, 11, 0.65),
      0 15px 36px rgba(16, 185, 129, 0.6),
      0 0 0 2px rgba(255, 255, 255, 0.9) inset;
  }
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.box {
  opacity: 1;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  transition: opacity 1s ease;
}

.icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec60;
  font-size: 26px;
  box-shadow: 0 0 10px #fff;
  color: rgb(106, 106, 245);
  opacity: 0;
  // 基础过渡属性
  transition: all 1s cubic-bezier(0.72, 0.02, 0.78, 0.8);
}

.icon:hover {
  transition-delay: 0s !important;
  background-color: #ecececbd;
  color: #fff;
}

.box.open {
  opacity: 1;
}

.box.open .icon {
  left: 20px;
  opacity: 1;
}
@for $i from 1 through 5 {
  .box.open .icon:nth-child(#{$i}) {
    $angle: $startAngle + math.div(($endAngle - $startAngle) * $i, 5);
    transform: rotate($angle) translateX($rotationRadius) rotate(-$angle);
    transition-delay: #{$i * 0.15s};
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .box .icon:nth-child(#{$i}) {
    transition-delay: #{(5-$i) * 0.15s};
    transition-duration: 0.5s;
  }
}

svg {
  width: 90%;
  height: 90%;
}
@keyframes show-shell {
  0% {
    width: 0px;
  }
}
@keyframes rotate-photo {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pop-btn {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

//warning:已废弃动画
@keyframes to-hamburger {
  from {
    transform: translateY(-50%) rotate(-180deg);
  }
}

@keyframes to-arrow {
  from {
    transform: translateY(-50%) rotate(0deg);
  }

  to {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>

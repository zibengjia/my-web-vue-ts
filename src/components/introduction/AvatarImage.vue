<template>
  <div class="avatar-wrapper">
    <div class="box" :class="{ open: isShow }">
      <SvgIcon class="icon" v-for="(icon, index) in icons" :name="icon.icon" :key="index" />
    </div>
    <div class="photo" :class="{ open: isShow }" @click="isShow = !isShow">
      <img ref="avatar" src="@/assets/images/avatar.jpg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
const isShow = ref<boolean>(false)
const rotationRadius = ref<number>(220)
const icons = reactive([
  { icon: 'github', name: 'github' },
  { icon: 'gitee', name: 'gitee' },
  { icon: 'QQ', name: 'QQ' },
  { icon: 'WeChat', name: 'WeChat' },
  { icon: 'gmail', name: 'email' },
])
const avatar = ref<HTMLElement | null>(null)
onMounted(() => {
  setTimeout(() => {
    if (avatar.value) {
      const avatarWidth = avatar.value.offsetWidth
      console.log(avatarWidth)
      // 确保最小值为100，避免图标过于靠近中心
      rotationRadius.value = avatarWidth / 2 + 50
    }
  }, 1000)
})
</script>

<style scoped lang="scss">
@use 'sass:math';
$startAngle: 0.4turn; //开始角度
$endAngle: 0.9turn; //结束角度
.avatar-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: show-shell 0.5s forwards ease-in-out;
}

.photo {
  width: auto;
  height: 60%;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fafafa;
  box-shadow: 0 0 0.5rem #babbbc;
  animation: rotate-photo 2s forwards ease-in-out;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.box {
  opacity: 0;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
}

.box .icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: pointer;
  display: flex; /* 添加 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #ececec60;
  font-size: 26px;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 0 10px #fff;
  color: rgb(106, 106, 245);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
}

.box .icon:hover {
  transition-delay: initial !important;
  box-shadow: 0 0 0 5px #babbbc;
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
  .box.open .icon:nth-of-type(#{$i}) {
    transform: rotate(#{$startAngle + math.div(($endAngle - $startAngle) * $i, 5)}) translateX(v-bind('rotationRadius + "px"')) rotate(-#{$startAngle + math.div(($endAngle - $startAngle) * $i, 5)});
    transition-delay: #{$i * 0.15s};
    transition-duration: 0.5s;
    transition-property: transform, left, opacity;
  }
  /* 为非open状态下的图标添加过渡效果 */
  .box .icon:nth-of-type(#{$i}) {
    transform: translate(0, 0);
    transition-delay: #{(5 - $i) * 0.1s}; /* 反向延迟，使图标按顺序收回 */
    transition-duration: 0.4s;
    transition-property: transform, left, opacity;
  }
}

svg {
  width: 90%;
  height: 90%;
}
@keyframes show-shell {
  0% {
    height: 0px;
    width: 0px;
  }
}
@keyframes rotate-photo {
  100% {
    transform: rotate(-720deg);
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

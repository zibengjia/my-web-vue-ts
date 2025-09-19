<template>
  <div class="skillTags-wrapper">
    <div class="skills-wrapper">
      <div class="skill-wrapper">
        <SvgIcon class="skill" v-for="(skill, index) in skillItems" :key="index" :name="skill.icon" width="50px" height="50px">
          <p>{{ skill.name }}</p>
        </SvgIcon>
        <SvgIcon class="skill" v-for="(skill, index) in skillItems" :key="index" :name="skill.icon" width="50px" height="50px">
          <p>{{ skill.name }}</p>
        </SvgIcon>
      </div>
    </div>
    <div class="interest-wrapper"><div class="tag"></div></div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'

const skillItems = reactive([
  { icon: 'html5', name: 'html5' },
  { icon: 'sass', name: 'sass' },
  { icon: 'css', name: 'css' },
  { icon: 'javascript', name: 'javascript' },
  { icon: 'typescript', name: 'typescript' },
  { icon: 'vuejs', name: 'vue.js' },
  { icon: 'vite', name: 'vite' },
])
</script>

<style scoped lang="scss">
.skillTags-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.skills-wrapper {
  width: 100%;
  height: 136px;
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  flex-direction: row;
  border: 2px solid #fb9308;
  overflow: hidden;
}

.skill-wrapper {
  width: auto;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  animation: skill-move 10s linear infinite;
}
.skill {
  min-height: 120px;
  width: 50px;
  padding: 10px 10px;
  p {
    overflow: hidden; //隐藏文字
    text-overflow: ellipsis; //显示 ...
    white-space: nowrap; //不换行

    &:hover {
      white-space: normal;
      text-overflow: clip;
      word-break: break-all;
    }
  }
}
.interest-wrapper {
  width: 100%;
  height: calc(100% - 136px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fb920879;
}
@keyframes skill-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>

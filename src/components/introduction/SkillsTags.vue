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
    <div class="interest-wrapper">
      <button class="btn" v-for="interestItem in interestItems" :key="interestItem.id">{{ interestItem.name }}</button>
    </div>
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
  { icon: 'vuejs', name: 'vuejs' },
  { icon: 'vite', name: 'vite' },
  { icon: 'git', name: 'git' },
  { icon: 'mysql', name: 'mysql' },
  { icon: 'c', name: 'C' },
  { icon: 'python', name: 'python' },
  { icon: 'visualstudiocode', name: 'vscode' },
  { icon: 'vueuse', name: 'vueuse' },
])
const interestItems = reactive([
  { name: '极限竞速', id: '1' },
  { name: '足球', id: '2' },
  { name: '羽毛球', id: '3' },
  { name: '乒乓球', id: '4' },
  { name: '游泳', id: '5' },
  { name: '旅游', id: '6' },
  { name: '游戏', id: '7' },
  { name: '旅游', id: '6' },
  { name: '游戏', id: '7' },
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
  height: auto;
  min-height: 120px;
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  border: 2px solid #fb9308;
  overflow: hidden;
}

.skill-wrapper {
  width: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  animation: skill-move 20s linear infinite;
}
.skill {
  min-height: 120px;
  width: 50px;
  padding: 1rem 1.5rem;
  box-sizing: content-box;

  p {
    font-size: 1rem;
    overflow: hidden; //隐藏文字
    text-overflow: ellipsis; //显示 ...
    white-space: nowrap; //不换行
    text-align: center;

    &:hover {
      overflow: visible;
      white-space: nowrap;
      text-overflow: clip;
      word-break: break-all;
    }
  }
}
.interest-wrapper {
  width: 100%;
  height: calc(100% - 136px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  overflow: auto;
  padding: 0.4rem;
  margin-top: 1rem;
}

@keyframes skill-move {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.btn {
  position: relative;
  font-size: 1.4rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  margin: 0.5rem 1rem;
  display: inline-block;
  border-radius: 6em;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  font-weight: 500;
  color: black;
  background-color: rgb(255, 255, 255, 0.2);
}

.btn:hover {
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
  content: '';
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.btn::after {
  background-color: rgb(255, 255, 255, 0.5);
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
</style>

<template>
  <div class="text-wrapper">
    <div class="hi">
      <p><span class="hello">Hello</span> <span>I'm </span> <i class="name">ZYG</i></p>
    </div>
    <div class="identity">
      <p>
        <span class="letter-a">A</span>&nbsp;
        <i class="identity-text">{{ text }}</i>
      </p>
    </div>
    <div class="emotional-state">
      <p>😔<span>无奈</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'
const identityItems = reactive(['<Developer/>', '<Student/>', '<Gamer/>', '<Learner/>'])
const isDeleting = ref<boolean>(false)
const identityIndex = ref(0)
const fullText = ref<string>('')
const text = ref<string>('')
const charIndex = ref(0)
const typeSpeed = 150
const pauseTime = 1500
const typeText = () => {
  fullText.value = identityItems[identityIndex.value]

  if (isDeleting.value) {
    // 删除字符
    text.value = fullText.value.substring(0, charIndex.value - 1)
    charIndex.value--

    if (charIndex.value === 0) {
      // 文本完全删除后，切换到下一个文本
      setTimeout(() => {
        isDeleting.value = false
      }, pauseTime * 0.5)

      identityIndex.value = (identityIndex.value + 1) % identityItems.length
    }
  } else {
    // 添加字符
    text.value = fullText.value.substring(0, charIndex.value + 1)
    charIndex.value++

    if (charIndex.value === fullText.value.length) {
      // 文本完全显示后，设置删除状态
      setTimeout(() => {
        isDeleting.value = true
      }, pauseTime)
    }
  }
}

let intervalId: number | null = null

onMounted(() => {
  typeText()
  intervalId = setInterval(typeText, typeSpeed)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped lang="scss">
.text-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  color: #fff;
}

.hi {
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4rem;
  white-space: nowrap;
}
.hello {
  padding-left: 0.5rem;
  position: relative;
  color: transparent;
  -webkit-text-stroke: 1px rgb(1, 254, 136);
  &::before {
    content: 'Hello';
    position: absolute;
    height: 100%;
    top: -10px;
    left: -1px;
    padding-left: 0.5rem;
    overflow: hidden;
    box-sizing: border-box;
    white-space: nowrap;
    color: rgb(1, 254, 135);
    border: 2px solid rgb(1, 254, 135);
    border-radius: 1rem;
    text-shadow:
      0 0 5px rgb(1, 254, 135),
      0 0 25px rgb(1, 254, 135);
    animation: light 3s infinite;
  }
}
.name {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4.5rem;
  font-weight: 600;
  color: rgb(1, 254, 135);
  position: relative;
  display: inline-block;
  padding-bottom: 5px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, rgb(1, 254, 135), rgb(0, 201, 255), rgb(1, 254, 135));
    background-size: 200% 100%;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-in-out;
    animation: gradientMove 2s linear infinite;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  &:not(:hover)::after {
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease-in-out;
  }
}

.identity {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4.5rem;
  animation: blink 800ms infinite; //note:光标闪烁间隔时间

  p {
    margin: 0;
    i {
      display: inline-block;
      position: relative;
    }
  }
}

.identity-text {
  background: linear-gradient(90deg, rgb(1, 254, 135), rgb(0, 201, 255), rgb(1, 254, 135));
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientMove 3s linear infinite;
}

.letter-a {
  display: inline-block;
}
.emotional-state {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4rem;
  margin-top: 1rem;
  white-space: nowrap;

  span {
    margin-left: 0.5rem;
  }
}
@keyframes blink {
  0%,
  50% {
    border-right: 5px solid rgb(255, 255, 255);
    opacity: 0.8;
  }

  51%,
  100% {
    border-right: 2px solid rgb(255, 255, 255);
    opacity: 0;
  }
}

@keyframes blink {
  0%,
  50% {
    border-right: 5px solid rgb(255, 255, 255);
  }
}

@keyframes light {
  0%,
  20%,
  100% {
    width: 15%;
  }

  60%,
  80% {
    width: 110%;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
</style>

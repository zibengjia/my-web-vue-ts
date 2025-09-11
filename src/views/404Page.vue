<template>
  <div class="error-page">
    <div class="head">
      <div class="meta meta-left"></div>
      <div class="meta meta-right"></div>
    </div>
    <div class="body">
      <h1>404</h1>
      <p class="message">Got lost? How.....? why.....? Ahhhh....</p>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.error-page {
  background: #000;
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.head {
  position: relative;
  width: 200px;
  margin: 0 auto;
  animation: shvr 0.2s infinite;
}

.head::after {
  content: '';
  width: 20px;
  height: 20px;
  background: #000;
  position: absolute;
  top: 30px;
  left: 25px;
  border-radius: 50%;
  box-shadow: 125px 0 0 #000;
  animation: eye 2.5s infinite;
}

.meta {
  position: relative;
  display: inline-block;
  background: #fff;
  width: 75px;
  height: 80px;
  border-radius: 50% 50% 50% 50%/45px 45px 45% 45%;
}

.meta-left {
  transform: rotate(45deg);
}

.meta-right {
  transform: rotate(-45deg);
}

.meta::after {
  content: '';
  position: absolute;
  border-bottom: 2px solid #fff;
  width: 70px;
  height: 50px;
  left: 0px;
  bottom: -10px;
  border-radius: 50%;
}

.body {
  margin-top: 100px;
  text-align: center;
  color: #fff;
}

.body h1 {
  font-size: 80px;
  font-weight: 800;
  margin-bottom: 10px;
}

.message {
  color: #1ea7ab;
  width: 120px;
  font-size: 30px;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
  animation: text-show 2s infinite steps(3);
}

@keyframes eye {
  0%,
  30%,
  55%,
  90%,
  100% {
    transform: translate(0, 0);
  }
  10%,
  25% {
    transform: translate(0, 20px);
  }
  65% {
    transform: translate(-20px, 0);
  }
  80% {
    transform: translate(20px, 0);
  }
}

@keyframes shvr {
  0% {
    transform: translate(1px, 1em);
  }
  50% {
    transform: translate(0, 1em);
  }
  100% {
    transform: translate(-1px, 1em);
  }
}

@keyframes text-show {
  to {
    text-indent: -373px;
  }
}
</style>

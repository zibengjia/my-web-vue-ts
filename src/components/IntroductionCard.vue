<template>
  <div class="shell">
    <div class="photo">
      <img src="@/assets/images/1.png" alt="" />
    </div>
    <div class="content">
      <div class="text">
        <h3>Business card</h3>
        <h6>BILIBILI-山羊の前端小窝</h6>
      </div>
      <div class="btn" :class="{ active: isShow }" @click="isShow = !isShow"><span></span></div>
    </div>
    <div class="box" :class="{ open: isShow }">
      <i class="icon icon-qq"
        ><svg t="1757938007137" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3699" width="200" height="200">
          <path
            d="M666.122449 909.061224c-10.44898 0-21.420408-1.044898-31.869388-2.612244-39.183673-4.702041-74.710204-23.510204-100.832653-53.289796-13.583673 5.22449-28.212245 5.22449-41.795918 0-21.420408 28.212245-61.64898 48.065306-108.669388 53.289796-66.35102 7.314286-138.44898-11.493878-144.718367-55.379592-5.22449-34.481633 37.093878-61.126531 81.502041-75.755102-25.6-28.212245-43.363265-63.738776-51.2-101.355102l-0.522449 0.522449c-25.077551 31.346939-41.795918 50.155102-61.126531 50.155102-2.089796 0-4.179592-0.522449-6.269388-1.044898-7.314286-2.612245-13.061224-8.881633-17.240816-18.808164-16.195918-34.481633-9.404082-100.310204 15.15102-150.465306 0 0 0-0.522449 0.522449-0.522449 12.538776-22.465306 27.689796-43.363265 45.453061-62.171428-6.269388-11.493878-10.44898-24.032653-12.016326-37.093878v-3.134694c0.522449-19.330612 10.44898-37.093878 26.644898-47.542857-10.971429-73.142857 9.926531-147.330612 58.514286-203.232653 49.110204-56.946939 120.163265-88.816327 194.873469-86.204081h4.702041c65.306122 0 129.567347 26.122449 177.110204 72.097959 49.110204 47.542857 76.8 112.326531 77.844898 180.767347v7.314285c0.522449 9.926531 0 19.330612-1.044898 29.257143 14.106122 8.881633 21.420408 20.37551 21.420408 48.065306 0 13.583673-1.044898 27.689796-9.926531 36.04898 13.061224 17.763265 28.734694 42.840816 41.27347 62.693877l2.612245 4.179592c20.37551 32.391837 23.510204 74.187755 22.987755 96.130613 0 17.240816-2.089796 58.514286-18.285714 70.530612-3.657143 2.612245-7.314286 3.657143-12.016327 3.657143h-4.179592c-26.122449 0-41.273469-23.510204-57.991837-48.587755l-1.567347-2.089796c-8.881633 36.571429-26.122449 71.053061-50.677551 99.265306 27.167347 9.404082 83.069388 31.346939 75.755103 73.142857-5.746939 35.526531-55.902041 62.171429-114.416327 62.171428z m-388.702041-63.738775z m250.253061-11.493878z m276.375511-140.016326z m-47.020409-235.102041z"
            fill="#7BD4EF"
            p-id="3700"
          ></path></svg
      ></i>
      <i class="icon icon-bilibili"
        ><svg t="1757937957797" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1574" width="200" height="200">
          <path
            d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0"
            fill="#20B0E3"
            p-id="1575"
          ></path>
          <path
            d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0"
            fill="#20B0E3"
            p-id="1576"
          ></path></svg
      ></i>
      <i class="icon icon-github">
        <svg t="1757938028631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4662" width="200" height="200">
          <path
            d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z"
            fill="#000000"
            p-id="4663"
          ></path></svg
      ></i>
      <i class="icon icon-douyin"
        ><svg t="1757938049239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5719" width="200" height="200">
          <path
            d="M937.4 423.9c-84 0-165.7-27.3-232.9-77.8v352.3c0 179.9-138.6 325.6-309.6 325.6S85.3 878.3 85.3 698.4c0-179.9 138.6-325.6 309.6-325.6 17.1 0 33.7 1.5 49.9 4.3v186.6c-15.5-6.1-32-9.2-48.6-9.2-76.3 0-138.2 65-138.2 145.3 0 80.2 61.9 145.3 138.2 145.3 76.2 0 138.1-65.1 138.1-145.3V0H707c0 134.5 103.7 243.5 231.6 243.5v180.3l-1.2 0.1"
            p-id="5720"
          ></path>
        </svg>
      </i>
      <i class="icon icon-youtube"
        ><svg t="1757938078550" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6722" width="200" height="200">
          <path
            d="M426.666667 682.666667V384l256 149.845333L426.666667 682.666667z m587.093333-355.541334s-10.026667-71.04-40.704-102.357333c-38.954667-41.088-82.602667-41.258667-102.613333-43.648C727.168 170.666667 512.213333 170.666667 512.213333 170.666667h-0.426666s-214.954667 0-358.229334 10.453333c-20.053333 2.389333-63.658667 2.56-102.656 43.648-30.677333 31.317333-40.661333 102.4-40.661333 102.4S0 410.538667 0 493.952v78.293333c0 83.456 10.24 166.912 10.24 166.912s9.984 71.04 40.661333 102.357334c38.997333 41.088 90.154667 39.765333 112.938667 44.074666C245.76 893.568 512 896 512 896s215.168-0.341333 358.442667-10.752c20.053333-2.432 63.658667-2.602667 102.613333-43.690667 30.72-31.317333 40.704-102.4 40.704-102.4s10.24-83.413333 10.24-166.869333v-78.250667c0-83.456-10.24-166.912-10.24-166.912z"
            fill="#FF0000"
            p-id="6723"
          ></path></svg
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref<boolean>(false)
</script>

<style scoped lang="scss">
.shell {
  width: 330px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 0 2rem rgb(186, 186, 186);
  animation: show-shell 0.5s forwards ease-in-out;
}
@keyframes show-shell {
  0% {
    width: 0;
  }
}
.photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: rgb(250, 250, 250);
  background-color: rgb(250, 250, 250);
  margin-left: -50px;
  box-shadow: 0 0 2rem rgb(186, 186, 186);
  animation: rotate-photo 0.5s forwards ease-in-out;
  img {
    width: 100%;
  }
}
.content {
  padding: 10px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  &::before {
    content: '';
    position: absolute;
    width: 230px;
    height: 150px;
    left: 0;
    top: -20px;
    z-index: -1;
    transform: rotate(-8deg);
    background-image: linear-gradient(to top, #96c34e, #f1c64e);
  }
  .text {
    margin-top: 18px;
    margin-left: 54px;
    > * {
      font-weight: normal;
      margin: 3px 0px;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
  }
  .btn {
    background-color: #96c34e;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    right: 20px;
    top: 25px;
    z-index: 1;
    cursor: pointer;
    animation: pop-btn 0.3s both ease-in-out 0.5s;
    &:hover {
      box-shadow: 0 0 0 5px #96c34e4d;
    }
  }
}
.content .btn span {
  width: 60%;
  height: 2px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  animation: to-hamburger 0.3s forwards ease-in-out;
}
//按钮动画
.content .btn span::before,
.content .btn span::after {
  content: '';
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: white;
  transition-duration: 0.3s;
  transform: rotate(0deg);
  right: 0;
}

.content .btn span::before {
  margin-top: -7px;
}

.content .btn span::after {
  margin-top: 7px;
}

.content .btn.active span {
  animation: to-arrow 0.3s forwards ease-in-out;
}

.content .btn.active span::before,
.content .btn.active span::after {
  width: 60%;
  right: -1px;
}

.content .btn.active span::before {
  transform: rotate(45deg);
}

.content .btn.active span::after {
  transform: rotate(-45deg);
}

.box {
  opacity: 0;
  border-radius: 50%;
  background-color: rgb(255, 255, 255, 0.7);
  position: absolute;
  top: 50%;
  right: -30%;
  transform: translate(-50%, -50%);
  transition-duration: 0.3s;
  box-shadow: 0 0 10px #fff;
  border: 5px solid #fff;
  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-image: url('@/assets/images/2.png');
    background-size: cover;
    opacity: 0.7;
  }
  i {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ececec;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
    position: absolute;
    left: 18px;
    top: calc(60px - 50px / 2);
    box-shadow: 0 0 10px #fff;
    color: rgb(106, 106, 245);
    background-color: #fff;
    transition-duration: 0.3s;
    &:hover {
      transition-delay: initial !important;
      box-shadow: 0 0 0 5px #babbbc;
      background-color: #96c34eb6;
      color: #fff;
    }
  }
  &.open {
    opacity: 1;
    i {
      left: 20px;
      opacity: 1;
      &:nth-of-type(1) {
        transform: rotate(-90deg) translateX(120px) rotate(90deg);
        transition-delay: 0s;
      }
      &:nth-of-type(2) {
        transform: rotate(-45deg) translateX(120px) rotate(45deg);
        transition-delay: 0.1s;
      }
      &:nth-of-type(3) {
        transform: rotate(0deg) translateX(130px) rotate(0deg);
        transition-delay: 0.2s;
      }
      &:nth-of-type(4) {
        transform: rotate(45deg) translateX(120px) rotate(-45deg);
        transition-delay: 0.3s;
      }

      &:nth-of-type(5) {
        transform: rotate(90deg) translateX(110px) rotate(-90deg);
        transition-delay: 0.4s;
      }
    }
  }
}
svg {
  width: 85%;
  height: 85%;
}
@keyframes show-content {
  0% {
    width: 0;
  }
}
@keyframes rotate-photo {
  0% {
    transform: rotate(0deg);
  }
}
@keyframes rotate-photo {
  100% {
    transform: rotate(-360deg);
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

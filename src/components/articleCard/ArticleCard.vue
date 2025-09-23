<template>
  <div class="card" :class="{ expanded: isExpanded }" @click="isExpanded = true">
    <div class="image">
      <img src="@/assets/images/articleTest.png" alt="" />
    </div>
    <button v-if="isExpanded" class="close-button" @click.stop="isExpanded = false">
      <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
        <path
          d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
        ></path>
      </svg>
      <span>Back</span>
    </button>
    <div class="article">
      <div class="header">
        <div class="tags">
          <span v-for="(tag, index) in tagItems" :key="index">#{{ tag }}</span>
        </div>
        <div class="title">给你的博客内容添加密码保护</div>
        <div class="information">
          <p class="date"><SvgIcon name="calendar" /> 2025-9-22</p>
          <p class="word-count"><SvgIcon name="wordCount" /> 1400字</p>
        </div>
      </div>
      <div class="content">
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'

const tagItems = ['前端', 'Vue', 'JavaScript']
const isExpanded = ref(false)
</script>

<style scoped lang="scss">
.card {
  transition: all 2s ease-in-out;
  position: relative;
  width: 24rem;
  height: 30rem;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12);
  .image {
    height: 12.5rem;
    width: 100%;
    img {
      display: block;
      width: 100%;
      height: inherit;
      object-fit: cover;
    }
  }
}
.article {
  padding: 2rem 1.8rem;
  .title {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
  .tags {
    margin: 0 0 1rem;
    span {
      display: inline-block;
      margin-right: 0.5rem;
      font-size: 0.8rem;
      line-height: 1rem;
      color: #999;
    }
  }
  .information {
    p {
      display: inline-flex;
      margin-right: 0.5rem;
      font-size: 0.8rem;
      align-items: center;
      .svg-icon {
        display: inline-block;

        margin-right: 0.1rem;
        height: 1.2rem;
        width: 1rem;
        svg {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .content {
    font-size: 1rem;
    line-height: 1.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 5rem;
    word-break: break-all;
  }
}
//展开后的样式
.card.expanded {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;

  .image {
    height: 30rem;
    filter: blur(10px);
    img {
      height: 100%;
      width: 100%;
    }
  }
  .article {
    padding: 2rem 4rem;
    .header {
      width: 80%;
      position: absolute;
      top: 10rem;
      left: 50%;
      transform: translateX(-40%);
      .tags {
        span {
          font-size: 1.2rem;
        }
      }
      .title {
        font-size: 4rem;
        line-height: 4rem;
      }
    }
    .information {
      p {
        font-size: 1.2rem;
        margin-right: 3rem;
      }
    }
    .content {
      width: 80%;
      height: auto;
      font-size: 1.25rem;
      line-height: 2rem;
    }
  }
}

//note:前端工具箱css样式
.close-button {
  position: absolute;
  top: 6rem;
  left: 2rem;

  display: flex;
  height: 3em;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 3px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #fff;
  svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
  }
  &:hover {
    box-shadow:
      9px 9px 33px #d1d1d1,
      -9px -9px 33px #ffffff;
    transform: translateY(-2px);
    svg {
      font-size: 1.2em;
      transform: translateX(-5px);
    }
  }
}
</style>

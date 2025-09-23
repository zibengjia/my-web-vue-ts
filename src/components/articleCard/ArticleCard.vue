<template>
  <div class="card" :class="{ expanded: isExpanded }" @click="isExpanded = true">
    <div class="article">
      <div class="image">
        <img src="@/assets/images/articleTest.png" alt="" />
      </div>
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
      <div class="content-overview">
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
      </div>
      <div class="content">
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
        <p>今天在叶泯希哥哥的博客里闲逛的时候发现了他有个这个页面： 我第一眼看到这个密码条就心动了你知道吗，想起来我的博客也有一个要密码保护的页面，还用的是在地址栏输密码的模式…… 于是我打开 F12，想抄作业，但是…… Hexo 自动生成的这个 html 是啥啊，是给人看的吗 哦对哦它好像本来就不是给人看的……</p>
        <p>突然想起来 Markdown 文件里面是能放 html 的，欸，这不就有了吗？</p>
        <p>于是经过我的一番搜索，加上 ChatGPT 帮我写的 css，终于给我的博客也弄上了一个，当当当当！OK，话不多说，开始发车！</p>
      </div>
    </div>
  </div>
  <transition name="slide-fade">
    <button v-if="isExpanded" class="close-button" @click.stop="isExpanded = false">
      <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
        <path
          d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
        ></path>
      </svg>
      <span>Back</span>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'

const tagItems = ['前端', 'Vue', 'JavaScript']
const isExpanded = ref(false)
</script>

<style scoped lang="scss">
// ArticleCard 字体大小变量
$article-title-font-size: 1.5rem;
$article-title-font-size-expanded: 2.5rem;
$article-tag-font-size: 0.8rem;
$article-tag-font-size-expanded: 1rem;
$article-info-font-size: 0.8rem;
$article-info-font-size-expanded: 1rem;
$article-content-overview-font-size: 0.8rem;
$article-content-font-size: 1rem;

.card {
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
  transition:
    width 0.3s ease,
    height 0.3s ease;

  .article {
    width: 100%;
    height: 100%;
    padding: 0rem 1.2rem;
    .image {
      height: 12.5em;
      width: 100%;
      img {
        display: block;
        width: 100%;
        height: inherit;
        object-fit: cover;
        transition: height 0.3s ease;
      }
    }
    .header {
      text-align: center;
      transform: translateY(0) translateX(0);
      transition: transform 0.3s ease;

      .title {
        margin: 0 0 1rem;
        font-size: $article-title-font-size;
        line-height: 1.5rem;
        transition:
          font-size 0.3s ease,
          line-height 0.3s ease;
      }
      .tags {
        margin: 0 0 1rem;
        span {
          display: inline-block;
          margin-right: 0.5rem;
          font-size: $article-tag-font-size;
          line-height: 1rem;
          color: #999;
          transition: font-size 0.3s ease;
        }
      }
      .information {
        p {
          display: inline-flex;
          margin-right: 0.5rem;
          font-size: $article-info-font-size;
          align-items: center;
          transition:
            font-size 0.3s ease,
            margin-right 0.3s ease;

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
    }
    .content-overview {
      margin-top: 1rem;
      opacity: 1;
      transition: opacity 0.2s ease;

      p {
        font-size: $article-content-overview-font-size;
        line-height: 1.2rem;
        color: #999;
      }
    }
    .content {
      opacity: 0;
      margin-top: 1rem;
      transform: translateY(20rem);
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;

      p {
        font-size: $article-content-font-size;
        line-height: 1.2rem;
        color: #999;
        word-break: break-all;
      }
    }
  }
}

.card.expanded {
  width: 100vw;
  height: 100vh;

  overflow-y: scroll;
  transition:
    width 0.3s ease,
    height 0.3s ease;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .article {
    padding: 0;

    .image {
      height: 30rem;
      filter: blur(2px);
      transition:
        height 0.3s ease,
        filter 0.3s ease;
    }
    .header {
      text-align: center;
      transform: translateY(-20rem) translateX(0);
      transition: transform 0.3s ease;
      padding: 0 2rem;

      .tags {
        span {
          font-size: $article-tag-font-size-expanded;
          transition: font-size 0.3s ease;
        }
      }
      .title {
        font-size: $article-title-font-size-expanded;
        line-height: 2.5rem;
        transition:
          font-size 0.3s ease,
          line-height 0.3s ease;
      }

      .information {
        display: flex;
        justify-content: center;
        padding: 0 2rem;
        p {
          font-size: $article-info-font-size-expanded;
          margin-right: 1.5rem;
          transition:
            font-size 0.3s ease,
            margin-right 0.3s ease;
        }
      }
    }
    .content-overview {
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .content {
      opacity: 1;
      // text-align: center;
      max-width: 80rem;
      transform: translateY(0);
      transition:
        opacity 0.3s ease,
        transform 0.6s ease;

      margin: 0 auto;
      padding: 0 2rem;

      p {
        display: inline-block;
        text-align: left;
      }
    }
  }
}

.close-button {
  position: absolute;
  top: 3rem;
  left: 2rem;

  display: flex;
  height: 3em;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 3px;
  letter-spacing: 1px;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;
  border: none;
  background: #fff;
  svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    transition:
      font-size 0.2s ease,
      transform 0.2s ease;
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

// 添加过渡动画类
.slide-fade-enter-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-fade-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>

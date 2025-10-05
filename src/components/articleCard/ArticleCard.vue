<template>
  <div class="card" ref="card" :class="{ expanded: isExpanded, collapsed: isCollapsed }" @click="handleClick">
    <div class="article">
      <div class="image">
        <img src="@/assets/images/articleTest.png" alt="" />
      </div>
      <div class="header">
        <div class="tags">
          <span v-for="(tag, index) in article.tags" :key="index">#{{ tag }}</span>
        </div>
        <div class="title">{{ article.title }}</div>
        <div class="information">
          <p class="date"><SvgIcon name="calendar" /> {{ article.createTime }}</p>
          <p class="word-count"><SvgIcon name="wordCount" /> {{ article.wordCount }}</p>
        </div>
      </div>
      <div class="content-overview">
        <p>{{ article.contentPre }}</p>
      </div>
      <div class="md">
        <MdPreview class="md-preview content" :id="state.id" :modelValue="contentMd" :theme="state.theme" :previewTheme="state.previewTheme" />
      </div>
      <MdCatalog class="md-catalog catalog" :editorId="state.id" :scrollElement="scroll" :theme="state.theme" />
    </div>
  </div>
  <transition name="slide-fade">
    <button v-if="isExpanded" class="close-button" @click.stop="handleClose">
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
import { computed, reactive, ref } from 'vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
import { MdCatalog, MdPreview, type Themes } from 'md-editor-v3'
import { getArticleDetail } from '@/apis/article/articleApi'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'

// 定义组件的属性

interface ArticlePre {
  articleId: number
  title: string
  tags: string[]
  wordCount: number
  createTime: string
  contentPre: string
}

const props = defineProps<{
  articlePre: ArticlePre
  expandedArticleId: number
}>()
const emit = defineEmits<{
  cardClick: [articleId: number]
}>()
const article = reactive({
  ...props.articlePre,
})
// md-editor-v3配置
const scroll = '.card.expanded'

//TODO:修复bug
//bug:目录无法正常随内容滚动而变化,点击目录无法跳转至对应内容,应该和scrollElement有关,具体看api说明
//note:初步修复目录滚动跳转功能
const state = reactive({
  theme: 'light' as Themes,
  previewTheme: 'vuepress',
  id: 'preview-only',
})
const isExpanded = ref(false)
const isCollapsed = computed(() => props.expandedArticleId !== 0 && article.articleId !== props.expandedArticleId)
const contentMd = ref('')
//获取文章详情
const fetchArticleDetail = async (articleId: number) => {
  try {
    contentMd.value = (await getArticleDetail(articleId)).data.data.contentMd
    console.log('文章内容获取成功')
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

//展开操作
const handleClick = () => {
  if (isExpanded.value) return
  isExpanded.value = true
  emit('cardClick', article.articleId)
  fetchArticleDetail(article.articleId)
}

// 处理关闭操作
const handleClose = () => {
  // 先将卡片滚动到顶部
  const cardElement = document.querySelector('.card.expanded')
  if (cardElement) {
    cardElement.scrollTop = 0
  }
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  // 然后执行关闭操作
  isExpanded.value = false
  // 向父组件传递0，表示关闭当前文章
  emit('cardClick', 0)
}
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
  .catalog {
    position: fixed;
    right: 100px;
    top: 100px;
    z-index: 1000;
    display: none;
  }
}

.card.expanded {
  .catalog {
    display: block;
  }
  .content {
    margin-left: 5rem;
  }
}

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

  .article {
    position: relative;
    width: 100%;
    height: 100%;

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
      position: relative;
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
      padding: 0rem 1.2rem;
      margin-top: 1rem;
      opacity: 1;
      transition: opacity 0.2s ease;

      p {
        font-size: $article-content-overview-font-size;
        line-height: 1.2rem;
        color: #999;
      }
    }
    .md {
      position: relative;
      opacity: 0;
      transform: translateY(20rem);

      display: flex;
      .content-container {
        height: 60vh;
        position: relative;
        overflow: hidden;
        .content-container-wrapper {
          position: relative;
          height: 100%;
          overflow: auto;
        }
      }
      .catalog {
        p {
          font-size: $article-content-font-size;
        }
      }
    }
  }
}
.card.collapsed {
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    width 0.3s ease,
    height 0.3s ease,
    opacity 0.3s ease;
}

.card.collapsed * {
  opacity: 0;
  transition: opacity 0.15s ease;
}

.card.expanded {
  width: 100%;
  height: 100%;
  overflow: auto;
  // scrollbar-width: none;
  // -ms-overflow-style: none;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  position: relative;
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
    .md {
      opacity: 1;
      transform: translateY(0);

      .content-container {
        height: 60vh;
        position: relative;
        overflow: hidden;
        .content-container-wrapper {
          position: relative;
          height: 100%;
          overflow: auto;
        }
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

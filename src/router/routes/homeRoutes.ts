import type { RouteRecordRaw } from 'vue-router'

export const homeRoutes: RouteRecordRaw = {
  path: '/',
  name: 'index',
  meta: {
    title: '主页',
  },
  redirect: '/home',
  component: () => import('@/views/home/IndexPage.vue'),
  children: [
    {
      path: 'home',
      name: 'home',
      meta: {
        title: '主页',
      },
      component: () => import('@/views/home/HomePage.vue'),
    },
    {
      path: 'article',
      name: 'Article',
      meta: {
        title: '文章',
      },
      component: () => import('@/views/home/ArticlePage.vue'),
    },
    {
      path: 'footprints',
      name: 'Footprints',
      meta: {
        title: '足迹',
      },
      component: () => import('@/views/home/FootprintsPage.vue'),
    },
    {
      path: 'activity',
      name: 'Activity',
      meta: {
        title: '动态',
      },
      component: () => import('@/views/home/ActivityPage.vue'),
    },
    {
      path: 'about',
      name: 'About',
      meta: {
        title: '关于',
      },
      component: () => import('@/views/home/AboutPage.vue'),
    },
  ],
}

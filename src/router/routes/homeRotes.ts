import type { RouteRecordRaw } from 'vue-router'

export const homeRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  meta: {
    title: '主页',
  },
  component: () => import('@/views/HomePage.vue'),
  children: [
    {
      path: 'about',
      name: 'About',
      meta: {
        title: '关于',
      },
      component: () => import('@/views/AboutPage.vue'),
    },
  ],
}

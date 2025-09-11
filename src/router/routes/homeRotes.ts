import type { RouteRecordRaw } from 'vue-router'

export const homeRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  meta: {
    title: '主页',
  },
  component: () => import('@/views/HomePage.vue'),
  children: [],
}

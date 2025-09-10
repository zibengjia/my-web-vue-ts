import type { RouteRecordRaw } from 'vue-router'
export const adminRoute: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  meta: {
    title: '管理界面',
  },
  component: () => import('@/views/AdminPage.vue'),
  children: [],
}

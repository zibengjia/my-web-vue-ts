import type { RouteRecordRaw } from 'vue-router'
export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  meta: {
    title: '管理界面',
  },
  component: () => import('@/views/admin/AdminPage.vue'),
  children: [],
}

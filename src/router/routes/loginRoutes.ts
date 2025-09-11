import type { RouteRecordRaw } from 'vue-router'
export const loginRoutes: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
  },
  component: () => import('@/views/Login-Register.vue'),
}

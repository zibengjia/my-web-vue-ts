import type { RouteRecordRaw } from 'vue-router'
export const testRoutes: RouteRecordRaw = {
  path: '/test',
  name: 'test',
  meta: {
    title: '测试页面',
  },
  component: () => import('@/test/TestIndex.vue'),
}

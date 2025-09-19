import type { RouteRecordRaw } from 'vue-router'
export const testRoutes: RouteRecordRaw = {
  path: '/test',
  name: 'test',
  component: () => import('@/test/TestIndex.vue'),
}

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { adminRoutes } from './routes/adminRoutes'
import { homeRoutes } from './routes/homeRotes'
import { loginRoutes } from './routes/loginRoutes'
import { testRoutes } from '@/test/router/testRouter'
const routes: RouteRecordRaw[] = [
  adminRoutes,
  homeRoutes,
  loginRoutes,
  testRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '404',
      hideNav: true,
    },
    component: () => import('@/views/404Page.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  //禁止访问admin及其子路由
  if (to.path === '/admin') {
    next('/login')
  } else {
    next()
  }
})
router.afterEach((to) => {
  // 设置标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})
export default router

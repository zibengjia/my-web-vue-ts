import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { homeRoute } from './modules/home'

const routers: RouteRecordRaw[] = [homeRoute]

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
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
  document.title = to.meta.title as string
})
export default router

/*
 * @Description:
 * @Author:
 * @Date: 2022-08-15 09:58:26
 * @LastEditTime: 2023-01-04 14:48:23
 * @LastEditors:  
 */
/**
 * 权限拦截
 */

import router from '@/router'
import store from '@/store'
import { message } from '@/libs'
// 路由前置守卫
router.beforeEach((to, from) => {
  console.log('路由前置守卫:', to)
  //   无需登录的页面访问
  if (!to.meta.user) return

  //   已登录，可进入
  if (store.getters.token) return true

  // 未登录，警告然后返回首页
  message('warn', '登录失效，重新登录！')
  store.commit('app/changeRouterType', 'back')
  return '/'
})

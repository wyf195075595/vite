/*
 * @Description: 
 * @Author:  
 * @Date: 2022-08-15 14:29:50
 * @LastEditTime: 2022-12-30 14:20:16
 * @LastEditors:  
 */
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  isMobileTerminal
} from '@/utils/flexible'
import mobileRoutes from './modules/mobile-routes'
import pcRoutes from './modules/pc-routers'


// 创建一个新的 store 实例
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(), // createWebHashHistory
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes, // `routes: routes` 的缩写
  // routes: mobileRoutes
})

export default router
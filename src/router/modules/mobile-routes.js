/*
 * @Description:
 * @Author:
 * @Date: 2022-08-15 14:30:26
 * @LastEditTime: 2023-01-04 14:47:28
 * @LastEditors:  
 */
const mobileRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue'),
    children: []
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login-register/register/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      // 标记当前页面只有用户登录之后才可以进入
      user: true
    }
  },
  {
    path: '/member',
    name: 'member',
    meta: {
      user: true
    },
    component: () => import('@/views/member/index.vue')
  }
]

export default mobileRoutes

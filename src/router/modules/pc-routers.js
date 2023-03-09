/*
 * @Description:
 * @Author:
 * @Date: 2022-08-15 14:30:39
 * @LastEditTime: 2023-01-04 14:45:56
 * @LastEditors:  
 */
const pcRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      },
      {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/index.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          // 标记当前页面只有用户登录之后才可以进入
          user: true
        }
      }
    ]
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
    path: '/member',
    name: 'member',
    meta: {
      user: true
    },
    component: () => import('@/views/member/index.vue')
  }
]

export default pcRoutes

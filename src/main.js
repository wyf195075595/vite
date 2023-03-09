/*
 * @Description:
 * @Author:
 * @Date: 2022-08-05 11:07:09
 * @LastEditTime: 2023-01-04 08:48:13
 * @LastEditors:
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import store from '@/store'
import router from '@/router'
import axios from '@/utils/request'
import 'virtual:svg-icons-register'
import myLibs from '@/libs'
import { useREM } from '@/utils/flexible'
import useTheme from '@/utils/theme'
import directives from '@/directives'
import '@/permission'
useREM()
useTheme()
const app = createApp(App)
app.use(store)
app.use(router)
app.use(myLibs)
app.use(directives)
app.config.globalProperties.$axios = axios //配置axios的全局引用
app.mount('#app')

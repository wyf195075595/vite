/*
 * @Description:
 * @Author:
 * @Date: 2022-08-15 14:29:50
 * @LastEditTime: 2023-01-03 09:26:34
 * @LastEditors:  
 */
import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {},
  // 上面三项是测试
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      // 指定保存到 localstorage 中的 Key
      key: 'my-front',
      // 需要保存的模块
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store

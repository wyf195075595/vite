/*
 * @Description:
 * @Author:
 * @Date: 2022-12-14 20:41:55
 * @LastEditTime: 2023-01-04 10:57:30
 * @LastEditors:  
 */
/**
 * app 中的数据 不会被缓存
 */
import { ALL_CATEGORY_ITEM } from '@/constants'

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 当前主题模式，默认浅色
      currentCategory: ALL_CATEGORY_ITEM,
      // 搜索文本
      searchText: '',
      // 路由跳转类型
      routerType: 'none'
    }
  },
  mutations: {
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },
    /**
     * 修改 routerType
     */
    changeRouterType(state, newType) {
      state.routerType = newType
    }
  }
}

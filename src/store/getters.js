/*
 * @Description:
 * @Author:
 * @Date: 2022-12-14 20:39:20
 * @LastEditTime: 2023-01-04 13:41:24
 * @LastEditors:  
 */
export default {
  // 简单访问
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  /**
   * category 选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category 选中项的下标
   */
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id == getters.currentCategory.id
    })
  },
  /**
   * 搜索历史
   */
  historys: (state) => state.search.historys,
  /**
   * 搜索文本
   */
  searchText: (state) => state.app.searchText,
  /**
   * 用户信息
   */
  userInfo: (state) => state.user.userInfo,
  /**
   *
   * token
   */
  token: (state) => state.user.token,
  /**
   * 路由类型
   */
  routerType: (state) => state.app.routerType
}

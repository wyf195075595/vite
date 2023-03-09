/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-14 20:41:55
 * @LastEditTime: 2022-12-17 10:05:37
 * @LastEditors:  
 */
/**
 * 处理 navigation bar 中的数据 categorys
 */
import {
    CATEGORY_NOMAR_DATA,
    ALL_CATEGORY_ITEM
} from '@/constants'

export default {
    // 独立作用域
    namespaced: true,
    state: () => {
        return {
            // 1、让 categories 具备初始化数据
            // 2、从服务器获取数据，替换初始化数据
            // 就是将第一行菜单数据设置成静态的，接口获取后在更新
            // 3、为了防止初始化数据太慢，我们把每次获取的新数据作为下次初始化的之举
            // 第三方案：每次从接口获取得数据，经行缓存（localStorage）。下次运行将缓存数据作为初始值
            // 使用 vuex-persistedstate 库完美解决
            categorys: [CATEGORY_NOMAR_DATA]
        }
    },
    mutations: {
        /**
         * 为 categorys 赋值
         */
        setCategorys(state, newCategorys) {
            state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
        }
    },
    actions: {
        /**
         * 获取categories 数据，并自动保存到 vuex 中
         */
        useCategoryData({
            commit
        }) {
            setTimeout(() => {
                commit('setCategorys', CATEGORY_NOMAR_DATA)
            }, 150)
        }
    }
}
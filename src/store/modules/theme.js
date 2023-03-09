/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-14 20:41:55
 * @LastEditTime: 2022-12-18 12:28:12
 * @LastEditors:  
 */
/**
 * 处理 navigation bar 中的数据 categorys
 */
import {
    THEME_LIGHT
} from '@/constants'

export default {
    // 独立作用域
    namespaced: true,
    state: () => {
        return {
            // 当前主题模式，默认浅色
            themeType: THEME_LIGHT
        }
    },
    mutations: {
        changeThemeType(state, newThemeType) {
            state.themeType = newThemeType
        }
    }
}
/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-18 12:40:47
 * @LastEditTime: 2022-12-18 14:39:20
 * @LastEditors:  
 */
import {
    watch
} from 'vue'
import {
    THEME_SYSTEM
} from '@/constants'
import store from '../store'

/**
 * 监听系统主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
    // 仅需初始化一次即可
    if (matchMedia) return
    matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    // 监听主题变更
    matchMedia.onchange = function () {
        changeTheme(THEME_SYSTEM)
    }
}

const changeTheme = (val) => {
    let className = val
    if (className === THEME_SYSTEM) {
        watchSystemThemeChange()
        className = matchMedia.matches ? 'dark' : 'light'
    }
    document.querySelector('html').className = className
}

export default () => {
    watch(() => store.getters.themeType, changeTheme, {
        immediate: true
    })
}
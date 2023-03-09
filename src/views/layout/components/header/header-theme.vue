<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-12-08 17:25:15
 * @LastEditTime: 2022-12-29 16:00:15
 * @LastEditors:  
-->
<template>
  <div>
    <m-popover>
      <template #reference>
        <m-svg-icon
          class="guide-theme w-4 h-4 duration-200 p-1 cursor-pointer rounded-sm outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          :name="'theme-' + $store.getters.themeType"
        >
        </m-svg-icon>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-700"
          v-for="item in themeArr"
          :key="item.id"
          @click="changeTheme(item)"
        >
          <m-svg-icon
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
            :name="'theme-' + item.type"
          >
          </m-svg-icon>
          <span class="text-sm text-zinc-900 dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import { useStore } from 'vuex'
const store = useStore()
const themeArr = [
  { id: 0, type: THEME_LIGHT, name: '极简白' },
  { id: 1, type: THEME_DARK, name: '极简黑' },
  { id: 2, type: THEME_SYSTEM, name: '跟随系统' }
]
// 1、监听主题的切换行为
const changeTheme = (obj) => {
  console.log(obj)
  store.commit('theme/changeThemeType', obj.type)
}
// 2、根据行为保存当前需要展示的主题到 vuex 中

// 3、根据 vuex 中保存的当前主题，展示修改 header-theme 下的显示图标
// 4、根据 vuex 中保存的当前主题，修改 html 的 class
</script>

<style></style>

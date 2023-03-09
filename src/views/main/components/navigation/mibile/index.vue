<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-17 23:19:48
 * @LastEditTime: 2022-12-27 11:45:54
 * @LastEditors:  
-->
<template>
  <div
    class="bg-white dark:bg-zinc-800 sticky top-0 left-0 z-10 w-full h-5 overflow-hidden flex items-center justify-center"
  >
    <ul
      class="flex items-center overflow-x-auto overflow-y-hidden w-11/12 h-full relative"
    >
      <li
        class="whitespace-nowrap mx-1 text-sm duration-200 cursor-pointer text-zinc-900 dark:text-zinc-500"
        :class="{
          'dark:bg-zinc-900 bg-zinc-300 rounded-sm py-0.5 px-1 z-40 box-border  text-zinc-900 dark:text-zinc-300':
            item.id === $store.getters.currentCategory.id
        }"
        v-for="item in $store.getters.categorys"
        :key="item.id"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- 汉堡按钮 -->
    <div class="w-1/12 flex items-center justify-center">
      <m-svg-icon
        @click="isShow = true"
        class="w-1.5 h-1.5"
        name="hamburger"
      ></m-svg-icon>
    </div>

    <!-- 弹窗 -->
    <m-popup v-model="isShow">
      <menu-vue @onItemClick="onItemClick" />
    </m-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import menuVue from '@/views/main/components/menu/index.vue'

const store = useStore()
let isShow = ref(false)
let curId = ref('all')

const onItemClick = (obj) => {
  console.log('item Click:', obj)
  store.commit('app/changeCurrentCategory', obj)
}
</script>

<style></style>

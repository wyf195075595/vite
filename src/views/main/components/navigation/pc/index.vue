<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-17 23:19:48
 * @LastEditTime: 2022-12-27 11:42:53
 * @LastEditors:  
-->
<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-sm text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[120px]' : 'h-[56px]']"
    >
      <!-- 展示箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>
      <!-- item -->
      <li
        class="shrink-0 px-1.5 py-0 duration-200 text-zinc-900 dark:text-zinc-500 text-sm font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        v-for="item in $store.getters.categorys"
        :key="item.key"
        :class="{
          ' text-zinc-900 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-900':
            $store.getters.currentCategory.id === item.id
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
/**
 * 状态切换
 */
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}

/**
 * 选择状态处理
 */
const onItemClick = (obj) => {
  store.commit('app/changeCurrentCategory', obj)
}
</script>

<style></style>

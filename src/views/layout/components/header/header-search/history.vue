<!--
 * @Description: 搜索历史记录
 * @Author:  
 * @Date: 2022-12-28 10:51:09
 * @LastEditTime: 2022-12-29 09:16:21
 * @LastEditors:  
-->
<template>
  <div>
    <div class="flex items-center text-sx mb-1 ml-1 text-zinc-400">
      <span class="text-sm font-bold">最新搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="inDeleteAllClick"
      ></m-svg-icon>
    </div>
    <div class="flex flex-wrap px-1">
      <div
        v-for="(item, index) in $store.getters.historys"
        :key="index"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          @click="deleteClick(index)"
          name="input-delete"
          class="w-2 h-2 ml-1 duration-300 rounded"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { confirm } from '@/libs'
import { useStore } from 'vuex'
const store = useStore()
// historys
/**
 * 删除全部
 */
const inDeleteAllClick = () => {
  // store.commit('search/deleteAllHistory')
  confirm('提示', '确认全部删除?')
    .then(() => {
      console.log('确认')
    })
    .catch(() => {
      console.log('取消')
    })
}
/**
 * 单个删除
 */
const deleteClick = (index) => {
  store.commit('search/deleteHistory', index)
}
</script>

<style></style>

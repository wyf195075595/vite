<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-12-08 17:25:15
 * @LastEditTime: 2022-12-29 16:05:01
 * @LastEditors:  
-->
<template>
  <div class="guide-search">
    <m-search @search="searchHandel" v-model="keyWord">
      <template v-slot:dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            @click-item="searchHandel"
            v-show="keyWord"
            :search-text="keyWord"
          ></hint-vue>
          <!-- 历史记录 -->
          <history-vue v-show="!keyWord"></history-vue>
          <!-- 推荐主题 -->
          <theme-vue v-show="!keyWord"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

let keyWord = ref('')
const searchHandel = (val) => {
  if (!val) return
  console.log('search:', val, store.getters.historys)
  // 此处应该触发列表刷新
  keyWord.value = val
  //   搜索历史新增
  store.commit('search/addHistory', val)
  //   搜索文本
  store.commit('app/changeSearchText', val)
}
// const onInput = (val) => {
//   console.log('onInput:', val)
//   //   keyWord.value = val
// }
// const onCLear = (val) => {
//   console.log('onCLear:', val)
// }
// const onFocus = (val) => {
//   console.log('onFocus:', val)
// }
// const onBlur = (val) => {
//   console.log('onBlur:', val)
// }
</script>

<style></style>

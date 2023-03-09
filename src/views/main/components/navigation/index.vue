<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-16 00:01:18
 * @LastEditTime: 2022-12-20 16:54:28
 * @LastEditors:  
-->
<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mibile/index.vue'
import pcNavigationVue from './pc/index.vue'

import { useStore } from 'vuex'

const store = useStore()
// 触发 categorie 获取数据
store.dispatch('category/useCategoryData')

// import { getCurrentInstance } from 'vue'
// const currentInstance = getCurrentInstance()
// const { $axios } = currentInstance.appContext.config.globalProperties

// $axios.get('https://www.fastmock.site/mock/a75253fac8aad5461c1f262f1515fc63/api/test')
//     .then(res=> {
//         console.log(res);
//     })
</script>

<style></style>

<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-05 11:07:09
 * @LastEditTime: 2023-01-04 14:18:23
 * @LastEditors:  
-->
<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <!-- <m-dialog title="标题" v-model="text" :cancelHandler="() => {}"
      >内容</m-dialog> -->
    <!-- <m-input type="textarea" v-model="text" :max="20" /> -->
    <!-- <m-message type="success" content="test" :duration="99999"></m-message> -->
    <m-transition-router-view
      mainComponentName="home"
      :routerType="$store.getters.routerType"
    >
    </m-transition-router-view>
  </div>
</template>

<script setup>
// import { useStore } from "vuex";
// const store = useStore()

// // 用来修改状态、触发更新的函数
// function increment() {
//   store.commit('increment')
// }

import { getCurrentInstance, ref } from 'vue'
const currentInstance = getCurrentInstance()
const { $axios } = currentInstance.appContext.config.globalProperties

// $axios.get('https://www.fastmock.site/mock/a75253fac8aad5461c1f262f1515fc63/api/test')
//   .then(res=> {
//       console.log(res);
//   })

const text = ref(true)
</script>

<style></style>

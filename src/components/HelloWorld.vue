<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-05 11:07:09
 * @LastEditTime: 2022-08-15 23:56:14
 * @LastEditors:  
-->
<template>
    {{isMobileTerminal? '手机端': 'PC端'}}
</template>

<script setup>
import {isMobileTerminal} from '@/utils/flexible'
// import { reactive } from 'vue'
// defineProps 不再需要导入
defineProps({
  msg: String
})

// const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>

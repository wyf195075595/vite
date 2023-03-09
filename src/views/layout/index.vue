<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-15 17:56:42
 * @LastEditTime: 2023-01-04 09:26:41
 * @LastEditors:  
-->
<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating.vue'
</script>

<style></style>

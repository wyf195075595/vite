<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-12-08 17:11:12
 * @LastEditTime: 2022-12-29 15:53:59
 * @LastEditors:  
-->
<template>
  <div
    class="w-full dark:bg-zinc-800 bg-white border-b border-b-zinc-200 dark:border-b-zinc-700 flex items-center"
  >
    <div class="w-full flex justify-between items-center">
      <!-- <m-svg-icon  class="w-4 h-4 mx-2" name="hamburger"></m-svg-icon> -->
      <img src="@/assets/logo.png" class="guide-home w-4 h-4 mx-2" alt="" />
      <search-vue class="w-full"></search-vue>
      <theme-vue></theme-vue>
      <my-vue></my-vue>
    </div>
  </div>
</template>

<script setup>
import MyVue from './header-my.vue'
import SearchVue from './header-search/index.vue'
import ThemeVue from './header-theme.vue'
</script>

<style></style>

<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-21 18:16:01
 * @LastEditTime: 2022-12-17 11:40:52
 * @LastEditors:  
-->
<template>
  <div class="h-8[80vh] flex flex-col bg-white dark:bg-zinc-800">
    <h2 class="my-1 text-base font-bold px-1 text-zinc-900 dark:text-zinc-200">
      所有分类
    </h2>
    <ul>
      <li
        v-for="item in $store.getters.categorys"
        :key="item.id"
        @click="$emit('onItemClick', item)"
        class="text-sm cursor-pointer text-zinc-900 dark:text-zinc-300 my-1 flex items-center indent-1 active:bg-zinc-100 dark:active:bg-zinc-900"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  onItemClick: {
    type: Function
  }
})

defineEmits(['onItemClick'])
</script>

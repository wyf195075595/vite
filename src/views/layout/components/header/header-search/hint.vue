<!--
 * @Description: 输入框联想提示
 * @Author:  
 * @Date: 2022-12-27 15:28:24
 * @LastEditTime: 2022-12-28 11:19:40
 * @LastEditors:  
-->
<template>
  <div>
    <div
      v-for="item in tips"
      :key="item.id"
      class="pl-1 py-1 box-border text-sm font-bold text-zinc-500 rounded cursor-pointer duration-300 my-1 text-left hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="heighlightText(item.text)"
      @click="clickHandle(item)"
    ></div>
  </div>
</template>

<script>
// 提示选项点击事件
const EMIT_CLICK = 'clickItem'
</script>
<script setup>
import { watchDebounced } from '@vueuse/core'
const tips = [
  { text: '类型1', id: 1 },
  { text: '类型2', id: 2 },
  { text: '类型3', id: 3 },
  { text: '类型4', id: 4 },
  { text: '类型5', id: 5 },
  { text: '类型6', id: 6 },
  { text: '类型7', id: 7 },
  { text: '类型8', id: 8 },
  { text: '类型9', id: 9 },
  { text: '类型10', id: 10 }
]

const props = defineProps({
  searchText: {
    type: String
  }
})

const emits = defineEmits([EMIT_CLICK])

const clickHandle = (item) => {
  emits(EMIT_CLICK, item.text)
}

/**
 * 这里应该是根据输入框文字请求接口获取提示数据
 *
 */

watchDebounced(
  () => props.searchText,
  (val) => {
    // 获取新的hint数据
    console.log(val)
  },
  {
    immediate: true,
    // 每次事件触发时，延迟的事件
    debounce: 500
  }
)
/**
 * 处理关键字高亮
 */
const heighlightText = (text) => {
  // 高亮文本
  const heighStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 正则表达式： 从（显示文本中） 找出于 （用户输入相同文本）使用《高亮标签》包裹
  const reg = new RegExp(props.searchText, 'gi')
  // 替换
  return text.replace(reg, heighStr)
}
</script>

<style></style>

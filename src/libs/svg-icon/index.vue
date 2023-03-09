<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-18 09:40:10
 * @LastEditTime: 2023-01-04 09:42:00
 * @LastEditors:  
-->
<template>
  <svg aria-hidden="true" :class="svgClass">
    <use
      :class="fillClass"
      :href="symbolId"
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 显示得SVG 图片名称
  name: {
    type: String,
    required: true
  },
  // 直接指定 SVG 图表颜色
  color: {
    type: String
  },
  // 指定 svg 颜色的类名
  fillClass: {
    type: String
  },
  svgClass: {
    type: String
  }
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

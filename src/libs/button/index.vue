<!--
 * @Description: 通用按钮
 * @Author:  
 * @Date: 2022-12-09 10:09:13
 * @LastEditTime: 2022-12-29 09:13:22
 * @LastEditors:  
-->
<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onButtonClick"
  >
    <!-- 展示 loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon 按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>
<script>
// type 可选项： 表示按钮风格
const typeEnum = {
  primary:
    'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white  bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 '
}
// size 可选项： 表示按钮大小，区分文字按钮与icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMIT_CLICK = 'click'
</script>
<script setup>
import mSvgIcon from '../svg-icon/index.vue'
import { computed } from '@vue/reactivity'
/**
 * 1、构建 type 风格可选项和 size 大小选项
 * 2、通过 props 让开发者控制按钮
 * 3、区分 icon button 和 text button
 * 4、一句当前的数据，实现试图
 * 5、处理点击事件
 */
const props = defineProps({
  // icon 图标
  icon: String,
  // icon 颜色
  iconColor: String,
  // icon 图标类名 （tailwind）
  iconClass: String,
  // 按钮类型
  type: {
    type: String,
    default: 'main',
    validator(val) {
      return typeEnum[val] || typeEnum.main
    }
  },
  // 按钮大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      return sizeEnum[val] || sizeEnum.default
    }
  },
  // 按钮在点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMIT_CLICK])

const sizeKey = computed(() => {
  return props.icon ? `icon-${props.size}` : props.size
})
// 点击事件
const onButtonClick = () => {
  // emits()
  if (props.loading) return
  emits(EMIT_CLICK)
}
</script>

<style lang="scss" scoped></style>

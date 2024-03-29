<!--
 * @Description: 
 * @Author:  
 * @Date: 2023-01-03 15:13:23
 * @LastEditTime: 2023-01-03 15:44:08
 * @LastEditors:  
-->
<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisiable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-10 fixed top-0 left-0-"
      ></div>
    </transition>
    <!-- 内容区 -->
    <transition name="up">
      <div
        v-if="isVisiable"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-20 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
const props = defineProps({
  // 控制开关
  modelValue: {
    type: Boolean,
    required: true
  },
  // 标题
  title: {
    type: String
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消按钮事件
  cancelHandler: {
    type: Function
  },
  // 确认按钮事件
  confirmHandler: {
    type: Function
  },
  // 关闭按钮事件
  close: {
    type: Function
  }
})

defineEmits(['update:modelValue'])

// 控制显示
const isVisiable = useVModel(props)
/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
  props.cancelHandler && props.cancelHandler()
  close()
}
/**
 * 确认按钮点击事件
 */
const onConfirmClick = () => {
  props.confirmHandler && props.confirmHandler()
  close()
}
/**
 * 关闭事件
 */
const close = () => {
  isVisiable.value = false
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>

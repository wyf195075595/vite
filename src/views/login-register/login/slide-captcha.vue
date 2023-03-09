<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-12-30 16:38:55
 * @LastEditTime: 2023-01-03 09:12:31
 * @LastEditors:  
-->
<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <m-svg-icon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></m-svg-icon>
      <m-svg-icon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></m-svg-icon>
    </div>
    <div id="captcha"></div>
  </div>
</template>
<script>
const EMIT_RESET = 'reset'
const EMIT_CLOSE = 'close'
const EMIT_SUCCESS = 'success'
</script>
<script setup>
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import { onMounted } from 'vue-demi'

/**
 * 使用 行为验证
 * 1、创建 captcha 实例
 * 2、
 */
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 用户拼图成功之后的回调
    onSuccess(arr) {
      console.log(arr)
      emits(EMIT_SUCCESS)
    },
    // 用户拼图失败之后的回调
    onFail() {
      console.log('onFail')
    },
    // 默认方法
    verify() {
      return true
    }
  })
})

const emits = defineEmits([EMIT_CLOSE, EMIT_RESET])
const onReset = () => {
  captcha.reset()
}

const onClose = () => {
  emits(EMIT_CLOSE)
}
</script>

<style></style>

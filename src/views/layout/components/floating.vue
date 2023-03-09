<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-15 17:56:42
 * @LastEditTime: 2022-12-29 16:21:16
 * @LastEditors:  
-->
<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></m-svg-icon>
        </div>
      </template>
      <!-- 下拉区域 -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-700"
        >
          <m-svg-icon
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
            name="feedback"
          >
          </m-svg-icon>
          <span class="text-sm text-zinc-900 dark:text-zinc-300">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
// 1、导入
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue-demi'
import steps from './steps'

// 2、初始化
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步'
  })
})

/**
 * 开始引导
 */
const onGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}
</script>

<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100005 !important;
}
</style>

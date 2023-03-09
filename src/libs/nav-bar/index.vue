<!--
 * @Description: 导航头
 * @Author:  
 * @Date: 2022-12-30 10:18:56
 * @LastEditTime: 2022-12-30 11:43:41
 * @LastEditors:  
-->
<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 dark:bg-zinc-800 bg-white border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="clickLeft"
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        >
        </m-svg-icon>
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      @click="clickRight"
      class="h-full w-5 absolute right-0 flex items-center justify-center"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  // 左边按钮点击事件
  clickLeft: Function,
  // 右边按钮点击事件
  clickRight: Function,
  // 是否吸顶
  sticky: Boolean
})

const clickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
  } else {
    router.back()
  }
}
const clickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>

<style lang="scss" scoped></style>

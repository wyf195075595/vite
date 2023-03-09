<!--
 * @Description: 列表项
 * @Author:  
 * @Date: 2022-12-19 11:43:54
 * @LastEditTime: 2022-12-30 13:48:45
 * @LastEditors:  
-->
<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1 overflow-hidden"
  >
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ backgroundColor: randonRGB() }"
      @click="onToPinsClick(data)"
    >
      <!-- 图片 指定最小高度，不然懒加载时会有问题-->
      <img
        v-lazy
        class="w-full rounded bg-transparent"
        :src="data.image"
        alt=""
        style="height: 350px"
        ref="imgTarget"
      />
      <!-- 遮罩层 移动端隐藏，pc端才展示-->
      <div
        class="hidden opacity-0 w-full h-full duration-300 bg-zinc-900/50 absolute top-0 left-0 rounded group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5"
          type="info"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.name }}
    </p>
    <!-- 作者信息 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.image" alt="" />
      <span class="text-sm text-zinc-300 mx-1">xxx</span>
    </div>
  </div>
</template>

<script setup>
import { randonRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { useElementBounding, useFullscreen } from '@vueuse/core'
import { computed, ref } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {}
  },
  width: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['click'])

/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  // 图片地址
  const downlink = 'https://dummyimage.com/200x350/ffcc33/FFF.png' //props.data.image // http://dummyimage.com/200x350/ffcc33/FFF.png&text=Fast Mock
  message('success', '准备下载')
  setTimeout(() => saveAs(downlink), 1500)
}

/**
 * 生成全屏方法
 */
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)

/**
 * pins 跳转记录， 记录图片的中心点（X|Y 位置 + 宽|高 一半）
 */
// const {
//   x: imgContainerX,
//   y: imgContainerY,
//   width: imgContainerWidth,
//   height: imgContainerHeight
// } = useElementBounding(imgTarget)
const imgContainerCenter = computed(() => {
  const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
  } = imgTarget.value.getBoundingClientRect()
  return {
    translateX: parseInt(imgContainerX + imgContainerWidth / 2),
    translateY: parseInt(imgContainerY + imgContainerHeight / 2)
  }
})

/**
 * 进入详情点击事件
 */
const onToPinsClick = (item) => {
  emits('click', {
    ...item,
    location: imgContainerCenter.value
  })
}
</script>

<style></style>

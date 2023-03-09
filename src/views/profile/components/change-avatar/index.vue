<!--
 * @Description: 
 * @Author:  
 * @Date: 2023-01-03 16:00:54
 * @LastEditTime: 2023-01-03 17:01:36
 * @LastEditors:  
-->
<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      @click="close"
      v-if="isMobileTerminal"
      name="close"
      fillClass="fill-zinc-900 dark:fill-zinc-200 absolute top-0 right-0"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button
      @click="onConfirmClick"
      class="mt-4 w-[80%] xl:w-1/2"
      :loading="loading"
      >确认</m-button
    >
  </div>
</template>

<script>
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>
<script setup>
import { ref, onMounted } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
const props = defineProps({
  blob: {
    type: String,
    required: true
  }
})

const loading = ref(false)
const imageTarget = ref(null)
const emits = defineEmits('close')
/**
 * 关闭按钮
 */

const close = () => {
  emits('close')
}

let cropper
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal ? mobileOptions : pcOptions
  )
})

const onConfirmClick = () => {
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    console.log(URL.createObjectURL(blob))
    // putObjectToOSS(blob)
  })
}
</script>

<style></style>

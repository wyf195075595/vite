<!--
 * @Description: 长列表
 * @Author:  
 * @Date: 2022-12-21 11:01:01
 * @LastEditTime: 2022-12-21 13:40:49
 * @LastEditors:  
-->
<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
        v-if="loading"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多数据了
      </p>
    </div>
  </div>
</template>

<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue'
const props = defineProps({
  // 是否处于加载状态，双向数据绑定
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onload', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动元素
const loadingTarget = ref(null)

// 目标元素是否在可视区域
const targetIsIntersecting = ref(false)

useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  reload()
})
const reload = () => {
  // 当加载更多的视图可见时，处理加载更多 (前提条件，不是正在加载，不是数据已加载完)
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    // 修改加载数据标记
    loading.value = true
    // 触发加载更多
    emits('onload')
  }
}
/**
 * 由于 useIntersectionObserver 对于出现可视区域只会回调一次，
 * 如果第一次加载数据过少展示不超过一屏，此时虽然元素在可是区域却不会再次触发回调
 * 会导致无法 下拉加载更多
 * 所以我们监听 loading 状态来解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, (val) => {
  //  触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
  setTimeout(() => reload(), 200)
})
</script>

<style></style>

<!--
 * @Description: 倒计时组件
 * @Author:  
 * @Date: 2023-01-04 15:36:48
 * @LastEditTime: 2023-01-04 16:46:54
 * @LastEditors:  
-->
<template>
  <div>
    <slot>
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>

<script>
// 倒计时结束
const EMITS_FINISH = 'finish'
// 倒计时改变
const EMITS_CHANGE = 'change'
</script>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import dayjs from './utils'
const props = defineProps({
  // 毫秒事件
  time: {
    type: Number,
    required: true
  },
  // 时间格式， 遵循 dayjs format 标准
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

// 倒计时时长
let duration = ref(0)

// 倒计时时间间隔
const INTERVAL_COUNT = 1000
/**
 * 开始倒计时
 */
let intereval
const start = () => {
  close()
  intereval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}
/**
 * 倒计时的执行行为
 */
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  // 每次减少的动作监听
  emits(EMITS_CHANGE)
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}

/**
 * 倒计时结束
 */
const close = () => {
  if (intereval) clearInterval(intereval)
}

/**
 * 显示时间格式
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

watch(
  () => props.time,
  (val) => {
    if (val) {
      duration.value = val
      start()
    }
  },
  { immediate: true }
)

// 组件销毁时，清理倒计时
onUnmounted(() => {
  close()
})
</script>

<style></style>

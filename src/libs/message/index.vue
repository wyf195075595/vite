<!--
 * @Description: 提示框
 * @Author:  
 * @Date: 2022-12-29 13:40:27
 * @LastEditTime: 2022-12-29 14:57:49
 * @LastEditors:  
-->
<template>
  <transition name="down">
    <div
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded border cursor-pointer"
      :class="styles[type].containerClass"
      v-show="isVisable"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="w-1.5 h-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup>
import { onMounted, ref } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
  // 消息类型
  type: {
    type: String,
    required: true,
    validator(val) {
      return typeEnum.includes(val) ? val : SUCCESS
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  // 展示时长
  duration: {
    type: Number
  },
  // 关闭的回调
  destory: {
    type: Function
  }
})

/**
 * 样式表数据
 */
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass: 'bg-warn-100 border-warn-200 hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass: 'bg-error-100 border-error-200 hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass: 'bg-success-100 border-success-200 hover:shadow-success-100'
  }
}

const isVisable = ref(false)
const animationDuration = '0.5s'
onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
    setTimeout(() => {
      props.destory && props.destory()
    }, parseInt(animationDuration.replace('0.', '').replace('s', '')) * 100)
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animationDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>

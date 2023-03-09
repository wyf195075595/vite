<!--
 * @Description: 通用气泡卡弹出层
 * @Author:  
 * @Date: 2022-12-13 15:24:27
 * @LastEditTime: 2022-12-17 12:23:26
 * @LastEditors:  
-->
<template>
  <!-- vue3 允许template 有多个根元素，但是在某些情况下可能会出现某些错误 -->
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="referenceTarget">
      <!-- 剧名插槽： 触发弹出层的视图 -->
      <slot name="reference" />
    </div>
    <transition name="slide">
      <div
        v-show="isViable"
        ref="contentTarget"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 dark:border-zinc-700 border rounded-md"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'
const isViable = ref(false)

/**
 * 1、指定所有可选位置的常量，并生成 enum
 * 2、通过 prop 控制指定位置
 * 3、获取元素的 DOM，创建读取元素尺寸的方法
 * 4、生成气泡的样式对象，用来控制每个位置对应的样式
 * 5、根据prop，计算样式对象
 */
const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const rs = placementEnum.includes(val)
      if (!rs) {
        throw new Error(`位置参数必须是${placementEnum.toString()}中的一个`)
      }
      return val
    }
  }
})

/**
 * 计算元素的尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)
let timer = null
const DELAY_TIME = 300
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
/**
 * 气泡样式
 *
 */
const contentStyle = ref({
  top: 0,
  left: 0
})
// 计算： 期望气泡展示的时候再进行计算
watch(isViable, (val) => {
  if (!val) return
  // vue 在数据改变之后，等待一段时间 DOM 才会变化, （v-if 会触发，v-show 不会触发）
  nextTick(() => {
    const style = useElementSize(contentTarget.value)
    const referenceTargetStyle = useElementSize(referenceTarget.value)
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value = {
          top: 0,
          left: -style.width + 'px'
        }
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value = {
          top: 0,
          left: referenceTargetStyle.width + 'px'
        }
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value = {
          top: referenceTargetStyle.height + 'px',
          left: -style.width + 'px'
        }
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value = {
          top: referenceTargetStyle.height + 'px',
          left: referenceTargetStyle.width + 'px'
        }
        break
    }
  })
})

/**
 * 鼠标移入触发
 */
const onMouseEnter = () => {
  isViable.value = true
  if (timer) {
    clearTimeout(timer)
  }
}

/**
 * 鼠标移出触发
 */
const onMouseLeave = () => {
  timer = setTimeout(() => {
    isViable.value = false
    timer = null
  }, DELAY_TIME)
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

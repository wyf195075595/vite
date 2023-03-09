<!--
 * @Description: 通用搜索框
 * @Author:  
 * @Date: 2022-12-08 17:56:34
 * @LastEditTime: 2022-12-29 16:03:16
 * @LastEditors:  
-->
<template>
  <div
    class="relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40 flex items-center group"
    ref="containerTarget"
  >
    <!-- 搜索图表 -->
    <m-svg-icon class="w-1.5 h-1.5 absolute left-2" name="search"></m-svg-icon>
    <!-- 输入框 -->
    <input
      class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-medium border dark:border-zinc-700 border-zinc-100 focus:border-red-300 text-sm duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
      type="text"
      placeholder="搜索"
      v-model="newValue"
      @keyup.enter="onSearchHandel"
      @focus="focusChange(true)"
    />
    <!-- 删除图表 -->
    <m-svg-icon
      v-show="newValue"
      @click="handelClear"
      class="w-1.5 h-1.5 absolute right-[70px] duration-500"
      name="input-delete"
    >
    </m-svg-icon>

    <!-- 分割线 -->
    <div
      class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
    ></div>
    <!-- 搜索按钮 通用组件 -->
    <m-button
      @click="onSearchHandel"
      icon="search"
      class="opacity-0 absolute right-1.5 duration-500 group-hover:opacity-100"
      iconColor="#fff"
      iconClass=""
    >
    </m-button>
    <!-- 下拉区域 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[46px] pt-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <!-- 搜索浮窗 -->
        <slot name="dropdown" ref="slot"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
// 双向绑定事件
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 搜索事件
const EMIT_SEARCH = 'search'
// 删除所有文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>
<script setup>
/**
 * 1、输入内容实现双向文本, 这里没有使用 vueUse 函数
 * 2、搜索按钮 hover 展示
 * 3、一键清空文本功能
 * 4、触发搜索
 * 5、控制下拉展示区域展示
 * 6、事件处理
 */
// 搜索监听
const onSearchHandel = () => {
  emits(EMIT_SEARCH, props.modelValue)
}

// 事件注册
const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])
// 参数注册
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})
// 双向绑定原生写法
let newValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits(EMIT_INPUT, val)
    emits(EMIT_UPDATE_MODELVALUE, val)
  }
})
// 清空输入框
const handelClear = () => {
  emits(EMIT_UPDATE_MODELVALUE, '')
  emits(EMIT_CLEAR)
}
// input 是否获取到焦点
const isFocus = ref(false)
// search 搜索组件最外层容器
const containerTarget = ref(null)

// 点击区域外隐藏浮窗
onClickOutside(containerTarget, () => {
  focusChange(false)
})
// 焦点变化
const focusChange = (status) => {
  // 根据焦点状态触发不同的事件
  if (status) {
    emits(EMIT_FOCUS)
  } else {
    emits(EMIT_BLUR)
  }
  isFocus.value = status
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>

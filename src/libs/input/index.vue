<!--
 * @Description: 
 * @Author:  
 * @Date: 2023-01-03 10:58:57
 * @LastEditTime: 2023-01-03 11:53:23
 * @LastEditors:  
-->
<template>
  <div class="relative">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border text-sm outline-0 py-0.5 px-1 rounded focus:border-blue-400 w-full"
      type="text"
      v-model="text"
      :maxlength="max"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border text-sm outline-0 py-0.5 px-1 rounded focus:border-blue-400 w-full"
      v-model="text"
      :maxlength="max"
      rows="5"
    />
    <!-- 最大长度提示 -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<script>
// 单行
const TYPE_TEXT = 'text'
// 多行
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue-demi'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: TYPE_TEXT,
    validator: (val) => {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      let rs = arr.includes(val)
      if (!rs) {
        console.warn('输入框类型可选值:', arr.toString())
      }
      return rs
    }
  },
  max: {
    type: [Number, String]
  }
})

defineEmits(['update:modelValue'])

// 输入的字符
const text = useVModel(props)

// 输入的字符串数
const currentNumber = computed(() => {
  return text.value?.length
})
</script>

<style></style>

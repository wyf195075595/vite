<!--
 * @Description: 列表
 * @Author:  
 * @Date: 2022-12-19 11:43:44
 * @LastEditTime: 2022-12-30 13:47:50
 * @LastEditors:  
-->
<template>
  <div>
    <m-infinite v-model="isLoading" :isFinished="isFinished" @onload="getList">
      <!-- 
          data: 数据源
          nodeKey: 唯一标识
          column: 渲染的列数
          picturePreReading: 是否需要图片预渲染
       -->
      <m-waterfall
        class="px-1"
        :data="picList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="true"
      >
        <template v-slot="{ item, width }">
          <item-vue @click="onTopins" :data="item" :width="width"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>

    <!-- 详情内容展示 -->
    <transition
      :css="false"
      @before-enter="boforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue
        v-if="isShowPins"
        :id="currentPins.id"
        :data="currentPins"
      ></pins-vue>
    </transition>
  </div>
</template>

<script setup>
import { getPicList } from '@/api'
import { ref, onMounted, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import ItemVue from './item.vue'
import pinsVue from '../../../pins/components/pins.vue'
import gsap from 'gsap'
import store from '@/store'
import { useEventListener } from '@vueuse/core'
const picList = ref([])

const isLoading = ref(false)
const isFinished = ref(false)
// 请求参数
let querys = {
  page: 1,
  size: 20
}
const getList = async () => {
  // 数据加载完了不做处理
  if (isFinished.value) return
  // 分页参数自增
  if (picList.value.length) {
    querys.page++
  }

  let rs = await getPicList(querys)
  if (querys.page === 1) {
    picList.value = rs.data.list
  } else {
    picList.value.push(...rs.data.list)
  }
  // 数据加载完了
  if (picList.value.length >= rs.data.totalRecord) {
    isFinished.value = true
  }
  // 关闭loading
  isLoading.value = false
}

/**
 * 重置 querys 参数
 */
const resetQuery = (newQuery) => {
  // 修改请求参数
  querys = {
    ...querys,
    ...newQuery
  }
  // 清除标识
  isFinished.value = false
  // 当设置数据为空时，长列表显示更多出现在可视区域，因此会触发一次列表请求
  picList.value = []
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (cur) => {
    resetQuery({
      page: 1,
      type: cur.id
    })
  }
)
/**
 * 监听 searchText 的变化
 */
watch(
  () => store.getters.searchText,
  (cur) => {
    resetQuery({
      page: 1,
      keyword: cur.id
    })
  }
)

// 控制详情页展示
const isShowPins = ref(false)
const currentPins = ref(null)
/**
 * 进入 topins
 */
const onTopins = (data) => {
  console.log(data)
  // 修改浏览器的 url
  history.pushState(null, null, `/pins/${data.id}`)
  isShowPins.value = true
  currentPins.value = data
}
/**
 * 监听浏览器后退事件
 */
useEventListener(window, 'popstate', () => {
  isShowPins.value = false
})

// 动画处理
const boforeEnter = (el, done) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
</script>

<style></style>

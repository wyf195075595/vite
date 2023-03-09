<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-08-17 23:22:39
 * @LastEditTime: 2023-01-04 15:10:29
 * @LastEditors:  
-->
<template>
  <div
    ref="containerTarget"
    class="scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent h-full overflow-auto bg-white dark:bg-zinc-800 duration-500"
  >
    <navigation-vue />
    <div class="h-full max-w-screen-xl mx-auto relative xl:mt-4 box-border">
      <list-vue></list-vue>
    </div>
    <!-- 移动端下的 tabbar -->
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        icon="home"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        icon="vip"
        textClass="text-zinc-400 dark:text-zinc-500"
        v-if="$store.getters.token"
        @click="clickVip"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        icon="profile"
        @click="clickProfile($store.getters.token)"
      >
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<script setup>
import navigationVue from '@/views/main/components/navigation/index.vue'
import listVue from '@/views/main/components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import { onActivated, ref } from 'vue'
const store = useStore()
const router = useRouter()

/**
 * 记录滚动位置
 */
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见时，会触发 activity
onActivated(() => {
  if (containerTarget.value) {
    containerTarget.value.scrollTop = containerTargetScrollY.value
  }
})

const clickVip = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/member')
}
console.log('main:组件被渲染')
const clickProfile = (token) => {
  store.commit('app/changeRouterType', 'push')
  if (token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped></style>

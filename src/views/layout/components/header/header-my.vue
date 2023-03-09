<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-12-08 17:25:15
 * @LastEditTime: 2023-01-04 15:07:39
 * @LastEditors:  
-->
<template>
  <div class="mx-2">
    <m-popover>
      <template #reference>
        <div
          v-if="$store.getters.userInfo.nickname"
          class="flex items-center p-0.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <!-- 头像 -->
          <img
            :src="$store.getters.userInfo.avatar"
            class="w-3 h-3 rounded-sm"
            alt=""
          />
          <!-- 下箭头 -->
          <m-svg-icon
            class="w-1.5 h-1.5 ml-0.5"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
            name="down-arrow"
          >
          </m-svg-icon>
          <!-- VIP标识 -->
          <m-svg-icon
            v-show="$store.getters.userInfo.vipLevel"
            class="w-1.5 h-1.5 absolute right-[16px] self-end"
            name="vip"
          >
          </m-svg-icon>
        </div>
        <div v-else>
          <m-button
            icon="profile"
            iconColor="#fff"
            @click="onToLogin"
          ></m-button>
        </div>
      </template>
      <div
        v-if="$store.getters.userInfo.nickname"
        class="w-[140px] overflow-hidden"
      >
        <div
          class="flex items-center p-1 cursor-pointer rounded dark:hover:bg-zinc-700 hover:bg-zinc-100/60"
          v-for="item in menuArr"
          :key="item.id"
          @click="clickItem(item)"
        >
          <m-svg-icon
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
            :name="item.icon"
          >
          </m-svg-icon>
          <span class="text-sm text-zinc-800 dark:text-zinc-300">{{
            item.title
          }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { confirm } from '@/libs'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const menuArr = [
  { id: 0, icon: 'profile', path: '/profile', title: '个人资料' },
  { id: 1, icon: 'vip-profile', path: '/memeber', title: '升级 VIP' },
  { id: 2, icon: 'logout', path: '', title: '推出登录' }
]

/**
 * 登录按钮
 */
const onToLogin = () => {
  router.push('/login')
}

/**
 * 下拉框事件
 */
const clickItem = (item) => {
  if (item.icon === 'logout') {
    confirm('提示', '确认退出？').then((res) => {
      store.dispatch('user/logout')
    })
  } else if (item.icon === 'vip-profile') {
    store.commit('app/changeRouterType', 'push')
    router.push(item.path)
  } else if (item.icon === 'profile') {
    store.commit('app/changeRouterType', 'push')
    router.push(item.path)
  }
}
</script>

<style></style>

<!--
 * @Description: 个人资料
 * @Author:  
 * @Date: 2023-01-03 11:40:32
 * @LastEditTime: 2023-01-04 14:16:01
 * @LastEditors:  
-->
<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 overflow-auto">
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-300 xl:rounded-sm xs:border-zinc-200 xl:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 移动端 navbar -->
      <m-nav-bar sticky v-if="isMobileTerminal" :clickLeft="clickLeft">
        个人资料
      </m-nav-bar>
      <!-- pc 端 标题 -->
      <div v-else class="text-lg text-center font-bold mb">个人资料</div>
      <div class="h-full w-full px-1 text-sm xl:w-2/3 xl:pb-0">
        <div class="py-1 xl:absolute xl:right-[5%] xl:text-center">
          <span class="text-base font-bold mb-2 dark:text-zinc-300"
            >我的头像</span
          >
          <!-- 头像 -->
          <div class="relative group">
            <img
              class="rounded-full h-[150px] w-[150px]"
              src="https://place.dog/300/300"
              alt="头像"
            />
            <div
              class="w-[150px] h-[150px] group-hover:opacity-100 text-sm duration-300 opacity-0 cursor-pointer absolute top-0 left-0 rounded-full text-white dark:text-zinc-300 bg-zinc-500 z-10 flex items-center justify-center"
              @click="this.$refs.inputFileTarget.click()"
            >
              点击更换头像
            </div>
            <span class="text-sm text-zinc-400">
              支持jpg,png,jpeg 格式，大小5M以内的图片
            </span>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
        </div>

        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input
            v-model="userInfo.title"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input
            v-model="userInfo.company"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input
            v-model="userInfo.homePage"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>

    <!-- pc 弹窗 -->
    <m-dialog
      v-if="!isMobileTerminal"
      title="裁剪头像"
      v-model="isDialogVisible"
    >
      <change-avatar-vue
        :blob="currentBlob"
        @close="closeDialog"
      ></change-avatar-vue>
      <!-- <img :src="currentBlob" alt="" /> -->
    </m-dialog>
    <!-- 移动端展示弹窗 -->
    <m-popup
      v-model="isDialogVisible"
      :class="{ 'h-[80%]': isDialogVisible }"
      class="overflow-auto"
      v-else
    >
      <change-avatar-vue
        :blob="currentBlob"
        @close="closeDialog"
      ></change-avatar-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue-demi'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { message, confirm } from '@/libs'
import changeAvatarVue from './components/change-avatar/index.vue'
const router = useRouter()
const store = useStore()
const loading = ref(false)
let userInfo = ref({
  nickname: '',
  title: '',
  company: '',
  homePage: '',
  introduction: ''
})
console.log('profile:组件被渲染')

// 裁剪弹窗
const isDialogVisible = ref(false)
// 选中的文件
const currentBlob = ref(null)
//
const inputFileTarget = ref(0)

onMounted(() => {
  if (store.getters.userInfo) {
    userInfo.value = {
      ...userInfo.value,
      ...store.getters.userInfo
    }
  }
})
// 上传图片
const onSelectImgHandler = (obj) => {
  console.log('上传图片：', obj.target.files[0])
  let file = obj.target.files[0]
  //   生成 blob 对象
  let blob = window.URL.createObjectURL(file)
  currentBlob.value = blob
  isDialogVisible.value = true
}
/**
 * 关闭pc裁剪弹窗
 */
const closeDialog = () => {
  isDialogVisible.value = false
  inputFileTarget.value.value = null
}

// 保存修改
const onChangeProfile = () => {
  console.log('onChangeProfile:', userInfo)
  let payload = {
    ...store.getters.userInfo,
    ...userInfo.value
  }
  console.log('payload', payload)
  loading.value = true
  setTimeout(() => {
    store.commit('user/setUserInfo', payload)
    message('success', '修改用户信息成功！')
    loading.value = false
  }, 1000)
}

const clickLeft = () => {
  store.commit('app/changeRouterType', 'back')
  router.push('/')
}
// 推出登录
const onLogoutClick = () => {
  confirm('提示', '确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}
</script>

<style></style>

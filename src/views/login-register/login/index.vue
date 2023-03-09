<!--
 * @Description: 
 * @Author:  
 * @Date: 2022-12-30 14:33:10
 * @LastEditTime: 2023-01-04 13:47:57
 * @LastEditors:  
-->
<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标：PC端 -->
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <!-- <form>
        <input
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus-border-b-zinc-200 xl:default:bg-zinc-900"
          name="username"
          placeholder="用户名"
          autocomplete="on"
        />
        <input
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus-border-b-zinc-200 xl:default:bg-zinc-900"
          name="passworld"
          placeholder="密码"
          autocomplete="on"
        />
      </form> -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          :rules="validateUsername"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          :rules="validatePassword"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
          >
            去注册
          </a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </m-button>
      </vee-form>
      <!-- 滑块验证 -->
      <slide-captche
        @success="onSuccess"
        v-if="isShowSlide"
        @close="isShowSlide = false"
      ></slide-captche>
      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <qq-login-vue></qq-login-vue>
        <!-- 微信 -->
        <weixin-login-vue></weixin-login-vue>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import headerVue from '../components/header.vue'
import qqLoginVue from './qq-login.vue'
import weixinLoginVue from './weixin-login.vue'
import { validateUsername, validatePassword } from '../validate'
import SlideCaptche from './slide-captcha.vue'
import { ref } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

const loginForm = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const isShowSlide = ref(false)
/**
 * 校验规则
 */

/**
 * 表单提交,只有在表单校验通过之后触发
 */
const onLoginHandler = () => {
  isShowSlide.value = true
  loading.value = true
  console.log(loginForm)
}

/**
 * 去注册
 */
const onToRegister = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
}

// 验证成功
const onSuccess = () => {
  isShowSlide.value = false
  loading.value = false
  store.dispatch('user/login', loginForm)
  setTimeout(() => {
    store.commit('app/changeRouterType', 'push')
    router.push('/')
  }, 1000)
}
</script>

<style></style>

<!--
 * @Description: 会员
 * @Author:  
 * @Date: 2023-01-04 14:45:07
 * @LastEditTime: 2023-01-04 16:53:50
 * @LastEditors:  
-->
<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <m-nav-bar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">
        精选会员
      </m-nav-bar>

      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP，畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item-vue
            v-for="item in vipPayList"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :data="item"
            @click="onChangeCurrentPay(item)"
          ></pay-menu-item-vue>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>

        <!-- 支付 -->
        <payment-vue class="mt-4" :payData="currentPayData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import paymentVue from './components/payment/index.vue'
import payMenuItemVue from './components/pay-menu-item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
// 所有支付数据
const list = [
  {
    id: 0,
    title: '连续包月',
    desc: '次月 ￥19 续费，可随时取消',
    oldPrice: '29',
    price: '19',
    isHot: true
  },
  {
    id: 1,
    title: '连续包年',
    desc: '次年 ￥198 续费，可随时取消',
    oldPrice: '258',
    price: '198'
  },
  {
    id: 2,
    title: '连续包季',
    desc: '次季 ￥53 续费，可随时取消',
    oldPrice: '68',
    price: '53'
  },
  { id: 3, title: '月卡', desc: '', oldPrice: '39', price: '29' },
  { id: 4, title: '季月', desc: '', oldPrice: '79', price: '68' },
  { id: 5, title: '年卡', desc: '', oldPrice: '298', price: '258' }
]
const vipPayList = ref(list)
// 选中的支付数据
const currentPayData = ref(list[0])

const onChangeCurrentPay = (item) => {
  currentPayData.value = item
}

const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}
</script>

<style></style>

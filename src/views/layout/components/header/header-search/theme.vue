<!--
 * @Description: 热门精选
 * @Author:  
 * @Date: 2022-12-29 10:38:16
 * @LastEditTime: 2022-12-29 11:20:06
 * @LastEditors:  
-->
<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400 indent-1">热门精选</div>
    <div class="flex h-[140px] px-1 py-1 box-border" v-if="themes.list.length">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randonRGB()
        }"
      >
        <img
          :src="themes.big.photo"
          class="h-full w-full object-cover rounded"
          alt=""
        />
        <p
          class="text-white absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur hover:backdrop-blur-none"
        >
          # happy
        </p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themes.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1 rounded"
        >
          <img
            v-lazy
            class="w-full h-full object-cover rounded"
            :src="item.photo"
          />
          <p
            class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur px-1 hover:backdrop-blur-none"
          >
            # happy
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { randonRGB } from '@/utils/color'
import { ref } from 'vue-demi'
const data = {
  big: { photo: 'http://dummyimage.com/350x200/ffcc33/FFF.png&text=Fast Mock' },
  list: [
    {
      id: 1,
      photo: 'http://dummyimage.com/350x260/ffcc33/FFF.png&text=Fast Mock'
    },
    {
      id: 2,
      photo: 'http://dummyimage.com/350x260/ffcc33/FFF.png&text=Fast Mock'
    },
    {
      id: 3,
      photo: 'http://dummyimage.com/350x260/ffcc33/FFF.png&text=Fast Mock'
    },
    {
      id: 4,
      photo: 'http://dummyimage.com/350x260/ffcc33/FFF.png&text=Fast Mock'
    },
    {
      id: 5,
      photo: 'http://dummyimage.com/350x260/ffcc33/FFF.png&text=Fast Mock'
    },
    {
      id: 6,
      photo: 'http://dummyimage.com/350x260/ffcc33/FFF.png&text=Fast Mock'
    }
  ]
}
const themes = ref(data)
</script>

<style></style>

<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-200">
    <pins-vue :id="$route.params.id" :data="testData"></pins-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import pinsVue from './components/pins.vue'
const testData = ref({
  name: '测试',
  id: '1997',
  image: 'https://dummyimage.com/200x350/ffcc33/FFF.png'
})
</script>

<style></style>

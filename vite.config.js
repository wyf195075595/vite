/*
 * @Description: 
 * @Author:  
 * @Date: 2022-08-05 11:07:09
 * @LastEditTime: 2022-08-18 10:18:18
 * @LastEditors:  
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定要缓存的文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club/',
        changeOrigin: true,
        // rewrite: 
      }
    }
  }
})

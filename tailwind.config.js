/*
 * @Description: 
 * @Author:  
 * @Date: 2022-08-15 10:41:37
 * @LastEditTime: 2022-12-29 15:31:08
 * @LastEditors:  
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: [], purge在3.0 更改为 content
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  // 暗黑模式手动切换，不是默认的跟随系统
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)'
      },
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b'
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      },
      backdropBlur: {
        '4xl': '240px'
      },
      variants: {
        scrollbar: ['dark']
      },
      // 默认 插件滚动条不支持暗黑模式，需如下配置
      variants: {
        scrollbar: ['dark']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
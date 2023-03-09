/*
 * @Description: 统一注册指令
 * @Author:  
 * @Date: 2022-12-22 10:29:04
 * @LastEditTime: 2022-12-23 10:58:16
 * @LastEditors:  
 */

import {
    defineAsyncComponent
} from 'vue'

export default {
    install(app) {
        const directives =
            import.meta.globEager('./modules/*.js')
        for (const [key, value] of Object.entries(directives)) {
            // 拼接指令注册的 name
            console.log(key);
            const name = key.split('/')[2].replace('.js', '')
            // 通过 defineAsyncComponent 异步导入指定路径下的组件
            app.directive(name, defineAsyncComponent(value))
        }
    }
}
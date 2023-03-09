/*
 * @Description: 自动注册组件
 * @Author:  
 * @Date: 2022-08-18 10:04:13
 * @LastEditTime: 2022-12-29 14:14:10
 * @LastEditors:  
 */
import {
    defineAsyncComponent
} from 'vue'

export {
    confirm
}
from './confirm'
export {
    message
}
from './message'
export default {
    install(app) {
        const components =
            import.meta.glob('./*/index.vue')
        for (const [key, value] of Object.entries(components)) {
            // 拼接组件注册的 name
            const componentName = 'm-' + key.replace('./', '').split('/')[0]
            // 通过 defineAsyncComponent 异步导入指定路径下的组件
            app.component(componentName, defineAsyncComponent(value))
        }
    }
}
/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-28 15:47:18
 * @LastEditTime: 2022-12-29 14:18:11
 * @LastEditors:  
 */
import {
    h,
    render
} from 'vue'
import messsageComponent from './index.vue'
/**
 * 展示 message
 * @param {*} type 提示框类型
 * @param {*} content 内容 
 * @param {*} duration  展示时间，默认 3000ms
 */
export const message = (type, content, duration = 3000) => {
    /**
     * 关闭回调
     */
    const destory = () => {
        //3、 删除之前渲染的 message
        render(null, document.body)
    }

    // 1、生成 vnode
    const vnode = h(messsageComponent, {
        type,
        content,
        duration,
        destory,
    })

    // 2、 render 函数
    render(vnode, document.body)
}
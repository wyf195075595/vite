/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-28 15:47:18
 * @LastEditTime: 2022-12-29 09:14:53
 * @LastEditors:  
 */
import {
    h,
    render
} from 'vue'
import confirmComponent from './index.vue'
/**
 * 展示confirm
 * @param {*} title 标题 （没穿内容，则标题被当作内容）
 * @param {*} content 内容 （没有 title， 那么 content 会被作为第一个参数传入）
 * @param {*} cancelText  取消按钮文字
 * @param {*} confirmText 确认按钮文字
 */
export const confirm = (title, content, cancelText, confirmText) => {
    return new Promise((resolve, reject) => {
        // 只传一个参数，则处理为 内容
        if (title && !content) {
            content = title
            title = ''
        }
        /**
         * 关闭回调
         */
        const close = () => {
            // 删除之前渲染的 confirm
            render(null, document.body)
        }

        /**
         * 确认按钮回调
         */
        const confirmHandler = () => {
            resolve()
        }

        /**
         * 取消按钮回调
         */
        const cancelHandler = () => {
            reject(new Error('取消操作！'))
        }

        // 1、生成 vnode
        const vnode = h(confirmComponent, {
            title,
            content,
            cancelText,
            confirmText,
            close,
            confirmHandler,
            cancelHandler
        })

        // 2、 render 函数
        render(vnode, document.body)
    })
}
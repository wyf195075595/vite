/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-23 11:00:03
 * @LastEditTime: 2022-12-23 11:01:40
 * @LastEditors:  
 */
/**
 * 生成随机色值
 */

export const randonRGB = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r},${g},${b})`
}
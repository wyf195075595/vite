import {
    useIntersectionObserver
} from "@vueuse/core";

/*
 * @Description: 图片懒加载， 再瀑布流中使用时，需要获取图片高度信息，不然定位会不准确
 * @Author:  
 * @Date: 2022-12-22 10:29:12
 * @LastEditTime: 2022-12-23 10:48:26
 * @LastEditors:  
 */
export default {
    // 图片懒加载： 在用户无法看见图片时，不加载图片，用户可以看见图片时再去加载图片
    mounted(el) {
        const imgSrc = el.src
        el.src = ''

        const {
            stop
        } = useIntersectionObserver(el, ([{
            isIntersecting
        }]) => {
            // 元素可见时， 加载图片
            if (isIntersecting) {
                el.src = imgSrc
                // 加载完后取消监听
                stop()
            }
        })
    }
}
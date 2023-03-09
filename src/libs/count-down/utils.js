/*
 * @Description: 处理时间插件
 * @Author:
 * @Date: 2023-01-04 16:33:05
 * @LastEditTime: 2023-01-04 16:37:52
 * @LastEditors:
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

// 处理中文国际化
dayjs.locale('zh')
// 插件
dayjs.extend(duration)

export default dayjs

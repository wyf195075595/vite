/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-19 11:39:38
 * @LastEditTime: 2022-12-19 12:00:30
 * @LastEditors:  
 */
import request from '@/utils/request'
/**
 * 获取长图片列表
 */
export const getPicList = (data) => {
    return request.get(
        '/getPicList',
        data
    )
}
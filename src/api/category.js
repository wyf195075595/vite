/*
 * @Description: 
 * @Author:  
 * @Date: 2022-08-17 23:51:47
 * @LastEditTime: 2022-08-17 23:56:19
 * @LastEditors:  
 */
import request from "@/utils/request";

/**
 * 
 */

export const getCategory = () => {
    return request.get('/category')
}
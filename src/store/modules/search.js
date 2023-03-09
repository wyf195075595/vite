/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-28 10:25:16
 * @LastEditTime: 2022-12-28 10:47:59
 * @LastEditors:  
 */
/**
 * 处理 search 中的历史数据
 */

export default {
    // 独立作用域
    namespaced: true,
    state: () => {
        return {
            historys: []
        }
    },
    mutations: {
        /**
         * 新增
         * 1、新增不能重复，新增数据位于头部
         * 2、第二次新增相同的数据，需删除之前的
         */
        addHistory(state, newHistory) {
            const findIndex = state.historys.findIndex(item => item === newHistory)
            // 有相同删除
            if (findIndex !== -1) {
                state.historys.splice(findIndex, 1)
            }
            // 新增
            state.historys.unshift(newHistory)
        },
        /**
         * 单个删除
         */
        deleteHistory(state, index) {
            state.historys.splice(index, 1)
        },
        /**
         * 全部删除
         */
        deleteAllHistory(state) {
            state.historys = []
        }
    }
}
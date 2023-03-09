/*
 * @Description: 
 * @Author:  
 * @Date: 2022-08-15 23:05:58
 * @LastEditTime: 2022-12-14 20:46:23
 * @LastEditors:  
 */
// 判断是否PC端的最小宽度
export const PC_DEVICE_WIDTH = 1280;

// category 的本地构建数据
export const ALL_CATEGORY_ITEM = {
    id: 'all',
    name: '全部'
  }
// 初始 category 数据
export const CATEGORY_NOMAR_DATA = [
    { id: 'web_app_icon', name: 'UI/UX' },
    { id: 'design', name: '平面' },
    { id: 'illustration', name: '插画/漫画' },
    { id: 'photography', name: '摄影' },
    { id: 'games', name: '游戏' },
    { id: 'anime', name: '动漫' },
    {
        id: 'industrial_design',
        name: '工业设计'
    },
    {
        id: 'architecture_design',
        name: '建筑设计'
    },
    {
        id: 'humanisticArt_design',
        name: '人文艺术'
    },
    {
        id: 'home_design',
        name: '家居/家装'
    }
]
// 暗黑主题
export const THEME_DARK = 'dark'
// 浅色主题
export const THEME_LIGHT = 'light'
// 系统主题
export const THEME_SYSTEM = 'system'

// 登录方式
export const LOGIN_TYPE_USERNAME = 'username'
export const LOGIN_TYPE_OAUTH_NO_REGISTER_CODE = 204
export const LOGIN_TYPE_QQ = 'QQ'
export const LOGIN_TYPE_WX = 'WX'

// STS 上传数据
export const REGION = 'oss-cn-beijing'
export const BUCKET = 'imooc-front'

// 兔小巢反馈地址
export const FEEDBACK_URL = 'https://support.qq.com/product/383681'

// 微博APP Key
export const WEI_BO_APP_KEY = '3454329089'
// 微博用户的 UID
export const WEI_BO_UID = '5984245953'
  

// 接口非成功状态提示
export const INFOCONFIG = {
    400100: '无权限',
    400300: '请求失败',
    400001: '请求参数格式错误',
    400002: '请求参数不能为空',
    400500: '服务器忙,请稍后再试',
    400404: '路径不存在',
}
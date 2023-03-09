/*
 * @Description:
 * @Author:
 * @Date: 2023-01-03 09:14:32
 * @LastEditTime: 2023-01-03 09:25:52
 * @LastEditors:
 */
import { message } from '@/libs'

export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: '',
    // 获取用户信息
    userInfo: {}
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    /**
     * 注册
     */
    async register(context, payload) {
      const { password } = payload
      // 注册
      // return await registerUser({
      //   ...payload,
      //   password: password ? md5(password) : ''
      // })
    },
    /**
     * 登录
     */
    async login(context, payload) {
      const { password } = payload
      // const data = await loginUser({
      //   ...payload,
      //   password: password ? md5(password) : ''
      // })
      // QQ 扫码登录，用户未注册
      // if (data.code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
      //   return data.code
      // }
      context.commit('setToken', 'testtoken')
      context.dispatch('profile')
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      // const data = await getProfile()
      let data = {
        avatar: 'https://place.dog/300/300',
        company: '22',
        homePage: '33',
        nickname: 'LGD_Sunday',
        payResult: false,
        qqOpendId: '',
        username: 'LGD_Sunday',
        vipLevel: 1,
        wxOpendId: '',
        title: '11'
      }
      context.commit('setUserInfo', data)
      // 欢迎
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
            : data.nickname
        } `,
        6000
      )
    },
    /**
     * 退出登录
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }
  }
}

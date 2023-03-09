/*
 * @Description:
 * @Author:
 * @Date: 2022-08-16 16:21:09
 * @LastEditTime: 2023-01-03 09:43:12
 * @LastEditors:
 */
import axios from 'axios'
import store from '@/store'
import { INFOCONFIG } from '@/constants'
import NProgress from 'nprogress'
NProgress.configure({
  showSpinner: true
})
console.log('xx', process.env.NODE_ENV)
const testURL =
  'https://www.fastmock.site/mock/cc1aeeec1b278c3c30ec60eeaf462247/front'
class HttpRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'development' ? testURL : testURL
    this.timeout = 15000
    this.queue = 0 // 请求队列
    this.cache = []
  }
  setInterceptor(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        // 开启 loading
        if (!this.queue) {
          // open loading
          NProgress.start()
        }

        // 统一增加token
        const token = store.getters.token
        config.headers['icode'] = token

        // 记录请求的取消函数
        let CancelToken = axios.CancelToken
        config.cancelToken = new CancelToken((c) => {
          // 存入 vux,组件销毁时执行
          // c 就是取消请求的token
          this.cache.push(c)
        })
        this.queue++

        return config
      },
      (err) => {
        // 响应就从队列删除
        this.queue--
        if (this.queue == 0) {
          // close loading
          NProgress.done(true)
        }
        this.$message.error(err)

        return Promise.reject(err)
      }
    )
    instance.interceptors.response.use(
      (res) => {
        console.log(this.queue)
        this.queue--
        if (this.queue == 0) {
          // close loading
          NProgress.done(true)
        }
        // 这里判断要依据后端返回格式而定
        if (res.data.code == 200) {
          return res.data
        } else {
          console.warn(INFOCONFIG[res.data.code])
          return Promise.reject(res.msg)
        }
      },
      (err) => {
        this.queue--
        if (this.queue == 0) {
          // close loading
          NProgress.done(true)
        }
        this.$message.error(err)
        return Promise.reject(err)
      }
    )
  }
  request(options) {
    let instance = axios.create()
    let config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
    this.setInterceptor(instance, config.url)
    return instance(config) // 返回 promise 对象
  }
  get(url, data = {}) {
    return this.request({
      url,
      method: 'get',
      params: data
    })
  }
  post(url, data = {}, config = {}) {
    return this.request({
      url,
      method: 'post',
      data,
      ...config
    })
  }
}

export default new HttpRequest()

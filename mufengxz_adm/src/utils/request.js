import axios from 'axios'
import config from '@/config'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/store/user.js";
const NETWORK_ERROR = '网络请求异常,请稍后重试.....'
// 创建一个axios实例对象
const request = axios.create({
  baseURL: "http://localhost:8222"
  // baseURL: config.baseApi
  // baseURL: '/api'
})

// 在请求之前做一些事情
request.interceptors.request.use((config) => {
  // 可以自定义header
//   config.headers['Content-Type'] = 'application/json;charset=utf-8';
//   config.headers['Authorization'] = 'Bearer ' + useUserStore().token;  // 设置请求头
//   return config
// }, error => {
//   return Promise.reject(error)
// });
    const token = sessionStorage.getItem('token')
    // console.log(token)
    // jwt-token认证的时候
    if (token) {
      config.headers['token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
    },
  error => {
    // Do something with request error
    console.log('请求异常：' + error) // for debug
    Promise.reject(error)

    }
)


// 在请求之后做一些事情
request.interceptors.response.use(
    response => {
        /**
        * code为非20000是抛错 可结合自己业务进行修改
        */
        const res = response.data
        const token = response.data.token
        if (token) {
            sessionStorage.setItem('token', token)
        }
        if (res.code !== 20000) {
        ElMessage({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
        } else {
        return res
        }
    },
    error => {
      console.log('响应异常：' + error) // for debug
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
)
// 封装的核心函数
function req(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }
  // 对mock的处理
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  // 对线上环境做处理
  if (config.env == 'prod') {
    // 不给你用到mock的机会
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  // console.log(service.defaults.baseURL)
  return service(options)
}

export default request
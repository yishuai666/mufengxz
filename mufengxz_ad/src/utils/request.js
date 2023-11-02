import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建一个axios实例对象
const request = axios.create({
    baseURL: "http://localhost:8222"
})

// 在请求之前做一些事情
request.interceptors.request.use((config) => {

    const token = sessionStorage.getItem('token')
    // console.log(token)
    // jwt-token认证的时候
    // console.log('token:', token)
    if (token) {
        config.headers['token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
    },error => {
        console.log('请求异常：' + error) // for debug
        Promise.reject(error)
    }

)
// 在请求之后做一些事情
request.interceptors.response.use(
    response => {

        const res = response.data
        const token = res.data.token
        if (token) {
            sessionStorage.setItem('token', token)
        }
        //code为非20000是抛错 可结合自己业务进行修改
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
export default request
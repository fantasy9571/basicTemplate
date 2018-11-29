import axios from 'axios'
import { throwErr } from '@/utils'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'


const Restful = axios.create()
//过滤请求
Restful.interceptors.request.use(config => {
    config.timeout = 10 * 1000
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})
// 添加响应拦截器
Restful.interceptors.response.use(
    response => {
        console.log(response)
        if (response.data.code == 0) {
            return Promise.resolve(response.data)
        } else if (response.data.code == 1401) {
            store.dispatch('setUserInfo', {})
            Message({
                message: '未登录'
            })
            // router.push('/login')
            return Promise.reject(response.data)
        } else {
            return Promise.reject(response.data)
        }
    },
    error => {
        if (error && error.response) {
            let res = {}
            res.code = error.response.status
            res.msg = throwErr(error.response.status, error.response)
            return Promise.reject(res)
        }
        return Promise.reject(error)
    }
)
export default function restful(method, url, data) {
    method = method.toLocaleLowerCase()
    if (method == 'post') {
        return Restful.post(url, data)
    } else if (method == 'get') {
        return Restful.get(url, {
            params: data
        })
    } else if (method == 'delete') {
        return Restful.delete(url, {
            params: data
        })
    }
}


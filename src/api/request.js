import axios from 'axios'
import { throwErr } from '@/utils'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

//过滤请求
const Request = axios.create({

})
Request.interceptors.request.use(config => {
  config.timeout = 10 * 1000
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
Request.interceptors.response.use(
  response => {
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
export default function request(method, url, data) {
  method = method.toLocaleLowerCase()
  if (method == 'post') {
    return Request.post(url, data)
  } else if (method == 'get') {
    return Request.get(url, {
      params: data
    })
  } else if (method == 'delete') {
    return Request.delete(url, {
      params: data
    })
  }
}


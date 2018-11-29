//通用型api
import request from './request'
import axios from 'axios'

//文件上传 api 地址
//http://{{host}}/api/v1.0/upload/ossUpload 预上传地址
//https://arbitration-web.oss-cn-hangzhou.aliyuncs.com 上传文件
export const ossUpload = (params) => {
  return request('get', '/api/v1.0/upload/ossUpload', params)
}

export const uploadImg = (data, file) => {
  let ossConfig = data.param
  let uploadUrl = data.url
  let formData = new FormData()
  formData.append('OSSAccessKeyId', ossConfig.OSSAccessKeyId)
  formData.append('Signature', ossConfig.Signature)
  formData.append('callback', ossConfig.callback)
  formData.append('key', ossConfig.key)
  formData.append('policy', ossConfig.policy)
  formData.append('Content-Type', ossConfig['Content-Type'])
  formData.append('file', file)
  return axios.post(uploadUrl, formData).then(res => {
    if (res.data.code == 0) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res.data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

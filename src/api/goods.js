import restful from './restful'
//账号模块
//用户管理
export const getCategory = (params) => {
  return restful('get', '/api/v1/category/', params) //管理员获取用户列表
}
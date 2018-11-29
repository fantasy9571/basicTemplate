import request from './request'
//账号模块
//用户管理
export const getUserlist = (params) => {
  return request('get', '/api/v1.0/user/admin/list', params) //管理员获取用户列表
}

export const changeStatus = (params) => {
  return request('post', '/api/v1.0/user/admin/changeStatus', params) //管理员修改用户状态
}
//角色管理
export const getRole = (params) => {
  return request('get', '/api/v1.0/admin/role', params) //获取管理员角色列表
}

export const getPrivilege = (params) => {
  return request('get', '/api/v1.0/admin/role/privilege', params) //获得权限树
}

export const check = (params) => {
  return request('get', '/api/v1.0/admin/role/check', params) //确定角色是否存在
}

export const changeRole = (params) => {
  return request('post', '/api/v1.0/admin/role', params) //添加或者修改管理员角色
}

export const deleteRole = (params) => {
  return request('delete', '/api/v1.0/admin/role', params) //删除管理员角色
}

//管理员
export const getAdminList = (params) => {
  return request('get', '/api/v1.0/admin/list', params) //登陆管理员获取自身信息
}

export const register = (params) => {
  return request('post', '/api/v1.0/admin/register', params) //添加管理员
}

export const updateAdmin = (id, params) => {
  return request('post', `/api/v1.0/admin/${id}/update`, params) //更新管理员信息
}

export const deleteAdmin = (id, params) => {
  return request('delete', `/api/v1.0/admin/${id}`, params) //更新管理员信息
}

export const changeAdminStatus = (id, params) => {
  return request('post', `/api/v1.0/admin/${id}/status`, params) //对管理员进行禁用启用
}

export const resetPassword = (id, params) => {
  return request('post', `/api/v1.0/admin/${id}/resetPassword`, params) //重置管理员密码
}

export const login = (params) => {
  return request('post', '/api/v1.0/account/admin/login', params) //管理员登陆
}

export const logout = (params) => {
  return request('post', '/api/v1.0/account/logout', params) //登出
}

export const changePassword = (params) => {
  return request('post', '/api/v1.0/account/changePassword', params) //修改密码
}

export const my = (params) => {
  return request('get', '/api/v1.0/admin/my', params) //登陆管理员获取自身信息
}

export const exist = (params) => {
  return request('get', '/api/v1.0/account/admin/exist', params) //检查管理员用户名是否已经存在
}

export const checkPassword = (params) => {
  return request('post', '/api/v1.0/account/checkPassword', params) //检查当前账号密码是否正确
}

//其他

export const arbitrator = (params) => {
  return request('get', '/api/v1.0/account/admin/arbitrator', params) //查询仲裁员列表
}

export const adminBalance = (params) => {
  return request('get', '/api/v1.0/bills/adminBalance', params) //查询仲裁员列表
}
const getters = {
  //全局
  isCollapse: state => state.global.isCollapse,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  //账号模块
  userInfo: state => state.account.userInfo,
  isLogin: state => !!state.account.userInfo.account,
  // privilege: state => state.account.userInfo.admin.roles.privilege || [],
  permission: state => state.account.permission,
  userInfoDetail: state => state.account.userInfoDetail,
}
export default getters

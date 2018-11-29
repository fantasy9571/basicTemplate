export default [
  {
    path: '/account',
    name: 'account',
    redirect: 'noredirect',
    meta: { title: '账号管理', icon: 'icon-icon-test' },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: 'user',
        name: 'user',
        meta: { title: '用户管理',},
        component: () => import('@/pages/account/user' /* webpackChunkName: 'accountUser' */),
      },
      {
        path: 'role',
        name: 'role',
        meta: { title: '角色管理', },
        component: () => import('@/pages/account/role' /* webpackChunkName: 'accountRole' */),
      },
    ]
  }
]
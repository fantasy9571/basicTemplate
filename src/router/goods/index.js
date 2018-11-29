export default [
  {
    path: '/goods',
    name: 'goods',
    redirect: 'noredirect',
    meta: { title: '商品管理', icon: 'icon-icon-test' },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'goods' */), // 账号模块
    children: [
      {
        path: 'category',
        name: 'category',
        meta: { title: '商品分类', },
        component: () => import('@/pages/goods/category' /* webpackChunkName: 'goodscategory' */),
      },
      {
        path: 'list',
        name: 'list',
        meta: { title: '商品列表', },
        component: () => import('@/pages/goods/list' /* webpackChunkName: 'goodslist' */),
      },
    ]
  }
]
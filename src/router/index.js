import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import account from './account'
import goods from './goods'
Vue.use(Router)
//将路由表暴露给 sideItem 组件 动态渲染出菜单栏
export const asyncRouterMap = [
  ...account,
  ...goods
]
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/pages/Layout' /* webpackChunkName: 'layout' */), //主页
    children: [
      {
        path: '/index',
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', noCache: true },
        component: () => import('@/pages/index' /* webpackChunkName: 'index' */), // 启动页
      },
    ]
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/pages/error/401' /* webpackChunkName: '401' */), // 启动页
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error/404' /* webpackChunkName: '401' */), // 启动页
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login' /* webpackChunkName: 'login' */), // 登录
  },
  { path: '*', redirect: '/404', hidden: true },
]
let routerMap = constantRouterMap.concat(asyncRouterMap)
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }), //新开的路由默认为顶部
  routes: routerMap
})
//捕获权限 
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.path === '/login') { //登录页面无需权限
    next()
  } else if (to.path === '/index') { //启动页无需权限
    next()
  } else if (to.path === '/401') { //无权限页面
    next()
  } else if (to.path === '/404') { //无匹配页面
    next()
  } else {
    //当页面有权限限制的时候 根据自身项目更改
    // let privilege = store.getters.userInfo.admin.roles.privilege || []
    // let flag = privilege.some(p => p === to.meta.title || p === to.matched[1].meta.title)
    // if (flag) {
    //   next()
    // } else {
    //   next({ path: '/401', replace: true })
    // }
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
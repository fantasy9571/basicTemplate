import * as s from '@/utils/sessionStorage'
import { asyncRouterMap } from '@/router'
const account = {
  state: {
    userInfo: s.get('userInfo') || {},
    userInfoDetail: s.get('userInfoDetail') || {},
    permission: s.get('permission') || [],
  },
  mutations: {
    setUserInfo: state => {
      state.userInfo = s.get('userInfo') || {}
    },
    setUserInfoDetail: state => {
      state.userInfoDetail = s.get('userInfoDetail') || {}
    },
    setPermission: state => {
      state.permission = s.get('permission') || []
    }
  },
  actions: {
    setUserInfo: ({ commit, dispatch, state }, payload) => {
      s.set('userInfo', payload)
      commit('setUserInfo')
      if (JSON.stringify(payload) !== '{}') {
        let privilege = payload.admin.roles.privilege
        privilege.push('商品分类','商品列表')
        if (payload.admin.id === 1) {
          s.set('permission', asyncRouterMap)
          commit('setPermission')
        } else {
          dispatch('setPermission', privilege)
        }
      } else {
        s.set('permission', [])
        commit('setPermission')
      }
    },
    setPermission: ({ commit, dispatch, state }, payload) => {
      if (payload.length < 1) {
        s.set('permission', [])
        commit('setPermission')
      } else {
        let arr = getPermission(payload)
        s.set('permission', arr)
        commit('setPermission')
      }

    },
    logout: ({ commit, dispatch, state }, payload) => {
      dispatch('setUserInfo', {})
    },
    setUserInfoDetail: ({ commit, dispatch, state }, payload) => {
      s.set('userInfoDetail', payload)
      commit('setUserInfoDetail')
    }
  }
}

export default account

const getPermission = (payload) => {
  console.log(asyncRouterMap)
  let newArr = JSON.parse(JSON.stringify(asyncRouterMap)) //数组深拷贝
  newArr.forEach((item) => {
    let arr = []
    item.children.forEach(child => {
      payload.forEach((el) => {
        if (el === child.meta.title) {
          arr.push(child)
        }
      })
    })
    item.children = arr
  })
  return newArr
}
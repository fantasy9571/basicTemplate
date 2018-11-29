import * as s from '@/utils/sessionStorage'
const global = {
  state: {
    isCollapse: false,
  },
  mutations: {
    setIsCollapse: (state, payload) => {
      state.isCollapse = payload
    },
  },
  actions: {
  }
}

export default global

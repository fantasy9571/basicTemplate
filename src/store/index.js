import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import tagsView from './modules/tagsView'
import getters from './getters'
import account from './modules/account'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    global,
    tagsView,
    account
  },
  getters
})

export default store
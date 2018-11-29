// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import '@/assets/less/public.less'
import '@/assets/less/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer, {
  zIndex: 9999
})

import mixin from './mixin/index'
Vue.mixin(mixin)

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


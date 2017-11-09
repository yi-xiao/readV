// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/reset.css'
import Api from './assets/js/api'

Vue.use(Api)

Vue.use(MintUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Api,
  store,
  template: '<App/>',
  components: { App }
})

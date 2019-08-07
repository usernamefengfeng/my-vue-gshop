import Vue from 'vue'
import App from './App.vue'

import store from './store'
import './api'
import router from './router'

import Header from 'components/Header/Header.vue'
import Star from 'components/Star/Star.vue'

//注册全局组件
Vue.component('Header',Header)
Vue.component('Star',Star)

Vue.config.productionTip = false  //禁止在Vue启动时的生产提示

new Vue({
  el: '#app',
  render: h => h(App),
  router,  //配置路由器
  store,   //配置vuex的store
})


/* new Vue({
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>',
}).$mount('#app') */

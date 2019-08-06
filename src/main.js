import Vue from 'vue'
import App from './App.vue'

import api from './api'
import router from './router'
import Header from './components/Header/Header.vue'

//注册全局组件
Vue.component('Header',Header)

Vue.config.productionTip = false  //禁止在Vue启动时的生产提示

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})


/* new Vue({
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>',
}).$mount('#app') */

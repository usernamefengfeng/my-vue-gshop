import Vue from 'vue'
import App from './App.vue'
import { Button } from 'mint-ui';

import store from './store'    //vuex最核心的管理对象store
import router from './router'  //路由器
import './validate'  //login界面验证
import './api'       //ajax请求

import Header from 'components/Header/Header.vue'
import Star from 'components/Star/Star.vue'

//注册全局组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component(Button.name, Button);

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

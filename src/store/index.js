/* 
  vuex最核心的管理对象--store对象
*/
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

//声明使用vue插件
Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules: {  //vuex多模块编程
    msite,    //子模块msite
    user,     //子模块user
    shop      //子模块shop
  }
})

/* 
  管理user的相关状态数据的vuex模块
*/
import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
} from '../mutation-types'
import {
  reqAutoLogin,
} from '../../api'
const state = {
  user: {},   //登录用户的信息
  token: localStorage.getItem('token_key'),  //当前登录用户对应的token

}
const actions = {
  //保存user的同步action
  saveUser ({commit},user) {
    const token = user.token
    //将token保存到localStorage上
    localStorage.setItem('token_key',token)

    //将token保存到state中
    commit(RECEIVE_TOKEN,{token})
    
    delete user.token
    commit(RECEIVE_USER,{user})
  },

  //退出登录
  logout ({commit}) {
    commit(RESET_USER)  //重置user
    commit(RESET_TOKEN) //重置token
    localStorage.removeItem('token_key')
  },

  //自动登录
  async autoLogin ({commit,state}) {
    if (state.token) {
      const result = await reqAutoLogin()
      if (result.code === 0) {
        const user = result.data
        commit(RECEIVE_USER,{user})
      }
    }
  },
}
const mutations = {
  [RECEIVE_USER] (state,{user}) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [RECEIVE_TOKEN] (state,{token}) {
    state.token = token
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  },
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
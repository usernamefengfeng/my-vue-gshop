/* 
  包含n个间接更新状态数据的方法对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN
} from './mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin,
} from '../api'

export default {
  //获取地址信息的异步action
  async getAddress ({commit,state}) {
    //1.调用接口请求函数发送请求
    const {longitude,latitude} = state  //经度，纬度
    const result = await reqAddress(longitude,latitude)

    //2.判断数据状态，提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },

  //获取商品分类列表的异步action
  async getCategorys ({commit},callback) {
    //1.调用接口请求函数发送请求
    const result = await reqCategorys()

    //2.判断数据状态，提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,categorys)

      //categorys数据发生改变--commit之后--调用回调函数
      typeof callback === 'function' && callback()
    }
  },

  //根据经纬度获取商铺列表的异步action
  async getShops ({commit,state}) {
    //1.调用接口请求函数发送请求
    const {longitude,latitude} = state  //经度，纬度
    const result = await reqShops(longitude,latitude)

    //2.判断数据状态，提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },

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
    commit(RESET_USER)
    commit(RESET_TOKEN)
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
  }
}
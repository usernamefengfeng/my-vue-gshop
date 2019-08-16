/* 
  管理msite的相关状态数据的vuex模块
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops,
} from '../../api'
const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
}
const actions = {
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
}
/* 
  直接更新数据状态
*/
const mutations = {
  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  },
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
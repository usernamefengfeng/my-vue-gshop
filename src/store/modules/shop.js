/* 
  管理shop的相关状态数据的vuex模块
*/
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
} from '../mutation-types'
import {
  reqGoods,
  reqInfo,
  reqRatings
} from '../../api'
const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}
const actions = {
  //商家详情
  async getInfo ({commit},callback) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO,{info})

      typeof callback === 'function' && callback()
    }
  },

  //商家评价
  async getRatings ({commit},callback) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})

      typeof callback === 'function' && callback()
    }
  },
  
  //商家商品
  async getGoods ({commit},callback) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})

      typeof callback === 'function' && callback()
    }
  },

  //增加/减少食物
  updateFoodCount ({commit},{food,isAdd}) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT,{food})
    } else {
      commit(REDUCE_FOOD_COUNT,{food})
    }
  }
}
const mutations = {
  [RECEIVE_GOODS] (state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_INFO] (state,{info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },
  [ADD_FOOD_COUNT] (state,{food}) {
    if (food.count) {
      food.count++
    } else {
      Vue.set(food,'count',1)
    }
  },
  [REDUCE_FOOD_COUNT] (state,{food}) {
    if (food.count>0) {
      food.count--
    }
  },
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
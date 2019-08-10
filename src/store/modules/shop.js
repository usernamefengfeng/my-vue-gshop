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
  CLEAR_CART,
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
  cartFoods: [], //购物车food数组
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
  },

  //清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
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
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT] (state,{food}) {
    if (food.count>0) {
      food.count--
    }
    if (food.count === 0) {
      state.cartFoods.splice(state.cartFoods.indexOf(food),1)
    }
  },
  //清空购物车
  [CLEAR_CART] (state) {
    //将购物车中所有food的count属性移除
    state.cartFoods.forEach(food => {
      food.count = 0
    });
    //清空购物车数组
    state.cartFoods = []
  },
}
const getters = {
  //总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre,food) => pre + food.count,0)
  },
  //总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre,food) => pre + food.count * food.price,0)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
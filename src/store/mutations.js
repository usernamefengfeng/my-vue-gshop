/* 
  包含n个直接更新状态数据的方法对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  },
  
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

  [RECEIVE_GOODS] (state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_INFO] (state,{info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },
}
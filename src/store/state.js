/* 
  包含n个数据状态的对象
*/
export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组

  user: {},   //登录用户的信息
  token: localStorage.getItem('token_key'),  //当前登录用户对应的token

  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}
/* 
  包含多个接口请求函数的模块
  函数的返回值是promise
*/
import ajax from './ajax'

const BASE = 'api'
const BASE2 = 'baidu'

/* 
  根据经纬度获取位置详情
*/
export const reqAddress = ( longitude,latitude ) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`,  //参数类型--query
})

/* 
  获取食品分类列表
*/
export const reqCategorys = () => ajax.get(BASE + '/index_category',{
  headers: {
    needToken: true
  }
})

/* 
  根据经纬度获取商铺列表
*/
export const reqShops = ({latitude,longitude}) => ajax({
  url: BASE + '/shops',
  params: {  //参数类型--params
    latitude,
    longitude,
  },
  headers: {
    needToken: true
  }
})

/* 
  发送短信验证码登录
*/
export const reqSendCode = (phone) => ajax.get(BASE + '/sendcode',{
  params: {
    phone
  }
})

/* 
  用户名密码登录
*/
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax.post(BASE + '/login_pwd',{
  name,
  pwd,
  captcha
})

/* 
  手机号短信验证码登陆
*/
export const reqSmsLogin = (phone,code) => ajax.post(BASE + '/login_sms',{
  phone,
  code
})

/* 
  自动登录
*/
export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: {
    needToken: true
  }
})

export const reqBaiDuXxx = () => ajax(BASE2 + '/xxx')

// reqAddress('116.36867', '40.10038').then((result) => {
//   console.log('result', result)
// })
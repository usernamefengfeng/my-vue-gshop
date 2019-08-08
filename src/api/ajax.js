/* 
  能发送ajax的函数，函数的返回值是promise
    1.处理post请求的请求体参数，转换为urlencode格式(默认的是json格式)，请求拦截器
    2.让成功的结果不是response，而是response.data :响应拦截器成功的回调
    3.统一处理请求错误，相应拦截器失败的回调
    4.判断是否是携带token的请求，如果是，从state中取出token
      a.没有，不发请求，直接进入失败流程
      b.有，添加到请求头中：Authorization=token
*/
import axios from 'axios'
import qs from 'qs'
import {Toast} from 'mint-ui'

import store from '../store'
import router from '../router'

 /* eslint-disable *///--局部阻止eslint语法检查

//添加请求拦截器
axios.interceptors.request.use(config => {
  const {
    method,
    data,
  } = config
  //判断请求方式是否是POST，并且判断data是否是对象
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    //将data的json格式转换为urlencode格式
    config.data = qs.stringify(data)
  }
  // 4.判断是否是携带token的请求，如果是，从state中取出token
  if (config.headers.needToken) {
    const token = store.state.token
    if (!token) {  //a.没有，不发请求，直接进入失败流程
      const error = new Error('没有token，不发请求')
      error.status = 401
      throw error
    } else {  //b.有，添加到请求头中：Authorization=token
      //config.headers.Authorization = token
      config.headers['Authorization'] = token
    }
  }
  //返回config对象
  return config
})

//添加响应拦截器
axios.interceptors.response.use(response => {
  //让成功的结果不在是response，而是response.data  响应拦截器成功的回调
  return response.data
},error => { //统一处理请求错误:响应拦截器失败的回调
  const {response, status, message} = error
  /* 
    发请求前-----先判断有没有token，若没有，直接失败
  */
  if (!response) {  //没有token
    if (status === 401) {  //401-----权限
      if (router.currentRoute.path !== '/login') {  //当前是否在login界面,若不在,跳转到login界面
        Toast(message)
        router.replace('/login')  //路由跳转
      }
    }
  } else {  //token存在
    const status = response.status
    //判断token的状态码
    if (status === 401) {
      if (router.currentRoute.path !== '/login') {  //当前是否在login界面,若不在,跳转到login界面
        Toast(response.data.message)
        //退出登录--清空用户信息
        store.dispatch('logout')
        //跳转登录界面
        router.replace('/login')
      }
    } else if (status === 404) {
      Toast('请求资源不存在')
    } else {
      Toast('请求错误' + message)
    }
  }

  //中断promise链，变为初始状态
  return new Promise(() => {})

})

export default axios
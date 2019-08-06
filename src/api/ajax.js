/* 
  能发送ajax的函数，函数的返回值是promise
    1.处理post请求的请求体参数，转换为urlencode格式(默认的是json格式)，请求拦截器
    2.让成功的结果不是response，而是response.data :响应拦截器成功的回调
    3.统一处理请求错误，相应拦截器失败的回调
*/
import axios from 'axios'
import qs from 'qs'

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
  //返回config对象
  return config
})

//添加响应拦截器
axios.interceptors.response.use(response => {
  //让成功的结果不在是response，而是response.data  响应拦截器成功的回调
  return response.data
},error => { //统一处理请求错误:响应拦截器失败的回调
  alert('请求异常' + error.message)
  //中断promise链，变为初始状态
  return new Promise(() => {})

})

export default axios
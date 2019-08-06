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
export const reqCategorys = () => ajax.get(BASE + '/index_category')

/* 
  根据经纬度获取商铺列表
*/
export const reqShops = ({latitude,longitude}) => ajax({
  url: BASE + '/shops',
  params: {  //参数类型--params
    latitude,
    longitude,
  }
})

export const reqBaiDuXxx = () => ajax(BASE2 + '/xxx')

reqAddress('116.36867', '40.10038').then((result) => {
  console.log('result', result)
})
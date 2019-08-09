/* 
  使用mockjs定义的mock接口
*/

import Mock from 'mockjs'
import data from './data.json'

//goods接口
Mock.mock('/goods',{code: 0, data: data.goods})

//ratings接口
Mock.mock('/ratings',{code: 0, data: data.ratings})

//info接口
Mock.mock('/info',{code: 0, data: data.info})

console.log('测试-----mockServer....') //测试mock接口
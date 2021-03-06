/*
使用mockjs提供mock数据接口
*/
import Mock from 'mockjs'
import data from './data.json'
// import shops from './shops.json'

// 返回goods接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 返回ratings接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 返回info接口
Mock.mock('/info', {code: 0, data: data.info})
// 返回shop接口
Mock.mock('/shops', {code: 0, data: data.shops})

// export default 不需要向外暴露数据，只要保证执行就可以

/*
通过mutation间接更新state的多个方法的对象
*/
import {
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_SHOPLIST,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'
import {
  reqShopRatings,
  reqShopGoods,
  reqShopInfo,
  reqShopList
} from '../api'

export default {
  // 同步记录用户信息
  recordUser ({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },

  // mock数据
  // 异步获取商家的列表
  async getShopList ({ commit }) {
    const result = await reqShopList()
    if (result.code === 0) {
      const shops = result.data
      // console.log(result.data)
      // console.log(shops)
      commit(RECEIVE_SHOPLIST, { shops })
    }
  },
  // 异步获取商家信息
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },

  // 异步获取商家评价列表
  async getShopRatings ({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods ({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 数据更新了，通知组件
      callback && callback()
    }
  },
  // 同步更新food中的count值
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  // 清空购物车
  clearCart ({ commit }) {
    commit(CLEAR_CART)
  }
}

/*
直接更新state的多个方法的对象
*/
import Vue from 'vue'
import {
  RECEIVE_USER_INFO,
  RESET_USER_INFO,

  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_SHOPLIST,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {

  [RECEIVE_USER_INFO] (state, { userInfo }) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  // mock数据
  [RECEIVE_SHOPLIST] (state, { shops }) {
    // console.log(state.shops)
    // console.log(shops)
    state.shops = shops
  },
  [RECEIVE_GOODS] (state, { goods }) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, { info }) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT] (state, { food }) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      // 将food添加到cartfoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, { food }) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART] (state) {
    // 清除food中的count
    // eslint-disable-next-line no-return-assign
    state.cartFoods.forEach(food => food.count = 0)
    // 清除购物车中的所有购物项
    state.cartFoods = []
  }
}

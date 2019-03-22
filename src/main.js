/*
入口js
*/
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

// 图片懒加载
import loading from './common/images/timg.gif'
// 过滤器（时间的格式）

import './filters'
// 进行加载mockServer
import './mock/mockServer'

// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button></mt-button>

// eslint-disable-next-line no-undef
Vue.use(VueLazyLoad, {
  loading
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

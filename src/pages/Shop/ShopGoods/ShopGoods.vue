<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index === currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'

export default {
  data () {
    return {
      scrollY: 0, // 右侧滑动的Y坐标
      tops: [], // 所有右侧分类li的top组成的数组
      food: {} // 需要显示的food
    }
  },

  mounted () {
    this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
      this.$nextTick(() => { // 列表数据更新显示后执行
        this._initScroll()
        this._initTops()
      })
    })
  },

  computed: {
    ...mapState(['goods']),
    // 计算得到当前分类的下标
    currentIndex () {
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY >= 当前top && scrollY < 下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回结果
      return index
    }
  },

  methods: {
    // 非事件相关的回调函数前面加 _ 区分
    // 初始化滚动
    _initScroll () {
      // 列表显示之后创建（better-scroll滚动库）
      // eslint-disable-next-line no-new
      new BScroll('.menu-wrapper', {
        // click: true // 默认为false，为不可点击，设为true
      })
      // let foodsScroll
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 手指离开后不会再滑动
        click: true
      })
      // 给右边的食物列表绑定scroll监听
      this.foodsScroll.on('scroll', ({x, y}) => {
        // 1.再滑动过程中实时收集scrollY(纵坐标)
        // console.log(x, y)
        this.scrollY = Math.abs(y)
      })
      // 给右侧滚动结束监听
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        // 1.再滑动过程中实时收集scrollY(纵坐标)
        // console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)
        // console.log(this.foodsScroll)
      })
    },

    // 初始化tops
    _initTops () {
      // 1.初始化tops
      const tops = []
      let top = 0
      tops.push(top)
      // 2.收集
      // 找到食物列表下的分类li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 3.更新数据
      this.tops = tops
    },

    // 通过点击左侧使右侧列表响应到对应位置
    clickMenuItem (index) {
      // 得到目标位置的scrollY
      const scrollY = this.tops[index]
      // 立即更新scrollY
      this.scrollY = scrollY
      // 滚动右侧列表
      this.foodsScroll.scrollTo(0, -scrollY, 300)
      // console.log(this.foodsScroll)
    },

    // 显示点击的food
    showFood (food) {
      // 设置food
      this.food = food
      // 显示food组件(父组件调用子组件对象方法:标签内指定ref，用$refs调用)
      this.$refs.food.toggleShow()
    }
  },

  components: {
    CartControl,
    Food,
    ShopCart
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $brown
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

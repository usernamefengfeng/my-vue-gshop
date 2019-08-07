<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination--分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <Shops/>
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import chunk from 'lodash/chunk'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import Shops from 'components/Shops/Shops.vue'
  export default {
    components: {
      Shops,
    },

    //执行异步操作--发送ajax请求
    async mounted() {
      this.$store.dispatch('getShops')   //actions文件--->分发actions==>mutations==>直接更新数据状态
      await this.$store.dispatch('getCategorys')
      //更新状态数据--->调用监视回调--->异步更新界面
        //将回调延迟到下次DOM更新循环之后，在修改数据之后立即使用它
        this.$nextTick(() => {
          //创建swiper对象的时机?   必须在列表页面显示之后
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
          })        
        })
    },
    computed: {
      ...mapState(['address','categorys']),

      //定义一个大数组存放每一页的商品列表数组--数据结构[[1,2,3,4,...],[7,8,9,10,...]]
      categorysArr () {
        const bigArr = []   //大数组
        let smallArr = [] //小数组
        const {categorys} = this

        //遍历得到的数据总数组--categorys
        categorys.forEach(category => {
          //先将小数组存放到大数组当中--且只能存储一次
          if (smallArr.length === 0) {
            bigArr.push(smallArr)
          }

          //将商品列表的商品存放到小数组中--且小数组的长度小于8
          smallArr.push(category)
          if (smallArr.length === 8) {
            smallArr = []
          }
        });

        //返回大数组
        return bigArr
      },

      /* 
      lodash---库的使用---方法
      */
      /* categorysArr2 () {
        return chunk(this.categorys)
      } */

    },

    /* 
      1. watch + nextTick()
    */
    /*  watch: {
      //更新状态数据--->调用监视回调--->异步更新界面
      categorys () {  //categorys数据发生改变---数组数据拿到

        //将回调延迟到下次DOM更新循环之后，在修改数据之后立即使用它
        this.$nextTick(() => {
          
          //创建swiper对象的时机?   必须在列表页面显示之后
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
          })        
        })
      }
    }, */
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>

<template>
  <div class="star" :class="'star-' + size">
    <!-- 定义一个存储on，off，half的数组 -->
    <span class="star-item" v-for="(c, index) in starClasses" :key="index" :class="c"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      score: Number,
      size: Number,
    },

    computed: {
      /* 
        5个星星类名组成的数组on/half/off
      */
      starClasses () {
        const arr = []
        const {score} = this  //拿到score
        const scoreInteger = Math.floor(score)

        //添加n个on
        for (let index = 0; index < scoreInteger; index++) {
          arr.push('on')
        }
        //添加0/1个half
        if ((score - scoreInteger)*10 >= 5) {
          arr.push('half')
        }
        //添加m(5-n-0/1=m)
        while (arr.length < 5) {
          arr.push('off')
        }
        
        return arr
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>

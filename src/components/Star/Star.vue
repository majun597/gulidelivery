<template>
  <div id="app">
    <div class="star " :class="'star-' + size">
      <span class="star-item" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
    </div>
  </div>
</template>

<script>
  //类名常量
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    name: "Star",
    props: {
       score: Number,
       size: Number
    },
    computed: {
      starClasses() {
        const {score} = this
        const scs = []
        //向scs中添加n个CLASS_ON
        //使用math.floor取小数的整数部分
        const scoreInteger = Math.floor(score)
        for (let i = 0;i < scoreInteger;i++) {
          //整数是多少就往scs中添加多少个满星
          scs.push(CLASS_ON)
        }
        //向scs中添加0/1个CLASS_HALF
        //由于小数部分直接作加减会不精确 所以乘以10
        if((score*10 - scoreInteger*10) >= 5 ) {
          //添加半星
          scs.push(CLASS_HALF)
        }
        //向scs中添加n个CLASS_OFF
        //当scs的长度小于5时添加灰星
        while(scs.length < 5){
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
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
    margin-bottom 10px
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
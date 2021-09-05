<template>
  <div id="app">
    <!-- 两层结构   上面是路由部分 下面是导航-->
   <router-view></router-view>
   <!-- v-if 和 v-show 都可以动态地显示DOM元素 -->
   <!-- $route代表当前路由 $route.meta.showFooter代表当前路由下的meta中的showFooter，当它为true就显示footer-->
   <FootGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  //使用映射函数
  import {mapActions} from 'vuex'

  import FootGuide from './components/FootGuide/FootGuide'

  //引入接口请求函数
  //import {reqFoodsCategorys} from './api'

  export default {
    name: "App",
    mounted () {
      //触发某个actions的调用
      //this.$store.dispatch('getAddress')
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
      //在method中使用映射函数  此处等价于this.$store.dispatch('getAddress')
      ...mapActions(['getAddress', 'getUserInfo'])
    },
    components: {
      FootGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
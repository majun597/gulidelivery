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
  import FootGuide from './components/FootGuide/FootGuide'

  export default {
    name: "App",
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
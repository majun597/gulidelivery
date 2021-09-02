<template>
<div class="content">
  <!--首页外卖-->
  <div class="on">
    <section class="msite">
      <!-- 首页头部 -->
      <header-top :title="address.name">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
           <span class="header_login_text">登录|注册</span>
        </span>
      </header-top>
      <!--首页导航-->
      <nav class="msite_nav">
        <!-- 加入v-if判断当数据还没加载完成时显示图片msite_back.svg -->
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <!-- 遍历显示轮播图里的内容 -->
            <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl + category.image_url ">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination 添加分页器-->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> -->
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <!-- 头部 -->
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <!-- 商家列表 -->
        <shop-list></shop-list>
      </div>
    </section>
  </div>
</div>
</template>

<script>

 //使用swiper插件
 import Swiper from 'swiper'
 import 'swiper/dist/css/swiper.min.css'

 import HeaderTop from '../../components/HeaderTop/HeaderTop'
 import ShopList from '../../components/ShopList/ShopList'

  //在vuex中已经更新了状态 现在进行读取
  //使用vuex里面的映射函数
  import {mapState} from 'vuex'


  export default {
    name: "MSite",
    components: {
      HeaderTop,
      ShopList
    },
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'   //轮播图内图片的基础地址
      }
    },
    mounted () {
      // 在mounted里发送请求获取数据显示，用dispatch触发actions里的调用 
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')

     
      //html加载完成后执行。执行顺序：子组件-父组件。mounted钩子函数主要是用来执行DOM操作。
      //此处当HTML加载完之后创建一个swiper实例对象 来实现轮播
        // new Swiper ('.swiper-container', {
        //   //direction: 'vertical', // 垂直切换选项
        //   loop: true, // 循环模式选项 可以循环轮播
        //   // 如果需要分页器
        //   pagination: {
        //     el: '.swiper-pagination',
        //   },
          
        //   // 如果需要前进后退按钮
        //   // navigation: {
        //   //   nextEl: '.swiper-button-next',
        //   //   prevEl: '.swiper-button-prev',
        //   // },
        
        //   // 如果需要滚动条
        //   // scrollbar: {
        //   //   el: '.swiper-scrollbar',
        //   // },
        // })   
      
    },
    computed: {
      //此处使用mapstate函数 读取数据
      ...mapState(['address', 'categorys']),

      //根据categorys一维数组生成一个二维数组  小数组中的元素个数最大是8 轮播图内的数据显示问题
      categorysArr() {
        const {categorys} = this
        //准备空的二维数组
        const arr = []
        //准备一个小数组最大长度为8
        let minArr = []
        //遍历categorys
        categorys.forEach(c => {
          //如果当前小数组已经满了 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          //如果minArr是空的 将小数组保存到大数组中
          if(minArr.length===0){
            arr.push(minArr)
          }
          //将当前分类保存到小数组中
          minArr.push(c)
        }) 

        return arr
      }
    },
    watch: {
      categorys() {//categorys数组中有数据了 在异步更新页面之前执行
        //html加载完成后执行。执行顺序：子组件-父组件。mounted钩子函数主要是用来执行DOM操作。
        //此处当HTML加载完之后创建一个swiper实例对象 来实现轮播
        // new Swiper ('.swiper-container', {
        //   //direction: 'vertical', // 垂直切换选项
        //   loop: true, // 循环模式选项 可以循环轮播
        //   // 如果需要分页器
        //   pagination: {
        //     el: '.swiper-pagination',
        //   },
          
        //   // 如果需要前进后退按钮
        //   // navigation: {
        //   //   nextEl: '.swiper-button-next',
        //   //   prevEl: '.swiper-button-prev',
        //   // },
        
        //   // 如果需要滚动条
        //   // scrollbar: {
        //   //   el: '.swiper-scrollbar',
        //   // },
        // })  
        
      //界面更新就立即创建swiper对象
        this.$nextTick(() => {// 一旦完成界面更新 立即调用
          new Swiper ('.swiper-container', {
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            // navigation: {
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev',
            // },
          
            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      },    
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
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
          margin-top 5px
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
        // .swiper-button-prev
        //   display inline-block
        //   width 50px
        //   height 50px
        //   color: #02a774;
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>

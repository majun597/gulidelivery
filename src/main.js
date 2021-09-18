// 入口js

import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from './router'
//注册store
import store from './store'

import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'

//加载mockServer
import './mock/mockServer'

import loading from './common/imgs/loading.gif'
import './fiters' //加载过滤器

//注册全局组件标签
Vue.component(Button.name, Button) //也即此时有一个全局组件标签<mt-button>可以使用
Vue.use(VueLazyload, {
    loading
})

new Vue({
    el: '#app',
    render: h => h(App),
    //配置上路由器：1、多了几个组件标签（router-link、router-view、Keep-alive） 2、多了两个属性可以访问（）
    router, //使用上vue-router
    store, //使用上vuex

})
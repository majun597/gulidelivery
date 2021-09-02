// 入口js

import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from './router'
//注册store
import store from './store'

new Vue({
    el: '#app',
    render: h => h(App),
    //配置上路由器：1、多了几个组件标签（router-link、router-view、Keep-alive） 2、多了两个属性可以访问（）
    router, //使用上vue-router
    store, //使用上vuex
})
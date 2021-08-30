// 路由器对象模块

//引入插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
    //传入配置对象 配置所有路由
    //多个路由使用属性名routes:数组类型，数组每一个元素就代表一个路由配置
    routes: [{
            //路由为对象类型 有两个属性：path和component
            path: '/msite',
            component: MSite,
            // 加入meta配置 确定当前路由是否显示footer
            meta: {
                showFooter: true
            }
        },
        {
            //路由为对象类型 有两个属性：path和component
            path: '/search',
            component: Search,
            meta: {
                showFooter: true
            }
        }, {
            //路由为对象类型 有两个属性：path和component
            path: '/order',
            component: Order,
            meta: {
                showFooter: true
            }
        }, {
            //路由为对象类型 有两个属性：path和component
            path: '/profile',
            component: Profile,
            meta: {
                showFooter: true
            }
        }, {
            //路由为对象类型 有两个属性：path和component
            path: '/login',
            component: Login
        },
        //默认显示首页
        {
            path: '/',
            redirect: '/msite'
        }
    ]
})
//学习如何根据接口文档来定义接口请求函数

//包含n个接口请求函数的模块  向外暴露n个函数
//此处接口请求函数返回值依然是promise对象

//引入ajax函数
import ajax from "./ajax";
//定义一个base-url
//const BASE_URL = 'http://localhost:4000' 
const BASE_URL = '/api'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/> geohash为接口文档中参数
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
    // [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodsCategorys = () => ajax(BASE_URL + '/index_category')
    // [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/> (longitude, latitude)为接口文档中所需要的参数经度和纬度
export const reqShops = (longitude, latitude) => ajax(BASE_URL + '/shops', { longitude, latitude })
    // [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShop = (geohash, keyword) => ajax('/search_shops', { geohash, keyword })

// [5、获取一次性验证码](#5获取一次性验证码)<br/>
// export const reqValidation = () => ajax('/captcha')

// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
    // [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })
    // [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
    // [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
    // [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => ajax(BASE_URL + '/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
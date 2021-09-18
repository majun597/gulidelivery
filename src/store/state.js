//设计state 清楚哪些状态需要管理
//所有从后台获取的数据基本上都会放到state中
export default {
    latitude: 40.10038, //经纬度
    longitude: 116.36867,
    address: {}, //地址相关信息
    categorys: [], //食品分类列表
    shops: [], //商家数组
    userInfo: {}, // 用户信息
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
    cartFoods: [], // 购物车中食物的列表
    searchShops: [], // 搜索得到的商家列表

}
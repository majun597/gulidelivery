import Vue from 'vue'


//自定义过滤器1
// import moment from 'moment'
// Vue.filter('date-format', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
//     return moment(value).format(formatStr)
// })
//自定义过滤器2
import format from 'date-fns/format'
Vue.filter('date-format', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
    return format(value, formatStr)
})
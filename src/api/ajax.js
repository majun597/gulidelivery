// Ajax请求函数模块
// 返回值：Promise对象（异步返回的数据是response.data而不是response） 

//使用axios发送请求
import axios from 'axios'

//向外默认暴露一个函数，此处就命名为ajax 
//括号里面接收三个参数：请求地址、请求参数（此处为对象形式）、请求方式（此处为get方式,get请求方式也比较居多）
export default function ajax(url, data = {}, type = 'GET') {
    //此处的promise最终向外部返回的数据是response.data而不是response
    return new Promise(function(resolve, reject) {
        //执行异步ajax请求
        let promise
        if (type === 'GET') {
            // 如果是get请求 则把data里的数据拼接到URL里面
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
        } else {
            //如果是post请求 则接收这个对象
            // 发送post请求
            promise = axios.post(url, data)
        }

        //成功了调用resolve 失败了调用reject
        promise.then(response => {
                //成功的情况
                resolve(response.data)
            })
            .catch(error => {
                //失败的情况
                reject(error)
            })
    })
}
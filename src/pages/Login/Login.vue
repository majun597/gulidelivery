<template>
  <div id="app">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on: loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" 
                        class="get_verification" 
                        :class="{right_phone: rightPhone}" 
                        @click.prevent="getCode">
                        <!-- 使用三目运算符 如果计时为0显示获取验证码 若大于0则显示已发送（剩余时间） -->
                        {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}} 
                </button>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on: !loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd? 'abc' : '...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <!-- @click="$router.back() 点击之后返回上一页面 -->
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <!-- 当密码不正确时弹出窗口 -->
      <alert-tip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></alert-tip>
    </section>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
  import {Toast} from 'mint-ui'

  export default {
    name: "Login",
    components: {
      AlertTip
    },
    data () {
      return {
        loginWay: true, //true代表短信登录 false代表密码登录
        phone: '',//手机号
        computeTime: 0, //计时的时间
        showPwd: false, //是否显示密码
        pwd: '',//密码
        code: '', //短信验证码
        name: '',//用户名
        captcha: '',//图形验证码
        alertText: '',//提示文本
        alertShow: false,//是否显示警告框
      }
    },
    computed: {
      rightPhone() {
        //需要返回一个boolean类型的结果，而这个结果需要根据手机号的正则进行匹配
        //此处需要创建一个正则对象来匹配手机号 以1开头后面有10个数字 
        //使用.test方法进行判断 若手机号的值与正则匹配,则是一个合法的值,然后返回一个true，然后就可以添加类名rightPhone，改变获取验证码的样式
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      //异步获取短信验证码
      async getCode() {
        //如果当前没有计时
        if (!this.computeTime) {
          //启动倒计时
          this.computeTime = 59
          //toast显示已发送验证码
          Toast('已发送验证码')
          //循环定时器
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0){
              //当时间小于等于0时停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)
          //发送ajax请求（向指定手机号发送短信验证码）
          const result = await reqSendCode(this.phone)
          if(result.code===1){
            //显示提示短信验证码不正确
            this.showAlert(result.msg)
            //停止计时
            if(this.computeTime){
              this.computeTime = 0
              clearInterval(this.intervalId)
            }
          }
        }
      },
      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },
      //异步登录
      async login(){
        let result
        //前台表单验证
        if(this.loginWay) {//短信登录
          //需要验证的内容是手机号和短信验证码
          const {rightPhone, phone, code} = this
          if (!this.rightPhone) {
            //手机号码不规范
            this.showAlert('手机号码不规范')
            return
          }else if(!/^\d{6}$/.test(code)) {
            //验证码不正确
            this.showAlert('验证码不正确')
            return
          }
          //发送ajax请求短信登录
          result = await reqSmsLogin(phone, code)
         
        }else {//密码登录
          //需要验证的内容是用户名、密码、图形验证码
          const {name, pwd, captcha} = this
          if (!this.name) {
            //用户名不正确
            this.showAlert('用户名不正确')
            return
          }else if(!this.pwd) {
            //密码不正确
            this.showAlert('密码不正确')
            return
          }else if(!this.captcha) {
            //验证码不正确
            this.showAlert('验证码不正确')
            return
          }
          // 发送ajax请求密码登录
          result = await reqPwdLogin({name, pwd, captcha})
        }

        //停止计时
        if(this.computeTime){
          this.computeTime = 0
          clearInterval(this.intervalId)
        }

        //根据结果数据处理
        if(result.code===0) {
          //成功的情况
          const user = result.data
          //将user保存到vuex的state中
          this.$store.dispatch('recordUser', user)
          //去个人中心界面
          this.$router.replace('/profile')

        }else {
          //失败的情况
          const msg = result.msg
          //更新图片验证码
          this.getCaptcha()
          //弹出提示框
          this.showAlert(msg)
        }
      },
      //当登录信息有误时弹出窗口的关闭
      closeTip() {
        this.alertShow = false
        this.alertText = ''
      },
      //获取新的图片验证码
      getCaptcha() {
        //需要每次指定的src值不一样  此处在原有的值后面加上当前时间
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color rgb(2, 167, 116) 
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(28px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
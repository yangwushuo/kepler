<template>
  <div class="main">
    <div id="container-login">
      <div id="title"><i class="iconfont icon-denglu1"></i> 注册</div>

      <form @submit.prevent>
        <div class="input" ref="usernameRef">
          <div class="input-addon">
            <i class="iconfont icon-denglu"></i>
          </div>
          <input
            id="username"
            placeholder="邮箱"
            type="email"
            required
            class="validate"
            autocomplete="off"
            v-model="account.username"
            @change="handlerUsername"
          />
        </div>

        <div class="clearfix"></div>

        <div class="input">
          <div class="input-addon">
            <i class="iconfont icon-mima"></i>
          </div>
          <input
            id="password"
            placeholder="密码"
            type="password"
            required
            class="validate"
            autocomplete="off"
            v-model="account.password"
            @change="handlerVerifyPassword"
          />
        </div>

        <div class="input" ref="verifyPasswordRef">
          <div class="input-addon">
            <i class="iconfont icon-mima"></i>
          </div>
          <input
            id="verifypassword"
            placeholder="确认密码"
            type="password"
            required
            class="validate"
            autocomplete="off"
            v-model="account.verifyPassword"
            @change="handlerVerifyPassword"
          />
        </div>

        <div>
          <div class="input input_captcha" ref="captchaRef">
            <div class="input-addon">
              <i class="iconfont icon-yanzhengma"></i>
            </div>
            <input
              id="captcha"
              placeholder="验证码"
              maxlength="6"
              type="text"
              required
              class="validate"
              autocomplete="off"
              v-model="account.captcha"
              @change="handlerCaptcha"
            />
          </div>
          <div class="get_captcha" @click="getEmailCaptcha">
            <i v-show="getCaptchaShow.initial">获取验证码</i>
            <i v-show="getCaptchaShow.proceed">{{ getCaptchaShow.time }}s</i>
            <i v-show="getCaptchaShow.resend">重新获取</i>
          </div>
        </div>

        <div class="remember-me">
          <input id="cb" type="checkbox" v-model="account.agree" />
          <span style="color: #ddd">我接受服务条款</span>
        </div>

        <input type="submit" @click="doReg" value="注册" />
      </form>

      <div class="account_login" @click="doLogin">已有账号? 进入登录</div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import _ from "lodash";
import { reqEmailCaptcha, reqReg } from "@/api";
import { statusCode } from "@/utils";
import { timeouts } from "retry";
export default {
  name: "Register",
  setup() {
    var router = useRouter();
    var validator = inject("validator");
    var warnColor = "255,48,48";
    var warn = `rgba(${warnColor}) 0px 0px 0px 1px`;

    var account = reactive({
      username: "",
      password: "",
      verifyPassword: "",
      captcha: "",
      captchaId: "",
      agree: "",
    });

    var getCaptchaShow = reactive({
      initial: true,
      proceed: false,
      resend: false,
      time: 60,
    });

    var usernameRef = ref(null);
    var verifyPasswordRef = ref(null);
    var captchaRef = ref(null);


    var hint = {
      usernameHint: null,
      passwordHint: null,
    }

    //跳转到登录页
    function doLogin() {
      router.push("/login");
    }

    //校验账号
    function handlerUsername() {
      var result = false;
      validator.validate({ email: account.username }, (errors) => {
        if (errors) {
          //校验不通过 弹窗提示错误
          if(!hint.usernameHint){
            hint.usernameHint = errHint(errors[0].message,-1);
          }
          //输入框红色警告
          redWarn(usernameRef);
          return;
        }
        // 校验通过
        // 输入框警告
        hint.usernameHint && hint.usernameHint.close();
        hint.usernameHint = null;
        cancelRedWarn(usernameRef);
        //消除弹窗
        
        result = !_.isEqual(account.username, "");
      });
      return result;
    }

    //检验密码
    function handlerVerifyPassword() {
      if (!_.isEqual(account.password, account.verifyPassword)) {
        //校验不通过 弹窗提示错误
        if(!hint.passwordHint){
          hint.passwordHint =  errHint("两次输入密码不正确",-1);
        }
        //输入框红色警告
        redWarn(verifyPasswordRef);
        return false;
      } else {
        cancelRedWarn(verifyPasswordRef);
        hint.passwordHint && hint.passwordHint.close();
        hint.passwordHint = null;
        return true;
      }
    }

    //验证码
    function handlerCaptcha() {
      cancelRedWarn(captchaRef);
    }

    //获取邮箱验证码
    function getEmailCaptcha() {
      //校验
      if (handlerUsername() && !getCaptchaShow.proceed) {
        //请求发送验证码并获取验证id
        reqEmailCaptcha({ email: account.username })
          .then((res) => {
            if (res.code == statusCode.SUCCESS.code) {
              account.captchaId = res.data;
              console.log(account.captchaId);
            }
          })
          .catch((error) => {
            console.log(error);
          });

        //开始倒计时
        var timer = setInterval(() => {
          getCaptchaShow.time -= 1;
          if (getCaptchaShow.time == 0) {
            getCaptchaShow.time = 60;
            clearInterval(timer);
            //设置重新获取状态
            getCaptchaShow.proceed = false;
            getCaptchaShow.initial = false;
            getCaptchaShow.resend = true;
          }
        }, 1000);
        //设置记录时间状态
        getCaptchaShow.proceed = true;
        getCaptchaShow.initial = false;
        getCaptchaShow.resend = false;
      }
    }

    //进行注册
    function doReg() {
      if (handlerUsername() && handlerVerifyPassword()) {
        if (account.agree) {
          //请求注册
          reqReg({
            email: account.username,
            password: account.password,
            captcha: account.captcha,
            captchaId: account.captchaId,
          })
            .then((res) => {
              //判断是否注册成功
              if (res.code == statusCode.SUCCESS.code) {
                //如果注册成功跳转到登录页
                succHint("注册成功,即将跳转到登录页", () => {
                  setTimeout(() => {
                    router.push("/login");
                  }, 3000);
                });
              } else if (res.code == statusCode.EMAIL_EXIST.code) {
                errHint(statusCode.EMAIL_EXIST.desc);
              } else if (res.code == statusCode.EMAIL_ERROR.code) {
                errHint(statusCode.EMAIL_ERROR.desc);
              } else if (res.code == statusCode.CAPTCHA_ERROR.code) {
                errHint(statusCode.CAPTCHA_ERROR.desc);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          errHint("请确认服务条款");
        }
      }
    }

    //设置红框显示
    function redWarn(r) {
      r.value.style.boxShadow = warn;
    }

    //取消红框显示
    function cancelRedWarn(r) {
      r.value.style.boxShadow = "";
    }

    //弹窗
    function errHint(msg,time=3000) {
      return ElMessage({
        showClose: true,
        message: msg,
        type: "error",
        center: true,
        effect: "dark",
        description: "",
        showIcon: true,
        offset: 100,
        duration: time,
        grouping: true,
      });
    }

    function succHint(msg, closeCallBack) {
      ElMessage({
        showClose: true,
        message: msg,
        type: "success",
        center: true,
        effect: "dark",
        description: "",
        showIcon: true,
        offset: 100,
        onClose: closeCallBack,
      });
    }

    return {
      account,
      getCaptchaShow,
      usernameRef,
      verifyPasswordRef,
      captchaRef,
      handlerVerifyPassword,
      handlerUsername,
      handlerCaptcha,
      doLogin,
      doReg,
      getEmailCaptcha,
    };
  },
};
</script>

<style scoped>
.main {
  background-color: var(--mainbgcolor);
  position: relative;
  height: 93vh;
}

#container-login {
  background-color: var(--mainbgcolor);
  width: 360px;
  height: 500px;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  text-align: center;
  margin: auto;
  position: absolute;
  top: -20%;
  left: 0;
  bottom: 0;
  right: 0;
}

/* #container-login:hover{
    transform:scale(1.1);
} */

#title {
  position: relative;
  padding: 20px 0px;
  /* border-radius: 0.5em; */
  font-size: 22px;
  color: #c1c3c6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

#title i {
  font-size: 22px;
}

.input {
  font-size: 16px;
  margin: auto;
  width: 300px;
  height: auto;
  border-radius: 4px;
  background-color: #373b3d;
  padding: 8px 0px;
  margin-top: 15px;
}

.input-addon {
  color: #c1c3c6;
  float: left;
  border: 1px solid #373b3d;
  padding: 4px 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

input[type="checkbox"] {
  cursor: pointer;
}

input[type="text"] {
  width: 250px;
  color: #c1c3c6;
  background-color: #373b3d;
  border: 1px solid #373b3d;
  padding: 6px 0px;
  border-radius: 3px;
}

input[type="text"]:focus {
  border: 1px solid #373b3d;
}

input[type="password"] {
  width: 250px;
  color: #c1c3c6;
  background-color: #373b3d;
  border: 1px solid #373b3d;
  padding: 6px 0px;
  border-radius: 3px;
}

input[type="password"]:focus {
  border: 1px solid #373b3d;
}

input[type="email"] {
  width: 250px;
  color: #c1c3c6;
  background-color: #373b3d;
  border: 1px solid #373b3d;
  padding: 6px 0px;
  border-radius: 3px;
}

input[type="email"]:focus {
  border: 1px solid #373b3d;
}

.input_captcha {
  width: 140px;
  margin-left: 30px;
}

.input_captcha #captcha {
  margin-left: -4px;
  width: 83px;
}

#captcha_img {
  display: block;
  margin-top: -50px;
  margin-left: 180px;
  width: 150px;
  height: 50px;
}

.get_captcha {
  display: block;
  margin-top: -50px;
  margin-left: 180px;
  width: 150px;
  height: 50px;
  color: #c1c3c6;
  background: #373b3d;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
}

.account_login {
  width: 150px;
  margin-top: 10px;
  padding: 6px 25px;
  background: #373e4a;
  color: #c1c3c6;
  font-weight: bold;
  border: 0 none;
  cursor: pointer;
  border-radius: 3px;
  font-size: 16px;
  margin: 20px auto;
}

*:focus {
  outline: none;
}

.remember-me {
  font-size: 16px;
  margin-top: 14px;
}

.remember-me #cb {
  margin-right: 8px;
}

input[type="submit"] {
  width: 150px;
  margin-top: 10px;
  padding: 6px 25px;
  background: #373e4a;
  color: #c1c3c6;
  font-weight: bold;
  border: 0 none;
  cursor: pointer;
  border-radius: 3px;
  font-size: 16px;
}
</style>
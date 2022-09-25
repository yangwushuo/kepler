<template>
  <div class="main">
    <div id="container-login">
      <div id="title"><i class="iconfont icon-denglu1"></i> 登录</div>

      <form @submit.prevent>
        <div class="input" ref="usernameRef">
          <div class="input-addon">
            <i class="iconfont icon-denglu"></i>
          </div>
          <input
            id="username"
            placeholder="邮箱"
            :maxlength="data.usernameMaxLen"
            :minlength="data.usernameMinLen"
            type="text"
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
            :maxlength="data.passwordMaxLen"
            :minlength="data.passwordMinLen"
            type="password"
            required
            class="validate"
            autocomplete="off"
            v-model="account.password"
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
              :maxlength="data.captchaMaxLen"
              type="text"
              required
              class="validate"
              autocomplete="off"
              v-model="account.captcha"
            />
          </div>
          <div class="captcha_img" ref="captchaImgRef">
            <img @click="getCaptcha" :src="data.captchaImg" />
          </div>
        </div>

        <div class="remember-me">
          <input id="cb" type="checkbox" v-model="account.rm" />
          <span style="color: #ddd">记住我</span>
        </div>

        <input type="submit" @click="doLogin" value="登录" />
      </form>

      <div class="forgot-password">
        <a href="#">忘记密码?</a>
      </div>

      <div class="register">
        <a href="#"
          ><button id="register-link" @click="doReg">
            还没有账号？进入注册
          </button></a
        >
      </div>
      <div class="third">第三方登录</div>
      <div class="third_login">
        <div id="wechat"><img src="@/assets/img/weixinLogo.png" />微信</div>
        <div id="google"><img src="@/assets/img/GoogleLogo.png" />谷歌</div>
        <div id="metamask">
          <img src="@/assets/img/MetaMaskLogo.png" />MetaMask
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCaptcha, reqLogin } from "@/api";
import { reactive, onMounted, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElLoading } from "element-plus";
import _ from "lodash";
import { statusCode } from "@/utils";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    var validator = inject("validator");
    var warnColor = "255,48,48";
    var warn = `rgba(${warnColor}) 0px 0px 0px 1px`;

    var data = reactive({
      usernameMaxLen: 24,
      usernameMinLen: 10,
      passwordMaxLen: 24,
      passwordMinLen: 10,
      captchaMaxLen: 6,
      captchaImg: "",
    });

    var account = reactive({
      username: "",
      password: "",
      key: "",
      rm: 0,
      captcha: "",
    });

    var usernameRef = ref(null);
    var captchaRef = ref(null);
    var captchaImgRef = ref(null);

    var usernameHint = null;
    var captchaHint = null;

    const store = useStore();

    var dc = document.documentElement.style;

    //获取验证码
    function getCaptcha() {
      //加载loading
      var load = ElLoading.service({
        target: captchaImgRef.value,
        background: dc.getPropertyValue("--mainbgcolor"),
        spinner: "el-loading-spinner",
      });
      reqCaptcha()
        .then((res) => {
          if (res.code == statusCode.SUCCESS.code) {
            //记住验证码id
            account.key = res.data.key;
            //绘制验证码图像
            data.captchaImg = res.data.image;
            //关闭loading
            load.close();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //进行登录操作
    async function doLogin() {
      //再次校验账号 //校验验证码
      if (handlerUsername() && checkCaptcha()) {
        account.rm ? (account.rm = "true") : (account.rm = "false");
        try {
          var res = await reqLogin(account);
          if (res.code == statusCode.SUCCESS.code) {
            //将token保存到本地
            //获取用户信息
            try {
              await store.dispatch("userInfoStore/getUserInfo");
              //获取用户头像信息
              await store.dispatch("userInfoStore/getUserPortraitImage");
              //跳转到首页
              //获取路由是否需要跳转
              var redirect = router.currentRoute.value.query.redirect;
              if (redirect) {
                router.push(redirect);
              } else {
                router.push("/index");
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            errHint(res.msg);
          }
        } catch (err) {
          console.log(err);
          errHint("登录失败");
        }
      }
    }

    //进入注册
    function doReg() {
      router.push("/reg");
    }

    //校验验证码
    function checkCaptcha(){
      var result = false;
      if((_.isEqual(account.captcha,"") || account.captcha.length != 6)){
        captchaHint = errHint("请输入规范验证码");
        captchaRef.value.style.boxShadow = warn;
        return result;
      }else{
        if(captchaHint){
          captchaHint.close();
          captchaHint = null;
        }
        captchaRef.value.style.boxShadow = "";
        result = true;
        return result;
      }
    }

    //校验账号
    function handlerUsername() {
      var result = false;
      validator.validate({ email: account.username }, (errors) => {
        if (errors) {
          //校验不通过 弹窗提示错误
          if (!usernameHint) {
            usernameHint = errHint(errors[0].message, -1);
          }
          //输入框红色警告
          usernameRef.value.style.boxShadow = warn;
          return;
        }

        if(_.isEqual(account.username, "")){
          //校验不通过 弹窗提示错误
          if(!usernameHint){
            usernameHint = errHint("账号输入错误");
          }
          //输入框红色警告
          usernameRef.value.style.boxShadow = warn;
          return;
        }else{
          result = true;
        }

        // 校验通过
        // 输入框警告
        usernameRef.value.style.boxShadow = "";
        usernameHint && usernameHint.close();
        usernameHint = null;
        result = !_.isEqual(account.username, "");
      });
      return result;
    }

    //弹窗
    function errHint(msg, time = 3000) {
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
      });
    }

    //页面创建完毕后
    onMounted(() => {
      //获取验证码
      getCaptcha();
    });

    return {
      data,
      account,
      usernameRef,
      captchaRef,
      captchaImgRef,
      getCaptcha,
      doLogin,
      doReg,
      handlerUsername,
    };
  },
};
</script>

<style scoped>
.main {
  background-color: var(--mainbgcolor);
  position: relative;
  height: 95vh;
}

#container-login {
  background-color: var(--mainbgcolor);
  width: 360px;
  height: 640px;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  text-align: center;
  margin: auto;
  position: absolute;
  top: 0;
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
  color: #949494;
  margin: 0;
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

.captcha_img {
  display: block;
  margin-top: -50px;
  margin-left: 180px;
  width: 150px;
  height: 50px;
}

.forgot-password {
  font-size: 16px;
  padding: 12px;
  height: 18px;
  position: relative;
  bottom: 0%;
  text-align: center;
}

.forgot-password a:link {
  color: #c1c3c6;
  text-decoration: none;
}

.forgot-password a:visited {
  color: #c1c3c6;
  text-decoration: none;
}

.forgot-password a:hover {
  color: #fff;
  transition: color 1s;
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

.register {
  color: #c1c3c6;
  font-size: 16px;
  padding-top: 12px;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

#register-link {
  padding: 6px 25px;
  background: #373e4a;
  color: #c1c3c6;
  font-weight: bold;
  border: 0 none;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
}

.third {
  color: #c1c3c6;
  font-size: 16px;
  padding: 5px 0;
}

.third_login {
}

.third_login > div {
  width: 200px;
  height: 38px;
  margin: 10px auto;
  background-color: #373e4a;
  border-radius: 0.4em;
  color: #c1c3c6;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.third_login img {
  width: 22px;
  height: auto;
  padding-right: 5px;
}
</style>
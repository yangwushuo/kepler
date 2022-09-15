<template>
  <div class="form-warpper">
    <form @submit.prevent>
      <div class="input">
        <div class="input-warpper">
          <span class="title">实盘昵称</span>
          <input
            id="nick-name"
            placeholder="实盘昵称"
            type="text"
            autocomplete="off"
            v-model="formData.nickName"
          />
        </div>
        <div class="input-warpper">
          <span class="title">API-KEY</span>
          <input
            id="api-key"
            placeholder="api-key"
            type="text"
            autocomplete="off"
            v-model="formData.apiKey"
          />
        </div>
        <div class="input-warpper">
          <span class="title">SECRET-KEY</span>
          <input
            id="secret-key"
            placeholder="secret-key"
            type="text"
            autocomplete="off"
            v-model="formData.secretKey"
          />
        </div>
        <div class="input-warpper" v-if="getExchangeName() == 'OKEX'">
          <span class="title">password</span>
          <input
            id="secret-key"
            placeholder="password"
            type="text"
            autocomplete="off"
            v-model="formData.password"
          />
        </div>
        <div class="input-warpper">
          <span class="title"> 账户展示 </span>
          <div class="switch-wrapper">
            <span>
              上线广场
              <el-switch v-model="formData.online"></el-switch>
            </span>
            <span class="ver-code-wrapper">
              订阅码关注
              <el-switch
                v-model="formData.verCodeFollow"
                @change="changeVerCode"
              ></el-switch>
              <el-input
                v-if="formData.verCodeFollow"
                v-model="formData.verCode"
                class="ver-code-input"
                size="small"
                placeholder="订阅码"
                maxlength="6"
                minlength="6"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><i class="material-symbols-outlined">security</i></el-icon>
                </template>
              </el-input>
            </span>
          </div>
        </div>
        <div class="input-warpper">
          <span class="title"> 实盘展示信息 </span>
          <div class="switch-wrapper">
            <span>
              资金
              <el-switch v-model="formData.moneyShow"></el-switch>
            </span>
            <span>
              最近交易
              <el-switch v-model="formData.tradeHistory"></el-switch>
            </span>
            <span>
              持仓
              <el-switch v-model="formData.option"></el-switch>
            </span>
          </div>
        </div>
        <div class="input-warpper">
          <span class="title">验证码</span>
          <input
            id="captcha"
            maxlength="6"
            placeholder="验证码"
            type="text"
            autocomplete="off"
            v-model="formData.captcha"
          />
          <div class="captcha-button">
            <div class="get_captcha" @click="getEmailCaptcha">
              <i v-show="getCaptchaShow.initial">获取验证码</i>
              <i v-show="getCaptchaShow.proceed">{{ getCaptchaShow.time }}s</i>
              <i v-show="getCaptchaShow.resend">重新获取</i>
            </div>
          </div>
        </div>
        <div class="submit">
          <input
            type="submit"
            value="添加"
            @click="createAccount"
            class="button1 button1-pill button1-primary"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { reqAddAccount, reqEmailCaptcha } from "@/api";
import { statusCode } from "@/utils";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import _ from "lodash";
import { computed } from "@vue/runtime-core";
export default {
  name: "AccountForm",
  props: {
    itemActive: Number,
  },
  setup(props) {
    var formData = reactive({
      exchangeId: "",
      nickName: "",
      apiKey: "",
      secretKey: "",
      password: null,
      key: "",
      captcha: "",
      verCodeFollow: false,
      verCode: "",
      online: false,
      moneyShow: false,
      tradeHistory: false,
      option: false,
    });

    const store = useStore();

    var getCaptchaShow = reactive({
      initial: true,
      proceed: false,
      resend: false,
      time: 60,
    });

    formData.exchangeId = computed(() => {
      return props.itemActive;
    });

    function changeVerCode(v) {
      if (!v) {
        formData.verCode = "";
      }
    }

    //创建账号
    function createAccount() {
      if (checkInput()) {
        if (!_.isEqual(formData.captcha, "")) {
          reqAddAccount(formData)
            .then((res) => {
              if (res.code == statusCode.SUCCESS.code) {
                hint("创建成功", "success");
                formData.nickName = "";
                formData.apiKey = "";
                (formData.secretKey = ""), (formData.captcha = "");
                formData.key = "";
                //重新发起获取用户交易账号的请求
                store.dispatch("exchangeStore/getUserExchange");
              } else {
                //判断错误进行提示
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          hint("验证码不能为空", "error");
        }
      }
    }

    //校验输入框
    function checkInput() {
      var status = true;
      if (_.isEqual(formData.nickName, "")) {
        //
        hint("实盘昵称不能为空", "error");
        status = false;
      } else if (_.isEqual(formData.apiKey, "")) {
        //
        hint("api key不能为空", "error");
        status = false;
      } else if (_.isEqual(formData.secretKey, "")) {
        //
        hint("secret key不能为空", "error");
        status = false;
      } else if (
        getExchangeName() == "OKEX" &&
        _.isEqual(formData.password, "")
      ) {
        //
        hint("密码不能为空", "error");
        status = false;
      }

      return status;
    }

    //获取邮箱验证码
    function getEmailCaptcha() {
      //校验
      if (checkInput() && !getCaptchaShow.proceed) {
        //请求发送验证码并获取验证id
        reqEmailCaptcha({ email: store.state.userInfoStore.userInfo.email })
          .then((res) => {
            if (res.code == statusCode.SUCCESS.code) {
              formData.key = res.data;
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

    //获取交易所名字
    function getExchangeName() {
      return store.getters["exchangeStore/getExchangeNameById"](
        props.itemActive
      );
    }

    //弹窗
    function hint(msg, type, time = 3000) {
      return ElMessage({
        showClose: true,
        message: msg,
        type: type,
        center: true,
        effect: "dark",
        description: "",
        showIcon: true,
        offset: 100,
        duration: time,
      });
    }

    return {
      formData,
      getCaptchaShow,
      createAccount,
      getEmailCaptcha,
      getExchangeName,
      changeVerCode,
    };
  },
};
</script>

<style scoped>
.form-warpper {
  position: absolute;
}

#nick-name {
  width: 100 px;
  position: relative;
  left: 10px;
  padding-left: 5px;
}

#api-key,
#secret-key {
  width: 500px;
  position: relative;
  left: 10px;
  padding-left: 5px;
}

#captcha {
  width: 83px;
  position: relative;
  left: 10px;
  padding-left: 5px;
}

.submit {
  display: flex;
  justify-content: center;
  position: relative;
  top: 20px;
}

.input-warpper >>> .el-switch {
  --el-switch-on-color: #00ad45 !important;
}

.captcha-button {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  position: relative;
  left: 16px;
  color: black;
}

.get_captcha {
  cursor: pointer;
  width: 100px;
  height: 40px;
  color: #c1c3c6;
  background: #373b3d;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
}

.input-warpper {
  font-size: 16px;
  color: white;
  display: flex;
  justify-content: left;
  padding-top: 20px;
}

.input-warpper .title {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: right;
}

input[type="text"] {
  font-size: 16px;
  color: #c1c3c6;
  background-color: #373b3d;
  border: 1px solid #373b3d;
  padding: 6px 0px;
  border-radius: 3px;
  box-shadow: rgba(12, 6, 6, 0.16) 0px 0px 3px, rgb(51, 51, 51) 0px 0px 0px 2px;
}

input[type="text"]:focus {
  outline: none;
  /* box-shadow: red 0px 0px 4px ; */
}

.el-switch{
  margin-left: 5px;
}

.input-warpper .switch-wrapper {
  width: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  line-height: 40px;
}

.input-warpper .ver-code-wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.input-warpper .switch-wrapper .ver-code-input {
  margin-left: 5px;
  width: 100px;
}
</style>
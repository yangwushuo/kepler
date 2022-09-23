<template>
  <div class="info_warppper">
    <div class="portrait-wrapper">
      <div class="portrait-wrapper-img">
        <img ref="portraitImgRef" :src="b64Img" />
      </div>
      <div class="portrait-mod">
        <button
          class="button1 button1-primary button1-pill button1-tiny"
          ref="browseRef"
          @click="modPortrait"
        >
          修改
        </button>
        <button
          class="button1 button1-action button1-pill button1-tiny"
          ref="uploadRef"
          @click="savePortrait"
        >
          上传
        </button>
      </div>
    </div>
    <el-descriptions
      direction="horizontal"
      :column="1"
      :size="large"
      :border="true"
    >
      <el-descriptions-item>
        <template #label> ID </template>
        {{ userInfo.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 用户名# </template>
        <div class="item-content">
          <span v-if="userNameEditState">{{ userInfo.username }}</span>
          <input
            v-if="!userNameEditState"
            :placeholder="userInfo.username"
            v-model="userInfo.username"
            @blur="changeUserNameEditState"
          />
          <span
            style="font-size: 16px; color: #76b852; cursor: pointer"
            class="material-symbols-outlined icon"
            @click="changeUserNameEditState"
            >edit_square</span
          >
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 邮箱 </template>
        <span>{{ userInfo.email }}</span>
        <span>
          <el-dialog
            v-model="emailDialogVisible"
            :width="emailDialogSetting.width"
            :align-center="emailDialogSetting.alignCenter"
            :lock-scroll="emailDialogSetting.lockScroll"
            :open-delay="emailDialogSetting.openDelay"
            :close-delay="emailDialogSetting.closeDelay"
            :custom-class="emailDialogSetting.customClass"
            :show-close="emailDialogSetting.showClose"
          >
            <template #title>
              <span
                style="color: #464646; font-family: 'drameH'; font-size: 18px"
                >{{ emailDialogSetting.title }}</span
              >
            </template>
            <div class="email-dialog-wrapper">
              <div class="email-dialog-wrapper-item">
                <div class="email-dialog-wrapper-title">新邮箱</div>
                <input id="new-email" type="text" @input="newInputEmail" />
              </div>
              <div></div>
              <div class="email-dialog-wrapper-item">
                <div class="email-dialog-wrapper-title">验证码</div>
                <input id="ver-code" type="text" />
                <button
                  id="ver-code-butt"
                  class="button1 button1-primary button1-pill button1-small"
                  @click="getEmailCaptcha"
                >
                  <i v-show="getCaptchaShow.initial">获取验证码</i>
                  <i v-show="getCaptchaShow.proceed"
                    >{{ getCaptchaShow.time }}s</i
                  >
                  <i v-show="getCaptchaShow.resend">重新获取</i>
                </button>
              </div>
              <div></div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <button
                  class="button1 button1-pill button1-small button-tiny"
                  @click="emailDialogVisible = false"
                >
                  取消
                </button>
                <button
                  class="button1 button1-action button1-pill button1-small"
                  @click="emailDialogVisible = false"
                >
                  确认
                </button>
              </span>
            </template>
          </el-dialog>
        </span>

        <button
          style="margin-left: 5px"
          class="button1 button1-pill button1-caution button1-tiny"
          @click="emailDialogVisible = true"
        >
          修改
        </button>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 简介# </template>
        <div class="item-content">
          <span v-if="introductionEditState">{{ userInfo.introduction }}</span>
          <input
            v-if="!introductionEditState"
            v-model="userInfo.introduction"
            :placeholder="userInfo.introduction"
            @blur="changeIntroductionEditState"
          />
          <span
            style="font-size: 16px; color: #76b852; cursor: pointer"
            class="material-symbols-outlined icon"
            @click="changeIntroductionEditState"
            >edit_square</span
          >
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 地址 </template>
        <el-select
          v-model="userInfo.province"
          :placeholder="userInfo.province"
          size="small"
          class="selectProvice"
        >
          <el-option
            v-for="(item, index) in province"
            :key="index"
            :value="item.code"
            :label="item.name"
          />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 生日 </template>
        <el-date-picker
          class="elDatePicker"
          v-model="userInfo.birth"
          :type="birthSetting.type"
          :placeholder="userInfo.birth"
          :size="birthSetting.size"
          :value-format="birthSetting.valueFormat"
        />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 性别 </template>
        <el-select
          class="elSelect"
          v-model="userInfo.sex"
          :placeholder="userInfo.sex"
          :size="sexSetting.size"
          :fitInputWidth="sexSetting.fitInputWidth"
        >
          <el-option
            class="elOption"
            v-for="option in sexSetting.options"
            :key="option.id"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 最近登录 </template>
        {{ userInfo.recentlyTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 账户创建时间 </template>
        {{ userInfo.createTime }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="save-info">
      <el-button type="primary" round @click="saveInfo">保存</el-button>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import plupload from "plupload";
import { reqUpUserInfo, reqEmailCaptcha } from "@/api";
import { statusCode } from "@/utils";
export default {
  name: "AccountInfo",
  setup() {
    const { province } = require("province-city-china/data");
    const store = useStore();
    var uploader = null;

    var birthSetting = reactive({
      size: "small",
      type: "date",
      valueFormat: "YYYY-MM-DD",
    });

    var sexSetting = reactive({
      size: "small",
      fitInputWidth: true,
      options: [
        {
          id: 1,
          value: "男",
          label: "男",
        },
        {
          id: 2,
          value: "女",
          label: "女",
        },
      ],
    });

    var browseRef = ref(null);
    var uploadRef = ref(null);
    var portraitImgRef = ref(null);

    var userNameEditState = ref(true);
    var introductionEditState = ref(true);
    var emailDialogVisible = ref(false);

    var emailDialogSetting = reactive({
      title: "请输入新邮箱",
      lockScroll: false,
      width: "20%",
      openDelay: 200,
      closeDelay: 200,
      alignCenter: false,
      customClass: "email-dialog",
      showClose: false,
    });

    var getCaptchaShow = reactive({
      initial: true,
      proceed: false,
      resend: false,
      time: 60,
    });

    //获取用户信息sex
    var userInfo = computed(() => {
      var date = store.state.userInfoStore.userInfo;
      return {
        id: date.id,
        email: date.email,
        username: date.username,
        birth: date.birth ? date.birth.split(" ")[0] : "2000-1-1",
        sex: date.sex ? date.sex : "男",
        introduction: date.introduction ? date.introduction : "空",
        province: date.province ? date.province + "" : "110000",
        createTime: date.createTime,
        recentlyTime: date.recentlyTime,
      };
    });

    //base64格式的头像
    var b64Img = store.state.userInfoStore.userPortraitImage;
    //新邮箱
    var newEmail = reactive({
      email: "",
      captchaId: "",
      captcha: "",
    });

    function verCaptcha(){
      return true;
    }

    //获取邮箱验证码
    function getEmailCaptcha() {
      //校验
      if (verCaptcha() && !getCaptchaShow.proceed) {
        //请求发送验证码并获取验证id
        reqEmailCaptcha({ email: store.state.userInfoStore.userInfo.email })
          .then((res) => {
            if (res.code == statusCode.SUCCESS.code) {
              newEmail.captchaId = res.data;
              console.log(newEmail.captchaId);
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

    function saveInfo() {
      console.log(userInfo.value);
      reqUpUserInfo(userInfo.value)
        .then((res) => {
          if (res.code == statusCode.SUCCESS.code) {
            //重新获取用户信息
            notic("保存信息成功", null, "success", 2000);
            store.dispatch("userInfoStore/getUserInfo");
          } else {
            notic("保存信息失败", null, "error", 2000);
          }
        })
        .catch((err) => {
          notic("保存信息失败", null, "error", 2000);
        });
    }

    function savePortrait() {
      //判断新头像与原头像是否相同
      uploader.start();
    }

    nextTick(() => {
      var token = localStorage.getItem("qp-token");
      uploader = new plupload.Uploader({
        browse_button: browseRef.value,
        multi_selection: false,
        unique_names: true,
        headers: {
          Authorization: token,
          Cookie: document.cookie,
        },
        url: "http://localhost:8081/user/up_portrait",
        filters: {
          max_file_size: "10mb",
          mime_types: [
            {
              title: "Image files",
              extensions: "jpg,png",
            },
          ],
        },
      });
      uploader.init();

      //绑定文件添加回调函数
      uploader.bind("FilesAdded", function (uploader, files) {
        //只获取最后一个图片
        console.log(uploader.files);
        var file = files[files.length - 1];
        //将图片加载成base64
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsDataURL(file.getNative(), "UTF-8"); //读取文件
        reader.onload = function (evt) {
          //读取完文件之后会回来这里
          var fileString = evt.target.result; // 读取base64文件
          portraitImgRef.value.src = fileString;
        };
      });

      //文件上传出发监听函数
      uploader.bind("UploadFile", function (uploader, files) {
        // console.log("文件正在上传");
      });

      //文件上传完毕
      uploader.bind("FileUploaded", function (uploader, file, responseObject) {
        var res = JSON.parse(responseObject.response);
        if (res.code == statusCode.SUCCESS.code) {
          notic("保存头像成功", null, "success", 2000);
          //vuex重新获取头像信息
          store.dispatch("userInfoStore/getUserPortraitImage");
        } else {
          notic("保存头像失败", null, "error", 2000);
        }
      });

      //文件发生错误
      uploader.bind("Error", function (uploader, errObject) {
        notic("保存头像失败", null, "error", 2000);
      });
    });

    function changeUserNameEditState() {
      userNameEditState.value = !userNameEditState.value;
    }

    function changeIntroductionEditState() {
      introductionEditState.value = !introductionEditState.value;
    }

    function newInputEmail(event) {
      newEmail.email = event.target.value;
    }

    function notic(title, message, type, duration, offset = 100) {
      return ElNotification({
        title: title,
        message: message,
        offset: offset,
        type: type,
        duration: duration,
      });
    }

    onMounted(() => {});

    return {
      province,
      userInfo,
      browseRef,
      uploadRef,
      b64Img,
      portraitImgRef,
      sexSetting,
      birthSetting,
      userNameEditState,
      introductionEditState,
      emailDialogVisible,
      emailDialogSetting,
      saveInfo,
      savePortrait,
      changeUserNameEditState,
      changeIntroductionEditState,
      newInputEmail,
      getCaptchaShow,
      getEmailCaptcha,
    };
  },
};
</script>

<style scoped>
.info_warppper {
  margin: 40px auto;
  width: 700px;
}

.item-content {
  cursor: pointer;
}

input[type="text"] {
  background-color: var(--mainbgcolor);
  border: none;
}

input[type="text"]::placeholder {
  color: white;
}

input[type="text"]:focus {
  background-color: var(--mainbgcolor);
  color: white;
  outline: none;
}

input[type="text"]:visited {
  color: white;
}

input[type="text"]:valid {
  color: white;
}

.info_warppper >>> .el-descriptions__table.is-bordered .el-descriptions__cell {
  border-top: none;
  border-left: none;
  border-right: none;
}

.info_warppper >>> .el-descriptions__table .is-bordered-label {
  height: 44px;
  color: white;
  background-color: var(--mainbgcolor) !important;
  border: none;
  padding-top: 10px;
}

.info_warppper >>> .el-descriptions__table .is-bordered-content {
  height: 44px;
  color: white;
  background-color: var(--mainbgcolor) !important;
  border: none;
  padding-top: 10px;
}

.info_warppper >>> .el-input__wrapper {
  background-color: var(--mainbgcolor) !important;
  border: none;
}

.info_warppper >>> .elDatePicker {
  background-color: var(--mainbgcolor) !important;
  width: 150px;
}

.elSelect {
  width: 75px;
}

.elOption {
  text-align: center;
}

.save-info {
  display: flex;
  justify-content: center;
}

.save-info button {
  margin: 5vh auto;
}

.portrait-wrapper {
  display: flex;
}

.portrait-wrapper .portrait-mod {
  display: flex;
  align-items: center;
}

.portrait-wrapper .portrait-mod button:first-child {
  margin: auto 10px;
}

.portrait-wrapper-img img {
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
  border: none;
}

.item-content input {
  width: 150px;
  height: 24px;
  background-color: var(--mainbgcolor);
  border: 1px solid white;
  border-radius: 4px;
  color: #606266;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 7px;
  font-size: inherit;
}

.item-content input:focus {
  outline: none;
}

:deep(.el-dialog) {
  background-color: #f2f6fa;
  border-radius: 18px;
}

:deep(.el-dialog__footer) {
  text-align: right;
}

.dialog-footer button {
  margin-right: 10px;
}

.email-dialog-wrapper .email-dialog-wrapper-item {
  display: flex;
  margin: 10px auto;
}

.email-dialog-wrapper-item .email-dialog-wrapper-title {
  width: 20%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.email-dialog-wrapper .email-dialog-wrapper-item #new-email {
  width: 70%;
  height: 30px;
  background-color: #f3f4f7;
  border: 1px solid #00bce4;
  color: black !important;
  border-radius: 12px;
  padding-left: 2%;
  transition: all 0.2s;
}

.email-dialog-wrapper .email-dialog-wrapper-item #ver-code {
  width: 30%;
  height: 30px;
  background-color: #f3f4f7;
  border: 1px solid #00bce4;
  color: black !important;
  border-radius: 12px;
  padding-left: 2%;
  transition: all 0.2s;
}

.email-dialog-wrapper .email-dialog-wrapper-item #ver-code-butt {
  width: 35%;
  margin-left: 10px;
}

.email-dialog-wrapper input:focus {
  border: 1px solid #00bce4;
  background-color: #f3f4f7;
}

.email-dialog-wrapper input:hover {
  border: 1px solid #00bce4;
  background-color: #f3f4f7;
}
</style>
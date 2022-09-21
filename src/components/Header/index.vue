<template>
  <div>
    <header class="site-header">
      <div class="wrapper site-header__wrapper">
        <div class="site-header__start">
          <span class="brand" @click="gotoRoute('/index')">QING PU</span>
        </div>
        <div class="site-header__middle">
          <nav class="header_nav">
            <ul class="header_nav_list">
              <li class="header_nav_item" @click="gotoRoute('/index')">
                <a>首页</a>
              </li>
              <li class="header_nav_item"><a>市场</a></li>
              <li class="header_nav_item"><a>实盘广场</a></li>
              <li class="header_nav_item" @click="gotoRoute('/tradeAccount')">
                <a>账户</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="site-header__end" ref="endRef">
          <div v-show="!account.username">
            <el-button
              class="loginAndRegister"
              size="large"
              round
              @click="doLogin"
              >登录</el-button
            >
            <el-button
              class="loginAndRegister"
              size="large"
              round
              @click="doReg"
              >注册</el-button
            >
          </div>
          <div v-show="account.username" class="person">
            <el-popover
              placement="bottom"
              trigger="hover"
              offset="10"
              width="150"
            >
              <template #reference>
                <div class="person_item">
                  <el-avatar :src="account.portraitImage" />
                </div>
              </template>
              <el-space direction="vertical" fill="true">
                <div v-for="(item, key) in portraitItem" :key="key">
                  <el-button
                    id="elButton"
                    :size="item.size"
                    :type="item.type"
                    :link="item.link"
                    @click="
                      typeof item.click == string
                        ? gotoRoute(item.click)
                        : item.click()
                    "
                    >{{ item.name }}</el-button
                  >
                </div>
              </el-space>
            </el-popover>
            <el-popover
              placement="bottom"
              trigger="hover"
              offset="10"
              width="150"
            >
              <template #reference>
                <div class="person_item">
                  <el-icon><More /></el-icon>
                </div>
              </template>
              <el-space direction="vertical" fill="true">
                <div v-for="(item, key) in moreItem" :key="key">
                  <el-button
                    id="elButton"
                    :size="item.size"
                    :type="item.type"
                    :link="item.link"
                    @click="
                      typeof item.click == string
                        ? gotoRoute(item.click)
                        : item.click()
                    "
                    >{{ item.name }}</el-button
                  >
                </div>
              </el-space>
            </el-popover>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { onMounted, reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { reqLogout } from "@/api";
import { statusCode } from "@/utils";
export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const store = useStore();

    var portraitItem = reactive([
      {
        name: "个人中心",
        size: "default",
        type: "plain",
        click: function personalCenter() {
          //跳转个人中心页面
          router.push("/personalCenter");
        },
      },
      {
        name: "退出登录",
        size: "default",
        type: "plain",
        click: function logout() {
          reqLogout()
            .then((res) => {
              if (res.code == statusCode.SUCCESS.code) {
                //
              }
            })
            .catch((err) => {
              errHint(err);
            })
            .finally(() => {
              //清空用户信息
              store.state.userInfoStore.userInfo = {};
              store.state.userInfoStore.userPortraitImage = "";
              //清楚本地token
              localStorage.removeItem("qp-token");
              //跳转到首页
              router.push("/index");
            });
        },
      },
    ]);

    var moreItem = reactive([
      {
        name: "教程",
        size: "default",
        type: "plain",
        click: "/",
      },
      {
        name: "客服",
        size: "default",
        type: "plain",
        click: "/",
      },
    ]);

    var endRef = ref(null);

    var account = reactive({
      username: "",
      portraitImage: "",
    });

    //无操作
    function gotoRoute(path = "") {
      router.push(path);
    }

    //登录操作
    function doLogin() {
      router.push("/login");
    }

    //注册操作
    function doReg() {
      router.push("/reg");
    }

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

    account.username = computed(() => {
      return store.state.userInfoStore.userInfo.username;
    });

    account.portraitImage = computed(() => {
      return store.state.userInfoStore.userPortraitImage;
    });

    //创建之前
    onMounted(() => {});

    return {
      endRef,
      portraitItem,
      moreItem,
      gotoRoute,
      doLogin,
      doReg,
      account,
    };
  },
};
</script>

<style scoped>
.site-header {
  /* position: relative; */
  background-color: var(--mainbgcolor);
  border-bottom: 0.5px solid rgba(207, 207, 207, 0.2);
  flex: 0 0 auto;
}

.wrapper {
  max-width: 1500px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  height: 5vh;
}

/* logo样式 */
.brand {
  font-family: "Bebas Neue";
  font-weight: bold;
  font-size: 30px;
  color: white;
  cursor: pointer;
}

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

@media (min-width: 660px) {
  .site-header__wrapper {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.site-header__start {
  width: 100px;
}

.site-header__middle {
  font-size: 18px;
  margin-left: auto;
  margin-right: 10px;
}

.site-header__end {
  width: 200px;
  font-size: 18px;
}

.site-header__end a {
  padding-left: 10px;
}

@media (min-width: 660px) {
  .nav__wrapper {
    display: flex;
  }
}

.header_nav {
  width: 350px;
  height: 38px;
  border-radius: 19px;
  background-color: #1d1e20;
  line-height: 38px;
  text-align: center;
}

.header_nav ul {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.header_nav a {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  color: #737476;
  display: inline;
  cursor: pointer;
}

.header_nav a:hover {
  color: white;
}

.el-button {
  border: 0 !important;
}

.el-button:hover {
  background: #90b2cb !important;
  opacity: 0.6;
  border: 0 !important;
  color: black !important;
}

.el-button:focus {
  color: black !important;
}

.person {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 2vh;
  color: white;
}

.person .person_item {
  margin-left: 10px;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#elButton {
  width: 150px;
}
</style>
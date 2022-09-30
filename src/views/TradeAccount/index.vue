<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="navigation">
          <el-scrollbar max-height="95vh">
            <div style="padding: 12px;">
              <Navcation :navMenu="navMenu" />
              <div class="btn-add-acc">
                <button
                  class="button1 button1-action button1-pill btn-add-acc"
                  @click="addAccount"
                >
                  添加账户
                </button>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import Navcation from "@/components/Navcation/index.vue";
export default {
  name: "TradeAccount",
  setup() {
    const router = useRouter();
    const route = useRoute();
    //配置滚动条
    const scrollbar = reactive({
      height: "95vh",
    });
    //创建store
    const store = useStore();
    //配置导航栏信息
    var navMenu = reactive({
      activeButton: "0",
      styleName: "--ns",
      style: {
        width: "160px",

        navButtonWidth: "120px",
        navButtonHeight: "40px",
        navButtonRadius: "20px 20px 20px 20px", //圆角矩形高度一半
        navButtonBC: "#52565e",
        navButtonFontSize: "16px",
        navButtonFontBC: "white",
        navButtonHoverWidth: "135px",
        navButtonHoverBC: "#285ff3",
        navButtonActiveWidth: "135px",
        navButtonActiveBC: "#285ff3",

        nav1ButtonWidth: "100px",
        nav1ButtonHeight: "30px",
        nav1ButtonRadius: "20px 20px 20px 20px",
        nav1ButtonBC: "#8f8f8c",
        nav1ButtonFontSize: "12px",
        nav1ButtonFontBC: "white",
        nav1ButtonHoverWidth: "100px",
        nav1ButtonHoverBC: "#ff6319",
        nav1ButtonActiveWidth: "100px",
        nav1ButtonActiveBC: "#ff6319",
      },
      navItem: computed(() => {
        var userExs = store.state.exchangeStore.userExchange;
        var result = [];
        for (let index = 0; index < userExs.length; index++) {
          var item = {};
          var userEx = userExs[index];
          item.id = userEx.id;
          item.index = "" + index;
          item.name = userEx.nickName;
          item.logo = "exchangeLogo/" + userEx.exchangeName + ".png";
          item.click = (item) => {
            if (navMenu.activeButton == item.index) {
              navMenu.activeButton = "-1";
            } else {
              navMenu.activeButton = item.index;
            }
            router.push(`/tradeAccount/show/${item.id}`);
          };
          item.childs = [];
          if (userEx.spot) {
            item.childs.push({
              index: "" + index + "-1",
              name: "现货",
              click: (index) => {
                navMenu.activeButton = "" + index + "-1";
                console.log(navMenu.activeButton);
              },
            });
          }
          if (userEx.usdFutures) {
            item.childs.push({
              index: "" + index + "-2",
              name: "U永续",
              click: (index) => {
                navMenu.activeButton = "" + index + "-2";
                console.log(navMenu.activeButton);
              },
            });
          }
          if (userEx.coinFutures) {
            item.childs.push({
              index: "" + index + "-3",
              name: "币永续",
              click: (index) => {
                navMenu.activeButton = "" + index + "-3";
                console.log(navMenu.activeButton);
              },
            });
          }
          if (userEx.options) {
            item.childs.push({
              index: "" + index + "-4",
              name: "期权",
              click: (index) => {
                navMenu.activeButton = "" + index + "-4";
                console.log(navMenu.activeButton);
              },
            });
          }
          result.push(item);
        }
        return result;
      }),
    });

    function addAccount() {
      router.push("/tradeAccount/add");
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
    var exchangeList = computed(() => {
      return store.state.exchangeStore.userExchange;
    });
    onMounted(() => {
      //请求获取该用户拥有的交易所账户
      store.dispatch("exchangeStore/getUserExchange");
    });
    return {
      navMenu,
      scrollbar,
      exchangeList,
      addAccount,
    };
  },
  components: { Navcation },
};
</script>

<style scoped>
.el-menu {
  border: 0 !important;
}

.navigation {
  width: 180px;
  margin-top: 20px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 95vh;
}

.el-main {
  background-color: var(--mainbgcolor);
  padding: 0;
  position: relative;
}

.el-aside {
  width: 180px;
  height: 95vh;
}

.hint {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.exchangeLogo {
  width: 1vw;
  margin: 0;
  margin-right: 5px;
}

.exchangeTitle {
}

.add-acc {
  display: flex;
  justify-content: center;
}

.add-acc-button {
  margin-top: 20px;
  margin-bottom: 20px;
}

.btn-add-acc {
  display: block;
  margin-left: auto;
  margin-right: 0;
  margin-top: 20px;
}
</style>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside"
        ><el-scrollbar :height="scrollbar.height">
          <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :background-color="navigation.backgroundColor"
            :text-color="navigation.textColor"
            :active-text-color="navigation.activeTextColor"
            :default-active="navigation.defaultActive"
            :unique-opened="navigation.uniqueOpened"
            :default-openeds="navigation.defaultOpeneds"
            ref="eLmenuRef"
          >
            <el-sub-menu
              v-for="(item, index) in exchangeList"
              :key="index"
              :index="index"
            >
              <template #title>
                <img
                  class="exchangeLogo"
                  :src="getExchangeLogo(item.exchangeName)"
                />
                <span class="exchangeTitle">{{ item.nickName }}</span>
              </template>
              <el-menu-item :index="index + '-1'" v-if="item.spot"
                >总览</el-menu-item
              >
              <el-menu-item :index="index + '-2'" v-if="item.spot"
                >现货</el-menu-item
              >
              <el-menu-item :index="index + '-3'" v-if="item.usdFutures"
                >U永续</el-menu-item
              >
              <el-menu-item :index="index + '-4'" v-if="item.coinFutures"
                >币本位</el-menu-item
              >
              <el-menu-item :index="index + '-5'" v-if="item.options"
                >期货</el-menu-item
              >
            </el-sub-menu>
            <div class="add-acc">
              <button
                class="
                  button1 button1-glow button1-rounded button1-highlight
                  add-acc-button
                "
                @click="addAccount"
              >
                添加账户
              </button>
            </div>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="el-main">
        <router-view ></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "TradeAccount",
  setup() {
    //配置导航栏信息
    const navigation = reactive({
      backgroundColor:
        document.documentElement.style.getPropertyValue("--mainbgcolor"),
      textColor: "#fff",
      activeTextColor: "#fff234",
      defaultActive: "0-1",
      uniqueOpened: false,
      defaultOpeneds: [0],
    });

    //配置滚动条
    const scrollbar = reactive({
      height: "95vh",
    });

    //创建store
    const store = useStore();
    //创建路由
    const route = useRouter();

    function getExchangeLogo(exchangeName) {
      return require("@/assets/img/exchangeLogo/" + exchangeName + ".png");
    }

    function addAccount() {
      route.push("/tradeAccount/add");
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
      navigation,
      scrollbar,
      exchangeList,
      getExchangeLogo,
      addAccount,
    };
  },
};
</script>

<style scoped>
.el-menu {
  border: 0 !important;
}

.navigation {
  width: 200px;
  display: block;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 95vh;
}

.el-main {
  background-color: var(--mainbgcolor);
  padding: 0;
  position: relative;
}

.aside {
  width: 200px;
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
</style>
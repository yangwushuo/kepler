<template>
  <div class="wrapper_sidBar">
    <c-scrollbar 
    maxHeight="93vh"
    :vBarStyle="{'background-color':'rgba(255, 255, 255, 0.2)'}"
    :vThumbStyle="{'background-color': 'rgba(207, 207, 207, 0.2)'}"
    >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="var(--sideBarColor)"
        text-color="#ffffff"
        active-text-color="var(--sideBarItemActiveFontColor)"
        :default-openeds="openeds"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon
              ><span class="iconfont icon-jiaoyisuo jiaoyisuo"></span
            ></el-icon>
            <span class="title">{{ title }}</span>
          </template>
          <el-sub-menu
            :index="oneItem.id"
            v-for="(oneItem, index) in oneItems"
            :key="oneItem.id"
          >
            <template #title
              ><span class="item">{{ oneItem.name }}</span></template
            >
            <el-menu-item
              class="twoItem"
              :index="twoItem.id"
              v-for="(twoItem, index) in oneItem.twoItems"
              :key="twoItem.id"
              @click="goToRoute(twoItem.route)"
              ><span class="item">{{ twoItem.name }}</span></el-menu-item
            >
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </c-scrollbar>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "SideBar",
  props: ["menuInfo"],
  setup(props) {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const router = useRouter();
    let menuInfo = reactive(props.menuInfo);
    let data = reactive({
      //默认打开的菜单索引
      openeds: ["1"],
    });

    //找出对象中所有以id为变量名
    function findAllIdValue() {
      let ids = [];

      // for (let oneItem of oneItems) {
      //   if (oneItem.id) {
      //     ids.push(oneItem.id);
      //     if (oneItem.twoItems) {
      //       for (let twoItem of oneItem.twoItems) {
      //         ids.push(twoItem.id);
      //       }
      //     }
      //   }
      // }
      ids.unshift("1");
      return ids;
    }

    //指定路由跳转
    function goToRoute(path=''){
      router.push(path);
    }

    //组件加载之前
    onBeforeMount(() => {
      data.openeds = findAllIdValue(menuInfo.oneItems);
    });

    return {
      ...toRefs(data),
      ...menuInfo,
      handleOpen,
      handleClose,
      goToRoute,
    };
  },
};
</script>

<style scoped>
.wrapper_sidBar {
  position: relative;
  min-height: 93vh;
  max-height: 93vh;
  overflow: auto;
  min-width: 13vw;
  width: 13vw;
  border-right: 0.5px solid rgba(207, 207, 207, 0.2);
}

.el-menu-vertical-demo {
  height: 100%;
  width: 100%;
  border-right: none;
}

.item {
  font-size: 16px;
}
.jiaoyisuo {
  font-size: 25px;
}

.title {
  font-size: 20px;
}

.twoItem:hover {
  background-color: var(--sideBarItemHoverColor);
  color: var(--sideBarItemHoverFontColor);
}
</style>
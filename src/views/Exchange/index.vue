<template>
  <div class="wrapper">
    <div class="sideBar">
      <SideBar :menuInfo="menuInfo"></SideBar>
    </div>
    <div class="wrapper_middle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
//侧边栏
import SideBar from "@/components/SideBar";
//常量数据
import { Partten } from "@/partten/index";
export default {
  name: "Exchange",
  components: {
    SideBar,
  },
  setup() {
    //菜单数据  //请求服务器获取菜单栏数据
    let menuInfo = reactive(Partten.exchangeSideBar);
    //数据
    let data = reactive({
      echartsTop: 0,
      echartsBottom: 0,
    });

    //组件加载完毕之前
    onBeforeMount(() => {
      //请求获取菜单列表
    });

    return {
      ...toRefs(data),
      menuInfo,
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: row ;
}
.wrapper_middle {
  width: 87vw;
  height: 93vh;
  display: flex;
  flex-direction: column;
}
.breadcrumb {
}
</style>
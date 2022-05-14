<template>
  <div class="wrapper">
    <div class="sideBar">
      <SideBar :menuInfo="menuInfo"></SideBar>
    </div>
    <div class="echarts">
      <div class="breadcrumb">
        
        <Breadcrumb></Breadcrumb>
      </div>
      <LargeScaleAreaChart></LargeScaleAreaChart>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs, watchEffect } from "vue";
//侧边栏
import SideBar from "@/components/SideBar";
//大数据量面积图
import LargeScaleAreaChart from "@/components/Echarts/LargeScaleAreaChart";
//面包屑
import Breadcrumb from "@/components/Breadcrumb";
//常量数据
import { Partten } from "@/partten/index";
export default {
  name: "Exchange",
  components: {
    SideBar,
    LargeScaleAreaChart,
    Breadcrumb,
  },
  setup() {
    //菜单数据
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
  display: flex;
  height: auto;
}
.echarts {
  width: 100%;
  height: 93vh;
}
</style>
<template>
  <div class="wrapper">
    <div class="sideBar">
      <SideBar :menuInfo="menuInfo"></SideBar>
    </div>
    <div class="echarts">
      <LargeScaleAreaChart></LargeScaleAreaChart>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import SideBar from "@/components/SideBar";
import LargeScaleAreaChart from "@/components/Echarts/LargeScaleAreaChart";
import { Partten } from "@/partten/index";
export default {
  name: "Exchange",
  components: {
    SideBar,
    LargeScaleAreaChart,
  },
  setup() {
    //菜单数据
    let menuInfo = reactive(Partten.exchangeSideBar);

    //组件加载完毕之前
    onBeforeMount(() => {
      //请求获取菜单列表
    });

    return {
      menuInfo,
    };
  },
};
</script>

<style scoped>
.wrapper{
  display: flex;
}

.sideBar{
}

.echarts{
  width: 100%;
  height: 93vh;
}
</style>
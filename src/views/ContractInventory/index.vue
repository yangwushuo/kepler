<template>
  <div class="wrapper_contractInventory">
    <div class="wrapper_contractInventory_top">
      <MoreSelect />
      <Tag />
    </div>
    <LargeScaleAreaChart />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import MoreSelect from "@/components/Select/MoreSelect";
import LargeScaleAreaChart from "@/components/Echarts/LargeScaleAreaChart";
import Tag from "@/components/Tag";

export default {
  name: "ContractInventory",
  components: {
    LargeScaleAreaChart,
    MoreSelect,
    Tag,
  },
  setup() {
    //组件创建完毕后，请求服务器获取默认币中持仓量
    let tokenName = "BTC";

    onMounted(() => {});

    return {};
  },
};
</script>

<style scoped>
.wrapper_contractInventory{
  height: 100%;
  display: flex;
  flex-direction: column;
}

.wrapper_contractInventory_top{
  display: flex;
  flex-direction: row;
  min-height: 6rem;
}
</style>
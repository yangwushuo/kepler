<template>
  <div class="PieChart" ref="PieChart"></div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, ref, toRaw, watch } from "vue";
export default {
  name: "PieChart",
  props: ["serise"],
  setup(props) {
    let PieChart = ref(null);
    //参数
    let option = {
      legend: {
        top: "bottom",
        //文字样式设置
        textStyle: {
          color: "#ffffff",
          fontSize: 14,
        },
        icon: "circle",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true, backgroundColor: "rgba(0, 0, 0, 1)" },
        },
        top: "5%",
        right: "10%",
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" },
          ],
        },
      ],
    };
    let myChart = null;

    watch(
      [() => props.serise],
      () => {
        option.series = toRaw(props.serise);
        //更新图标
        myChart.clear();
        echartsApp();
      },
      {
        deep: true,
      }
    );

    function echartsApp() {
      myChart.setOption(option);
    }

    onMounted(() => {
      myChart = echarts.init(PieChart.value);
      myChart.setOption(option);
    });

    return {
      PieChart,
    };
  },
};
</script>

<style scoped>
.PieChart {
  padding: 2rem 0 2rem 0;
  width: 100%;
  height: 70vh;
}
</style>
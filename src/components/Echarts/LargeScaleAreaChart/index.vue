<template>
  <div class="largeScaleAreaChart" ref="largeScaleAreaChart"></div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
export default {
  name: "LargeScaleAreaChart",
  setup() {
    let largeScaleAreaChart = ref(null);

    onMounted(() => {
      var myChart = echarts.init(largeScaleAreaChart.value);

      let base = +new Date(1968, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let date = [];
      let data = [Math.random() * 300];
      for (let i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      //参数
      var option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "",
        },
        toolbox: {
          feature: {
            dataZoom: {
              //区域缩放
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          //背景网格线
          splitLine: {
            show: false,
          },
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      };

      myChart.setOption(option);
    });

    return {
      largeScaleAreaChart,
    };
  },
};
</script>

<style scoped>
.largeScaleAreaChart {
  width: 100%;
  height: 85%;
}
</style>
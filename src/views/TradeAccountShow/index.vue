<template>
  <el-scrollbar max-height="95vh">
    <div class="wrapper">
      <div style="width: 500px; height: 500px">
        <v-chart
          class="chart"
          :option="option"
          :update-options="{ notMerge: false }"
        />
        <v-chart class="chart" :option="option" />
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import VChart from "vue-echarts";
import * as echarts from "echarts";
import { reactive, ref, watch } from "vue";
export default {
  name: "TradeAccountShow",
  components: {
    "v-chart": VChart,
  },
  props: {
    id: String,
  },
  setup(props) {
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
    const option = reactive({
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        left: "center",
        text: "Large Area Chart",
      },
      toolbox: {
        feature: {
          dataZoom: {
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
    });

    setTimeout(() => {
      option.series[0].areaStyle.color = new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: "rgb(11, 158, 68)",
          },
          {
            offset: 1,
            color: "rgb(255, 70, 131)",
          },
        ]
      );
    }, 5000);

    watch(
      () => props.id,
      () => {
        if (props.id) {
          //请求获取该交易账户所有信息
          console.log("监听到的id:" + props.id);
        }
      },
      {
        immediate: true,
      }
    );

    return { option };
  },
};
</script>

<style scoped>
.wrapper {
  padding: 4px;
  border: 1px red solid;
}
</style>
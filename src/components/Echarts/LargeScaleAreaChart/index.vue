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
        //数据提示框
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        //标题
        title: {
          left: "center",
          text: "",
        },
        //图列控制显示
        legend: {
          type: 'plain', //普通图列
          top: '5%',
          //文字样式设置
          textStyle: {
            color: '#ffffff',
            fontSize: 14,
          },
          icon: 'circle'
        },
        //工具栏
        toolbox: {
          feature: {
            //区域缩放
            dataZoom: {
              show: true,
              yAxisIndex: "none",
            },
            //图片保存
            saveAsImage: {},
          },
          right: '10%',
        },
        //X轴
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        //y轴
        yAxis: {
          type: "value",
          //背景网格线
          splitLine: {
            show: false,
          },
          boundaryGap: [0, "100%"],
        },
        //底部时间标记
        dataZoom: [
          {
            type: "slider",
            //时间尺起始位置
            start: 0,
            //时间尺结束位置
            end: 100,
            //时间尺的背景颜色
            backgroundColor: 'rgba(176,176,176,0.1)',
            //时间尺选中区域背景颜色
            fillerColor: 'rgba(34, 194, 241, 0.2)',
            //时间尺选中区域顶部手柄颜色
            moveHandleStyle: {
              color: 'rgba(255,255,255, 0.3)'
            },
            //时间尺选中区域文字的颜色
            textStyle: {
              color: 'rgba(255,255,255, 0.7)'
            },
            //数据过滤方式
            filterMode: 'filter',
            //触发视图的刷新频率 单位ms
            throttle: 80,
            //开启时间尺刷选模式
            brushSelect: true,
            //刷选时样式设置
            brushStyle: {
              color: 'rgba(27, 167, 132, 0.7)',
            },
            //时间轴拖动选定区域左右标记
            emphasis:{
              handleStyle:{
                color: 'rgba(27, 167, 132, 1)'
              }
            }
          },
        ],
        //数据区域
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
        //水印设置
        graphic: [
          {
            //文本水印
            type: "text",
            silent: true,
            //z
            z: 100,
            //自动居中
            left: "center",
            top: "middle",
            //样式
            style: {
              fill: "#ffffff10", //颜色ffffff白色，不透明度80%
              //文字内容
              text: ["Kepler"].join(""),
              fontSize: 100,
            },
          },
        ],
      };

      myChart.setOption(option);
      //触发图标行为 例如图数据区域缩放 dataZoom
      myChart.dispatchAction({
        type: "takeGlobalCursor",
        key: "dataZoomSelect",
        dataZoomSelectActive: true,
      });
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
  height: 80%;
}
</style>
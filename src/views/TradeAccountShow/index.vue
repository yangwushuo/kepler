<template>
  <el-scrollbar max-height="95vh">
    <div style="height: auto; padding: 20px;display: flex;">
      <div style="margin-left: 5%">
        <el-radio-group
          v-model="timeRadioSet.default"
          :text-color="timeRadioSet.textColor"
          :size="timeRadioSet.size"
          :fill="timeRadioSet.fill"
          @change="timeRadioSet.change"
        >
          <el-radio-button
            v-for="(time, index) in timeRadioSet.values"
            :key="index"
            :label="time"
            >{{ time }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div>
        <el-date-picker
          popper-class="date-picker"
          v-model="datePickerSet.value"
          :type="datePickerSet.type"
          unlink-panels
          :range-separator="datePickerSet.rangeSeparator"
          :start-placeholder="datePickerSet.startPlaceholder"
          :end-placeholder="datePickerSet.endPlaceholder"
          :size="datePickerSet.size"
          :format="datePickerSet.format"
        />
      </div>
    </div>
    <div class="wrapper">
      <div style="width: 100%; height: 600px">
        <v-chart class="chart" :option="tradeHistoryOption" />
      </div>
    </div>
    <div class="wrapper2">
      <el-scrollbar ref="optionScrollbar" style="height: 150px">
        <div class="option-wrapper">
          <div
            class="option"
            :class="{ 'option-active': option.name == activeOption }"
            v-for="option in optionSet"
            :key="option.id"
            :id="option.name"
            @click="setActiveOption(option.name)"
          >
            <img class="logo" :src="getCoinLogo(option.name)" />
            <div class="option-info">
              <div class="title">
                <span>{{ option.name }}</span>
              </div>
              <div>
                <span>数量:{{ option.num }}</span>
              </div>
              <div>
                <span>购买:{{ option.num }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="wrapper3">
      <div style="width: 100%; height: 600px">
        <v-chart class="chart" :option="pieOption" />
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import VChart from "vue-echarts";
import * as echarts from "echarts";
import { reactive, watch, ref } from "vue";
import analyze from "rgbaster";
export default {
  name: "TradeAccountShow",
  components: {
    "v-chart": VChart,
  },
  props: {
    id: String,
  },
  setup(props) {
    var activeOption = ref(null);

    var timeRadioSet = reactive({
      default: "1d",
      values: ["1m", "5m", "15m", "30m", "1h", "4h", "12h", "1d"],
      size: "default",
      textColor: "#fff",
      fill: "#285ff3",
      change: () => {
        console.log("Hello");
      },
    });

    var datePickerSet = reactive({
      value: [new Date(), new Date()],
      size: 'default',
      type: 'daterange',
      format: 'YYYY-MM-DD',
      defaultTime:"",
      prefixIcon: "",
      clearIcon: "",
      rangeSeparator: 'To',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      shortcuts:null,
    })

    var optionSet = reactive([
      {
        id: 1,
        name: "BTC",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 2,
        name: "LTC",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 3,
        name: "BCH",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 5,
        name: "DOT",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 6,
        name: "XMR",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 7,
        name: "BNB",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 8,
        name: "USDT",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 9,
        name: "USDC",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 10,
        name: "DAI",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 12,
        name: "ETH",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 13,
        name: "SOL",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 14,
        name: "TRX",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 15,
        name: "UNI",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 16,
        name: "WBTC",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 17,
        name: "XLM",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 18,
        name: "XRP",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 19,
        name: "LINK",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
      {
        id: 20,
        name: "SHIB",
        num: 132,
        time: "2020-1-1 11:20:11",
      },
    ]);

    let base = +new Date(1968, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let date = [];
    let data = [Math.random() * 300];
    for (let i = 1; i < 2000; i++) {
      var now = new Date((base += oneDay));
      date.push(
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
      );
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    var tradeHistoryOption = reactive({
      grid: {
        show: false,
        left: "5%",
        right: "5%",
      },
      //浮层
      tooltip: {
        show: true,
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "15%"];
        },
        backgroundColor: "rgba(255, 250, 250,1)",
        textStyle: {
          fontFamily: "dreamH",
        },
        axisPointer: {
          type: "shadow", //指示器
          axios: "auto",
          //坐标轴指示器的文本标签。
          label: {
            show: true,
            precision: 2, //表示保留两位小数。
          },
        },
        showContent: true, //是否显示提示框浮层
        alwaysShowContent: false,
        renderMode: "html",
        className: "",
        transitionDuration: 0,
      },
      //标题
      title: {
        show: true,
        left: "center",
        top: "top",
        text: "交易纪录",
        textStyle: {
          color: "#caccd1",
          fontFamily: "dreamH",
          fontSize: "22",
        },
      },
      //组件
      toolbox: {
        show: true,
        left: "auto",
        right: "5%", //组件靠右
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
        iconStyle: {
          color: "none",
          borderColor: "#fff", //图形的描边颜色
        },
      },
      xAxis: {
        show: true,
        type: "category",
        boundaryGap: false,
        data: date,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        show: true,
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: false,
        },
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
            color: "#00aeff",
          },
          //标记
          markPoint: {
            symbolSize: 18,
            symbol: "pin",
            animation: false,
            data: [
              {
                name: "Buy",
                itemStyle: {
                  color: "#7ac70c",
                },
                value: "B",
                symbolOffset: [0, -1],
                coord: ["1969/1/1", 274],
                label: {
                  show: true,
                  fontSize: 8,
                  offset: [0, -0],
                },
              },
              {
                name: "Sell",
                symbolRotate: 180,
                itemStyle: {
                  color: "#e53838",
                },
                value: "S",
                symbolOffset: [0, 1],
                coord: ["1969/1/1", 274],
                label: {
                  show: true,
                  fontSize: 8,
                  offset: [0, 4],
                },
              },
            ],
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#0077c8",
              },
              {
                offset: 1,
                color: "rgba(0,0,0,0)",
              },
            ]),
          },
          data: data,
        },
      ],
    });

    var pieOption = reactive({
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 25,
            borderColor: "rgba(255,255,255,0)",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            color: "#fff",
            fontSize: 16,
            formatter: "{b}: {c}({d}%)",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            smooth: 0.3,
            length: 30,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });

    function getCoinLogo(name) {
      getCoinColor(name);
      return require("@/assets/img/coinLogo/" + name + ".png");
    }

    function setActiveOption(name) {
      activeOption.value = name;
    }

    async function getCoinColor(name) {
      var result = await analyze(
        require("@/assets/img/coinLogo/" + name + ".png")
      );
      document.getElementById(name).style.backgroundColor =
        result[result.length - 9].color;
    }

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

    return {
      tradeHistoryOption,
      timeRadioSet,
      datePickerSet,
      optionSet,
      getCoinLogo,
      getCoinColor,
      activeOption,
      setActiveOption,
      pieOption,

    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  /* border: 1px red solid; */
}

.wrapper2 {
  width: auto;
  margin: 1rem 5%;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}

.el-radio-button {
  background-color: "#6d6e70" !important;
}

.option-wrapper {
  width: auto;
}

.option-wrapper .option {
  display: inline-block;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  margin: 10px;
  transition: 0.2s;
}

.option-wrapper .option:hover {
  transform: scale(1.1);
}

.option-wrapper .option-active {
  outline: 3px solid #ff9933;
  transform: scale(1.1);
}

.option-wrapper .logo {
  width: 40px;
  border-radius: 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.option-wrapper .option-info {
  width: 100%;
  padding: 4px;
}

.option-wrapper .option-info .title {
  font-size: 16px;
}

.date-picker{
  height: 50px;
  background-color: red !important;
}
</style>
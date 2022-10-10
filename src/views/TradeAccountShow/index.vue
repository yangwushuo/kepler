<template>
  <div>
    <div class="toolbar">
      <div>
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
      <div style="margin-left: 1%">
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
          :editable="datePickerSet.editable"
          :shortcuts="datePickerSet.shortcuts"
          @change="datePickerSet.change"
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="wrapper-aside">
        <el-scrollbar ref="optionScrollbar" max-height="800px">
          <div class="option-wrapper">
            <div
              class="option"
              :class="{ 'option-active': option.name == activeOption.name }"
              v-for="option in optionSet"
              :key="option.id"
              :id="option.name"
              @click="setActiveOption(option)"
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
      <div class="wrapper-main">
        <div style="width: 100%; height: 400px">
          <v-chart class="chart" :option="tradeHistoryOption" />
        </div>
        <div style="width: 100%; height: 400px">
          <v-chart class="chart" :option="assetHistoryOption" />
        </div>
      </div>
    </div>
    <div class="wrapper2">
      <div style="width: 100%; height: 500px">
        <v-chart class="chart" :option="gaugeOption" />
      </div>
      <div style="width: 100%; height: 500px">
        <v-chart class="chart" :option="pieOption" />
      </div>
      <div style="width: 100%; height: 500px">
        <v-chart class="chart" :option="barOption" />
      </div>
    </div>
    <div class="wrapper3">
      <div class="wrapper3-radio">
        <el-radio-group
          v-model="tradeRadioSet.default"
          :text-color="tradeRadioSet.textColor"
          :size="tradeRadioSet.size"
          :fill="tradeRadioSet.fill"
          @change="tradeRadioSet.change"
        >
          <el-radio-button
            v-for="(value, index) in tradeRadioSet.values"
            :key="index"
            :label="value.label"
            >{{ value.text }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div>
        <el-table
          class="trade-table"
          :data="tradeTableSet.data"
          :height="tradeTableSet.height"
          :max-height="tradeTableSet.maxHeight"
          :stripe="tradeTableSet.stripe"
          :border="tradeTableSet.border"
          :size="tradeTableSet.size"
          :fit="tradeTableSet.fit"
          :row-style="tradeTableSet.rowStyle"
          :header-cell-style="tradeTableSet.headerCellStyle"
          :show-header="tradeTableSet.showHeader"
          :highlight-current-row="tradeTableSet.highlightCurrentRow"
          :current-row-key="tradeTableSet.currentRowKey"
          :empty-text="tradeTableSet.emptyText"
          :default-expand-all="tradeTableSet.defaultExpandAll"
          :tooltip-effect="tradeTableSet.tooltipEffect"
          :show-summary="tradeTableSet.showSummary"
          :table-layout="tradeTableSet.tableLayout"
          :flexible="tradeTableSet.flexible"
        >
          <el-table-column
            v-for="(column, index) in tradeTableSet.columnSet"
            :key="index"
            :type="column.type"
            :index="column.index"
            :label="column.label"
            :prop="column.prop"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :resizable="column.resizable"
            :align="column.align"
          >
            <template v-if="column.prop == 'name'" #default="scope">
              <div class="trade-table-row">
                <img
                  :src="getCoinLogo(scope.row.name)"
                  style="width: 18px; height: 18px; margin-right: 2px"
                />
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
            <template v-if="column.prop == 'operation'" #default="scope">
              <div class="trade-table-row">
                <span
                  v-if="scope.row.operation == 'Buy'"
                  class="material-symbols-outlined trade-table-row-buy"
                  >trending_up</span
                >
                <span
                  v-if="scope.row.operation != 'Buy'"
                  class="material-symbols-outlined trade-table-row-sell"
                  >trending_down</span
                >
                <span>{{ scope.row.operation }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import VChart from "vue-echarts";
import * as echarts from "echarts";
import { computed, reactive, watch } from "vue";
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

    var activeOption = reactive({
      id: '',
      name: '',
    });

    var timeRadioSet = reactive({
      default: "1d",
      values: ["1m", "5m", "15m", "30m", "1h", "4h", "12h", "1d"],
      size: "default",
      textColor: "#fff",
      fill: "#285ff3",
      change: () => {
        console.log(timeRadioSet.default);
      },
    });

    var tradeRadioSet = reactive({
      default: "current",
      values: [
        {
          label: "all",
          text: "所有记录",
        },
        {
          label: "current",
          text: "当前记录",
        },
      ],
      size: "small",
      textColor: "#fff",
      fill: "#f85a40",
      change: () => {
        console.log(tradeRadioSet.default);
      },
    });

    var end = new Date();
    var start = new Date();
    start.setMonth(start.getMonth() - 1);
    var datePickerSet = reactive({
      value: [start, end],
      size: "default",
      type: "daterange",
      format: "YYYY-MM-DD",
      prefixIcon: "",
      clearIcon: "",
      rangeSeparator: "To",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      shortcuts: [
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 3);
            return [start, end];
          },
        },
        {
          text: "最近六个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            return [start, end];
          },
        },
      ],
      editable: false,
      change: (newDaterange) => {
        console.log(newDaterange);
      },
    });

    var tradeTableSet = reactive({
      height: "200px",
      maxHeight: "200px",
      stripe: false, //斑马纹
      border: false, //网格
      size: "small",
      fit: true, //宽度自撑开
      showHeader: true, //显示表头
      highlightCurrentRow: true,
      rowStyle: {
        backgroundColor: "#fff",
        color: "#222",
        fontSize: "14px",
        fontWeight: "2000",
      },
      headerCellStyle: {
        backgroundColor: "#285ff3",
        color: "#fff",
        fontSize: "16px",
        fontFamily: "dreamH",
      },
      currentRowKey: "1",
      emptyText: "空",
      defaultExpandAll: false,
      tooltipEffect: "dark",
      showSummary: false,
      tableLayout: "fixed",
      flexible: false,
      columnSet: [
        {
          label: "id",
          prop: "id",
          minWidth: 150,
          fixed: false,
          resizable: true,
          align: "center",
        },
        {
          label: "币名",
          prop: "name",
          minWidth: 150,
          fixed: false,
          resizable: true,
          align: "center",
        },
        {
          label: "操作",
          prop: "operation",
          minWidth: 150,
          fixed: false,
          resizable: true,
          align: "center",
        },
        {
          label: "数量",
          prop: "quant",
          minWidth: 150,
          fixed: false,
          resizable: true,
          align: "center",
        },
        {
          label: "时间",
          prop: "time",
          minWidth: 150,
          fixed: false,
          resizable: true,
          align: "center",
        },
      ],
      data: [
        {
          id: 1,
          name: "BTC",
          operation: "Buy",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
        {
          id: 1,
          name: "BTC",
          operation: "Buy",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
        {
          id: 1,
          name: "BTC",
          operation: "Buy",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
        {
          id: 1,
          name: "BTC",
          operation: "Buy",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
        {
          id: 1,
          name: "BTC",
          operation: "Buy",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
        {
          id: 1,
          name: "BTC",
          operation: "Buy",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
        {
          id: 1,
          name: "BTC",
          operation: "Sell",
          quant: 1345,
          time: "2020-1-1 22:00:22",
        },
      ],
    });

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
      //水印
      graphic: {
        type: "text",
        left: "center",
        top: "middle",
        silent: true,
        style: {
          text: ["QINGPU", "BTC", "1m"].join(":"),
          font: 'bolder 3rem "Microsoft YaHei", sans-serif',
          fill: "rgba(159,159,163,0.2)",
        },
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
        text: "交易轨迹",
        textStyle: {
          color: "#c4dff6",
          fontSize: 22,
        },
        left: "center",
        top: 20,
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
          saveAsImage: {
            backgroundColor: "#24292E",
          },
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
          end: 40,
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
          // itemStyle: {
          //   color: "#00aeff",
          // },
          lineStyle: {
            width: 1, //折线宽度
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

    var assetHistoryOption = reactive({
      grid: {
        show: false,
        left: "5%",
        right: "5%",
      },
      //水印
      graphic: {
        type: "text",
        left: "center",
        top: "middle",
        silent: true,
        style: {
          text: ["QINGPU", "Assets"].join(":"),
          font: 'bolder 3rem "Microsoft YaHei", sans-serif',
          fill: "rgba(159,159,163,0.2)",
        },
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
        text: "资产轨迹",
        textStyle: {
          color: "#c4dff6",
          fontSize: 22,
        },
        left: "center",
        top: 20,
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
          saveAsImage: {
            backgroundColor: "#24292E",
          },
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
          end: 40,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      series: [
        {
          name: "资金",
          type: "line",
          symbol: "none",
          sampling: "lttb",
          // itemStyle: {
          //   color: "#00aeff",
          // },
          lineStyle: {
            width: 1, //折线宽度
            color: "#01cd74",
          },
          //标记
          // markPoint: {
          //   symbolSize: 18,
          //   symbol: "pin",
          //   animation: false,
          //   data: [
          //     {
          //       name: "Buy",
          //       itemStyle: {
          //         color: "#7ac70c",
          //       },
          //       value: "B",
          //       symbolOffset: [0, -1],
          //       coord: ["1969/1/1", 274],
          //       label: {
          //         show: true,
          //         fontSize: 8,
          //         offset: [0, -0],
          //       },
          //     },
          //     {
          //       name: "Sell",
          //       symbolRotate: 180,
          //       itemStyle: {
          //         color: "#e53838",
          //       },
          //       value: "S",
          //       symbolOffset: [0, 1],
          //       coord: ["1969/1/1", 274],
          //       label: {
          //         show: true,
          //         fontSize: 8,
          //         offset: [0, 4],
          //       },
          //     },
          //   ],
          // },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#00c16e",
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
      title: {
        show: true,
        text: "仓位占比",
        textStyle: {
          color: "#c4dff6",
          fontSize: 22,
        },
        left: "center",
        top: "",
      },
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
            borderRadius: 5,
            borderColor: "rgba(255,255,255,0)",
            borderWidth: 2,
          },
          label: {
            show: true,
            color: "#fff",
            fontSize: 16,
            formatter: "{b} {d}%",
            position: "outer",
            alignTo: "edge",
            margin: 0,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            smooth: 0.3,
            length: 10,
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

    var gaugeOption = reactive({
      title: {
        show: true,
        text: "当前仓位使用",
        textStyle: {
          color: "#c4dff6",
          fontSize: 22,
        },
        left: "center",
        top: "",
      },
      series: [
        {
          type: "gauge",
          //实际进度条
          progress: {
            show: true,
            width: 18,
            roundCap: true,
            itemStyle: {
              color: "#8ec06c",
            },
          },
          //全进度条
          axisLine: {
            roundCap: true,
            lineStyle: {
              color: [
                [0, "#9f9fa3"],
                [1, "#9f9fa3"],
              ],
              width: 18,
              opacity: 0.2,
            },
          },
          axisTick: {
            show: false,
          },
          //刻度线
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: "#999",
            },
          },
          //刻度
          axisLabel: {
            distance: 25,
            color: "#999",
            fontSize: 20,
          },
          pointer: {
            show: true,
            itemStyle: {
              color: "#3369e7",
            },
          },
          //指针固定点
          anchor: {
            show: true,
            showAbove: true,
            size: 20,
            itemStyle: {
              color: "#fff",
              borderColor: "#3369e7",
              borderWidth: 8,
            },
          },
          title: {
            show: false,
          },
          detail: {
            color: "#fff",
            valueAnimation: true,
            fontSize: 50,
            offsetCenter: [0, "50%"],
          },
          data: [
            {
              value: 70,
            },
          ],
        },
      ],
    });

    var barOption = reactive({
      title: {
        show: true,
        text: "日交易频率",
        textStyle: {
          color: "#c4dff6",
          fontSize: 22,
        },
        left: "center",
        top: "",
      },
      xAxis: {
        type: "category",
        data: (() => {
          var data = [];
          for (let i = 0; i < 30; i++) {
            data.push(i);
          }
          return data;
        })(),
      },
      yAxis: {
        type: "value",
        //不显示网格线
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: (() => {
            var data = [];
            for (let i = 0; i < 30; i++) {
              data.push(Math.random() * 1000);
            }
            return data;
          })(),
          type: "bar",
          //柱条宽度
          barMaxWidth: 10,
          //显示样式
          itemStyle: {
            color: "#3369e7",
            borderWidth: 0,
            borderRadius: [45, 45, 0, 0],
          },
          //高亮显示
          emphasis: {
            disabled: false,
            label: {
              show: true,
              color: "#fff", //必须声明color不然会有默认描边
              fontSize: 22,
              position: "top",
            },
            itemStyle: {
              color: "#8ec06c",
              //阴影
              shadowColor: "#fff",
              shadowBlur: 6,
            },
          },
        },
      ],
    });

    function getCoinLogo(name) {
      if (name) {
        getCoinColor(name);
        return require("@/assets/img/coinLogo/" + name + ".png");
      }
    }

    function setActiveOption(option) {
      activeOption.id=option.id;
      activeOption.name=option.name;
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

    watch(()=> activeOption.name,(n)=>{
      console.log(n);
    })

    return {
      tradeHistoryOption,
      assetHistoryOption,
      timeRadioSet,
      tradeRadioSet,
      datePickerSet,
      tradeTableSet,
      optionSet,
      getCoinLogo,
      getCoinColor,
      activeOption,
      setActiveOption,
      pieOption,
      gaugeOption,
      barOption,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  /* border: 1px red solid; */
}

.wrapper-aside {
  width: 157px;
  height: 800px;
  /* margin: 1rem 5%; */
  overflow: hidden;
  white-space: nowrap;
  /* display: flex; */
}

.wrapper-main {
  flex-grow: 1;
}

.wrapper2 {
  margin-top: 20px;
  display: flex;
}

.wrapper3 {
  margin: 0 5%;
}

.wrapper3 .wrapper3-radio {
  padding: 10px 10px 10px 0px;
}

.el-radio-button {
  background-color: "#6d6e70" !important;
}

.option-wrapper {
  width: auto;
}

.option-wrapper .option {
  /* display: inline-block; */
  width: 120px;
  height: 120px;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  margin: 14px;
  transition: 0.2s;
  cursor: pointer;
}

.option-wrapper .option:hover {
  transform: scale(1.05);
}

.option-wrapper .option-active {
  outline: 3px solid #ff9933;
  transform: scale(1.05);
}

.option-wrapper .logo {
  cursor: pointer;
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

.toolbar {
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
}

.toolbar >>> .el-range-editor.el-input__inner {
  height: 32px;
  background-color: white;
  outline: #285ff3 1px solid;
}

.trade-table {
}

.trade-table .trade-table-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.trade-table .trade-table-row .trade-table-row-buy {
  color: #49a942;
}

.trade-table .trade-table-row .trade-table-row-sell {
  color: #e4002b;
}

</style>
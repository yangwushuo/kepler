<template>
  <div class="wrapper_contractInventory">
    <div class="wrapper_contractInventory_top">
      <KSelect
        :multiple="exchangeSelect.multiple"
        :placeholder="exchangeSelect.placeholder"
        :title="exchangeSelect.title"
        :change="exchangeSelect.change"
        :value="exchangeSelect.value"
        :options="exchangeSelect.options"
      />
      <KSelect
        :multiple="tokenSelect.multiple"
        :placeholder="tokenSelect.placeholder"
        :title="tokenSelect.title"
        :change="tokenSelect.change"
        :value="tokenSelect.value"
        :options="tokenSelect.options"
      />
    </div>
    <LargeScaleAreaChart :date="date" :serise="serise" />
    <PieChart/>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRaw, watch } from "vue";
import { useStore } from "vuex";
import Select from "@/components/Select";
import LargeScaleAreaChart from "@/components/Echarts/LargeScaleAreaChart";
import { Partten } from "@/partten";
import PieChart from "@/components/Echarts/PieChart";

export default {
  name: "ContractInventory",
  components: {
    LargeScaleAreaChart,
    KSelect: Select,
    PieChart
},
  setup() {
    let store = useStore();
    //日期
    let date = ref([]);
    //持仓数据
    let data = ref([]);
    //serise
    let serise = ref([]);

    //交易所选择器配置
    let exchangeSelect = reactive({
      title: "交易所",
      multiple: true,
      placeholder: "交易所",
      value: ["Binance", "FTX"],
      //通过vuex获取到数据
      options: Partten.exchangeSelect,
      change: function (changeValue) {
        exchangeSelect.value = changeValue;
      },
    });

    //token选择器配置
    let tokenSelect = reactive({
      title: "币种",
      multiple: false,
      placeholder: "币种",
      value: "BTC",
      options: Partten.tokenSelect,
      change: function(changeValue) {
        tokenSelect.value = changeValue;
      },
    });

    //加工图表的Series数据
    function seriseFactory() {
      // toRaw(props.dat).openInterest
      serise.value = [];
      for (let exchangeProxy of data.value) {
        let exchange = toRaw(exchangeProxy);
        let option = {
          name: exchange.exchangeName,
          type: "line",
          symbol: "none",
          sampling: "lttb",
          //平滑
          smooth: true,
          itemStyle: {
            color: Partten.tokeneChartsColor[exchange.exchangeName],
          },
          // areaStyle: {
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: "rgb(255, 148, 68)",
          //     },
          //     {
          //       offset: 1,
          //       color: "rgb(255, 70, 131)",
          //     },
          //   ]),
          // },
          data: exchange.openInterest,
        };
        serise.value.push(option);
      }
    }

    //监测exchange select选择器变化
    watch(
      () => exchangeSelect.value,
      () => {
        //监测到交易所选项发生改变时，过滤没有选中的交易所持仓量数据
        data.value = toRaw(
          store.getters["contractInventory/getDetailExchangeContractInventor"](
            exchangeSelect.value
          )
        );
        //调用serise工厂加工显示数据
        seriseFactory();
      },
      {
        deep: true,
      }
    );

    //token select选择器变化
    watch(
      () => tokenSelect.value,
      (newV) => {
        //监测到选中的token发生变化则派发请求获取指定的币种持仓量
        store
          .dispatch("contractInventory/getContractInventory", newV)
          .then(() => {
            //时间
            date.value = toRaw(
              store.getters["contractInventory/getContractInventorDate"]
            );
            //持仓
            data.value = toRaw(
              store.getters[
                "contractInventory/getDetailExchangeContractInventor"
              ](exchangeSelect.value)
            );
          })
          .catch((error) => {
            console.log(error.message);
          });

        //调用serise工厂加工显示数据
        seriseFactory();
      },
      {
        deep: true,
      }
    );

    //组件加载完毕 获取具体交易所的币种持仓量
    onMounted(() => {
      //派发请求，获取某一币种的持仓数据
      store
        .dispatch("contractInventory/getContractInventory", tokenSelect.value)
        .then(() => {
          //获取持仓数据的日期
          date.value = toRaw(
            store.getters["contractInventory/getContractInventorDate"]
          );
          //获取持仓具体数据(经过getter筛选过的交易所)
          data.value = toRaw(
            store.getters[
              "contractInventory/getDetailExchangeContractInventor"
            ](exchangeSelect.value)
          );

          seriseFactory();
        })
        .catch((error) => {
          console.log(error.message);
        });
    });

    return {
      exchangeSelect,
      tokenSelect,
      date,
      serise,
    };
  },
};
</script>

<style scoped>
.wrapper_contractInventory {
  height: auto;
  display: flex;
  flex-direction: column;
}

.wrapper_contractInventory_top {
  display: flex;
  flex-direction: row;
  min-height: 6rem;
}
</style>
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
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRaw, watch } from "vue";
import { useStore } from "vuex";
import Select from "@/components/Select";
import LargeScaleAreaChart from "@/components/Echarts/LargeScaleAreaChart";
import { randomColor } from "@/utils";

export default {
  name: "ContractInventory",
  components: {
    LargeScaleAreaChart,
    KSelect: Select,
  },
  setup() {
    let store = useStore();

    //交易所选择器列表
    let exchangeOptions = ref([]);
    //币种选择器列表
    let tokenOptions = ref([]);
    //日期
    let date = ref([]);
    //显示数据
    let data = ref([]);
    //serise数据
    let serise = ref([]);

    //组件创建完毕后，请求服务器获取默认币中持仓量
    let exchangeSelect = reactive({
      title: "交易所",
      multiple: true,
      placeholder: "交易所",
      value: ["Binance", "FTX"],
      //通过vuex获取到数据
      options: exchangeOptions,
      change: exchangeChange,
    });

    //exchange select 组件的回调函数 列表发生改变时候触发
    function exchangeChange(changeValue) {
      exchangeSelect.value = changeValue;
    }

    let tokenSelect = reactive({
      title: "币种",
      multiple: false,
      placeholder: "币种",
      value: "BTC",
      options: tokenOptions,
      change: tokenChange,
    });

    //token select 组件的回调函数 列表发生改变时候触发
    function tokenChange(changeValue) {
      tokenSelect.value = changeValue;
    }

    //加工图表的Series数据
    function seriseFactory() {
        // toRaw(props.dat).openInterest
      for (let exchangeProxy of data) {
        let exchange = toRaw(exchangeProxy);
        console.log("exchange", exchange);
        let option = {
          name: exchange.exchangeName,
          type: "line",
          symbol: "none",
          sampling: "lttb",
          //平滑
          smooth: true,
          itemStyle: {
            color: randomColor(),
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
      return serise;
    }

    //监测exchange select选择器变化
    watch(
      () => exchangeSelect.value,
      () => {
        //监测到交易所选项发生改变时，过滤没有选中的交易所持仓量数据
        //传送给echarts图表该展示那些交易所
        data.value = toRaw(
          store.getters["contractInventory/getDetailExchangeContractInventor"](
            exchangeSelect.value
          )
        );

        //调用serise工厂加工显示数据
        serise.value = seriseFactory();
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
            date.value =
              store.getters["contractInventory/getContractInventorDate"];
            data.value = store.getters[
              "contractInventory/getDetailExchangeContractInventor"
            ](exchangeSelect.value);
          })
          .catch((error) => {
            console.log(error.message);
          });

        //store持仓量数据已经被更新
        //调用serise工厂加工显示数据
        serise.value = seriseFactory();
      },
      {
        deep: true,
      }
    );

    //组件加载完毕 获取具体交易所的币种持仓量
    onMounted(() => {
      //派发请求，获取exchange select选择器的列表
      store
        .dispatch("contractInventory/getExchangeSelect")
        .then(() => {
          exchangeOptions.value = toRaw(
            store.state.contractInventory.exchangeSelect
          );
        })
        .catch((error) => {
          console.log(error.message);
        });

      //派发请求，获取token select选择器的列表
      store
        .dispatch("contractInventory/getTokenSelect")
        .then(() => {
          tokenOptions.value = toRaw(store.state.contractInventory.tokenSelect);
        })
        .catch((error) => {
          console.log(error.message);
        });

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
          console.log("测试结果", date.value, data.value);
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
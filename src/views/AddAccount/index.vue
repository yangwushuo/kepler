<template>
  <div class="addAccount">
    <div class="exchange">
      <ul class="nav-tabs">
        <li
          v-for="exchange in exchanges"
          :key="exchange.id"
          :class="{ 'nav-item': true, active: itemActive == exchange.id }"
          @click="changeItemActive(exchange.id)"
        >
          <img class="logo" :src="getExchangeLogo(exchange.exchangeName)" />
          <span>{{ exchange.exchangeName }}</span>
        </li>
      </ul>
    </div>
    <div class="form">
      <AccountForm :itemActive="itemActive" />
    </div>
  </div>  
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import AccountForm from "@/components/AccountForm/index.vue";     
import { useStore } from "vuex";
export default {
  name: "AddAccount",
  setup() {
    const store = useStore();

    //活动索引
    var itemActive = ref(null);

    //获取logo图片
    function getExchangeLogo(exchangeName) {
      if (exchangeName) {
        return require("@/assets/img/exchangeLogo/" + exchangeName + ".png");
      }
    }

    //改变活动索引
    function changeItemActive(exchangeId) {
      itemActive.value = exchangeId;
    }

    //根据活动索引获取交易所名
    function getExchangeName(){
      var result = store.getters['exchangeStore/getExchangeNameById'](itemActive.value);
      return result;
    }

    //交易所列表
    var exchanges = computed(() => {
      return store.state.exchangeStore.allExchange;
    });

    //监听交易所列表
    watch(
      () => store.state.exchangeStore.allExchange,
      (newValue) => {
        //如果交易所列表不为零设置活动索引为第一个交易所
        if (newValue.length != 0) {
          itemActive.value = newValue[0].id;
        }
      },
      {
        immediate:true,
      }
    );

    onMounted(() => {
      //请求获取所有交易所
      store.dispatch("exchangeStore/getAllExchange");
    });

    return {
      itemActive,
      exchanges,
      getExchangeLogo,
      changeItemActive,
      getExchangeName,
    };
  },
  components: {
    AccountForm,
  },
};
</script>
<style scoped>
.addAccount {
  margin-top: 50px;
  margin-left: 50px;
}

.nav-tabs {
  width: 400px;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 5px;
}
.nav-item {
  width: 100px;
  background: #fff;
  color: #24252e;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  padding: 8px;
  text-align: center;
  display: inline;
  margin: 0 8px 0 0;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
}
.nav-item:hover,
.nav-item.active {
  color: #000;
  box-shadow: rgb(255, 255, 0) 0px 0px 6px;
}

.nav-item span {
  text-align: center;
  line-height: 20px;
}

.logo {
  width: 18px;
}
</style>

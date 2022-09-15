<template>
  <div class="eai-wrapper">
    <div class="exchange">
      <ul class="nav-tabs">
        <li
          v-for="ea in exchangeAccountInfo"
          :key="ea.id"
          :class="{
            'nav-item': true,
            'nav-item-active': itemActive == ea.id,
          }"
          @click="changeItemActive(ea.id)"
        >
          <img class="logo" :src="getExchangeLogo(ea.exchangeName)" />
          <span>{{ea.nickName}}</span>
        </li>
      </ul>
    </div>
    <ExchangeAccountInfo :eai=eai />
    <div class="trand_btn">
      <el-button type="primary" @click="saveInfo">保存</el-button>
      <el-button type="info" @click="resetInfo">重置</el-button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElNotification } from "element-plus";
import { statusCode, timeStampToFormat } from "@/utils";
import { useStore } from "vuex";
import ExchangeAccountInfo from "@/components/ExchangeAccountInfo/index.vue";
import { reqUpExchangeAccountPermissions } from '@/api';
export default {
  name: "TrandAccountInfo",
  setup() {
    const store = useStore();
    var itemActive = ref(1);
    var eai = reactive({
      exchangeAccountId: "",
      exchangeName: "",
      nickName: "",
      createTime: "", 
      verCodeFollow: false,
      verCode: "",
      online: false,
      moneyShow: false,
      tradeHistory: false,
      option: false,
    });
    var exchangeAccountInfo = computed(() => {
      var res = store.state.exchangeStore.userExchange;
      return res;
    });
    watch(()=>store.state.exchangeStore.userExchange,(n)=>{
      if (n.length > 0) { 
        itemActive.value = n[0].id;
        eai.exchangeAccountId = n[0].id;
        eai.exchangeName = n[0].exchangeName;
        eai.nickName = n[0].nickName;
        eai.createTime = getFormatTime(n[0].createTime);
        eai.verCodeFollow = n[0].eap.verCodeFollow;
        eai.verCode = n[0].eap.verCode;
        eai.online = n[0].eap.online;
        eai.moneyShow = n[0].eap.moneyShow;
        eai.tradeHistory = n[0].eap.tradeHistory;
        eai.option = n[0].eap.option;
      }
    },{
      immediate:true,
      deep: true
    })
    watch(()=>eai.verCodeFollow,(n)=>{
      if(!n){
        eai.verCode = "";
      }
    })
    function getFormatTime(timestamp) {
      return timeStampToFormat(timestamp * 1000);
    }
    function switchStatus() {
      console.log(eai);
    }
    function changeItemActive(id) {
      itemActive.value = id;
      for (var ex of store.state.exchangeStore.userExchange) {
        if (ex.id == id) {
          eai.exchangeAccountId = ex.id;
          eai.exchangeName = ex.exchangeName;
          eai.nickName = ex.nickName;
          eai.createTime = getFormatTime(ex.createTime);
          eai.verCodeFollow = ex.eap.verCodeFollow;
          eai.verCode = ex.eap.verCode;
          eai.online = ex.eap.online;
          eai.moneyShow = ex.eap.moneyShow;
          eai.tradeHistory = ex.eap.tradeHistory;
          eai.option = ex.eap.option;
        }
      }
    }
    //获取logo图片
    function getExchangeLogo(exchangeName) {
      if (exchangeName) {
        return require("@/assets/img/exchangeLogo/" + exchangeName + ".png");
      }
    }
    function saveInfo(){
      reqUpExchangeAccountPermissions(eai)
        .then((res)=>{
          console.log(res)
          if(res.code == statusCode.SUCCESS.code){
            notic("修改交易账户成功",null,"success")
            //重新获取交易所账户信息
            store.dispatch('exchangeStore/getUserExchange')
          }else{
            notic("修改交易账户失败",null,"error")
          }
        })
        .catch((err)=>{
          notic("修改交易账户失败",null,"error")
        })
    }
    function resetInfo(){
      changeItemActive(itemActive.value);
    }
    function notic(title, message, type, duration=2000, offset = 100) {
      return ElNotification({
        title: title,
        message: message,
        offset: offset,
        type: type,
        duration: duration,
      });
    }
    onMounted(() => {
      //请求获取该用户拥有的交易所账户
      store.dispatch("exchangeStore/getUserExchange");
    });
    return {
      exchangeAccountInfo,
      eai,
      itemActive,
      switchStatus,
      getFormatTime,
      changeItemActive,
      getExchangeLogo,
      saveInfo,
      resetInfo,
    };
  },
  components: { ExchangeAccountInfo },
};
</script>

<style scoped>
.eai-wrapper {
  margin: 40px auto;
  width: 700px;
}

.eai-wrapper .trand_btn {
  padding-top: 40px;
  display: flex;
  justify-content: center;
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
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
}
.nav-item:hover,
.nav-item-active {
  color: #000;
  box-shadow: #ed7902 0px 0px 6px;
}

.nav-item span {
  text-align: center;
  line-height: 20px;
}

.logo {
  width: 18px;
}
</style>
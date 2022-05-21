import {reqContractInventory, reqExchangeSelect, reqTokenSelect} from '@/api/index'

const actions = {
  async getContractInventory({commit},token){
    let result = await reqContractInventory(token);
    if(result.code == 200){
      commit('GETCONTRACTINVENTORY',result.data);
    }else{
      return Promise.reject(new Error("request contractInventory failed"))
    }
  },
  async getExchangeSelect({commit}){
    let result = await reqExchangeSelect();
    if(result.code == 200){
      commit('GETEXCHANGESELECT',result.data);
    }else{
      return Promise.reject(new Error("request exchange select failed"))
    }
  },
  async getTokenSelect({commit}){
    let result = await reqTokenSelect();
    if(result.code == 200){
      commit('GETTOKENSELECT',result.data);
    }else{
      return Promise.reject(new Error("request token select failed"))
    }
  },
};

const mutations = {
  GETCONTRACTINVENTORY(state, contractInventory){
    state.contractInventory = contractInventory.data;
  },
  GETEXCHANGESELECT(state, exchangeSelect){
    state.exchangeSelect = exchangeSelect.options;
  },
  GETTOKENSELECT(state, tokenSelect){
    state.tokenSelect = tokenSelect.options;
  },
}

const state = {
  //持仓量
  contractInventory: {},
  //交易所选择框
  exchangeSelect: [],
  //币种选择框
  tokenSelect: [],
}

const getters = {
  //获取指定交易所的持仓量
  getDetailExchangeContractInventor(state){
    return (exchangeName) => {
      let result = [];
      for (let exchange of state.contractInventory.openInterest) {
        if(exchangeName.indexOf(exchange.exchangeName) != -1){
          result.push(exchange)
        }
      }
      return result;
    };
  },
  //获取日期
  getContractInventorDate(state){
    return state.contractInventory.time;
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
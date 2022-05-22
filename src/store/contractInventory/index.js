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
};

const mutations = {
  GETCONTRACTINVENTORY(state, contractInventory){
    state.contractInventory = contractInventory.data;
  },
}

const state = {
  //持仓量
  contractInventory: {},
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
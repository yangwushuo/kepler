import {
  reqAllExchange,
  reqUserExchange
} from '@/api/index'
import { statusCode } from '@/utils';
import { toRaw } from 'vue';

const actions = {
  async getUserExchange({
    commit
  }, params) {
    var res = await reqUserExchange(params);
    if(res.code == statusCode.SUCCESS.code){
      commit('GETUSEREXCHANGE',res.data);
    }else{
      return Promise.reject(new Error("get user exchange failed"));
    }
  },
  async getAllExchange({
    commit
  }, params){
    var res = await reqAllExchange(params);
    if(res.code == statusCode.SUCCESS.code){
      commit('GETALLEXCHANGE',res.data);
    }else{
      return Promise.reject(new Error("get all exchange failed"));
    }
  }
};

const mutations = {
  GETUSEREXCHANGE(state, userExchange){
    state.userExchange = userExchange;
  },
  GETALLEXCHANGE(state, allExchange){
    state.allExchange = allExchange;
  }
}

const state = {
  userExchange: [],
  allExchange: [],
}

const getters = {
  getExchangeNameById : (state)=>{
    return function(id) {
      for (var exchange of state.allExchange) {
        if (exchange.id == id) {
          return exchange.exchangeName;
        }
      }
    }
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
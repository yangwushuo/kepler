import {
  reqUserInfo,
  reqUserPortraitImage
} from '@/api/index'
import {
  statusCode
} from '@/utils';

const actions = {
  async getUserInfo({
    commit
  }, params) {
    var res = await reqUserInfo(params);
    if (res.code == statusCode.SUCCESS.code) {
      commit('GETUSERINFO', res.data);
    } else {
      return Promise.reject(new Error("get user info err"));
    }
  },
  async getUserPortraitImage({
    commit
  }, params) {
    var res = await reqUserPortraitImage(params);
    if (res.code == statusCode.SUCCESS.code) {
      commit('GETUSERPORTRAITIMAGE', res.data);
    } else {
      return Promise.reject(new Error("get user portrait err"));
    }
  }
};

const mutations = {
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  GETUSERPORTRAITIMAGE(state, userPortraitImage) {
    state.userPortraitImage = userPortraitImage;
  }
}

const state = {
  //用户信息
  userInfo: {},
  //用户头像信息
  userPortraitImage: "",
}

const getters = {

}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
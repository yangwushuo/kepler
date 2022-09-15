import { createStore } from "vuex";
import userInfoStore from "./userInfoStore";
import exchangeStore from "./exchangeStore";

export default createStore({
  modules: {
    userInfoStore,
    exchangeStore
  }
})
import { createStore } from "vuex";
import userInfoStore from "./userInfoStore";

export default createStore({
  modules: {
    userInfoStore
  }
})
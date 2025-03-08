import Vue from "vue";
import Vuex from "vuex";
import state from "./defaultState";
import mutations from "./mutations";
// import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  // actions,
  // modules: {
  //   login,
  // },
});

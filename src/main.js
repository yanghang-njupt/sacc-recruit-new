import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "/public/iconfont/iconfont.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 原型上挂载axios， 所有组件都可以通过this.$http来请求
// Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import axios from "axios";
import store from "@/store/index.js";
import { Message } from "element-ui";

var instance = axios.create({
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 请求头添加token
    if (store.state.UserToken !== "") {
      config.headers.Authorization = store.state.UserToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求出错";
          break;
        case 401:
          Message.warning({
            message: "授权失败，请重新登录",
          });
          store.commit("LOGIN_OUT");
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          return;
        case 403:
          err.message = "拒绝访问";
          break;
        case 404:
          err.message = "请求错误,未找到该资源";
          break;
        case 500:
          err.message = "服务器端出错";
          break;
      }
    } else {
      err.message = "连接服务器失败";
    }
    Message.error({
      message: err.message,
    });
    return Promise.reject(err.response);
  }
);

export default instance;

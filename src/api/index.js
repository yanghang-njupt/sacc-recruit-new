import axios from "../utils/http";
// import store from "../store";

// export function fetchPermission() {
//   return axios.get("/api/permission?user=" + store.state.UserToken);
// }

// export function login(user) {
//   return axios.get("/api/login?user=" + user);
// }

export const apis = axios.create({
  timeout: 15000,
  baseURL: "http://47.113.218.236:9001",
});

apis.interceptors.request.use((config) => {
  if (localStorage.getItem("token") !== "") {
    config.headers["token"] = localStorage.getItem("token");
  } else {
    localStorage.clear("token");
  }
  return config;
});

apis.interceptors.response.use((res) => {
  if (!res.data.success) {
    switch (res.data.errCode) {
      case 5000:
        alert("登陆失败");
        break;
    }
  }
  return res;
});

/**
 * 登录接口 post请求
 * @param stuId    账号
 * @param password 密码
 * @return axios   对象
 */
export const login = (stuId, password) => {
  // const data = new FormData();
  // data.append("stuId", stuId);
  // // get请求不可以用这种表单提交的方式，在body中添加参数来请求
  // // 只能直接拼串在地址栏的后面
  // data.append("password", password);
  return apis({
    method: "post",
    url: "/login",
    data: {
      stuId: stuId,
      password: password,
    },
  });
};

/***注册接口 post 请求
 * @params stuId 账号
 * @params userName 用户名
 * @params password 密码
 * @return axios 对象
 */
export const register = (stuId, userName, password) => {
  return apis({
    method: "post",
    url: "/register",
    data: {
      stuId: stuId,
      stuName: userName,
      password: password,
    },
  });
};

/***修改密码接口 post 请求
 * @params stuId 账号
 * @params oldpassword 旧密码
 * @params password 密码
 * @return axios 对象
 */
export const changePassword = (stuId, oldpassword, newpassword) => {
  let data = new FormData();
  data.append("stuId", stuId);
  data.append("oldPassword", oldpassword);
  data.append("newPassword", newpassword);
  return apis({
    method: "post",
    url: "/updatePassword",
    data,
  });
};

/*** 获取比赛列表
 * @params token 用户token
 * @return axios 对象
 */
export const getCompetetionList = () => {
  return apis({
    method: "get",
    url: "/getUnit",
    data: {},
  });
};

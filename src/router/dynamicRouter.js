// 引入所有的需要权限判断的界面
// 普通用户界面
const UserHome = () => import("../views/user/indexPage.vue");
const UserAnswer = () => import("../views/user/AnswerPage.vue");
const UserSubmit = () => import("../views/user/SubmitPage.vue");
// 管理员界面
const AdminHome = () => import("../views/admin/indexPage.vue");
const AdminSetting = () => import("../views/admin/settingPage.vue");
// 阅卷人界面
const OperatorHome = () => import("../views/operator/indexPage.vue");
const OperatorAnswer = () => import("../views/operator/answerDetail.vue");
const OperatorGrade = () => import("../views/operator/gradePage.vue");

const dynamicRoutes = [
  {
    path: "/userhome",
    component: UserHome,
    name: "user-home",
    meta: {
      role: "0",
      requiresAuth: true,
    },
    children: [
      {
        path: "list/:unit",
        name: "user-answer",
        component: UserAnswer,
        meta: {
          role: "0",
        },
      },
      {
        path: "success",
        name: "user-submit",
        component: UserSubmit,
        meta: {
          role: "0",
        },
      },
    ],
  },
  {
    path: "/operatorhome",
    name: "operator-home",
    component: OperatorHome,
    meta: {
      role: "1",
      equiresAuth: true,
    },
    children: [
      {
        path: "detail/:unit",
        name: "operator-detail",
        component: OperatorAnswer,
        meta: {
          role: "1",
        },
      },
      {
        path: "answer/:unit/:stuId",
        name: "operator-grade",
        component: OperatorGrade,
        meta: {
          role: "1",
        },
      },
    ],
  },
  {
    path: "/adminhome",
    name: "admin-home",
    component: AdminHome,
    meta: {
      role: "2",
      equiresAuth: true,
    },
    children: [
      {
        path: "setting/:unit",
        name: "admin-setting",
        component: AdminSetting,
        meta: {
          role: "2",
        },
      },
    ],
  },
  { path: "*", redirect: "/login", hidden: true }, // 配置重定向404页面
];
export default dynamicRoutes;

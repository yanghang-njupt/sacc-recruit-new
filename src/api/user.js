import { apis } from ".";

/**
 * 用户获取题目列表
 * @param unit 比赛id
 * @return axios 对象
 */
export const getCompetetionListDetail = (unitId) => {
  unitId = Number(unitId);
  return apis({
    method: "get",
    url: "/normal/getList?unitId=" + unitId,
    data: {},
  });
};

/**
 * 用户提交答案
 * @param 用户答案
 * @return axios 对象
 */
export const userAnswerSubmit = (array, unitId) => {
  return apis({
    method: "post",
    url: "/normal/commitAnswer",
    data: array,
    params: {
      unitId: unitId,
    },
  });
};

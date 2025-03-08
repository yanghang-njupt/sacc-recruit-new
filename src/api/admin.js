import { apis } from ".";

/**
 * 管理员新建比赛
 * @params {name: 比赛名称, start: 开始时间, end: 结束时间, description: 比赛描述}
 * @return axios对象
 */

export const newNuit = (data) => {
  return apis({
    method: "post",
    url: "/root/newUnit",
    data: {
      unitName: data.title,
      startTime: data.start,
      endTime: data.end,
      unitDescription: data.description,
    },
  });
};

/**
 * 管理员上传题目(王书彬说他要手打题目)
 * @params Object{name: 比赛名称, start: 开始时间, end: 结束时间}
 * @return axios对象
 */

/**
 * 管理员导入阅卷人
 * @params file 文件
 * @return axios对象
 */
export const getOperator = (file) => {
  let data = new FormData();
  data.append("fileList", file);
  return apis({
    method: "post",
    url: "/root/importReader",
    data,
  });
};

/**
 * 添加阅卷人
 * @param stuId 学号
 * @return axios对象
 */
export const updateOperator = (stuId) => {
  return apis({
    method: "post",
    url: "/root/updateRole",
    params: { stuId },
  });
};

/**
 * 修改阅卷人分组
 * @param stuId 学号
 * @param group 分组
 * @return axios对象
 */
export const setOperatorGroup = (stuId, group) => {
  return apis({
    method: "post",
    url: "/root/updateGroup",
    params: {
      stuId: stuId,
      group: group,
    },
  });
};

/**
 * 获取阅卷人的信息
 * @param unit 比赛id
 * @return axios对象
 */
export const getOperatorInfo = (unitId) => {
  unitId = Number(unitId);
  return apis({
    method: "get",
    url: "/root/getJudger",
    params: { unitId: unitId },
  });
};

/**
 * 上传题目
 * @param FormData
 * {
 * title 题目内容
 * type  题目类型
 * scoring 题目分数
 * A  选项
 * B  选项
 * C  选项
 * D  选项
 * imgLists 图片地址
 * }
 * @param unit 比赛Id
 * @return axios对象
 */
export const upLoadNewTitle = (unit, list) => {
  let data = new FormData();
  data.append("title", list.title);
  data.append("scoring", Number(list.scoring));
  if (list.type === "单选") data.append("type", 0);
  else if (list.type === "多选") data.append("type", 1);
  else if (list.type === "简答") data.append("type", 2);
  else {
    this.$message.error("无效题目类型,请重试");
    location.reload();
  }
  data.append("type", list.type);
  data.append("A", list.A);
  data.append("B", list.B);
  data.append("C", list.C);
  data.append("D", list.D);
  data.append("imgLists", list.imgLists);
  return apis({
    method: "post",
    url: "/root/uploadProblem",
    params: { unit: unit },
    data: data,
  });
};

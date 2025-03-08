<template>
  <div class="gradePage">
    <div class="answer-content">
      <div class="content-body">
        <div class="top-head">
          <p class="body-title">{{ unit_name }}</p>
          <span class="user-info"
            ><p style="color: #2a82e4; margin-left: 2vw">答题人：</p>
            <p>{{ this.$route.params.stuId }}</p></span
          >
          <div class="space"></div>
          <el-link
            class="backBtn"
            type="primary"
            @click="back"
            :underline="false"
            >返回</el-link
          >
          <el-link
            class="nextBtn"
            type="primary"
            @click="next"
            :underline="false"
            >下一份</el-link
          >
        </div>
        <div class="description" v-html="unit_description">
          <!-- {{ content }} -->
        </div>
        <div class="title-body">
          <div
            class="user-title"
            v-for="(item, index) in problem_list"
            :key="item.id"
          >
            <div class="title-head">
              <div>{{ index }}.</div>
              <el-tag class="tag">{{ item.problemType }}</el-tag>
              <div v-html="item.problemDesription"></div>
            </div>
            <div class="title-content">
              <div class="radioBox" v-if="item.problemType === '单选'">
                <label
                  ><input
                    type="radio"
                    :name="item.id"
                    v-model="item.value"
                    value="A"
                    disabled
                  />&nbsp;{{ item.optionA }}</label
                >
                <label
                  ><input
                    type="radio"
                    :name="item.id"
                    v-model="item.value"
                    value="B"
                    disabled
                  />&nbsp;{{ item.optionB }}</label
                >
                <label
                  ><input
                    type="radio"
                    :name="item.id"
                    v-model="item.value"
                    value="C"
                    disabled
                  />&nbsp;{{ item.optionC }}</label
                >
                <label
                  ><input
                    type="radio"
                    :name="item.id"
                    v-model="item.value"
                    value="D"
                    disabled
                  />&nbsp;{{ item.optionD }}</label
                >
              </div>
              <div class="checkBox" v-else-if="item.problemType === '多选'">
                <label
                  ><input
                    type="checkbox"
                    :name="item.id"
                    v-model="item.value"
                    value="A"
                    disabled
                  />&nbsp;{{ item.optionA }}</label
                >
                <label
                  ><input
                    type="checkbox"
                    :name="item.id"
                    v-model="item.value"
                    value="B"
                    disabled
                  />&nbsp;{{ item.optionB }}</label
                ><label
                  ><input
                    type="checkbox"
                    :name="item.id"
                    v-model="item.value"
                    value="C"
                    disabled
                  />&nbsp;{{ item.optionC }}</label
                >
                <label
                  ><input
                    type="checkbox"
                    :name="item.id"
                    v-model="item.value"
                    value="D"
                    disabled
                  />&nbsp;{{ item.optionD }}</label
                >
              </div>
              <div class="inputBox" v-else-if="item.problemType === '简答'">
                <el-input
                  class="input"
                  type="textarea"
                  :rows="4"
                  v-model="item.value"
                  placeholder="在此输入你的答案"
                  disabled
                />
              </div>
              <div class="img" v-if="item.pictureUrl">
                <img
                  :src="item.pictureUrl"
                  alt="图片"
                  style="height: 35vh; object-fit: contain; text-align: left"
                />
              </div>
            </div>
            <div class="title-score">
              <p>分数：</p>
              <input
                class="score-input"
                v-model="item.score"
                type="number"
                placeholder="请输入得分"
              />
            </div>
          </div>
        </div>
        <div class="title-footer">
          <el-button
            type="primary"
            class="btn"
            @click="submitAnswer"
            cursor:pointer
            >提交批改</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { operatorAnswer, getNextStuId, getOneDetail } from "../../api/operator";

export default {
  name: "grade-page",
  data() {
    return {
      problem_list: [],
      unit_name: "",
      unit_description: "",
      scoreInput: [],
      nextStuId: "",
    };
  },
  methods: {
    // 提交批改
    submitAnswer() {
      this.scoreInput = [];
      for (let item of this.listObj) {
        this.scoreInput.push({
          id: Number(item.id),
          score: Number(item.score),
        });
      }
      operatorAnswer(this.scoreInput).then((res) => {
        // console.log(res.data);
        if (res.data.success === "true") {
          // console.log(this.$route.params);
          getNextStuId(this.$route.params.stuId).then((res) => {
            if (res.data.data === null || "") {
              this.$message.success("这是最后一份, 已批改完");
            } else {
              this.$message.success("批改成功,自动跳转下一份...");
              this.$router.push(
                `/operatorhome/answer/${this.$router.currentRoute.params.unit}/${res.data.data}`
              );
              location.reload();
              getOneDetail(
                this.$route.params.unit,
                this.$route.params.stuId
              ).then((res) => {
                console.log(res.data);
                const listObj = res.data.data.DataOfOne;
                listObj.forEach((item) => {
                  item.imgUrl = JSON.stringify(item.imgUrl);
                  item.title = item.title.replace(/\r\n/g, "<br />");
                  item.title = item.title.replace(/\r/g, "&nbsp;&nbsp;");
                  // if (item.imgUrl !== null)
                  // item.imgUrl = item.imgUrl.split("|");
                  console.log(item.imgUrl);
                  if (item.type === 0) {
                    item.type = "单选";
                    item.value = item.content;
                  } else if (item.type === 1) {
                    item.type = "多选";
                    item.value = [];
                    for (let i in item.content) {
                      item.value.push(item.content[i]);
                    }
                  } else {
                    item.type = "简答";
                    item.value = item.content;
                  }
                });
                this.title = res.data.data.title;
                this.content = res.data.data.content;
                this.listObj = listObj;
              });
            }
          });
        } else {
          this.$message({
            message: res.data.data,
            type: "warning",
          });
        }
      });
    },
    // 返回
    back() {
      this.$router.go(-1);
      // location.reload();
    },
    // 下一份
    next() {
      getNextStuId(this.$route.params.stuId).then((res) => {
        console.log(res.data, "nextstuId");
        if (res.data.data === "null" || "") {
          this.$message.success("这是最后一份, 已批改完");
        } else {
          this.$router.push(
            `/operatorhome/answer/${this.$router.currentRoute.params.unit}/${res.data.data}`
          );
          location.reload();
        }
      });
    },
  },
  mounted() {
    // console.log(this.$route);
    // 调用获取某次答题情况的借口
    if (localStorage.getItem("role") === "1") {
      getOneDetail(this.$route.params.unit_id, this.$route.params.stuId).then(
        (res) => {
          if (res.data.data === "null") {
            this.$router.back(-1);
            this.$message.warning("该学号不存在");
          } else {
            console.log(res.data);
            const problem_list = res.data.data.problem_list;
            problem_list.forEach((item) => {
              if (item.pictureUrl !== null) {
                item.pictureUrl += "|";
                item.pictureUrl = item.pictureUrl.split("|");
              }
              if (item.problemType === 0) {
                item.problemType = "单选";
                item.value = item.content;
              } else if (item.problemType === 1) {
                item.problem_type = "多选";
                item.value = [];
                for (let i in item.content) {
                  item.value.push(item.content[i]);
                }
              } else {
                item.problem_type = "简答";
                item.value = item.content;
              }
            });
            this.unit_name = res.data.data.unit_name;
            this.unit_description = res.data.data.unit_description;
            this.problem_list = problem_list;
          }
        }
      );
    } else {
      this.$router.back();
    }
  },
};
</script>

<style scoped>
.gradePage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.answer-content {
  width: 70vw;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 1.4vh;
}

.top-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.content-body {
  padding: 4vh 5vh;
}

.body-title {
  font-size: 3.3vh;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(33, 32, 32, 1);
}

.description {
  font-size: 1.4vh;
  font-weight: 400;
  letter-spacing: 0px;
  color: rgba(0, 0, 0, 0.65);
}

.title-content {
  padding-bottom: 2vh;
  border-style: dashed;
  border: 0px;
  border-bottom: 2px dashed;
  border-color: rgb(221, 221, 221);
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.title-body {
  margin-top: 3vh;
  background: rgba(245, 245, 245, 1);
  border-radius: 0.8vh;
  padding: 2vh 2vw;
}

.title-head {
  font-size: 2.2vh;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 2vh 0;
}

.title-content {
  margin-bottom: 2vh;
}

.space {
  margin: auto;
}

.backBtn {
  margin-right: 1vw;
}

.tag {
  margin: 0.3vh 0.3vw;
  border-radius: 2vh;
  height: 2.6vh;
  line-height: 2.5vh;
  font-size: 0.01vw;
  text-align: center;
  background-color: #2487f7;
  color: #fff;
}

.el-textarea__inner {
  background-color: rgb(228, 228, 228);
  outline: none;
  border-radius: 0.8vw;
}

.input {
  font-size: 0.8vw;
  color: #000;
}

.radioBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.8vh;
}

.checkBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.8vh;
}

input {
  margin: 0.9vh 0;
}

/* input框获得焦点取消placeholder样式 */
input:focus::-webkit-input-placeholder {
  color: transparent;
}

.title-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btn {
  width: 7vw;
  margin: 4vh 2vw 0 2vw;
  font-size: 0.8vw;
}

.title-score {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 7vh;
  background: rgba(229, 229, 229, 1);
  border-radius: 0.7vh;
  padding: 0 1.5vw;
  box-sizing: border-box;
}

.score-input {
  background-color: rgb(131, 131, 131);
  outline-style: none;
  height: 3vh;
  width: 7vw;
  border: none;
  color: rgb(174, 9, 9);
  font-size: 2vh;
  padding-left: 0.7vw;
  border-radius: 0.4vh;
  caret-color: black;
}

/* 设置placeholder的字体样式 */
.score-input::-webkit-input-placeholder {
  color: #fff;
}
</style>
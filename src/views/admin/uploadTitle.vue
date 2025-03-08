<template>
  <div class="uploadPage">
    <router-view></router-view>
    <div class="answer-content">
      <div class="content-body">
        <div class="top-head">
          <p class="body-title">{{ title }}</p>
          <el-link
            class="backBtn"
            type="primary"
            :underline="false"
            @click="back"
            >返回</el-link
          >
        </div>
        <div class="description">
          <p v-html="problemDescription"></p>
          <!-- &nbsp;&nbsp;&nbsp;&nbsp;{{ description }} -->
        </div>
        <div class="title-body">
          <div class="user-title" v-for="item in listObj" :key="item.id">
            <div class="title-head">
              <div>{{ item.id }}.</div>
              <el-tag class="tag">{{ item.type }}</el-tag>
              <div v-html="item.title"></div>
            </div>
            <div class="title-content">
              <div class="radioBox" v-if="item.type === '单选'">
                <label
                  ><input
                    type="radio"
                    v-model="item.value"
                    :name="item.id"
                    value="A"
                  />&nbsp;{{ item.A }}</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="item.value"
                    :name="item.id"
                    value="B"
                  />&nbsp;{{ item.B }}</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="item.value"
                    :name="item.id"
                    value="C"
                  />&nbsp;{{ item.C }}</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="item.value"
                    :name="item.id"
                    value="D"
                  />&nbsp;{{ item.D }}</label
                >
              </div>
              <div class="checkBox" v-else-if="item.type === '多选'">
                <label
                  ><input
                    type="checkbox"
                    v-model="item.value"
                    :name="item.id"
                    value="A"
                  />&nbsp;{{ item.A }}</label
                >
                <label
                  ><input
                    type="checkbox"
                    v-model="item.value"
                    value="B"
                  />&nbsp;{{ item.B }}</label
                ><label
                  ><input
                    type="checkbox"
                    v-model="item.value"
                    value="C"
                  />&nbsp;{{ item.C }}</label
                >
                <label
                  ><input
                    type="checkbox"
                    v-model="item.value"
                    value="D"
                  />&nbsp;{{ item.D }}</label
                >
              </div>
              <div class="img" v-if="item.imgUrl">
                <div v-for="(i, index) in item.imgUrl" :key="index">
                  <img
                    :src="i"
                    alt="图片"
                    style="height: 35vh; object-fit: contain; text-align: left"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
              class="title-footer"
              style="margin-bottom: 2vh"
              v-if="item.id === listObj.length"
            >
              <el-upload
                class="upload"
                accept=".jpg,.jpeg,.png"
                ref="fileUpload"
                action=""
                :headers="headerObj"
                :limit="1"
                :http-request="handleRequest"
                :on-success="successLoad"
              >
                <el-button type="primary" style="height: 40px"
                  >上传图片</el-button
                >
              </el-upload>
              <el-button
                type="danger"
                @click="submitTitle"
                style="margin-left: 2vw; height: 40px"
                >上传题目</el-button
              >
            </div> -->
        <div class="title-footer" style="margin-top: 2vh">
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
            style="width: 10vw; height: 5vh"
            >上传题目</el-button
          >
        </div>
      </div>
      <!-- <div
            class="newTitle"
            style="font-size: 4vh; font-weight: 800"
            @click="newTitle"
          >
            
          </div> -->

      <el-dialog
        title="新建题目"
        :visible.sync="dialogFormVisible"
        @click="newTitle"
      >
        <el-form :model="form">
          <el-form-item
            label="题目"
            :label-width="formLabelWidth"
            :rules="rules"
            prop="titleContent"
          >
            <el-input
              type="textarea"
              :row="2"
              v-model="form.title"
              autocomplete="off"
            ></el-input>
            <p v-html="markdown"></p>
          </el-form-item>
          <el-form-item
            label="题目类型"
            :label-width="formLabelWidth"
            :rules="rules"
            prop="titleType"
          >
            <el-select v-model="form.type" placeholder="题目类型">
              <el-option label="单选" value="单选"></el-option>
              <el-option label="多选" value="多选"></el-option>
              <el-option label="简答" value="简答"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="题目分数"
            :label-width="formLabelWidth"
            :rules="rules"
            prop="titleScore"
          >
            <el-input-number
              v-model="form.scoring"
              @change="handleChange"
              :min="1"
              :max="10"
              label="题目分数"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="form.type !== '简答'"
            label="A"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.A"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item
            v-if="form.type !== '简答'"
            label="B"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.B"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item
            v-if="form.type !== '简答'"
            label="C"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.C"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item
            v-if="form.type !== '简答'"
            label="D"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.D" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否上传图片" :label-width="formLabelWidth">
            <div
              style="
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 1vh;
              "
            >
              <el-radio v-model="form.isLoad" label="是">是</el-radio>
              <el-radio v-model="form.isLoad" label="否">否</el-radio>
            </div>
          </el-form-item>
        </el-form>
        <div v-if="form.isLoad === '否'" slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible = false"
            style="margin-right: 1vw"
            >取 消</el-button
          >
          <el-button type="primary" @click="submitNewTitle">确 定</el-button>
        </div>
        <div v-else slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible = false"
            style="margin-right: 1vw"
            >取 消</el-button
          >
          <el-upload
            class="upload"
            accept=".jpg,.jpeg,.png"
            ref="fileUpload"
            action=""
            :headers="headerObj"
            :limit="1"
            :http-request="handleRequest"
            :on-success="successLoad"
          >
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定(含图片)</el-button
            >
          </el-upload>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { upLoadNewTitle } from "../../api/admin";
import { getCompetetionListDetail } from "../../api/user";
// import MarkdownIt from "markdown-it";
export default {
  name: "admin-upload",
  data() {
    return {
      title: "",
      description: "",
      listObj: [],
      answer: [],
      headerObj: {
        token: localStorage.getItem("token"),
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        type: "单选",
        scoring: 1,
        A: "",
        B: "",
        C: "",
        D: "",
        isLoad: "否",
        imgLists: null,
      },
      formLabelWidth: "120px",
      rules: {
        titleContent: {
          require: true,
          message: "请输入题目内容",
          trigger: "blur",
        },
        titleType: {
          require: true,
          message: "请输入题目类型",
          trigger: "blur",
        },
        titleScore: {
          require: true,
          message: "请输入题目分数",
          trigger: "blur",
        },
      },
    };
  },
  // computed: {
  //   markdown() {
  //     const md = MarkdownIt();
  //     const result = md.render(this.form.title);
  //     return result;
  //   },
  // },
  methods: {
    back() {
      this.$router.push("/adminhome");
      location.reload();
    },
    newTitle() {
      this.form = {
        title: "",
        type: "单选",
        scoring: 1,
        A: "",
        B: "",
        C: "",
        D: "",
        isLoad: "否",
        imgLists: null,
      };
    },
    // 上传文件成功的回调
    successLoad() {
      console.log("上传文件成功");
    },
    // 处理上传事件,覆盖默认上传事件
    handleRequest(params) {
      this.form.imgLists = params.file;
      upLoadNewTitle(this.$route.params.unit, this.form).then((res) => {
        if (res.data.success === "true") {
          this.$message.success("上传成功");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          this.$message.error("上传失败,请重试");
        }
      });
    },
    // 上传题目
    submitNewTitle() {
      if (this.form.title === "") {
        this.$message.warning("请输入题目内容");
      } else if (
        this.form.type !== "简答" &&
        (this.form.A === "" ||
          this.form.B === "" ||
          this.form.C === "" ||
          this.form.D === "")
      ) {
        this.$message.warning("请输入选项内容");
      } else {
        upLoadNewTitle(this.$route.params.unit, this.form).then((res) => {
          if (res.data.success === "true") {
            this.$message.success("上传成功");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            this.$message.error("上传失败,请重试");
          }
        });
        this.dialogFormVisible = false;
      }
    },
    sendFile() {
      this.$refs.fileUpload.submit();
    },
  },
  mounted() {
    getCompetetionListDetail(this.$router.currentRoute.params.unit).then(
      (res) => {
        const dataObj = res.data.data.listObj;
        dataObj.forEach((item) => {
          item.title = item.title.replace(/\r\n/g, "<br />");
          item.title = item.title.replace(/\r/g, "&nbsp;&nbsp;");
          if (item.imgUrl !== null) {
            item.imgUrl = item.imgUrl.split("|");
          }
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
        this.description = res.data.data.description;
        this.listObj = dataObj;
      }
    );
    if (location.href.indexOf("#reload") !== -1) {
      location.href = location.href + "#reload";
      location.reload();
    }
  },
};
</script>

<style scoped>
.uploadPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3vh;
}
.answer-content {
  width: 60vw;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 1.4vh;
}
.top-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.content-body {
  padding: 3vh 5vh;
}
.body-title {
  font-size: 3.3vh;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(33, 32, 32, 1);
}
.description {
  font-size: 1.6vh;
  font-weight: 400;
  letter-spacing: 0px;
  white-space: pre-wrap;
  color: rgba(0, 0, 0, 0.65);
}
.user-title {
  border-style: dashed;
  border: 0px;
  border-bottom: 2px dashed;
  border-color: rgb(221, 221, 221);
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
  font-size: 1vw;
  color: #000;
}
.el-textarea__inner::-webkit-input-placeholder {
  color: #000;
  font-size: 1vw;
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
label .el-input {
  margin-top: 2vh;
}
label {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  flex-wrap: nowrap;
}
form {
  margin-top: 2vh;
}
.dialog-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>
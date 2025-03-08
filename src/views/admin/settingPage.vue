<template>
  <div id="settingPage">
    <div class="detail-body">
      <div class="body-head">
        <p class="body-title">{{ unit_name }}</p>
        <el-link class="backBtn" type="primary" :underline="false" @click="back"
          >返回</el-link
        >
      </div>
      <div class="body-main">
        <el-table height="80vh" :data="judger_list" style="width: 100%">
          <el-table-column prop="judgerId" label="阅卷人学号"> </el-table-column>
          <el-table-column prop="finishedCorrectNum" label="批改情况"> </el-table-column>
          <el-table-column prop="grouped" label="设置分组">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.grouped"
                allow-create
                @change="changeValue($event, scope.row.judgerId)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" key="slot">
            <template>
              <el-button
                size="mini"
                type="primary"
                plain
                cursor:pointer
                @click="handleDelete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="describe_info" style="width: 12vw">
          <div class="title-info">
            <h2>问题总数: {{ total_judged_num }}</h2>
            <!-- <h2>阅卷人数: {{ rightInfo.ReaderNum }}</h2> -->
            <h2>批改情况: {{ total_finished_num }}</h2>
          </div>
          <!-- <div class="group-info">
            <p>前端: 摆了</p>
            <p>后端: 摆了</p>
            <p>算法: 摆了</p>
            <p>python: 摆了</p>
            <p>新媒体: 摆了</p>
          </div> -->
          <div class="do-info">
            <el-button
              size="small"
              style="
                margin-top: 1vh;
                width: 5vw;
                font-size: 0.3vw;
                padding: 1vh;
              "
              type="primary"
              @click="Clear"
              >一键删除</el-button
            >
            <div class="btn">
              <el-upload
                class="upload"
                accept=".xls,.xlsx"
                ref="fileUpload"
                action=""
                :headers="headerObj"
                :limit="1"
                :http-request="handleRequest"
                :on-success="successLoad"
              >
                <el-button
                  size="small"
                  cursor:pointer
                  type="primary"
                  style="
                    margin-top: 1vh;
                    width: 6vw;
                    margin-left: 0;
                    font-size: 0.3vw;
                    padding: 1vh;
                  "
                  >批量导入阅卷人</el-button
                >
              </el-upload>
              <p class="btn_info">支持Excel文件</p>
            </div>
            <div
              style="
                font-size: 1.4vh;
                margin-top: 1vh;
                display: flex;
                flex-direction: row;
                white-space: nowrap;
                justify-content: space-around;
                align-items: center;
              "
            >
              添加阅卷人:<el-input
                v-model="newOperator"
                placeholder="输入已有用户学号"
                @change="addOperator"
                size="small"
                style="margin-left: 0.5vw"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOperatorInfo, // 获取阅卷人信息
  setOperatorGroup, // 设置阅卷人分组
  updateOperator, // 添加阅卷人
  getOperator, // Excel导入阅卷人
} from "../../api/admin";
export default {
  data() {
    return {
      unit_name: "",
      newOperator: "",
      // rightInfo: {},
      total_judged_num: 0,
      total_finished_num: 0,
      judger_list: [],
      headerObj: {
        token: localStorage.getItem("token"),
      },
      options: [
        {
          value: "前端",
          label: "前端",
        },
        {
          value: "后端",
          label: "后端",
        },
        {
          value: "算法",
          label: "算法",
        },
        {
          value: "python",
          label: "python",
        },
        {
          value: "安全",
          label: "安全",
        },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem("role") === "2") {
      console.log(this.$route.params);
      getOperatorInfo(this.$route.params.unit_id).then((res) => {
        const data = res.data.data;
        this.unit_name = data.unit_name;
        this.judger_list = data.judger_list;
        this.total_finished_num = data.total_finished_num;
        this.total_judged_num = data.total_judged_num;
      });
    } else {
      this.$router.back();
    }
  },
  methods: {
    back() {
      this.$router.push("/adminhome");
      location.reload();
    },
    // 删除阅卷人
    handleDelete() {
      this.$message({
        message: "删不掉，怎么想都删不掉",
        type: "error",
      });
      //   var tableData = this.tableData;
      //   this.tableData = tableData.splice(index, 1);
    },
    Clear() {
      this.$message({
        message: "请不要这样做",
        type: "warning",
      });
    },

    // 设置分组
    changeValue(event, stuId) {
      setOperatorGroup(stuId, event)
        .then(({ data: { data } }) => {
          this.$message.success(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 添加阅卷人
    addOperator() {
      console.log(this.newOperator);
      updateOperator(this.newOperator).then((res) => {
        
        if (res.data.errMsg === "数据库中没有该用户!") {
          this.$message.error("数据库中没有此用户");
        } else {
          this.$message.success("添加成功");
          location.reload();
        }
        this.newOperator = "";
      });
    },
    // 上传文件成功的回调
    successLoad() {
      console.log("上传文件成功");
    },
    // 处理上传事件,覆盖默认上传事件
    handleRequest(params) {
      getOperator(params.file).then((res) => {
        if (res.data.success === "true") {
          this.$message.success("上传成功");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      });
    },
    sendFile() {
      this.$refs.fileUpload.submit();
    },
  },
};
</script>

<style scoped>
#settingPage {
  margin: auto;
  width: 70vw;
  background: #fff;
  padding: 4vh;
  border-radius: 0.5vw;
}
.body-head {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.body-title {
  font-size: 3.3vh;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(33, 32, 32, 1);
}
.backBtn {
  margin-left: 46vw;
}
.body-main {
  z-index: -10;
  display: flex;
  flex-direction: row;
}
.describe_info {
  margin-left: 2vw;
}
.describe_info {
  display: flex;
  flex-direction: column;
}
.do-info {
  display: flex;
  flex-direction: column;
}
.el-table thead tr {
  background-color: #f5f5f5 !important;
}
tr:nth-child(even) {
  background: #f5f5f5;
}
.el-table .success-row {
  background: #ffffff;
}
.title-info {
  font-size: 1.4vh;
  font-weight: 700;
  letter-spacing: 0px;
  color: rgba(33, 32, 32, 1);
  text-align: left;
  vertical-align: top;
}
.group-info {
  font-size: 1.5vh;
  font-weight: 400;
  letter-spacing: 0px;
  color: rgba(33, 32, 32, 1);
  line-height: 1.2vh;
  text-align: left;
  vertical-align: top;
}
.btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.btn_info {
  font-size: 0.8vh;
  line-height: 0;
  margin-left: 0.2vw;
  color: gray;
}
</style>

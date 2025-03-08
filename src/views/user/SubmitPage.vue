<template>
  <div class="SubmitPage">
    <div class="success-content">
      <div class="content-body">
        <div class="top-head">
          <p class="body-title">2022年招新题目</p>
          <el-link
            class="backBtn"
            type="primary"
            :underline="false"
            @click="back"
            >返回</el-link
          >
        </div>
        <div class="success-body">
          <img
            class="success-img"
            src="../../../public/image/success.png"
            alt=""
          />
        </div>
        <!-- <h4 :value="time">提交成功, {{ time }}s后跳转至主页</h4> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 3,
    };
  },
  methods: {
    back() {
      this.$router.push("/userhome");
    },
  },
  mounted() {
    if (localStorage.role === "0") {
      setTimeout(() => {
        // let that = this
        this.$router.push("/userhome");
        console.log("跳转成功");
        // () => {
        //   that.time = that.time - 1;
        //   console.log(that.time);
        // };
      }, 3000);
    } else {
      this.$router.back();
    }
  },
};
</script>

<style scoped>
.SubmitPage {
  display: flex;
  height: 89.6vh;
  flex-direction: column;
  align-items: center;
}
.success-content {
  width: 70vw;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 1.4vh;
}
.top-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.body-title {
  font-size: 3.3vh;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(33, 32, 32, 1);
}
.content-body {
  padding: 4vh 8vh;
}
.success-body {
  margin-top: 3vh;
  width: 100%;
  padding: 7vh 0;
  border-radius: 0.8vh;
  background-color: rgb(214, 214, 214);
  text-align: center;
}
</style>

<template>
  <!-- <div id="index"> -->
  <!-- <top-head></top-head> -->
  <router-view></router-view>
  <!-- </div> -->
</template>

<script>
// import topHead from "../components/topHead.vue";
export default {
  name: "sacc-index",
  data() {
    return {};
  },
  // beforeCreate() {
  //   let role = localStorage.getItem("token");
  //   if (role === "admin") {
  //     this.$router.push("/adminhome");
  //   } else if (role === "operator") {
  //     this.$router.push("/operatorhome");
  //   } else {
  //     this.$router.push("/userhome");
  //   }
  // },
  // components: {
  //   topHead,
  // },
};
</script>

<style>
</style>
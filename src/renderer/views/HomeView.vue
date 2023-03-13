<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="toCheckUpdatePage">检查更新</el-button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    toCheckUpdatePage() {
      this.$router.push("/update");
    },
  },
};
</script>

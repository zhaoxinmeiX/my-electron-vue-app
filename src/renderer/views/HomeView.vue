<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" round @click="checkUpdate">检查更新</el-button>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "HomeView",
  methods: {
    checkUpdate() {
      ipcRenderer.invoke("check-update").then((res) => {
        console.log("启动检查", res);
      });
    },
  },
};
</script>

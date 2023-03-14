<template>
  <div>
    <el-button type="primary" round @click="toHomePage">首页</el-button>
    <el-button type="primary" round @click="checkUpdate">检查更新</el-button>
    <el-dialog
      title="进度"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      center
      width="14%"
      top="45vh"
    >
      <div class="content">
        <el-progress
          type="dashboard"
          :percentage="percentage"
          :color="colors"
          :status="progressStaus"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "UpdateView",
  data() {
    return {
      percentage: 0,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#6f7ad3", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#5cb87a", percentage: 100 },
      ],
      dialogVisible: false,
      progressStaus: null,
    };
  },
  created() {
    ipcRenderer.on("download-progress", (event, args) => {
      console.log("download-progress", args);
    });
  },
  methods: {
    toHomePage() {
      this.$router.push("/");
    },
    checkUpdate() {
      ipcRenderer.invoke("check-update").then((res) => {
        console.log("启动检查", res);
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
  destroyed() {
    console.log("销毁了哦");
    ipcRenderer.removeAllListeners("download-progress");
  },
};
</script>

<style></style>

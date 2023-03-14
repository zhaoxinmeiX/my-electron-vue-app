<template>
  <div>
    <el-progress v-if="percentage > 0" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "UpdateView",
  data() {
    return {
      percentage: 0,
    };
  },
  created() {
    ipcRenderer.on("download-progress", (event, args) => {
      console.log("download-progress", args);
      this.percentage = args.percent;
    });
  },
  methods: {},
  destroyed() {
    console.log("销毁了哦");
    ipcRenderer.removeAllListeners("download-progress");
  },
};
</script>

<style></style>

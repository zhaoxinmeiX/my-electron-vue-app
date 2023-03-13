import { autoUpdater } from "electron-updater";
const { dialog, BrowserWindow } = require("electron");
const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";

// 防止报错no such file or directory dev-app-update.yml
if (isDevelopment) {
  autoUpdater.updateConfigPath = path.join(__dirname, "dev-app-update.yml");
}
/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
 **/
class Update {
  constructor() {
    let win = null;

    //设置自动下载
    autoUpdater.autoDownload = false;

    // 检测是否有新版本
    autoUpdater.checkForUpdates();

    autoUpdater.on("checking-for-update", (res) => {
      console.log("获取版本信息:" + res);
    });

    autoUpdater.on("update-not-available", (res) => {
      console.log("没有可更新版本:" + res);
    });

    autoUpdater.on("update-available", (res) => {
      dialog
        .showMessageBox({
          type: "info",
          title: "软件更新",
          message: "发现新版本, 确定更新?",
          buttons: ["确定", "取消"],
        })
        .then((resp) => {
          if (resp.response == 0) {
            createWindow();
            autoUpdater.downloadUpdate();
          }
        });
    });

    async function createWindow() {
      win = new BrowserWindow({
        width: 300,
        height: 300,
        title: "更新",
        frame: false,
        transparent: true,
        maximizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });
      if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "#/update");
      } else {
        win.loadURL("app://./index.html#/update");
      }
    }

    autoUpdater.on("download-progress", (res) => {
      console.log("下载监听:" + res);
      win.webContents.send("download-progress", res);
    });

    autoUpdater.on("update-downloaded", () => {
      dialog
        .showMessageBox({
          title: "下载完成",
          message: "最新版本已下载完成, 退出程序进行安装",
        })
        .then(() => {
          autoUpdater.quitAndInstall();
        });
    });
  }
  // 执行自动更新检查
  checkUpdate() {
    // 检测是否有新版本
    autoUpdater
      .checkForUpdates()
      .then((res) => {
        console.log("checkForUpdates", res);
      })
      .catch((err) => {
        console.log("网络连接问题", err);
      });
  }
}

export default Update;

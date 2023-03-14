import { ipcMain } from "electron";
import Update from "./checkupdate";

const allUpdater = new Update();

export default function () {
  ipcMain.handle("check-update", () => {
    allUpdater.checkUpdate();
    return "正在检测是否有新版本";
  });
}

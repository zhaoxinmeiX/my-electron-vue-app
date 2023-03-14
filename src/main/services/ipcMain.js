import { ipcMain } from "electron";
import Update from "./checkupdate";

const allUpdater = new Update();

export default function () {
  ipcMain.handle("check-update", () => {
    allUpdater.checkUpdate();
  });
}

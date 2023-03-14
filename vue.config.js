const path = require("path");
const pkg = require("./package.json");
const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  assetsDir: "public",
  publicPath: isProd ? "./" : "/",
  productionSourceMap: true,
  // webpack的相关配置
  configureWebpack: {
    entry: "./src/renderer/main.js",
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".less"],
      alias: {
        "@": resolve("src/renderer"),
      },
    },
  },
  // 开发服务器http代理
  devServer: {
    open: !process.argv.includes("electron:serve"),
    host: "localhost",
    port: 9080,
    https: false,
  },
  // 第三方插件配置
  pluginOptions: {
    // vue-cli-plugin-electron-builder 配置
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: pkg.productName, // 产品名称
        appId: pkg.appId, // 包名
        win: {
          icon: "build/icons/icon.ico",
          // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
          target: [
            {
              // 打包成一个独立的 exe 安装程序
              target: "nsis",
              // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
              arch: [
                "x64",
                // 'ia32'
              ],
            },
          ],
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications",
            },
            {
              x: 130,
              y: 150,
              type: "file",
            },
          ],
        },
        linux: {
          icon: "build/icons",
          target: "AppImage",
        },
        mac: {
          icon: "build/icons/icon.icns",
        },
        files: ["**/*"],
        asar: true,
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
          // 安装图标
          installerIcon: "build/icons/icon.ico",
          // 卸载图标
          uninstallerIcon: "build/icons/uninstall.ico",
          // 安装时头部图标
          installerHeaderIcon: "build/icons/icon.ico",
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true,
          shortcutName: pkg.productName, // 图标名称
          // include: "build/script/installer.nsh", // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
        },
        publish: [
          // 这个配置会生成latest.yml文件，用于自动更新的配置信息；
          {
            provider: "github",
            owner: "zhaoxinmeiX",
            repo: "my-electron-vue-app",
          },
        ],
      },
      chainWebpackMainProcess: (config) => {
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      chainWebpackRendererProcess: (config) => {
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      outputDir: "dist/electron",
      mainProcessFile: "src/main/main.js",
      mainProcessWatch: ["src/main"],
    },
  },
};

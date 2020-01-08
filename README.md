# electron_学习笔记
```
echo "# electron_learn" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/linjieFE/electron_learn.git
git push -u origin master
```
-----------------------------
## 一、安装
### step1应用目录下 初始化package.json
1) 安装前确认node版本 我本地是12.14.0 
2) npm i electron -g 或 cnpm i electron -g 全局安装 (最终我选用的cnpm, npm 莫名报错) 
   - 全局安装之后可以项目才可以直接使用electron命令执行electron . 或 electron xxx.js 
   - 只在开发环境下和局部环境下安装不能执行electron命令
3) 以下内容转到开发目录下进行
```
npm init -y 
```

### step2 装electron 依赖包
```
官方推荐=> npm/cnpm install --save-dev electron 或 npm/cnpm i electron -D 或/ npm/cnpm i electron -S
ps:我的Mac上npm 没有按装成功，用了 cnpm install --save-dev electron 安装成功

```
另 npm init 检查下package.json的start 配置项是不是如下

```
"scripts": {
    "start": "electron ."
}
```

```
{
  "name": "01-helloworld",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test":"echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^7.1.7"
  }
}
```
## 三、主进程(Main process) 渲染进程（render process）
- 入口文件就是主进程 -> main.js、menu.js(mian.js中直接引入的js文件)

### 主进程创建的第一个WEB页面

页面中引入的js文件 index.html 中引入的文件->例：test1.js (渲染进程)

[Electron 中文教程](https://cloud.tencent.com/developer/section/1116217)https://cloud.tencent.com/developer/section/1116217

Electron正式版升级后发现原来能运行的代码报错提示require is not defined

解决办法：

修改创建BrowserWindow部分的相关代码，设置main.js属性webPreferences.nodeIntegration为 true

```
let win = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true
    }
})
```
在原有的new BrowserWindow基础上加入

```
webPreferences: {
    nodeIntegration: true
}
```
就可以了。

### 主进程可以使用的模块
 * app模块 : 控制整个应用的生命周期设计
 * autoUpdater模块 : 自动更新应用
 * BrowserWindow模块 : 创建一个浏览器窗口
 * contentTracing模块 : 收集由底层的Chromium content 模块 产生的搜索数据
 * dialog模块 : 提供一个弹出框或者文件选择框
 * globalShortcut模块 : 注册全局的自定义快捷键
 * ipcMain模块 : 提供主进程和渲染进程之间的通讯方法，接收渲染进程发射过来的事件和数据并进行回复
 * Menu模块 : 创建鼠票右键显示菜单，跟menuItem 模块配合使用 可以通过remote 模块给渲染的进程调用
 * powerSaveBlocker模块 : 阻止应用系统进入睡眠模式，允许应用保持系统和屏继续工作
 * session模块 : 创建一个新的Session对象，可为应用创建多个Cookie文件夹存储不同的数据信息，并且不会相互影响，积压自独立
 * webContents模块 : 是一个事件发出者，负责渲染并控制网页，也是BrowserWindow对象的属性，可设置打开调试窗口等。


### 渲染进程可以使用的模块
 * desktopCapturer 模块：获取可用资源，这个资源可以通过 getUserMedia 捕获得到
 * ipcRenderer 模块: 提供渲染进程之间的通试方法，可以从渲染进程向主进程发送同步或异步消息，也可以收到主进程相应
 * remote 模块: 使渲染进程可以调用主进程的模块
 * webFrame 模块 : 自定义如何渲染当前网页

### 两个进程都可以使用的模块
 * clipboard 模块: 提供方法来供复制和粘贴操作
 * crashReporter 模块: 开启发送应用崩溃报告，自动提交崩溃报告给服务器
 * nativeImage 模块: 图片对象，从剪切板中读取图片，它返回的是nativeImage
 * screen 模块: 屏幕的size，显示，鼠标位置等信息，即可根据用户显示器大小等信息进行渲染页面
 * shell 模块: 提供了集成其他桌面客端的关联功能，如果调用用户默认浏览器打开一个新窗口等

## 四、进程间的通信

### 4.1 渲染进程给主进程发送指令

 * ipcMain     模块 : 在主进程引入，用于接收渲染进程发送的事件和进行回复
               结构 : ipcMain.on(接收事件名，callback(事件对象，接收参数)）
 * ipcRenderer 模块: 渲染进程引入，用于发送事件给主进程和接收主进程返回的回复事件
               结构: ipcRenderer.send(事件名称，发射的数据)
                    ipcRenderer.on(回复事件名称，回复的数据)

---------------------------------------------------------------------------

1. 使用ipcRenderer模块发送、ipcMain 模块接收
2. 发送代码: ipcRenderer.send('msg-a','我是渲染进程，我来了')
  - 参数1 : 频道
  - 参数2 : 要传输的数据字符串或对象等。

####  关于 依赖package.json
```
 /* 
 * devDependices 开发阶段用的依赖包npm ...-D默认 //dev
 * dependices 发布阶段用的依赖包 npm ...-S默认
 */
```
 
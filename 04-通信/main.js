//创建一个hello world的窗口
//引入模块
//app 模块：控制应用的生命用期
//BrowserWindow 模块:创建一个浏览器窗口
const {app, BrowserWindow, ipcMain} = require('electron')

// path是node 内置模块 用来拼接路径
const path= require('path')
//初始化应用之后，会触发监听 ready 事件
// app.on('ready',function(){
//     //TODO 创建一个窗口
// })简化

app.on('ready',ml_createWindow)

// 创建窗口
// 自已定义的方法 建议加一个前缀
let win
function ml_createWindow(){
    //1.1 创建窗口
    win = new BrowserWindow({//control 点对象，可查看内置方法和属性
        width:500,// 宽
        height:500,// 高
        movable:true,// 是否可移动
        resizable:true,// 窗口可拖曳拉伸
        webPreferences: {
            nodeIntegration: true //electron中JS报错：require is not defined的问题解决方法
        }    
    })  
    // 1.2 加载内容
    // window.loadURL('http://www.baidu.com')
    //1.2.1加载本地
    //_dirname : 当前js文件所在的文件夹路径 类似:c:usr/...01-helloworld 绝对路径
    // 第二个参数 当文件的相对路径 './index.html'
    // 第三个参数 如是Mac系统 还要再加一个'file://'参数
    //win.loadURL(path.join(_dirname,'./index.html'))  //=>win系统
    win.loadURL(path.join('file://',__dirname,'./index.html'))

    //1.3 调试工具
    // webContent : 控制和渲染页面的 也是window的一个属性
    win.webContents.openDevTools();

    //1.4 关闭窗口的事件
    win.on('closed',function(){
        //TODO :关闭窗口的事件
        win=null;
    })

    // 1.5 引入设置菜单文件
    require('./menu');
}

ipcMain.on('msg-a',function(event,msg){
    console.log('我是ipcMain监听事件，主进程接收渲染进程ipcRenderer发送的数据：',msg)
     /**
     * 两种方法
     * 1-1. event.sender.send('msg-b','blablabla...')
     * 2-2. 利用窗口的webContents
     *
     */

     /**
     * 1-1 渲染进程-->主进程
     * 1. 渲：ipcRender.send('事件频道',要传的数据)
     * 2. 主：ipcMain.on('事件频道',function(){
     * })
     * 主进程-->渲染进程
     * 1. 主：event.sender.send(事件频道, 要传的数据)
     * 2. 渲：ipRender.on('事件频道',function(){ ... })
     * 渲染进程->渲染进程
     * 1. 思路： 渲染进程A->主进程->渲染进程B
     * 
     * 不同渲染进程之间共享数据
     * 我们可以很简单的使用html5的api来完成：localStaorage、sessionStorage就可以，在主进程中将一个对象储存为全局变量，然后可以通过 remote 模块来操作
     * 
     */

     // 1-1例
     // event.sender.send('msg-b','我是主进程发送来的数据')
     
     // 2-2例
     win.webContents.send('msg-b','我是主进程发送来的数据')




})
//执行文件3种方式
/**
 * 1. electron main.js
 * 2. electron .
 * 3. package.json的start 配置项配置 electron .
 */

//主进程：打印的数据 ->终端控制台上显示
//渲染进程：打印的数据 ->页面控制台上显示

/**
 * 主进程可以使用的模块
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
 */

/**
 * 渲染进程可以使用的模块
 * desktopCapturer 模块：获取可用资源，这个资源可以通过 getUserMedia 捕获得到
 * ipcRenderer 模块: 提供渲染进程之间的通试方法，可以从渲染进程向主进程发送同步或异步消息，也可以收到主进程相应
 * remote 模块: 使渲染进程可以调用主进程的模块
 * webFrame 模块 : 自定义如何渲染当前网页
 */

/**
 * 两个进程都可以使用的模块
 * clipboard 模块: 提供方法来供复制和粘贴操作
 * crashReporter 模块: 开启发送应用崩溃报告，自动提交崩溃报告给服务器
 * nativeImage 模块: 图片对象，从剪切板中读取图片，它返回的是nativeImage
 * screen 模块: 屏幕的size，显示，鼠标位置等信息，即可根据用户显示器大小等信息进行渲染页面
 * shell 模块: 提供了集成其他桌面客端的关联功能，如果调用用户默认浏览器打开一个新窗口等
 */

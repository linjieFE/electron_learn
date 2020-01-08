//创建一个hello world的窗口
//引入模块
//app 模块：控制应用的生命用期
//BrowserWindow 模块:创建一个浏览器窗口
const {app, BrowserWindow} = require('electron')

// path是node 内置模块 用来拼接路径
const path= require('path')
//初始化应用之后，会触发监听 ready 事件
// app.on('ready',function(){
//     //TODO 创建一个窗口
// })简化

app.on('ready',ml_createWindow)

// 创建窗口
// 自已定义的方法 建议加一个前缀
let window
function ml_createWindow(){
    if(window){
        return //防止重复创建 如果已经创建 不再重复创建
    }
    //1.1 创建窗口
    let paddingH=0
    let paddingW=0
    //mac 兼容问题
    if(process.platform=='darwin'){
        paddingH=-15
        paddingW=-35
    }
    window = new BrowserWindow({//control 点对象，可查看内置方法和属性
        width:500+paddingW,// 宽
        height:500+paddingH,// 高
        movable:true,// 是否可移动
        resizable:true,// 窗口可拖曳拉伸
    })  
    // 1.2 加载内容
    // window.loadURL('http://www.baidu.com')
    //1.2.1加载本地
    //_dirname : 当前js文件所在的文件夹路径 类似:c:usr/...01-helloworld 绝对路径
    // 第二个参数 当文件的相对路径 './index.html'
    // 第三个参数 如是Mac系统 还要再加一个'file://'参数
    //window.loadURL(path.join(_dirname,'./index.html'))  //=>win系统
    window.loadURL(path.join('file://',__dirname,'./index.html'))

    //1.3 调试工具
    // webContent : 控制和渲染页面的 也是window的一个属性
    window.webContents.openDevTools();

    //1.4 关闭窗口的事件
    window.on('closed',function(){
        //TODO :关闭窗口的事件
        window=null;
    })
    
    // Electron 会在初始化后并准备
    // 创建浏览器窗口时，调用这个函数。
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('ready', createWindow)
}
//执行文件3种方式
/**
 * 1. electron main.js
 * 2. electron .
 * 3. package.json的start 配置项配置 electron .
 */
/**
 * 依赖package.json
 * devDependices 开发阶段用的依赖包npm ...-D默认 //dev
 * dependices 发布阶段用的依赖包 npm ...-S默认
 */
//引入模块
const {app, BrowserWindow} = require('electron')
const path= require('path')
app.on('ready',ml_createWindow)
// 创建窗口
let win
function ml_createWindow(){
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
    win.loadURL(path.join('file://',__dirname,'./index.html'))
    
    //1.3 调试工具  
    win.webContents.openDevTools();

    //1.4 关闭窗口的事件
    win.on('close',function(){
        //TODO :关闭窗口的事件
        win=null;
    })

    // 1.5 引入设置菜单文件
    require('./menu');
}
// 五、共享数据 全局变量
global.sharedObject = {
    name:'主进程中定义的全局变量'
}

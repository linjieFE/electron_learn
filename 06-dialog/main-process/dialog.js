//主进程

//对话框 提示窗

//引入模块
const { dialog, nativeImage } = require('electron')
const path= require('path')
//1. 展示一个信息对话框
dialog.showMessageBox({
    type:'warning',
    title:'好消息！',
    icon:nativeImage.createFromPath(path.join(__dirname,'../img/icon.png')),
    message:'2020逢考必过！',
    buttons:['确认','取消']
}).then(res =>{
    console.log(res)
    // index 参数为buttons组数下标
    if(res.response == 0){
        console.log('hi! 恭喜通过')
    }else{
        console.log('bye! 继续努力哦！')
    }
})
// 展示一个错误提示窗
// dialog.showErrorBox('系统问题！','哎呀！页面出问题了')
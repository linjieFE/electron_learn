const {remote}=require('electron')
let btn1=document.querySelector("#btn1")
btn1.onclick=function(){
    let globalName =remote.getGlobal('sharedObject').name
    globalName = "渲染进程a改变了主进程的全局数据"
    console.log('渲染进程a:',globalName)
}
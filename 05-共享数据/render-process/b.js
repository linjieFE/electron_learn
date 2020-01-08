const {remote}=require('electron')
let btn2=document.querySelector("#btn2")
btn2.onclick=function(){
    let globalName =remote.getGlobal('sharedObject')
    console.log('获取到全局主进程数据：',globalName.name)
}
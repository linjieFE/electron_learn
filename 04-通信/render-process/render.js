const{ BrowserWindow} = require('electron').remote

const{ ipcRenderer } = require('electron')
/**
 * 渲染进程不能直接引入主进程的模块BrowserWindow
 * 供助remote 模块，从remote 中拿到主进程允许使用的模块
 */
// script->src方法
// function ml_click(){
//     console.log("src 引入的 render.js")
// }

// require 方法
let btn = document.querySelector('#btn')

// btn.onclick = function(){
//     console.log('requere 引入的 render.js')
// }
btn.addEventListener('click',function(){
    console.log('requere 引入的 render.js')
    ipcRenderer.send('msg-a','我的由渲染进程发送来的数据')
})
ipcRenderer.on('msg-b',function(event,msg){
    console.log('我来自渲染进程，监听主进程发送来的数据:',msg)
})
const{ BrowserWindow} = require('electron').remote
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
    let win = new BrowserWindow();
})
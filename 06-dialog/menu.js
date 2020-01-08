// 制作菜单
const { Menu } = require('electron')
// 1. 设置一个模板
let template = [
    // 文件
    {
        label:'文件',
        submenu:[
            {
                label:'新建文件',
                tyle:'checkbox',//选中菜单前打勾
                checked:true,//选中菜单前打勾=>window
                accelerator:(function(){//菜单快截键
                    //mac
                    if(process.platform=='darwin'){
                        return 'ctrl+command+N'
                    }else{
                        return 'alt+ctrl+N'
                    }
                })(),
                click:function(){
                    console.log('new file')
                }
            },
            {
                label:'新建窗口',
                tyle:'checkbox',//选中菜单前打勾
                checked:true,
                accelerator:'alt+ctrl+M',//菜单快截键
                click:function(){
                    console.log('new window')
                }
            }
        ]
    },
    // 中间加一条线
    {
        type:'separator'
    },
    // 编辑
    {
        label:'编辑'
    }
]

// 2.构建菜单（实例化一个菜单对像）
let menu = Menu.buildFromTemplate(template)

//3. 把菜单对像设置到应用中
Menu.setApplicationMenu(menu)
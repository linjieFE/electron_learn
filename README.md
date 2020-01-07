# electron_学习笔记
echo "# electron_learn" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/linjieFE/electron_learn.git
git push -u origin master
-----------------------------
## 安装
### step1应用目录下 初始化package.json
安装前确认node版本 我本地是12.14.0 
```
npm init -y 
```

### step2 装electron 依赖包
```
官方推荐=> npm install --save-dev electron 或 npm i electron -D 
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

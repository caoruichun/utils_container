### preview 
    vue-cli3 新增配置文件
### 文件说明
    在vue 打包出dist包之后使用npm run preview 运行dist包内的文件，检查项目是否有问题
### 使用说明
    在package.json的scripts中配置
    "preview": "node preview.js --preview"
### 需要用到的插件

|插件名称|用途|使用说明|
|:-|:-:|-:|
|runjs|运行脚本|RunJS提供了一种简单的方法，可以通过run函数以同步和异步方式在任务中执行Shell命令： |   
|chalk|输出的配置改变颜色| console.log(chalk.red('输出的颜色变红')) |  
|vue.config.js|vue 的配置文件| https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE  | 
|connect|可扩展HTTP服务器框架| https://www.npmjs.com/package/connect  | 
|serve-static|静态文件服务器|https://www.npmjs.com/package/serve-static |
//common.js规范

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist')//打包出来的文件目录地址,需要是绝对路径,__dirname是项目所在的目录
    },
    plugins: [
        //每次打包后的js要插入到html当中
        //作用:根据模板的html生成新的html,并把打包后的js 引入到html里面
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname,'index.html'),
            filename: "home.html",//会把打包后的js引入到这个里面来
        }),
    ]
}


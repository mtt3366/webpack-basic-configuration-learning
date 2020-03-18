//common.js规范

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist')//打包出来的文件目录地址,需要是绝对路径,__dirname是项目所在的目录
    },
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        compress: true,//一切服务都启用 gzip 压缩：
        port: 7777,
        open:true//告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
    },
    plugins: [
        //清空输出目录
        new CleanWebpackPlugin(),
        //每次打包后的js要插入到html当中
        //作用:根据模板的html生成新的html,并把打包后的js 引入到html里面
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname,'index.html'),
            filename: "home.html",//会把打包后的js引入到这个里面来
        }),
    ]
}

//common.js规范

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const htmlPlugin = ['index', 'other'].map(chunksName => {
    return new HtmlWebPackPlugin({
        template: path.resolve(__dirname, `${chunksName}.html`),
        filename: `${chunksName}.html`,
        chunks: [chunksName]
    })
})
module.exports = {
    optimization: {
        minimizer: [//压缩css,js
            new OptimizeCssAssetsWebpackPlugin(),//一旦设置optimization,js就不会自动压缩了,需要借助插件来压缩js,(生产环境下)
            new TerserJSPlugin()
        ],
    },
    //单入口,单出口打包
    // entry: './src/index.js',
    // output: {
    //     filename: "bundle.js",
    //     path: path.resolve(__dirname,'dist')//打包出来的文件目录地址,需要是绝对路径,__dirname是项目所在的目录
    // },
    entry: {
        index: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: path.join(__dirname, 'static'),
        compress: true,//一切服务都启用 gzip 压缩：
        port: 7777,
        open: true,//告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
        hot:true

    },
    //=>配置模块加载器LOADER
    module: {
        rules: [
            // //从下往上
            // {
            //     test:/\.css$/,
            //     use:'css-loader'
            // },
            // {
            //     test:/\.css$/,
            //     use:'style-loader',
            //     enforce: "post",//pre  优先加载, post  最后加载
            // }
            {//简写
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                    loader: 'css-loader',
                    options: {
                        importLoaders:2//用后面的一个加载器来解析
                    }
                },'postcss-loader','less-loader'],
            },
            {//简写
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        }),
        //清空输出目录
        new CleanWebpackPlugin(),
        //每次打包后的js要插入到html当中
        //作用:根据模板的html生成新的html,并把打包后的js 引入到html里面
        ...htmlPlugin
    ]
}

const path = require('path')
const {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer')//代码审查工具
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//压缩css
const TerserJSPlugin = require('terser-webpack-plugin')//压缩js
module.exports = {
    mode:'production',
    optimization: {
        minimizer: [//压缩css,js
            new OptimizeCssAssetsWebpackPlugin(),//一旦设置optimization,js就不会自动压缩了,需要借助插件来压缩js,(生产环境下)
            new TerserJSPlugin()
        ],
        splitChunks: {//代码分割也是在生产环境下
            chunks: 'all',//表示第三方模块是同步还是异步引入进来的,async异步, all所有,既有同步也有异步
            minSize: 30000,//第三方模块的大小至少30Kb我才进行抽离,
            maxSize: 0,
            minChunks: 1,//至少粥里第三方库一个
            maxAsyncRequests: 5,//引入这个模块,异步请求的数量不超过五次
            maxInitialRequests: 3,//首拼加载请求次数最大不超过三次
            automaticNameDelimiter: '~',//文件之恋的连接符
            name: true,//是否可以更改文件名字
            cacheGroups: {//缓存组,可以设置一些规则
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10//优先级,谁大,就用那种规则
                },
                default: {
                    minChunks: 2,
                    priority: -2,//优先级,谁大,就用那种规则
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),//
    ]
}
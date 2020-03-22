//common.js规范

const path = require('path')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin')
const {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer')
const HappyPack = require('happypack');
const webpack = require('webpack')
const merge  = require('webpack-merge')

const htmlPlugin = ['index', 'other'].map(chunksName => {
    return new HtmlWebPackPlugin({
        template: path.resolve(__dirname, `./src/${chunksName}.html`),
        filename: `${chunksName}.html`,
        chunks: [chunksName]
    })
})
module.exports = (env)=>{
    // console.log(env)
    let base = {
        devtool: 'cheap-module-eval-source-map',
        // //告诉webpack,$是外部变量,不需要打包
        // externals:{
        //   'jquery':'$'//$外部变量,不需要打包
        // },
        optimization: {
            minimizer: [//压缩css,js
                new OptimizeCssAssetsWebpackPlugin(),//一旦设置optimization,js就不会自动压缩了,需要借助插件来压缩js,(生产环境下)
                new TerserJSPlugin()
            ],
            splitChunks: {
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
        //单入口,单出口打包
        // entry: './src/index.js',
        // output: {
        //     filename: "bundle.js",
        //     path: path.resolve(__dirname,'dist')//打包出来的文件目录地址,需要是绝对路径,__dirname是项目所在的目录
        // },
        resolve: {
            extensions: ['.js','.json','.jsx','.css','.ts','.vue'],
            alias: {
                '@':path.resolve(__dirname,'src'),
                'test':path.resolve(__dirname,'src/test1/test2')
            }
        },
        entry: {
            index: './src/index.js',
            other: './src/other.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: "[name].min.js"
        },

        devServer: {
            contentBase: path.join(__dirname, 'static'),
            compress: true,//一切服务都启用 gzip 压缩：
            port: 7777,
            // open: true,//告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
            hot:true,
            before: function(app, server, compiler) {//直接启动一个端口号为777的服务
                app.get('/api/user', function(req, res) {
                    res.json({ custom: 'response' });
                });
            },
            // proxy:{//启动代理,如果说请求的接口都是以api开头的,那么就启动代理
            //     '/api':{
            //         target:'http://localhost:8000',
            //         secure:false,//若为true,则表示以https开头
            //         pathRewrite:{'^/api':''},//重写请求的地址,把api开头德替换为空
            //         changeOrigin:true//把请求头当中的host改为服务器的地址,不然host不一样,有的服务器不响应
            //     }
            // }

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
                // {
                //   test:/\.js$/,
                //     use:'eslint-loader',
                //     enforce: "pre"//最先解析
                // },
                {
                    test:require.resolve('jquery'),
                    use:{
                        loader: "expose-loader",
                        options:'$'
                    }
                },
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
                },
                // {
                //     test:/\.(jpg|png|jpeg|gif)$/,
                //     use:[
                //         {
                //             loader: 'file-loader',
                //             options: {
                //                 name:'img/[name].[ext]'
                //             }
                //         }
                //         ]
                // }
                {
                    test:/\.(jpg|png|jpeg|gif)$/,
                    use:[
                        {
                            loader: 'url-loader',
                            options: {
                                limit:100*1024,//如果小于100KB,就用url-loader转化为base64直接放在html里输出,如果大于100kb,就用file-loader转化为文件输出
                                outputPath:'img',//如果大于限制,放在这个文件夹里
                                publicPath:'http://www.mtt.com'//如果大于限制,就从远程服务器上获取(比如CDN)
                            }
                        }
                    ]
                },
                {
                    test:/\.(eot|svg|ttf|woff|woff2)$/,
                    use:[
                        {
                            loader: 'file-loader',
                            options: {name:'icon/[name].[ext]'}
                        }
                    ]
                },
                {
                    test:/\.js$/,
                    use: 'babel-loader',
                    include: path.resolve(__dirname,'src'),//只要转化src文件夹下的js文件
                    exclude: /node_modules///不转化nodemodules文件夹下的代码
                }
            ]
        },
        plugins: [
            new HappyPack({
                id: 'styles',
                threads: 2,
                loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
            }),
            new BundleAnalyzerPlugin(),
            new webpack.HotModuleReplacementPlugin(),

            // new webpack.ProvidePlugin({
            //     $$: 'jquery',//$符号来自于jquery模块,每个模块都注入变量$,但不是注入在全局下
            //     jQuery: 'jquery',
            //     _map:['lodash','map']
            // }),
            new MiniCssExtractPlugin({
                filename:'css/main.css'
            }),
            //清空输出目录
            new CleanWebpackPlugin(),
            //每次打包后的js要插入到html当中
            //作用:根据模板的html生成新的html,并把打包后的js 引入到html里面
            ...htmlPlugin,
            // new AddAssetHtmlCdnWebpackPlugin(true,{
            //     jQuery:'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
            // })
        ]
    }
    if(env.development){
        return merge(base,dev)
    }else{
        return merge(base,prod)
    }
}

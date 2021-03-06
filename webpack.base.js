//common.js规范

const path = require('path')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin')

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

        // //告诉webpack,$是外部变量,不需要打包
        // externals:{
        //   'jquery':'$'//$外部变量,不需要打包
        // },

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
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65//图片品质
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4//速度
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        },
                    ],
                },
                // {
                //     test:/\.(jpg|png|jpeg|gif)$/,
                //     use:[
                //         {
                //             loader: 'url-loader',
                //             options: {
                //                 limit:100*1024,//如果小于100KB,就用url-loader转化为base64直接放在html里输出,如果大于100kb,就用file-loader转化为文件输出
                //                 outputPath:'img',//如果大于限制,放在这个文件夹里
                //                 publicPath:'http://www.mtt.com'//如果大于限制,就从远程服务器上获取(比如CDN)
                //             }
                //         }
                //     ]
                // },
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

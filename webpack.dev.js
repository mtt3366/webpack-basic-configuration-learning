const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
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
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
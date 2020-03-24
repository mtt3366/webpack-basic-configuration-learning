> 供个人学习备忘使用
## 
官网https://www.webpackjs.com/
`yarn init -y`
`yarn add webpack webpack-cli -D`
## 第一步
![](https://user-gold-cdn.xitu.io/2020/3/17/170e8b2488323320?w=251&h=300&f=png&s=10222)
```js
//sum.js
//esModule es6模块化方法  import  export
//commonJS node模块化方法 require module.exports

function sum(a, b) {
    return a+b
}
// export {sum}//引入模块只能叫sum
export default sum;//默认导出,引入的时候可以给模块起名
```
```js
//index.js
import sum1 from './sum'
console.log(sum1(1,2))
```

直接运行`npx webpack` 不需要任何配置文件,会把`index.js`打包为dist目录下的`main.js`

![](https://user-gold-cdn.xitu.io/2020/3/17/170e8b4151117f0d?w=1254&h=456&f=png&s=154225)

在index.html中引入,会打印3
![](https://user-gold-cdn.xitu.io/2020/3/17/170e8b503f2fed72?w=814&h=478&f=png&s=57849)
### 关于npx
`npx`会找.bin下的webpack命令,然后调用内部的webpack-cli去解析并且去执行

零配置一般不会去用

### 使用node script 的方式简写命令
`--mode` 代表是生产环境还是开发环境,两者打包出来的main.js不一样,生辰环境打包出来的main.js是经过压缩的
![](https://user-gold-cdn.xitu.io/2020/3/17/170e8bb0ba1875f7?w=977&h=443&f=png&s=70368)
可以通过mode告诉webpack,现在是在开发环境下还是生产环境下,在工作当中,开发环境和生产环境会配置不同的插件或者参数,
## 开始自己配置
### 配置入口和出口
会把`index.js`和他以来的包,打包成一个文件.比如叫`main.js`
![](https://user-gold-cdn.xitu.io/2020/3/17/170e8cbcf209a8e8?w=1225&h=542&f=png&s=83232)

### webpack插件设置html
`yarn add html-webpack-plugin -D`

![](https://user-gold-cdn.xitu.io/2020/3/17/170e8d862996e92d?w=1197&h=638&f=png&s=129467)

![](https://user-gold-cdn.xitu.io/2020/3/17/170e8d88f3376a4f?w=1218&h=557&f=png&s=77139)


![](https://user-gold-cdn.xitu.io/2020/3/18/170ec383eb3ad80c?w=530&h=109&f=png&s=49612)
不同的hash值来清除缓存
### 清空输出目录
yarn add clean-webpack-plugin -D
![](https://user-gold-cdn.xitu.io/2020/3/17/170e9107d90baf86?w=1219&h=746&f=png&s=158735)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ec39c3dd00a32?w=612&h=133&f=png&s=54316)
清空cc下的所有文件,但是不清空cc下的a.js
## 运行本地服务
`yarn add  webpack-dev-server -D`


![](https://user-gold-cdn.xitu.io/2020/3/18/170ebab9180993e9?w=607&h=195&f=png&s=29164)

![](https://user-gold-cdn.xitu.io/2020/3/18/170eb9314e1596e9?w=531&h=90&f=png&s=15943)

注意:
1. 内存中打包,不是访问的dist里面的文件

![](https://user-gold-cdn.xitu.io/2020/3/18/170eb925da340471?w=935&h=258&f=png&s=42187)
### contentBase


![](https://user-gold-cdn.xitu.io/2020/3/18/170ebac3f8171e93?w=631&h=517&f=png&s=54500)

1. 首先, 启动服务后,会把出口的目录当成启动服务的文件夹(我这里是dist),并且默认打开出口目录里的index.html,我这里有home.html,所以可以手动输入http://localhost:7777/home.html

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebaddb4f3326f?w=288&h=438&f=png&s=20913)
2. 如果不设置contentBase,会把默认的把当前项目的根目录,也作为提供服务的文件夹

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb161e5955ab?w=871&h=192&f=png&s=35025)
比如我访问

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb49b9dd3fa2?w=287&h=440&f=png&s=20082)
![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb3838b46239?w=732&h=236&f=png&s=14926)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb3c58b5d4a5?w=501&h=233&f=png&s=11533)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb45280cc850?w=695&h=236&f=png&s=14968)
都可以访问到

这是官方文档的描述:
![](https://user-gold-cdn.xitu.io/2020/3/18/170ebaf9209d99a7?w=640&h=459&f=png&s=52601)

3. 如果设置contentBase

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb6e0c02379b?w=523&h=146&f=png&s=23520)
就会服务static下面的资源
![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb6ba3b8c68a?w=484&h=238&f=png&s=12878)
并且src或者其他目录都没法访问到了,
当然,dist下的默认是启动服务的,home.html还可以访问到

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebb7661960227?w=441&h=120&f=png&s=8026)

## 多入口多出口文件配置

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebc289016caa8?w=571&h=352&f=png&s=47993)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebc2e7beb9483?w=571&h=290&f=png&s=37943)
home.js引入了两个文件

如果想把js放到不同的html文件里怎么办?
默认会把所有的js文件打包到一个html当中来.

有一个chunks可以指定引入的js文件是哪个

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebc92a2700dc2?w=645&h=279&f=png&s=23719)

理解:每个html导入一个js文件,这一个js文件把所有需要的工具,函数,模块都import进来

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebd035305554e?w=646&h=393&f=png&s=71231)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebd0bd50fc3fe?w=634&h=296&f=png&s=40067)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebd097317360c?w=303&h=489&f=png&s=22785)

![](https://user-gold-cdn.xitu.io/2020/3/18/170ebd0e66f22428?w=642&h=293&f=png&s=44494)

### es6 扩展运算符简写

![](https://user-gold-cdn.xitu.io/2020/3/18/170ec253163e1eec?w=756&h=543&f=png&s=94144)

## css解析

![](https://user-gold-cdn.xitu.io/2020/3/18/170ecd1b855f7f8f?w=404&h=119&f=png&s=34982)
`yarn add css-loader style-loader -D`

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0cfcd00e9f3d?w=803&h=347&f=png&s=46333)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0d023a782638?w=393&h=106&f=png&s=12456)

打包完成后

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0d08a2b8e549?w=676&h=499&f=png&s=94226)
### less与简写
`yarn add less less-loader -D`

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0d7853c97089?w=384&h=175&f=png&s=13643)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0d7bb7ff6440?w=682&h=546&f=png&s=66684)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0d80596ed011?w=346&h=144&f=png&s=13600)

如果在css中引入less
![](https://user-gold-cdn.xitu.io/2020/3/19/170f0dc2761410b1?w=776&h=271&f=png&s=22268)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0de6cef0eab6?w=746&h=227&f=png&s=26484)
### 处理前缀

![](https://user-gold-cdn.xitu.io/2020/3/19/170f0e0efd31680d?w=722&h=113&f=png&s=31430)

加一个postcss.config
![](https://user-gold-cdn.xitu.io/2020/3/19/170f1d981ed032ed?w=502&h=179&f=png&s=15094)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f1d9dcd5dae41?w=600&h=250&f=png&s=29981)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f1da796875563?w=834&h=494&f=png&s=66943)
结果

![](https://user-gold-cdn.xitu.io/2020/3/19/170f1db06fb2ab78?w=767&h=308&f=png&s=333806)

### 兼容99.5的浏览器

![](https://user-gold-cdn.xitu.io/2020/3/19/170f1e47b0faa6ec?w=739&h=619&f=png&s=50084)

![](https://user-gold-cdn.xitu.io/2020/3/19/170f1e54a5a89d44?w=724&h=206&f=png&s=273409)

### 抽离css
#### 6.mini-css-extract-plugin 抽离CSS内容

https://www.npmjs.com/package/mini-css-extract-plugin
- 安装 $ yarn add mini-css-extract-plugin -D
![](https://user-gold-cdn.xitu.io/2020/3/19/170f1ef7a8956510?w=818&h=748&f=png&s=135929)


```js
let MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
	UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    //=>设置优化项
	optimization: {
		//=>设置压缩方式
		minimizer: [
			//=>压缩CSS（但是必须指定JS的压缩方式）
			new OptimizeCssAssetsWebpackPlugin(),
			//=>压缩JS
			new UglifyjsWebpackPlugin({
				cache: true, //=>是否使用缓存
				parallel: true, //=>是否是并发编译
				sourceMap: true, //=>启动源码映射（方便调试）
			})
		]
	},
	plugins: [
		//=>使用插件
		new MiniCssExtractPlugin({
			//=>设置编译后的文件名字
			filename: 'main.css'
		})
	],
	module: {
		rules: [{
			test: /\.(css|less)$/,
			use: [
				// "style-loader",
				//=>使用插件中的LOADER代替STYLE方式
				MiniCssExtractPlugin.loader,
				"css-loader",
                "postcss-loader",
				"less-loader"
			]
		}]
	}
}
```

上述JS压缩对于require/import等还存在问题，需要对于ES6中的一些语法进行处理!


### 菜菜老师
压缩css
![](https://user-gold-cdn.xitu.io/2020/3/19/170f1f32d2d84e6b?w=1323&h=395&f=png&s=104239)
压缩js
yarn add terser-webpack-plugin -D

![](https://user-gold-cdn.xitu.io/2020/3/19/170f1f7e7844b9de?w=1175&h=475&f=png&s=118889)

## 图片压缩
安装 $ yarn add file-loader url-loader html-withimg-loader -D

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5dc879d0773f?w=283&h=29&f=png&s=13728)解析图片并作为文件输出

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5e14912be819?w=589&h=272&f=png&s=31976)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5e175068c52f?w=833&h=383&f=png&s=45369)

## urlloader

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5e52a8d65695?w=1296&h=336&f=png&s=44673)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5e4fda9ad3fb?w=1335&h=592&f=png&s=218520)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5e5f38f8a93f?w=687&h=252&f=png&s=70626)

### icon
先将项目下载
![](https://user-gold-cdn.xitu.io/2020/3/20/170f5f276c21abfe?w=1080&h=401&f=png&s=40391)
复制
![](https://user-gold-cdn.xitu.io/2020/3/20/170f5f2c478286fa?w=247&h=260&f=png&s=8297)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5f474c5a8a37?w=745&h=597&f=png&s=103747)

引入
![](https://user-gold-cdn.xitu.io/2020/3/20/170f5f4e4d6408ea?w=600&h=397&f=png&s=58164)

使用file-loader打包
![](https://user-gold-cdn.xitu.io/2020/3/20/170f5f64d0ebc1eb?w=689&h=278&f=png&s=23706)


![](https://user-gold-cdn.xitu.io/2020/3/20/170f5f9e6ab26f9e?w=601&h=311&f=png&s=104116)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5fa71e928a3b?w=412&h=252&f=png&s=16608)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5fe8616137c3?w=650&h=257&f=png&s=21699)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f5fea7e6272e8?w=278&h=216&f=png&s=8082)

## es67=>es5
将更高级的代码转化成所有浏览器都支持的代码

![](https://user-gold-cdn.xitu.io/2020/3/20/170f60b0f221025d?w=656&h=98&f=png&s=79771)

预设,里面有很多插件,是插件的集合
安装完之后,首先

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6a529c35e3b1?w=818&h=185&f=png&s=30474)
但是这时候还不能转化,需要在预设里面设置

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6ad4af21dd1c?w=455&h=183&f=png&s=56889)
但是这个只能操作最基础的es6语法,如果用更高级别的api,需要别的预设和插件


![](https://user-gold-cdn.xitu.io/2020/3/20/170f6af62d193a76?w=435&h=143&f=png&s=19445)
编译完了之后:还是这个样子,没有将其转化为es5的语法
![](https://user-gold-cdn.xitu.io/2020/3/20/170f6af4ffe3ec4d?w=750&h=179&f=png&s=36525)


需要做以下处理
![](https://user-gold-cdn.xitu.io/2020/3/20/170f6b682c5d8d5a?w=902&h=344&f=png&s=148465)
按需引入必须要在生产环境下安装这个

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6b3a686d030a?w=746&h=408&f=png&s=148890)


![](https://user-gold-cdn.xitu.io/2020/3/20/170f6b629676dc78?w=855&h=282&f=png&s=85889)

有一些草案的用法,必须进行转换,比如类的装饰器
草案中修饰类的一个包
![](https://user-gold-cdn.xitu.io/2020/3/20/170f6b8ca7d91f4d?w=1016&h=574&f=png&s=248572)
修饰装饰器的包
`yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators -D`


![](https://user-gold-cdn.xitu.io/2020/3/20/170f6c0daaa9963c?w=788&h=443&f=png&s=29106)



![](https://user-gold-cdn.xitu.io/2020/3/20/170f6c561d37b4a9?w=586&h=269&f=png&s=34357)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6c54f4ebf973?w=493&h=216&f=png&s=20679)


![](https://user-gold-cdn.xitu.io/2020/3/20/170f6cb4784baa3d?w=668&h=536&f=png&s=73176)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6cb7e5e4b99b?w=567&h=456&f=png&s=112626)

### runtime
如果将代码在写道sum.js里面来,
那么他会打包编译两次,造成代码冗余
![](https://user-gold-cdn.xitu.io/2020/3/20/170f6d0482b40da2?w=1110&h=644&f=png&s=113159)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6d11271fba54?w=1223&h=827&f=png&s=305475)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6d1acebbf08f?w=824&h=283&f=png&s=98628)
如果多个文件里面有多个类,那么他会封装多次,造成代码冗余


![](https://user-gold-cdn.xitu.io/2020/3/20/170f6d3bfd97015a?w=715&h=329&f=png&s=176062)
yarn add @babel/plugin-transform-runtime -D
yarn add @babel/runtime  //要生产环境

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6e521eb5c6d9?w=704&h=306&f=png&s=47422)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f6e4ee6c78430?w=717&h=258&f=png&s=84771)
## 跨域问题的处理及配置
### 需要后端接口
协议,域名,端口号,只要一个不满足条件,都算跨域
我们本地的服务启动在7777,后端的服务启动在8000,所以前端请求后端,就算跨域了


![](https://user-gold-cdn.xitu.io/2020/3/20/170f70190c330c2f?w=659&h=268&f=png&s=38718)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f701f03f77500?w=647&h=452&f=png&s=66595)
如果不写这个参数
![](https://user-gold-cdn.xitu.io/2020/3/20/170f701cd5e9a9fe?w=1064&h=492&f=png&s=103716)

当我去请求的时候
![](https://user-gold-cdn.xitu.io/2020/3/20/170f705564b77726?w=1358&h=560&f=png&s=74854)
有时候后端会判断,host是否与后端的一样,一样的话,才返回数据
localhost就是本地前端服务的地址
加上之后:
![](https://user-gold-cdn.xitu.io/2020/3/20/170f706be66f4402?w=1402&h=377&f=png&s=56647)
以启动代理的方式拿到后端的数据
### 自己造数据,不需要后端

![](https://user-gold-cdn.xitu.io/2020/3/20/170f70b334f3840a?w=815&h=332&f=png&s=85257)
在所有代码没有启动之前,先启动before里面的中间件


![](https://user-gold-cdn.xitu.io/2020/3/20/170f7110d9b5a634?w=1082&h=402&f=png&s=92273)
![](https://user-gold-cdn.xitu.io/2020/3/20/170f710fa60196e7?w=454&h=186&f=png&s=17507)
## webpack优化08.暴露全局变量,eslint,sourceMap
### 暴露全局变量

![](https://user-gold-cdn.xitu.io/2020/3/20/170f790b3acb44ab?w=367&h=142&f=png&s=38478)
1. 直接使用cdn
模板html里面

![](https://user-gold-cdn.xitu.io/2020/3/20/170f791359cc9458?w=922&h=380&f=png&s=48131)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f7917ba0a3da9?w=348&h=164&f=png&s=14714)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f791e96068daf?w=565&h=543&f=png&s=78409)
都可以打印

![](https://user-gold-cdn.xitu.io/2020/3/20/170f7929d697cc42?w=548&h=175&f=png&s=23214)

或者用
`yarn add add-asset-html-cdn-webpack-plugin -D`

![](https://user-gold-cdn.xitu.io/2020/3/20/170f7b921e2944da?w=829&h=371&f=png&s=61388)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f7b9abe9b9b84?w=619&h=231&f=png&s=25287)

但是我们平常使用,都是会`import $ from 'jQuery'`这样来产生一个`$`符,而不是从外部引入cdn来直接使用,而`import `是先`去node_module`里面
去找这个包,找不到会报错,那么如果我们安装`yarn add jquery`,然后在引入还会出现一个问题,打完包后,js会非常大,因为把jquery整个都打包进js里面了,那么如何既使用`import $ from 'jQuery'`,然后jquery有事从cdn引入的呢?

js会非常大
![](https://user-gold-cdn.xitu.io/2020/3/20/170f7f21c3332524?w=474&h=179&f=png&s=28500)

用这种方法
![](https://user-gold-cdn.xitu.io/2020/3/20/170f7f5f614321b9?w=506&h=207&f=png&s=32020)
然后再看体积
![](https://user-gold-cdn.xitu.io/2020/3/20/170f7f5e3c66f2b2?w=437&h=139&f=png&s=24009)
### providePlugin


![](https://user-gold-cdn.xitu.io/2020/3/20/170f813fbc59baed?w=804&h=795&f=png&s=82782)
先将原来的cdn的方式的注释掉


![](https://user-gold-cdn.xitu.io/2020/3/20/170f81ce40c5355e?w=1095&h=462&f=png&s=119144)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f81eea89eb0d5?w=595&h=457&f=png&s=75635)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f81f092558c7f?w=444&h=287&f=png&s=22583)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f81f4154a56b8?w=794&h=361&f=png&s=47657)


![](https://user-gold-cdn.xitu.io/2020/3/20/170f823acd4d2ecf?w=768&h=235&f=png&s=43440)
![](https://user-gold-cdn.xitu.io/2020/3/20/170f8239022c45c2?w=506&h=151&f=png&s=17297)
![](https://user-gold-cdn.xitu.io/2020/3/20/170f8237df0dd686?w=169&h=36&f=png&s=1968)

### expose-loader 
暴露为全局的一个属性
yarn add expose-loader -D

![](https://user-gold-cdn.xitu.io/2020/3/20/170f82c4a3d8f454?w=615&h=222&f=png&s=26120)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f82d6b0d23ff1?w=494&h=155&f=png&s=19199)
## eslint

2代表按照这种规则去解析,0代表忽略这种规则

pre,要放在所有规则之前
### 第一种方式

![](https://user-gold-cdn.xitu.io/2020/3/20/170f839bd49a4a5c?w=1367&h=643&f=png&s=217917)
手动选择,下载

![](https://user-gold-cdn.xitu.io/2020/3/20/170f83a1012d8d43?w=1044&h=764&f=png&s=387694)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f83a8a5ec47c3?w=929&h=594&f=png&s=385572)
复制过来后,安装它的加载器
yarn add eslint eslint-loader -D


![](https://user-gold-cdn.xitu.io/2020/3/20/170f83dd67d6dbec?w=835&h=423&f=png&s=232547)

### 第二种方式
自己配置
npx eslint --init


![](https://user-gold-cdn.xitu.io/2020/3/20/170f840739f3a44c?w=840&h=388&f=png&s=54496)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f840a5624b120?w=491&h=187&f=png&s=19723)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f8417bc717791?w=759&h=464&f=png&s=59460)

打包就会报错
![](https://user-gold-cdn.xitu.io/2020/3/20/170f8429736c0155?w=897&h=584&f=png&s=92183)

### 代码检查

![](https://user-gold-cdn.xitu.io/2020/3/20/170f8797786e85f7?w=755&h=312&f=png&s=96847)
如果直接写错代码,编译后,出现的错误并不明显,代码多了就找不到了
![](https://user-gold-cdn.xitu.io/2020/3/20/170f8755a4f208f5?w=888&h=286&f=png&s=37229)
设置代码检查,能准确的排查出错误代码的位置

![](https://user-gold-cdn.xitu.io/2020/3/20/170f87dbb9a585f8?w=543&h=117&f=png&s=23485)
![](https://user-gold-cdn.xitu.io/2020/3/20/170f87dac249739b?w=810&h=304&f=png&s=36767)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f87dd0fd027e3?w=346&h=75&f=png&s=4152)

## TreeShaking&Hosit&Hot,懒加载打包分析splitChunks等
### TreeShaking
摇树

将没有用的代码和模块打包的时候不打进去,去除

TreeShaking在身产环境有用

没有TreeShaking的时候

![](https://user-gold-cdn.xitu.io/2020/3/20/170f8aae5f264056?w=384&h=89&f=png&s=7921)
![](https://user-gold-cdn.xitu.io/2020/3/20/170f8aac9a489894?w=383&h=228&f=png&s=20863)

![](https://user-gold-cdn.xitu.io/2020/3/20/170f8ac30fe83388?w=1352&h=371&f=png&s=98821)
没有使用,只是引入,就也进行了压缩


`yarn add TreeShaking`

配置:

表示清除无用的副作用数据
唯一一个在package.jon里面配置的参数

![](https://user-gold-cdn.xitu.io/2020/3/21/170f8af98645b838?w=482&h=171&f=png&s=29789)

就可以去掉了

但是有一个问题


![](https://user-gold-cdn.xitu.io/2020/3/21/170f8b1160efc69c?w=359&h=154&f=png&s=12328)

css代码也会被去除

所以要排除css文件
![](https://user-gold-cdn.xitu.io/2020/3/21/170f8b2acfc60a64?w=542&h=123&f=png&s=23613) 


### scopeHosting
![](https://user-gold-cdn.xitu.io/2020/3/22/171006a74c3f8054?w=806&h=246&f=png&s=26415)



![](https://user-gold-cdn.xitu.io/2020/3/22/171006a8f57856e2?w=415&h=166&f=png&s=17468)

![](https://user-gold-cdn.xitu.io/2020/3/22/171006b02c36a44b?w=938&h=462&f=png&s=100817)
在开发环境下,还是解析成一个函数,产生一个sum函数的作用域,然后再导出sum的结果,按原样全部导出
如果在生产环境下
scopeHosting会有作用,直接输出结果,webpack自带的

减少代码占有的内存,提高加载的效率

## 热更新
在不重新启动的情况下更改局部的代码
本身自带热更新
![](https://user-gold-cdn.xitu.io/2020/3/22/1710107cf28976b6?w=743&h=245&f=png&s=39494)
局部刷新,提高加载速度,减少请求
但是注意,css的热更新只在style标签里起作用,一旦分离出来,就不起作用了

### 热更新插件
配置热更新的插件

![](https://user-gold-cdn.xitu.io/2020/3/22/171012406c8e6c11?w=743&h=288&f=png&s=48358)


![](https://user-gold-cdn.xitu.io/2020/3/22/17101243655b3b9b?w=642&h=351&f=png&s=50459)
实现js的热更新,如果不加这个,是直接重新刷新
### 懒加载(动态加载模块)
动态加载的模块的名字


![](https://user-gold-cdn.xitu.io/2020/3/22/171014463a8757ae?w=557&h=273&f=png&s=38797)
![](https://user-gold-cdn.xitu.io/2020/3/22/1710144537598648?w=579&h=451&f=png&s=70289)
![](https://user-gold-cdn.xitu.io/2020/3/22/171014439509aa2d?w=1054&h=525&f=png&s=47090)
点击之后

![](https://user-gold-cdn.xitu.io/2020/3/22/171014493845de1a?w=1117&h=433&f=png&s=46796)

重新起名字

![](https://user-gold-cdn.xitu.io/2020/3/22/1710146072ab7907?w=905&h=466&f=png&s=82592)
![](https://user-gold-cdn.xitu.io/2020/3/22/1710145cad0eaa5a?w=865&h=512&f=png&s=32915)


webpack,懒加载的优化:两种方式
![](https://user-gold-cdn.xitu.io/2020/3/22/1710149167acf62f?w=734&h=114&f=png&s=61128)

![](https://user-gold-cdn.xitu.io/2020/3/22/171014affa6e8acc?w=864&h=148&f=png&s=29113)
打开后,空闲了之后,直接加载,
![](https://user-gold-cdn.xitu.io/2020/3/22/171014ae040f1ef4?w=1238&h=433&f=png&s=52582)

![](https://user-gold-cdn.xitu.io/2020/3/22/171014b47dcc58c4?w=1206&h=363&f=png&s=42482)点击的时候会在加载一次,但是因为已经下载过了,所以非常快

所有的路由就是预引入

Preload:开始的时候就全部加载完成
![](https://user-gold-cdn.xitu.io/2020/3/22/171014cec48a9cb4?w=856&h=155&f=png&s=30022)


![](https://user-gold-cdn.xitu.io/2020/3/22/171014d567f6c6b2?w=1092&h=395&f=png&s=41271)

![](https://user-gold-cdn.xitu.io/2020/3/22/171014d9944c4668?w=1148&h=410&f=png&s=46003)
再点击的时候就是已经加载过的了


### 打包文件分析工具(生产环境下使用)
yarn add  webpack-bundle-analyzer

![](https://user-gold-cdn.xitu.io/2020/3/22/1710157b5c6e4c5e?w=763&h=42&f=png&s=15429)

![](https://user-gold-cdn.xitu.io/2020/3/22/1710157d256645d1?w=580&h=119&f=png&s=23872)

![](https://user-gold-cdn.xitu.io/2020/3/22/17101582b2890159?w=1283&h=670&f=png&s=804513)
### 分理出公共模块和库 splitChunks
打包文件分析工具配合splitChunks来使用

打包一个多入口,index.html,和other.html

![](https://user-gold-cdn.xitu.io/2020/3/22/1710171a8b87e86d?w=688&h=145&f=png&s=26848)

![](https://user-gold-cdn.xitu.io/2020/3/22/171017210afcd180?w=563&h=209&f=png&s=20498)
![](https://user-gold-cdn.xitu.io/2020/3/22/1710171d356e40bf?w=252&h=48&f=png&s=6105)
这两个js里面都引入了第三方的库

![](https://user-gold-cdn.xitu.io/2020/3/22/171017244ec058b1?w=348&h=119&f=png&s=13048)

![](https://user-gold-cdn.xitu.io/2020/3/22/171017259d0f5085?w=300&h=126&f=png&s=13219)


![](https://user-gold-cdn.xitu.io/2020/3/22/171017343d751560?w=1271&h=689&f=png&s=701327)

不同的模块当中引入了公共的模块,每次都要打包一次,要优化

splitChunks是optimization里面的一个参数


![](https://user-gold-cdn.xitu.io/2020/3/22/1710176efbfefd33?w=584&h=580&f=png&s=128407)

进行设置
![](https://user-gold-cdn.xitu.io/2020/3/22/171018bd645721be?w=872&h=605&f=png&s=131119)

多了一个单独的文件
![](https://user-gold-cdn.xitu.io/2020/3/22/171018baadcff647?w=986&h=615&f=png&s=341937)

![](https://user-gold-cdn.xitu.io/2020/3/22/171018c91da0e22e?w=274&h=225&f=png&s=10575)

![](https://user-gold-cdn.xitu.io/2020/3/22/171020518a944e8c?w=416&h=139&f=png&s=52227)import()是异步的引入方式,上面是同步的

### resolve解析
别名设置和扩展名设置

![](https://user-gold-cdn.xitu.io/2020/3/22/17102076b1a20723)
如果引入一个js文件,如果不写的话,是没有问题的
因为后缀如果不写的话,默认的里面,是按照.js.json去走动匹配
![](https://user-gold-cdn.xitu.io/2020/3/22/171020be7bb4372c?w=470&h=167&f=png&s=16624)


![](https://user-gold-cdn.xitu.io/2020/3/22/171020d0e8c71885?w=685&h=102&f=png&s=11286)
这样引入就可以了用不写扩展名了
### 别名
如果组件的位置嵌套的很深,组件的地址和位置每次都要去找一遍写很多../../

![](https://user-gold-cdn.xitu.io/2020/3/22/1710213738a1b7f4?w=755&h=156&f=png&s=20045)
现在test就代表src/test1/test2这个文件夹的路径

![](https://user-gold-cdn.xitu.io/2020/3/22/1710217122f0abde?w=673&h=150&f=png&s=16500)
@是默认的,用@就代表src

## 多线程打包
把不同的逻辑交给不同的线程来处理
yarn add happypack

https://www.npmjs.com/package/happypack
有两种使用方法,在插件里使用和在loader里使用


![](https://user-gold-cdn.xitu.io/2020/3/22/171022ed7514b8ea?w=769&h=175&f=png&s=26502)

### 根据mode分离配置环境

![](https://user-gold-cdn.xitu.io/2020/3/22/1710231027b44bb1?w=395&h=108&f=png&s=33577)

![](https://user-gold-cdn.xitu.io/2020/3/22/17102324ed6b1c04?w=937&h=654&f=png&s=375149)

![](https://user-gold-cdn.xitu.io/2020/3/22/1710232b5f6ecd65?w=958&h=601&f=png&s=390389)
打印一下 env

![](https://user-gold-cdn.xitu.io/2020/3/22/171023b894377fba?w=430&h=166&f=png&s=14153)
运行yarn dev

![](https://user-gold-cdn.xitu.io/2020/3/22/171023b3dc7d85e8?w=714&h=167&f=png&s=20069)
yarn build
![](https://user-gold-cdn.xitu.io/2020/3/22/171023bb92c23cc0?w=488&h=159&f=png&s=14939)

![](https://user-gold-cdn.xitu.io/2020/3/22/171023c69feb6e66?w=529&h=137&f=png&s=14569)
![](https://user-gold-cdn.xitu.io/2020/3/22/171023523e7a7420?w=1025&h=714&f=png&s=444404)
这里要进行webpack配置合并,需要用到 yarn add webpack-merge -D

![](https://user-gold-cdn.xitu.io/2020/3/22/17102552e0194273?w=829&h=668&f=png&s=141994)
然后生产环境的放在身产环境的配置下面,
开发环境的放在开发环境的配置下面

配置分离见github

![](https://user-gold-cdn.xitu.io/2020/3/22/171026b91c7105c7?w=926&h=812&f=png&s=181253)


### 图片压缩
用来处理大图片
yarn add image-webpack-loader -D
经过压缩,将图片品质保持在60%以上,就不会有什么区别,但是图片大小会小很多


![](https://user-gold-cdn.xitu.io/2020/3/22/171027a9c3139f78?w=1006&h=1012&f=png&s=156314)
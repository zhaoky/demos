/**
 * Created by zhaoky on 2017/1/11.
 */
module.exports = config();

function config(){
	return {
		devtool:"source-map",  //生成source-map
		entry: __dirname + "/app/index.js",
		output:{
			path:__dirname+"/public",
			filename:"dist.js"
		},
		devServer: {
			contentBase: "./public",//本地服务器所加载的页面所在的目录
			colors: true,//终端中输出结果为彩色
			historyApiFallback: true,//不跳转
			inline: true,//实时刷新
			port:"8888" //默认8080
		},
		module:{
			loaders:[
				//todo BUG https://github.com/webpack/json-loader/issues/17
				{
					test:/\.json$/,
					loader:"json"
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel',//在webpack的module部分的loaders里进行配置即可
					// query:{
					// 	'presets': ['es2015']
					// }
				},
				{
					test: /\.css$/,
					loader: 'style!css'//添加对样式表的处理
				}
			]
		}
	}
}
// webpack 是node写出来的  node的写法

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production', // 模式  默认两种 production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash].js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径
    },
    devServer: { // 开发服务器的配置
        port: 3000,
        progress: true, // 打包的进度条
        contentBase: './dist', // 指定目录打开
        compress: true // 进度条
    },
    plugins: [ // 数组  放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: { // production环境时：对index.html打包配置
                removeAttributeQuotes: true, // 去除index.html的双引号
                collapseWhitespace: true // 将index.html压缩成一行
            },
            hash: true // 给index.html引用的js加上hash戳
        })
    ],
    module: { // 模块
        rules: [ // 规则
            // css-loader 解析 @import 这种语法
            // style-loader 把css插入到head的标签中
            // loader的特点：希望单一，多个loader用数组，一个loader用字符串
            // loader的执行顺序：默认从右向左执行
            // loader还可以写成对象方式
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top' // 指定插入head标签的位置，默认是最底下
                    }
                }, 'css-loader']
            }
        ]
    }
}


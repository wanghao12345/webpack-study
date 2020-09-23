// webpack 是node写出来的  node的写法

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true
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
                    loader: 'style-loader'
                }, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, 
                    'css-loader', // @import 解析路径
                    'less-loader' // less -> css
                ]
            }
        ]
    }
}


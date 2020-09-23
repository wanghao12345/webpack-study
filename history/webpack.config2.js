// webpack 是node写出来的  node的写法

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    optimization: { // 优化项：一旦设置此项，js的默认压缩将失效，必须自己配置
        minimizer: [
            new OptimizeCssAssetsPlugin(), // 压缩css
            new UglifyJsPlugin({ // 压缩js
                cache: true, // 是否需要缓存
                parallel: true, // 是否并行
                sourceMap: true // 映射
            })
        ]
    },
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    }
}


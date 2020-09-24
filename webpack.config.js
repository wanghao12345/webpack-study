// webpack 是node写出来的  node的写法

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
// 1） cleanWebpackPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 2) copyWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 3) bannerPlugin  内置




module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 8080,
        progress: true,
        contentBase: './dist',
        compress: true,
        // 1) 跨域
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
        // 2）前端只想单纯mock数据
        // before(app) {
        //     app.get('/user', (req, res) => {
        //         res.json({name: '珠峰架构'})
        //     })
        // }
        // 3) 有服务端 不用代理来处理，能不能在服务端中启动webpack，端口用服务端端口
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
        // publicPath: 'http://www.cdn.com'
    },
    // 1）源码映射  会单独生成一个sourcemap文件 出错会标识列和行
    devtool: 'source-map', // 增加映射文件   可以帮我们调试源代码
    // 2）不会产生单独的文件 但是可以显示行和列
    // devtool: 'eval-source-map
    // 3）不会产生列 但是是一个单独的映射文件
    // devtool: 'cheap-module-source-map' // 产生后你可以保留起来
    // 4）不会产生文件  集成在打包后的文件中  不会产生列
    // devtool: 'cheap-module-eval-source-map'

    // watch: true,
    // watchOptions: { // 监控的选项
    //     poll: 1000, // 每秒问1000次
    //     aggregateTimeout: 500, // 防抖  500ms内不重新打包
    //     ignored: /node_modules/ // 不需要进行监控哪个文件
    // },

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
            filename: 'css/[name].[hash:8].css'
        }),
        new webpack.ProvidePlugin({ // 全局变量引入：给每个模块中都注入$
            $: 'jquery'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'doc', to: 'doc' }
            ]
        }),
        new webpack.BannerPlugin('make in wanghao \n')
    ],
    // externals: { // 不需要打包
    //     jquery: "jQuery"
    // },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader' // 对background(url)引入对图片进行编码
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg|gif)$/,
                // 做一个限制，当我们的图片 小于多少k的时候，用base64  来转化
                // 否则用file-loader产生真实的图片,url-loader可以调用file-loader
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100,
                        outputPath: 'img/'
                        // publicPath: 'http://www.img.com'
                    }
                }
            },
            // loader默认：从右到左，从下到上执行
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             cache: true,
            //             fix: true
            //         }
            //     },
            //     enforce: 'pre', // pre: 在普通loader之前执行，post: 在普通loader之后执行
            //     exclude: /node_modules/
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 需要把Es6 -Es5: @babel/core调用@babel/preset-env进行转化
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader', 
                    'postcss-loader', 
                    'less-loader'
                ]
            }
        ]
    }
}


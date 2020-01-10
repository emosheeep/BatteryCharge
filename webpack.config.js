const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        main: './js/battery2.js'
    },
    output: {
        filename: '[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: resolve('js')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                include: resolve('less')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        })
    ],
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './src',
        hot: true
    }
}

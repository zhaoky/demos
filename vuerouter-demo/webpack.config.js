const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'hidden-source-map',
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /^./, to: '/' },
                { from: /^\/foo/, to: '/foo' },
                { from: /^\/bar/, to: '/bar' }
            ]
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};

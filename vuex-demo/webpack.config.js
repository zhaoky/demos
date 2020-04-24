const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'hidden-source-map',
    entry: {
        main: path.resolve(__dirname, './app.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

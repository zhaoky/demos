const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/core/mvvm.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'mvvm.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
};
config.devtool = 'source-map';
config.devServer = {
  stats: 'errors-only',
  contentBase: path.join(__dirname, 'dist'),
  overlay: true
  // config.plugins.push(
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, './src/index.html')
  //   })
  // );
};

module.exports = config;

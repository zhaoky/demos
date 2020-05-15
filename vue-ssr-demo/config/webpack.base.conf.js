const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ['vue-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

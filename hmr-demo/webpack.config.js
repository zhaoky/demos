const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devServer: {
    port: 9001,
    hot: true,
  },
  devtool: 'source-map',
  module: {
    rules: [{ test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
  ],
};

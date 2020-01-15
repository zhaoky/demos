const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: ['./hello.ts'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'dist'),
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};

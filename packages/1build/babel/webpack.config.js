module.exports = {
  devtool: 'source-map',
  entry: ['./src/9.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  // mode: 'production',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }
    ]
  }
};

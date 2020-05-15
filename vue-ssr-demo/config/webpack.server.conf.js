const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const path = require('path');

const config = merge(base, {
  entry: {
    main: path.resolve(__dirname, '../src/entry/entry-server.js'),
  },
  target: 'node',
  output: {
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs2', //服务端依赖
  },
});

module.exports = config;

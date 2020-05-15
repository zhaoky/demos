const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const path = require('path');

const config = merge(base, {
  entry: {
    main: path.resolve(__dirname, '../src/entry/entry-client.js'),
  },
  output: {
    filename: 'bundle-client.js',
  },
});

module.exports = config;

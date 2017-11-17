const webpack = require('webpack');
const path = require('path');
const devConfig = require('./webpack.dev.js');

module.exports = function(env) {
  devConfig.entry = {
    server: path.resolve(__dirname, 'src/server')
  };
  devConfig.output = {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  };
  devConfig.target = 'node';
  return devConfig;
};

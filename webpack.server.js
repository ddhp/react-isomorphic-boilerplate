const webpack = require('webpack');
const path = require('path');
const devConfig = require('./webpack.dev.js');

module.exports = function(env) {
  return {
    entry: {
      server: path.resolve(__dirname, 'src/server')
    },

    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js'
    },

    resolve: devConfig.resolve,
    module: devConfig.module,
    target: 'node'
  };
};

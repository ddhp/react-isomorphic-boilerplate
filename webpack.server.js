const webpack = require('webpack');
const path = require('path');
const devConfig = require('./webpack.dev.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function(env) {
  let config = {
    entry: {
      server: path.resolve(__dirname, 'src/server')
    },

    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js'
    },

    resolve: devConfig.resolve,
    module: devConfig.module,
    target: 'node',
    externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
  };

  if (env === 'prod') {
    config.plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {  
          ecma: 8
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      })
    ]
  }
  
  return config;
};

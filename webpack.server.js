const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

module.exports = function(env) {
  let config = baseConfig('server', env);

  config.name = 'server';

  config.output = {
    path: path.join(__dirname, '/dist/server'),
    publicPath: env === 'hot' ? '/' : '/assets/',
    filename: 'index.js'
  };

  config.target = 'node';
  config.externals = [nodeExternals()]; // in order to ignore all modules in node_modules folder

  if (env === 'hot') {
    config.entry = {
      server: path.resolve(__dirname, 'src/server/renderer')
    };

    // webpack-hot-server-middleware needs this setting
    config.output.libraryTarget = 'commonjs2';
  } else {
    config.entry = {
      server: path.resolve(__dirname, 'src/server')
    };
  }

  if (env === 'prod') {
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {  
          ecma: 8
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    );
  } else {
    config.devtool = 'cheap-module-eval-source-map';
  }
  
  return config;
};

const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js')('server');

module.exports = function(env) {
  baseConfig.name = 'server';

  baseConfig.entry = {
    server: path.resolve(__dirname, 'src/server/renderer')
  };

  baseConfig.output = {
    path: path.join(__dirname, '/dist/server'),
    publicPath: '/assets/',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  };

  baseConfig.target = 'node';
  baseConfig.externals = [nodeExternals()]; // in order to ignore all modules in node_modules folder

  if (env === 'prod') {
    baseConfig.plugins.push(
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
    baseConfig.devtool = 'cheap-module-eval-source-map';
  }
  
  return baseConfig;
};

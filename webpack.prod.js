const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetPlugin = require('assets-webpack-plugin');
const devConfig = require('./webpack.dev.js');

module.exports = {
  entry: devConfig.entry,
  output: devConfig.output,
  resolve: devConfig.resolve,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2']
          }
        }, {
          loader: 'remove-debug-loader',
          // options: {
          //   methodName: ['mylog'],
          //   moduleName: ['myModule']
          // }
        }, {
          loader: 'eslint-loader',
        }]
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin(),
    // https://github.com/visionmedia/superagent/wiki/Superagent-for-Webpack
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': '"production"',
      'global.GENTLY': false 
    }),
    // generate webpack asset json
    new AssetPlugin()
  ]
};

const webpack = require('webpack');
const path = require('path');
const devConfig = require('./webpack.dev.js')('server');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const extractCSS = new ExtractTextPlugin({
  filename: '[contenthash]-[name].css',
  allChunks: true,
});

const extractSCSS = new ExtractTextPlugin({
  filename: '[contenthash]-[name].css',
  allChunks: true,
});

module.exports = function(env) {
  let config = {
    entry: {
      server: path.resolve(__dirname, 'src/server')
    },

    output: {
      path: path.join(__dirname, '/dist/server'),
      publicPath: '/assets/',
      filename: 'index.js'
    },

    plugins: [
      extractCSS,
      extractSCSS,
    ],

    resolve: devConfig.resolve,
    module: devConfig.module,
    target: 'node',
    externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
  };

  if (env === 'prod') {
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {  
          ecma: 8
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      })
    );
  } else {
    config.devtool = 'cheap-module-eval-source-map';
  }
  
  return config;
};

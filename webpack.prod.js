const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devConfig = require('./webpack.dev.js');

const extractCSS = new ExtractTextPlugin({
  filename: '[contenthash]-[name].css',
  allChunks: true,
});

const extractSCSS = new ExtractTextPlugin({
  filename: '[contenthash]-[name].css',
  allChunks: true,
});

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
          loader: 'babel-loader'
        }, {
          loader: 'remove-debug-loader',
          // options: {
          //   methodName: ['mylog'],
          //   moduleName: ['myModule']
          // }
        }, {
          loader: 'eslint-loader',
        }]
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({fallback: 'style-loader', use: ['css-loader']})
      }, 
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', 
            {
              loader: 'postcss-loader', 
              options: {
                plugins: [
                  autoprefixer()
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },

  plugins: [
    extractCSS,
    extractSCSS,
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

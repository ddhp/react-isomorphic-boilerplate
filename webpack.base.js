/**
 * define the most common webpack configs
 * shared between browser/server
 *
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = exports = function(platform, env) {
  if (!platform) {
    platform = 'browser';
  }

  const extractCSS = new ExtractTextPlugin({
    filename: env === 'prod' ? '[name].[contenthash].css' : '[name].css',
    allChunks: true,
  });

  const extractSCSS = new ExtractTextPlugin({
    filename: env === 'prod' ? '[name].[contenthash].css' : '[name].css',
    allChunks: true,
  });

  return {
    context: path.resolve(__dirname),

    plugins: [
      extractCSS,
      extractSCSS
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader'
          }, {
            loader: 'eslint-loader'
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
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: env === 'prod' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env === 'prod' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
              limit: 8192 // 8kB
            }
          }]
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: env === 'prod' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env === 'prod' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
              limit: 8192 // 8kB
            }
          }]
        },
        {
          // ico is lower than limit of url-loader, so we explictly use file-loader
          test: /.ico$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: env === 'prod' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env === 'prod' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
            }
          }]
        }
      ]
    }
  };
};

exports.findTargetRule = function findTargetRule(rules, targetTest) {
  let targetRule = {};
  rules.map((r) => {
    if (r.test.toString() === targetTest.toString()) {
      targetRule = r;
    }
  });
  return targetRule;
};

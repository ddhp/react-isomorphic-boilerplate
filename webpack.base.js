/**
 * define the most common webpack configs
 * shared between browser/server
 *
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const extractCSS = new ExtractTextPlugin({
  filename: '[contenthash]-[name].css',
  allChunks: true,
});

const extractSCSS = new ExtractTextPlugin({
  filename: '[contenthash]-[name].css',
  allChunks: true,
});

module.exports = function(platform) {
  if (!platform) {
    platform = 'browser';
  }

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
              name: '[name]-[hash].[ext]',
              outputPath: '../assets/',
              limit: 8192, // 8kB
              emitFile: platform === 'browser'
            }
          }]
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: '../assets/',
              limit: 8192, // 8kB
              emitFile: platform === 'browser'
            }
          }]
        },
        {
          // ico is lower than limit of url-loader, so we explictly use file-loader
          test: /.ico$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: '../assets/',
              emitFile: platform === 'browser'
            }
          }]
        }
      ]
    }
  };
};

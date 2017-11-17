const path = require('path');
const AssetPlugin = require('assets-webpack-plugin');
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

module.exports = {
  entry: { 
    client: path.resolve(__dirname, 'src/client/entry-main')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/assets/',
    filename: '[chunkhash]-[name].js'
  },

  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    extractCSS,
    extractSCSS,
    // generate webpack asset json
    new AssetPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'eslint-loader',
          options: {
            rules: {
              'no-debugger': 0,
              'no-console': 0
            }
          }
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
  }
};

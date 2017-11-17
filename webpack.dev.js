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
    client: path.resolve(__dirname, 'src/client')
  },
  output: {
    path: path.join(__dirname, '/dist'),
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
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2']
          }
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
      }   
    ]
  }
};

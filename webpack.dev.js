const path = require('path');
const AssetPlugin = require('assets-webpack-plugin');

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
      }
    ]
  }
};

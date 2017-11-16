const path = require('path')
module.exports = {
  entry: { 
    client: path.resolve(__dirname, 'src/client')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },
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
}

const webpack = require('webpack');
const path = require('path');
const AssetPlugin = require('assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.base.js')('browser');
const findTargetRule = require('./webpack.base.js').findTargetRule;

module.exports = function (env) {
  baseConfig.entry = { 
    main: path.resolve(__dirname, 'src/entries/main'),
    // add other entry here
    'another-entry': path.resolve(__dirname, 'src/entries/anotherEntry')
  };

  baseConfig.output = {
    path: path.join(__dirname, '/dist/assets'),
    publicPath: '/assets/',
    filename: '[name].[chunkhash].js'
  };

  baseConfig.plugins.push( 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
      minChunks: function (module, count) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }
        // only put module in node_modules and used by more than one time
        return module.context && module.context.indexOf("node_modules") !== -1 && count > 1;
      }
    }),
    // seperate manifest is a must
    // or every time vendor chunk hash would change
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  );

  if (env === 'prod') {
    // apply remove debug loader
    const jsRule = findTargetRule(baseConfig.module.rules, /\.js$/);
    jsRule.use.push({
      loader: 'remove-debug-loader',
      options: {
        // methodName: ['myLog'],
        moduleName: ['stdout']
      }
    });

    baseConfig.plugins.push(
      new UglifyJsPlugin(),
      new webpack.DefinePlugin({ 
        'process.env.NODE_ENV': '"production"'
      }),
      // generate webpack asset json
      new AssetPlugin()
    );
  } else {
    baseConfig.plugins.push(
      new Visualizer({
        filename: '../stats-browser.html'
      }),
      // generate webpack asset json
      new AssetPlugin()
    );
    
    // enable source map
    baseConfig.devtool = 'cheap-module-eval-source-map';
  }

  return baseConfig;
};

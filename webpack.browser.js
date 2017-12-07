const webpack = require('webpack');
const path = require('path');
const AssetPlugin = require('assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.base.js')('browser');

function findTargetRule(rules, targetTest) {
  let targetRule = {};
  rules.map((r) => {
    if (r.test.toString() === targetTest.toString()) {
      targetRule = r;
    }
  });
  return targetRule;
}

module.exports = function (env) {
  baseConfig.entry = { 
    main: path.resolve(__dirname, 'src/entries/main'),
    // add other entry here
    // 'another-one': path.resolve(__dirname, 'src/entries/another-one')
  };

  baseConfig.output = {
    path: path.join(__dirname, '/dist/assets'),
    publicPath: '/assets/',
    filename: '[chunkhash]-[name].js'
  };

  baseConfig.plugins.push( 
    // generate common chunk for spa entries
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[chunkhash]-[name].js',
      chunks: ['main'/*, 'another-one'*/], // add other entry here
      minChunks: 3, //only put node modules in common bundle, which have been used more than twice
      minSize: 100 // only create common chunk when it exceeds certain size(not sure what's the unit here)
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

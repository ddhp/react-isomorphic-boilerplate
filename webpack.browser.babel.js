/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import webpack from 'webpack';
import path from 'path';
import baseConfig, { findTargetRule } from './webpack.base';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// env can be e.g 'prod', 'dev', 'hot'
export default function browserConfig(env) {
  const config = baseConfig('browser', env);

  config.name = 'browser';

  // mode since webpack v4
  config.mode = env === 'prod' ? 'production' : 'development';

  const entry = {
    main: path.resolve(__dirname, 'src/entries/main'),
    // add other entry here
    'another-entry': path.resolve(__dirname, 'src/entries/anotherEntry'),
  };

  config.output = {
    path: path.join(__dirname, '/dist/assets'),
    publicPath: env === 'hot' ? '/' : '/assets/',
    // set fixed filename for hot reload
    filename: env === 'hot' ? '[name].js' : '[name].[chunkhash].js',
  };

  // disable some stats
  // https://webpack.js.org/configuration/stats/
  config.stats = {
    chunks: false,
    modules: false,
  };

  // modify config for hot env
  if (env === 'hot') {
    const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
    // push hotreload to entry
    const devEntry = {};
    Object.keys(entry).forEach((key) => {
      devEntry[key] = [];
      devEntry[key].push('react-hot-loader/patch', entry[key], hotMiddlewareScript);
    });
    config.entry = devEntry;

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    config.entry = entry;
  }

  if (env === 'prod') {
    // apply remove debug loader
    const jsRule = findTargetRule(config.module.rules, /\.js$/);

    // we set preset config here is b/c
    // only transform to cjs module on browser
    // now only because of superagent
    jsRule.use[0].options.presets = [
      ['@babel/preset-env', {
        modules: 'commonjs',
      }],
    ];

    jsRule.use.splice(1, 0, {
      loader: 'remove-debug-loader',
      options: {
        // methodName: ['myLog'],
        moduleName: ['stdout'],
      },
    });

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }));
  } else {
    // enable source map
    config.devtool = 'cheap-module-eval-source-map';
  }

  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../report.html',
    openAnalyzer: false,
    logLevel: 'silent',
  }));

  return config;
}

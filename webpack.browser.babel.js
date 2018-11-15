/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import webpack from 'webpack';
import path from 'path';
import baseConfig, { eslintLoaderExtraRules } from './webpack.base';

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

  // set rule for src js files
  // also b/c ugilfyjs3 only supports es5
  // so we need to specify node modules which
  // doesn't support it
  // and let them go through babel
  const srcJsRule = {
    test: /\.js$/,
    include: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/superagent'),
    ],
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [],
        },
      },
      {
        loader: 'eslint-loader',
        options: {
          // if env is 'hot'
          // disable some eslint rules
          rules: env === 'hot' ? eslintLoaderExtraRules : {},
        },
      },
    ],
  };
  config.module.rules.push(srcJsRule);

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

    srcJsRule.use[0].options.plugins.push('react-hot-loader/babel');
  } else {
    config.entry = entry;
  }

  if (env === 'prod') {
    // rule for tree shaking
    config.module.rules.push({
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'node_modules/date-fns'),
        path.resolve(__dirname, 'node_modules/lodash'),
      ],
      use: [
        {
          loader: 'babel-loader',
        },
      ],
    });

    // apply remove debug loader
    srcJsRule.use.splice(1, 0, {
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

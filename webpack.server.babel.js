/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import baseConfig, { eslintLoaderExtraRules } from './webpack.base';

export default function serverConfig(env) {
  const config = baseConfig('server', env);

  config.name = 'server';

  // mode since webpack v4
  config.mode = env === 'prod' ? 'production' : 'development';

  config.output = {
    path: path.join(__dirname, '/dist/server'),
    publicPath: env === 'hot' ? '/' : '/assets/',
    filename: 'index.js',
  };

  config.target = 'node';
  config.externals = [nodeExternals()]; // in order to ignore all modules in node_modules folder

  config.module.rules.push(
    {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-runtime', // async/await
            ],
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
    },
  );

  if (env === 'hot') {
    config.entry = {
      server: path.resolve(__dirname, 'src/server/renderer'),
    };

    // webpack-hot-server-middleware needs this setting
    config.output.libraryTarget = 'commonjs2';
  } else {
    config.entry = {
      server: path.resolve(__dirname, 'src/server'),
    };
  }

  if (env === 'prod') {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }));
  } else {
    config.devtool = 'cheap-module-eval-source-map';
  }

  return config;
}

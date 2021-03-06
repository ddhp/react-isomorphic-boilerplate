/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/**
 * define the most common webpack configs
 * shared between browser/server
 *
 */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

export const eslintLoaderExtraRules = {
  'no-console': 'off',
  'no-debugger': 'off',
  'react/prefer-stateless-function': 'off',
  'arrow-body-style': 'off',
  'no-unused-vars': 'off',
  'react/default-props-match-prop-types': 'warn',
  'react/prop-types': 'warn',
};

function baseConfig(platform = 'browser', env) {
  const config = {
    context: path.resolve(__dirname),
    resolve: {
      // resolve to dist/server for compilation-stats.json
      modules: [path.resolve(__dirname, 'dist/server'), 'node_modules'],
    },

    plugins: [],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: env !== 'hot' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env !== 'hot' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
              limit: 8192, // 8kB
            },
          }],
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: env !== 'hot' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env !== 'hot' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
              limit: 8192, // 8kB
            },
          }],
        },
        {
          // ico is lower than limit of url-loader, so we explictly use file-loader
          test: /.ico$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: env !== 'hot' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env !== 'hot' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
            },
          }],
        },
      ],
    },
  };

  // server config with css-loader/locals
  // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/48#issuecomment-375288454
  if (platform === 'server') {
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader',
          options: {
            exportOnlyLocals: true,
          },
        }],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'css-loader',
          options: {
            exportOnlyLocals: true,
          },
        }],
      },
    );
  } else {
    const cssUseLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'prod',
          localIdentName: '[local]___[hash:base64:5]',
          modules: true,
        },
      },
    ];
    const scssUseLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'prod',
          localIdentName: '[local]___[hash:base64:5]',
          modules: true,
          importLoaders: 2,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'prod',
          // move other setting to postcss.config.js
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: env !== 'prod',
        },
      },
    ];

    if (env === 'prod') {
      // only use minicssextractplugin in prod build
      cssUseLoaders.unshift(MiniCssExtractPlugin.loader);
      scssUseLoaders.unshift(MiniCssExtractPlugin.loader);
      config.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css',
      }));
      // needs to manually minify when css is extracted
      // https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
      config.optimization.minimizer = [
        new TerserPlugin({
          cache: true,
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ];
    } else {
      cssUseLoaders.unshift('style-loader');
      scssUseLoaders.unshift('style-loader');
    }
    config.module.rules.push(
      {
        test: /\.css$/,
        use: cssUseLoaders,
      },
      {
        test: /\.scss$/,
        use: scssUseLoaders,
      },
    );
  }

  return config;
}

export default baseConfig;

/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/**
 * define the most common webpack configs
 * shared between browser/server
 *
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

function baseConfig(platform = 'browser', env) {
  const baseConfig = {
    context: path.resolve(__dirname),

    plugins: [],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
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
    baseConfig.module.rules.push(
      {
        test: /\.css$/,
        use: [
          'css-loader/locals',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader/locals',
        ],
      },
    );
  } else {
    const cssUseLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'prod',
        },
      },
    ];
    const scssUseLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'prod',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'prod',
          plugins: [
            autoprefixer(),
          ],
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
      baseConfig.plugins.push(
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].[contenthash].css",
          chunkFilename: "[id].css"
        }),
      );
    } else {
      cssUseLoaders.unshift('style-loader');
      scssUseLoaders.unshift('style-loader');
    }
    baseConfig.module.rules.push(
      {
        test: /\.css$/,
        use: cssUseLoaders,
      },
      {
        test: /\.scss$/,
        use: scssUseLoaders
      },
    );
  }

  return baseConfig;
}

export function findTargetRule(rules, targetTest) {
  let targetRule = {};
  rules.map((r) => {
    if (r.test.toString() === targetTest.toString()) {
      targetRule = r;
    }
    return false;
  });
  return targetRule;
}

export default baseConfig;

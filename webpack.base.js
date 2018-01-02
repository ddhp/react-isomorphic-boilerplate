/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/**
 * define the most common webpack configs
 * shared between browser/server
 *
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

function baseConfig(platform = 'browser', env) {
  const extractCSS = new ExtractTextPlugin({
    filename: env !== 'hot' ? '[name].[contenthash].css' : '[name].css',
    allChunks: true,
    disable: env === 'hot' && platform === 'browser',
  });

  const extractSCSS = new ExtractTextPlugin({
    filename: env !== 'hot' ? '[name].[contenthash].css' : '[name].css',
    allChunks: true,
    disable: env === 'hot' && platform === 'browser',
  });

  return {
    context: path.resolve(__dirname),

    plugins: [
      extractCSS,
      extractSCSS,
    ],

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
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: env !== 'prod',
                },
              },
            ],
          }),
        },
        {
          test: /\.scss$/,
          use: extractSCSS.extract({
            fallback: 'style-loader',
            use: [
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
            ],
          }),
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

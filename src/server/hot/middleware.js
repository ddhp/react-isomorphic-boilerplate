/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import cssModulesRequireHook from 'css-modules-require-hook';

cssModulesRequireHook({
  extensions: ['.css', '.scss'],
  generateScopedName: '[path][name]-[local]',
});

require('asset-require-hook')({
  extensions: ['jpg', 'png', 'ico', 'svg', 'woff', 'etf'],
});

const browserConfig = require('../../../webpack.browser.babel').default('hot');

browserConfig.name = 'client';
const serverConfig = require('../../../webpack.server.babel').default('hot');

// const browserCompiler = webpack(browserConfig);
// const serverCompiler = webpack(serverConfig);
const hotServerCompiler = webpack([browserConfig, serverConfig]);

export default function hot(app) {
  // Serve hot-reloading bundle to client
  app.use(webpackDevMiddleware(hotServerCompiler, {
    publicPath: '/',
  }));

  app.use(webpackHotMiddleware(hotServerCompiler.compilers.find(compiler => compiler.name === 'client')));

  app.use(webpackHotServerMiddleware(hotServerCompiler, {
    chunkName: 'server',
  }));
}

import stdout from '../stdout';
const debug = stdout('server:hot');
import express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import cssModulesRequireHook from 'css-modules-require-hook';
cssModulesRequireHook({
  extensions: ['.css', '.scss'],
  generateScopedName: '[path][name]-[local]'
});

import apiMiddleware from './api';

require('asset-require-hook')({
  extensions: ['jpg', 'png', 'ico', 'svg', 'woff', 'etf']
});

let browserConfig = require('../../webpack.browser')('dev');
browserConfig.name = 'client';
const serverConfig = require('../../webpack.server')('dev');

// const browserCompiler = webpack(browserConfig);
// const serverCompiler = webpack(serverConfig);
const hotServerCompiler = webpack([browserConfig, serverConfig]);

const app = express();

apiMiddleware(app);

// Serve hot-reloading bundle to client
app.use(webpackDevMiddleware(hotServerCompiler, {
  publicPath: '/',
  noInfo: true,
}));

app.use(webpackHotServerMiddleware(hotServerCompiler, {
  chunkName: 'server'
}));

const port = 3333;

const server = app.listen(port, function () {
  const host = server.address().address,
        port = server.address().port;

  debug('express app listening at http://%s:%s', host, port);
});

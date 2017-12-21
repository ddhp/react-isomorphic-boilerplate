import express from 'express';
import stdout from '../stdout';
const debug = stdout('server:index');

import apiMiddleware from './api';
import renderer from './renderer';

const app = express();
apiMiddleware(app);

if (process.env.NODE_ENV === 'hot') {
  const hot = require('./hot');
  hot(app);
} else {
  const stats = require('../../dist/compilation-stats.json');
  // Serve static files
  app.use('/assets', express.static('dist/assets'));
  app.use(renderer({ clientStats: stats }));
}

// import app from './app';
const port = process.env.PORT || 3333;

const server = app.listen(port, function () {
  const host = server.address().address,
        port = server.address().port;

  debug('express app listening at http://%s:%s', host, port);
});

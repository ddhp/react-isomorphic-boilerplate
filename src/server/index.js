import express from 'express';
import stdout from '../stdout';
import apiMiddleware from './api';

const debug = stdout('server:index');

const app = express();
apiMiddleware(app);

if (process.env.NODE_ENV === 'hot') {
  const hot = require('./hot').default; // eslint-disable-line global-require
  hot(app);
} else {
  const renderer = require('./renderer').default; // eslint-disable-line global-require
  const stats = require('../../compilation-stats.json'); // eslint-disable-line
  // Serve static files
  app.use('/assets', express.static('dist/assets'));
  app.use(renderer({ clientStats: stats }));
}

// import app from './app';
const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  const host = server.address().address;
  const runningPort = server.address().port;

  debug('express app listening at http://%s:%s', host, runningPort);
});

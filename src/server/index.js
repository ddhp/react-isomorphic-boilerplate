import express from 'express';
import stdout from '../stdout';
const debug = stdout('server:index');

import apiMiddleware from './api';
import hot from './hot';

const app = express();
apiMiddleware(app);

if (process.env.NODE_ENV !== 'production') {
  hot(app);
} else {
  // Serve static files
  app.use('/assets', express.static('dist/assets'));
}

// import app from './app';
const port = 3333;

const server = app.listen(port, function () {
  const host = server.address().address,
        port = server.address().port;

  debug('express app listening at http://%s:%s', host, port);
});

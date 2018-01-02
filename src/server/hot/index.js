import express from 'express';
import stdout from '../../stdout';
import apiMiddleware from '../api';
import hotMiddleware from './middleware';

const debug = stdout('server:index');

const app = express();
apiMiddleware(app);
hotMiddleware(app);

// import app from './app';
const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  const host = server.address().address;
  const runningPort = server.address().port;

  debug('express app listening at http://%s:%s', host, runningPort);
});

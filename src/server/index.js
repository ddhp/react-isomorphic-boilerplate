import stdout from '../stdout';
const debug = stdout('app-server');

import app from './app';
const port = 3333;

const server = app.listen(port, function () {
  const host = server.address().address,
        port = server.address().port;

  debug('Express app listening at http://%s:%s', host, port);
});

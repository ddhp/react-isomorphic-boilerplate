import Express from 'express';
import stdout from '../stdout';
import pagesMiddleware from './pages';
import apiMiddleware from './api';

const debug = stdout('app-server');
const app = Express(),
      port = 3333;

//Serve static files
app.use('/assets', Express.static('dist'));

apiMiddleware(app);
pagesMiddleware(app);

const server = app.listen(port, function () {
  const host = server.address().address,
        port = server.address().port;

  debug('Express app listening at http://%s:%s', host, port);
});

export default app;

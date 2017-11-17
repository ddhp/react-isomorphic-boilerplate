import React from 'react';
import ReactServer from 'react-dom/server';
import Express from 'express';
import { Provider } from 'react-redux';
import Layout from './layout';
import configureStore from '../configureStore';
import Home from '../containers/home';
import stdout from '../stdout';

const debug = stdout('server-app');
const app = Express(),
      port = 3333;

//Serve static files
app.use('/assets', Express.static('dist'));

app.use('/', (req, res) => {
  const store = configureStore(),
        reduxState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

  const content = (
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const htmlString = ReactServer.renderToString(
    <Layout 
      content={content}
      reduxState={reduxState}
    />
  );

  res.send(`<!DOCTYPE HTML>${htmlString}`);
});

const server = app.listen(port, function () {
  const host = server.address().address,
        port = server.address().port;

  debug('Express app listening at http://%s:%s', host, port);
});

export default app;

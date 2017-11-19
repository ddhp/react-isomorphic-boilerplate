import React from 'react';
import ReactServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';
import { Provider } from 'react-redux';
import Layout from './layout';
import configureStore from '../configureStore';
import EntryMainRoute from '../routes/entry-main';

module.exports = (app) => {
  app.use('/', (req, res) => {
    const { url } = req,
          store = configureStore(),
          routerContext = {},
          reduxState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

    const content = (
      <Provider store={store}>
        <Router location={url} context={routerContext}>
          <EntryMainRoute />
        </Router>
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
};

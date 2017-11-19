import React from 'react';
import ReactServer from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { /*get as _get,*/ isFunction as _isFunction } from 'lodash';
import Layout from './layout';
import configureStore from '../configureStore';
import EntryMainRoute, { getRoute } from '../routes/entry-main';
import stdout from '../stdout';
const debug = stdout('app-server');

function applyInitStore(req, res, next) {
  const store = configureStore({});
  req.reduxStore = store;
  next();
}

function applyRouteCheckResult(req, res, next) {
  let { path, reduxStore: store, query } = req,
      // // get whatever info you want from store
      // storeState = store.getState(),
      // me = _get(storeState, 'entities.me', {}),
      promises = [];


  const route = getRoute(path),
        match = matchPath(path, route),
        { loadData, setHead } = route;

  let loadDataPromise;

  // it's possible no loadData set
  if (_isFunction(loadData)) loadDataPromise = store.dispatch(loadData(match, query));
  // loadDate can be an action or a promise
  if (loadDataPromise && loadDataPromise.then) {
    promises.push(loadDataPromise); 
  }

  // order: LOAD_DATA => SET_HEAD
  Promise.all(promises)
    .then(() => {
      // possibly setHead not set
      if (_isFunction(setHead)) store.dispatch(setHead(match, query));
      next();
    })
    .catch((err) => {
      debug(err);
    });
}

module.exports = (app) => {
  app.use('/', applyInitStore, applyRouteCheckResult, (req, res) => {
    const { url, reduxStore: store } = req,
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

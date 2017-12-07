import React from 'react';
import ReactServer from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { /*get as _get,*/ isFunction as _isFunction } from 'lodash';
import renderFullPage from './layout';
import configureStore from '../configureStore';
import { getMatchedRoute } from '../routes/base';
import MainRoute from '../routes/main';
import { getRoutes as getMainRoutes } from '../routes/main';

import stdout from '../stdout';
const debug = stdout('app-server');

// set all possible route in /routes when app starts
// you have to exactly know and config manually here
const entryRouteInfos = [
  getMainRoutes(),
  // other entry
];

const routeComponentMap = {
  main: MainRoute,
  // other component map
};

function getEntryAndRoute(path, entryRouteInfos) {
  // first element of infos as default result
  let result = entryRouteInfos[0];

  entryRouteInfos.some((info) => {
    // 3rd param is isIgnore404
    // ignore it to avoid matching 404
    const matched = getMatchedRoute(path, info, true);
    if (matched) {
      result = {
        entry: info.entry,
        route: matched
      };
    }
    return true;
  });
  return result;
}

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


  const entryRouteInfo = getEntryAndRoute(path, entryRouteInfos);
  const currentEntry = entryRouteInfo.entry;
  const route = entryRouteInfo.route,
        match = matchPath(path, route),
        { loadData } = route;

  debug('route', route);

  // set currentEntry to req
  req.currentEntry = currentEntry;

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
      next();
    })
    .catch((err) => {
      debug(err);
    });
}

module.exports = (app) => {
  app.use('/', applyInitStore, applyRouteCheckResult, (req, res) => {
    const { url, reduxStore: store, currentEntry } = req,
          routerContext = {},
          reduxStateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

    const RouteComponent = routeComponentMap[currentEntry];

    const content = (
      <Provider store={store}>
        <Router location={url} context={routerContext}>
          <RouteComponent />
        </Router>
      </Provider>
    );

    // render to sting to get helmet setting
    const contentString = ReactServer.renderToString(content); 
    const head = Helmet.renderStatic();
    const htmlString = renderFullPage(contentString, reduxStateString, head, currentEntry);

    res.send(htmlString);
  });
};

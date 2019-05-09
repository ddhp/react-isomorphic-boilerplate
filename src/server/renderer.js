import React from 'react';
import ReactServer from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { /* get as _get, */ isFunction as _isFunction } from 'lodash';
import renderFullPage from './layout';
import configureStore from '../configureStore';
import { entryRouteComponentMap, getEntryAndRoute, entryReducerMap } from './entryAndRoute';

const debug = require('../stdout').default('app-server');

function applyRouteCheckResult(req) {
  const entryRouteInfo = getEntryAndRoute(req.path);
  const {
    route,
  } = entryRouteInfo;
  // resolve false if no route found
  if (!route) {
    return Promise.resolve(false);
  }
  req.entryRouteInfo = entryRouteInfo;
  return Promise.resolve(req);
}

function applyStore(req) {
  const {
    path,
    query,
    entryRouteInfo,
  } = req;

  const {
    route,
    entry: currentEntry,
  } = entryRouteInfo;
  const rootReducer = entryReducerMap[currentEntry];
  debug(rootReducer);
  const store = configureStore({}, rootReducer);
  req.reduxStore = store;

  // get whatever info you want from store
  // let storeState = store.getState();
  // let me = _get(storeState, 'entities.me', {});
  const promises = [];
  const match = matchPath(path, route);
  const { loadData } = route;

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
  return Promise.all(promises);
}

function responsePage(req, res, clientStats) {
  const { url, reduxStore: store, currentEntry } = req;
  const routerContext = {};
  const reduxStateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

  const RouteComponent = entryRouteComponentMap[currentEntry];

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
  const htmlString = renderFullPage(
    contentString,
    reduxStateString,
    head,
    currentEntry,
    clientStats,
  );

  res.send(htmlString);
}

export default function renderer({ clientStats }) {
  return (req, res, next) => {
    applyRouteCheckResult(req)
      .then((isMatched) => {
        if (isMatched) {
          return applyStore(req);
        }
        return next();
      })
      .then(() => {
        responsePage(req, res, clientStats);
      });
  };
}

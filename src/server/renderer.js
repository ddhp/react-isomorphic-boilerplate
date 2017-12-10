import React from 'react';
import ReactServer from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { /*get as _get,*/ isFunction as _isFunction } from 'lodash';
import renderFullPage from './layout';
import configureStore from '../configureStore';
import { entryRouteComponentMap, getEntryAndRoute, entryReducerMap } from './entryAndRoute';

import stdout from '../stdout';
const debug = stdout('app-server');

function applyInitStore(req) {
  const entryRouteInfo = getEntryAndRoute(req.path);
  const currentEntry = entryRouteInfo.entry;
  const rootReducer = entryReducerMap[currentEntry];
  debug(rootReducer);
  const store = configureStore({}, rootReducer);
  req.reduxStore = store;
  req.entryRouteInfo = entryRouteInfo;
  // next();
}

function applyRouteCheckResult(req) {
  let { path, reduxStore: store, query, entryRouteInfo } = req,
      // // get whatever info you want from store
      // storeState = store.getState(),
      // me = _get(storeState, 'entities.me', {}),
      promises = [];


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
  return Promise.all(promises);
  // .then(() => {
  //   next();
  // })
  // .catch((err) => {
  //   debug(err);
  // });
}

function responsePage(req, res/*, clientStats*/) {
  const { url, reduxStore: store, currentEntry } = req,
        routerContext = {},
        reduxStateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

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
  const htmlString = renderFullPage(contentString, reduxStateString, head, currentEntry);

  res.send(htmlString);
}

export default function renderer(/*{ clientStats, serverStats }*/) {
  return (req, res) => {
    applyInitStore(req);
    applyRouteCheckResult(req).then(() => {
      responsePage(req, res);
    });
  };
}

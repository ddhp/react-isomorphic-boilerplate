import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import configureStore from '../configureStore';

/**
 * you can REUSE this template for different entries
 *
 * get global variable of server rendered redux state
 * configure store
 * then mount to mount point
 * @param {React Component} Routes - A component of route logic
 * @param {function} rootReducer - reducer for the entry
 *
 */
export default function mount(Routes, rootReducer) {
  /* eslint no-underscore-dangle: 0 */
  // Grab the state from a global variable injected into the server-generated HTML
  const reduxState = window.__REDUX_STATE__;

  // Allow the passed state to be garbage-collected
  delete window.__REDUX_STATE__;

  // Create Redux store with initial state
  const store = configureStore(reduxState, rootReducer);

  hydrate(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </Provider>,
    document.getElementById('app-mount-point'),
  );
}

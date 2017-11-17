import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Home from '../containers/Home';
import configureStore from '../configureStore';
import './global.scss';

// Grab the state from a global variable injected into the server-generated HTML
const reduxState = window.__REDUX_STATE__;

// Allow the passed state to be garbage-collected
delete window.__REDUX_STATE__;

// Create Redux store with initial state
const store = configureStore(reduxState);

// enable all namespace debug log
localStorage.debug = '*';

hydrate(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app-mount-point')
);

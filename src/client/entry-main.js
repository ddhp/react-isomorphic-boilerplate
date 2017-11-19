import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import Routes from '../routes/entry-main';
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
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app-mount-point')
);

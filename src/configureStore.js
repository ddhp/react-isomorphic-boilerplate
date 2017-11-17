import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState = {}) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );
}

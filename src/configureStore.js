import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState = {}, rootReducer) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  );
}

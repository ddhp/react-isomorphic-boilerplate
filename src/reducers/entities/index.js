import { combineReducers } from 'redux';
import meReducer from './me';
import postReducer from './post';

export default combineReducers({
  me: meReducer,
  post: postReducer,
});

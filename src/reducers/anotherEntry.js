import { combineReducers } from 'redux';
import globalReducer from './global';

export default combineReducers({
  global: globalReducer,
});

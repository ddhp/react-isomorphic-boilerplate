import { combineReducers } from 'redux';
import meReducer from './me';

export default combineReducers({
  me: meReducer
});

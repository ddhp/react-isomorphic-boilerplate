import { combineReducers } from 'redux';
import meReducer from './me';
import homeDataReducer from './homeData';

export default combineReducers({
  me: meReducer,
  homeData: homeDataReducer
});

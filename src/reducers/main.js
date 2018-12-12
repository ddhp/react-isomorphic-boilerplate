import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import pagesReducer from './pages';
import globalReducer from './global';

export default combineReducers({
  entities: entitiesReducer,
  pages: pagesReducer,
  global: globalReducer,
});

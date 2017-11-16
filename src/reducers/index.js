import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import pagesReducer from './pages'

export default combineReducers({
  entities: entitiesReducer,
  pages: pagesReducer
})
